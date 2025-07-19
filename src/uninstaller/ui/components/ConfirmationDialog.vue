<template>
  <div class="dialog-overlay" v-if="visible" @click="handleOverlayClick">
    <div class="dialog-container" @click.stop>
      <div class="dialog-header">
        <h3 class="dialog-title">{{ title }}</h3>
        <button class="close-button" @click="handleCancel" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="dialog-content">
        <div class="dialog-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <p class="dialog-message">{{ message }}</p>
        
        <div v-if="details" class="dialog-details">
          <h4>What will be removed:</h4>
          <ul class="details-list">
            <li v-for="(item, index) in details" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        
        <div v-if="warnings && warnings.length > 0" class="dialog-warnings">
          <h4>Warnings:</h4>
          <ul class="warnings-list">
            <li v-for="(warning, index) in warnings" :key="index" class="warning-item">
              <i class="fas fa-exclamation-circle"></i>
              {{ warning }}
            </li>
          </ul>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button 
          class="btn btn-secondary" 
          @click="handleCancel"
          :disabled="loading"
        >
          {{ cancelText }}
        </button>
        <button 
          class="btn btn-danger" 
          @click="handleConfirm"
          :disabled="loading"
        >
          <i v-if="loading" class="fas fa-spinner fa-spin"></i>
          {{ confirmText }}
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
  details?: string[]
  warnings?: string[]
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

interface Emits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

withDefaults(defineProps<Props>(), {
  title: 'Confirm Uninstallation',
  message: 'Are you sure you want to uninstall this application?',
  details: () => [],
  warnings: () => [],
  confirmText: 'Uninstall',
  cancelText: 'Cancel',
  loading: false
})

const emit = defineEmits<Emits>()

const handleConfirm = () => {
  if (!props.loading) {
    emit('confirm')
  }
}

const handleCancel = () => {
  if (!props.loading) {
    emit('cancel')
  }
}

const handleOverlayClick = () => {
  if (!props.loading) {
    emit('cancel')
  }
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
  color: #1f2937;
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

.dialog-icon {
  text-align: center;
  margin-bottom: 16px;
}

.dialog-icon i {
  font-size: 48px;
  color: #f59e0b;
}

.dialog-message {
  margin: 0 0 20px 0;
  font-size: 16px;
  line-height: 1.5;
  color: #374151;
  text-align: center;
}

.dialog-details {
  margin-bottom: 20px;
}

.dialog-details h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.details-list {
  margin: 0;
  padding-left: 20px;
  list-style-type: disc;
}

.details-list li {
  margin-bottom: 4px;
  font-size: 14px;
  color: #6b7280;
}

.dialog-warnings {
  margin-bottom: 20px;
}

.dialog-warnings h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #dc2626;
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
  color: #dc2626;
}

.warning-item i {
  margin-right: 8px;
  margin-top: 2px;
  flex-shrink: 0;
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

.btn-danger {
  background-color: #dc2626;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #b91c1c;
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
    color: #f9fafb;
  }
  
  .dialog-message {
    color: #d1d5db;
  }
  
  .dialog-details h4 {
    color: #f9fafb;
  }
  
  .details-list li {
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