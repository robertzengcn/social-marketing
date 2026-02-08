<template>
  <div class="uninstaller-window">
    <div class="header">
      <div class="logo">
        <img src="../assets/images/icon.png" alt="Social Marketing" />
      </div>
      <div class="title">
        <h1>Social Marketing Uninstaller</h1>
        <p>Remove Social Marketing from your system</p>
      </div>
    </div>

    <div class="content">
      <!-- Welcome Screen -->
      <div v-if="currentStep === 'welcome'" class="welcome-screen">
        <div class="icon">
          <i class="fas fa-trash-alt"></i>
        </div>
        <h2>Welcome to the Uninstaller</h2>
        <p>
          This will completely remove Social Marketing from your system, including:
        </p>
        <ul>
          <li>Application files and folders</li>
          <li>Desktop and start menu shortcuts</li>
          <li>Registry entries (Windows)</li>
          <li>User data and preferences</li>
          <li>Cache and temporary files</li>
        </ul>
        <div class="warning">
          <i class="fas fa-exclamation-triangle"></i>
          <strong>Warning:</strong> This action cannot be undone. Please make sure you have backed up any important data.
        </div>
        <div class="actions">
          <button @click="startUninstall" class="btn-primary">
            <i class="fas fa-trash"></i>
            Start Uninstallation
          </button>
          <button @click="cancel" class="btn-secondary">
            <i class="fas fa-times"></i>
            Cancel
          </button>
        </div>
      </div>

      <!-- Progress Screen -->
      <div v-if="currentStep === 'progress'" class="progress-screen">
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="progress-text">
            {{ progress }}% Complete
          </div>
        </div>
        <div class="status">
          <h3>{{ currentMessage }}</h3>
          <p>{{ statusDetails }}</p>
        </div>
        <div class="steps">
          <div 
            v-for="(step, index) in uninstallSteps" 
            :key="index"
            :class="['step', { active: step.active, completed: step.completed }]"
          >
            <div class="step-icon">
              <i v-if="step.completed" class="fas fa-check"></i>
              <i v-else-if="step.active" class="fas fa-spinner fa-spin"></i>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="step-content">
              <div class="step-title">{{ step.title }}</div>
              <div class="step-description">{{ step.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Screen -->
      <div v-if="currentStep === 'success'" class="success-screen">
        <div class="icon success">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>Uninstallation Complete!</h2>
        <p>Social Marketing has been successfully removed from your system.</p>
        <div class="summary">
          <h3>What was removed:</h3>
          <ul>
            <li v-for="(item, index) in removedItems" :key="index">
              <i class="fas fa-check"></i>
              {{ item }}
            </li>
          </ul>
        </div>
        <div v-if="warnings.length > 0" class="warnings">
          <h3>Warnings:</h3>
          <ul>
            <li v-for="(warning, index) in warnings" :key="index">
              <i class="fas fa-exclamation-triangle"></i>
              {{ warning }}
            </li>
          </ul>
        </div>
        <div class="actions">
          <button @click="finish" class="btn-primary">
            <i class="fas fa-check"></i>
            Finish
          </button>
        </div>
      </div>

      <!-- Error Screen -->
      <div v-if="currentStep === 'error'" class="error-screen">
        <div class="icon error">
          <i class="fas fa-times-circle"></i>
        </div>
        <h2>Uninstallation Failed</h2>
        <p>{{ errorMessage }}</p>
        <div v-if="errors.length > 0" class="errors">
          <h3>Errors:</h3>
          <ul>
            <li v-for="(error, index) in errors" :key="index">
              <i class="fas fa-times"></i>
              {{ error }}
            </li>
          </ul>
        </div>
        <div class="actions">
          <button @click="retry" class="btn-primary">
            <i class="fas fa-redo"></i>
            Try Again
          </button>
          <button @click="cancel" class="btn-secondary">
            <i class="fas fa-times"></i>
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>&copy; 2024 Social Marketing. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// Types
interface UninstallStep {
  title: string
  description: string
  active: boolean
  completed: boolean
}

// State
const currentStep = ref<'welcome' | 'progress' | 'success' | 'error'>('welcome')
const progress = ref(0)
const currentMessage = ref('')
const statusDetails = ref('')
const errorMessage = ref('')
const errors = ref<string[]>([])
const warnings = ref<string[]>([])
const removedItems = ref<string[]>([])

// Uninstall steps
const uninstallSteps = reactive<UninstallStep[]>([
  {
    title: 'Detecting Installation',
    description: 'Finding Social Marketing installation directory',
    active: false,
    completed: false
  },
  {
    title: 'Stopping Processes',
    description: 'Closing any running instances',
    active: false,
    completed: false
  },
  {
    title: 'Removing Shortcuts',
    description: 'Removing desktop and start menu shortcuts',
    active: false,
    completed: false
  },
  {
    title: 'Cleaning Registry',
    description: 'Removing registry entries and preferences',
    active: false,
    completed: false
  },
  {
    title: 'Removing Files',
    description: 'Deleting application files and folders',
    active: false,
    completed: false
  },
  {
    title: 'Cleaning User Data',
    description: 'Removing user data and cache',
    active: false,
    completed: false
  },
  {
    title: 'Final Cleanup',
    description: 'Performing final cleanup operations',
    active: false,
    completed: false
  }
])

// Methods
const startUninstall = async () => {
  currentStep.value = 'progress'
  
  try {
    // Simulate uninstall process
    await simulateUninstall()
  } catch (error) {
    handleError(error)
  }
}

const simulateUninstall = async () => {
  const steps = [
    { progress: 10, message: 'Detecting installation...', stepIndex: 0 },
    { progress: 20, message: 'Stopping running processes...', stepIndex: 1 },
    { progress: 30, message: 'Removing shortcuts...', stepIndex: 2 },
    { progress: 40, message: 'Cleaning registry entries...', stepIndex: 3 },
    { progress: 60, message: 'Removing application files...', stepIndex: 4 },
    { progress: 80, message: 'Cleaning user data...', stepIndex: 5 },
    { progress: 100, message: 'Finalizing uninstallation...', stepIndex: 6 }
  ]

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]
    
    // Update step status
    if (i > 0) {
      uninstallSteps[i - 1].active = false
      uninstallSteps[i - 1].completed = true
    }
    uninstallSteps[step.stepIndex].active = true
    
    // Update progress
    progress.value = step.progress
    currentMessage.value = step.message
    statusDetails.value = `Step ${i + 1} of ${steps.length}`
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Mark last step as completed
  uninstallSteps[6].active = false
  uninstallSteps[6].completed = true

  // Set success state
  removedItems.value = [
    'Application files and folders',
    'Desktop and start menu shortcuts',
    'Registry entries and preferences',
    'User data and cache files'
  ]
  
  warnings.value = [
    'Some registry entries required administrator privileges',
    'Cache files may be recreated on next system restart'
  ]

  currentStep.value = 'success'
}

const handleError = (error: any) => {
  errorMessage.value = 'An error occurred during uninstallation'
  errors.value = [error.message || 'Unknown error occurred']
  currentStep.value = 'error'
}

const retry = () => {
  // Reset state
  currentStep.value = 'welcome'
  progress.value = 0
  errors.value = []
  warnings.value = []
  
  // Reset steps
  uninstallSteps.forEach(step => {
    step.active = false
    step.completed = false
  })
}

const cancel = () => {
  // Close the window
  window.close()
}

const finish = () => {
  // Close the window
  window.close()
}

// Lifecycle
onMounted(() => {
  // Initialize any required setup
  console.log('Uninstaller window mounted')
})
</script>

<style scoped>
.uninstaller-window {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.logo img {
  width: 48px;
  height: 48px;
  margin-right: 15px;
}

.title h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.title p {
  margin: 5px 0 0 0;
  color: #666;
  font-size: 14px;
}

.content {
  flex: 1;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-screen,
.progress-screen,
.success-screen,
.error-screen {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.icon.success {
  color: #28a745;
}

.icon.error {
  color: #dc3545;
}

h2 {
  margin: 0 0 20px 0;
  font-size: 28px;
  font-weight: 600;
}

p {
  margin: 0 0 20px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #666;
}

ul {
  text-align: left;
  margin: 20px 0;
  padding-left: 20px;
}

li {
  margin: 8px 0;
  font-size: 14px;
}

.warning {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  color: #856404;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-container {
  margin: 30px 0;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #28a745, #20c997);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.status {
  margin: 30px 0;
}

.status h3 {
  margin: 0 0 10px 0;
  color: #fff;
  font-size: 20px;
}

.status p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.steps {
  margin-top: 30px;
}

.step {
  display: flex;
  align-items: center;
  margin: 15px 0;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.step.active {
  background: rgba(255, 255, 255, 0.2);
  border-left: 4px solid #28a745;
}

.step.completed {
  background: rgba(40, 167, 69, 0.2);
  border-left: 4px solid #28a745;
}

.step-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.step.completed .step-icon {
  background: #28a745;
}

.step-content {
  flex: 1;
  text-align: left;
}

.step-title {
  font-weight: 600;
  color: #fff;
  margin-bottom: 5px;
}

.step-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #28a745;
  color: #fff;
}

.btn-primary:hover {
  background: #218838;
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.summary,
.warnings,
.errors {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
}

.summary h3,
.warnings h3,
.errors h3 {
  margin: 0 0 15px 0;
  color: #fff;
  font-size: 18px;
}

.summary ul,
.warnings ul,
.errors ul {
  margin: 0;
  padding-left: 20px;
}

.summary li,
.warnings li,
.errors li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.9);
}

.summary i {
  color: #28a745;
}

.warnings i {
  color: #ffc107;
}

.errors i {
  color: #dc3545;
}

.footer {
  padding: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.footer p {
  margin: 0;
  color: #666;
  font-size: 12px;
}
</style> 