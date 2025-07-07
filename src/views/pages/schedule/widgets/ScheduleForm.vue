<template>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <v-container fluid>
      <!-- Basic Information -->
      <v-row>
        <v-col cols="12">
          <h3 class="text-h6 mb-4">
            <v-icon class="mr-2">mdi-information</v-icon>
            Basic Information
          </h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.name"
            label="Schedule Name"
            required
            :rules="[rules.required]"
            placeholder="Enter a descriptive name for this schedule"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="formData.task_type"
            :items="taskTypeOptions"
            label="Task Type"
            required
            :rules="[rules.required]"
            @update:model-value="handleTaskTypeChange"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.task_id"
            label="Task ID"
            type="number"
            required
            :rules="[rules.required, rules.positive]"
            placeholder="Enter the ID of the task to schedule"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="formData.description"
            label="Description"
            rows="2"
            placeholder="Optional description of what this schedule does"
          />
        </v-col>
      </v-row>

      <!-- Trigger Configuration -->
      <v-row>
        <v-col cols="12">
          <h3 class="text-h6 mb-4">
            <v-icon class="mr-2">mdi-trigger</v-icon>
            Trigger Configuration
          </h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="formData.trigger_type"
            :items="triggerTypeOptions"
            label="Trigger Type"
            required
            :rules="[rules.required]"
            @update:model-value="handleTriggerTypeChange"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-switch
            v-model="formData.is_active"
            label="Active"
            color="success"
            hide-details
          />
        </v-col>
      </v-row>

      <!-- Cron Expression (for CRON trigger type) -->
      <v-row v-if="formData.trigger_type === 'cron'">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="formData.cron_expression"
            label="Cron Expression"
            required
            :rules="[rules.required, rules.cron]"
            placeholder="e.g., 0 0 * * * (daily at midnight)"
            :error-messages="cronValidationError"
            @update:model-value="validateCronExpression"
          />
        </v-col>
        <v-col cols="12" md="4" class="d-flex align-center">
          <CronExpressionBuilder @expression-change="handleCronExpressionChange" />
        </v-col>
      </v-row>

      <!-- Dependency Configuration (for DEPENDENCY trigger type) -->
      <v-row v-if="formData.trigger_type === 'dependency'">
        <v-col cols="12" md="6">
          <v-select
            v-model="formData.parent_schedule_id"
            :items="availableParentSchedules"
            label="Parent Schedule"
            required
            :rules="[rules.required]"
            item-title="name"
            item-value="id"
            placeholder="Select parent schedule"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="formData.dependency_condition"
            :items="dependencyConditionOptions"
            label="Dependency Condition"
            required
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>

      <v-row v-if="formData.trigger_type === 'dependency'">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.delay_minutes"
            label="Delay (minutes)"
            type="number"
            min="0"
            :rules="[rules.nonNegative]"
            placeholder="Delay after parent completes (optional)"
          />
        </v-col>
      </v-row>

      <!-- Next Run Preview -->
      <v-row v-if="formData.trigger_type === 'cron' && formData.cron_expression">
        <v-col cols="12">
          <v-alert
            type="info"
            variant="tonal"
            class="mb-4"
          >
            <template v-slot:prepend>
              <v-icon>mdi-clock</v-icon>
            </template>
            <div class="d-flex justify-space-between align-center">
              <span>Next run time: {{ nextRunTime }}</span>
              <v-btn
                size="small"
                variant="outlined"
                @click="calculateNextRunTime"
              >
                Refresh
              </v-btn>
            </div>
          </v-alert>
        </v-col>
      </v-row>

      <!-- Form Actions -->
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            color="secondary"
            variant="outlined"
            @click="$emit('cancel')"
            class="mr-2"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            type="submit"
            :loading="loading"
            :disabled="!isFormValid"
          >
            {{ isEdit ? 'Update' : 'Create' }} Schedule
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import CronExpressionBuilder from './CronExpressionBuilder.vue'
import { validateCronExpression as validateCron } from '@/views/api/schedule'
import { ScheduleCreateRequest, ScheduleUpdateRequest } from '@/entityTypes/schedule-type'
import { TaskType, ScheduleStatus, TriggerType, DependencyCondition } from '@/entity/ScheduleTask.entity'

const { t } = useI18n()

// Props
interface Props {
  schedule?: any
  isEdit?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false,
  loading: false
})

// Emits
const emit = defineEmits<{
  submit: [data: ScheduleCreateRequest | ScheduleUpdateRequest]
  cancel: []
}>()

// Form ref
const form = ref<HTMLFormElement>()

// Form data
const formData = ref<ScheduleCreateRequest>({
  name: '',
  description: '',
  task_type: TaskType.SEARCH,
  task_id: 0,
  cron_expression: '',
  is_active: true,
  trigger_type: TriggerType.CRON,
  parent_schedule_id: null,
  dependency_condition: null,
  delay_minutes: 0
})

// Validation
const cronValidationError = ref('')
const nextRunTime = ref('')

// Available parent schedules for dependency
const availableParentSchedules = ref<any[]>([])

// Validation rules
const rules = {
  required: (value: any) => !!value || 'This field is required',
  positive: (value: number) => value > 0 || 'Must be a positive number',
  nonNegative: (value: number) => value >= 0 || 'Must be non-negative',
  cron: (value: string) => {
    if (!value) return true
    return /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/.test(value) || 'Invalid cron expression'
  }
}

// Options for selects
const taskTypeOptions = [
  { title: 'Search Task', value: TaskType.SEARCH },
  { title: 'Email Marketing', value: TaskType.EMAIL_MARKETING },
  { title: 'Bulk Email', value: TaskType.BULK_EMAIL },
  { title: 'Video Download', value: TaskType.VIDEO_DOWNLOAD },
  { title: 'Social Task', value: TaskType.SOCIAL_TASK }
]

const triggerTypeOptions = [
  { title: 'Cron Schedule', value: TriggerType.CRON },
  { title: 'Dependency', value: TriggerType.DEPENDENCY },
  { title: 'Manual Only', value: TriggerType.MANUAL }
]

const dependencyConditionOptions = [
  { title: 'On Success', value: DependencyCondition.ON_SUCCESS },
  { title: 'On Completion', value: DependencyCondition.ON_COMPLETION },
  { title: 'On Failure', value: DependencyCondition.ON_FAILURE }
]

// Computed properties
const isFormValid = computed(() => {
  if (!form.value) return false
  
  const isValid = form.value.validate()
  
  // Additional validation for trigger types
  if (formData.value.trigger_type === TriggerType.CRON) {
    return isValid && !!formData.value.cron_expression && !cronValidationError.value
  }
  
  if (formData.value.trigger_type === TriggerType.DEPENDENCY) {
    return isValid && !!formData.value.parent_schedule_id && !!formData.value.dependency_condition
  }
  
  return isValid
})

// Methods
const handleTaskTypeChange = () => {
  // Reset task_id when task type changes
  formData.value.task_id = 0
}

const handleTriggerTypeChange = () => {
  // Reset trigger-specific fields when trigger type changes
  if (formData.value.trigger_type === TriggerType.CRON) {
    formData.value.cron_expression = ''
    formData.value.parent_schedule_id = null
    formData.value.dependency_condition = null
    formData.value.delay_minutes = 0
  } else if (formData.value.trigger_type === TriggerType.DEPENDENCY) {
    formData.value.cron_expression = ''
  } else {
    formData.value.cron_expression = ''
    formData.value.parent_schedule_id = null
    formData.value.dependency_condition = null
    formData.value.delay_minutes = 0
  }
}

const handleCronExpressionChange = (expression: string) => {
  formData.value.cron_expression = expression
  validateCronExpression()
}

const validateCronExpression = async () => {
  if (!formData.value.cron_expression) {
    cronValidationError.value = ''
    return
  }

  try {
    const result = await validateCron(formData.value.cron_expression)
    if (result.isValid) {
      cronValidationError.value = ''
      calculateNextRunTime()
    } else {
      cronValidationError.value = result.error || 'Invalid cron expression'
    }
  } catch (error) {
    cronValidationError.value = 'Failed to validate cron expression'
  }
}

const calculateNextRunTime = () => {
  if (formData.value.trigger_type === TriggerType.CRON && formData.value.cron_expression) {
    // This would typically call an API to calculate the next run time
    // For now, we'll show a placeholder
    nextRunTime.value = 'Calculating...'
    
    // Simulate API call
    setTimeout(() => {
      const now = new Date()
      now.setHours(now.getHours() + 1)
      nextRunTime.value = now.toLocaleString()
    }, 500)
  }
}

const loadParentSchedules = async () => {
  try {
    // This would load available parent schedules from the API
    // For now, we'll use placeholder data
    availableParentSchedules.value = [
      { id: 1, name: 'Daily Search Task' },
      { id: 2, name: 'Weekly Email Campaign' },
      { id: 3, name: 'Monthly Video Download' }
    ]
  } catch (error) {
    console.error('Failed to load parent schedules:', error)
  }
}

const handleSubmit = () => {
  if (!isFormValid.value) return

  const submitData = { ...formData.value }
  
  // Convert numeric fields
  submitData.task_id = Number(submitData.task_id)
  submitData.delay_minutes = Number(submitData.delay_minutes)
  
  // Convert nullable fields
  if (submitData.parent_schedule_id === '') {
    submitData.parent_schedule_id = null
  }
  if (submitData.dependency_condition === '') {
    submitData.dependency_condition = null
  }

  emit('submit', submitData)
}

const initializeForm = () => {
  if (props.schedule && props.isEdit) {
    formData.value = {
      name: props.schedule.name || '',
      description: props.schedule.description || '',
      task_type: props.schedule.task_type || TaskType.SEARCH,
      task_id: props.schedule.task_id || 0,
      cron_expression: props.schedule.cron_expression || '',
      is_active: props.schedule.is_active !== undefined ? props.schedule.is_active : true,
      trigger_type: props.schedule.trigger_type || TriggerType.CRON,
      parent_schedule_id: props.schedule.parent_schedule_id || null,
      dependency_condition: props.schedule.dependency_condition || null,
      delay_minutes: props.schedule.delay_minutes || 0
    }
  }
}

// Watchers
watch(() => formData.value.cron_expression, () => {
  if (formData.value.trigger_type === TriggerType.CRON) {
    validateCronExpression()
  }
})

// Lifecycle
onMounted(() => {
  initializeForm()
  loadParentSchedules()
})
</script>

<style scoped>
.v-form {
  max-width: 800px;
  margin: 0 auto;
}

.v-text-field,
.v-select,
.v-textarea {
  margin-bottom: 16px;
}
</style> 