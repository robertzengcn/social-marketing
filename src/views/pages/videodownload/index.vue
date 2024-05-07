<template>
    <v-sheet class="mx-auto" rounded>
        <v-form ref="form" @submit.prevent="onSubmit">
            <v-select v-model="type" :items="typeitems" :label="$t('video.platform')" required :readonly="loading"
                :rules="[rules.required]"></v-select>
            <v-textarea :label="$t('video.video_url')" :hint="$t('video.input_video_url_hint')" variant="outlined"></v-textarea>
            <v-text-field :label="$t('video.saved_path')" :hint="$t('video.input_video_save_path')"  persistent-hint
                type="input" @click="selectPath" v-model="savePath"></v-text-field>
        </v-form>
    </v-sheet>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import {videoDownloadlist} from "@/config/videosetting";
import {opendialog} from "@/views/api/video";
import {useI18n} from "vue-i18n";
const type = ref();
const typeitems = ref<Array<string>>();
const loading = ref(false);
const {t} = useI18n({inheritLocale: true});
const savePath=ref("")

const rules = {
    required: (value) => !!value || "Field is required",
};
async function onSubmit() {

}
const initialize = () => {
    typeitems.value = videoDownloadlist;

}
const selectPath=async()=>{
    const res=await opendialog()
    console.log(res)
    savePath.value=res
}
onMounted(() => {
    initialize();
});
</script>
