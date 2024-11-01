<template>
    <v-dialog :modelValue="showDialog" max-width="500px">
      
    <v-alert color="pink" dark border="top" icon="mdi-error" transition="slide-y-transition">
      {{ alertext }}
    </v-alert>
  </v-dialog>
</template>
<script setup lang="ts">
const props = defineProps({
    showDialog: {
      type: Boolean,
      required: true
    },
    alertext:{
        type:String,
        required: true
    }
    
  });
</script>  