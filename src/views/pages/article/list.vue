<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center justify-space-between">
            <span>{{ t('article.list.title') }}</span>
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="showCreateDialog = true"
            >
              {{ t('article.list.create_new') }}
            </v-btn>
          </v-card-title>

          <!-- Filters -->
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="filters.search"
                  :label="t('article.list.search_placeholder')"
                  prepend-inner-icon="mdi-magnify"
                  clearable
                  @update:model-value="loadArticles"
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  v-model="filters.status"
                  :label="t('article.list.status')"
                  :items="statusOptions"
                  clearable
                  @update:model-value="loadArticles"
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  v-model="filters.language"
                  :label="t('article.list.language')"
                  :items="languageOptions"
                  clearable
                  @update:model-value="loadArticles"
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-menu
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="dateRangeText"
                      :label="t('article.list.date_range')"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="props"
                      clearable
                      @click:clear="clearDateRange"
                    />
                  </template>
                  <v-date-picker
                    v-model="dateRange"
                    range
                    @update:model-value="onDateRangeChange"
                  />
                </v-menu>
              </v-col>
              <v-col cols="12" md="2">
                <v-btn
                  color="secondary"
                  variant="outlined"
                  @click="clearFilters"
                >
                  {{ t('common.clear_filters') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Statistics -->
          <v-card-text>
            <v-row>
              <v-col v-for="stat in statistics" :key="stat.label" cols="6" md="3">
                <v-card variant="outlined" class="text-center pa-3">
                  <div class="text-h6 font-weight-bold" :class="stat.color">
                    {{ stat.value }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    {{ stat.label }}
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Articles Table -->
          <v-card-text>
            <v-data-table
              v-model:items-per-page="pagination.itemsPerPage"
              v-model:page="pagination.page"
              :headers="headers"
              :items="articles"
              :loading="loading"
              :items-length="totalItems"
              :search="filters.search"
              class="elevation-1"
              @update:options="onTableUpdate"
            >
              <!-- Status Column -->
              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  :text="getStatusText(item.status)"
                  size="small"
                />
              </template>

              <!-- Title Column -->
              <template v-slot:item.title="{ item }">
                <div class="text-truncate" style="max-width: 300px;">
                  {{ item.title }}
                </div>
              </template>

              <!-- Created Date Column -->
              <template v-slot:item.createdAt="{ item }">
                {{ formatDate(item.createdAt) }}
              </template>

              <!-- Actions Column -->
              <template v-slot:item.actions="{ item }">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon="mdi-dots-vertical"
                      size="small"
                      v-bind="props"
                    />
                  </template>
                  <v-list>
                    <v-list-item @click="viewArticle(item)">
                      <v-list-item-title>
                        <v-icon start>mdi-eye</v-icon>
                        {{ t('common.view') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="editArticle(item)" v-if="item.status === 'scraped'">
                      <v-list-item-title>
                        <v-icon start>mdi-translate</v-icon>
                        {{ t('article.list.translate') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="publishArticle(item)" v-if="item.status === 'translated'">
                      <v-list-item-title>
                        <v-icon start>mdi-publish</v-icon>
                        {{ t('article.list.publish') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteArticle(item)">
                      <v-list-item-title class="text-error">
                        <v-icon start color="error">mdi-delete</v-icon>
                        {{ t('common.delete') }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create Article Dialog -->
    <v-dialog v-model="showCreateDialog" max-width="600px">
      <v-card>
        <v-card-title>{{ t('article.list.create_new') }}</v-card-title>
        <v-card-text>
          <v-form ref="createForm" v-model="createFormValid">
            <v-text-field
              v-model="createForm.url"
              :label="t('article.list.source_url')"
              :rules="[rules.required, rules.url]"
              required
            />
            <v-text-field
              v-model="createForm.title"
              :label="t('article.list.title')"
              :rules="[rules.required]"
              required
            />
            <v-textarea
              v-model="createForm.description"
              :label="t('article.list.description')"
              rows="3"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showCreateDialog = false">
            {{ t('common.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            :loading="creating"
            :disabled="!createFormValid"
            @click="createArticle"
          >
            {{ t('common.create') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="400px">
      <v-card>
        <v-card-title>{{ t('article.list.delete_confirm_title') }}</v-card-title>
        <v-card-text>
          {{ t('article.list.delete_confirm_message') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showDeleteDialog = false">
            {{ t('common.cancel') }}
          </v-btn>
          <v-btn
            color="error"
            :loading="deleting"
            @click="confirmDelete"
          >
            {{ t('common.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ArticleEntity, ArticleStatus } from '@/entity/Article.entity';

const { t } = useI18n();
const router = useRouter();

// Data
const articles = ref<ArticleEntity[]>([]);
const loading = ref(false);
const creating = ref(false);
const deleting = ref(false);
const totalItems = ref(0);
const showCreateDialog = ref(false);
const showDeleteDialog = ref(false);
const dateMenu = ref(false);
const createFormValid = ref(false);
const selectedArticle = ref<ArticleEntity | null>(null);

// Pagination
const pagination = reactive({
  page: 1,
  itemsPerPage: 20
});

// Filters
const filters = reactive({
  search: '',
  status: '',
  language: '',
  dateRange: [] as string[]
});

// Create form
const createForm = reactive({
  url: '',
  title: '',
  description: ''
});

// Form validation rules
const rules = {
  required: (v: string) => !!v || t('common.required'),
  url: (v: string) => {
    try {
      new URL(v);
      return true;
    } catch {
      return t('common.invalid_url');
    }
  }
};

// Table headers
const headers = [
  { title: t('article.list.headers.id'), key: 'id', sortable: true },
  { title: t('article.list.headers.title'), key: 'title', sortable: true },
  { title: t('article.list.headers.status'), key: 'status', sortable: true },
  { title: t('article.list.headers.source_language'), key: 'sourceLanguage', sortable: true },
  { title: t('article.list.headers.target_language'), key: 'targetLanguage', sortable: true },
  { title: t('article.list.headers.created_at'), key: 'createdAt', sortable: true },
  { title: t('common.actions'), key: 'actions', sortable: false }
];

// Options
const statusOptions = [
  { title: t('article.status.scraped'), value: ArticleStatus.SCRAPED },
  { title: t('article.status.translating'), value: ArticleStatus.TRANSLATING },
  { title: t('article.status.translated'), value: ArticleStatus.TRANSLATED },
  { title: t('article.status.publishing'), value: ArticleStatus.PUBLISHING },
  { title: t('article.status.published'), value: ArticleStatus.PUBLISHED }
];

const languageOptions = [
  { title: 'English', value: 'en' },
  { title: '中文', value: 'zh' },
  { title: '日本語', value: 'ja' },
  { title: '한국어', value: 'ko' }
];

// Computed
const dateRangeText = computed(() => {
  if (filters.dateRange.length === 2) {
    return `${filters.dateRange[0]} - ${filters.dateRange[1]}`;
  }
  return '';
});

const statistics = computed(() => [
  {
    label: t('article.list.stats.total'),
    value: totalItems.value,
    color: 'text-primary'
  },
  {
    label: t('article.list.stats.scraped'),
    value: articles.value.filter(a => a.status === ArticleStatus.SCRAPED).length,
    color: 'text-info'
  },
  {
    label: t('article.list.stats.translated'),
    value: articles.value.filter(a => a.status === ArticleStatus.TRANSLATED).length,
    color: 'text-success'
  },
  {
    label: t('article.list.stats.published'),
    value: articles.value.filter(a => a.status === ArticleStatus.PUBLISHED).length,
    color: 'text-warning'
  }
]);

// Methods
const loadArticles = async () => {
  loading.value = true;
  try {
    // TODO: Implement API call to load articles
    // const response = await articleApi.getArticles({
    //   page: pagination.page,
    //   limit: pagination.itemsPerPage,
    //   search: filters.search,
    //   status: filters.status,
    //   language: filters.language,
    //   dateRange: filters.dateRange
    // });
    // articles.value = response.data;
    // totalItems.value = response.total;
    
    // Mock data for now
    articles.value = [
      {
        id: 1,
        title: 'Sample Article 1',
        originalContent: 'Sample content...',
        sourceUrl: 'https://example.com/1',
        contentHash: 'hash1',
        status: ArticleStatus.SCRAPED,
        sourceLanguage: 'en',
        targetLanguage: 'zh',
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
      } as ArticleEntity
    ];
    totalItems.value = 1;
  } catch (error) {
    console.error('Failed to load articles:', error);
  } finally {
    loading.value = false;
  }
};

const onTableUpdate = () => {
  loadArticles();
};

const onDateRangeChange = () => {
  dateMenu.value = false;
  loadArticles();
};

const clearDateRange = () => {
  filters.dateRange = [];
  loadArticles();
};

const clearFilters = () => {
  filters.search = '';
  filters.status = '';
  filters.language = '';
  filters.dateRange = [];
  loadArticles();
};

const getStatusColor = (status: string) => {
  switch (status) {
    case ArticleStatus.SCRAPED: return 'info';
    case ArticleStatus.TRANSLATING: return 'warning';
    case ArticleStatus.TRANSLATED: return 'success';
    case ArticleStatus.PUBLISHING: return 'warning';
    case ArticleStatus.PUBLISHED: return 'primary';
    default: return 'grey';
  }
};

const getStatusText = (status: string) => {
  return t(`article.status.${status}`);
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
};

const viewArticle = (article: ArticleEntity) => {
  router.push({ name: 'ArticleDetail', params: { id: article.id } });
};

const editArticle = (article: ArticleEntity) => {
  router.push({ name: 'ArticleTranslate', query: { articleId: article.id } });
};

const publishArticle = (article: ArticleEntity) => {
  router.push({ name: 'ArticlePublish', query: { articleId: article.id } });
};

const deleteArticle = (article: ArticleEntity) => {
  selectedArticle.value = article;
  showDeleteDialog.value = true;
};

const confirmDelete = async () => {
  if (!selectedArticle.value) return;
  
  deleting.value = true;
  try {
    // TODO: Implement API call to delete article
    // await articleApi.deleteArticle(selectedArticle.value.id);
    await loadArticles();
    showDeleteDialog.value = false;
  } catch (error) {
    console.error('Failed to delete article:', error);
  } finally {
    deleting.value = false;
  }
};

const createArticle = async () => {
  creating.value = true;
  try {
    // TODO: Implement API call to create article
    // await articleApi.createArticle(createForm);
    showCreateDialog.value = false;
    await loadArticles();
    
    // Reset form
    createForm.url = '';
    createForm.title = '';
    createForm.description = '';
  } catch (error) {
    console.error('Failed to create article:', error);
  } finally {
    creating.value = false;
  }
};

// Lifecycle
onMounted(() => {
  loadArticles();
});
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
}
</style> 