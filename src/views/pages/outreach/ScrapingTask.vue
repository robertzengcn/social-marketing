<template>
    <v-card>
        <v-card-title>{{ t('outreach.scraping_task_title') }}</v-card-title>

        <v-card-text>
            <v-form ref="formRef" v-model="formValid">
                <v-text-field
                    v-model="formData.name"
                    :label="t('outreach.task_name')"
                    required
                    :rules="[requiredRule]"
                ></v-text-field>

                <v-textarea
                    v-model="formData.target_urls"
                    :label="t('outreach.target_urls')"
                    required
                    :rules="[requiredRule]"
                    rows="3"
                ></v-textarea>

                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-title>{{ t('outreach.options') }}</v-expansion-panel-title>
                        <v-card-text>
                            <v-checkbox
                                v-model="formData.options.aggressive_mode"
                                :label="t('outreach.aggressive_mode')"
                            ></v-checkbox>
                            <v-slider
                                v-model="formData.options.max_concurrency"
                                :label="t('outreach.max_concurrency')"
                                min="1"
                                max="10"
                            ></v-slider>
                            <v-checkbox
                                v-model="formData.options.use_proxy"
                                :label="t('outreach.use_proxy')"
                            ></v-checkbox>
                        </v-card-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-btn
                color="primary"
                @click="createTask"
                :loading="loading"
            >
                {{ t('outreach.create_scraping_task') }}
            </v-btn>
        </v-card-actions>

        <!-- Progress Display -->
        <v-progress-linear
            v-if="task && task.status === 1"
            :value="progress"
            color="primary"
        ></v-progress-linear>

        <v-card v-if="task" class="mt-4">
            <v-card-title>{{ t('outreach.scraping_status') }}</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col>{{ t('outreach.pages_processed') }}: {{ progress.pages_processed || 0 }} / {{ progress.total_urls || 0 }}</v-col>
                    <v-col>{{ t('outreach.contacts_found') }}: {{ progress.contacts_found || 0 }}</v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const formRef = ref<any>(null);
const formValid = ref(false);

const formData = reactive({
    name: '',
    target_urls: '',
    options: {
        aggressive_mode: false,
        max_concurrency: 5,
        use_proxy: false
    }
});

const task = ref<any>(null);
const progress = ref<any>(null);
const loading = ref(false);

const requiredRule = (value: any) => !!value || t('common.fill_require_field');

async function createTask() {
    loading.value = true;

    try {
        const urls = formData.target_urls.split('\n').filter(url => url.trim()).map(url => url.trim());

        const response = await window.api.outreach.createScrapingTask({
            name: formData.name,
            description: '',
            targetUrls: urls,
            options: formData.options
        });

        if (response.success) {
            task.value = response;
            // Listen to progress
            window.api.outreach.onScrapingProgress((progressData: any) => {
                progress.value = progressData;
            });
        } else {
            console.error('Failed to create task:', response.error);
        }
    } catch (error) {
        console.error('Error creating task:', error);
    } finally {
        loading.value = false;
    }
}
</script>
