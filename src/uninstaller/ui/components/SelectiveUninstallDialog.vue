<template>
  <div class="selective-uninstall-dialog">
    <div class="dialog-header">
      <h2>Selective Uninstallation</h2>
      <p>Choose what you want to remove from your system</p>
    </div>

    <div class="dialog-content">
      <!-- Category Selection -->
      <div class="categories-section">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          class="category-group"
        >
          <div class="category-header" @click="toggleCategory(category.id)">
            <div class="category-info">
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
              <span class="size-info">{{ formatSize(category.totalSize) }}</span>
            </div>
            <div class="category-controls">
              <input 
                type="checkbox" 
                :checked="isCategorySelected(category.id)"
                @change="toggleCategorySelection(category.id)"
                :indeterminate="isCategoryIndeterminate(category.id)"
              />
              <button class="expand-btn" :class="{ expanded: category.isExpanded }">
                ▼
              </button>
            </div>
          </div>

          <div v-if="category.isExpanded" class="category-items">
            <div 
              v-for="item in category.items" 
              :key="item.id" 
              class="item-row"
              :class="{ disabled: !item.canBeRemoved }"
            >
              <input 
                type="checkbox" 
                :checked="item.isSelected"
                @change="toggleItemSelection(item.id)"
                :disabled="!item.canBeRemoved"
              />
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-description">{{ item.description }}</span>
                <span class="item-size">{{ formatSize(item.size) }}</span>
              </div>
              <span v-if="item.isRequired" class="required-badge">Required</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="summary-section">
        <h3>Uninstall Summary</h3>
        <div class="summary-stats">
          <div class="stat">
            <span class="label">Selected Items:</span>
            <span class="value">{{ summary.selectedItems }} / {{ summary.totalItems }}</span>
          </div>
          <div class="stat">
            <span class="label">Total Size:</span>
            <span class="value">{{ formatSize(summary.totalSize) }}</span>
          </div>
          <div class="stat">
            <span class="label">Estimated Time:</span>
            <span class="value">{{ summary.estimatedTime }}s</span>
          </div>
        </div>
      </div>

      <!-- Advanced Options -->
      <div class="advanced-options">
        <h3>Advanced Options</h3>
        <div class="option-row">
          <input 
            type="checkbox" 
            id="skipConfirmation"
            v-model="options.skipConfirmation"
          />
          <label for="skipConfirmation">Skip confirmation dialogs</label>
        </div>
        <div class="option-row">
          <input 
            type="checkbox" 
            id="forceUninstall"
            v-model="options.forceUninstall"
          />
          <label for="forceUninstall">Force uninstall (ignore errors)</label>
        </div>
      </div>
    </div>

    <div class="dialog-actions">
      <button @click="onCancel" class="btn-secondary">Cancel</button>
      <button @click="onSelectAll" class="btn-secondary">Select All</button>
      <button @click="onDeselectAll" class="btn-secondary">Deselect All</button>
      <button @click="onConfirm" class="btn-primary" :disabled="!hasSelectedItems">
        Confirm Uninstall
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { UninstallCategory, UninstallItem, UninstallOptions, UninstallSummary } from '../../types/uninstaller'

interface Props {
  initialOptions?: Partial<UninstallOptions>
}

interface Emits {
  (e: 'confirm', options: UninstallOptions, summary: UninstallSummary): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialOptions: () => ({})
})

const emit = defineEmits<Emits>()

// Reactive data
const categories = ref<UninstallCategory[]>([])
const options = ref<UninstallOptions>({
  removeApplication: true,
  removeShortcuts: true,
  removeRegistryEntries: true,
  removeUserData: false,
  removeCache: true,
  removeLogs: false,
  removeSettings: false,
  removeDatabaseFiles: false,
  removeTemporaryFiles: true,
  removeBackupFiles: false,
  skipConfirmation: false,
  forceUninstall: false,
  ...props.initialOptions
})

// Computed properties
const summary = computed<UninstallSummary>(() => {
  const selectedItems = categories.value
    .flatMap(cat => cat.items)
    .filter(item => item.isSelected).length

  const totalSize = categories.value
    .flatMap(cat => cat.items)
    .filter(item => item.isSelected)
    .reduce((sum, item) => sum + item.size, 0)

  return {
    totalItems: categories.value.flatMap(cat => cat.items).length,
    selectedItems,
    totalSize,
    estimatedTime: Math.ceil(totalSize / (1024 * 1024) * 0.1), // Rough estimate
    categories: categories.value
  }
})

const hasSelectedItems = computed(() => summary.value.selectedItems > 0)

// Methods
const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const toggleCategory = (categoryId: string) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  if (category) {
    category.isExpanded = !category.isExpanded
  }
}

const toggleCategorySelection = (categoryId: string) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  if (category) {
    const allSelected = category.items.every(item => item.isSelected)
    category.items.forEach(item => {
      if (item.canBeRemoved) {
        item.isSelected = !allSelected
      }
    })
  }
}

const toggleItemSelection = (itemId: string) => {
  const item = categories.value
    .flatMap(cat => cat.items)
    .find(item => item.id === itemId)
  
  if (item && item.canBeRemoved) {
    item.isSelected = !item.isSelected
  }
}

const isCategorySelected = (categoryId: string): boolean => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.items.every(item => item.isSelected) : false
}

const isCategoryIndeterminate = (categoryId: string): boolean => {
  const category = categories.value.find(cat => cat.id === categoryId)
  if (!category) return false
  
  const selectedCount = category.items.filter(item => item.isSelected).length
  return selectedCount > 0 && selectedCount < category.items.length
}

const onSelectAll = () => {
  categories.value.forEach(category => {
    category.items.forEach(item => {
      if (item.canBeRemoved) {
        item.isSelected = true
      }
    })
  })
}

const onDeselectAll = () => {
  categories.value.forEach(category => {
    category.items.forEach(item => {
      item.isSelected = false
    })
  })
}

const onConfirm = () => {
  emit('confirm', options.value, summary.value)
}

const onCancel = () => {
  emit('cancel')
}

// Initialize categories
onMounted(() => {
  // This would be populated with actual data from the uninstaller
  categories.value = [
    {
      id: 'application',
      name: 'Application Files',
      description: 'Core application executable and resources',
      totalSize: 0,
      isExpanded: true,
      items: [
        {
          id: 'app-exe',
          name: 'Social Marketing Application',
          description: 'Main application executable',
          category: 'application',
          size: 50 * 1024 * 1024, // 50MB
          path: '/Applications/Social Marketing.app',
          isRequired: true,
          isSelected: true,
          canBeRemoved: true
        }
      ]
    },
    {
      id: 'user-data',
      name: 'User Data',
      description: 'Your personal data and settings',
      totalSize: 0,
      isExpanded: false,
      items: [
        {
          id: 'user-settings',
          name: 'User Settings',
          description: 'Application preferences and configuration',
          category: 'user-data',
          size: 1024 * 1024, // 1MB
          path: '~/Library/Application Support/Social Marketing',
          isRequired: false,
          isSelected: false,
          canBeRemoved: true
        }
      ]
    }
  ]

  // Calculate total sizes
  categories.value.forEach(category => {
    category.totalSize = category.items.reduce((sum, item) => sum + item.size, 0)
  })
})
</script>

<style scoped>
.selective-uninstall-dialog {
  max-width: 800px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.dialog-header h2 {
  margin: 0 0 8px 0;
  color: #333;
}

.dialog-header p {
  margin: 0;
  color: #666;
}

.dialog-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.categories-section {
  margin-bottom: 20px;
}

.category-group {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  background-color: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.category-info h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #333;
}

.category-info p {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #666;
}

.size-info {
  font-size: 12px;
  color: #888;
}

.category-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.expand-btn {
  background: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  transition: transform 0.2s;
}

.expand-btn.expanded {
  transform: rotate(180deg);
}

.category-items {
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
}

.item-row {
  display: flex;
  align-items: center;
  padding: 8px 0;
  gap: 12px;
}

.item-row.disabled {
  opacity: 0.5;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-name {
  font-weight: 500;
  color: #333;
}

.item-description {
  font-size: 12px;
  color: #666;
}

.item-size {
  font-size: 11px;
  color: #888;
}

.required-badge {
  background-color: #ff6b6b;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
}

.summary-section {
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.summary-section h3 {
  margin: 0 0 12px 0;
  color: #333;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat .label {
  font-size: 14px;
  color: #666;
}

.stat .value {
  font-weight: 500;
  color: #333;
}

.advanced-options {
  margin-bottom: 20px;
}

.advanced-options h3 {
  margin: 0 0 12px 0;
  color: #333;
}

.option-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.option-row label {
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
}

.btn-primary, .btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}
</style> 