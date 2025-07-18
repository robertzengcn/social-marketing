<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ t('article.translate.title') }}</v-card-title>
          <v-card-text>
            <v-form ref="translateForm" v-model="formValid">
              <v-row>
                <!-- Article Selection -->
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.articleId"
                    :label="t('article.translate.select_article')"
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
                    v-model="form.targetLanguage"
                    :label="t('article.translate.target_language')"
                    :items="languageOptions"
                    :rules="[rules.required]"
                    required
                  />
                </v-col>
              </v-row>

              <!-- Translation Options -->
              <v-expansion-panels class="mt-4">
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    {{ t('article.translate.options') }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="form.translationEngine"
                          :label="t('article.translate.engine')"
                          :items="engineOptions"
                          :rules="[rules.required]"
                          required
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="form.qualityLevel"
                          :label="t('article.translate.quality_level')"
                          :items="qualityOptions"
                          :rules="[rules.required]"
                          required
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-switch
                          v-model="form.preserveCodeBlocks"
                          :label="t('article.translate.preserve_code_blocks')"
                          color="primary"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-switch
                          v-model="form.useTranslationMemory"
                          :label="t('article.translate.use_translation_memory')"
                          color="primary"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-switch
                          v-model="form.autoQualityCheck"
                          :label="t('article.translate.auto_quality_check')"
                          color="primary"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="form.chunkSize"
                          :label="t('article.translate.chunk_size')"
                          type="number"
                          suffix="words"
                          min="50"
                          max="1000"
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
                    :loading="translating"
                    :disabled="!formValid || !selectedArticle"
                    @click="startTranslation"
                    block
                  >
                    {{ t('article.translate.start_translation') }}
                  </v-btn>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    color="secondary"
                    :loading="batchTranslating"
                    :disabled="!availableArticles.length"
                    @click="startBatchTranslation"
                    block
                  >
                    {{ t('article.translate.batch_translate') }}
                  </v-btn>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    variant="outlined"
                    @click="previewTranslation"
                    block
                  >
                    {{ t('article.translate.preview') }}
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
          <v-card-title>{{ t('article.translate.article_preview') }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <h4>{{ t('article.translate.original_content') }}</h4>
                <div class="content-preview">
                  <div v-html="formatContent(selectedArticle.originalContent)" />
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <h4>{{ t('article.translate.translated_content') }}</h4>
                <div class="content-preview">
                  <div v-if="translatedContent" v-html="formatContent(translatedContent)" />
                  <div v-else class="text-medium-emphasis text-center pa-4">
                    {{ t('article.translate.no_translation_yet') }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Translation Progress -->
    <v-row v-if="showProgress" class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ t('article.translate.progress_title') }}</v-card-title>
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
            <div v-if="translationSteps.length > 0" class="mt-4">
              <v-list>
                <v-list-item
                  v-for="step in translationSteps"
                  :key="step.id"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="step.completed ? 'success' : step.active ? 'primary' : 'grey'"
                      :icon="step.completed ? 'mdi-check-circle' : step.active ? 'mdi-loading' : 'mdi-circle-outline'"
                    />
                  </template>
                  <v-list-item-title>{{ step.title }}</v-list-item-title>
                  <v-list-item-subtitle v-if="step.description">
                    {{ step.description }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Translation Memory -->
    <v-row v-if="translationMemory.length > 0" class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ t('article.translate.translation_memory') }}</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="memory in translationMemory"
                :key="memory.id"
              >
                <v-list-item-title>{{ memory.sourceText }}</v-list-item-title>
                <v-list-item-subtitle>{{ memory.translatedText }}</v-list-item-subtitle>
                <template v-slot:append>
                  <v-chip size="small" color="info">
                    {{ memory.qualityScore }}%
                  </v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Translations -->
    <v-row v-if="recentTranslations.length > 0" class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center justify-space-between">
            <span>{{ t('article.translate.recent_translations') }}</span>
            <v-btn
              variant="outlined"
              size="small"
              @click="clearRecentTranslations"
            >
              {{ t('common.clear') }}
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="translation in recentTranslations"
                :key="translation.id"
              >
                <template v-slot:prepend>
                  <v-icon
                    :color="translation.success ? 'success' : 'error'"
                    :icon="translation.success ? 'mdi-check-circle' : 'mdi-close-circle'"
                  />
                </template>
                <v-list-item-title>
                  {{ translation.articleTitle }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ translation.sourceLanguage }} → {{ translation.targetLanguage }}
                </v-list-item-subtitle>
                <template v-slot:append>
                  <div class="d-flex align-center gap-2">
                    <v-chip
                      v-if="translation.qualityScore"
                      size="small"
                      :color="getQualityColor(translation.qualityScore)"
                    >
                      {{ translation.qualityScore }}%
                    </v-chip>
                    <v-btn
                      v-if="translation.articleId"
                      size="small"
                      variant="text"
                      @click="viewArticle(translation.articleId)"
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
const translating = ref(false);
const batchTranslating = ref(false);
const showProgress = ref(false);
const progressValue = ref(0);
const progressMessage = ref('');
const selectedArticle = ref<ArticleEntity | null>(null);
const translatedContent = ref('');
const translationMemory = ref<any[]>([]);
const recentTranslations = ref<any[]>([]);
const availableArticles = ref<ArticleEntity[]>([]);
const translationSteps = ref<any[]>([]);

// Form
const form = reactive({
  articleId: null as number | null,
  targetLanguage: 'zh',
  translationEngine: 'gpt-4',
  qualityLevel: 'high',
  preserveCodeBlocks: true,
  useTranslationMemory: true,
  autoQualityCheck: true,
  chunkSize: 200
});

// Form validation rules
const rules = {
  required: (v: any) => !!v || t('common.required')
};

// Options
const languageOptions = [
  { title: '中文', value: 'zh' },
  { title: 'English', value: 'en' },
  { title: '日本語', value: 'ja' },
  { title: '한국어', value: 'ko' }
];

const engineOptions = [
  { title: 'GPT-4', value: 'gpt-4' },
  { title: 'GPT-3.5', value: 'gpt-3.5' },
  { title: 'Claude', value: 'claude' },
  { title: 'Gemini', value: 'gemini' }
];

const qualityOptions = [
  { title: t('article.translate.quality_low'), value: 'low' },
  { title: t('article.translate.quality_medium'), value: 'medium' },
  { title: t('article.translate.quality_high'), value: 'high' },
  { title: t('article.translate.quality_expert'), value: 'expert' }
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
    // TODO: Implement API call to load articles with status 'scraped'
    // const response = await articleApi.getArticlesByStatus(ArticleStatus.SCRAPED);
    // availableArticles.value = response.data;
    
    // Mock data
    availableArticles.value = [
      {
        id: 1,
        title: 'Sample Article 1',
        originalContent: 'This is a sample article content...',
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
  } catch (error) {
    console.error('Failed to load articles:', error);
  }
};

const loadArticle = async () => {
  if (!form.articleId) {
    selectedArticle.value = null;
    translatedContent.value = '';
    return;
  }
  
  try {
    // TODO: Implement API call to load article
    // const article = await articleApi.getArticleById(form.articleId);
    // selectedArticle.value = article;
    
    // Mock data
    selectedArticle.value = availableArticles.value.find(a => a.id === form.articleId) || null;
    translatedContent.value = '';
  } catch (error) {
    console.error('Failed to load article:', error);
  }
};

const startTranslation = async () => {
  if (!formValid.value || !selectedArticle.value) return;
  
  translating.value = true;
  showProgress.value = true;
  progressValue.value = 0;
  progressMessage.value = t('article.translate.progress_initiating');
  
  // Initialize translation steps
  translationSteps.value = [
    { id: 1, title: t('article.translate.step_analyzing'), description: '', completed: false, active: false },
    { id: 2, title: t('article.translate.step_chunking'), description: '', completed: false, active: false },
    { id: 3, title: t('article.translate.step_translating'), description: '', completed: false, active: false },
    { id: 4, title: t('article.translate.step_quality_check'), description: '', completed: false, active: false },
    { id: 5, title: t('article.translate.step_saving'), description: '', completed: false, active: false }
  ];
  
  try {
    // Step 1: Analyzing
    translationSteps.value[0].active = true;
    progressValue.value = 10;
    progressMessage.value = t('article.translate.progress_analyzing');
    await simulateStep(1000);
    translationSteps.value[0].completed = true;
    translationSteps.value[0].active = false;
    
    // Step 2: Chunking
    translationSteps.value[1].active = true;
    progressValue.value = 25;
    progressMessage.value = t('article.translate.progress_chunking');
    await simulateStep(1500);
    translationSteps.value[1].completed = true;
    translationSteps.value[1].active = false;
    
    // Step 3: Translating
    translationSteps.value[2].active = true;
    progressValue.value = 50;
    progressMessage.value = t('article.translate.progress_translating');
    await simulateStep(3000);
    translationSteps.value[2].completed = true;
    translationSteps.value[2].active = false;
    
    // Step 4: Quality Check
    translationSteps.value[3].active = true;
    progressValue.value = 80;
    progressMessage.value = t('article.translate.progress_quality_check');
    await simulateStep(1000);
    translationSteps.value[3].completed = true;
    translationSteps.value[3].active = false;
    
    // Step 5: Saving
    translationSteps.value[4].active = true;
    progressValue.value = 95;
    progressMessage.value = t('article.translate.progress_saving');
    await simulateStep(500);
    translationSteps.value[4].completed = true;
    translationSteps.value[4].active = false;
    
    progressValue.value = 100;
    progressMessage.value = t('article.translate.progress_completed');
    
    // Mock translated content
    translatedContent.value = '这是翻译后的文章内容...';
    
    // Add to recent translations
    const translationResult = {
      id: Date.now(),
      success: true,
      articleTitle: selectedArticle.value.title,
      sourceLanguage: selectedArticle.value.sourceLanguage,
      targetLanguage: form.targetLanguage,
      qualityScore: 95,
      articleId: selectedArticle.value.id,
      timestamp: new Date()
    };
    
    recentTranslations.value.unshift(translationResult);
    
    setTimeout(() => {
      showProgress.value = false;
      progressValue.value = 0;
    }, 2000);
    
  } catch (error) {
    console.error('Translation failed:', error);
    progressValue.value = 0;
    progressMessage.value = t('article.translate.progress_error');
    
    setTimeout(() => {
      showProgress.value = false;
    }, 3000);
  } finally {
    translating.value = false;
  }
};

const simulateStep = (duration: number) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

const startBatchTranslation = async () => {
  if (availableArticles.value.length === 0) return;
  
  batchTranslating.value = true;
  showProgress.value = true;
  progressValue.value = 0;
  progressMessage.value = t('article.translate.progress_batch_initiating');
  
  try {
    const articlesToTranslate = availableArticles.value.filter(a => a.status === ArticleStatus.SCRAPED);
    
    for (let i = 0; i < articlesToTranslate.length; i++) {
      const article = articlesToTranslate[i];
      progressValue.value = Math.round((i / articlesToTranslate.length) * 100);
      progressMessage.value = t('article.translate.progress_batch_translating', { 
        title: article.title, 
        current: i + 1, 
        total: articlesToTranslate.length 
      });
      
      // TODO: Implement batch translation
      await simulateStep(2000);
      
      // Mock result
      const translationResult = {
        id: Date.now() + i,
        success: Math.random() > 0.1, // 90% success rate
        articleTitle: article.title,
        sourceLanguage: article.sourceLanguage,
        targetLanguage: form.targetLanguage,
        qualityScore: Math.floor(Math.random() * 20) + 80, // 80-100%
        articleId: article.id,
        timestamp: new Date()
      };
      
      recentTranslations.value.unshift(translationResult);
    }
    
    progressValue.value = 100;
    progressMessage.value = t('article.translate.progress_batch_completed');
    
    setTimeout(() => {
      showProgress.value = false;
      progressValue.value = 0;
    }, 1000);
    
  } catch (error) {
    console.error('Batch translation failed:', error);
    progressValue.value = 0;
    progressMessage.value = t('article.translate.progress_batch_error');
    
    setTimeout(() => {
      showProgress.value = false;
    }, 2000);
  } finally {
    batchTranslating.value = false;
  }
};

const previewTranslation = () => {
  if (!selectedArticle.value) return;
  
  // TODO: Implement preview translation
  translatedContent.value = '这是预览的翻译内容...';
};

const getQualityColor = (score: number) => {
  if (score >= 90) return 'success';
  if (score >= 70) return 'warning';
  return 'error';
};

const formatContent = (content: string) => {
  return content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
};

const clearRecentTranslations = () => {
  recentTranslations.value = [];
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