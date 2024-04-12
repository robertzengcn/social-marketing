<template>
    
    <v-data-table-server v-model="selected" :search="search" :headers="headers" :items-per-page="itemsPerPage"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems" return-object show-select>
    </v-data-table-server>

</template>

<script setup lang="ts">
import { getProxyList} from "@/views/api/proxy"
import { ref,watch} from 'vue'
import { SearchProxyResp,ProxyListEntity } from "@/entity-types/proxy-type";


type Fetchparam = {
    // id:number
    page: number,
    itemsPerPage: number,
    sortBy: string,
    search: string
}

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchProxyResp> {
        // console.log(fetchparam.search)
        const fpage=(fetchparam.page-1)*fetchparam.itemsPerPage
        const res=await getProxyList({ page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy, search: fetchparam.search })
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
        title: 'Host',
        align: 'start',
        sortable: false,
        key: 'host',
    },
    {
        title: 'Port',
        align: 'start',
        sortable: false,
        key: 'port',
    },
    {
        title: 'User Name',
        align: 'start',
        sortable: false,
        key: 'user',
    },
    {
        title: 'Pass',
        align: 'start',
        sortable: false,
        key: 'pass',
    },
    {
        title: 'Protocol',
        align: 'start',
        sortable: false,
        key: 'protocol',
    },
    {
        title: 'Add time',
        align: 'start',
        sortable: false,
        key: 'addtime',
    },

];
const itemsPerPage = ref(10);
const serverItems = ref<ProxyListEntity[]>([]);
const loading = ref(false);
const totalItems = ref(0);
const search = ref('');
const selected=ref<ProxyListEntity[]>([]);

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
            
            // console.log(data)
            // console.log(total)
            serverItems.value = data
            totalItems.value = total
            loading.value = false
        }).catch(function (error) {
            console.error(error);
        })
}
const emit = defineEmits(['change'])
watch(selected, (newValue:ProxyListEntity[], oldValue:ProxyListEntity[]) => {
  console.log(`selectedProxy changed from ${oldValue} to ${newValue}`);
  emit('change', newValue);
});






</script>