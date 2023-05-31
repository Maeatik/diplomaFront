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
  },
})
</script>
