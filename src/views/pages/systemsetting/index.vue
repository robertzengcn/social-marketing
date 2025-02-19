
<template>
  <v-container fluid>
    <v-row>
      <!-- Left Column: Tree Navigation -->
      <v-col cols="3">
        <v-card>
          <v-card-title>{{ $t('system_settings.title') }}</v-card-title>
          <v-card-text>
            <v-treeview
              :items="groupItems"
              activatable
              item-key="id"
              item-text="name"
              item-children="children"
              v-model:active="activeGroups"
              :open.sync="openGroups"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Right Column: Settings Detail -->
      <v-col cols="9">
        <v-card>
          <v-card-title v-if="selectedGroup">
            {{ selectedGroup.name }}
          </v-card-title>
          <v-card-text v-if="selectedGroup">
            <p>{{ selectedGroup.description }}</p>
            <v-list dense>
              <v-list-item
                v-for="setting in settingsByGroup(selectedGroup.id)"
                :key="setting.id"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ setting.key }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ setting.description || $t('system_settings.no_description') }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <!-- Determine the input component based on setting.type -->
                  <div v-if="setting.type === 'input'">
                    <v-text-field
                      :value="setting.value"
                      variant="outlined"
                      density="compact"
                      @change="updateSetting(setting.id, $event)"
                    >
                    </v-text-field>
                  </div>

                  <div v-else-if="setting.type === 'select'">
                    <v-select
                      :items="setting.options || []"
                      :value="setting.value"
                      variant="outlined"
                      density="compact"
                      @change="updateSetting(setting.id, $event)"
                    >
                    </v-select>
                  </div>

                  <div v-else-if="setting.type === 'radio'">
                    <v-radio-group
                      :model-value="setting.value"
                      @update:model-value="val => updateSetting(setting.id, val)"
                    >
                      <v-radio
                        v-for="(opt, idx) in setting.options || []"
                        :key="idx"
                        :label="opt"
                        :value="opt"
                      />
                    </v-radio-group>
                  </div>

                  <div v-else-if="setting.type === 'checkbox'">
                    <v-checkbox
                      :value="setting.value === 'true'"
                      :label="setting.label || setting.key"
                      
                    />
                  </div>

                  <!-- Default to text input if the type is unrecognized -->
                  <div v-else>
                    <v-text-field
                      :value="setting.value"
                      variant="outlined"
                      density="compact"
                      @change="updateSetting(setting.id, $event)"
                    ></v-text-field>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-text v-else>
            <v-alert type="info">
              {{ $t('system_settings.no_setting_item_found_exit') }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import {SystemSettingDisplay,SystemSettingGroupDisplay,OptionSettingDisplay} from "@/entityTypes/systemsettingType";
import {getSystemSettinglist} from "@/views/api/systemsetting";
// i18n setup
const { t } = useI18n();

// Store references for settings, groups, and tree state
const systemSettings = ref<SystemSettingDisplay[]>([]);
const settingGroups = ref<SystemSettingGroupDisplay[]>([]);

// For Vuetify's Treeview
const activeGroups = ref<number[]>([]);
const openGroups = ref<number[]>([]);

// Convert each group into a tree item.
// If you need deeper nesting, gather children by parentId, etc.
const groupItems = computed(() => {
  return settingGroups.value.map(group => ({
    id: group.id,
    name: group.name,
    description: group.description,
    children: []
  }));
});

// Derived property for the "currently selected" group
const selectedGroup = computed(() => {
  if (!activeGroups.value.length) return null;
  const groupId = activeGroups.value[0];
  return settingGroups.value.find(g => g.id === groupId) || null;
});

// Return settings belonging to the given group
function settingsByGroup(groupId: number): SystemSettingDisplay[] {
  return systemSettings.value.filter(setting => setting.group_id === groupId);
}

// Mock fetching settings and groups
async function fetchSettings() {
  await getSystemSettinglist().then((res)=>{
    console.log(res)
    settingGroups.value = res
  })
  // // Replace with real API / DB calls
  // settingGroups.value = [
  
  // ];
  // // Each setting now includes a "type" field and possible "options"
  // systemSettings.value = [];
}

// Updates a single setting
function updateSetting(settingId: number, e: Event | string) {
  let newValue: string;
  // If it's a string directly from radio update
  if (typeof e === 'string') {
    newValue = e;
  } else {
    newValue = (e.target as HTMLInputElement).value;
  }
  console.log(`Update setting #${settingId} to:`, newValue);
  // Make API call or update DB
}

onMounted(() => {
  fetchSettings();
});
</script>

<style scoped>
/* Adjust styling as desired */
</style>