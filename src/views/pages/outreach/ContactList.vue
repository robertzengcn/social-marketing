<template>
    <v-card>
        <v-card-title>{{ t('outreach.contact_list') }}</v-card-title>

        <v-card-text>
            <!-- Search and Filter -->
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="search"
                        :label="t('outreach.search_contacts')"
                        prepend-icon="mdi-magnify"
                        clearable
                        @click:clear="search = ''"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="filterTask"
                        :label="t('outreach.filter_by_task')"
                        :items="tasks"
                        item-title="name"
                        clearable
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-btn @click="exportContacts">
                        <v-icon left>mdi-export</v-icon>
                        {{ t('outreach.export_contacts') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>

        <!-- Contact List Table -->
        <v-data-table
            :headers="headers"
            :items="filteredContacts"
            :loading="loading"
            :search="search"
            item-key="id"
        >
            <template v-slot:item="{ item }">
                <tr>
                    <td>{{ item.email }}</td>
                    <td>{{ item.name || '-' }}</td>
                    <td>{{ item.website_url || '-' }}</td>
                    <td>
                        <v-chip :color="getStatusColor(item.status)" small>
                            {{ getStatusText(item.status) }}
                        </v-chip>
                    </td>
                    <td>{{ item.source_url }}</td>
                    <td>
                        <v-btn icon small @click="viewContact(item)">
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const search = ref('');
const filterTask = ref<number | null>(null);
const loading = ref(false);
const contacts = ref<any[]>([]);
const tasks = ref<any[]>([]);

const headers = computed(() => [
    { title: t('outreach.email'), key: 'email' },
    { title: t('outreach.name'), key: 'name' },
    { title: t('outreach.website'), key: 'website_url' },
    { title: t('outreach.source_url'), key: 'source_url' },
    { title: t('outreach.status'), key: 'status' },
    { title: t('common.actions'), key: 'actions', sortable: false }
]);

const filteredContacts = computed(() => {
    return contacts.value.filter(contact => {
        const matchesSearch = !search.value ||
            contact.email.toLowerCase().includes(search.value.toLowerCase()) ||
            (contact.name || '').toLowerCase().includes(search.value.toLowerCase());

        const matchesFilter = !filterTask.value || contact.task_id === filterTask.value;

        return matchesSearch && matchesFilter;
    });
});

async function loadContacts() {
    loading.value = true;
    try {
        // Load contacts for selected task
        const taskId = filterTask.value;
        const response = await window.api.outreach.listContacts({ taskId });

        if (response.success) {
            contacts.value = response.contacts;
        } else {
            console.error('Failed to load contacts:', response.error);
        }
    } catch (error) {
        console.error('Error loading contacts:', error);
    } finally {
        loading.value = false;
    }
}

function getStatusText(status: number): string {
    const statusMap: Record<number, string> = {
        0: t('outreach.pending'),
        1: t('outreach.message_generated'),
        2: t('outreach.sent'),
        3: t('outreach.failed')
    };
    return statusMap[status] || t('outreach.unknown');
}

function getStatusColor(status: number): string {
    const colorMap: Record<number, string> = {
        0: 'grey',
        1: 'blue',
        2: 'green',
        3: 'red'
    };
    return colorMap[status] || 'grey';
}

async function exportContacts() {
    // Export functionality
    console.log('Exporting contacts...');
}

function viewContact(contact: any) {
    console.log('View contact:', contact);
}

onMounted(async () => {
    await loadContacts();
});
</script>
