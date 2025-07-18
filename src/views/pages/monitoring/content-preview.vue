<template>
  <div class="content-preview">
    <v-container fluid>
      <!-- Header -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-eye</v-icon>
              Content Preview Dashboard
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="refreshContent"
                :loading="loading"
                prepend-icon="mdi-refresh"
              >
                Refresh
              </v-btn>
              <v-btn
                color="secondary"
                @click="exportContent"
                prepend-icon="mdi-download"
                class="ml-2"
              >
                Export
              </v-btn>
            </v-card-title>
            <v-card-subtitle>
              Preview scraped and translated article content
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- Content Selection -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="selectedArticle"
                    :items="articleOptions"
                    label="Select Article"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-file-document"
                    @update:model-value="onArticleChange"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="selectedVersion"
                    :items="versionOptions"
                    label="Content Version"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-version-tag"
                    @update:model-value="onVersionChange"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="selectedLanguage"
                    :items="languageOptions"
                    label="Language"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-translate"
                    @update:model-value="onLanguageChange"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn
                    color="primary"
                    @click="compareVersions"
                    :disabled="!canCompare"
                    prepend-icon="mdi-compare"
                    block
                  >
                    Compare
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Content Information -->
      <v-row v-if="selectedContent">
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="info">mdi-information</v-icon>
              Article Information
              <v-spacer></v-spacer>
              <v-chip
                :color="getStatusColor(selectedContent.status)"
                size="small"
              >
                {{ selectedContent.status }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-list density="compact">
                    <v-list-item>
                      <v-list-item-title class="text-body-2">Title</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedContent.title }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-body-2">Source URL</v-list-item-title>
                      <v-list-item-subtitle>
                        <a :href="selectedContent.sourceUrl" target="_blank" class="text-decoration-none">
                          {{ selectedContent.sourceUrl }}
                        </a>
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-body-2">Language</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedContent.language }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-body-2">Word Count</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedContent.wordCount }} words</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12" md="6">
                  <v-list density="compact">
                    <v-list-item>
                      <v-list-item-title class="text-body-2">Scraped At</v-list-item-title>
                      <v-list-item-subtitle>{{ formatTime(selectedContent.scrapedAt) }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-body-2">Translated At</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedContent.translatedAt ? formatTime(selectedContent.translatedAt) : 'Not translated' }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-body-2">Code Blocks</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedContent.codeBlocks?.length || 0 }} blocks</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-body-2">Images</v-list-item-title>
                      <v-list-item-subtitle>{{ selectedContent.images?.length || 0 }} images</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Content Preview -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="success">mdi-eye</v-icon>
              Content Preview
              <v-spacer></v-spacer>
              <v-btn-toggle
                v-model="previewMode"
                mandatory
                density="compact"
              >
                <v-btn value="rendered" prepend-icon="mdi-eye">Rendered</v-btn>
                <v-btn value="html" prepend-icon="mdi-code-tags">HTML</v-btn>
                <v-btn value="markdown" prepend-icon="mdi-language-markdown">Markdown</v-btn>
              </v-btn-toggle>
            </v-card-title>
            <v-card-text>
              <!-- Rendered Preview -->
              <div v-if="previewMode === 'rendered' && selectedContent" class="content-renderer">
                <div class="content-header mb-4">
                  <h1 class="text-h4 mb-2">{{ selectedContent.title }}</h1>
                  <div class="text-caption text-medium-emphasis mb-2">
                    Source: <a :href="selectedContent.sourceUrl" target="_blank">{{ selectedContent.sourceUrl }}</a>
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    {{ formatTime(selectedContent.scrapedAt) }} | {{ selectedContent.wordCount }} words | {{ selectedContent.language }}
                  </div>
                </div>
                
                <!-- Content with code blocks -->
                <div class="content-body" v-html="renderedContent"></div>
                
                <!-- Code blocks section -->
                <div v-if="selectedContent.codeBlocks && selectedContent.codeBlocks.length > 0" class="mt-6">
                  <h3 class="text-h6 mb-3">Code Blocks</h3>
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(block, index) in selectedContent.codeBlocks"
                      :key="block.id"
                    >
                      <v-expansion-panel-title>
                        Code Block {{ index + 1 }} ({{ block.language }})
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <pre class="code-block"><code :class="`language-${block.language}`">{{ block.code }}</code></pre>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
                
                <!-- Images section -->
                <div v-if="selectedContent.images && selectedContent.images.length > 0" class="mt-6">
                  <h3 class="text-h6 mb-3">Images</h3>
                  <v-row>
                    <v-col
                      v-for="image in selectedContent.images"
                      :key="image.id"
                      cols="12"
                      md="4"
                    >
                      <v-card variant="outlined">
                        <v-img
                          :src="image.localPath || image.originalUrl"
                          :alt="image.fileName"
                          height="200"
                          cover
                        ></v-img>
                        <v-card-text class="text-caption">
                          {{ image.fileName }} ({{ formatBytes(image.fileSize) }})
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </div>

              <!-- HTML Preview -->
              <div v-else-if="previewMode === 'html' && selectedContent" class="html-preview">
                <v-textarea
                  v-model="selectedContent.htmlContent"
                  label="HTML Content"
                  variant="outlined"
                  rows="20"
                  readonly
                  class="font-family-monospace"
                ></v-textarea>
              </div>

              <!-- Markdown Preview -->
              <div v-else-if="previewMode === 'markdown' && selectedContent" class="markdown-preview">
                <v-textarea
                  v-model="selectedContent.markdownContent"
                  label="Markdown Content"
                  variant="outlined"
                  rows="20"
                  readonly
                  class="font-family-monospace"
                ></v-textarea>
              </div>

              <!-- No content selected -->
              <div v-else class="text-center pa-8">
                <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-file-document-outline</v-icon>
                <div class="text-h6 text-grey">No content selected</div>
                <div class="text-body-2 text-grey-lighten-1">Please select an article to preview</div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Version Comparison Dialog -->
      <v-dialog v-model="comparisonDialog" max-width="1200" fullscreen>
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-compare</v-icon>
            Version Comparison
            <v-spacer></v-spacer>
            <v-btn icon @click="comparisonDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <h4 class="text-h6 mb-3">Original Version</h4>
                <div class="content-renderer border-right">
                  <div class="content-header mb-4">
                    <h1 class="text-h5 mb-2">{{ comparisonData.original?.title }}</h1>
                    <div class="text-caption text-medium-emphasis">
                      {{ comparisonData.original?.language }} | {{ formatTime(comparisonData.original?.scrapedAt) }}
                    </div>
                  </div>
                  <div class="content-body" v-html="renderedOriginalContent"></div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <h4 class="text-h6 mb-3">Translated Version</h4>
                <div class="content-renderer">
                  <div class="content-header mb-4">
                    <h1 class="text-h5 mb-2">{{ comparisonData.translated?.title }}</h1>
                    <div class="text-caption text-medium-emphasis">
                      {{ comparisonData.translated?.language }} | {{ formatTime(comparisonData.translated?.translatedAt) }}
                    </div>
                  </div>
                  <div class="content-body" v-html="renderedTranslatedContent"></div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Reactive data
const loading = ref(false)
const selectedArticle = ref('')
const selectedVersion = ref('original')
const selectedLanguage = ref('all')
const previewMode = ref('rendered')
const comparisonDialog = ref(false)
const comparisonData = ref({
  original: null,
  translated: null
})

// Mock article data
const articles = ref([
  {
    id: 1,
    title: 'How to Build a Modern Web Application with Vue.js and TypeScript',
    sourceUrl: 'https://toutiao.com/article/123456',
    language: 'Chinese',
    wordCount: 2500,
    status: 'translated',
    scrapedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    translatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    htmlContent: `
      <article>
        <h1>How to Build a Modern Web Application with Vue.js and TypeScript</h1>
        <p>In this comprehensive guide, we'll explore how to build a modern web application using Vue.js 3 and TypeScript...</p>
        <h2>Getting Started</h2>
        <p>First, let's set up our development environment...</p>
        <pre><code class="language-javascript">
const app = createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})
        </code></pre>
        <h2>TypeScript Integration</h2>
        <p>TypeScript provides excellent type safety...</p>
      </article>
    `,
    markdownContent: `
# How to Build a Modern Web Application with Vue.js and TypeScript

In this comprehensive guide, we'll explore how to build a modern web application using Vue.js 3 and TypeScript...

## Getting Started

First, let's set up our development environment...

\`\`\`javascript
const app = createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})
\`\`\`

## TypeScript Integration

TypeScript provides excellent type safety...
    `,
    codeBlocks: [
      {
        id: 'cb-1',
        language: 'javascript',
        code: `const app = createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})`
      }
    ],
    images: [
      {
        id: 'img-1',
        fileName: 'vue-typescript-setup.png',
        localPath: '/assets/images/vue-typescript-setup.png',
        originalUrl: 'https://example.com/vue-typescript-setup.png',
        fileSize: 1024 * 512 // 512KB
      }
    ]
  },
  {
    id: 2,
    title: 'Advanced State Management with Pinia',
    sourceUrl: 'https://toutiao.com/article/789012',
    language: 'Chinese',
    wordCount: 1800,
    status: 'scraped',
    scrapedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    translatedAt: null,
    htmlContent: `
      <article>
        <h1>Advanced State Management with Pinia</h1>
        <p>Pinia is the official state management library for Vue.js...</p>
        <h2>Store Setup</h2>
        <p>Let's create a basic store...</p>
        <pre><code class="language-typescript">
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
        </code></pre>
      </article>
    `,
    markdownContent: `
# Advanced State Management with Pinia

Pinia is the official state management library for Vue.js...

## Store Setup

Let's create a basic store...

\`\`\`typescript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
\`\`\`
    `,
    codeBlocks: [
      {
        id: 'cb-2',
        language: 'typescript',
        code: `import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})`
      }
    ],
    images: []
  }
])

// Options
const articleOptions = computed(() => 
  articles.value.map(article => ({
    title: article.title,
    value: article.id.toString()
  }))
)

const versionOptions = [
  { title: 'Original', value: 'original' },
  { title: 'Translated', value: 'translated' },
  { title: 'Both', value: 'both' }
]

const languageOptions = [
  { title: 'All Languages', value: 'all' },
  { title: 'Chinese', value: 'chinese' },
  { title: 'English', value: 'english' }
]

// Computed properties
const selectedContent = computed(() => {
  if (!selectedArticle.value) return null
  return articles.value.find(article => article.id.toString() === selectedArticle.value)
})

const canCompare = computed(() => {
  return selectedContent.value && selectedContent.value.status === 'translated'
})

const renderedContent = computed(() => {
  if (!selectedContent.value) return ''
  
  // Process HTML content to highlight code blocks
  let content = selectedContent.value.htmlContent
  
  // Add syntax highlighting classes
  content = content.replace(
    /<pre><code class="language-(\w+)">/g,
    '<pre class="code-block"><code class="language-$1">'
  )
  
  return content
})

const renderedOriginalContent = computed(() => {
  if (!comparisonData.value.original) return ''
  return comparisonData.value.original.htmlContent
})

const renderedTranslatedContent = computed(() => {
  if (!comparisonData.value.translated) return ''
  return comparisonData.value.translated.htmlContent
})

// Methods
const refreshContent = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real implementation, fetch latest content from API
  } catch (error) {
    console.error('Error refreshing content:', error)
  } finally {
    loading.value = false
  }
}

const exportContent = () => {
  if (!selectedContent.value) return
  
  const data = {
    article: selectedContent.value,
    exportTime: new Date().toISOString(),
    format: previewMode.value
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `article-${selectedContent.value.id}-${previewMode.value}-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const onArticleChange = () => {
  // Reset version selection when article changes
  selectedVersion.value = 'original'
}

const onVersionChange = () => {
  // Handle version change logic
}

const onLanguageChange = () => {
  // Handle language change logic
}

const compareVersions = () => {
  if (!selectedContent.value) return
  
  // In a real implementation, you would fetch both versions
  comparisonData.value = {
    original: selectedContent.value,
    translated: {
      ...selectedContent.value,
      title: 'Translated: ' + selectedContent.value.title,
      language: 'English',
      translatedAt: new Date()
    }
  }
  
  comparisonDialog.value = true
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'scraped':
      return 'info'
    case 'translated':
      return 'success'
    case 'published':
      return 'primary'
    default:
      return 'grey'
  }
}

const formatTime = (date: Date) => {
  if (!date) return 'N/A'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const formatBytes = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

// Lifecycle
onMounted(() => {
  // Set default selection
  if (articles.value.length > 0) {
    selectedArticle.value = articles.value[0].id.toString()
  }
})
</script>

<style scoped>
.content-preview {
  padding: 16px;
}

.content-renderer {
  max-width: 100%;
  overflow-x: auto;
}

.content-header {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
}

.content-body {
  line-height: 1.6;
  font-size: 16px;
}

.content-body h1,
.content-body h2,
.content-body h3,
.content-body h4,
.content-body h5,
.content-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

.content-body p {
  margin-bottom: 16px;
}

.content-body pre {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  overflow-x: auto;
  margin: 16px 0;
}

.content-body code {
  font-family: 'Courier New', monospace;
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 14px;
}

.code-block {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
}

.border-right {
  border-right: 1px solid #e0e0e0;
  padding-right: 16px;
}

.font-family-monospace {
  font-family: 'Courier New', monospace;
}

/* Syntax highlighting colors */
.language-javascript {
  color: #d63384;
}

.language-typescript {
  color: #0d6efd;
}

.language-html {
  color: #198754;
}

.language-css {
  color: #fd7e14;
}
</style> 