import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './styles/index.scss';
import App from '@/views/App.vue'
import router from '@/views/router';
import {vuetify} from '@/views/plugins/vuetify'
import { loadFonts } from '@/views/plugins/webfontloader'
import store from '@/views/store'
import '@/permission'

loadFonts()

createApp(App)
  .use(createPinia())
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app').$nextTick(() => {
    const d = document.getElementById('_loading_');
    d?.setAttribute('class', 'la-ball-climbing-dot hide');
});

