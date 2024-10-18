<template>
  <v-sheet class="mx-auto" rounded>

    <v-form ref="form" @submit.prevent="onSubmit">
      
          <v-text-field ref="inputs" v-model="filteName" :label="$t('emailfilter.name')" type="input"
            :hint="$t('emailfilter.inputname_hint')" :readonly="loading" clearable
            required></v-text-field>
          <!-- <v-text-field v-model="tplcontent" :label="$t('emailmarketing.content')" type="input"
            :hint="$t('emailmarketing.title_content')" :rules="[rules.required]" required :readonly="loading"
            clearable></v-text-field> -->
          <!-- https://www.vue2editor.com/examples/#basic-setup -->
          <!-- <vue-editor v-model="tplcontent" /> -->
              
     
      <div class="d-flex flex-column">
        <v-row>
          <v-col cols="12" md="4">
            <v-btn color="blue" class="mt-4" block @click="submitpreview" :loading="loading">
              {{ $t('emailmarketing.preview') }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn color="success" class="mt-4" block type="submit" :loading="loading">
              {{ $t('common.submit') }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn color="error" class="mt-4" block @click="$router.go(-1)">
              {{ $t('common.return') }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-sheet>

  
</template>
<script setup lang="ts">
// import router from '@/views/router';
import { ref, onMounted, watch,onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { getEmailfilterbyid} from "@/views/api/emailfilter";
import { EmailFilterdata} from "@/entityTypes/emailmarketinType"
import { convertVariableInTemplate } from "@/views/utils/function"
// import { VueEditor } from "vue2-editor";
import {CommonIdrequest} from "@/entityTypes/commonType"
import router from "@/views/router";

const { t } = useI18n({ inheritLocale: true });
const templateId = ref<number>(0);


const $route = useRoute();
const FakeAPI = {
  async fetch(id: number): Promise<EmailFilterdata> {
    const data:CommonIdrequest<number>={
      id:id
    }
    return await getEmailfilterbyid(data);
  },
};
//defined the value in page
const form = ref<HTMLFormElement>();
const filteName = ref<string>(""); //template title


const loading = ref<boolean>(false);
const alert = ref<boolean>(false);
const alertContent = ref("");
const alertcolor = ref("");
const isEdit = ref(false);


// import { RefSymbol } from "@vue/reactivity";
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
      if (res) {
        

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

watch(Sendervar, (newValue, oldValue) => {
  //console.log('EmailContentpreview changed from', oldValue, 'to', newValue);
  // Call your function here
  onEmailContentpreviewChange();
});
watch(Receivervar, (newValue, oldValue) => {
  //console.log('EmailContentpreview changed from', oldValue, 'to', newValue);
  // Call your function here
  onEmailContentpreviewChange();
});
function handleFocus(event: FocusEvent) {
  const target = event.target as HTMLTextAreaElement | HTMLInputElement;
  if (target && (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')) {
    lastFocusedElement = target;
  }
}

function onEmailContentpreviewChange() {
  const changeData: EmailTemplatePreviewdata = {
    Sender: Sendervar.value,
    Receiver: Receivervar.value,
    TplTitle: tplTitle.value,
    TplContent: tplcontent.value
  }
  const tplres = convertVariableInTemplate(changeData)
  console.log(tplres)
  EmailTitlepreview.value = tplres.TplTitle;
  EmailContentpreview.value = tplres.TplContent;
}

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
        console.log(res)
        if (res.id > 0) {
          alert.value = true;
          alertcolor.value = "success";
          alertContent.value = "Save success";
          soacc.TplId = res.id;
          $route.params.id = res.id.toString();
          isEdit.value = true;
          templateId.value = res.id;
        } else {
          alert.value = true;
          alertcolor.value = "error";
          alertContent.value = "Save fail";
        }
        setTimeout(() => {
          alert.value = false;
          if (res.id > 0) {
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

function submitpreview() {
  previewdialog.value = true;
  console.log(tplcontent.value)
  console.log(tplTitle.value)
  EmailContentpreview.value = tplcontent.value;
  EmailTitlepreview.value = tplTitle.value;
  onEmailContentpreviewChange();
}

function insertVariable(variable: string) {
  const activeElement = lastFocusedElement;
  console.log(activeElement)
  if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) {
  //  console.log(244)
    //insert variable to content
    // if (textarea.value) {
    //   const el = textarea.value;
    //   if (el) {
    //     const start = el.selectionStart;
    //     const end = el.selectionEnd;
    //     const text = tplcontent.value;
    //     tplcontent.value = text.slice(0, start) + variable + text.slice(end);
    //     // Move the cursor to the end of the inserted variable
    //     el.selectionStart = el.selectionEnd = start + variable.length;
    //     el.focus();
    //   }
    // }
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    const text = activeElement.value;
    if (start !== null && end !== null) {
      console.log(start, end)
      activeElement.value = text.slice(0, start) + variable + text.slice(end);

      // Move the cursor to the end of the inserted variable
      activeElement.selectionStart = activeElement.selectionEnd = start + variable.length;
      activeElement.focus();
    }
    console.log(activeElement)
    console.log(textarea.value)
    // Update the corresponding Vue ref if necessary

    if (activeElement.tagName === 'TEXTAREA') {
      tplcontent.value = activeElement.value;
    }else if (activeElement.tagName === 'INPUT') {
      tplTitle.value = activeElement.value;
    }
    // if (activeElement) {
    //   tplcontent.value = activeElement.value;
    // } else if (activeElement.tagName === 'INPUT' && activeElement.type === 'text') {
    //   tplTitle.value = activeElement.value;
    // }

  }
}

onMounted(() => {
  initialize();
  document.addEventListener('focusin', handleFocus);
});
onBeforeUnmount(() => {
  document.removeEventListener('focusin', handleFocus);
});
</script>
