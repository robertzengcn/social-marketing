<template>
  <v-sheet class="mx-auto" rounded>
    <v-form ref="form" @submit.prevent="onSubmit">
    
      
      <v-select v-model="emailtype" :items="emailTypelist" :label="$t('emailextraction.extraction_type') as string" required
        :readonly="loading" :rules="[rules.required]" class="mt-3"  
        item-title="name"
          item-value="key"
          return-object
          ></v-select>
       <v-textarea class="mt-3" v-model="urls" :label="$t('emailextraction.input_urls_hint')" v-if="emailtype?.index==0"></v-textarea>   


      <v-text-field v-model="page_length" :label="$t('emailextraction.page_length')" clearable class="mt-3"></v-text-field>

      <v-text-field v-model="concurrent_quantity" :label="$t('search.concurrent_quantity')" clearable
        class="mt-3"></v-text-field>
      <v-combobox v-model="proxyValue" :items="proxyValue" label="Select proxy" item-title="host" multiple return-object
        chips clearable></v-combobox>
      <v-btn color="primary" @click="showProxytable">{{$t('search.choose_proxy')}}</v-btn>

      <div v-if="proxytableshow" class="mt-3">
        <ProxyTableselected @change="handleSelectedChanged" />
      </div>

      <p class="mt-5">{{ capletter($t('search.show_in_Browser')) }}:</p>
      <v-btn-toggle v-model="showinbrwoser" mandatory class="mt-3">
        <v-btn :value="0" color="primary">No</v-btn>
        <v-btn :value="1" color="success">Yes</v-btn>
      </v-btn-toggle>


      <div class="d-flex flex-column">
        <v-btn color="success" class="mt-4" block type="submit" :loading="loading">
          Submit
        </v-btn>

        <v-btn color="error" class="mt-4" block @click="$router.go(-1)">
          Return
        </v-btn>
      </div>

    </v-form>
    <div>
    </div>

  </v-sheet>
  <div>

    <!-- Define the alert dialog component -->
    <v-dialog v-model="alert" width="auto">
      <v-card max-width="400" prepend-icon="mdi-update" :text="alerttext" :title="alerttitle">
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="alert = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">

import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import router from '@/views/router';
import {EmailExtractionTypes} from "@/config/emailextraction";
import { ToArray, CapitalizeFirstLetter } from "@/views/utils/function"
import { submitScraper, receiveSearchevent } from "@/views/api/search"
import { Usersearchdata } from "@/entityTypes/searchControlType"
import { convertNumberToBoolean } from "@/views/utils/function"
import { SEARCHEVENT } from "@/config/channellist"
import { CommonDialogMsg } from "@/entityTypes/commonType"
import ProxyTableselected from "@/views/pages/proxy/widgets/ProxySelectedTable.vue";
import { ProxyEntity,ProxyListEntity } from "@/entityTypes/proxyType";
const { t } = useI18n({ inheritLocale: true });
const alert = ref(false);
const alerttext = ref("");
const alerttitle = ref("");
const alerttype = ref<"success" | "error" | "warning" | "info" | undefined>(
  "success"
);
const form = ref<HTMLFormElement>();
const loading = ref(false);
const rules = {
  required: (value) => !!value || "Field is required",
};
type EmailOption = {
  key: string;
  name: string;
  index: number;
};
const urls=ref("");
const page_length=ref(1);
const emailtype = ref<EmailOption>();
const keywords = ref();
const emailTypelist = ref<Array<EmailOption>>([]);
const showinbrwoser = ref(0);
const page_number = ref(1);
const concurrent_quantity = ref(1);
const proxyValue = ref<Array<ProxyEntity>>([]);
const proxytableshow = ref(false);
const initialize = () => {
  //searchplatform.value = ToArray(SearhEnginer);
  const seArr:string[]=ToArray(EmailExtractionTypes);

  //console.log(seArr);
  seArr.map((item,index)=>{
    emailTypelist.value?.push({name:t('emailextraction.'+item.toLowerCase()),key:item,index:index})
  })
 console.log(emailTypelist.value)
  //searchplatform.value=seArr
};
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

onMounted(() => {
  initialize();
  receiveMsg()
})
const showProxytable = () => {
  console.log("show proxy table");
  proxytableshow.value = !proxytableshow.value;
};

const receiveMsg = () => {
  receiveSearchevent(SEARCHEVENT, function (res) {
    console.log(res)
    const obj = JSON.parse(res) as CommonDialogMsg
    if (obj.status) {
      if (obj.data) {
        if (obj.data.action) {
          if (obj.data.action == 'search_task _start') {
            router.push({
              path: '/search/tasklist'
            });
          }
        }
      }
    }
  })
}
const capletter = CapitalizeFirstLetter

const handleSelectedChanged = (newValue: ProxyListEntity[]) => {
  // console.log(`selectedProxy changed to ${newValue}`);
  // proxyValue.value=[];
  if (newValue && newValue.length > 0) {
    //loop new value and add to proxyValue

    for (let i = 0; i < newValue.length; i++) {
      if (newValue[i] && newValue[i].id) {
        let isexist = false;
        for (let is = 0; is < proxyValue.value.length; is++) {
          if (proxyValue.value[is].id == newValue[i].id) {
            isexist = true;
          }
        }
        console.log("isexist:" + isexist.toString());
        if (!isexist) {
          if((newValue[i].host)&&( newValue[i].port)){
          proxyValue.value.push({
            id: newValue[i].id,
            host: newValue[i].host!,
            port: newValue[i].port!,
            user: newValue[i].username,
            pass: newValue[i].password,
            protocol: newValue[i].protocol,
          });
          console.log(proxyValue.value);
        }
        }
      }
    }
  }
};
async function onSubmit() {
  if (!form.value) return;
  const { valid } = await form.value.validate();
  if (!valid) {
    //console.log("form is not valid");
    setAlert("Please fill all required fields", "Error", "error");
  } else {
   
    const subkeyword = keywords.value.split('\n').map(keyword => keyword.trim());
    // let finalser=0;
    // searchplatform.value.forEach((item) => {
    //   if (item.key == enginer.value) {
    //     finalser = item.index;
    //   }
    // })
   
    //split keywords one line per one
    // subdata.keywords=
    //submit form
    // console.log(subdata)
    // submitScraper(subdata).catch(function (err) {
    //   //catch error
    //   setAlert(err.message, "Error", "error");
    //   return null
    // })
    // if(res){

    // }

  }


}
</script>
