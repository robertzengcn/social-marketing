<template>
    <div class="search_bar mt-4 d-flex jsb">
        <div class="d-flex jsb search_tool">
            <div class="search_wrap mr-4">
                <v-text-field rounded class="elevation-0" density="compact" variant="solo" label="Search sample"
                    append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
            </div>
            <v-btn class="btn" variant="flat" prepend-icon="mdi-filter-variant"><span> {{$t('common.more')}}</span></v-btn>
        </div>
        <!-- <div>
            <v-chip class="mx-2" closable color="pink"> Secondary </v-chip>
            <v-chip class="mx-2" closable color="secondary"> Label </v-chip>
            <v-chip class="mx-2"> Status </v-chip>
        </div> -->
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

        </template>
    </v-data-table-server>
    
    
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { listSearchresult } from '@/views/api/search'
import { ref,computed,onMounted,onUnmounted } from 'vue'
import { SearchResult } from '@/views/api/types'
// import type { VDataTable } from 'vuetify/lib/components/index.mjs'
import router from '@/views/router';
import {SearchtaskItem } from "@/entityTypes/searchControlType"
import {CapitalizeFirstLetter} from "@/views/utils/function"
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
let refreshInterval:ReturnType<typeof setInterval> | undefined;

headers.value = [
    {
        title: computed(_ => CapitalizeFirstLetter(t("searchtask.id"))),
        align: 'center',
        sortable: false,
        key: 'id',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("search.search_enginer_name"))),
        align: 'start',
        sortable: false,
        key: 'enginer_name',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("search.keyword"))),
        align: 'start',
        sortable: false,
        key: 'keywordline',
        // value: computed(value => value.join(', '))
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("searchresult.status"))),
        align: 'start',
        sortable: false,
        key: 'status',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("searchresult.record_time"))),
        align: 'start',
        sortable: false,
        key: 'record_time',
    },
    { title: 'Actions', key: 'actions', sortable: false },
];
const itemsPerPage = ref(10);
const serverItems = ref<Array<SearchtaskItem>>([]);
const loading = ref(false);
const totalItems = ref(0);
const search = ref('');
const startAutoRefresh = () => {
    refreshInterval = setInterval(function(){
        loadItems({ page: 1, itemsPerPage: 10, sortBy: "" });
    }, 5000); // Refresh every 5 seconds
}
const stopAutoRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval= undefined;
  }
};

function loadItems({ page=1, itemsPerPage=10, sortBy="" }) {
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
            name: 'Searchtaskdetail',params: { id: item.id } 
     });
}
onMounted(() => {
  
  startAutoRefresh();
});

onUnmounted(() => {
  stopAutoRefresh();
});

</script>