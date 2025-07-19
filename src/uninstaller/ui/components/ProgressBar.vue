<template>
  <div class="progress-container">
    <div class="progress-header">
      <span class="progress-label">{{ label }}</span>
      <span class="progress-percentage">{{ Math.round(progress) }}%</span>
    </div>
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${progress}%` }"
        :class="{ 'animate': animate }"
      ></div>
    </div>
    <div v-if="message" class="progress-message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number
  label?: string
  message?: string
  animate?: boolean
}

withDefaults(defineProps<Props>(), {
  label: 'Progress',
  message: '',
  animate: true
})
</script>

<style scoped>
.progress-container {
  width: 100%;
  margin: 16px 0;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-label {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.progress-percentage {
  font-weight: 600;
  color: #2563eb;
  font-size: 14px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  border-radius: 4px;
  transition: width 0.3s ease-in-out;
  position: relative;
}

.progress-fill.animate {
  animation: progressPulse 2s ease-in-out infinite;
}

.progress-fill.animate::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 1.5s ease-in-out infinite;
}

.progress-message {
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  min-height: 16px;
}

@keyframes progressPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .progress-label {
    color: #e5e7eb;
  }
  
  .progress-bar {
    background-color: #374151;
  }
  
  .progress-message {
    color: #9ca3af;
  }
}
</style> 