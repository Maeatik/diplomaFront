<template>
  <v-app>
    <v-main>
      <div v-if="loading">
        <Loader />
      </div>
      <div v-else>
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Loader from './components/Loader.vue';
import MainPage from './views/MainPage.vue'
export default defineComponent({
  name: 'App',

  components: {
    Loader,
    MainPage
  },

  data() {
    return {
      loading: false, 
    }
  },
  created() {
    // fetchData().then(() => {
    //   this.loading = false; // Пример: Установка loading в false после успешной загрузки данных
    // });
    // Можете использовать хук created или другие методы жизненного цикла компонента для загрузки данных
    // После загрузки данных установите this.loading в false
  },
})
</script>
