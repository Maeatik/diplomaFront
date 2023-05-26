import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';
import axios from 'axios';

loadFonts();

const app = createApp(App);

app.use(router).use(vuetify)

app.config.globalProperties.$checkToken = function() {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

app.mount('#app');