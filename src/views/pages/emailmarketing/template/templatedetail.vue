<template>
  <v-sheet class="mx-auto" rounded>

    <v-form ref="form" @submit.prevent="onSubmit">
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field v-model="tplTitle" :label="$t('emailmarketing.title')" type="input"
            :hint="$t('emailmarketing.title_hint')" v-show="isEdit" :readonly="loading" clearable
            required></v-text-field>
          <!-- <v-text-field v-model="tplcontent" :label="$t('emailmarketing.content')" type="input"
            :hint="$t('emailmarketing.title_content')" :rules="[rules.required]" required :readonly="loading"
            clearable></v-text-field> -->
           <!-- https://www.vue2editor.com/examples/#basic-setup -->
            <vue-editor v-model="tplcontent" />
        </v-col>
        <v-col cols="12" md="4">
          <!-- Content for the 1/3 column -->
          <v-btn @click="insertVariable('time')" color="primary" class="mb-2" block>
            Insert Time Variable
          </v-btn>
          <v-btn @click="insertVariable('sender')" color="primary" class="mb-2" block>
            Insert Sender Variable
          </v-btn>
          <v-btn @click="insertVariable('receiver')" color="primary" class="mb-2" block>
            Insert Receiver Variable
          </v-btn>
        </v-col>
      </v-row>
      <v-alert
        v-model="alert"
        border="start"
        variant="tonal"
        closable
        close-label="Close Alert"
        title="Information"
        :color="alertcolor"
      >
        {{ alertContent }}
      </v-alert>
      <div class="d-flex flex-column">
        <v-btn color="success" class="mt-4" block type="submit" :loading="loading">
          Submit
        </v-btn>

        <v-btn color="error" class="mt-4" block @click="$router.go(-1)">
          Return
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
<script setup lang="ts">
// import router from '@/views/router';
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import {getEmailtemplatebyid,updateEmailtemplate} from "@/views/api/emailmarketing"
import {EmailTemplateRespdata} from "@/entityTypes/emailmarketinType"
import { VueEditor } from "vue2-editor";
const { t } = useI18n({ inheritLocale: true });
const templateId = ref<number>(0);


const $route = useRoute();
const FakeAPI = {
  async fetch(id: number): Promise<EmailTemplateRespdata> {
    return await getEmailtemplatebyid(id.toString());
  },
};
//defined the value in page
const form = ref<HTMLFormElement>();
const tplTitle = ref<string>(""); //template title
const tplcontent = ref<string>(""); //template

const loading = ref(false);
const alert = ref(false);
const alertContent = ref("");
const alertcolor = ref("");
const isEdit = ref(false);

import router from "@/views/router";
// const selectedProxy = ref<ProxyListEntity>();

const rules = {
  required: (value) => !!value || "Field is required",
};


const initialize = async () => {
  if ($route.params.id) {
    templateId.value = parseInt($route.params.id.toString());
  }

  if (templateId.value > 0) {
    //edit
    isEdit.value = true;
    FakeAPI.fetch(parseInt(templateId.value.toString())).then((res) => {
      //set value
      if(res){
      tplTitle.value = res.TplTitle;
      tplcontent.value = res.TplContent;
      }
    });
  } else {
    //add new item
    isEdit.value = false;
    // if($route.params.campaignId){
    // campaignId.value=parseInt($route.params.campaignId.toString());
    // }
  }
  
};

async function onSubmit() {
  console.log("submit");
  if (!form.value) return;
  const { valid } = await form.value.validate();
  // console.log(valid);
  loading.value = true;
  if (!valid) {
    console.log("form is not valid");
    alert.value = true;
    alertcolor.value = "error";
    alertContent.value = "form is not valid";
  } else {
    const soacc: EmailTemplateRespdata = {
      
      TplTitle: tplTitle.value,
      TplContent: tplcontent.value,
    };
    

    if ($route.params.id) {
      soacc.TplId = parseInt($route.params.id.toString());
    }
    console.log(soacc);
    await updateEmailtemplate(soacc)
      .then((res) => {
        if (res> 0) {
          alert.value = true;
          alertcolor.value = "success";
          alertContent.value = "Save success";
          soacc.TplId = res;
          $route.params.id = res.toString();
          isEdit.value = true;
          templateId.value = res;
        } else {
          alert.value = true;
          alertcolor.value = "error";
          alertContent.value = "Save fail";
        }
        setTimeout(() => {
          alert.value = false;
          if (res > 0) {
            router.push({
              path: "/emailmarketing/template/list",
            });
          }
        }, 5000);
      })
      .catch((err) => {
        alert.value = true;
        alertcolor.value = "error";
        alertContent.value = err.message;
      });
  }
  loading.value = false;
}

const insertVariable=function(str:string){
  //insert variable to content
  
}

onMounted(() => {
  initialize();
});
</script>
