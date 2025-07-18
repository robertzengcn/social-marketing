<template>
  <div class="performance-metrics">
    <v-container fluid>
      <!-- Header -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="success">mdi-chart-line</v-icon>
              Performance Metrics Dashboard
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="refreshMetrics"
                :loading="loading"
                prepend-icon="mdi-refresh"
              >
                Refresh
              </v-btn>
              <v-btn
                color="secondary"
                @click="exportMetrics"
                prepend-icon="mdi-download"
                class="ml-2"
              >
                Export
              </v-btn>
            </v-card-title>
            <v-card-subtitle>
              Real-time system performance monitoring and analytics
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- Time Range and Metric Selection -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="selectedTimeRange"
                    :items="timeRangeOptions"
                    label="Time Range"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-clock"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                  <v-select
                    v-model="selectedMetrics"
                    :items="metricOptions"
                    label="Metrics"
                    density="compact"
                    variant="outlined"
                    multiple
                    chips
                    prepend-inner-icon="mdi-chart-multiple"
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
                  <v-btn
                    color="primary"
                    @click="updateCharts"
                    :loading="updating"
                    prepend-icon="mdi-update"
                    block
                  >
                    Update Charts
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Current System Status -->
      <v-row>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold" :class="getMetricColor(currentMetrics.cpu)">
                {{ currentMetrics.cpu }}%
              </div>
              <div class="text-caption text-medium-emphasis">CPU Usage</div>
              <v-progress-linear
                :model-value="currentMetrics.cpu"
                :color="getMetricColor(currentMetrics.cpu)"
                height="8"
                class="mt-2"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold" :class="getMetricColor(currentMetrics.memory)">
                {{ currentMetrics.memory }}%
              </div>
              <div class="text-caption text-medium-emphasis">Memory Usage</div>
              <v-progress-linear
                :model-value="currentMetrics.memory"
                :color="getMetricColor(currentMetrics.memory)"
                height="8"
                class="mt-2"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-info">
                {{ formatBytes(currentMetrics.network.in) }}
              </div>
              <div class="text-caption text-medium-emphasis">Network In</div>
              <div class="text-caption text-info">
                {{ formatBytes(currentMetrics.network.inRate) }}/s
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-text class="text-center">
              <div class="text-h4 font-weight-bold text-warning">
                {{ formatBytes(currentMetrics.network.out) }}
              </div>
              <div class="text-caption text-medium-emphasis">Network Out</div>
              <div class="text-caption text-warning">
                {{ formatBytes(currentMetrics.network.outRate) }}/s
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Performance Charts -->
      <v-row>
        <!-- CPU Usage Chart -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="primary">mdi-cpu-64-bit</v-icon>
              CPU Usage Over Time
              <v-spacer></v-spacer>
              <v-chip
                :color="getMetricColor(currentMetrics.cpu)"
                size="small"
              >
                {{ currentMetrics.cpu }}%
              </v-chip>
            </v-card-title>
            <v-card-text>
              <apexchart
                type="line"
                height="300"
                :options="cpuChartOptions"
                :series="cpuChartSeries"
              ></apexchart>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Memory Usage Chart -->
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="success">mdi-memory</v-icon>
              Memory Usage Over Time
              <v-spacer></v-spacer>
              <v-chip
                :color="getMetricColor(currentMetrics.memory)"
                size="small"
              >
                {{ currentMetrics.memory }}%
              </v-chip>
            </v-card-title>
            <v-card-text>
              <apexchart
                type="line"
                height="300"
                :options="memoryChartOptions"
                :series="memoryChartSeries"
              ></apexchart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <!-- Network Traffic Chart -->
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="info">mdi-network</v-icon>
              Network Traffic
              <v-spacer></v-spacer>
              <v-chip color="info" size="small">
                {{ formatBytes(currentMetrics.network.total) }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <apexchart
                type="area"
                height="300"
                :options="networkChartOptions"
                :series="networkChartSeries"
              ></apexchart>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Disk Usage Chart -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="warning">mdi-harddisk</v-icon>
              Disk Usage
              <v-spacer></v-spacer>
              <v-chip
                :color="getMetricColor(currentMetrics.disk)"
                size="small"
              >
                {{ currentMetrics.disk }}%
              </v-chip>
            </v-card-title>
            <v-card-text>
              <apexchart
                type="radialBar"
                height="300"
                :options="diskChartOptions"
                :series="diskChartSeries"
              ></apexchart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Application Performance -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="purple">mdi-application</v-icon>
              Application Performance Metrics
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="appMetricsHeaders"
                :items="appMetrics"
                density="compact"
                class="elevation-1"
              >
                <template v-slot:item.responseTime="{ item }">
                  <v-chip
                    :color="getResponseTimeColor(item.responseTime)"
                    size="small"
                    variant="outlined"
                  >
                    {{ item.responseTime }}ms
                  </v-chip>
                </template>
                <template v-slot:item.successRate="{ item }">
                  <v-chip
                    :color="getSuccessRateColor(item.successRate)"
                    size="small"
                    variant="outlined"
                  >
                    {{ item.successRate }}%
                  </v-chip>
                </template>
                <template v-slot:item.requestsPerMinute="{ item }">
                  <v-chip
                    color="info"
                    size="small"
                    variant="outlined"
                  >
                    {{ item.requestsPerMinute }}/min
                  </v-chip>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Performance Alerts -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon class="mr-2" color="warning">mdi-alert</v-icon>
              Performance Alerts
              <v-spacer></v-spacer>
              <v-chip
                v-if="performanceAlerts.length > 0"
                color="warning"
                size="small"
              >
                {{ performanceAlerts.length }} alerts
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-list v-if="performanceAlerts.length > 0">
                <v-list-item
                  v-for="alert in performanceAlerts"
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
                text="No performance alerts"
              >
                System performance is within normal parameters
              </v-alert>
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
const updating = ref(false)
const selectedTimeRange = ref('1h')
const selectedMetrics = ref(['cpu', 'memory', 'network'])
const selectedModule = ref('')

// Current metrics
const currentMetrics = ref({
  cpu: 45,
  memory: 62,
  disk: 78,
  network: {
    in: 1024 * 1024 * 50, // 50MB
    out: 1024 * 1024 * 25, // 25MB
    inRate: 1024 * 1024 * 2, // 2MB/s
    outRate: 1024 * 512, // 512KB/s
    total: 1024 * 1024 * 75 // 75MB
  }
})

// Mock performance data
const performanceData = ref({
  timestamps: [] as string[],
  cpu: [] as number[],
  memory: [] as number[],
  network: {
    in: [] as number[],
    out: [] as number[]
  }
})

// Mock application metrics
const appMetrics = ref([
  {
    module: 'Article Scraping',
    responseTime: 1200,
    successRate: 95,
    requestsPerMinute: 15,
    avgLoad: 0.3
  },
  {
    module: 'Translation Service',
    responseTime: 3500,
    successRate: 88,
    requestsPerMinute: 8,
    avgLoad: 0.6
  },
  {
    module: 'Publishing Service',
    responseTime: 800,
    successRate: 92,
    requestsPerMinute: 12,
    avgLoad: 0.4
  },
  {
    module: 'Database',
    responseTime: 150,
    successRate: 99,
    requestsPerMinute: 45,
    avgLoad: 0.2
  }
])

// Mock performance alerts
const performanceAlerts = ref([
  {
    id: 1,
    title: 'High CPU Usage',
    message: 'CPU usage exceeded 80% for more than 5 minutes',
    severity: 'warning',
    timestamp: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: 2,
    title: 'Memory Pressure',
    message: 'Available memory is below 20%',
    severity: 'critical',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  }
])

// Options
const timeRangeOptions = [
  { title: 'Last Hour', value: '1h' },
  { title: 'Last 6 Hours', value: '6h' },
  { title: 'Last 24 Hours', value: '24h' },
  { title: 'Last 7 Days', value: '7d' },
  { title: 'Last 30 Days', value: '30d' }
]

const metricOptions = [
  { title: 'CPU Usage', value: 'cpu' },
  { title: 'Memory Usage', value: 'memory' },
  { title: 'Network Traffic', value: 'network' },
  { title: 'Disk Usage', value: 'disk' },
  { title: 'Response Time', value: 'responseTime' }
]

const moduleOptions = [
  'Article Scraping',
  'Translation Service',
  'Publishing Service',
  'Database',
  'All Modules'
]

const appMetricsHeaders = [
  { title: 'Module', key: 'module', sortable: true },
  { title: 'Response Time', key: 'responseTime', sortable: true },
  { title: 'Success Rate', key: 'successRate', sortable: true },
  { title: 'Requests/min', key: 'requestsPerMinute', sortable: true },
  { title: 'Avg Load', key: 'avgLoad', sortable: true }
]

// Chart configurations
const cpuChartOptions = ref({
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
      text: 'CPU Usage (%)'
    },
    min: 0,
    max: 100
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy HH:mm'
    }
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5
    }
  }
})

const memoryChartOptions = ref({
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
  colors: ['#4CAF50'],
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
      text: 'Memory Usage (%)'
    },
    min: 0,
    max: 100
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy HH:mm'
    }
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5
    }
  }
})

const networkChartOptions = ref({
  chart: {
    type: 'area',
    height: 300,
    animations: {
      enabled: false
    }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  colors: ['#2196F3', '#FF9800'],
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
      text: 'Network Traffic (MB/s)'
    }
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy HH:mm'
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100]
    }
  }
})

const diskChartOptions = ref({
  chart: {
    type: 'radialBar',
    height: 300
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: {
        margin: 15,
        size: '70%'
      },
      track: {
        background: '#e7e7e7',
        strokeWidth: '97%',
        margin: 5
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: 7,
          color: '#111',
          fontSize: '20px',
          show: true,
          formatter: function (val: any) {
            return val + '%'
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#FF9800'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: 'round'
  }
})

// Chart series data
const cpuChartSeries = ref([{
  name: 'CPU Usage',
  data: [] as { x: number, y: number }[]
}])

const memoryChartSeries = ref([{
  name: 'Memory Usage',
  data: [] as { x: number, y: number }[]
}])

const networkChartSeries = ref([
  {
    name: 'Network In',
    data: [] as { x: number, y: number }[]
  },
  {
    name: 'Network Out',
    data: [] as { x: number, y: number }[]
  }
])

const diskChartSeries = ref([currentMetrics.value.disk])

// Methods
const refreshMetrics = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update current metrics with slight variations
    currentMetrics.value.cpu = Math.floor(Math.random() * 30) + 30
    currentMetrics.value.memory = Math.floor(Math.random() * 20) + 50
    currentMetrics.value.disk = Math.floor(Math.random() * 15) + 70
    
    // Update disk chart series
    diskChartSeries.value = [currentMetrics.value.disk]
    
    // Generate mock historical data
    generateHistoricalData()
    
  } catch (error) {
    console.error('Error refreshing metrics:', error)
  } finally {
    loading.value = false
  }
}

const updateCharts = async () => {
  updating.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    generateHistoricalData()
  } catch (error) {
    console.error('Error updating charts:', error)
  } finally {
    updating.value = false
  }
}

const generateHistoricalData = () => {
  const now = Date.now()
  const dataPoints = 20
  const interval = 5 * 60 * 1000 // 5 minutes
  
  const timestamps = []
  const cpuData = []
  const memoryData = []
  const networkInData = []
  const networkOutData = []
  
  for (let i = dataPoints; i >= 0; i--) {
    const timestamp = now - (i * interval)
    timestamps.push(timestamp)
    
    // Generate realistic data with some variation
    cpuData.push({
      x: timestamp,
      y: Math.floor(Math.random() * 40) + 20
    })
    
    memoryData.push({
      x: timestamp,
      y: Math.floor(Math.random() * 30) + 40
    })
    
    networkInData.push({
      x: timestamp,
      y: Math.random() * 5 + 1
    })
    
    networkOutData.push({
      x: timestamp,
      y: Math.random() * 3 + 0.5
    })
  }
  
  cpuChartSeries.value[0].data = cpuData
  memoryChartSeries.value[0].data = memoryData
  networkChartSeries.value[0].data = networkInData
  networkChartSeries.value[1].data = networkOutData
}

const exportMetrics = () => {
  const data = {
    currentMetrics: currentMetrics.value,
    appMetrics: appMetrics.value,
    performanceAlerts: performanceAlerts.value,
    timestamp: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `performance-metrics-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const getMetricColor = (value: number) => {
  if (value > 90) return 'text-error'
  if (value > 75) return 'text-warning'
  return 'text-success'
}

const getResponseTimeColor = (responseTime: number) => {
  if (responseTime > 5000) return 'error'
  if (responseTime > 2000) return 'warning'
  return 'success'
}

const getSuccessRateColor = (successRate: number) => {
  if (successRate < 80) return 'error'
  if (successRate < 90) return 'warning'
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
  refreshMetrics()
  
  // Set up real-time updates
  updateInterval = setInterval(() => {
    // Update current metrics with slight variations
    currentMetrics.value.cpu = Math.max(0, Math.min(100, currentMetrics.value.cpu + (Math.random() - 0.5) * 10))
    currentMetrics.value.memory = Math.max(0, Math.min(100, currentMetrics.value.memory + (Math.random() - 0.5) * 5))
    
    // Update disk chart series
    diskChartSeries.value = [currentMetrics.value.disk]
    
    // Add new data points to charts
    const now = Date.now()
    cpuChartSeries.value[0].data.push({
      x: now,
      y: currentMetrics.value.cpu
    })
    memoryChartSeries.value[0].data.push({
      x: now,
      y: currentMetrics.value.memory
    })
    
    // Keep only last 20 data points
    if (cpuChartSeries.value[0].data.length > 20) {
      cpuChartSeries.value[0].data.shift()
      memoryChartSeries.value[0].data.shift()
    }
  }, 5000)
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})
</script>

<style scoped>
.performance-metrics {
  padding: 16px;
}

.v-card {
  margin-bottom: 16px;
}
</style> 