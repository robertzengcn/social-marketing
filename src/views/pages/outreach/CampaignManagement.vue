<template>
    <v-card>
        <v-card-title>{{ t('outreach.campaign_management') }}</v-card-title>

        <v-card-text>
            <!-- Create Campaign -->
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="newCampaign.name"
                        :label="t('outreach.campaign_name')"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-btn
                        color="primary"
                        @click="createCampaign"
                        :disabled="!newCampaign.name || selectedContacts.length === 0"
                    >
                        <v-icon left>mdi-plus</v-icon>
                        {{ t('outreach.create_campaign') }}
                    </v-btn>
                </v-col>
            </v-row>

            <!-- Campaign List -->
            <v-data-table
                :headers="campaignHeaders"
                :items="campaigns"
                :loading="loading"
                item-key="id"
            >
                <template v-slot:item="{ item }">
                    <tr>
                        <td>{{ item.name }}</td>
                        <td>
                            <v-chip :color="getStatusColor(item.status)" small>
                                {{ getStatusText(item.status) }}
                            </v-chip>
                        </td>
                        <td>{{ item.total_contacts }}</td>
                        <td>{{ item.sent_count }}</td>
                        <td>{{ item.failed_count }}</td>
                        <td>
                            {{ item.success_rate ? item.success_rate.toFixed(1) + '%' : '-' }}
                        </td>
                        <td>
                            <v-btn
                                icon
                                small
                                @click="sendCampaign(item.id)"
                                :loading="sendingCampaigns.includes(item.id)"
                                :disabled="item.status === 1"
                            >
                                <v-icon>mdi-send</v-icon>
                            </v-btn>
                            <v-btn icon small @click="viewCampaignDetails(item.id)">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>

        <!-- Campaign Details Dialog -->
        <v-dialog v-model="campaignDialog" max-width="1000px">
            <v-card>
                <v-card-title>{{ t('outreach.campaign_details') }}</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>{{ t('outreach.total_contacts') }}: {{ selectedCampaign?.total_contacts || 0 }}</v-col>
                        <v-col>{{ t('outreach.sent_count') }}: {{ selectedCampaign?.sent_count || 0 }}</v-col>
                        <v-col>{{ t('outreach.failed_count') }}: {{ selectedCampaign?.failed_count || 0 }}</v-col>
                        <v-col>
                            {{ t('outreach.success_rate') }}:
                            {{ selectedCampaign?.success_rate ? selectedCampaign.success_rate.toFixed(1) + '%' : '-' }}
                        </v-col>
                    </v-row>

                    <!-- Contact Statistics -->
                    <v-data-table
                        :headers="contactStatsHeaders"
                        :items="campaignContacts"
                        :loading="loadingContacts"
                        item-key="id"
                        class="mt-4"
                    >
                        <template v-slot:item="{ item }">
                            <tr>
                                <td>{{ item.email }}</td>
                                <td>{{ item.name || '-' }}</td>
                                <td>
                                    <v-chip :color="getContactStatusColor(item.status)" small>
                                        {{ getContactStatusText(item.status) }}
                                    </v-chip>
                                </td>
                                <td>{{ item.source_url }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="campaignDialog = false">
                        {{ t('common.close') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const newCampaign = ref({ name: '' });
const selectedContacts = ref<number[]>([]);
const campaigns = ref<any[]>([]);
const loading = ref(false);
const campaignDialog = ref(false);
const selectedCampaign = ref<any>(null);
const campaignContacts = ref<any[]>([]);
const loadingContacts = ref(false);
const sendingCampaigns = ref<number[]>([]);

const campaignHeaders = computed(() => [
    { title: t('outreach.campaign_name'), key: 'name' },
    { title: t('outreach.campaign_status'), key: 'status' },
    { title: t('outreach.total_contacts'), key: 'total_contacts' },
    { title: t('outreach.sent_count'), key: 'sent_count' },
    { title: t('outreach.failed_count'), key: 'failed_count' },
    { title: t('outreach.success_rate'), key: 'success_rate' },
    { title: t('common.actions'), key: 'actions', sortable: false }
]);

const contactStatsHeaders = computed(() => [
    { title: t('outreach.email'), key: 'email' },
    { title: t('outreach.name'), key: 'name' },
    { title: t('outreach.status'), key: 'status' },
    { title: t('outreach.source_url'), key: 'source_url' }
]);

async function createCampaign() {
    if (!newCampaign.value.name || selectedContacts.value.length === 0) return;

    try {
        const response = await window.api.outreach.createCampaign({
            name: newCampaign.value.name,
            contactIds: selectedContacts.value
        });

        if (response.success) {
            newCampaign.value = { name: '' };
            selectedContacts.value = [];
            await loadCampaigns();
        } else {
            console.error('Failed to create campaign:', response.error);
        }
    } catch (error) {
        console.error('Error creating campaign:', error);
    }
}

async function loadCampaigns() {
    loading.value = true;
    try {
        const response = await window.api.outreach.listCampaigns({});
        if (response.success) {
            campaigns.value = response.campaigns;
        }
    } catch (error) {
        console.error('Error loading campaigns:', error);
    } finally {
        loading.value = false;
    }
}

async function sendCampaign(campaignId: number) {
    sendingCampaigns.value = [...sendingCampaigns.value, campaignId];
    try {
        const response = await window.api.outreach.sendCampaign({ campaignId });
        if (response.success) {
            await loadCampaigns();
        } else {
            console.error('Failed to send campaign:', response.error);
        }
    } catch (error) {
        console.error('Error sending campaign:', error);
    } finally {
        sendingCampaigns.value = sendingCampaigns.value.filter(id => id !== campaignId);
    }
}

async function viewCampaignDetails(campaignId: number) {
    const campaign = campaigns.value.find(c => c.id === campaignId);
    if (!campaign) return;

    selectedCampaign.value = campaign;
    campaignDialog.value = true;

    // Load campaign contacts
    loadingContacts.value = true;
    try {
        const response = await window.api.outreach.listContacts({ campaignId });
        if (response.success) {
            campaignContacts.value = response.contacts;
        }
    } catch (error) {
        console.error('Error loading campaign contacts:', error);
    } finally {
        loadingContacts.value = false;
    }
}

function getStatusText(status: number): string {
    const statusMap: {
        0: t('outreach.status_preparing'),
        1: t('outreach.status_sending'),
        2: t('outreach.status_completed'),
        3: t('outreach.status_failed')
    };
    return statusMap[status] || t('outreach.unknown');
}

function getStatusColor(status: number): string {
    const colorMap: {
        0: 'blue',
        1: 'orange',
        2: 'green',
        3: 'red'
    };
    return colorMap[status] || 'grey';
}

function getContactStatusText(status: number): string {
    const statusMap: {
        0: t('outreach.pending'),
        1: t('outreach.message_generated'),
        2: t('outreach.sent'),
        3: t('outreach.failed')
    };
    return statusMap[status] || t('outreach.unknown');
}

function getContactStatusColor(status: number): string {
    const colorMap: {
        0: 'grey',
        1: 'blue',
        2: 'green',
        3: 'red'
    };
    return colorMap[status] || 'grey';
}

onMounted(async () => {
    await loadCampaigns();
});
</script>
