<template>
  <v-app>
    <v-main>
      <!-- <HelloWorld /> -->
      <Login />
      <!-- <v-app>
        <v-btn color="primary">Привет, Vuetify!</v-btn>
      </v-app> -->

    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld,
    Register,
    Login
  },

  data() {
    return {
      //
    }
  },
})
</script>
