<template>
    <v-sheet class="mx-auto" rounded>
        <v-form ref="form" @submit.prevent="onSubmit">
            <v-select v-model="useemailsource" :items="marketTypeOption" item-title="tranme" item-value="key" :label="$t('emailmarket.use_email_source') as string" required
        :readonly="loading" :rules="[rules.required]" class="mt-3"  
          return-object
          ></v-select>
            </v-form>
            </v-sheet>
</template>
<script setup lang="ts">
import { ref, computed,onMounted } from "vue";
import { useI18n } from "vue-i18n";
import router from '@/views/router';
import {EmailMarketingType} from '@/config/emailmarketing';
const { t } = useI18n({ inheritLocale: true });
type marketType={
    key:number;
    name:string;
    tranme:string;
}

const loading = ref<boolean>(false);
const marketTypeOption=ref<marketType[]>([]);    
const rules = {
    required: (value: any) => !!value || 'Required.',
  };
// Convert enum to array of objects
//const marketTypeList = computed(() => {
//    return Object.entries(EmailMarketingType)
//      .filter(([key, value]) => isNaN(Number(key))) // Filter out numeric keys
//      .map(([key, value]) => ({
//        key: value,
//        name: key
//      }));
//});
onMounted(() => {
    initialize();
   
})

const initialize = () => {
    marketTypeOption.value=[]
    const marketTypeList=Object.entries(EmailMarketingType)
    .filter(([key, value]) => isNaN(Number(key))) // Filter out numeric keys
    .map(([key, value]) => ({
      key: value as number,
      name: key,
      tranme: t("emailmarket."+key)
    }));
    console.log(marketTypeList);
    marketTypeList.map((item)=>{
        marketTypeOption.value.push(item);
    })
   console.log(marketTypeOption.value);
}


const form = ref<HTMLFormElement>();
const useemailsource=ref<marketType>();

function onSubmit() {
    // Your submit logic here
  }
</script>

