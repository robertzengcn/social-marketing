<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <!-- Header -->
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center justify-space-between">
            <div>
              <h2>{{ article?.title || t('article.detail.loading') }}</h2>
              <div class="text-caption text-medium-emphasis">
                {{ t('article.detail.id') }}: {{ $route.params.id }}
              </div>
            </div>
            <div class="d-flex gap-2">
              <v-btn
                v-if="article?.status === 'scraped'"
                color="primary"
                prepend-icon="mdi-translate"
                @click="startTranslation"
              >
                {{ t('article.detail.translate') }}
              </v-btn>
              <v-btn
                v-if="article?.status === 'translated'"
                color="success"
                prepend-icon="mdi-publish"
                @click="startPublishing"
              >
                {{ t('article.detail.publish') }}
              </v-btn>
              <v-btn
                variant="outlined"
                prepend-icon="mdi-arrow-left"
                @click="$router.back()"
              >
                {{ t('common.back') }}
              </v-btn>
            </div>
          </v-card-title>
        </v-card>

        <v-row v-if="loading">
          <v-col cols="12">
            <v-card>
              <v-card-text class="text-center">
                <v-progress-circular indeterminate size="64" />
                <div class="mt-4">{{ t('common.loading') }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-else-if="article">
          <!-- Main Content -->
          <v-col cols="12" lg="8">
            <!-- Article Information -->
            <v-card class="mb-4">
              <v-card-title>{{ t('article.detail.information') }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>{{ t('article.detail.status') }}</v-list-item-title>
                        <template v-slot:append>
                          <v-chip
                            :color="getStatusColor(article.status)"
                            :text="getStatusText(article.status)"
                            size="small"
                          />
                        </template>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>{{ t('article.detail.source_language') }}</v-list-item-title>
                        <template v-slot:append>
                          <span>{{ getLanguageName(article.sourceLanguage) }}</span>
                        </template>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>{{ t('article.detail.target_language') }}</v-list-item-title>
                        <template v-slot:append>
                          <span>{{ getLanguageName(article.targetLanguage) }}</span>
                        </template>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>{{ t('article.detail.version') }}</v-list-item-title>
                        <template v-slot:append>
                          <span>{{ article.version }}</span>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>{{ t('article.detail.created_at') }}</v-list-item-title>
                        <template v-slot:append>
                          <span>{{ formatDate(article.createdAt) }}</span>
                        </template>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>{{ t('article.detail.updated_at') }}</v-list-item-title>
                        <template v-slot:append>
                          <span>{{ formatDate(article.updatedAt) }}</span>
                        </template>
                      </v-list-item>
                      <v-list-item v-if="article.translatedAt">
                        <v-list-item-title>{{ t('article.detail.translated_at') }}</v-list-item-title>
                        <template v-slot:append>
                          <span>{{ formatDate(article.translatedAt) }}</span>
                        </template>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>{{ t('article.detail.source_url') }}</v-list-item-title>
                        <template v-slot:append>
                          <v-btn
                            :href="article.sourceUrl"
                            target="_blank"
                            size="small"
                            variant="text"
                            prepend-icon="mdi-open-in-new"
                          >
                            {{ t('common.open') }}
                          </v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Original Content -->
            <v-card class="mb-4">
              <v-card-title>{{ t('article.detail.original_content') }}</v-card-title>
              <v-card-text>
                <div class="content-preview">
                  <div v-html="formatContent(article.originalContent)" />
                </div>
              </v-card-text>
            </v-card>

            <!-- Translated Content -->
            <v-card v-if="article.translatedContent" class="mb-4">
              <v-card-title>{{ t('article.detail.translated_content') }}</v-card-title>
              <v-card-text>
                <div class="content-preview">
                  <div v-html="formatContent(article.translatedContent)" />
                </div>
              </v-card-text>
            </v-card>

            <!-- Code Blocks -->
            <v-card v-if="article.codeBlocks && article.codeBlocks.length > 0" class="mb-4">
              <v-card-title>{{ t('article.detail.code_blocks') }}</v-card-title>
              <v-card-text>
                <v-expansion-panels>
                  <v-expansion-panel
                    v-for="(block, index) in article.codeBlocks"
                    :key="index"
                  >
                    <v-expansion-panel-title>
                      {{ t('article.detail.code_block') }} {{ index + 1 }}
                      <template v-slot:actions>
                        <v-chip size="small" :color="getLanguageColor(block.language)">
                          {{ block.language }}
                        </v-chip>
                      </template>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <pre><code :class="block.language">{{ block.code }}</code></pre>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Sidebar -->
          <v-col cols="12" lg="4">
            <!-- Processing History -->
            <v-card class="mb-4">
              <v-card-title>{{ t('article.detail.processing_history') }}</v-card-title>
              <v-card-text>
                <v-timeline v-if="processingLogs.length > 0">
                  <v-timeline-item
                    v-for="log in processingLogs"
                    :key="log.id"
                    :color="getLogStatusColor(log.status)"
                    :icon="getLogStatusIcon(log.status)"
                  >
                    <template v-slot:opposite>
                      <div class="text-caption">{{ formatDate(log.createdAt) }}</div>
                    </template>
                    <v-card>
                      <v-card-title class="text-h6">
                        {{ t(`article.operation.${log.operation}`) }}
                      </v-card-title>
                      <v-card-text>
                        <div class="text-body-2">{{ log.message }}</div>
                        <div v-if="log.details" class="text-caption mt-2">
                          {{ log.details }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
                <div v-else class="text-center text-medium-emphasis">
                  {{ t('article.detail.no_processing_history') }}
                </div>
              </v-card-text>
            </v-card>

            <!-- Publishing Results -->
            <v-card class="mb-4">
              <v-card-title>{{ t('article.detail.publishing_results') }}</v-card-title>
              <v-card-text>
                <div v-if="publishResults.length > 0">
                  <v-list>
                    <v-list-item
                      v-for="result in publishResults"
                      :key="result.id"
                    >
                      <template v-slot:prepend>
                        <v-icon
                          :color="result.success ? 'success' : 'error'"
                          :icon="result.success ? 'mdi-check-circle' : 'mdi-close-circle'"
                        />
                      </template>
                      <v-list-item-title>
                        {{ result.platformName }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ formatDate(result.publishedAt) }}
                      </v-list-item-subtitle>
                      <template v-slot:append>
                        <v-btn
                          v-if="result.publishedUrl"
                          :href="result.publishedUrl"
                          target="_blank"
                          size="small"
                          variant="text"
                          icon="mdi-open-in-new"
                        />
                      </template>
                    </v-list-item>
                  </v-list>
                </div>
                <div v-else class="text-center text-medium-emphasis">
                  {{ t('article.detail.no_publishing_results') }}
                </div>
              </v-card-text>
            </v-card>

            <!-- Metadata -->
            <v-card v-if="article.metadata && article.metadata.length > 0">
              <v-card-title>{{ t('article.detail.metadata') }}</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="meta in article.metadata"
                    :key="meta.id"
                  >
                    <v-list-item-title>{{ meta.key }}</v-list-item-title>
                    <v-list-item-subtitle>{{ meta.value }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col cols="12">
            <v-card>
              <v-card-text class="text-center">
                <v-icon size="64" color="error">mdi-alert-circle</v-icon>
                <div class="mt-4">{{ t('article.detail.not_found') }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ArticleEntity, ArticleStatus } from '@/entity/Article.entity';
import { ArticleProcessingLogEntity, ProcessingStatus } from '@/entity/ArticleProcessingLog.entity';
import { PublishResultEntity } from '@/entity/PublishResult.entity';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

// Data
const article = ref<ArticleEntity | null>(null);
const processingLogs = ref<ArticleProcessingLogEntity[]>([]);
const publishResults = ref<PublishResultEntity[]>([]);
const loading = ref(true);

// Methods
const loadArticle = async () => {
  loading.value = true;
  try {
    const articleId = parseInt(route.params.id as string);
    
    // TODO: Implement API calls
    // const [articleData, logsData, resultsData] = await Promise.all([
    //   articleApi.getArticleById(articleId),
    //   processingLogApi.getProcessingLogsByArticleId(articleId),
    //   publishResultApi.getPublishResultsByArticleId(articleId)
    // ]);
    
    // Mock data for now
    article.value = {
      id: articleId,
      title: 'Sample Article Title',
      originalContent: '<p>This is the original content of the article...</p>',
      translatedContent: '<p>这是文章的翻译内容...</p>',
      sourceUrl: 'https://example.com/article',
      contentHash: 'hash123',
      status: ArticleStatus.TRANSLATED,
      sourceLanguage: 'en',
      targetLanguage: 'zh',
      createdAt: new Date(),
      updatedAt: new Date(),
      translatedAt: new Date(),
      version: 1,
      codeBlocks: [
        {
          id: 1,
          articleId: articleId,
          language: 'javascript',
          code: 'console.log("Hello World");',
          lineNumber: 1
        }
      ],
      metadata: [
        {
          id: 1,
          articleId: articleId,
          key: 'author',
          value: 'John Doe'
        }
      ]
    } as ArticleEntity;

    processingLogs.value = [
      {
        id: 1,
        articleId: articleId,
        operation: 'scrape',
        status: ProcessingStatus.SUCCESS,
        message: 'Article scraped successfully',
        createdAt: new Date()
      } as ArticleProcessingLogEntity
    ];

    publishResults.value = [
      {
        id: 1,
        articleId: articleId,
        platformName: 'Toutiao',
        accountId: 1,
        contentVersion: 1,
        success: true,
        publishedUrl: 'https://toutiao.com/article/123',
        publishedAt: new Date(),
        retryCount: 0
      } as PublishResultEntity
    ];
  } catch (error) {
    console.error('Failed to load article:', error);
  } finally {
    loading.value = false;
  }
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

const getLanguageName = (code: string) => {
  const languages: Record<string, string> = {
    'en': 'English',
    'zh': '中文',
    'ja': '日本語',
    'ko': '한국어'
  };
  return languages[code] || code;
};

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    'javascript': 'amber',
    'python': 'blue',
    'java': 'orange',
    'cpp': 'purple',
    'html': 'red',
    'css': 'pink'
  };
  return colors[language] || 'grey';
};

const getLogStatusColor = (status: ProcessingStatus) => {
  switch (status) {
    case ProcessingStatus.SUCCESS: return 'success';
    case ProcessingStatus.ERROR: return 'error';
    case ProcessingStatus.WARNING: return 'warning';
    default: return 'grey';
  }
};

const getLogStatusIcon = (status: ProcessingStatus) => {
  switch (status) {
    case ProcessingStatus.SUCCESS: return 'mdi-check-circle';
    case ProcessingStatus.ERROR: return 'mdi-close-circle';
    case ProcessingStatus.WARNING: return 'mdi-alert-circle';
    default: return 'mdi-information';
  }
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString();
};

const formatContent = (content: string) => {
  // Basic HTML formatting - in a real app, you might want to use a markdown parser
  return content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
};

const startTranslation = () => {
  router.push({ name: 'ArticleTranslate', query: { articleId: article.value?.id } });
};

const startPublishing = () => {
  router.push({ name: 'ArticlePublish', query: { articleId: article.value?.id } });
};

// Lifecycle
onMounted(() => {
  loadArticle();
});
</script>

<style scoped>
.content-preview {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  background-color: #fafafa;
}

pre {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 16px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', monospace;
}
</style> 