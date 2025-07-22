<template>
  <div class="processing-history">
    <v-container fluid>
      <!-- Header -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-history</v-icon>
              Processing History Dashboard
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="refreshHistory"
                :loading="loading"
                prepend-icon="mdi-refresh"
              >
                Refresh
              </v-btn>
              <v-btn
                color="secondary"
                @click="exportHistory"
                prepend-icon="mdi-download"
                class="ml-2"
              >
                Export
              </v-btn>
            </v-card-title>
            <v-card-subtitle>
              View and analyze article processing history and trends
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- Filters and Controls -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="selectedOperation"
                    :items="operationOptions"
                    label="Operation Type"
                    density="compact"
                    variant="outlined"
                    clearable
                    prepend-inner-icon="mdi-filter"
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
                    label="Search"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-magnify"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-btn-toggle
                    v-model="viewMode"
                    mandatory
                    density="compact"
                  >
                    <v-btn value="timeline" prepend-icon="mdi-timeline">Timeline</v-btn>
                    <v-btn value="table" prepend-icon="mdi-table">Table</v-btn>
                  </v-btn-toggle>
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
                    @click="clearFilters"
                    prepend-icon="mdi-filter-off"
                    class="mr-2"
                  >
                    Clear Filters
                  </v-btn>
                  <v-btn
                    color="secondary"
                    variant="outlined"
                    @click="showStatistics"
                    prepend-icon="mdi-chart-bar"
                  >
                    Statistics
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Processing Statistics -->
      <v-row>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-primary">
                {{ totalProcessed }}
              </div>
              <div class="text-caption text-medium-emphasis">Total Processed</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-success">
                {{ successRate }}%
              </div>
              <div class="text-caption text-medium-emphasis">Success Rate</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-info">
                {{ avgProcessingTime }}s
              </div>
              <div class="text-caption text-medium-emphasis">Avg Processing Time</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-warning">
                {{ todayProcessed }}
              </div>
              <div class="text-caption text-medium-emphasis">Today's Processed</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Timeline View -->
      <v-row v-if="viewMode === 'timeline'">
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-timeline</v-icon>
              Processing Timeline
              <v-spacer></v-spacer>
              <v-chip color="primary" size="small">
                {{ filteredHistory.length }} events
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-timeline density="compact" align="start">
                <v-timeline-item
                  v-for="event in filteredHistory"
                  :key="event.id"
                  :dot-color="getStatusColor(event.status)"
                  size="small"
                >
                  <template v-slot:opposite>
                    <div class="text-caption text-medium-emphasis">
                      {{ formatTime(event.timestamp) }}
                    </div>
                  </template>
                  <v-card variant="outlined" class="mb-2">
                    <v-card-title class="text-body-2 d-flex align-center">
                      <v-icon
                        :icon="getOperationIcon(event.operation)"
                        size="small"
                        class="mr-2"
                        :color="getStatusColor(event.status)"
                      ></v-icon>
                      {{ event.operation }}
                      <v-spacer></v-spacer>
                      <v-chip
                        :color="getStatusColor(event.status)"
                        size="x-small"
                        variant="outlined"
                      >
                        {{ event.status }}
                      </v-chip>
                    </v-card-title>
                    <v-card-text class="text-caption">
                      <div class="mb-1">
                        <strong>Article:</strong> {{ event.articleTitle }}
                      </div>
                      <div class="mb-1">
                        <strong>Duration:</strong> {{ event.duration }}ms
                      </div>
                      <div v-if="event.message" class="mb-1">
                        <strong>Message:</strong> {{ event.message }}
                      </div>
                      <div v-if="event.details" class="text-caption text-medium-emphasis">
                        {{ event.details }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Table View -->
      <v-row v-else>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-table</v-icon>
              Processing History Table
              <v-spacer></v-spacer>
              <v-chip color="primary" size="small">
                {{ filteredHistory.length }} records
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="tableHeaders"
                :items="filteredHistory"
                :loading="loading"
                :search="searchQuery"
                density="compact"
                class="elevation-1"
                :items-per-page="20"
                :items-per-page-options="[10, 20, 50, 100]"
                show-expand
                expand-on-click
              >
                <!-- Operation Column -->
                <template v-slot:item.operation="{ item }">
                  <div class="d-flex align-center">
                    <v-icon
                      :icon="getOperationIcon(item.operation)"
                      size="small"
                      class="mr-2"
                      :color="getStatusColor(item.status)"
                    ></v-icon>
                    {{ item.operation }}
                  </div>
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

                <!-- Duration Column -->
                <template v-slot:item.duration="{ item }">
                  <v-chip
                    :color="getDurationColor(item.duration)"
                    size="x-small"
                    variant="outlined"
                  >
                    {{ item.duration }}ms
                  </v-chip>
                </template>

                <!-- Timestamp Column -->
                <template v-slot:item.timestamp="{ item }">
                  {{ formatTime(item.timestamp) }}
                </template>

                <!-- Actions Column -->
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    size="x-small"
                    color="primary"
                    variant="text"
                    @click="viewEventDetails(item)"
                    class="mr-1"
                  >
                    Details
                  </v-btn>
                  <v-btn
                    v-if="item.status === 'error'"
                    size="x-small"
                    color="warning"
                    variant="text"
                    @click="retryOperation(item)"
                  >
                    Retry
                  </v-btn>
                </template>

                <!-- Expanded Row Content -->
                <template v-slot:expanded-row="{ item }">
                  <v-card class="ma-2 pa-4" variant="outlined">
                    <v-row>
                      <v-col cols="12" md="6">
                        <h4 class="text-h6 mb-2">Event Details</h4>
                        <div class="text-body-2">
                          <strong>Event ID:</strong> {{ item.id }}<br>
                          <strong>Article ID:</strong> {{ item.articleId }}<br>
                          <strong>Operation:</strong> {{ item.operation }}<br>
                          <strong>Status:</strong> {{ item.status }}<br>
                          <strong>Duration:</strong> {{ item.duration }}ms<br>
                          <strong>User:</strong> {{ item.user || 'System' }}
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <h4 class="text-h6 mb-2">Message</h4>
                        <div class="text-body-2">
                          {{ item.message || 'No message available' }}
                        </div>
                        <h4 v-if="item.details" class="text-h6 mb-2 mt-4">Additional Details</h4>
                        <pre v-if="item.details" class="text-caption event-details">{{ item.details }}</pre>
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Event Details Dialog -->
      <v-dialog v-model="detailsDialog" max-width="800">
        <v-card>
          <v-card-title class="d-flex align-center">
            Event Details
            <v-spacer></v-spacer>
            <v-btn icon @click="detailsDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text v-if="selectedEvent">
            <v-row>
              <v-col cols="12" md="6">
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Event ID</v-list-item-title>
                    <v-list-item-subtitle>{{ selectedEvent.id }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Operation</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip
                        :color="getStatusColor(selectedEvent.status)"
                        size="small"
                      >
                        {{ selectedEvent.operation }}
                      </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Status</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip
                        :color="getStatusColor(selectedEvent.status)"
                        size="small"
                      >
                        {{ selectedEvent.status }}
                      </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Duration</v-list-item-title>
                    <v-list-item-subtitle>{{ selectedEvent.duration }}ms</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Timestamp</v-list-item-title>
                    <v-list-item-subtitle>{{ formatTime(selectedEvent.timestamp) }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Article</v-list-item-title>
                    <v-list-item-subtitle>{{ selectedEvent.articleTitle }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="6">
                <h4 class="text-h6 mb-2">Message</h4>
                <v-alert
                  :type="getAlertType(selectedEvent.status)"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ selectedEvent.message || 'No message available' }}
                </v-alert>
                
                <h4 v-if="selectedEvent.details" class="text-h6 mb-2">Additional Details</h4>
                <pre v-if="selectedEvent.details" class="event-details">{{ selectedEvent.details }}</pre>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="selectedEvent && selectedEvent.status === 'error'"
              color="warning"
              @click="retryOperation(selectedEvent)"
            >
              Retry Operation
            </v-btn>
            <v-btn color="primary" @click="detailsDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Reactive data
const loading = ref(false)
const searchQuery = ref('')
const selectedOperation = ref('')
const selectedStatus = ref('')
const viewMode = ref('timeline')
const dateRange = ref({
  start: '',
  end: ''
})
const detailsDialog = ref(false)
const selectedEvent = ref(null)

// Mock processing history data
const processingHistory = ref([
  {
    id: 1,
    articleId: 1,
    articleTitle: 'How to Build a Modern Web Application with Vue.js and TypeScript',
    operation: 'scrape',
    status: 'success',
    duration: 2500,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    message: 'Article scraped successfully from Toutiao',
    details: 'Extracted 2500 words, 3 code blocks, 2 images',
    user: 'system'
  },
  {
    id: 2,
    articleId: 1,
    articleTitle: 'How to Build a Modern Web Application with Vue.js and TypeScript',
    operation: 'translate',
    status: 'success',
    duration: 15000,
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    message: 'Article translated successfully to English',
    details: 'Used OpenAI GPT-4, preserved 3 code blocks, quality score: 92%',
    user: 'system'
  },
  {
    id: 3,
    articleId: 1,
    articleTitle: 'How to Build a Modern Web Application with Vue.js and TypeScript',
    operation: 'publish',
    status: 'success',
    duration: 8000,
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    message: 'Article published to Toutiao successfully',
    details: 'Published URL: https://toutiao.com/published/123456',
    user: 'system'
  },
  {
    id: 4,
    articleId: 2,
    articleTitle: 'Advanced State Management with Pinia',
    operation: 'scrape',
    status: 'error',
    duration: 5000,
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    message: 'Failed to scrape article - Network timeout',
    details: 'Error: Network timeout after 5 seconds\nRetry attempt: 1/3',
    user: 'system'
  },
  {
    id: 5,
    articleId: 2,
    articleTitle: 'Advanced State Management with Pinia',
    operation: 'scrape',
    status: 'success',
    duration: 3200,
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    message: 'Article scraped successfully on retry',
    details: 'Extracted 1800 words, 2 code blocks, 1 image',
    user: 'system'
  },
  {
    id: 6,
    articleId: 3,
    articleTitle: 'Vue.js Performance Optimization Techniques',
    operation: 'translate',
    status: 'warning',
    duration: 12000,
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    message: 'Translation completed with warnings',
    details: 'Some code comments could not be translated properly\nQuality score: 85%',
    user: 'system'
  }
])

// Options
const operationOptions = ['scrape', 'translate', 'publish', 'validate', 'cleanup']
const statusOptions = ['success', 'error', 'warning', 'pending', 'processing']

// Table headers
const tableHeaders = [
  { title: 'Operation', key: 'operation', sortable: true },
  { title: 'Article', key: 'articleTitle', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Duration', key: 'duration', sortable: true },
  { title: 'Timestamp', key: 'timestamp', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
]

// Computed properties
const filteredHistory = computed(() => {
  let filtered = processingHistory.value

  if (selectedOperation.value) {
    filtered = filtered.filter(event => event.operation === selectedOperation.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(event => event.status === selectedStatus.value)
  }

  if (dateRange.value.start) {
    filtered = filtered.filter(event => event.timestamp >= new Date(dateRange.value.start))
  }

  if (dateRange.value.end) {
    filtered = filtered.filter(event => event.timestamp <= new Date(dateRange.value.end + 'T23:59:59'))
  }

  return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
})

const totalProcessed = computed(() => processingHistory.value.length)
const successRate = computed(() => {
  const successful = processingHistory.value.filter(e => e.status === 'success').length
  return Math.round((successful / totalProcessed.value) * 100)
})
const avgProcessingTime = computed(() => {
  const total = processingHistory.value.reduce((sum, e) => sum + e.duration, 0)
  return Math.round(total / totalProcessed.value / 1000)
})
const todayProcessed = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return processingHistory.value.filter(e => e.timestamp >= today).length
})

// Methods
const refreshHistory = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real implementation, fetch processing history from API
  } catch (error) {
    console.error('Error refreshing history:', error)
  } finally {
    loading.value = false
  }
}

const exportHistory = () => {
  const data = {
    processingHistory: filteredHistory.value,
    exportTime: new Date().toISOString(),
    filters: {
      operation: selectedOperation.value,
      status: selectedStatus.value,
      dateRange: dateRange.value
    }
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `processing-history-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const clearFilters = () => {
  selectedOperation.value = ''
  selectedStatus.value = ''
  searchQuery.value = ''
  dateRange.value = { start: '', end: '' }
}

const showStatistics = () => {
  // In real implementation, show detailed statistics modal
  console.log('Show statistics')
}

const viewEventDetails = (event: any) => {
  selectedEvent.value = event
  detailsDialog.value = true
}

const retryOperation = async (event: any) => {
  // In real implementation, retry the failed operation
  console.log('Retry operation:', event)
}

const getOperationIcon = (operation: string) => {
  switch (operation.toLowerCase()) {
    case 'scrape':
      return 'mdi-download'
    case 'translate':
      return 'mdi-translate'
    case 'publish':
      return 'mdi-share'
    case 'validate':
      return 'mdi-check-circle'
    case 'cleanup':
      return 'mdi-delete'
    default:
      return 'mdi-cog'
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    case 'pending':
      return 'info'
    case 'processing':
      return 'primary'
    default:
      return 'grey'
  }
}

const getDurationColor = (duration: number) => {
  if (duration <= 1000) return 'success'
  if (duration <= 5000) return 'warning'
  return 'error'
}

const getAlertType = (status: string) => {
  switch (status.toLowerCase()) {
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    default:
      return 'info'
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
  refreshHistory()
})
</script>

<style scoped>
.processing-history {
  padding: 16px;
}

.event-details {
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
</style> 