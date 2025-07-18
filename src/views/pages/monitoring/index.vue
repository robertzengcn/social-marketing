<template>
  <div class="monitoring-dashboard">
    <v-container fluid>
      <!-- Header -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-monitor-dashboard</v-icon>
              System Monitoring Dashboard
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="refreshData"
                :loading="loading"
                prepend-icon="mdi-refresh"
              >
                Refresh
              </v-btn>
            </v-card-title>
            <v-card-subtitle>
              Real-time system status and performance monitoring
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- Real-time Status Monitoring -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="info">mdi-clock-outline</v-icon>
              Real-time Status
              <v-spacer></v-spacer>
              <v-chip
                :color="systemStatus === 'healthy' ? 'success' : systemStatus === 'warning' ? 'warning' : 'error'"
                size="small"
              >
                {{ systemStatus.toUpperCase() }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="process in activeProcesses"
                  :key="process.id"
                  class="mb-2"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="getStatusColor(process.status)"
                      size="small"
                    >
                      {{ getStatusIcon(process.status) }}
                    </v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">
                    {{ process.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ process.description }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-chip
                      :color="getStatusColor(process.status)"
                      size="x-small"
                      variant="outlined"
                    >
                      {{ process.status }}
                    </v-chip>
                    <v-chip
                      v-if="process.progress !== undefined"
                      size="x-small"
                      color="primary"
                      class="ml-1"
                    >
                      {{ process.progress }}%
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Performance Metrics -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="success">mdi-chart-line</v-icon>
              Performance Metrics
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <div class="text-center">
                    <div class="text-h4 font-weight-bold" :class="getMetricColor(cpuUsage)">
                      {{ cpuUsage }}%
                    </div>
                    <div class="text-caption text-medium-emphasis">CPU Usage</div>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="text-center">
                    <div class="text-h4 font-weight-bold" :class="getMetricColor(memoryUsage)">
                      {{ memoryUsage }}%
                    </div>
                    <div class="text-caption text-medium-emphasis">Memory Usage</div>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="text-center">
                    <div class="text-h4 font-weight-bold text-primary">
                      {{ activeConnections }}
                    </div>
                    <div class="text-caption text-medium-emphasis">Active Connections</div>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="text-center">
                    <div class="text-h4 font-weight-bold text-info">
                      {{ queueSize }}
                    </div>
                    <div class="text-caption text-medium-emphasis">Queue Size</div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Error Reporting -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="error">mdi-alert-circle</v-icon>
              Recent Errors
              <v-spacer></v-spacer>
              <v-chip
                v-if="recentErrors.length > 0"
                color="error"
                size="small"
              >
                {{ recentErrors.length }} errors
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-list v-if="recentErrors.length > 0">
                <v-list-item
                  v-for="error in recentErrors"
                  :key="error.id"
                  class="mb-2"
                >
                  <template v-slot:prepend>
                    <v-icon color="error" size="small">mdi-alert</v-icon>
                  </template>
                  <v-list-item-title class="text-body-2 text-error">
                    {{ error.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ error.message }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-chip size="x-small" color="error" variant="outlined">
                      {{ formatTime(error.timestamp) }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert
                v-else
                type="success"
                variant="tonal"
                text="No recent errors"
              >
                System is running smoothly
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Database Health -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="warning">mdi-database</v-icon>
              Database Health
              <v-spacer></v-spacer>
              <v-chip
                :color="databaseStatus === 'healthy' ? 'success' : 'warning'"
                size="small"
              >
                {{ databaseStatus.toUpperCase() }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="info" size="small">mdi-database</v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">
                    Database Size
                  </v-list-item-title>
                  <template v-slot:append>
                    <v-chip size="x-small" color="info" variant="outlined">
                      {{ formatBytes(databaseSize) }}
                    </v-chip>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="success" size="small">mdi-table</v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">
                    Active Connections
                  </v-list-item-title>
                  <template v-slot:append>
                    <v-chip size="x-small" color="success" variant="outlined">
                      {{ databaseConnections }}
                    </v-chip>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="warning" size="small">mdi-clock</v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">
                    Last Backup
                  </v-list-item-title>
                  <template v-slot:append>
                    <v-chip size="x-small" color="warning" variant="outlined">
                      {{ formatTime(lastBackup) }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Processing History -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-history</v-icon>
              Processing History
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                label="Search history"
                density="compact"
                variant="outlined"
                hide-details
                class="max-width-200"
              ></v-text-field>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="historyHeaders"
                :items="processingHistory"
                :search="searchQuery"
                :loading="loading"
                density="compact"
                class="elevation-1"
              >
                <template v-slot:item.status="{ item }">
                  <v-chip
                    :color="getStatusColor(item.status)"
                    size="small"
                    variant="outlined"
                  >
                    {{ item.status }}
                  </v-chip>
                </template>
                <template v-slot:item.timestamp="{ item }">
                  {{ formatTime(item.timestamp) }}
                </template>
                <template v-slot:item.duration="{ item }">
                  {{ formatDuration(item.duration) }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    size="x-small"
                    color="primary"
                    variant="text"
                    @click="viewDetails(item)"
                  >
                    Details
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="600">
      <v-card>
        <v-card-title>
          Processing Details
          <v-spacer></v-spacer>
          <v-btn icon @click="detailsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="selectedItem">
          <v-list>
            <v-list-item>
              <v-list-item-title>Operation</v-list-item-title>
              <v-list-item-subtitle>{{ selectedItem.operation }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Status</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  :color="getStatusColor(selectedItem.status)"
                  size="small"
                >
                  {{ selectedItem.status }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Duration</v-list-item-title>
              <v-list-item-subtitle>{{ formatDuration(selectedItem.duration) }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Timestamp</v-list-item-title>
              <v-list-item-subtitle>{{ formatTime(selectedItem.timestamp) }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item v-if="selectedItem.details">
              <v-list-item-title>Details</v-list-item-title>
              <v-list-item-subtitle>
                <pre class="text-caption">{{ selectedItem.details }}</pre>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive data
const loading = ref(false)
const systemStatus = ref('healthy')
const cpuUsage = ref(45)
const memoryUsage = ref(62)
const activeConnections = ref(12)
const queueSize = ref(8)
const databaseStatus = ref('healthy')
const databaseSize = ref(1024 * 1024 * 256) // 256MB
const databaseConnections = ref(5)
const lastBackup = ref(new Date(Date.now() - 24 * 60 * 60 * 1000)) // 24 hours ago
const searchQuery = ref('')
const detailsDialog = ref(false)
const selectedItem = ref(null)

// Mock data for active processes
const activeProcesses = ref([
  {
    id: 1,
    name: 'Article Scraping',
    description: 'Scraping articles from Toutiao',
    status: 'running',
    progress: 75
  },
  {
    id: 2,
    name: 'Translation Service',
    description: 'Translating article content',
    status: 'idle',
    progress: undefined
  },
  {
    id: 3,
    name: 'Publishing Queue',
    description: 'Processing publishing tasks',
    status: 'running',
    progress: 30
  },
  {
    id: 4,
    name: 'Database Backup',
    description: 'Scheduled database backup',
    status: 'completed',
    progress: 100
  }
])

// Mock data for recent errors
const recentErrors = ref([
  {
    id: 1,
    title: 'Scraping Failed',
    message: 'Failed to scrape article from Toutiao - Network timeout',
    timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: 2,
    title: 'Translation API Error',
    message: 'OpenAI API rate limit exceeded',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  }
])

// Mock data for processing history
const processingHistory = ref([
  {
    id: 1,
    operation: 'Article Scraping',
    status: 'completed',
    duration: 45000, // 45 seconds
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    details: 'Successfully scraped 5 articles from Toutiao'
  },
  {
    id: 2,
    operation: 'Translation',
    status: 'completed',
    duration: 120000, // 2 minutes
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    details: 'Translated 3 articles from Chinese to English'
  },
  {
    id: 3,
    operation: 'Publishing',
    status: 'failed',
    duration: 30000, // 30 seconds
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    details: 'Failed to publish to WeChat - Authentication error'
  }
])

// Table headers for processing history
const historyHeaders = [
  { title: 'Operation', key: 'operation', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Duration', key: 'duration', sortable: true },
  { title: 'Timestamp', key: 'timestamp', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false }
]

// WebSocket connection for real-time updates
let wsConnection: WebSocket | null = null

// Methods
const refreshData = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update mock data with slight variations
    cpuUsage.value = Math.floor(Math.random() * 30) + 30
    memoryUsage.value = Math.floor(Math.random() * 20) + 50
    activeConnections.value = Math.floor(Math.random() * 10) + 8
    queueSize.value = Math.floor(Math.random() * 15) + 5
    
    // Update system status based on metrics
    if (cpuUsage.value > 80 || memoryUsage.value > 85) {
      systemStatus.value = 'warning'
    } else if (cpuUsage.value > 95 || memoryUsage.value > 95) {
      systemStatus.value = 'critical'
    } else {
      systemStatus.value = 'healthy'
    }
  } catch (error) {
    console.error('Error refreshing data:', error)
  } finally {
    loading.value = false
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'running':
    case 'completed':
    case 'healthy':
      return 'success'
    case 'idle':
    case 'warning':
      return 'warning'
    case 'failed':
    case 'error':
    case 'critical':
      return 'error'
    default:
      return 'grey'
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'running':
      return 'mdi-play-circle'
    case 'completed':
      return 'mdi-check-circle'
    case 'idle':
      return 'mdi-pause-circle'
    case 'failed':
    case 'error':
      return 'mdi-alert-circle'
    default:
      return 'mdi-help-circle'
  }
}

const getMetricColor = (value: number) => {
  if (value > 90) return 'text-error'
  if (value > 75) return 'text-warning'
  return 'text-success'
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const formatDuration = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  } else {
    return `${seconds}s`
  }
}

const formatBytes = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

const viewDetails = (item: any) => {
  selectedItem.value = item
  detailsDialog.value = true
}

const initializeWebSocket = () => {
  // In a real implementation, this would connect to a WebSocket server
  // For now, we'll simulate real-time updates with setInterval
  const interval = setInterval(() => {
    // Simulate real-time updates
    if (Math.random() > 0.7) {
      // Occasionally update process status
      const randomProcess = activeProcesses.value[Math.floor(Math.random() * activeProcesses.value.length)]
      if (randomProcess.status === 'running' && randomProcess.progress !== undefined) {
        randomProcess.progress = Math.min(100, randomProcess.progress + Math.floor(Math.random() * 10))
        if (randomProcess.progress >= 100) {
          randomProcess.status = 'completed'
          randomProcess.progress = 100
        }
      }
    }
  }, 5000)

  return interval
}

// Lifecycle hooks
onMounted(() => {
  refreshData()
  const interval = initializeWebSocket()
  
  onUnmounted(() => {
    clearInterval(interval)
    if (wsConnection) {
      wsConnection.close()
    }
  })
})
</script>

<style scoped>
.monitoring-dashboard {
  padding: 16px;
}

.max-width-200 {
  max-width: 200px;
}

pre {
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style> 