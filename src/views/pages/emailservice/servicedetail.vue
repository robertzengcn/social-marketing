<template>
  <v-sheet class="mx-auto" rounded>

    <v-form ref="form" @submit.prevent="onSubmit" class="ml-2 mr-2">
      <v-alert v-model="alert" border="start" variant="tonal" closable close-label="Close Alert" title="Information"
        :color="alertcolor">
        {{ alertContent }}
      </v-alert>

      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="name" :label="$t('emailservice.name')" type="input"
            :hint="$t('emailservice.name_hint')" :readonly="loading" clearable required  :rules="[rules.required]"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="from" :label="$t('emailservice.from')" type="email"
            :hint="$t('emailservice.from_hint')" :readonly="loading" clearable required :rules="[rules.email]"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="password" :label="$t('emailservice.password')" type="input"
            :hint="$t('emailservice.password')" :readonly="loading" clearable required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field v-model="host" :label="$t('emailservice.host')" type="input"
            :hint="$t('emailservice.host_hint')" :readonly="loading" clearable required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-number-input :reverse="false" controlVariant="default" label="port" :hint="$t('emailservice.port_hint')"
            :min="1" :max="65535" v-model="port" :readonly="loading" clearable></v-number-input>

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <p><b>{{ $t('emailservice.ssl') }}:</b></p>
      <v-btn-toggle v-model="ssl" mandatory>
        <v-btn :value="1" color="primary"> {{ $t('common.yes') }}</v-btn>
        <v-btn :value="0" color="success">{{ $t('common.no') }}</v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>

      <div class="d-flex flex-column mt-4 mb-4">
        <v-row >
          <v-col cols="6" md="5">
            <v-btn color="success"  type="submit" :loading="loading">
              {{ $t('common.submit') }}
            </v-btn>
          </v-col>
          <v-col cols="6" md="5">
          <v-btn color="error"  block @click="$router.go(-1)">
            {{ $t('common.return') }}
          </v-btn>
        </v-col>
        </v-row>
      </div>
      <v-alert v-model="alert" border="start" variant="tonal" closable close-label="Close Alert" title="Information"
        :color="alertcolor">
        {{ alertContent }}
      </v-alert>
    </v-form>
  </v-sheet>


</template>
<script setup lang="ts">
// import router from '@/views/router';
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { getEmailServiceDetail, createupdateEmailService } from "@/views/api/emailservice";
import { EmailServiceEntitydata } from "@/entityTypes/emailmarketingType"
// import { convertVariableInTemplate } from "@/views/utils/function"
// import { VueEditor } from "vue2-editor";
// import { CommonIdrequest } from "@/entityTypes/commonType"
import router from "@/views/router";
import {CapitalizeFirstLetter} from "@/views/utils/function"

const { t } = useI18n({ inheritLocale: true });
const Id = ref<number>(0);

const emailRules = [
  (v: string) => {
    if(v) return true
return 'Email is required'
  },
  (v: string) =>{
    if (/.+@.+\..+/.test(v)) return true

return 'E-mail must be valid.'
  },
];

const rules = {
  required: (value) => !!value || "Field is required",
  email: (value) => {
    if (!value) return "E-mail is required";
    if (!/.+@.+\..+/.test(value)) return "E-mail must be valid.";
    return true;
  },
};
const $route = useRoute();
const FakeAPI = {
  async fetch(id: number): Promise<EmailServiceEntitydata> {
    // const data: CommonIdrequest<number> = {
    //   id: id
    // }
    return await getEmailServiceDetail(id);
  },
};
//defined the value in page
const form = ref<HTMLFormElement>();
const from = ref<string>(""); //template title
const password = ref<string>("");
const host = ref<string>("");
const port = ref<string>("");
const name = ref<string>("");
const ssl = ref<number>(0);

const loading = ref<boolean>(false);
const alert = ref<boolean>(false);
const alertContent = ref("");
const alertcolor = ref("");
const isEdit = ref(false);


// import { RefSymbol } from "@vue/reactivity";
// const selectedProxy = ref<ProxyListEntity>();

// const rules = {
//   required: (value) => !!value || "Field is required",
// };


const initialize = async () => {
  if ($route.params.id) {
    Id.value = parseInt($route.params.id.toString());
  }

  if (Id.value > 0) {
    //edit
    isEdit.value = true;
    FakeAPI.fetch(parseInt(Id.value.toString())).then((res) => {
      console.log(res)
      //set value
      if (res) {

        from.value = res.name;
        password.value = res.password;
        host.value = res.host;
        port.value = res.port;
        name.value = res.name;
        ssl.value = res.ssl;

      }
    });
  } else {
    //add new item
    isEdit.value = false;

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
    loading.value = false;
    return
  } else {
   // console.log(port.value.length)
    if(port.value.length>5){
      
      alert.value = true;
      alertcolor.value = "error";
      alertContent.value = t("emailservice.port_lenght_error");
      loading.value = false;
      return;
    }
    const soacc: EmailServiceEntitydata = {
      name: name.value,
      from: from.value,
      password: password.value,
      host: host.value,
      port: port.value,
      ssl: ssl.value,
    };


    if ($route.params.id) {
      soacc.id = parseInt($route.params.id.toString());
    }
    console.log(soacc);
    await createupdateEmailService(soacc)
      .then((res) => {
        console.log(res)
        if (res) {
          if (res.id && res.id > 0) {
            alert.value = true;
            alertcolor.value = "success";
            alertContent.value = CapitalizeFirstLetter(t("common.save_success"));
            soacc.id = res.id;
            $route.params.id = res.id.toString();
            isEdit.value = true;
            Id.value = res.id;
          } else {
            alert.value = true;
            alertcolor.value = "error";
            alertContent.value = "Save fail";
          }
          setTimeout(() => {
            alert.value = false;
            if (res.id && res.id > 0) {
              router.push({
                name: 'Email_Marketing_Service_LIST'
              });
            }
          }, 3000);
        }
      }
      )
      .catch((err) => {
        alert.value = true;
        alertcolor.value = "error";
        alertContent.value = err.message;
      });
  }
  loading.value = false;
}




onMounted(() => {
  initialize();

});

</script>
<style scoped>
.rounded-text-field .v-input__control {
  border-radius: 12px;
  /* Adjust the value as needed */
}
</style>
