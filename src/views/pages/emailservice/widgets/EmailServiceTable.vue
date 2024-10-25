<template>
    <div class="search_bar mt-4 d-flex jsb">
        <div class="d-flex jsb search_tool">
            <div class="search_wrap mr-4">
                <v-text-field rounded class="elevation-0" density="compact" variant="solo" label="Search sample"
                    append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
            </div>
            
            <v-btn class="btn ml-3" variant="flat" prepend-icon="mdi-plus" color="#5865f2" @click="createFilter()">
                {{CapitalizeFirstLetter($t('emailservice.create_service'))}}
             </v-btn> 
        </div>
   
    </div>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems" class="mt-5">
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
            @click="deleteitem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
    </v-data-table-server>
    <delete-dialog
      :dialog.sync="showDeleteModal"     
      @confirm-delete="handleDelete"
    ></delete-dialog>

</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {EmailServiceListdata} from "@/entityTypes/emailmarketingType"
import {getEmailServiceList,deleteEmailService} from '@/views/api/emailservice'
import { ref,computed } from 'vue'
import { SearchResult } from '@/views/api/types'
import {CapitalizeFirstLetter} from "@/views/utils/function"
// import type { VDataTable } from 'vuetify/lib/components/index.mjs'
import router from '@/views/router';
import {Header} from "@/entityTypes/commonType"
import DeleteDialog from '@/views/deleteDialog.vue';
const {t} = useI18n({inheritLocale: true});

// const campaignId = i18n.t("campaignId");
type Fetchparam = {
    page: number,
    itemsPerPage: number,
    sortBy?: {key:string,order:string},
    search: string
}

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchResult<EmailServiceListdata>> {
        const fpage=(fetchparam.page-1)*fetchparam.itemsPerPage
        return await getEmailServiceList({ page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy, search: fetchparam.search })
    }
}

const headers=ref<Array<Header>>([])
headers.value = [
    {
        title: computed(_ => CapitalizeFirstLetter(t("emailservice.id"))),
        align: 'start',
        sortable: false,
        key: 'id',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("emailservice.name"))),
        align: 'start',
        sortable: false,
        key: 'name',
    },
   
    {
        title: computed(_ => CapitalizeFirstLetter(t("emailservice.from"))),
        align: 'start',
        sortable: false,
        key: 'from',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.created_time"))),
        align: 'start',
        sortable: false,
        key: 'create_time',
    },
    { title: computed(_ => CapitalizeFirstLetter(t("common.actions"))), key: 'actions', sortable: false },

];
const itemsPerPage = ref(10);
const serverItems = ref<Array<EmailServiceListdata>>([]);
const loading = ref(false);
const totalItems = ref(0);
const search = ref('');
const showDeleteModal = ref(false);
const deleteId = ref(0);

function loadItems({ page, itemsPerPage, sortBy }) {
    loading.value = true
    // console.log(page);
    const fetchitem: Fetchparam = {
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        search: search.value
    }
    FakeAPI.fetch(fetchitem).then(
        ({ data, total }) => {
             console.log(data)
            // console.log(total)
            //loop data
            if(!data){
                data=[]
            }
            serverItems.value = data
            totalItems.value = total
            loading.value = false
        }).catch(function (error) {
            console.error(error);
        })
}
// },
// }
const editItem = (item:EmailServiceListdata) => {
 
    // else if(item.Types=="social task"){
        
    // }
    router.push({
        name:"Email_Marketing_Service_Detail",params: { id: item.id }
    });
};
const deleteitem=(item:EmailServiceListdata)=>{
    
  if (item.id) {
    deleteId.value = item.id;
  }  
  showDeleteModal.value = true;
}
const handleDelete=()=>{
    showDeleteModal.value = false;
    deleteEmailService(deleteId.value)
}
function createFilter(){
    router.push({
        name: 'Email_Marketing_Service_Create'
    });
}
</script>