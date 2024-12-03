<template>
  <v-sheet class="mx-auto" rounded>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-select v-model="type" :items="typeitems" :label="$t('video.platform')" required :readonly="loading"
        :rules="[rules.required]"></v-select>
        <v-select v-model="chooseType" :items="downloadType" :label="$t('video.downloadtype')" required :readonly="loading"
        :rules="[rules.required]"></v-select>
      <v-combobox v-model="accounts" multiple :items="accounts" :label="$t('account.select_account_hint')"
        item-title="user" return-object chips clearable @click="changeAccount"></v-combobox>
        
      <v-btn color="primary" @click="showAccounttable">{{$t('account.change_account')}}</v-btn>
      <div v-if="accounttableShow">
        <AccountSelectedTable @change="handleSelectedChanged" accountSource="youtube" />
      </div>
      <v-textarea :label="$t('video.video_url')" :hint="$t('video.input_video_url_hint')" variant="outlined" required
        v-model="linkstr" class="mt-5"></v-textarea>
      <v-text-field :label="$t('video.saved_path')" :hint="$t('video.input_video_save_path')" persistent-hint required
        type="input" @click="selectPath" v-model="savePath" class="mt-2" :rules="[rules.required]" ></v-text-field>
      <v-btn-group class="mt-2">
        <v-btn color="primary" class="mr-2" @click="resetForm">{{
      $t("common.reset")
    }}</v-btn>
        <v-btn color="secondary" class="mr-2" @click="onSubmit">{{
      $t("common.submit")
    }}</v-btn>
      </v-btn-group>
      <v-textarea v-if="showlog" label="Log Output" :value="logs" readonly></v-textarea>
    </v-form>
    <div>

      <!-- Define the alert dialog component -->
      <v-dialog
      v-model="alert"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        :text="alerttext"
        :title="alerttitle"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="alert = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
    </div>

  </v-sheet>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { videoDownloadlist,videodownlodType } from "@/config/videosetting";
import { opendialog, downloadVideo } from "@/views/api/video";
import { useI18n } from "vue-i18n";
import { downloadVideoparam} from "@/entityTypes/videoType";
import { receiveVideoDownloadMessage } from "@/views/api/video";
import AccountSelectedTable from "@/views/pages/socialaccount/widgets/AccountSelectedTable.vue";
import { SocialAccountListData } from '@/entityTypes/socialaccount-type'
import { CommonDialogMsg } from "@/entityTypes/commonType";
import router from '@/views/router';
const type = ref("");
const showlog = ref(false);
const logs = ref("");
const typeitems = ref<Array<string>>();
const chooseType = ref("");
const downloadType= ref<Array<string>>(); 
const loading = ref(false);
const { t } = useI18n({ inheritLocale: true });
const savePath = ref("");
const form = ref<HTMLFormElement>();
const alert = ref(false);
const alerttext = ref("");
const alerttitle = ref("");
const alerttype = ref<"success" | "error" | "warning" | "info" | undefined>(
  "success"
);
const linkstr = ref("");
const rules = {
  required: (value) => !!value || "Field is required",
};
const accounts = ref<Array<SocialAccountListData>>([])
const initialize = () => {
  typeitems.value = videoDownloadlist;
  downloadType.value=videodownlodType;
};
const selectPath = async () => {
  const res = await opendialog();
  console.log(res);
  savePath.value = res;
};
const accounttableShow = ref(false);
const showAccounttable = () => {

  accounttableShow.value = !accounttableShow.value;
};
const changeAccount = () => {
  if(accounts.value.length<1){
    accounttableShow.value = true;
  }
   
  
};

const handleSelectedChanged = (newValue: SocialAccountListData[]) => {
  // console.log(`selectedProxy changed to ${newValue}`);
  // proxyValue.value=[];
  if (newValue && newValue.length > 0) {

    // accounts.value.length=0;
    // accounts.value=newValue;
    for (let i = 0; i < newValue.length; i++) {
      if (newValue[i] && newValue[i].id) {
        let isexist = false;
        for (let is = 0; is < accounts.value.length; is++) {
          if (accounts.value[is].id == newValue[i].id) {
            isexist = true;
          }
        }
        console.log("isexist:" + isexist.toString());
        if (!isexist) {
          accounts.value.push(newValue[i]);
        }
      }
    }


  }
};
onMounted(() => {
  initialize();
  receiveVideoDownloadMessage((res: CommonDialogMsg) => {
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
      if (res.code == 200) {
        // route to new page
        router.push({
          path: '/video/dowloadlist'
        });
      }
    } else {
      if(res.data){
      setAlert(t(res.data.content), t('common.success'), "error");
      }
      //handle failure
      //append msg to logs with red color
      // logs.value += res.data.content + "\n";
    }
  });
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
function resetForm() {
  if (!form.value) return;
  form.value.reset();
}
async function onSubmit() {

  if (!form.value) return;
  const { valid } = await form.value.validate();

  // downloadVideo()
  loading.value = true;
  if (!valid) {
    setAlert("Please fill all required fields", "Error", "error");
  }else{  
    // console.log(valid);
    const lines = linkstr.value.split("\n");

    const validUrls = lines.filter((line) => {
      try {
        new URL(line);
        return true;
      } catch (_) {
        return false;
      }
    });
    const accountIds: Array<number> = [];
    accounts.value.forEach((element) => {
      accountIds.push(element.id);
    });
    const data: downloadVideoparam = {
      accountId: accountIds,
      platform: type.value,
      link: validUrls,
      savePath: savePath.value,
    };
    if (validUrls.length === 0) {
      setAlert("Please input valid url", "Error", "error");
      return;
    }
    downloadVideo(data);
    console.log("submit");
  } 
}
</script>
