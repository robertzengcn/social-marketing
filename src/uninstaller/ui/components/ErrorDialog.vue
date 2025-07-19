<template>
  <div class="dialog-overlay" v-if="visible" @click="handleOverlayClick">
    <div class="dialog-container" @click.stop>
      <div class="dialog-header">
        <h3 class="dialog-title">
          <i class="fas fa-exclamation-circle"></i>
          {{ title }}
        </h3>
        <button class="close-button" @click="handleClose" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="dialog-content">
        <div class="error-icon">
          <i class="fas fa-times-circle"></i>
        </div>
        
        <p class="error-message">{{ message }}</p>
        
        <div v-if="details" class="error-details">
          <h4>Error Details:</h4>
          <div class="error-code">
            <code>{{ details }}</code>
          </div>
        </div>
        
        <div v-if="suggestions && suggestions.length > 0" class="error-suggestions">
          <h4>Suggestions:</h4>
          <ul class="suggestions-list">
            <li v-for="(suggestion, index) in suggestions" :key="index">
              {{ suggestion }}
            </li>
          </ul>
        </div>
        
        <div v-if="showRetry" class="retry-section">
          <p class="retry-message">Would you like to try again?</p>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button 
          class="btn btn-secondary" 
          @click="handleClose"
        >
          {{ closeText }}
        </button>
        <button 
          v-if="showRetry"
          class="btn btn-primary" 
          @click="handleRetry"
          :disabled="retrying"
        >
          <i v-if="retrying" class="fas fa-spinner fa-spin"></i>
          {{ retryText }}
        </button>
        <button 
          v-if="showContinue"
          class="btn btn-warning" 
          @click="handleContinue"
        >
          {{ continueText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  visible: boolean
  title?: string
  message?: string
  details?: string
  suggestions?: string[]
  showRetry?: boolean
  showContinue?: boolean
  retrying?: boolean
  closeText?: string
  retryText?: string
  continueText?: string
}

interface Emits {
  (e: 'close'): void
  (e: 'retry'): void
  (e: 'continue'): void
}

withDefaults(defineProps<Props>(), {
  title: 'Uninstallation Error',
  message: 'An error occurred during the uninstallation process.',
  details: '',
  suggestions: () => [],
  showRetry: true,
  showContinue: false,
  retrying: false,
  closeText: 'Close',
  retryText: 'Retry',
  continueText: 'Continue Anyway'
})

const emit = defineEmits<Emits>()

const handleClose = () => {
  emit('close')
}

const handleRetry = () => {
  if (!props.retrying) {
    emit('retry')
  }
}

const handleContinue = () => {
  emit('continue')
}

const handleOverlayClick = () => {
  emit('close')
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.dialog-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  animation: dialogSlideIn 0.3s ease-out;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 0;
}

.dialog-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #dc2626;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dialog-title i {
  font-size: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 18px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.dialog-content {
  padding: 20px 24px;
}

.error-icon {
  text-align: center;
  margin-bottom: 16px;
}

.error-icon i {
  font-size: 48px;
  color: #dc2626;
}

.error-message {
  margin: 0 0 20px 0;
  font-size: 16px;
  line-height: 1.5;
  color: #374151;
  text-align: center;
}

.error-details {
  margin-bottom: 20px;
}

.error-details h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.error-code {
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  color: #dc2626;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.error-suggestions {
  margin-bottom: 20px;
}

.error-suggestions h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.suggestions-list {
  margin: 0;
  padding-left: 20px;
  list-style-type: disc;
}

.suggestions-list li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
}

.retry-section {
  margin-bottom: 20px;
  text-align: center;
}

.retry-message {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  font-style: italic;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 0 24px 24px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.btn-warning {
  background-color: #f59e0b;
  color: white;
}

.btn-warning:hover:not(:disabled) {
  background-color: #d97706;
}

@keyframes dialogSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .dialog-container {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .dialog-title {
    color: #fca5a5;
  }
  
  .error-message {
    color: #d1d5db;
  }
  
  .error-details h4,
  .error-suggestions h4 {
    color: #f9fafb;
  }
  
  .suggestions-list li {
    color: #9ca3af;
  }
  
  .error-code {
    background-color: #374151;
    border-color: #4b5563;
    color: #fca5a5;
  }
  
  .retry-message {
    color: #9ca3af;
  }
  
  .close-button {
    color: #9ca3af;
  }
  
  .close-button:hover {
    background-color: #374151;
    color: #d1d5db;
  }
  
  .btn-secondary {
    background-color: #374151;
    color: #d1d5db;
  }
  
  .btn-secondary:hover:not(:disabled) {
    background-color: #4b5563;
  }
}
</style> 