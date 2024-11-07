<template>
  <v-stepper alt-labels v-model="thisstep" show-actions>
    <v-stepper-header>
      <v-stepper-item v-for="(step, n) in vslotheaders" :title="step.title" :value="step.step"
        :rules="[value => !!step.valid]"
         :complete="stepComplete(n+1)"
        >

      </v-stepper-item>
    </v-stepper-header>
    <v-stepper-window>
      <!-- <template 
    v-slot:item.1
    >   -->
      <v-stepper-window-item key="1-content" :value="1">
        <h3 class="text-h6">{{ CapitalizeFirstLetter(t("buckemailsend.choose_email_source")) }}</h3>
        <h4>{{ t("common.single_choose") }}</h4>
        <v-sheet class="mx-auto" rounded>
          <v-select v-model="useemailsource" :items="marketTypeOption" item-title="tranme" item-value="key"
            :label="$t('emailmarketing.use_email_source') as string" required :readonly="loading"
            :rules="[rules.required]" class="mt-3" return-object></v-select>
          <div v-if="useemailsource?.key == 1">
            <EmailresultTable :isSelectedtable="true" @change="handleEmailsourceChanged" />
          </div>
          <v-container fluid>
            <v-checkbox
      v-model="notduplicate"
      :label="CapitalizeFirstLetter($t('emsourceTypeailmarketing.avoid_duplicate')) as string"></v-checkbox>
          </v-container> 
        </v-sheet>
      </v-stepper-window-item>
      <v-stepper-window-item key="2-content" :value="2">
        <!-- </template> -->
        <!-- <template v-slot:item.2>   -->
        <h3 class="text-h6">{{ CapitalizeFirstLetter(t("buckemailsend.choose_email_template")) }}</h3>
        <h4>{{ t("common.multiple_choice") }}</h4>
        <!--select email template-->
        <Emailtemplateselect :isSelectedtable="true" @change="handleEmailtemplateChanged" />
        <!-- </template> -->
      </v-stepper-window-item>
      <v-stepper-window-item key="3-content" :value="3">
        <!-- <template v-slot:item.3>   -->
        <h3 class="text-h6">{{ CapitalizeFirstLetter(t("buckemailsend.choose_email_filter")) }}</h3>
        <h4>{{ t("common.multiple_choice") }}</h4>
        <EmailFilterTable :isSelectedtable="true" @change="handleEmailfilterChanged" />
        <!-- </template> -->
      </v-stepper-window-item>
      <v-stepper-window-item key="4-content" :value="4">
        <!-- <template v-slot:item.4>   -->
        <h3 class="text-h6">{{ CapitalizeFirstLetter(t("buckemailsend.choose_email_service")) }}</h3>
        <h4>{{ t("common.multiple_choice") }}</h4>
        <EmailServiceTable :isSelectedtable="true" @change="handleEmailserviceChanged" />
        <!-- </template> -->
      </v-stepper-window-item>
    </v-stepper-window>
    <div class="button-container mb-5 mr-5 ml-5">
      <v-btn text v-if="thisstep > 1" @click="backStep(thisstep)">Back</v-btn>
      <div class="spacer"></div>
      <v-btn v-if="thisstep < totalstep" color="primary" @click="validstep(thisstep)">Continue</v-btn>
      <v-btn v-else color="success" @click="validstep(thisstep)">Done</v-btn>
    </div>
  </v-stepper>
  <ErrorDialog :showDialog="showDialog" :alertext="alertext" @dialogclose="showDialog=false" />
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { useI18n } from "vue-i18n";
import router from '@/views/router';
import { EmailMarketingType } from '@/config/emailmarketing';
import EmailresultTable from '@/views/pages/emailextraction/widgets/EmailResultTable.vue'
import { EmailsearchTaskEntityDisplay } from '@/entityTypes/emailextraction-type'
import Emailtemplateselect from "@/views/pages/emailmarketing/template/widgets/TemplateTable.vue"
import EmailFilterTable from "@/views/pages/emailfilter/widgets/EmailFilterTable.vue"
import EmailServiceTable from "@/views/pages/emailservice/widgets/EmailServiceTable.vue"
import { VslotHeader } from '@/entityTypes/commonType'
import { CapitalizeFirstLetter } from "@/views/utils/function"
import ErrorDialog from "@/views/components/widgets/errorDialog.vue"
const vslotheaders = ref<Array<VslotHeader>>([]);
const { t } = useI18n({ inheritLocale: true });
import { EmailTemplateRespdata, EmailFilterdata, EmailServiceListdata,EmailMarketingsubdata } from "@/entityTypes/emailmarketingType"
import {buckEmailsend} from "@/views/api/buckemail"
type marketType = {
  key: number;
  name: string;
  tranme: string;
}
const emailsourcesdata = ref<EmailsearchTaskEntityDisplay>();
const emailtemplateresdata = ref<Array<EmailTemplateRespdata>>();
const emailfilterdatas = ref<Array<EmailFilterdata>>([]);
const emailservicelist = ref<Array<EmailServiceListdata>>()
const notduplicate=ref<boolean>(true)
// const requiredRule = (value: any) => !!value || 'Required.';
// const step1Rules = [requiredRule];
// const step2Rules = [requiredRule];
// const step3Rules = [requiredRule];

vslotheaders.value = [
  { step: 1, title: computed(_ => CapitalizeFirstLetter(t("buckemailsend.email_source"))), valid: true },
  { step: 2, title: computed(_ => CapitalizeFirstLetter(t("buckemailsend.email_template"))), valid: true },
  { step: 3, title: computed(_ => CapitalizeFirstLetter(t("buckemailsend.email_filter"))), valid: true },
  { step: 4, title: computed(_ => CapitalizeFirstLetter(t("buckemailsend.email_service"))), valid: true },
];
const thisstep = ref(1);
const totalstep = ref<number>(4)
const loading = ref<boolean>(false);
const showDialog = ref<boolean>(false);
const alertext = ref<string>("")
const marketTypeOption = ref<marketType[]>([]);
const rules = {
  required: (value: any) => !!value || 'Required.',
};



onMounted(() => {
  initialize();

})
const validstep = (n: number) => {
  console.log(n)
  //valid item
  if (n == 1) {
    if (!useemailsource.value) {
      showDialog.value = true
      alertext.value = t("buckemailsend.email_souce_empty")
      return
    }
    // useemailsource.value?.validate();
    if (useemailsource.value?.key == 1) {
      if (!emailsourcesdata.value) {
        alertext.value = t("buckemailsend.choose_at_least_one_souce")
        showDialog.value = true
        vslotheaders.value[0].valid = false
        return
      } else {
        vslotheaders.value[0].valid = true
      }

    } else {
      //else check
    }
  } else if (n == 2) {

    if (!emailtemplateresdata.value || emailtemplateresdata.value?.length < 1) {
      showDialog.value = true
      alertext.value = t("buckemailsend.email_template_empty")
      vslotheaders.value[1].valid = false
      return
    }else{
      vslotheaders.value[1].valid =true
    }
  } else if (n == 3) {

    if (!emailfilterdatas.value || emailfilterdatas.value.length < 1) {
      showDialog.value = true
      alertext.value = t("buckemailsend.email_filter_empty")
      vslotheaders.value[2].valid = false
      return
    }else{
      vslotheaders.value[2].valid = true
    }
  } else if (n == 4) {

    if (!emailservicelist.value || emailservicelist.value.length < 1) {
      showDialog.value = true
      alertext.value = t("buckemailsend.email_service_empty")
      vslotheaders.value[3].valid = false
      return
    }else{
      vslotheaders.value[3].valid = true
    }
    //submit data
    Submitdata()
    return
  }
  thisstep.value++
}
const backStep = (n: number) => {
  console.log(n)
  console.log(thisstep.value)
  if (n > 1) {
    thisstep.value--
  }
}
// const closeDialog=()=>{
//   console.log("close dialog")
//   showDialog.value = false
// }
// const stepComplete = (step: number) => {
//   return thisstep.value > step
// }
const initialize = () => {
  marketTypeOption.value = []
  const marketTypeList = Object.entries(EmailMarketingType)
    .filter(([key, value]) => isNaN(Number(key))) // Filter out numeric keys
    .map(([key, value]) => ({
      key: value as number,
      name: key,
      tranme: t("emailmarketing." + key)
    }));
  console.log(marketTypeList);
  marketTypeList.map((item) => {
    marketTypeOption.value.push(item);
  })
  console.log(marketTypeOption.value);
}


const form = ref<HTMLFormElement>();
const useemailsource = ref<marketType>();
const handleEmailsourceChanged = (newValue: EmailsearchTaskEntityDisplay) => {
  //email task selected change
  emailsourcesdata.value = newValue
}
const handleEmailtemplateChanged = (newValue: Array<EmailTemplateRespdata>) => {
  //email task selected change
  emailtemplateresdata.value = newValue
}
const handleEmailfilterChanged = (newValue: Array<EmailFilterdata>) => {
  //email task selected change
  emailfilterdatas.value = newValue
}
const handleEmailserviceChanged = (newValue: Array<EmailServiceListdata>) => {
  //email task selected change
  emailservicelist.value = newValue
}
const stepComplete=(step:number) =>{
            return thisstep.value > step
  }
function Submitdata() {
  if(!emailtemplateresdata.value){
    showDialog.value = true
    alertext.value = t("buckemailsend.email_template_empty")
    return
  }
  if(!emailfilterdatas.value){
    showDialog.value = true
      alertext.value = t("buckemailsend.email_filter_empty")
    return
  }
  if(!emailservicelist.value){
    showDialog.value = true
    alertext.value = t("buckemailsend.email_service_empty")
    return
  }
  if(!useemailsource.value){
    alertext.value = t("buckemailsend.choose_at_least_one_souce")
    showDialog.value = true
    return
  }
  
  // Your submit logic here
  const emailformdata:EmailMarketingsubdata={
    sourceType:useemailsource.value?.name,
    EmailTemplateslist:emailtemplateresdata.value,
    EmailFilterlist:emailfilterdatas.value,
    EmailServicelist:emailservicelist.value
  }
  console.log(emailformdata)
  buckEmailsend(emailformdata)
}
</script>
<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
  /* Distribute space between buttons */
  align-items: center;
  /* Align items vertically */
}

.spacer {
  flex: 1;
  /* Take up remaining space */
}
</style>