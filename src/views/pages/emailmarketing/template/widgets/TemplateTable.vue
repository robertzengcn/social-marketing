<template>

    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems" class="custom-data-table">  
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
            size="small"
            class="me-2"
            @click="editItem(item)"
          >
          mdi-pencil
          </v-icon>
          <v-icon
            size="small" 
            @click="deleteItembtn(item)"
          >
            mdi-delete
          </v-icon>
          
          
        </template>  
    </v-data-table-server>
    
     <!-- Delete Confirmation Modal -->
     <v-dialog v-model="showDeleteModal" width="auto">
      <v-card
      max-width="400"
      prepend-icon="mdi-update"
      :text="$t('emailmarketing.email_template_deleted')"
      :title="$t('emailmarketing.confirm_delete_email_template')"
    >
      <template v-slot:actions>
          <v-btn
          class="ms-auto"
          text="Ok"
          color="secondary"
          @click="confirmrmItem"
          > 
          </v-btn>
        <v-btn
          class="ms-auto"
          text="Cancel"
          @click="showDeleteModal = false"
        ></v-btn>

      </template>
    </v-card>
  </v-dialog>
    
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

type Header = {
    title: string | ReturnType<typeof computed>;
    align: string;
    sortable: boolean;
    key: string;
    width: string;
};

const headers = ref<Array<Header>>([]);
let refreshInterval:ReturnType<typeof setInterval> | undefined;

headers.value = [
    {
        title: computed(_ => CapitalizeFirstLetter(t("emailmarketing.index"))),
        align: 'center',
        sortable: true,
        key: 'Index',
        width: '5%'
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("emailmarketing.title"))),
        align: 'center',
        sortable: false,
        key: 'TplTitle',
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
        key: 'TplRecord',
        width: '10%'
    },
    { title: 'Actions', 
    align: 'start',
    key: 'actions', 
    sortable: false,
    width: '10%'
 },
];
const itemsPerPage = ref(10);
const serverItems = ref<Array<EmailTemplateRespdata>>([]);
const loading = ref(false);
const showDeleteModal = ref(false);
const deleteId=ref(0);
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
            // data.map((item, index) => {
            //     item.Index = index + 1
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
const editItem=(item:EmailTemplateRespdata)=>{
    router.push({
            name: 'Email_Marketing_Template_Detail',params: { id: item.TplId } 
        });
}
const deleteItembtn=(item:EmailTemplateRespdata)=>{
    showDeleteModal.value = true;
    if(item.TplId){
        deleteId.value=item.TplId;
    }
    // deleteId.value=item.TplId;
}
const confirmrmItem=()=>{
    // console.log("delete account")
    // deleteItem(deleteId.value).then(
    //     () => {
    //         // console.log(res)
    //         showDeleteModal.value = false;
    //     }).catch(function (error) {
    //         console.error(error);
    //     })
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