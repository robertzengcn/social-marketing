<template>
  <v-sheet class="mx-auto" rounded>
    <v-form ref="form" @submit.prevent="onSubmit">
      <h3>{{ $t('search.use_hint') }}</h3>
      <v-textarea class="mt-3" v-model="keywords" :label="$t('search.input_keywords_hint')"></v-textarea>
      <v-select v-model="enginer" :items="searchplatform" :label="$t('search.search_enginer_name') as string" required
        :readonly="loading" :rules="[rules.required]" class="mt-3"></v-select>
      <v-text-field v-model="concurrent_quantity" :label="$t('search.concurrent_quantity')" clearable
        class="mt-3"></v-text-field>

      <v-text-field v-model="page_number" :label="$t('search.page_number')" clearable class="mt-3"></v-text-field>

      <p>{{ capletter($t('search.show_in_Browser')) }}:</p>
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
import { SearhEnginer } from "@/config/searchSetting"
import { ToArray, CapitalizeFirstLetter } from "@/views/utils/function"
import { submitScraper, receiveSearchevent } from "@/views/api/search"
import { Usersearchdata } from "@/entityTypes/searchControlType"
import { convertNumberToBoolean } from "@/views/utils/function"
import { SEARCHEVENT } from "@/config/channellist"
import { CommonDialogMsg } from "@/entityTypes/commonType"
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
const enginer = ref<number>();
const keywords = ref();
const searchplatform = ref<Array<string>>();
const showinbrwoser = ref(0);
const page_number = ref(1);
const concurrent_quantity = ref(1);
const initialize = () => {
  searchplatform.value = ToArray(SearhEnginer);
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
async function onSubmit() {
  if (!form.value) return;
  const { valid } = await form.value.validate();
  if (!valid) {
    //console.log("form is not valid");
    setAlert("Please fill all required fields", "Error", "error");
  } else {
    if (!enginer.value) {
      //return; 
      setAlert(t("search.search_enginer_empty"), "Error", "error");
      return
    }
    if (!keywords.value) {
      setAlert(t("search.keywords_empty"), "Error", "error");
      return
    }
    const subkeyword = keywords.value.split('\n').map(keyword => keyword.trim());
    const subdata: Usersearchdata = {
      searchEnginer: enginer.value,
      keywords: subkeyword,
      num_pages: page_number.value,
      concurrency: concurrent_quantity.value,
      notShowBrowser: convertNumberToBoolean(showinbrwoser.value)
    }
    //split keywords one line per one
    // subdata.keywords=
    //submit form

    submitScraper(subdata).catch(function (err) {
      //catch error
      setAlert(err.message, "Error", "error");
      return null
    })
    // if(res){

    // }

  }


}
</script>
