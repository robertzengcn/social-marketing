<template>
    <div class="search_bar mt-4 d-flex jsb">
        <div class="d-flex jsb search_tool">
            <div class="search_wrap mr-4">
                <v-text-field rounded class="elevation-0" density="compact" variant="solo" label="Search"
                    append-inner-icon="mdi-magnify" single-line hide-details v-model="search"></v-text-field>
            </div>
            <!-- <v-btn class="btn" variant="flat" prepend-icon="mdi-filter-variant"><span> More</span></v-btn> -->
            <v-btn class="btn ml-3" variant="flat" prepend-icon="mdi-plus" color="#5865f2" @click="createProxy()">
                Create Proxy
            </v-btn>
            
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
            @click="editProxy(item)"
          >
          mdi-pencil
          </v-icon>
          <v-icon
            size="small" 
            @click="deleteProxybtn(item)"
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
            text="The proxy will be delete"
            title="Confirm to delete proxy"
          >
            <template v-slot:actions>
                <v-btn
                class="ms-auto"
                text="Ok"
                color="secondary"
                @click="confirmrmProxy"
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
    <div>
     
        <!-- Define the alert dialog component -->
        <v-dialog v-model="showDialog" max-width="500px">
            <v-alert
            color="pink"
            dark
            border="top"
            icon="mdi-home"
            transition="slide-y-transition"
            >
            {{alertext}}
   </v-alert>
        </v-dialog>
    </div>


</template>

<script setup lang="ts">
import { getProxyList,deleteProxy} from '@/views/api/proxy'
import { ref } from 'vue'
import { SearchResult } from '@/views/api/types'
// import { useRoute } from "vue-router";
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
    { title: 'Actions', key: 'actions', sortable: false },

];
const itemsPerPage = ref(10);
const serverItems = ref([]);
const loading = ref(false);
const totalItems = ref(0);
const search = ref('');
// const $route = useRoute();
const showDeleteModal = ref(false);
const deleteId=ref(0);
const showDialog= ref(false);
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
            //  console.log(data)
            //  console.log(total)
            //loop data
            // for(let i=0; i<data.length; i++){
            //     if(data[i].Disable == 0){
            //         data[i].Status = "enable"
            //     }else{
            //         data[i].Status = "disable"    
            //     }
            // }
            console.log(data)
            console.log(total)
            serverItems.value = data
            totalItems.value = total
            loading.value = false
        }).catch(function (error) {
            console.error(error);
        })
}

const editProxy=(item)=>{
    router.push({
            name: 'editProxy',params: { id: item.id } 
        });
}
const deleteProxybtn=(item)=>{
    showDeleteModal.value = true;
    deleteId.value=item.id;
}
// const cancelDelete=()=> {
//       showDeleteModal.value = false;
// }
//confirm delete account
const confirmrmProxy=()=>{
    // console.log("delete account")
    deleteProxy(deleteId.value).then(
        () => {
            // console.log(res)
            showDeleteModal.value = false;
            loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: '' })
        }).catch(function (error) {
            console.error(error);
            alertext.value=error.message;
        })
        // loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: '' })
}
const createProxy=()=>{
    router.push({
            name: 'AddProxy' 
        });
}




</script>