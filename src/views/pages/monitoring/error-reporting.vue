<template>
  <div class="error-reporting">
    <v-container fluid>
      <!-- Header -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="error">mdi-alert-circle</v-icon>
              Error Reporting Dashboard
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="refreshErrors"
                :loading="loading"
                prepend-icon="mdi-refresh"
              >
                Refresh
              </v-btn>
              <v-btn
                color="error"
                @click="clearAllErrors"
                :disabled="filteredErrors.length === 0"
                prepend-icon="mdi-delete-sweep"
                class="ml-2"
              >
                Clear All
              </v-btn>
            </v-card-title>
            <v-card-subtitle>
              Comprehensive error tracking and reporting system
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- Error Statistics -->
      <v-row>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-error">
                {{ totalErrors }}
              </div>
              <div class="text-caption text-medium-emphasis">Total Errors</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-warning">
                {{ criticalErrors }}
              </div>
              <div class="text-caption text-medium-emphasis">Critical</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-info">
                {{ todayErrors }}
              </div>
              <div class="text-caption text-medium-emphasis">Today</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-success">
                {{ resolvedErrors }}
              </div>
              <div class="text-caption text-medium-emphasis">Resolved</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Filters and Search -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="selectedSeverity"
                    :items="severityOptions"
                    label="Severity Level"
                    density="compact"
                    variant="outlined"
                    clearable
                    prepend-inner-icon="mdi-filter"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="selectedModule"
                    :items="moduleOptions"
                    label="Module"
                    density="compact"
                    variant="outlined"
                    clearable
                    prepend-inner-icon="mdi-package"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="selectedStatus"
                    :items="statusOptions"
                    label="Status"
                    density="compact"
                    variant="outlined"
                    clearable
                    prepend-inner-icon="mdi-checkbox-marked-circle"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="searchQuery"
                    label="Search errors"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-magnify"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="dateRange.start"
                        label="Start Date"
                        type="date"
                        density="compact"
                        variant="outlined"
                        prepend-inner-icon="mdi-calendar"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="dateRange.end"
                        label="End Date"
                        type="date"
                        density="compact"
                        variant="outlined"
                        prepend-inner-icon="mdi-calendar"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="6" class="d-flex align-center">
                  <v-btn
                    color="primary"
                    variant="outlined"
                    @click="exportErrors"
                    prepend-icon="mdi-download"
                    class="mr-2"
                  >
                    Export
                  </v-btn>
                  <v-btn
                    color="secondary"
                    variant="outlined"
                    @click="clearFilters"
                    prepend-icon="mdi-filter-off"
                  >
                    Clear Filters
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Error Table -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="error">mdi-alert</v-icon>
              Error Logs
              <v-spacer></v-spacer>
              <v-chip
                color="primary"
                size="small"
              >
                {{ filteredErrors.length }} of {{ totalErrors }} errors
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="filteredErrors"
                :loading="loading"
                :search="searchQuery"
                density="compact"
                class="elevation-1"
                :items-per-page="20"
                :items-per-page-options="[10, 20, 50, 100]"
                show-expand
                expand-on-click
              >
                <!-- Severity Column -->
                <template v-slot:item.severity="{ item }">
                  <v-chip
                    :color="getSeverityColor(item.severity)"
                    size="small"
                    variant="outlined"
                  >
                    <v-icon
                      :icon="getSeverityIcon(item.severity)"
                      size="x-small"
                      class="mr-1"
                    ></v-icon>
                    {{ item.severity }}
                  </v-chip>
                </template>

                <!-- Status Column -->
                <template v-slot:item.status="{ item }">
                  <v-chip
                    :color="getStatusColor(item.status)"
                    size="small"
                    variant="outlined"
                  >
                    {{ item.status }}
                  </v-chip>
                </template>

                <!-- Timestamp Column -->
                <template v-slot:item.timestamp="{ item }">
                  {{ formatTime(item.timestamp) }}
                </template>

                <!-- Module Column -->
                <template v-slot:item.module="{ item }">
                  <v-chip
                    color="info"
                    size="x-small"
                    variant="tonal"
                  >
                    {{ item.module }}
                  </v-chip>
                </template>

                <!-- Actions Column -->
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    size="x-small"
                    color="primary"
                    variant="text"
                    @click="viewErrorDetails(item)"
                    class="mr-1"
                  >
                    Details
                  </v-btn>
                  <v-btn
                    v-if="item.status === 'open'"
                    size="x-small"
                    color="success"
                    variant="text"
                    @click="resolveError(item)"
                  >
                    Resolve
                  </v-btn>
                  <v-btn
                    v-else
                    size="x-small"
                    color="warning"
                    variant="text"
                    @click="reopenError(item)"
                  >
                    Reopen
                  </v-btn>
                </template>

                <!-- Expanded Row Content -->
                <template v-slot:expanded-row="{ item }">
                  <v-card class="ma-2 pa-4" variant="outlined">
                    <v-row>
                      <v-col cols="12" md="6">
                        <h4 class="text-h6 mb-2">Error Details</h4>
                        <div class="text-body-2">
                          <strong>Error ID:</strong> {{ item.id }}<br>
                          <strong>Module:</strong> {{ item.module }}<br>
                          <strong>Function:</strong> {{ item.function }}<br>
                          <strong>Line:</strong> {{ item.line }}<br>
                          <strong>User:</strong> {{ item.user || 'System' }}<br>
                          <strong>Session:</strong> {{ item.sessionId || 'N/A' }}
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <h4 class="text-h6 mb-2">Stack Trace</h4>
                        <pre class="text-caption error-stack-trace">{{ item.stackTrace }}</pre>
                      </v-col>
                    </v-row>
                    <v-row v-if="item.context">
                      <v-col cols="12">
                        <h4 class="text-h6 mb-2">Context</h4>
                        <pre class="text-caption error-context">{{ JSON.stringify(item.context, null, 2) }}</pre>
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Error Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="800">
      <v-card>
        <v-card-title class="d-flex align-center">
          Error Details
          <v-spacer></v-spacer>
          <v-btn icon @click="detailsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="selectedError">
          <v-row>
            <v-col cols="12" md="6">
              <v-list>
                <v-list-item>
                  <v-list-item-title>Error ID</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedError.id }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Severity</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      :color="getSeverityColor(selectedError.severity)"
                      size="small"
                    >
                      {{ selectedError.severity }}
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Status</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      :color="getStatusColor(selectedError.status)"
                      size="small"
                    >
                      {{ selectedError.status }}
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Module</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedError.module }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Function</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedError.function }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Line</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedError.line }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Timestamp</v-list-item-title>
                  <v-list-item-subtitle>{{ formatTime(selectedError.timestamp) }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>User</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedError.user || 'System' }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="6">
              <h4 class="text-h6 mb-2">Error Message</h4>
              <v-alert
                :type="getSeverityAlertType(selectedError.severity)"
                variant="tonal"
                class="mb-4"
              >
                {{ selectedError.message }}
              </v-alert>
              
              <h4 class="text-h6 mb-2">Stack Trace</h4>
              <pre class="error-stack-trace">{{ selectedError.stackTrace }}</pre>
              
              <h4 v-if="selectedError.context" class="text-h6 mb-2 mt-4">Context</h4>
              <pre v-if="selectedError.context" class="error-context">{{ JSON.stringify(selectedError.context, null, 2) }}</pre>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="selectedError && selectedError.status === 'open'"
            color="success"
            @click="resolveError(selectedError)"
          >
            Mark as Resolved
          </v-btn>
          <v-btn
            v-else-if="selectedError"
            color="warning"
            @click="reopenError(selectedError)"
          >
            Reopen Error
          </v-btn>
          <v-btn color="primary" @click="detailsDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Reactive data
const loading = ref(false)
const searchQuery = ref('')
const selectedSeverity = ref('')
const selectedModule = ref('')
const selectedStatus = ref('')
const dateRange = ref({
  start: '',
  end: ''
})
const detailsDialog = ref(false)
const selectedError = ref(null)

// Mock error data
const errors = ref([
  {
    id: 'ERR-001',
    message: 'Failed to scrape article from Toutiao - Network timeout',
    severity: 'critical',
    status: 'open',
    module: 'ArticleScraping',
    function: 'scrapeArticle',
    line: 45,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    user: 'system',
    sessionId: 'sess-123',
    stackTrace: 'Error: Network timeout\n    at scrapeArticle (scraper.js:45:12)\n    at processArticle (processor.js:23:8)',
    context: { url: 'https://toutiao.com/article/123', retryCount: 3 }
  },
  {
    id: 'ERR-002',
    message: 'OpenAI API rate limit exceeded',
    severity: 'warning',
    status: 'resolved',
    module: 'Translation',
    function: 'translateText',
    line: 78,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: 'admin',
    sessionId: 'sess-456',
    stackTrace: 'Error: Rate limit exceeded\n    at translateText (translator.js:78:15)\n    at processTranslation (processor.js:67:3)',
    context: { apiKey: 'sk-***', model: 'gpt-4' }
  },
  {
    id: 'ERR-003',
    message: 'Database connection failed',
    severity: 'critical',
    status: 'open',
    module: 'Database',
    function: 'connect',
    line: 12,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    user: 'system',
    sessionId: 'sess-789',
    stackTrace: 'Error: Connection refused\n    at connect (database.js:12:5)\n    at initializeDB (app.js:34:2)',
    context: { host: 'localhost', port: 5432, database: 'social_marketing' }
  },
  {
    id: 'ERR-004',
    message: 'Invalid authentication token',
    severity: 'error',
    status: 'open',
    module: 'Authentication',
    function: 'validateToken',
    line: 156,
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    user: 'user123',
    sessionId: 'sess-101',
    stackTrace: 'Error: Invalid token\n    at validateToken (auth.js:156:22)\n    at authenticate (middleware.js:89:7)',
    context: { token: 'eyJ***', expiresAt: '2024-01-15T10:30:00Z' }
  },
  {
    id: 'ERR-005',
    message: 'File upload failed - disk space full',
    severity: 'warning',
    status: 'resolved',
    module: 'FileSystem',
    function: 'uploadFile',
    line: 234,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    user: 'system',
    sessionId: 'sess-202',
    stackTrace: 'Error: ENOSPC: no space left on device\n    at uploadFile (filesystem.js:234:18)\n    at saveImage (imageProcessor.js:45:12)',
    context: { fileSize: 2048576, availableSpace: 1048576 }
  }
])

// Table headers
const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Message', key: 'message', sortable: true },
  { title: 'Severity', key: 'severity', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Module', key: 'module', sortable: true },
  { title: 'Timestamp', key: 'timestamp', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
]

// Filter options
const severityOptions = ['critical', 'error', 'warning', 'info']
const moduleOptions = ['ArticleScraping', 'Translation', 'Database', 'Authentication', 'FileSystem']
const statusOptions = ['open', 'resolved', 'in-progress']

// Computed properties
const filteredErrors = computed(() => {
  let filtered = errors.value

  if (selectedSeverity.value) {
    filtered = filtered.filter(error => error.severity === selectedSeverity.value)
  }

  if (selectedModule.value) {
    filtered = filtered.filter(error => error.module === selectedModule.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(error => error.status === selectedStatus.value)
  }

  if (dateRange.value.start) {
    filtered = filtered.filter(error => error.timestamp >= new Date(dateRange.value.start))
  }

  if (dateRange.value.end) {
    filtered = filtered.filter(error => error.timestamp <= new Date(dateRange.value.end + 'T23:59:59'))
  }

  return filtered
})

const totalErrors = computed(() => errors.value.length)
const criticalErrors = computed(() => errors.value.filter(e => e.severity === 'critical').length)
const todayErrors = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return errors.value.filter(e => e.timestamp >= today).length
})
const resolvedErrors = computed(() => errors.value.filter(e => e.status === 'resolved').length)

// Methods
const refreshErrors = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real implementation, fetch errors from API
  } catch (error) {
    console.error('Error refreshing errors:', error)
  } finally {
    loading.value = false
  }
}

const clearAllErrors = async () => {
  // In real implementation, this would clear resolved errors
  errors.value = errors.value.filter(e => e.status === 'open')
}

const clearFilters = () => {
  selectedSeverity.value = ''
  selectedModule.value = ''
  selectedStatus.value = ''
  searchQuery.value = ''
  dateRange.value = { start: '', end: '' }
}

const exportErrors = () => {
  // In real implementation, export filtered errors to CSV/JSON
  const data = filteredErrors.value
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `error-report-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const viewErrorDetails = (error: any) => {
  selectedError.value = error
  detailsDialog.value = true
}

const resolveError = async (error: any) => {
  error.status = 'resolved'
  error.resolvedAt = new Date()
  // In real implementation, update via API
}

const reopenError = async (error: any) => {
  error.status = 'open'
  delete error.resolvedAt
  // In real implementation, update via API
}

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'error'
    case 'error':
      return 'red'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    default:
      return 'grey'
  }
}

const getSeverityIcon = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'mdi-alert-octagon'
    case 'error':
      return 'mdi-alert-circle'
    case 'warning':
      return 'mdi-alert'
    case 'info':
      return 'mdi-information'
    default:
      return 'mdi-help-circle'
  }
}

const getSeverityAlertType = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    default:
      return 'info'
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'open':
      return 'error'
    case 'resolved':
      return 'success'
    case 'in-progress':
      return 'warning'
    default:
      return 'grey'
  }
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

// Lifecycle
onMounted(() => {
  refreshErrors()
})
</script>

<style scoped>
.error-reporting {
  padding: 16px;
}

.error-stack-trace {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
}

.error-context {
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
}
</style> 