<template>
  <v-sheet class="mx-auto" rounded>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-text-field v-model="socialaccountId" label="Id" type="input" v-show="isEdit" :readonly="true"
        clearable></v-text-field>
      <v-text-field v-model="user" label="User" type="input" hint="input the name" :rules="[rules.required]" required
        :readonly="loading" clearable></v-text-field>
      <v-text-field v-model="pass" label="Pass" type="input" hint="input the pass" :rules="[rules.required]" required
        :readonly="loading" clearable></v-text-field>
      <v-btn-toggle v-model="status" mandatory>
        <v-btn :value="0" color="primary">Inactive</v-btn>
        <v-btn :value="1" color="success">Active</v-btn>
      </v-btn-toggle>
      <v-select v-model="social_type_id" item-title="name" item-value="id" :items="platformitems" label="Platform"
        required :readonly="loading" :rules="[rules.required]"></v-select>
      <v-text-field v-model="name" label="Name" type="input" hint="input the account name"
        :readonly="loading"></v-text-field>
      <v-text-field v-model="phone" clearable label="Phone" type="input" hint="input the account phone"
        :readonly="loading"></v-text-field>
      <v-text-field v-model="email" clearable label="Email" type="input" hint="input the account email"
        :readonly="loading"></v-text-field>

      <v-text-field v-model="proxyValue" label="Proxy" type="input" hint="proxy for the account" readonly
        @click="showProxytable"></v-text-field>
      <div v-if="proxytableshow">
        <ProxyTableselected @change="handleSelectedChanged" />
      </div>

      <v-alert v-model="alert" border="start" variant="tonal" closable close-label="Close Alert" title="Information"
        :color="alertcolor">
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
import {
  getSocialaccountinfo,
  saveSocialAccount,
} from "@/views/api/socialaccount";
import { getSocialPlatformlist } from "@/views/api/social_platform";
import { useRoute } from "vue-router";
import { SocialAccountDetailData } from "@/entity-types/socialaccount-type";
import ProxyTableselected from "@/views/pages/proxy/widgets/ProxySelectedTable.vue";
import { ProxyListEntity } from "@/entity-types/proxy-type";

const $route = useRoute();
const FakeAPI = {
  async fetch(id: number): Promise<SocialAccountDetailData> {
    return await getSocialaccountinfo(id);
  },
};
//defined the value in page
const form = ref<HTMLFormElement>();
const user = ref(""); //account
const pass = ref(""); //password
const status = ref(0);
const name = ref(""); //username
const phone = ref("");
const email = ref("");
const proxy = ref(0);
const socialaccountId = ref(0);
const social_type_id = ref(0);
const proxyValue = ref("");
const loading = ref(false);
const alert = ref(false);
const alertContent = ref("");
const alertcolor = ref("");
const isEdit = ref(false);
const platformitems = ref();
const proxytableshow = ref(false);
// const selectedProxy = ref<ProxyListEntity>();

const rules = {
  required: (value) => !!value || "Field is required",
};
const showProxytable = () => {
  console.log("show proxy table");
  proxytableshow.value = !proxytableshow.value;
}

const initialize = async () => {

  if ($route.params.id) {
    socialaccountId.value = parseInt($route.params.id.toString());
  }

  if (socialaccountId.value > 0) {
    //edit
    isEdit.value = true;
    FakeAPI.fetch(parseInt(socialaccountId.value.toString())).then((res) => {
      user.value = res.user;
      pass.value = res.pass;
      status.value = res.status;
      name.value = res.name;
      phone.value = res.phone;
      email.value = res.email;
      if (res.proxy != null && res.proxy.id) {
        proxy.value = res.proxy.id;
        if (res.proxy.url) {
          proxyValue.value = res.proxy.url;
        }
      }
      social_type_id.value = res.social_type_id;

    });
  } else {
    //add new item
    isEdit.value = false;
    // if($route.params.campaignId){
    // campaignId.value=parseInt($route.params.campaignId.toString());
    // }
  }
  //get social task type
  const platformlist = await getSocialPlatformlist({ page: 0, size: 100 });

  if (platformlist != null) {
    // console.log(tasktypelist)
    platformitems.value = platformlist.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
    // console.log(typeitems.value);
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
  } else {
    const soacc: SocialAccountDetailData = {
      social_type_id: social_type_id.value,
      user: user.value,
      pass: pass.value,
      status: status.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
      proxy: { id: proxy.value },
    };
    if ($route.params.id) {
      soacc.id = parseInt($route.params.id.toString());
    }
    console.log(soacc);
    await saveSocialAccount(soacc)
      .then((res) => {
        if (res.id > 0) {
          alert.value = true;
          alertcolor.value = "success";
          alertContent.value = "Save success, the account id is " + res.id;
          soacc.id = res.id;
          $route.params.id = res.id.toString();
          isEdit.value = true;
          socialaccountId.value = res.id;
        } else {
          alert.value = true;
          alertcolor.value = "error";
          alertContent.value = "Save fail";
        }
        setTimeout(() => {
          alert.value = false;
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

onMounted(() => {
  initialize();

});
// watch(ProxyTableselected.selected, (newValue, oldValue) => {
//   console.log(`selectedProxy changed from ${oldValue} to ${newValue}`);
//   if (newValue && newValue.id) {

//     selectedProxy.value = ProxyTableselected.selected;

//   }
// });
const handleSelectedChanged = (newValue: ProxyListEntity[]) => {
  console.log(`selectedProxy changed to ${newValue}`);
  if (newValue && newValue.length > 0) {
    
    if (newValue[0].id) {
      proxy.value = newValue[0].id;
      proxyValue.value = newValue[0].host + ":" + newValue[0].port;
    }
  }
}

// watch(selectedProxy, (newValue, oldValue) => {
//   console.log(`selectedProxy changed from ${oldValue} to ${newValue}`);
//   if (newValue && newValue.id) {

//     proxy.value = newValue.id;
//     proxyValue.value = newValue.host + ":" + newValue.port;

//   } else {
//     proxy.value = 0;
//     proxyValue.value = "";
//   }
// });
</script>
