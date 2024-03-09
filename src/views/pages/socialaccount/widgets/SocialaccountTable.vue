<template>
    <div class="search_bar mt-4 d-flex jsb">
        <div class="d-flex jsb search_tool">
            <div class="search_wrap mr-4">
                <v-text-field rounded class="elevation-0" density="compact" variant="solo" label="Search sample"
                    append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
            </div>
            <v-btn class="btn" variant="flat" prepend-icon="mdi-filter-variant"><span> More</span></v-btn>
        </div>
        <div>       
        </div>
    </div>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems">
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
            size="small"
            class="me-2"
            @click="editAccount(item)"
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
import { getSocialAccountlist } from '@/views/api/socialaccount'
import { ref } from 'vue'
import { SearchResult } from '@/views/api/types'
import { useRoute } from "vue-router";
import router from '@/views/router';
type Fetchparam = {
    // id:number
    page: number,
    itemsPerPage: number,
    sortBy: string,
    search: string
}

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchResult> {
        const fpage=(fetchparam.page-1)*fetchparam.itemsPerPage
        return await getSocialAccountlist({ page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy, search: fetchparam.search })
    }
}
// export default {
// data: () => ({

const headers: Array<any> = [
    {
        title: 'Id',
        align: 'start',
        sortable: false,
        key: 'id',
    },
    {
        title: 'Type',
        align: 'start',
        sortable: false,
        key: 'social_type',
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
    { title: 'Actions', key: 'actions', sortable: false },

];
const itemsPerPage = ref(10);
const serverItems = ref([]);
const loading = ref(false);
const totalItems = ref(0);
const search = ref('');
const $route = useRoute();
// const campaignId=$route.params.id.toString();
// console.log(campaignId)
// }),
// watch: {
//     name() {
//         this.search = String(Date.now())
//     },
// },
// methods: {
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
            //  console.log(data)
            //  console.log(total)
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
// const editItem = (item) => {
//     // router.push({
//     //     path: '/graphics/oasis-engine',
//     // });
// };
// const runtask=(item)=>{
//     console.log("run task")
//     console.log("item id is "+item.id)
//     const routeData = router.resolve({name: 'Runtask', params: {id: item.id}});
//     console.log(routeData.href)
//     window.open(routeData.href, '_blank')
// }
const editAccount=(item)=>{
    // router.push({
    //     path: '/graphics/oasis-engine',
    // });
    router.push({
            name: 'EditSocialtask',params: { id: item.id } 
        });
}
const createAccount=(campaignId:string)=>{
    router.push({
            name: 'CreateSocialtask',params: { campaignId: campaignId } 
        });
}
//open task run list page
// const checkLog=(item)=>{
//     const routeData = router.resolve({name: 'Task-run-list', params: {id: item.id}});
//     window.open(routeData.href, '_blank')
// }

</script>