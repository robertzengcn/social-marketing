<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center justify-space-between">
            <span>{{ t('article.queue.title') }}</span>
            <div class="d-flex gap-2">
              <v-btn
                color="primary"
                size="small"
                @click="refreshQueue"
                :loading="loading"
              >
                {{ t('common.refresh') }}
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                @click="processQueue"
                :loading="processing"
              >
                {{ t('article.queue.process_queue') }}
              </v-btn>
            </div>
          </v-card-title>

          <!-- Queue Statistics -->
          <v-card-text>
            <v-row>
              <v-col v-for="stat in queueStatistics" :key="stat.label" cols="6" md="3">
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

          <!-- Queue Table -->
          <v-card-text>
            <v-data-table
              v-model:items-per-page="pagination.itemsPerPage"
              v-model:page="pagination.page"
              :headers="headers"
              :items="queueItems"
              :loading="loading"
              :items-length="totalItems"
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

              <!-- Priority Column -->
              <template v-slot:item.priority="{ item }">
                <v-chip
                  :color="getPriorityColor(item.priority)"
                  size="small"
                >
                  {{ item.priority }}
                </v-chip>
              </template>

              <!-- Scheduled At Column -->
              <template v-slot:item.scheduledAt="{ item }">
                {{ formatDate(item.scheduledAt) }}
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
                    <v-list-item @click="viewArticle(item.articleId)">
                      <v-list-item-title>
                        <v-icon start>mdi-eye</v-icon>
                        {{ t('common.view') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="editQueueItem(item)" v-if="item.status === 'pending'">
                      <v-list-item-title>
                        <v-icon start>mdi-pencil</v-icon>
                        {{ t('common.edit') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="rescheduleItem(item)" v-if="item.status === 'failed'">
                      <v-list-item-title>
                        <v-icon start>mdi-clock</v-icon>
                        {{ t('article.queue.reschedule') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="removeFromQueue(item)">
                      <v-list-item-title class="text-error">
                        <v-icon start color="error">mdi-delete</v-icon>
                        {{ t('common.remove') }}
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

    <!-- Edit Queue Item Dialog -->
    <v-dialog v-model="showEditDialog" max-width="500px">
      <v-card>
        <v-card-title>{{ t('article.queue.edit_item') }}</v-card-title>
        <v-card-text>
          <v-form ref="editForm" v-model="editFormValid">
            <v-text-field
              v-model="editForm.scheduledAt"
              :label="t('article.queue.scheduled_at')"
              type="datetime-local"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              v-model="editForm.priority"
              :label="t('article.queue.priority')"
              type="number"
              min="0"
              max="10"
              :rules="[rules.required, rules.min, rules.max]"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showEditDialog = false">
            {{ t('common.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            :loading="updating"
            :disabled="!editFormValid"
            @click="updateQueueItem"
          >
            {{ t('common.save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Reschedule Dialog -->
    <v-dialog v-model="showRescheduleDialog" max-width="400px">
      <v-card>
        <v-card-title>{{ t('article.queue.reschedule_item') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="rescheduleForm.scheduledAt"
            :label="t('article.queue.new_scheduled_at')"
            type="datetime-local"
            :rules="[rules.required]"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showRescheduleDialog = false">
            {{ t('common.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            :loading="rescheduling"
            @click="confirmReschedule"
          >
            {{ t('article.queue.reschedule') }}
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
import { PublishingQueueStatus } from '@/entity/PublishingQueue.entity';

const { t } = useI18n();
const router = useRouter();

// Data
const loading = ref(false);
const processing = ref(false);
const updating = ref(false);
const rescheduling = ref(false);
const totalItems = ref(0);
const showEditDialog = ref(false);
const showRescheduleDialog = ref(false);
const editFormValid = ref(false);
const selectedItem = ref<any>(null);
const queueItems = ref<any[]>([]);

// Pagination
const pagination = reactive({
  page: 1,
  itemsPerPage: 20
});

// Edit form
const editForm = reactive({
  scheduledAt: '',
  priority: 5
});

// Reschedule form
const rescheduleForm = reactive({
  scheduledAt: ''
});

// Form validation rules
const rules = {
  required: (v: any) => !!v || t('common.required'),
  min: (v: number) => v >= 0 || t('common.min_value', { min: 0 }),
  max: (v: number) => v <= 10 || t('common.max_value', { max: 10 })
};

// Table headers
const headers = [
  { title: t('article.queue.headers.id'), key: 'id', sortable: true },
  { title: t('article.queue.headers.article_title'), key: 'articleTitle', sortable: true },
  { title: t('article.queue.headers.platform'), key: 'platformName', sortable: true },
  { title: t('article.queue.headers.status'), key: 'status', sortable: true },
  { title: t('article.queue.headers.priority'), key: 'priority', sortable: true },
  { title: t('article.queue.headers.scheduled_at'), key: 'scheduledAt', sortable: true },
  { title: t('common.actions'), key: 'actions', sortable: false }
];

// Computed
const queueStatistics = computed(() => [
  {
    label: t('article.queue.stats.total'),
    value: totalItems.value,
    color: 'text-primary'
  },
  {
    label: t('article.queue.stats.pending'),
    value: queueItems.value.filter(item => item.status === PublishingQueueStatus.PENDING).length,
    color: 'text-warning'
  },
  {
    label: t('article.queue.stats.processing'),
    value: queueItems.value.filter(item => item.status === PublishingQueueStatus.PROCESSING).length,
    color: 'text-info'
  },
  {
    label: t('article.queue.stats.completed'),
    value: queueItems.value.filter(item => item.status === PublishingQueueStatus.COMPLETED).length,
    color: 'text-success'
  }
]);

// Methods
const loadQueue = async () => {
  loading.value = true;
  try {
    // TODO: Implement API call to load queue items
    // const response = await publishingQueueApi.getQueueItems({
    //   page: pagination.page,
    //   limit: pagination.itemsPerPage
    // });
    // queueItems.value = response.data;
    // totalItems.value = response.total;
    
    // Mock data
    queueItems.value = [
      {
        id: 1,
        articleId: 1,
        articleTitle: 'Sample Article 1',
        platformName: 'Toutiao',
        status: PublishingQueueStatus.PENDING,
        priority: 5,
        scheduledAt: new Date(),
        accountId: 1
      },
      {
        id: 2,
        articleId: 2,
        articleTitle: 'Sample Article 2',
        platformName: 'Baidu',
        status: PublishingQueueStatus.PROCESSING,
        priority: 8,
        scheduledAt: new Date(),
        accountId: 2
      }
    ];
    totalItems.value = 2;
  } catch (error) {
    console.error('Failed to load queue:', error);
  } finally {
    loading.value = false;
  }
};

const onTableUpdate = () => {
  loadQueue();
};

const refreshQueue = () => {
  loadQueue();
};

const processQueue = async () => {
  processing.value = true;
  try {
    // TODO: Implement queue processing
    // await publishingQueueApi.processQueue();
    await new Promise(resolve => setTimeout(resolve, 2000));
    await loadQueue();
  } catch (error) {
    console.error('Failed to process queue:', error);
  } finally {
    processing.value = false;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case PublishingQueueStatus.PENDING: return 'warning';
    case PublishingQueueStatus.PROCESSING: return 'info';
    case PublishingQueueStatus.COMPLETED: return 'success';
    case PublishingQueueStatus.FAILED: return 'error';
    default: return 'grey';
  }
};

const getStatusText = (status: string) => {
  return t(`article.queue.status.${status}`);
};

const getPriorityColor = (priority: number) => {
  if (priority >= 8) return 'error';
  if (priority >= 5) return 'warning';
  return 'success';
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString();
};

const viewArticle = (articleId: number) => {
  router.push({ name: 'ArticleDetail', params: { id: articleId } });
};

const editQueueItem = (item: any) => {
  selectedItem.value = item;
  editForm.scheduledAt = new Date(item.scheduledAt).toISOString().slice(0, 16);
  editForm.priority = item.priority;
  showEditDialog.value = true;
};

const updateQueueItem = async () => {
  if (!selectedItem.value) return;
  
  updating.value = true;
  try {
    // TODO: Implement API call to update queue item
    // await publishingQueueApi.updateQueueItem(selectedItem.value.id, {
    //   scheduledAt: new Date(editForm.scheduledAt),
    //   priority: editForm.priority
    // });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    await loadQueue();
    showEditDialog.value = false;
  } catch (error) {
    console.error('Failed to update queue item:', error);
  } finally {
    updating.value = false;
  }
};

const rescheduleItem = (item: any) => {
  selectedItem.value = item;
  rescheduleForm.scheduledAt = new Date().toISOString().slice(0, 16);
  showRescheduleDialog.value = true;
};

const confirmReschedule = async () => {
  if (!selectedItem.value) return;
  
  rescheduling.value = true;
  try {
    // TODO: Implement API call to reschedule item
    // await publishingQueueApi.rescheduleItem(selectedItem.value.id, {
    //   scheduledAt: new Date(rescheduleForm.scheduledAt)
    // });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    await loadQueue();
    showRescheduleDialog.value = false;
  } catch (error) {
    console.error('Failed to reschedule item:', error);
  } finally {
    rescheduling.value = false;
  }
};

const removeFromQueue = async (item: any) => {
  try {
    // TODO: Implement API call to remove from queue
    // await publishingQueueApi.removeFromQueue(item.id);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    await loadQueue();
  } catch (error) {
    console.error('Failed to remove from queue:', error);
  }
};

// Lifecycle
onMounted(() => {
  loadQueue();
});
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
}
</style> 