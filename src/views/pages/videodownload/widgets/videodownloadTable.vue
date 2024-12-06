<template>
    <div class="search_bar mt-4 d-flex jsb mb-5">
        <div class="d-flex jsb search_tool">
            <div class="search_wrap mr-4">
                <v-text-field rounded class="elevation-0" density="compact" variant="solo" label="Search"
                    append-inner-icon="mdi-magnify" single-line hide-details v-model="search"></v-text-field>
            </div>
            <!-- <v-btn class="btn" variant="flat" prepend-icon="mdi-filter-variant"><span> More</span></v-btn> -->
            <v-btn class="btn ml-3" variant="flat" prepend-icon="mdi-plus" color="#5865f2" @click="createDownload()">
                {{$t('video.new_video_download')}}
            </v-btn>
            
        </div>
        <div>       
        </div>
    </div>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems">
    </v-data-table-server>


</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { ref } from 'vue'
import { SearchResult } from '@/views/api/types'
import {getVideolist} from "@/views/api/video";
import {videoDownloadEntity} from "@/entityTypes/videoType";
import router from '@/views/router';
const {t} = useI18n({inheritLocale: true});
type Fetchparam = {
    // id:number
    page: number,
    itemsPerPage: number,
    sortBy: { key: string, order: string },
    search: string
}

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchResult<videoDownloadEntity>> {
        // console.log(fetchparam.search)
        const fpage=(fetchparam.page-1)*fetchparam.itemsPerPage
        const res=await getVideolist({ page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy, search: fetchparam.search })
        console.log(res)
        return res
    }
}


const headers: Array<any> = [
    {
        title: 'Id',
        align: 'start',
        sortable: false,
        key: 'id',
    },
    {
        title: 'Url',
        align: 'start',
        sortable: false,
        key: 'url',
    },
    {
        title: 'Save Path',
        align: 'start',
        sortable: false,
        key: 'savepath',
    },
    {
        title: 'Status',
        align: 'start',
        sortable: false,
        key: 'status',
    },
    {
        title: 'Log',
        align: 'start',
        sortable: false,
        key: 'log',
    },
   

];
const itemsPerPage = ref(10);
const serverItems = ref<Array<videoDownloadEntity>>([]);
const loading = ref(false);
const totalItems = ref(0);
const search = ref('');
const showDeleteModal = ref(false);
const deleteId=ref(0);
const alertext=ref("");


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
            if(!data){
                data=[];
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
const createDownload=()=>{
    router.push({
          path: '/video/download'
        });
}




</script>