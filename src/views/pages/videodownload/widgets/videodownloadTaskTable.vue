<template>
    <div class="search_bar mt-4 d-flex jsb mb-5">
        <div class="d-flex jsb search_tool">
            <div class="search_wrap mr-4">
                <v-text-field rounded class="elevation-0" density="compact" variant="solo" label="Search"
                    append-inner-icon="mdi-magnify" single-line hide-details v-model="search"></v-text-field>
            </div>
            <!-- <v-btn class="btn" variant="flat" prepend-icon="mdi-filter-variant"><span> More</span></v-btn> -->
            <v-btn class="btn ml-3" variant="flat" prepend-icon="mdi-plus" color="#5865f2" @click="createDownload()">
                {{ $t('video.new_video_download') }}
            </v-btn>

        </div>
        <div>
        </div>
    </div>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name"
        @update:options="loadItems">
        <template v-slot:item.status="{ item }">
            <v-chip color="grey" v-if="item.status == '0'">{{ CapitalizeFirstLetter(t('common.not_start')) }}</v-chip>
            <v-chip color="blue" v-if="item.status == '1'">{{ CapitalizeFirstLetter(t('common.processing')) }}</v-chip>
            <v-chip color="green" v-if="item.status == '2'">{{ CapitalizeFirstLetter(t('common.complete')) }}</v-chip>
            <v-chip color="red" v-if="item.status == '3'">{{ CapitalizeFirstLetter(t('common.error')) }}</v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">

            <v-icon size="small" class="me-2" @click="openTasklist(item)">
                mdi-login
            </v-icon>
            <v-icon size="small" class="me-2" @click="openTasklist(item)">
                mdi-play_circle
            </v-icon>

        </template>
    </v-data-table-server>


</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, computed } from 'vue'
import { SearchResult } from '@/views/api/types'
import { getVideoTasklist } from "@/views/api/video";
import { VideoDownloadTaskEntity } from "@/entityTypes/videoType";
import router from '@/views/router';
const { t } = useI18n({ inheritLocale: true });
import { CapitalizeFirstLetter } from "@/views/utils/function"

type Fetchparam = {
    // id:number
    page: number,
    itemsPerPage: number,
    sortBy: { key: string, order: string },
    search: string
}

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchResult<VideoDownloadTaskEntity>> {
        // console.log(fetchparam.search)
        const fpage = (fetchparam.page - 1) * fetchparam.itemsPerPage
        const res = await getVideoTasklist({ page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy, search: fetchparam.search })
        console.log(res)
        return res
    }
}


const headers: Array<any> = [
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.id"))),
        align: 'start',
        sortable: false,
        key: 'id',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("video.task_name"))),
        align: 'start',
        sortable: false,
        key: 'taskName',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("video.platform"))),
        align: 'start',
        sortable: false,
        key: 'platform'
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("video.saved_path"))),
        align: 'start',
        sortable: false,
        key: 'savepath',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.record_time"))),
        align: 'start',
        sortable: false,
        key: 'record_time',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.status"))),
        align: 'start',
        sortable: false,
        key: 'status',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.actions"))),
        align: 'start',
        key: 'actions',
        sortable: false,
    },


];
const itemsPerPage = ref(10);
const serverItems = ref<Array<VideoDownloadTaskEntity>>([]);
const loading = ref(false);
const totalItems = ref(0);
const search = ref('');
const showDeleteModal = ref(false);
const deleteId = ref(0);
const alertext = ref("");


function loadItems({ page, itemsPerPage, sortBy }) {
    loading.value = true
    const fetchitem: Fetchparam = {
        // id:parseInt(campaignId),
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        search: search.value
    }
    FakeAPI.fetch(fetchitem).then(
        ({ data, total }) => {

            console.log(data)
            console.log(total)
            if (!data) {
                data = [];
            }
            serverItems.value = data
            totalItems.value = total
            loading.value = false
        }).catch(function (error) {
            console.error(error);
        })
}


// const cancelDelete=()=> {
//       showDeleteModal.value = false;
// }
//confirm delete account
const createDownload = () => {
    router.push({
        path: '/video/download'
    });
}

const openTasklist = (item: VideoDownloadTaskEntity) => {
    if (item.id) {
        router.push({
            name: "VideoList", params: { taskid: item.id }
        });
    }
};



</script>