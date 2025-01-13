<template>

    <div class="search_bar mt-4 d-flex jsb mb-5">
        <div class="d-flex jsb search_tool">
            <div class="search_wrap mr-4">
                <v-text-field rounded class="elevation-0" density="compact" variant="solo" label="Search"
                    append-inner-icon="mdi-magnify" single-line hide-details v-model="search"></v-text-field>
            </div>


        </div>
        <div>
        </div>
    </div>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name"
        @update:options="loadItems">
        <template v-slot:item.status="{ item }">
            <v-chip color="grey" v-if="item.status == '0'">{{ CapitalizeFirstLetter(t('common.not_start')) }}</v-chip>
            <v-chip color="blue" v-if="item.status == '1'">{{ CapitalizeFirstLetter(t('common.processing')) }}</v-chip>
            <v-chip color="green" v-if="item.status == '2'">{{ CapitalizeFirstLetter(t('common.complete')) }}</v-chip>
            <v-chip color="red" v-if="item.status == '3'">{{ CapitalizeFirstLetter(t('common.error')) }}</v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon size="small" class="me-2" @click="retryDownload(item)" v-if="item.status == '3'">
                mdi-restart
            </v-icon>
            <v-icon size="small" class="me-2" @click="openfile(item)" v-if="item.status == '2'">
                mdi-folder-open
            </v-icon>
        </template>
    </v-data-table-server>

    <ErrorDialog :showDialog="alert" :alertext="alerttext" :alertitle="alerttitle" @dialogclose="alert=false" />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, computed, onMounted,reactive,onUnmounted } from 'vue'
import { SearchResult } from '@/views/api/types'
import { useRoute,createRouter, createWebHistory } from "vue-router";
import { getVideolistbyTaskId, retryVideoDownloadId,receiveVideoItemDownloadMessage,openFileexplor } from "@/views/api/video";
import { VideoDownloadListDisplay } from "@/entityTypes/videoType";
import router from '@/views/router';
import { CapitalizeFirstLetter } from "@/views/utils/function"
import { CommonDialogMsg } from "@/entityTypes/commonType";
import ErrorDialog from "@/views/components/widgets/errorDialog.vue"
const $route = useRoute();
const { t } = useI18n({ inheritLocale: true });
type Fetchparam = {
    // id:number

    page: number,
    itemsPerPage: number,
    sortBy: { key: string, order: string },
    search: string
}
// const crouter = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// });

router.beforeEach((to, from, next) => {
  const baseTitle = to.meta.title || 'Default Title';
  if (to.params.taskid) {
    document.title = `${baseTitle} - Task ID: ${to.params.taskid}`;
  } else {
    document.title = String(baseTitle);
  }
  next();
});

const FakeAPI = {
    async fetch(fetchparam: Fetchparam): Promise<SearchResult<VideoDownloadListDisplay>> {
        // console.log(fetchparam.search)
        const fpage = (fetchparam.page - 1) * fetchparam.itemsPerPage
        const taskId = parseInt($route.params.taskid.toString());
        const res = await getVideolistbyTaskId({ taskId: taskId, page: fpage, size: fetchparam.itemsPerPage, sortby: fetchparam.sortBy, search: fetchparam.search })

        return res
    }
}


const headers: Array<any> = [
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.id"))),
        align: 'start',
        sortable: false,
        key: 'id',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("video.url"))),
        align: 'start',
        sortable: false,
        key: 'url',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("video.title"))),
        align: 'start',
        sortable: false,
        key: 'title',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.status"))),
        align: 'start',
        sortable: false,
        key: 'status',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.record_time"))),
        align: 'start',
        sortable: false,
        key: 'record_time',
    },
    {
        title: computed(_ => CapitalizeFirstLetter(t("common.actions"))),
        align: 'start',
        key: 'actions',
        sortable: false,
    },


];
const itemsPerPage = ref(10);
const serverItems = ref<Array<VideoDownloadListDisplay>>([]);
const loading = ref(false);
const totalItems = ref(0);
const search = ref('');
const alert = ref(false);
const alerttext = ref("");
const alerttitle = ref("");
const alerttype = ref<"success" | "error" | "warning" | "info" | undefined>(
  "success"
);

let refreshInterval: ReturnType<typeof setInterval> | undefined;
    const options = reactive({
  page: 1, // Initial page
  itemsPerPage: 10, // Items per page
});
// const taskId=ref(0);
// const showDeleteModal = ref(false);
// const deleteId=ref(0);
// const alertext=ref("");


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

            console.log(data)
            console.log(total)
            if (!data) {
                data = [];
            }
            serverItems.value = data
            totalItems.value = total
            loading.value = false
        }).catch(function (error) {
            console.error(error);
        })
}


const retryDownload = async (item: VideoDownloadListDisplay) => {
    if (item.id) {
        await retryVideoDownloadId(item.id)
        // if(res){
        //     loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: { key: 'id', order: 'asc' } })
        // }
    }
}
//open file in explorer
const openfile = (item: VideoDownloadListDisplay) => {
    if (item.id){
        openFileexplor(item.id)
    }
}
// const cancelDelete=()=> {
//       showDeleteModal.value = false;
// }
//confirm delete account
// const createDownload=()=>{
//     router.push({
//           path: '/video/download'
//         });
// }
const startAutoRefresh = () => {
  refreshInterval = setInterval(function () {
    loadItems({ page: options.page, itemsPerPage: itemsPerPage.value, sortBy: "" });
  }, 10000); // Refresh every 5 seconds
}
const stopAutoRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = undefined;
  }
};
onMounted(() => {
    receiveVideoItemDownloadMessage((res: CommonDialogMsg) => {
    console.log(res)
    //revice system message
    if (res.status) {
      // if (res.code == 200) {
        //show message to user
        if(res.data){
        setAlert(t(res.data.content), t('common.success'), "success");
        }
      // } else {
      //   //handle other message
      //   //append msg to logs
      //   logs.value += res.data.content + "\n";
      // }
    //   if (res.code == 200) {
    //     // route to new page
    //     router.push({
    //       path: '/video/dowloadtasklist'
    //     });
    //   }
    } else {
      if(res.data){
      setAlert(t(res.data.content), t('common.error'), "error");
      }
      //handle failure
      //append msg to logs with red color
      // logs.value += res.data.content + "\n";
    }
  });
    startAutoRefresh()
});
onUnmounted(() => {
  stopAutoRefresh();
});
const setAlert = (
  text: string,
  title: string,
  type: "success" | "error" | "warning" | "info" | undefined
) => {
  alerttext.value = text;
  alerttitle.value = title;
  alerttype.value = type;
  alert.value = true;
  setTimeout(() => {
    alert.value = false;
  }, 5000);
};

</script>