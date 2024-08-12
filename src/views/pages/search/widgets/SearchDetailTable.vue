<template>
    <div class="search_bar mt-4 d-flex jsb">
        <div class="d-flex jsb search_tool">
            <div class="search_wrap mr-4">
                <v-text-field rounded class="elevation-0" density="compact" variant="solo" label="Search sample"
                    append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
            </div>
            <v-btn class="btn" variant="flat" prepend-icon="mdi-filter-variant"><span> {{$t('common.more')}}</span></v-btn>
        </div>     
    </div>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems">
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
import { listSearchresult } from '@/views/api/search'
import { ref,computed } from 'vue'
import { SearchResult } from '@/views/api/types'
// import type { VDataTable } from 'vuetify/lib/components/index.mjs'
import router from '@/views/router';
import { SearchtaskdbEntity,SearchtaskItem } from "@/entityTypes/searchControlType"
const {t} = useI18n({inheritLocale: true});

// const campaignId = i18n.t("campaignId");
type Fetchparam = {
    page: number,
    itemsPerPage: number,
    sortBy: string,
    search: string
}

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchResult<SearchtaskItem>> {
        const fpage=(fetchparam.page-1)*fetchparam.itemsPerPage
        return await listSearchresult({ page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy, search: fetchparam.search })
    }
}

const headers=ref<Array<any>>([])
headers.value = [
    {
        title: computed(_ => t("searchresult.id")),
        align: 'start',
        sortable: false,
        key: 'id',
    },
    {
        title: computed(_ => t("search.search_enginer_name")),
        align: 'start',
        sortable: false,
        key: 'enginer_name',
    },
    {
        title: computed(_ => t("search.keyword")),
        align: 'start',
        sortable: false,
        key: 'keywordline',
        // value: computed(value => value.join(', '))
    },
    {
        title: computed(_ => t("searchresult.status")),
        align: 'start',
        sortable: false,
        key: 'status',
    },
    {
        title: computed(_ => t("searchresult.record_time")),
        align: 'start',
        sortable: false,
        key: 'record_time',
    },

];
const itemsPerPage = ref(10);
const serverItems = ref<Array<SearchtaskItem>>([]);
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
 
};
const openfolder=(item)=>{
    // console.log(item)
    
}

</script>