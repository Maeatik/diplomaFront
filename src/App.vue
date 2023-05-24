<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './views/HelloWorld.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import MainPage from './views/MainPage.vue'

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld,
    Register,
    Login,
    MainPage
  },

  data() {
    return {
      //
    }
  },
})
</script>
