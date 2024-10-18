<template>
    <div class="search_bar mt-4 d-flex jsb">
        <div class="d-flex jsb search_tool">
            <div class="search_wrap mr-4">
                <v-text-field rounded class="elevation-0" density="compact" variant="solo" label="Search sample"
                    append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
            </div>
            
            <v-btn class="btn ml-3" variant="flat" prepend-icon="mdi-plus" color="#5865f2" @click="createFilter()">
                {{CapitalizeFirstLetter($t('emailfilter.create_filter'))}}
             </v-btn> 
        </div>
   
    </div>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems" class="mt-5">
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
            size="small"
            class="me-2"
            @click="openfolder(item)"
          >
            mdi-folder
          </v-icon>
            <v-icon
            size="small"
            class="me-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
           
          >
            mdi-delete
          </v-icon>
        </template>
    </v-data-table-server>
    

</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {EmailFilterdata} from "@/entityTypes/emailmarketinType"
import {getEmailfilterlist} from '@/views/api/emailfilter'
import { ref,computed } from 'vue'
import { SearchResult } from '@/views/api/types'
import {CapitalizeFirstLetter} from "@/views/utils/function"
// import type { VDataTable } from 'vuetify/lib/components/index.mjs'
import router from '@/views/router';
import {Header} from "@/entityTypes/commonType"
const {t} = useI18n({inheritLocale: true});

// const campaignId = i18n.t("campaignId");
type Fetchparam = {
    page: number,
    itemsPerPage: number,
    sortBy?: {key:string,order:string},
    search: string
}

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchResult<EmailFilterdata>> {
        const fpage=(fetchparam.page-1)*fetchparam.itemsPerPage
        return await getEmailfilterlist({ page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy, search: fetchparam.search })
    }
}

const headers=ref<Array<Header>>([])
headers.value = [
    {
        title: computed(_ => CapitalizeFirstLetter(t("emailfilter.id"))),
        align: 'start',
        sortable: false,
        key: 'id',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("emailfilter.name"))),
        align: 'start',
        sortable: false,
        key: 'name',
    },
   
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.created_time"))),
        align: 'start',
        sortable: false,
        key: 'created_time',
    },
    { title: computed(_ => CapitalizeFirstLetter(t("common.actions"))), key: 'actions', sortable: false },

];
const itemsPerPage = ref(10);
const serverItems = ref<Array<EmailFilterdata>>([]);
const loading = ref(false);
const totalItems = ref(0);
const search = ref('');

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
            
            serverItems.value = data
            totalItems.value = total
            loading.value = false
        }).catch(function (error) {
            console.error(error);
        })
}
// },
// }
const editItem = (item) => {
 
    // else if(item.Types=="social task"){
        
    // }
    router.push({
        name:"Email_Marketing_Filter_Detail",params: { id: item.id }
    });
};
const openfolder=(item)=>{
    // console.log(item)
    // if(item.Types=="social task"){
    //     router.push({
    //         name: 'SocialtaskList',params: { id: item.CampaignId } 
    //     });
    // }
}
function createFilter(){
    router.push({
        name: 'Email_Marketing_Filter_Create'
    });
}
</script>