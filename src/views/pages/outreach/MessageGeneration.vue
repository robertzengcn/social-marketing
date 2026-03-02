<template>
    <v-card>
        <v-card-title>{{ t('outreach.message_generation') }}</v-card-title>

        <v-card-text>
            <!-- Contact Selection -->
            <v-row>
                <v-col cols="12">
                    <v-select
                        v-model="selectedContactIds"
                        :label="t('outreach.select_contacts')"
                        :items="contacts"
                        item-title="email"
                        item-value="id"
                        multiple
                        chips
                        clearable
                        return-object
                    ></v-select>
                </v-col>
            </v-row>

            <!-- Template and Prompt -->
            <v-row class="mt-4">
                <v-col cols="12">
                    <v-textarea
                        v-model="template"
                        :label="t('outreach.message_template')"
                        rows="3"
                        placeholder="Hi {{name}}, I came across your website {{websiteUrl}}..."
                    ></v-textarea>
                </v-col>
            </v-row>

            <v-row class="mt-4">
                <v-col cols="12">
                    <v-textarea
                        v-model="customPrompt"
                        :label="t('outreach.custom_prompt')"
                        rows="2"
                    ></v-textarea>
                </v-col>
            </v-row>

            <!-- Tone and Length Options -->
            <v-row class="mt-4">
                <v-col cols="12" md="6">
                    <v-select
                        v-model="tone"
                        :label="t('outreach.tone')"
                        :items="tones"
                        item-title="text"
                        item-value="value"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select
                        v-model="length"
                        :label="t('outreach.message_length')"
                        :items="lengths"
                        item-title="text"
                        item-value="value"
                    ></v-select>
                </v-col>
            </v-row>

            <!-- Generate Button -->
            <v-row class="mt-4">
                <v-col>
                    <v-btn
                        color="primary"
                        @click="generateMessages"
                        :loading="generating"
                        :disabled="selectedContactIds.length === 0"
                    >
                        <v-icon left>mdi-robot</v-icon>
                        {{ t('outreach.generate_batch_messages') }}
                    </v-btn>
                </v-col>
            </v-row>

            <!-- Progress -->
            <v-row class="mt-4" v-if="generating">
                <v-col cols="12">
                    <v-progress-linear
                        :value="generationProgress"
                        color="primary"
                    ></v-progress-linear>
                    <p class="text-center mt-2">
                        {{ generatedCount }} / {{ selectedContactIds.length }} {{ t('outreach.messages_generated') }}
                    </p>
                </v-col>
            </v-row>
        </v-card-text>

        <!-- Generated Messages Table -->
        <v-data-table
            v-if="generatedMessages.length > 0"
            :headers="messageHeaders"
            :items="generatedMessages"
            item-key="id"
        >
            <template v-slot:item="{ item }">
                <tr>
                    <td>{{ item.email }}</td>
                    <td>{{ item.name || '-' }}</td>
                    <td>
                        <v-chip :color="item.reviewed ? 'green' : 'grey'" small>
                            {{ item.reviewed ? t('outreach.reviewed') : t('outreach.pending') }}
                        </v-chip>
                    </td>
                    <td>
                        <v-btn icon small @click="viewMessage(item)">
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                        <v-btn icon small @click="editMessage(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-card>

    <!-- Message View/Edit Dialog -->
    <v-dialog v-model="messageDialog" max-width="800px">
        <v-card>
            <v-card-title>{{ t('outreach.message_content') }}</v-card-title>
            <v-card-text>
                <v-textarea
                    v-model="editingMessage"
                    rows="15"
                ></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="messageDialog = false">
                    {{ t('common.cancel') }}
                </v-btn>
                <v-btn color="primary" @click="saveMessage">
                    {{ t('common.save') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const selectedContactIds = ref<number[]>([]);
const template = ref('');
const customPrompt = ref('');
const tone = ref('professional');
const length = ref('medium');
const generating = ref(false);
const generatedMessages = ref<any[]>([]);
const generatedCount = ref(0);
const messageDialog = ref(false);
const editingMessage = ref('');
const currentMessageId = ref<number | null>(null);

const contacts = ref<any[]>([]);

const tones = [
    { text: t('outreach.tone_professional'), value: 'professional' },
    { text: t('outreach.tone_casual'), value: 'casual' },
    { text: t('outreach.tone_friendly'), value: 'friendly' }
];

const lengths = [
    { text: t('outreach.length_short'), value: 'short' },
    { text: t('outreach.length_medium'), value: 'medium' },
    { text: t('outreach.length_long'), value: 'long' }
];

const messageHeaders = computed(() => [
    { title: t('outreach.email'), key: 'email' },
    { title: t('outreach.name'), key: 'name' },
    { title: t('outreach.reviewed'), key: 'reviewed' },
    { title: t('common.actions'), key: 'actions', sortable: false }
]);

const generationProgress = computed(() => {
    return selectedContactIds.value.length > 0
        ? (generatedCount.value / selectedContactIds.value.length) * 100
        : 0;
});

async function generateMessages() {
    if (selectedContactIds.value.length === 0) return;

    generating.value = true;
    generatedCount.value = 0;
    generatedMessages.value = [];

    try {
        const response = await window.api.outreach.generateBatchMessages({
            contactIds: selectedContactIds.value,
            template: template.value,
            customPrompt: customPrompt.value,
            tone: tone.value,
            length: length.value
        });

        if (response.success) {
            generatedMessages.value = response.results.map((r: any, idx: number) => ({
                id: idx,
                contactId: selectedContactIds.value[idx],
                ...r
            }));
            generatedCount.value = response.summary.succeeded;
        } else {
            console.error('Failed to generate messages:', response.error);
        }
    } catch (error) {
        console.error('Error generating messages:', error);
    } finally {
        generating.value = false;
    }
}

function viewMessage(message: any) {
    editingMessage.value = message.content;
    currentMessageId.value = message.id;
    messageDialog.value = true;
}

function editMessage(message: any) {
    editingMessage.value = message.content;
    currentMessageId.value = message.messageId;
    messageDialog.value = true;
}

async function saveMessage() {
    if (currentMessageId.value === null) return;

    try {
        await window.api.outreach.updateMessage({
            messageId: currentMessageId.value,
            content: editingMessage.value
        });

        messageDialog.value = false;

        // Refresh messages
        const msg = generatedMessages.value.find(m => m.messageId === currentMessageId.value);
        if (msg) {
            msg.content = editingMessage.value;
            msg.user_edited = true;
        }
    } catch (error) {
        console.error('Error saving message:', error);
    }
}

onMounted(async () => {
    // Load contacts
    const response = await window.api.outreach.listContacts({});
    if (response.success) {
        contacts.value = response.contacts;
    }
});
</script>
