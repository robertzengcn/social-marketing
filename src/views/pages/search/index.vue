<template>
  <v-sheet class="mx-auto" rounded>
    <v-form ref="form" @submit.prevent="onSubmit">
      <h3>{{$t('search.use_hint')}}</h3>
      <v-textarea class="mt-3" v-model="keywords" :label="$t('search.input_keywords_hint')"></v-textarea>
      <v-select v-model="enginer" :items="searchplatform" :label="$t('search.search_enginer')" required :readonly="loading"
        :rules="[rules.required]" class="mt-3"></v-select>
        <v-text-field v-model="concurrent_quantity"
        :label="$t('search.concurrent_quantity')"
        clearable class="mt-3"
      ></v-text-field>

        <v-text-field v-model="page_number"
        :label="$t('search.page_number')"
        clearable class="mt-3"
      ></v-text-field>
        
        <p>{{capletter($t('search.show_in_Browser'))}}:</p>
        <v-btn-toggle v-model="showinbrwoser" mandatory class="mt-3">
          <v-btn :value="0" color="primary">No</v-btn>
          <v-btn :value="1" color="success">Yes</v-btn>
        </v-btn-toggle>

       
        <div class="d-flex flex-column">
          <v-btn
            color="success"
            class="mt-4"
            block
            type="submit"
            :loading="loading"
          >
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
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import router from '@/views/router';
import {SearhEnginer} from "@/config/searchSetting"
import { ToArray,CapitalizeFirstLetter } from "@/views/utils/function"
import {submitScraper} from "@/views/api/search"
import { Usersearchdata } from "@/entityTypes/searchControlType"
import {convertNumberToBoolean} from "@/views/utils/function"
const form = ref<HTMLFormElement>();
const loading = ref(false);
const rules = {
  required: (value) => !!value || "Field is required",
};
const enginer = ref(1);
const keywords= ref();
const searchplatform=ref<Array<string>>();
const showinbrwoser = ref(0);
const page_number=ref(1);
const concurrent_quantity=ref(1);
const initialize = () => {
  searchplatform.value = ToArray(SearhEnginer);
};

onMounted(() => {
  initialize();
})
const capletter=CapitalizeFirstLetter
async function onSubmit() {
  if (!form.value) return;
  const { valid } = await form.value.validate();
  if (!valid) {
    console.log("form is not valid");
  } else {
    const subdata:Usersearchdata={
      searchEnginer: enginer.value,
    keywords: keywords.value,
    num_pages: page_number.value,
    concurrency: concurrent_quantity.value,
    notShowBrowser: convertNumberToBoolean(showinbrwoser.value)
    }
     //submit form
  submitScraper(subdata)

  }

 
}
</script>
