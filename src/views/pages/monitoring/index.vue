<template>
  <div class="monitoring-dashboard">
    <v-container fluid>
      <!-- Header -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-monitor-dashboard</v-icon>
              Unified Monitoring Dashboard
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="refreshData"
                :loading="loading"
                prepend-icon="mdi-refresh"
              >
                Refresh All
              </v-btn>
            </v-card-title>
            <v-card-subtitle>
              Comprehensive system monitoring and management interface
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- System Status Overview -->
      <v-row>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-success">
                {{ systemStatus.overall }}
              </div>
              <div class="text-caption text-medium-emphasis">System Status</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-primary">
                {{ systemStatus.cpu }}%
              </div>
              <div class="text-caption text-medium-emphasis">CPU Usage</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-warning">
                {{ systemStatus.memory }}%
              </div>
              <div class="text-caption text-medium-emphasis">Memory Usage</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-info">
                {{ systemStatus.uptime }}
              </div>
              <div class="text-caption text-medium-emphasis">Uptime</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Monitoring Sections Navigation -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="secondary">mdi-view-dashboard</v-icon>
              Monitoring Sections
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="2">
                  <v-card
                    variant="outlined"
                    class="text-center monitoring-section-card"
                    @click="navigateToErrors"
                  >
                    <v-card-text>
                      <v-icon size="32" color="error" class="mb-2">mdi-alert-circle</v-icon>
                      <div class="text-h6">Error Reporting</div>
                      <div class="text-caption text-medium-emphasis">{{ errorCount }} errors</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="2">
                  <v-card
                    variant="outlined"
                    class="text-center monitoring-section-card"
                    @click="navigateToPerformance"
                  >
                    <v-card-text>
                      <v-icon size="32" color="success" class="mb-2">mdi-chart-line</v-icon>
                      <div class="text-h6">Performance</div>
                      <div class="text-caption text-medium-emphasis">{{ performanceStatus }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="2">
                  <v-card
                    variant="outlined"
                    class="text-center monitoring-section-card"
                    @click="navigateToContentPreview"
                  >
                    <v-card-text>
                      <v-icon size="32" color="info" class="mb-2">mdi-eye</v-icon>
                      <div class="text-h6">Content Preview</div>
                      <div class="text-caption text-medium-emphasis">{{ contentCount }} articles</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="2">
                  <v-card
                    variant="outlined"
                    class="text-center monitoring-section-card"
                    @click="navigateToDatabaseHealth"
                  >
                    <v-card-text>
                      <v-icon size="32" color="warning" class="mb-2">mdi-database</v-icon>
                      <div class="text-h6">Database Health</div>
                      <div class="text-caption text-medium-emphasis">{{ databaseStatus }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="2">
                  <v-card
                    variant="outlined"
                    class="text-center monitoring-section-card"
                    @click="navigateToProcessingHistory"
                  >
                    <v-card-text>
                      <v-icon size="32" color="purple" class="mb-2">mdi-history</v-icon>
                      <div class="text-h6">Processing History</div>
                      <div class="text-caption text-medium-emphasis">{{ historyCount }} events</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="2">
                  <v-card
                    variant="outlined"
                    class="text-center monitoring-section-card"
                    @click="navigateToSettings"
                  >
                    <v-card-text>
                      <v-icon size="32" color="secondary" class="mb-2">mdi-cog</v-icon>
                      <div class="text-h6">Settings</div>
                      <div class="text-caption text-medium-emphasis">Configuration</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Quick Actions -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="secondary">mdi-tools</v-icon>
              Quick Actions
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="3">
                  <v-btn
                    color="primary"
                    variant="outlined"
                    block
                    prepend-icon="mdi-refresh"
                    @click="refreshAllData"
                  >
                    Refresh All Data
                  </v-btn>
                </v-col>
                <v-col cols="12" md="3">
                  <v-btn
                    color="success"
                    variant="outlined"
                    block
                    prepend-icon="mdi-download"
                    @click="exportAllReports"
                  >
                    Export All Reports
                  </v-btn>
                </v-col>
                <v-col cols="12" md="3">
                  <v-btn
                    color="warning"
                    variant="outlined"
                    block
                    prepend-icon="mdi-alert"
                    @click="viewAllAlerts"
                  >
                    View All Alerts
                  </v-btn>
                </v-col>
                <v-col cols="12" md="3">
                  <v-btn
                    color="info"
                    variant="outlined"
                    block
                    prepend-icon="mdi-chart-bar"
                    @click="showSystemAnalytics"
                  >
                    System Analytics
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Recent Activity and Alerts -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="warning">mdi-alert</v-icon>
              Recent Alerts
              <v-spacer></v-spacer>
              <v-btn
                size="small"
                color="primary"
                variant="text"
                @click="navigateToErrors"
              >
                View All
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list v-if="recentErrors.length > 0" density="compact">
                <v-list-item
                  v-for="error in recentErrors.slice(0, 5)"
                  :key="error.id"
                  class="mb-2"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="getErrorColor(error.severity)"
                      size="small"
                    >
                      {{ getErrorIcon(error.severity) }}
                    </v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">
                    {{ error.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ error.message }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-chip size="x-small" color="grey" variant="outlined">
                      {{ formatTime(error.timestamp) }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert
                v-else
                type="success"
                variant="tonal"
                text="No recent alerts"
              >
                System is running smoothly
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="success">mdi-check-circle</v-icon>
              Recent Activity
              <v-spacer></v-spacer>
              <v-btn
                size="small"
                color="primary"
                variant="text"
                @click="navigateToProcessingHistory"
              >
                View All
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list v-if="recentActivity.length > 0" density="compact">
                <v-list-item
                  v-for="activity in recentActivity.slice(0, 5)"
                  :key="activity.id"
                  class="mb-2"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="getActivityColor(activity.status)"
                      size="small"
                    >
                      {{ getActivityIcon(activity.operation) }}
                    </v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">
                    {{ activity.operation }} - {{ activity.articleTitle }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ activity.message }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-chip size="x-small" color="grey" variant="outlined">
                      {{ formatTime(activity.timestamp) }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert
                v-else
                type="info"
                variant="tonal"
                text="No recent activity"
              >
                No processing activity in the last hour
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- System Metrics Dashboard -->
      <v-row>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-chart-line</v-icon>
              System Performance Overview
              <v-spacer></v-spacer>
              <v-btn
                size="small"
                color="primary"
                variant="text"
                @click="navigateToPerformance"
              >
                View Details
              </v-btn>
            </v-card-title>
            <v-card-text>
              <apexchart
                type="line"
                height="300"
                :options="performanceChartOptions"
                :series="performanceChartSeries"
              ></apexchart>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="warning">mdi-harddisk</v-icon>
              Storage Overview
              <v-spacer></v-spacer>
              <v-btn
                size="small"
                color="primary"
                variant="text"
                @click="navigateToDatabaseHealth"
              >
                View Details
              </v-btn>
            </v-card-title>
            <v-card-text>
              <apexchart
                type="radialBar"
                height="300"
                :options="storageChartOptions"
                :series="storageChartSeries"
              ></apexchart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- System Health Summary -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="info">mdi-heart-pulse</v-icon>
              System Health Summary
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="3">
                  <div class="text-center">
                    <v-icon size="48" color="success" class="mb-2">mdi-check-circle</v-icon>
                    <div class="text-h6 text-success">{{ healthSummary.healthy }}</div>
                    <div class="text-caption">Healthy Components</div>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="text-center">
                    <v-icon size="48" color="warning" class="mb-2">mdi-alert</v-icon>
                    <div class="text-h6 text-warning">{{ healthSummary.warnings }}</div>
                    <div class="text-caption">Warnings</div>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="text-center">
                    <v-icon size="48" color="error" class="mb-2">mdi-alert-circle</v-icon>
                    <div class="text-h6 text-error">{{ healthSummary.errors }}</div>
                    <div class="text-caption">Errors</div>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="text-center">
                    <v-icon size="48" color="info" class="mb-2">mdi-information</v-icon>
                    <div class="text-h6 text-info">{{ healthSummary.info }}</div>
                    <div class="text-caption">Info Items</div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const loading = ref(false)
const systemStatus = ref({
  overall: 'Healthy',
  cpu: 45,
  memory: 62,
  uptime: '2h 15m'
})
const cpuUsage = ref(45)
const memoryUsage = ref(62)
const activeConnections = ref(12)
const queueSize = ref(8)
const databaseStatus = ref('Healthy')
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
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    severity: 'error'
  },
  {
    id: 2,
    title: 'Translation API Error',
    message: 'OpenAI API rate limit exceeded',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    severity: 'warning'
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

// Mock data for recent activity
const recentActivity = ref([
  {
    id: 1,
    operation: 'Article Scraping',
    status: 'completed',
    articleTitle: 'Toutiao Article 1',
    message: 'Successfully scraped article from Toutiao',
    timestamp: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    id: 2,
    operation: 'Translation',
    status: 'completed',
    articleTitle: 'Toutiao Article 2',
    message: 'Translated article from Chinese to English',
    timestamp: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: 3,
    operation: 'Publishing',
    status: 'failed',
    articleTitle: 'Toutiao Article 3',
    message: 'Failed to publish to WeChat - Authentication error',
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  }
])

// Mock data for health summary
const healthSummary = ref({
  healthy: 10,
  warnings: 2,
  errors: 1,
  info: 5
})

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

// Computed properties
const errorCount = computed(() => recentErrors.value.length)
const performanceStatus = computed(() => {
  if (cpuUsage.value > 80 || memoryUsage.value > 85) return 'Warning'
  if (cpuUsage.value > 95 || memoryUsage.value > 95) return 'Critical'
  return 'Good'
})
const contentCount = computed(() => 25) // Mock content count
const historyCount = computed(() => processingHistory.value.length)

// Chart configurations
const performanceChartOptions = ref({
  chart: {
    type: 'line',
    height: 300,
    toolbar: {
      show: false
    }
  },
  colors: ['#2196F3', '#FF9800', '#4CAF50'],
  series: [
    {
      name: 'CPU Usage',
      data: [45, 52, 38, 47, 43, 49, 51, 48, 46, 44]
    },
    {
      name: 'Memory Usage',
      data: [62, 58, 65, 61, 63, 59, 64, 60, 62, 61]
    },
    {
      name: 'Active Connections',
      data: [12, 15, 8, 11, 13, 9, 14, 10, 12, 11]
    }
  ],
  xaxis: {
    categories: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45']
  },
  yaxis: {
    title: {
      text: 'Usage (%)'
    }
  },
  legend: {
    position: 'top'
  }
})

const performanceChartSeries = ref([
  {
    name: 'CPU Usage',
    data: [45, 52, 38, 47, 43, 49, 51, 48, 46, 44]
  },
  {
    name: 'Memory Usage',
    data: [62, 58, 65, 61, 63, 59, 64, 60, 62, 61]
  },
  {
    name: 'Active Connections',
    data: [12, 15, 8, 11, 13, 9, 14, 10, 12, 11]
  }
])

const storageChartOptions = ref({
  chart: {
    type: 'radialBar',
    height: 300
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: '16px'
        },
        value: {
          fontSize: '22px',
          formatter: function (val: number) {
            return val + '%'
          }
        }
      }
    }
  },
  labels: ['Database', 'Logs', 'Cache', 'Backups']
})

const storageChartSeries = ref([75, 45, 30, 85])

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
      systemStatus.value.overall = 'Warning'
    } else if (cpuUsage.value > 95 || memoryUsage.value > 95) {
      systemStatus.value.overall = 'Critical'
    } else {
      systemStatus.value.overall = 'Healthy'
    }
  } catch (error) {
    console.error('Error refreshing data:', error)
  } finally {
    loading.value = false
  }
}

// Navigation methods
const navigateToErrors = () => {
  router.push({ name: 'monitoring_errors' })
}

const navigateToPerformance = () => {
  router.push({ name: 'monitoring_performance' })
}

const navigateToContentPreview = () => {
  router.push({ name: 'monitoring_content_preview' })
}

const navigateToDatabaseHealth = () => {
  router.push({ name: 'monitoring_database_health' })
}

const navigateToProcessingHistory = () => {
  router.push({ name: 'monitoring_processing_history' })
}

const navigateToSettings = () => {
  router.push('/systemsetting/index')
}

// Quick action methods
const refreshAllData = async () => {
  await refreshData()
  // Additional refresh logic for all sections
  console.log('Refreshing all monitoring data')
}

const exportAllReports = () => {
  console.log('Exporting all monitoring reports')
  // Implementation for exporting reports
}

const viewAllAlerts = () => {
  navigateToErrors()
}

const showSystemAnalytics = () => {
  navigateToPerformance()
}

// Utility methods
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

const getErrorColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    default:
      return 'grey'
  }
}

const getErrorIcon = (severity: string) => {
  switch (severity.toLowerCase()) {
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

const getActivityColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success'
    case 'failed':
      return 'error'
    case 'processing':
      return 'info'
    default:
      return 'grey'
  }
}

const getActivityIcon = (operation: string) => {
  switch (operation.toLowerCase()) {
    case 'article scraping':
      return 'mdi-download'
    case 'translation':
      return 'mdi-translate'
    case 'publishing':
      return 'mdi-upload'
    default:
      return 'mdi-cog'
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

.monitoring-section-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.monitoring-section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: var(--v-primary-base);
}

.monitoring-section-card:active {
  transform: translateY(0);
}

.monitoring-section-card .v-card-text {
  padding: 16px;
}

.monitoring-section-card .v-icon {
  transition: transform 0.3s ease;
}

.monitoring-section-card:hover .v-icon {
  transform: scale(1.1);
}
</style> 