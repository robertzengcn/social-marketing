<template>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems">
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
          >
            mdi-delete
          </v-icon>
        </template>
    </v-data-table-server>
    
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { getExtramodulelist } from "@/views/api/extramodules"
import { ref,computed } from 'vue'
import { SearchResult } from '@/views/api/types'
import router from '@/views/router';
const {t} = useI18n({inheritLocale: true});

// const campaignId = i18n.t("campaignId");
type Fetchparam = {
    page: number,
    itemsPerPage: number,
    sortBy: string,
}

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchResult> {
        const fpage=(fetchparam.page-1)*fetchparam.itemsPerPage
        return await getExtramodulelist({ page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy})
    }
}
// export default {
// data: () => ({
// const langCampaign=${this.$t("welcomeMsg")}
const headers=ref<Array<any>>([])
headers.value = [
    {
        title: computed(_ => t("extramodule.extramoduleName")),
        align: 'start',
        sortable: false,
        key: 'name',
    },
    {
        title: computed(_ => t("extramodule.extramoduleDescription")),
        align: 'start',
        sortable: false,
        key: 'Description',
    },
    {
        title: computed(_ => t("extramodule.extramoduleStatus")),
        align: 'start',
        sortable: false,
        key: 'installed',
    },

    { title: computed(_ => t("common.actions")), key: 'actions', sortable: false },

];
const itemsPerPage = ref(10);
const serverItems = ref([]);
const loading = ref(false);
const totalItems = ref(0);
// const search = ref('');

function loadItems({ page, itemsPerPage, sortBy }) {
    loading.value = true
    // console.log(page);
    const fetchitem: Fetchparam = {
        page: page,
        itemsPerPage: itemsPerPage,
        sortBy: sortBy,
        // search: search.value
    }
    FakeAPI.fetch(fetchitem).then(
        ({ data, total }) => {
            // console.log(data)
            // console.log(total)
            //loop data
            for(let i=0; i<data.length; i++){
                if(data[i].Disable == 0){
                    data[i].Status = "enable"
                }else{
                    data[i].Status = "disable"    
                }
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
const editItem = (item) => {
 
    // else if(item.Types=="social task"){
        
    // }
    // router.push({
    //     path: '/graphics/oasis-engine',
    // });
};
const openfolder=(item)=>{
    // console.log(item)
    if(item.Types=="social task"){
        router.push({
            name: 'SocialtaskList',params: { id: item.CampaignId } 
        });
    }
}

</script>