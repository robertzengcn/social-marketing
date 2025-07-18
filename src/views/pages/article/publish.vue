<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ t('article.publish.title') }}</v-card-title>
          <v-card-text>
            <v-form ref="publishForm" v-model="formValid">
              <v-row>
                <!-- Article Selection -->
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.articleId"
                    :label="t('article.publish.select_article')"
                    :items="availableArticles"
                    item-title="title"
                    item-value="id"
                    :rules="[rules.required]"
                    required
                    clearable
                    @update:model-value="loadArticle"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.platform"
                    :label="t('article.publish.platform')"
                    :items="platformOptions"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
              </v-row>

              <!-- Publishing Options -->
              <v-expansion-panels class="mt-4">
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    {{ t('article.publish.options') }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="form.accountId"
                          :label="t('article.publish.account')"
                          :items="accountOptions"
                          :rules="[rules.required]"
                          required
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.scheduledAt"
                          :label="t('article.publish.scheduled_at')"
                          type="datetime-local"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.priority"
                          :label="t('article.publish.priority')"
                          type="number"
                          min="0"
                          max="10"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-switch
                          v-model="form.autoRetry"
                          :label="t('article.publish.auto_retry')"
                          color="primary"
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>

              <!-- Action Buttons -->
              <v-row class="mt-4">
                <v-col cols="12" md="4">
                  <v-btn
                    color="primary"
                    :loading="publishing"
                    :disabled="!formValid || !selectedArticle"
                    @click="startPublishing"
                    block
                  >
                    {{ t('article.publish.start_publishing') }}
                  </v-btn>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    color="secondary"
                    :loading="batchPublishing"
                    :disabled="!availableArticles.length"
                    @click="startBatchPublishing"
                    block
                  >
                    {{ t('article.publish.batch_publish') }}
                  </v-btn>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    variant="outlined"
                    @click="previewPublish"
                    block
                  >
                    {{ t('article.publish.preview') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Article Preview -->
    <v-row v-if="selectedArticle" class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ t('article.publish.article_preview') }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <h4>{{ t('article.publish.original_content') }}</h4>
                <div class="content-preview">
                  <div v-html="formatContent(selectedArticle.originalContent)" />
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <h4>{{ t('article.publish.translated_content') }}</h4>
                <div class="content-preview">
                  <div v-if="selectedArticle.translatedContent" v-html="formatContent(selectedArticle.translatedContent)" />
                  <div v-else class="text-medium-emphasis text-center pa-4">
                    {{ t('article.publish.no_translation') }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Publishing Progress -->
    <v-row v-if="showProgress" class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ t('article.publish.progress_title') }}</v-card-title>
          <v-card-text>
            <v-progress-linear
              v-model="progressValue"
              :color="progressColor"
              height="20"
              rounded
            >
              <template v-slot:default>
                {{ progressValue }}%
              </template>
            </v-progress-linear>
            <div class="text-center mt-4">
              {{ progressMessage }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Publishing Results -->
    <v-row v-if="recentResults.length > 0" class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center justify-space-between">
            <span>{{ t('article.publish.recent_results') }}</span>
            <v-btn
              variant="outlined"
              size="small"
              @click="clearResults"
            >
              {{ t('common.clear') }}
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="result in recentResults"
                :key="result.id"
              >
                <template v-slot:prepend>
                  <v-icon
                    :color="result.success ? 'success' : 'error'"
                    :icon="result.success ? 'mdi-check-circle' : 'mdi-close-circle'"
                  />
                </template>
                <v-list-item-title>
                  {{ result.articleTitle }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ result.platformName }} - {{ formatDate(result.publishedAt) }}
                </v-list-item-subtitle>
                <template v-slot:append>
                  <div class="d-flex align-center gap-2">
                    <v-btn
                      v-if="result.publishedUrl"
                      :href="result.publishedUrl"
                      target="_blank"
                      size="small"
                      variant="text"
                      icon="mdi-open-in-new"
                    />
                    <v-btn
                      v-if="result.articleId"
                      size="small"
                      variant="text"
                      @click="viewArticle(result.articleId)"
                    >
                      {{ t('common.view') }}
                    </v-btn>
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ArticleEntity, ArticleStatus } from '@/entity/Article.entity';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

// Data
const formValid = ref(false);
const publishing = ref(false);
const batchPublishing = ref(false);
const showProgress = ref(false);
const progressValue = ref(0);
const progressMessage = ref('');
const selectedArticle = ref<ArticleEntity | null>(null);
const availableArticles = ref<ArticleEntity[]>([]);
const recentResults = ref<any[]>([]);

// Form
const form = reactive({
  articleId: null as number | null,
  platform: 'toutiao',
  accountId: null as number | null,
  scheduledAt: '',
  priority: 5,
  autoRetry: true
});

// Form validation rules
const rules = {
  required: (v: any) => !!v || t('common.required')
};

// Options
const platformOptions = [
  { title: 'Toutiao', value: 'toutiao' },
  { title: 'Baidu', value: 'baidu' }
];

const accountOptions = [
  { title: 'Account 1', value: 1 },
  { title: 'Account 2', value: 2 },
  { title: 'Account 3', value: 3 }
];

// Computed
const progressColor = computed(() => {
  if (progressValue.value < 30) return 'error';
  if (progressValue.value < 70) return 'warning';
  return 'success';
});

// Methods
const loadAvailableArticles = async () => {
  try {
    // TODO: Implement API call to load articles with status 'translated'
    // const response = await articleApi.getArticlesByStatus(ArticleStatus.TRANSLATED);
    // availableArticles.value = response.data;
    
    // Mock data
    availableArticles.value = [
      {
        id: 1,
        title: 'Sample Article 1',
        originalContent: 'This is a sample article content...',
        translatedContent: '这是示例文章内容...',
        sourceUrl: 'https://example.com/1',
        contentHash: 'hash1',
        status: ArticleStatus.TRANSLATED,
        sourceLanguage: 'en',
        targetLanguage: 'zh',
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
      } as ArticleEntity
    ];
  } catch (error) {
    console.error('Failed to load articles:', error);
  }
};

const loadArticle = async () => {
  if (!form.articleId) {
    selectedArticle.value = null;
    return;
  }
  
  try {
    // TODO: Implement API call to load article
    // const article = await articleApi.getArticleById(form.articleId);
    // selectedArticle.value = article;
    
    // Mock data
    selectedArticle.value = availableArticles.value.find(a => a.id === form.articleId) || null;
  } catch (error) {
    console.error('Failed to load article:', error);
  }
};

const startPublishing = async () => {
  if (!formValid.value || !selectedArticle.value) return;
  
  publishing.value = true;
  showProgress.value = true;
  progressValue.value = 0;
  progressMessage.value = t('article.publish.progress_initiating');
  
  try {
    // Simulate progress
    const progressInterval = setInterval(() => {
      if (progressValue.value < 90) {
        progressValue.value += 10;
        progressMessage.value = t('article.publish.progress_publishing');
      }
    }, 200);

    // TODO: Implement actual publishing API call
    // const result = await articlePublishApi.publishArticle({
    //   articleId: form.articleId,
    //   platform: form.platform,
    //   accountId: form.accountId,
    //   scheduledAt: form.scheduledAt,
    //   priority: form.priority,
    //   autoRetry: form.autoRetry
    // });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    clearInterval(progressInterval);
    progressValue.value = 100;
    progressMessage.value = t('article.publish.progress_completed');

    // Mock result
    const result = {
      id: Date.now(),
      success: true,
      articleTitle: selectedArticle.value.title,
      platformName: form.platform,
      publishedUrl: `https://${form.platform}.com/article/${Math.floor(Math.random() * 10000)}`,
      publishedAt: new Date(),
      articleId: selectedArticle.value.id
    };

    recentResults.value.unshift(result);

    // Reset form
    form.articleId = null;

    setTimeout(() => {
      showProgress.value = false;
      progressValue.value = 0;
    }, 1000);

  } catch (error) {
    console.error('Publishing failed:', error);
    progressValue.value = 0;
    progressMessage.value = t('article.publish.progress_error');
    
    const errorResult = {
      id: Date.now(),
      success: false,
      articleTitle: selectedArticle.value?.title || 'Unknown',
      platformName: form.platform,
      publishedAt: new Date(),
      articleId: selectedArticle.value?.id
    };
    
    recentResults.value.unshift(errorResult);
    
    setTimeout(() => {
      showProgress.value = false;
    }, 2000);
  } finally {
    publishing.value = false;
  }
};

const startBatchPublishing = async () => {
  if (availableArticles.value.length === 0) return;
  
  batchPublishing.value = true;
  showProgress.value = true;
  progressValue.value = 0;
  progressMessage.value = t('article.publish.progress_batch_initiating');
  
  try {
    const articlesToPublish = availableArticles.value.filter(a => a.status === ArticleStatus.TRANSLATED);
    
    for (let i = 0; i < articlesToPublish.length; i++) {
      const article = articlesToPublish[i];
      progressValue.value = Math.round((i / articlesToPublish.length) * 100);
      progressMessage.value = t('article.publish.progress_batch_publishing', { 
        title: article.title, 
        current: i + 1, 
        total: articlesToPublish.length 
      });
      
      // TODO: Implement batch publishing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result
      const result = {
        id: Date.now() + i,
        success: Math.random() > 0.15, // 85% success rate
        articleTitle: article.title,
        platformName: form.platform,
        publishedUrl: Math.random() > 0.15 ? `https://${form.platform}.com/article/${Math.floor(Math.random() * 10000)}` : null,
        publishedAt: new Date(),
        articleId: article.id
      };
      
      recentResults.value.unshift(result);
    }
    
    progressValue.value = 100;
    progressMessage.value = t('article.publish.progress_batch_completed');
    
    setTimeout(() => {
      showProgress.value = false;
      progressValue.value = 0;
    }, 1000);
    
  } catch (error) {
    console.error('Batch publishing failed:', error);
    progressValue.value = 0;
    progressMessage.value = t('article.publish.progress_batch_error');
    
    setTimeout(() => {
      showProgress.value = false;
    }, 2000);
  } finally {
    batchPublishing.value = false;
  }
};

const previewPublish = () => {
  if (!selectedArticle.value) return;
  
  // TODO: Implement preview publishing
  console.log('Preview publishing for article:', selectedArticle.value.id);
};

const formatContent = (content: string) => {
  return content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString();
};

const clearResults = () => {
  recentResults.value = [];
};

const viewArticle = (articleId: number) => {
  router.push({ name: 'ArticleDetail', params: { id: articleId } });
};

// Lifecycle
onMounted(() => {
  loadAvailableArticles();
  
  // Check if articleId is provided in query params
  const articleId = route.query.articleId;
  if (articleId) {
    form.articleId = parseInt(articleId as string);
    loadArticle();
  }
});
</script>

<style scoped>
.content-preview {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  background-color: #fafafa;
}
</style> 