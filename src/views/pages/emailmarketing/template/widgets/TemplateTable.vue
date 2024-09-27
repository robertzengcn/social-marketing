<template>

    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems" class="custom-data-table" show-expand>  
    </v-data-table-server>
    
    
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { getEmailtemplatelist } from '@/views/api/emailmarketing'
//import {SearchTaskItemdisplay} from '@/entityTypes/emailextraction-type'
import { ref,computed,onMounted,onUnmounted,reactive } from 'vue'
import { SearchResult } from '@/views/api/types'
// import type { VDataTable } from 'vuetify/lib/components/index.mjs'
import router from '@/views/router';
// import {SearchtaskItem } from "@/entityTypes/searchControlType"
import {CapitalizeFirstLetter} from "@/views/utils/function"
import {EmailsearchTaskEntityDisplay} from '@/entityTypes/emailextraction-type'
import {EmailTemplateRespdata} from "@/entityTypes/emailmarketinType"

const {t} = useI18n({inheritLocale: true});


const options = reactive({
      page: 1, // Initial page
      itemsPerPage: 10, // Items per page
    });

// const campaignId = i18n.t("campaignId");
type Fetchparam = {
    page: number,
    itemsPerPage: number,
    sortBy?: {key:string,order:string},
    search: string
}

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchResult<EmailTemplateRespdata>> {
        const fpage=(fetchparam.page-1)*fetchparam.itemsPerPage
        return await getEmailtemplatelist({ page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy, search: fetchparam.search })
    }
}

const headers=ref<Array<any>>([])
let refreshInterval:ReturnType<typeof setInterval> | undefined;

headers.value = [
    {
        title: computed(_ => CapitalizeFirstLetter(t("emailmarketing.id"))),
        align: 'center',
        sortable: true,
        key: 'id',
        width: '5%'
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("emailmarketing.title"))),
        align: 'center',
        sortable: false,
        key: 'tplTitle',
        width: '10%'
    },
    // {
    //     title: computed(_ => CapitalizeFirstLetter(t("emailextraction.url"))),
    //     align: 'start',
    //     sortable: false,
    //     key: 'url',
    //     // value: computed(value => value.join(', '))
    // },
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.record_time"))),
        align: 'start',
        sortable: false,
        key: 'record_time',
        width: '10%'
    },
    { title: 'Actions', 
    key: 'actions', 
    sortable: false,
    width: '10%'
 },
];
const itemsPerPage = ref(10);
const serverItems = ref<Array<EmailTemplateRespdata>>([]);
const loading = ref(false);

const totalItems = ref(0);
const search = ref('');
const startAutoRefresh = () => {
    refreshInterval = setInterval(function(){
        loadItems({ page: options.page, itemsPerPage: itemsPerPage.value, sortBy: "" });
    }, 10000); // Refresh every 5 seconds
}
const stopAutoRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval= undefined;
  }
};

function loadItems({ page=1, itemsPerPage=10, sortBy}) {
    options.page = page;
    loading.value = true
    console.log(sortBy)
    // console.log(page);
    
    const fetchitem: Fetchparam = {
        page: page,
        itemsPerPage: itemsPerPage,
       
        search: search.value
    }
    if(sortBy.length){
        console.log("sort have value")
        fetchitem.sortBy={key:sortBy[0].key,order:sortBy[0].order}

    }
//    console.log(fetchitem)
    FakeAPI.fetch(fetchitem).then(
        ({ data, total }) => {
             console.log(data)
            // console.log(total)
            // data.forEach((item) => {
            //     item.urlString=item.urls.join(',')
            // })
            serverItems.value = data
            totalItems.value = total
            loading.value = false
        }).catch(function (error) {
            console.error(error);
        })
}
// },
// }
// const editItem = (item) => {
 
    // else if(item.Types=="social task"){
        
    // }
    // router.push({
    //     path: '/graphics/oasis-engine',
    // });
// };
const openfolder=(item)=>{
    // console.log(item)
    router.push({
            name: 'Email_Extraction_Task_Detail',params: { id: item.id } 
     });
    }
const downloadErrorlog=(item)=>{
    // console.log(item)
    
        // const url = window.URL.createObjectURL(new Blob([res.data]));
        // const link = document.createElement('a');
        // link.href
   
}
onMounted(() => {
  
  startAutoRefresh();
});

onUnmounted(() => {
  stopAutoRefresh();
});

</script>
<style scoped>
.custom-data-table .v-data-table__wrapper tr {
  height: 50px; /* Set the desired row height */
}

.custom-data-table .v-data-table__wrapper td {
  height: 50px; /* Set the desired cell height */
}
.ellipsis-cell {
  height: calc(10 * 1.2em); /* 4 lines with a line height of 1.2em */
  line-height: 1.2em;  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%; /* Adjust the width as needed */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
}
</style>