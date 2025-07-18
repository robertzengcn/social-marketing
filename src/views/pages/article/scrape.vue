<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ t('article.scrape.title') }}</v-card-title>
          <v-card-text>
            <v-form ref="scrapeForm" v-model="formValid">
              <v-row>
                <!-- URL Input -->
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="form.url"
                    :label="t('article.scrape.url_label')"
                    :placeholder="t('article.scrape.url_placeholder')"
                    :rules="[rules.required, rules.url]"
                    prepend-inner-icon="mdi-link"
                    clearable
                    required
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    color="primary"
                    :loading="scraping"
                    :disabled="!formValid"
                    @click="scrapeArticle"
                    block
                  >
                    {{ t('article.scrape.scrape_button') }}
                  </v-btn>
                </v-col>
              </v-row>

              <!-- Configuration Options -->
              <v-expansion-panels class="mt-4">
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    {{ t('article.scrape.configuration') }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="form.targetLanguage"
                          :label="t('article.scrape.target_language')"
                          :items="languageOptions"
                          :rules="[rules.required]"
                          required
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="form.strategy"
                          :label="t('article.scrape.strategy')"
                          :items="strategyOptions"
                          :rules="[rules.required]"
                          required
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-switch
                          v-model="form.extractCodeBlocks"
                          :label="t('article.scrape.extract_code_blocks')"
                          color="primary"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-switch
                          v-model="form.extractImages"
                          :label="t('article.scrape.extract_images')"
                          color="primary"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-switch
                          v-model="form.extractMetadata"
                          :label="t('article.scrape.extract_metadata')"
                          color="primary"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.timeout"
                          :label="t('article.scrape.timeout')"
                          type="number"
                          suffix="seconds"
                          min="10"
                          max="300"
                        />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Batch Scraping -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ t('article.scrape.batch_title') }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="8">
                <v-textarea
                  v-model="batchUrls"
                  :label="t('article.scrape.batch_urls_label')"
                  :placeholder="t('article.scrape.batch_urls_placeholder')"
                  rows="6"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-btn
                  color="secondary"
                  :loading="batchScraping"
                  :disabled="!batchUrls.trim()"
                  @click="scrapeBatch"
                  block
                  class="mb-2"
                >
                  {{ t('article.scrape.batch_scrape_button') }}
                </v-btn>
                <v-btn
                  variant="outlined"
                  @click="clearBatch"
                  block
                >
                  {{ t('common.clear') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Scraping Results -->
    <v-row class="mt-4" v-if="recentResults.length > 0">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center justify-space-between">
            <span>{{ t('article.scrape.recent_results') }}</span>
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
                :class="{ 'border-error': !result.success }"
              >
                <template v-slot:prepend>
                  <v-icon
                    :color="result.success ? 'success' : 'error'"
                    :icon="result.success ? 'mdi-check-circle' : 'mdi-close-circle'"
                  />
                </template>
                <v-list-item-title>
                  {{ result.title || result.url }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ result.url }}
                </v-list-item-subtitle>
                <template v-slot:append>
                  <div class="d-flex align-center gap-2">
                    <v-chip
                      v-if="result.articleId"
                      size="small"
                      color="primary"
                      @click="viewArticle(result.articleId)"
                    >
                      {{ t('article.scrape.view_article') }}
                    </v-chip>
                    <v-chip
                      v-if="result.error"
                      size="small"
                      color="error"
                    >
                      {{ result.error }}
                    </v-chip>
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Scraping Statistics -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ t('article.scrape.statistics') }}</v-card-title>
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
        </v-card>
      </v-col>
    </v-row>

    <!-- Progress Dialog -->
    <v-dialog v-model="showProgress" persistent max-width="400px">
      <v-card>
        <v-card-title>{{ t('article.scrape.progress_title') }}</v-card-title>
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
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

// Data
const formValid = ref(false);
const scraping = ref(false);
const batchScraping = ref(false);
const showProgress = ref(false);
const progressValue = ref(0);
const progressMessage = ref('');
const batchUrls = ref('');
const recentResults = ref<any[]>([]);

// Form
const form = reactive({
  url: '',
  targetLanguage: 'zh',
  strategy: 'auto',
  extractCodeBlocks: true,
  extractImages: true,
  extractMetadata: true,
  timeout: 30
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

// Options
const languageOptions = [
  { title: '中文', value: 'zh' },
  { title: 'English', value: 'en' },
  { title: '日本語', value: 'ja' },
  { title: '한국어', value: 'ko' }
];

const strategyOptions = [
  { title: t('article.scrape.strategy_auto'), value: 'auto' },
  { title: 'Toutiao', value: 'toutiao' },
  { title: 'Baidu', value: 'baidu' },
  { title: t('article.scrape.strategy_generic'), value: 'generic' }
];

// Computed
const progressColor = computed(() => {
  if (progressValue.value < 30) return 'error';
  if (progressValue.value < 70) return 'warning';
  return 'success';
});

const statistics = computed(() => [
  {
    label: t('article.scrape.stats.total_scraped'),
    value: recentResults.value.filter(r => r.success).length,
    color: 'text-primary'
  },
  {
    label: t('article.scrape.stats.success_rate'),
    value: recentResults.value.length > 0 
      ? Math.round((recentResults.value.filter(r => r.success).length / recentResults.value.length) * 100) + '%'
      : '0%',
    color: 'text-success'
  },
  {
    label: t('article.scrape.stats.failed'),
    value: recentResults.value.filter(r => !r.success).length,
    color: 'text-error'
  },
  {
    label: t('article.scrape.stats.today'),
    value: recentResults.value.filter(r => {
      const today = new Date();
      const resultDate = new Date(r.timestamp);
      return resultDate.toDateString() === today.toDateString();
    }).length,
    color: 'text-info'
  }
]);

// Methods
const scrapeArticle = async () => {
  if (!formValid.value) return;
  
  scraping.value = true;
  showProgress.value = true;
  progressValue.value = 0;
  progressMessage.value = t('article.scrape.progress_initiating');
  
  try {
    // Simulate progress
    const progressInterval = setInterval(() => {
      if (progressValue.value < 90) {
        progressValue.value += 10;
        progressMessage.value = t('article.scrape.progress_scraping');
      }
    }, 200);

    // TODO: Implement actual scraping API call
    // const result = await articleScraperApi.scrapeArticle({
    //   url: form.url,
    //   targetLanguage: form.targetLanguage,
    //   strategy: form.strategy,
    //   extractCodeBlocks: form.extractCodeBlocks,
    //   extractImages: form.extractImages,
    //   extractMetadata: form.extractMetadata,
    //   timeout: form.timeout
    // });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    clearInterval(progressInterval);
    progressValue.value = 100;
    progressMessage.value = t('article.scrape.progress_completed');

    // Mock result
    const result = {
      id: Date.now(),
      success: true,
      title: 'Sample Article Title',
      url: form.url,
      articleId: Math.floor(Math.random() * 1000) + 1,
      timestamp: new Date()
    };

    recentResults.value.unshift(result);

    // Reset form
    form.url = '';

    setTimeout(() => {
      showProgress.value = false;
      progressValue.value = 0;
    }, 1000);

  } catch (error) {
    console.error('Scraping failed:', error);
    progressValue.value = 0;
    progressMessage.value = t('article.scrape.progress_error');
    
    const errorResult = {
      id: Date.now(),
      success: false,
      url: form.url,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date()
    };
    
    recentResults.value.unshift(errorResult);
    
    setTimeout(() => {
      showProgress.value = false;
    }, 2000);
  } finally {
    scraping.value = false;
  }
};

const scrapeBatch = async () => {
  if (!batchUrls.value.trim()) return;
  
  const urls = batchUrls.value
    .split('\n')
    .map(url => url.trim())
    .filter(url => url && isValidUrl(url));
  
  if (urls.length === 0) return;
  
  batchScraping.value = true;
  showProgress.value = true;
  progressValue.value = 0;
  progressMessage.value = t('article.scrape.progress_batch_initiating');
  
  try {
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      progressValue.value = Math.round((i / urls.length) * 100);
      progressMessage.value = t('article.scrape.progress_batch_scraping', { url, current: i + 1, total: urls.length });
      
      // TODO: Implement batch scraping
      // const result = await articleScraperApi.scrapeArticle({
      //   url,
      //   targetLanguage: form.targetLanguage,
      //   strategy: form.strategy,
      //   extractCodeBlocks: form.extractCodeBlocks,
      //   extractImages: form.extractImages,
      //   extractMetadata: form.extractMetadata,
      //   timeout: form.timeout
      // });
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock result
      const result = {
        id: Date.now() + i,
        success: Math.random() > 0.2, // 80% success rate
        title: `Article ${i + 1}`,
        url,
        articleId: Math.floor(Math.random() * 1000) + 1,
        timestamp: new Date()
      };
      
      recentResults.value.unshift(result);
    }
    
    progressValue.value = 100;
    progressMessage.value = t('article.scrape.progress_batch_completed');
    
    setTimeout(() => {
      showProgress.value = false;
      progressValue.value = 0;
    }, 1000);
    
  } catch (error) {
    console.error('Batch scraping failed:', error);
    progressValue.value = 0;
    progressMessage.value = t('article.scrape.progress_batch_error');
    
    setTimeout(() => {
      showProgress.value = false;
    }, 2000);
  } finally {
    batchScraping.value = false;
  }
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const clearBatch = () => {
  batchUrls.value = '';
};

const clearResults = () => {
  recentResults.value = [];
};

const viewArticle = (articleId: number) => {
  router.push({ name: 'ArticleDetail', params: { id: articleId } });
};
</script>

<style scoped>
.border-error {
  border-left: 4px solid #f44336;
}
</style> 