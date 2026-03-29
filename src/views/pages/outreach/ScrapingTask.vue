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

                <v-select
                    v-model="formData.scraper_type"
                    :items="scraperOptions"
                    :label="t('outreach.scraper_type')"
                    :hint="t('outreach.scraper_type_hint')"
                    persistent-hint
                    required
                    :rules="[requiredRule]"
                >
                    <template v-slot:item="{ item, props }">
                        <v-list-item v-bind="props">
                            <template v-slot:prepend>
                                <v-icon :icon="item.props.icon"></v-icon>
                            </template>
                        </v-list-item>
                    </template>
                    <template v-slot:selection="{ item }">
                        <v-chip size="small">
                            <v-icon start :icon="item.raw.icon"></v-icon>
                            {{ item.title }}
                        </v-chip>
                    </template>
                </v-select>

                <v-select
                    v-model="formData.account_id"
                    :items="accountOptions"
                    :label="t('outreach.select_account')"
                    :hint="t('outreach.select_account_hint')"
                    persistent-hint
                    clearable
                    :loading="accountsLoading"
                    :no-data-text="t('outreach.no_accounts_available')"
                >
                    <template v-slot:prepend>
                        <v-icon icon="mdi-account-key"></v-icon>
                    </template>
                </v-select>

                <v-alert
                    v-if="formData.scraper_type === 'linkedin'"
                    type="warning"
                    density="compact"
                    class="mb-4"
                >
                    {{ t('outreach.linkedin_warning') }}
                </v-alert>

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
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const formRef = ref<any>(null);
const formValid = ref(false);

const formData = reactive({
    name: '',
    target_urls: '',
    scraper_type: 'generic',
    account_id: null as number | null,
    options: {
        aggressive_mode: false,
        max_concurrency: 5,
        use_proxy: false,
        delay_ms: 1000,
        timeout: 30000
    }
});

// Account list for cookie-based authentication
const accounts = ref<Array<{ id: number; user: string; social_type: string }>>([]);
const accountsLoading = ref(false);

async function fetchAccounts() {
    accountsLoading.value = true;
    try {
        const response = await window.api.outreach.listAccounts();
        if (response.success) {
            accounts.value = response.accounts;
        }
    } catch (error) {
        console.error('Error fetching accounts:', error);
    } finally {
        accountsLoading.value = false;
    }
}

onMounted(() => {
    fetchAccounts();
});

const accountOptions = computed(() =>
    accounts.value.map((account) => ({
        title: `${account.user} (${account.social_type})`,
        value: account.id
    }))
);

// Available scraper types with their configurations
const scraperOptions = computed(() => [
    {
        title: t('outreach.scraper_generic'),
        value: 'generic',
        icon: 'mdi-web',
        description: t('outreach.scraper_generic_desc'),
        defaultOptions: {
            aggressive_mode: false,
            max_concurrency: 5,
            use_proxy: false,
            delay_ms: 1000,
            timeout: 30000
        }
    },
    {
        title: t('outreach.scraper_linkedin'),
        value: 'linkedin',
        icon: 'mdi-linkedin',
        description: t('outreach.scraper_linkedin_desc'),
        defaultOptions: {
            aggressive_mode: false,
            max_concurrency: 1,
            use_proxy: false,
            delay_ms: 2000,
            timeout: 30000
        }
    }
]);

const task = ref<any>(null);
const progress = ref<any>(null);
const loading = ref(false);

const requiredRule = (value: any) => !!value || t('common.fill_require_field');

// Update options when scraper type changes
function updateOptionsForScraper() {
    const selectedScraper = scraperOptions.value.find(s => s.value === formData.scraper_type);
    if (selectedScraper) {
        // Preserve user's proxy choice, update other options
        formData.options = {
            ...selectedScraper.defaultOptions,
            use_proxy: formData.options.use_proxy
        };
    }
}

async function createTask() {
    loading.value = true;

    try {
        const urls = formData.target_urls.split('\n').filter(url => url.trim()).map(url => url.trim());

        const response = await window.api.outreach.createScrapingTask({
            name: formData.name,
            description: '',
            targetUrls: urls,
            scraperType: formData.scraper_type,
            accountId: formData.account_id,
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
