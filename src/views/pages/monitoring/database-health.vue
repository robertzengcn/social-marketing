<template>
  <div class="database-health">
    <v-container fluid>
      <!-- Header -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="info">mdi-database</v-icon>
              Database Health Monitoring
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="refreshDatabaseHealth"
                :loading="loading"
                prepend-icon="mdi-refresh"
              >
                Refresh
              </v-btn>
              <v-btn
                color="secondary"
                @click="exportHealthReport"
                prepend-icon="mdi-download"
                class="ml-2"
              >
                Export Report
              </v-btn>
            </v-card-title>
            <v-card-subtitle>
              Real-time database performance and health monitoring
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- Database Status Overview -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="success">mdi-check-circle</v-icon>
              Database Status Overview
              <v-spacer></v-spacer>
              <v-chip
                :color="getOverallStatusColor(dbHealth.overallStatus)"
                size="small"
              >
                {{ dbHealth.overallStatus }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="3">
                  <div class="text-center">
                    <v-progress-circular
                      :model-value="dbHealth.connectionHealth"
                      :color="getHealthColor(dbHealth.connectionHealth)"
                      size="80"
                      width="8"
                    >
                      <span class="text-h6">{{ dbHealth.connectionHealth }}%</span>
                    </v-progress-circular>
                    <div class="text-caption mt-2">Connection Health</div>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="text-center">
                    <v-progress-circular
                      :model-value="dbHealth.performanceHealth"
                      :color="getHealthColor(dbHealth.performanceHealth)"
                      size="80"
                      width="8"
                    >
                      <span class="text-h6">{{ dbHealth.performanceHealth }}%</span>
                    </v-progress-circular>
                    <div class="text-caption mt-2">Performance Health</div>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="text-center">
                    <v-progress-circular
                      :model-value="dbHealth.storageHealth"
                      :color="getHealthColor(dbHealth.storageHealth)"
                      size="80"
                      width="8"
                    >
                      <span class="text-h6">{{ dbHealth.storageHealth }}%</span>
                    </v-progress-circular>
                    <div class="text-caption mt-2">Storage Health</div>
                  </div>
                </v-col>
                <v-col cols="12" md="3">
                  <div class="text-center">
                    <v-progress-circular
                      :model-value="dbHealth.uptimeHealth"
                      :color="getHealthColor(dbHealth.uptimeHealth)"
                      size="80"
                      width="8"
                    >
                      <span class="text-h6">{{ dbHealth.uptimeHealth }}%</span>
                    </v-progress-circular>
                    <div class="text-caption mt-2">Uptime Health</div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Connection Metrics -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-connection</v-icon>
              Connection Metrics
              <v-spacer></v-spacer>
              <v-chip
                :color="getConnectionStatusColor(dbHealth.connectionStatus)"
                size="small"
              >
                {{ dbHealth.connectionStatus }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-list density="compact">
                <v-list-item>
                  <v-list-item-title class="text-body-2">Active Connections</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      :color="getConnectionCountColor(dbHealth.activeConnections)"
                      size="x-small"
                    >
                      {{ dbHealth.activeConnections }} / {{ dbHealth.maxConnections }}
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-body-2">Connection Pool Usage</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-progress-linear
                      :model-value="(dbHealth.activeConnections / dbHealth.maxConnections) * 100"
                      :color="getConnectionCountColor(dbHealth.activeConnections)"
                      height="8"
                    ></v-progress-linear>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-body-2">Connection Time</v-list-item-title>
                  <v-list-item-subtitle>{{ dbHealth.avgConnectionTime }}ms</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-body-2">Failed Connections</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      :color="dbHealth.failedConnections > 0 ? 'error' : 'success'"
                      size="x-small"
                    >
                      {{ dbHealth.failedConnections }} (last 24h)
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Performance Metrics -->
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="success">mdi-speedometer</v-icon>
              Performance Metrics
              <v-spacer></v-spacer>
              <v-chip
                :color="getPerformanceStatusColor(dbHealth.performanceStatus)"
                size="small"
              >
                {{ dbHealth.performanceStatus }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-list density="compact">
                <v-list-item>
                  <v-list-item-title class="text-body-2">Average Query Time</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      :color="getQueryTimeColor(dbHealth.avgQueryTime)"
                      size="x-small"
                    >
                      {{ dbHealth.avgQueryTime }}ms
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-body-2">Slow Queries (>1s)</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      :color="dbHealth.slowQueries > 0 ? 'warning' : 'success'"
                      size="x-small"
                    >
                      {{ dbHealth.slowQueries }} (last hour)
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-body-2">Queries per Second</v-list-item-title>
                  <v-list-item-subtitle>{{ dbHealth.queriesPerSecond }} QPS</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-body-2">Cache Hit Rate</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-progress-linear
                      :model-value="dbHealth.cacheHitRate"
                      :color="getCacheHitRateColor(dbHealth.cacheHitRate)"
                      height="8"
                    ></v-progress-linear>
                    {{ dbHealth.cacheHitRate }}%
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Storage Metrics -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="warning">mdi-harddisk</v-icon>
              Storage Metrics
              <v-spacer></v-spacer>
              <v-chip
                :color="getStorageStatusColor(dbHealth.storageStatus)"
                size="small"
              >
                {{ dbHealth.storageStatus }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-list density="compact">
                <v-list-item>
                  <v-list-item-title class="text-body-2">Database Size</v-list-item-title>
                  <v-list-item-subtitle>{{ formatBytes(dbHealth.databaseSize) }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-body-2">Disk Usage</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-progress-linear
                      :model-value="dbHealth.diskUsage"
                      :color="getDiskUsageColor(dbHealth.diskUsage)"
                      height="8"
                    ></v-progress-linear>
                    {{ dbHealth.diskUsage }}% ({{ formatBytes(dbHealth.usedSpace) }} / {{ formatBytes(dbHealth.totalSpace) }})
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-body-2">Free Space</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      :color="getFreeSpaceColor(dbHealth.freeSpace)"
                      size="x-small"
                    >
                      {{ formatBytes(dbHealth.freeSpace) }}
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-body-2">Growth Rate</v-list-item-title>
                  <v-list-item-subtitle>{{ dbHealth.growthRate }} MB/day</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Table Statistics -->
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="purple">mdi-table</v-icon>
              Table Statistics
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="tableStatsHeaders"
                :items="dbHealth.tableStats"
                density="compact"
                class="elevation-1"
                :items-per-page="5"
              >
                <template v-slot:item.size="{ item }">
                  <v-chip size="x-small" color="info">
                    {{ formatBytes(item.size) }}
                  </v-chip>
                </template>
                <template v-slot:item.rowCount="{ item }">
                  <v-chip size="x-small" color="success">
                    {{ formatNumber(item.rowCount) }}
                  </v-chip>
                </template>
                <template v-slot:item.lastUpdated="{ item }">
                  {{ formatTime(item.lastUpdated) }}
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Database Alerts -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="warning">mdi-alert</v-icon>
              Database Alerts
              <v-spacer></v-spacer>
              <v-chip
                v-if="dbHealth.alerts.length > 0"
                color="warning"
                size="small"
              >
                {{ dbHealth.alerts.length }} alerts
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-list v-if="dbHealth.alerts.length > 0">
                <v-list-item
                  v-for="alert in dbHealth.alerts"
                  :key="alert.id"
                  class="mb-2"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :color="getAlertColor(alert.severity)"
                      size="small"
                    >
                      {{ getAlertIcon(alert.severity) }}
                    </v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">
                    {{ alert.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ alert.message }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-chip size="x-small" color="grey" variant="outlined">
                      {{ formatTime(alert.timestamp) }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert
                v-else
                type="success"
                variant="tonal"
                text="No database alerts"
              >
                Database is operating normally
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Performance Charts -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-chart-line</v-icon>
              Query Performance Over Time
            </v-card-title>
            <v-card-text>
              <apexchart
                type="line"
                height="300"
                :options="queryPerformanceChartOptions"
                :series="queryPerformanceChartSeries"
              ></apexchart>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="success">mdi-chart-pie</v-icon>
              Storage Distribution
            </v-card-title>
            <v-card-text>
              <apexchart
                type="pie"
                height="300"
                :options="storageChartOptions"
                :series="storageChartSeries"
              ></apexchart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// Reactive data
const loading = ref(false)

// Mock database health data
const dbHealth = ref({
  overallStatus: 'healthy',
  connectionHealth: 95,
  performanceHealth: 88,
  storageHealth: 72,
  uptimeHealth: 99.9,
  
  connectionStatus: 'connected',
  activeConnections: 12,
  maxConnections: 50,
  avgConnectionTime: 45,
  failedConnections: 2,
  
  performanceStatus: 'good',
  avgQueryTime: 120,
  slowQueries: 3,
  queriesPerSecond: 45,
  cacheHitRate: 85,
  
  storageStatus: 'warning',
  databaseSize: 1024 * 1024 * 512, // 512MB
  diskUsage: 78,
  usedSpace: 1024 * 1024 * 1024 * 15, // 15GB
  totalSpace: 1024 * 1024 * 1024 * 20, // 20GB
  freeSpace: 1024 * 1024 * 1024 * 5, // 5GB
  growthRate: 25,
  
  tableStats: [
    {
      name: 'articles',
      size: 1024 * 1024 * 128, // 128MB
      rowCount: 15420,
      lastUpdated: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      name: 'translation_memory',
      size: 1024 * 1024 * 64, // 64MB
      rowCount: 8920,
      lastUpdated: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
      name: 'publish_results',
      size: 1024 * 1024 * 32, // 32MB
      rowCount: 4560,
      lastUpdated: new Date(Date.now() - 2 * 60 * 1000)
    },
    {
      name: 'article_processing_logs',
      size: 1024 * 1024 * 16, // 16MB
      rowCount: 2340,
      lastUpdated: new Date(Date.now() - 1 * 60 * 1000)
    }
  ],
  
  alerts: [
    {
      id: 1,
      title: 'High Disk Usage',
      message: 'Database disk usage is at 78%, consider cleanup',
      severity: 'warning',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 2,
      title: 'Slow Query Detected',
      message: 'Query execution time exceeded 2 seconds',
      severity: 'info',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    }
  ]
})

// Table headers
const tableStatsHeaders = [
  { title: 'Table Name', key: 'name', sortable: true },
  { title: 'Size', key: 'size', sortable: true },
  { title: 'Row Count', key: 'rowCount', sortable: true },
  { title: 'Last Updated', key: 'lastUpdated', sortable: true }
]

// Chart configurations
const queryPerformanceChartOptions = ref({
  chart: {
    type: 'line',
    height: 300,
    animations: {
      enabled: false
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  colors: ['#2196F3'],
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM \'yy',
        day: 'dd MMM',
        hour: 'HH:mm'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Query Time (ms)'
    }
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy HH:mm'
    }
  }
})

const storageChartOptions = ref({
  chart: {
    type: 'pie',
    height: 300
  },
  labels: ['Articles', 'Translation Memory', 'Publish Results', 'Processing Logs'],
  colors: ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0'],
  legend: {
    position: 'bottom'
  }
})

// Chart series data
const queryPerformanceChartSeries = ref([{
  name: 'Average Query Time',
  data: [] as { x: number, y: number }[]
}])

const storageChartSeries = computed(() => [
  dbHealth.value.tableStats[0].size,
  dbHealth.value.tableStats[1].size,
  dbHealth.value.tableStats[2].size,
  dbHealth.value.tableStats[3].size
])

// Methods
const refreshDatabaseHealth = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update metrics with slight variations
    dbHealth.value.connectionHealth = Math.max(80, Math.min(100, dbHealth.value.connectionHealth + (Math.random() - 0.5) * 10))
    dbHealth.value.performanceHealth = Math.max(70, Math.min(100, dbHealth.value.performanceHealth + (Math.random() - 0.5) * 15))
    dbHealth.value.storageHealth = Math.max(60, Math.min(100, dbHealth.value.storageHealth + (Math.random() - 0.5) * 20))
    
    // Generate mock query performance data
    generateQueryPerformanceData()
    
  } catch (error) {
    console.error('Error refreshing database health:', error)
  } finally {
    loading.value = false
  }
}

const generateQueryPerformanceData = () => {
  const now = Date.now()
  const dataPoints = 20
  const interval = 5 * 60 * 1000 // 5 minutes
  
  const data = []
  
  for (let i = dataPoints; i >= 0; i--) {
    const timestamp = now - (i * interval)
    data.push({
      x: timestamp,
      y: Math.floor(Math.random() * 200) + 50 // 50-250ms
    })
  }
  
  queryPerformanceChartSeries.value[0].data = data
}

const exportHealthReport = () => {
  const data = {
    databaseHealth: dbHealth.value,
    exportTime: new Date().toISOString(),
    reportType: 'database_health'
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `database-health-report-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const getOverallStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'healthy':
      return 'success'
    case 'warning':
      return 'warning'
    case 'critical':
      return 'error'
    default:
      return 'grey'
  }
}

const getHealthColor = (value: number) => {
  if (value >= 90) return 'success'
  if (value >= 70) return 'warning'
  return 'error'
}

const getConnectionStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'connected':
      return 'success'
    case 'connecting':
      return 'warning'
    case 'disconnected':
      return 'error'
    default:
      return 'grey'
  }
}

const getConnectionCountColor = (count: number) => {
  const percentage = (count / dbHealth.value.maxConnections) * 100
  if (percentage >= 90) return 'error'
  if (percentage >= 70) return 'warning'
  return 'success'
}

const getPerformanceStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'excellent':
      return 'success'
    case 'good':
      return 'info'
    case 'fair':
      return 'warning'
    case 'poor':
      return 'error'
    default:
      return 'grey'
  }
}

const getQueryTimeColor = (time: number) => {
  if (time <= 100) return 'success'
  if (time <= 500) return 'warning'
  return 'error'
}

const getCacheHitRateColor = (rate: number) => {
  if (rate >= 90) return 'success'
  if (rate >= 70) return 'warning'
  return 'error'
}

const getStorageStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'optimal':
      return 'success'
    case 'warning':
      return 'warning'
    case 'critical':
      return 'error'
    default:
      return 'grey'
  }
}

const getDiskUsageColor = (usage: number) => {
  if (usage >= 90) return 'error'
  if (usage >= 70) return 'warning'
  return 'success'
}

const getFreeSpaceColor = (space: number) => {
  const gb = space / (1024 * 1024 * 1024)
  if (gb <= 1) return 'error'
  if (gb <= 5) return 'warning'
  return 'success'
}

const getAlertColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'error'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    default:
      return 'grey'
  }
}

const getAlertIcon = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'mdi-alert-octagon'
    case 'warning':
      return 'mdi-alert'
    case 'info':
      return 'mdi-information'
    default:
      return 'mdi-help-circle'
  }
}

const formatBytes = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
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

// Real-time updates simulation
let updateInterval: NodeJS.Timeout | null = null

// Lifecycle hooks
onMounted(() => {
  refreshDatabaseHealth()
  
  // Set up real-time updates
  updateInterval = setInterval(() => {
    // Update metrics with slight variations
    dbHealth.value.connectionHealth = Math.max(80, Math.min(100, dbHealth.value.connectionHealth + (Math.random() - 0.5) * 5))
    dbHealth.value.performanceHealth = Math.max(70, Math.min(100, dbHealth.value.performanceHealth + (Math.random() - 0.5) * 8))
    dbHealth.value.storageHealth = Math.max(60, Math.min(100, dbHealth.value.storageHealth + (Math.random() - 0.5) * 10))
    
    // Add new data points to charts
    const now = Date.now()
    queryPerformanceChartSeries.value[0].data.push({
      x: now,
      y: Math.floor(Math.random() * 200) + 50
    })
    
    // Keep only last 20 data points
    if (queryPerformanceChartSeries.value[0].data.length > 20) {
      queryPerformanceChartSeries.value[0].data.shift()
    }
  }, 10000) // Update every 10 seconds
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})
</script>

<style scoped>
.database-health {
  padding: 16px;
}

.v-card {
  margin-bottom: 16px;
}
</style> 