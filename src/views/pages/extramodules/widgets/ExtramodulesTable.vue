<template>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems">
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn v-if="!item.installed" @click="openDialog(item,true)"  :loading="item.loading" loading-text="{{$t('common.installing')}}...">
                Install
              </v-btn> 
              <v-btn v-if="item.installed" @click="openDialog(item,false)" :loading="item.loading" loading-text="{{$t('common.uninstalling')}}...">
                Uninstall
              </v-btn> 
              
            <!-- <v-icon
            size="small"
            class="me-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon> -->
          
        </template>
    </v-data-table-server>

    <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">{{capitalizeFirstLetter($t('common.confirmation'))}}</v-card-title>
          <v-card-text>{{dialogtext}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" @click="dialog = false">{{capitalizeFirstLetter($t('common.cancel'))}}</v-btn>
            <v-btn color="green darken-1" @click="confirmAction">{{capitalizeFirstLetter($t('common.confirm'))}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { getExtramodulelist,installExtramodule,receiveInExtramoduleLog,removeExtramodule } from "@/views/api/extramodules"
import { ref,computed,onMounted } from 'vue'
import { SearchResult } from '@/views/api/types'
// import router from '@/views/router';
import {ExtraPipModule,ExtraPipModuleItem} from "@/entityTypes/extramodule-type"
const {t} = useI18n({inheritLocale: true});
import {capitalizeFirstLetter} from '@/views/utils/function'

// const campaignId = i18n.t("campaignId");
type Fetchparam = {
    page: number,
    itemsPerPage: number,
    sortBy: string,
}

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchResult<ExtraPipModule>> {
        const fpage=(fetchparam.page-1)*fetchparam.itemsPerPage
        return await getExtramodulelist({ page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy})
    }
}
const itemsPerPage = ref(10);
const serverItems = ref<Array<ExtraPipModuleItem>>([]);
const loading = ref(false);
const totalItems = ref(0);
// const search = ref('');
const dialog= ref(false);
const currentItem=ref<ExtraPipModuleItem>();
const dialogtext=ref("");
const headers=ref<Array<any>>([])
const dialogAction=ref('')
headers.value = [
    {
        title: computed(_ => t("extramodule.extramoduleName")),
        align: 'start',
        sortable: false,
        key: 'packagenameTr',
    },
    {
        title: computed(_ => t("extramodule.extramoduleDescription")),
        align: 'start',
        sortable: false,
        key: 'description',
    },
    {
        title: computed(_ => t("extramodule.extramoduleStatus")),
        align: 'start',
        sortable: false,
        key: 'installed',
    },

    { title: computed(_ => t("common.actions")), key: 'actions', sortable: false },

];

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
            const epi:Array<ExtraPipModuleItem>=[]
            //loop data
            for(let i=0; i<data.length; i++){
                const tranvarname="modules."+data[i].name+".name"
                const tranvardesc="modules."+data[i].name+".describe"
                
                console.log(t(tranvarname))
                let item:ExtraPipModuleItem={
                    name:data[i].name,
                    packagename:data[i].packagename,
                    packagenameTr:t(tranvarname),
                    description:t(tranvardesc),
                    installed:false,
                    version:data[i].version,
                }
               if(data[i].installed){
                     item.installed=true
               }
                epi.push(item)
            }
            serverItems.value = epi
            totalItems.value = total
            loading.value = false
        }).catch(function (error) {
            console.error(error);
        })
}
const openDialog=(item,install:boolean)=>{
    currentItem.value = item;
    dialog.value = true;
    const packagename=item.packagename
    console.log(packagename)
    if(install){
        dialogtext.value = t("extramodule.installConfirm", { package: packagename });
        dialogAction.value = "install"
    }else{
        dialogtext.value = t("extramodule.uninstallConfirm", { package: packagename});
        dialogAction.value = "uninstall"
    }    
}
const confirmAction=()=>{
    dialog.value = false;
    if(!currentItem.value){
        return
    }
    if(dialogAction.value === 'install') {
        installItem(currentItem.value);
      } else if (dialogAction.value === 'uninstall') {
        uninstallItem(currentItem.value)
      }
}
// const confirmInstall=()=> {
//       dialog.value = false;
//       if(currentItem.value){
//       installItem(currentItem.value);
//       }
// }
const installItem=(item:ExtraPipModuleItem)=>{
    item.loading=true
    installExtramodule(item.packagename)
   
}

const uninstallItem=(item:ExtraPipModuleItem)=>{
    item.loading=true 
    removeExtramodule(item.packagename)
    //reload table
    
}

onMounted(() => {
    receiveInExtramoduleLog((strobj)=>{
        const obj=JSON.parse(strobj)
        console.log(obj)
        if(obj.status){
            for(let i=0; i<serverItems.value.length; i++){
                if(serverItems.value[i].packagename==obj.data.name){
                    serverItems.value[i].loading=false
                    if(dialogAction.value === 'install') {
                    serverItems.value[i].installed=true
                    }else{
                    serverItems.value[i].installed=false
                    }
                    break
                }
            }
            // loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: '' })
        }else{
            console.error(obj.msg)
        }
    })
})

</script>