<template>
  <div class="dialog-overlay" v-if="visible" @click="handleOverlayClick">
    <div class="dialog-container" @click.stop>
      <div class="dialog-header">
        <h3 class="dialog-title">
          <i class="fas fa-check-circle"></i>
          {{ title }}
        </h3>
        <button class="close-button" @click="handleClose" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="dialog-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        
        <p class="success-message">{{ message }}</p>
        
        <div v-if="summary" class="success-summary">
          <h4>Uninstallation Summary:</h4>
          <div class="summary-stats">
            <div class="stat-item">
              <span class="stat-label">Files Removed:</span>
              <span class="stat-value">{{ summary.filesRemoved }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Registry Entries:</span>
              <span class="stat-value">{{ summary.registryEntries }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Shortcuts Removed:</span>
              <span class="stat-value">{{ summary.shortcutsRemoved }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">User Data:</span>
              <span class="stat-value">{{ summary.userDataRemoved ? 'Yes' : 'No' }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="removedItems && removedItems.length > 0" class="removed-items">
          <h4>Removed Items:</h4>
          <div class="items-list">
            <div 
              v-for="(item, index) in removedItems" 
              :key="index" 
              class="item-entry"
            >
              <i class="fas fa-trash-alt"></i>
              <span class="item-path">{{ item }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="warnings && warnings.length > 0" class="success-warnings">
          <h4>Warnings:</h4>
          <ul class="warnings-list">
            <li v-for="(warning, index) in warnings" :key="index" class="warning-item">
              <i class="fas fa-exclamation-triangle"></i>
              {{ warning }}
            </li>
          </ul>
        </div>
        
        <div v-if="nextSteps && nextSteps.length > 0" class="next-steps">
          <h4>Next Steps:</h4>
          <ul class="steps-list">
            <li v-for="(step, index) in nextSteps" :key="index">
              {{ step }}
            </li>
          </ul>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button 
          v-if="showRestart"
          class="btn btn-primary" 
          @click="handleRestart"
        >
          <i class="fas fa-redo"></i>
          {{ restartText }}
        </button>
        <button 
          class="btn btn-secondary" 
          @click="handleClose"
        >
          {{ closeText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UninstallSummary {
  filesRemoved: number
  registryEntries: number
  shortcutsRemoved: number
  userDataRemoved: boolean
}

interface Props {
  visible: boolean
  title?: string
  message?: string
  summary?: UninstallSummary
  removedItems?: string[]
  warnings?: string[]
  nextSteps?: string[]
  showRestart?: boolean
  closeText?: string
  restartText?: string
}

interface Emits {
  (e: 'close'): void
  (e: 'restart'): void
}

withDefaults(defineProps<Props>(), {
  title: 'Uninstallation Complete',
  message: 'The application has been successfully uninstalled from your system.',
  summary: undefined,
  removedItems: () => [],
  warnings: () => [],
  nextSteps: () => [],
  showRestart: false,
  closeText: 'Close',
  restartText: 'Restart Computer'
})

const emit = defineEmits<Emits>()

const handleClose = () => {
  emit('close')
}

const handleRestart = () => {
  emit('restart')
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
  max-width: 600px;
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
  color: #059669;
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
  max-height: 60vh;
  overflow-y: auto;
}

.success-icon {
  text-align: center;
  margin-bottom: 16px;
}

.success-icon i {
  font-size: 48px;
  color: #059669;
}

.success-message {
  margin: 0 0 20px 0;
  font-size: 16px;
  line-height: 1.5;
  color: #374151;
  text-align: center;
}

.success-summary {
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
}

.success-summary h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #059669;
}

.summary-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.stat-label {
  font-size: 13px;
  color: #374151;
  font-weight: 500;
}

.stat-value {
  font-size: 13px;
  color: #059669;
  font-weight: 600;
}

.removed-items {
  margin-bottom: 20px;
}

.removed-items h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.items-list {
  max-height: 120px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px;
}

.item-entry {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 12px;
  color: #6b7280;
}

.item-entry i {
  color: #dc2626;
  font-size: 10px;
  flex-shrink: 0;
}

.item-path {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  word-break: break-all;
}

.success-warnings {
  margin-bottom: 20px;
}

.success-warnings h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #f59e0b;
}

.warnings-list {
  margin: 0;
  padding-left: 0;
  list-style-type: none;
}

.warning-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  font-size: 14px;
  color: #f59e0b;
}

.warning-item i {
  margin-right: 8px;
  margin-top: 2px;
  flex-shrink: 0;
}

.next-steps {
  margin-bottom: 20px;
}

.next-steps h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.steps-list {
  margin: 0;
  padding-left: 20px;
  list-style-type: decimal;
}

.steps-list li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
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

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.btn-primary {
  background-color: #059669;
  color: white;
}

.btn-primary:hover {
  background-color: #047857;
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
    color: #6ee7b7;
  }
  
  .success-message {
    color: #d1d5db;
  }
  
  .success-summary {
    background-color: #064e3b;
    border-color: #065f46;
  }
  
  .success-summary h4 {
    color: #6ee7b7;
  }
  
  .stat-label {
    color: #d1d5db;
  }
  
  .stat-value {
    color: #6ee7b7;
  }
  
  .removed-items h4,
  .next-steps h4 {
    color: #f9fafb;
  }
  
  .items-list {
    border-color: #4b5563;
  }
  
  .item-entry {
    color: #9ca3af;
  }
  
  .steps-list li {
    color: #9ca3af;
  }
  
  .success-warnings h4 {
    color: #fbbf24;
  }
  
  .warning-item {
    color: #fbbf24;
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
  
  .btn-secondary:hover {
    background-color: #4b5563;
  }
}
</style> 