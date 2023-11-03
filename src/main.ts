import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './styles/index.scss';
import App from './App.vue'
import router from './router';
import {vuetify} from '@/plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(createPinia())
  .use(vuetify)
  .use(router)
  .mount('#app').$nextTick(() => {
    const d = document.getElementById('_loading_');
    d?.setAttribute('class', 'la-ball-climbing-dot hide');
});

