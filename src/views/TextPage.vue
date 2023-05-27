<template>
  <v-app class="app">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>TextGrabber</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="save()" class="saveButton">Сохранить</v-btn>
      <v-btn @click="checkSave()">Выйти</v-btn>
    </v-app-bar>

    <ContentEditor v-model="this.content" class="sticky-object" @update:model123="this.content"
      @getText="getTextFromEditor"></ContentEditor>
  </v-app>

  <v-overlay v-model="overlayDelete" contained class="align-center justify-center">
    <v-card>
      <v-card-text>
        <v-form>
          <div>Вы уверены? Если вы не сохраните и выйдете, изменения потеряются</div>
          <div class="text-center deleteField">
            <v-btn justify-content="center" color="success" class="flex-1-0 ma-2 pa-2" @click="cancel()">
              Отменить
            </v-btn>
            <v-btn justify-content="right" type="submit" color="error" class="ma-2 pa-2" to="/account">
              Выйти
            </v-btn>

          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>
  
<script>
import { ref } from 'vue'
import ContentEditor from '../components/ContentEditor.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default {

  data() {
    return {
      saved: false,
      overlayDelete: false,
      overlayPassword: false,
      text: '',
      content: this.getText(),
      token: '',
      apiData: { id: 0, site_id: 0 },
      textData: { id: 0, site_id: 0, text: '' }
    };
    console.log(this.content)
  },
  components: {
    ContentEditor
  },
  methods: {
    save() {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken !== null) {
        this.token = jwtToken
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

      this.textData = { id: 23, site_id: 19, text: this.content }
      axios.put('http://localhost:8000/api/texts/text', this.textData)
        .then(response => {
          this.$router.push('/account');

        })
        .catch(error => {
          console.error(error);
        });


      console.log('Текст сохранен:', this.content);
      this.saved = true;
    },
    checkSave() {
      if (!this.saved) {
        this.overlayDelete = true
        console.log('вы уверены?');
      } else {
        this.$router.push('/account');
      }
    },
    getTextFromEditor(text) {
      this.saved = false
      this.text = text
      console.log('Текст из редактора:', text);
    },
    cancel() {
      if (this.isOverlayClosed) { // Отмена только при закрытии v-overlay
        this.content = this.text
        this.overlayDelete = false
      }
      this.isOverlayClosed = true // Обновление состояния isOverlayClosed
    },

    getText() {
      let content;
      (async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken !== null) {
          this.token = jwtToken
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        this.apiData = { id: 23, site_id: 19 }

        try {
          const response = await axios.get('http://localhost:8000/api/texts/text', {
            headers: {
              'X-Data': JSON.stringify(this.apiData)
            }
          });

          this.content = response.data.text

          content = response.data.text

          // Вызов других методов или выполнение другой логики здесь

        } catch (error) {
          console.error(error);
        } finally {
          this.content = content
          return content
        }
      })();
      return
    }

  },
  created() {
    let content = '123123123123';
    (async () => {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken !== null) {
        this.token = jwtToken
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

      this.apiData = { id: 23, site_id: 19 }

      try {
        const response = await axios.get('http://localhost:8000/api/texts/text', {
          headers: {
            'X-Data': JSON.stringify(this.apiData)
          }
        });

        this.content = response.data.text
        console.log(this.content)
        this.$forceUpdate
        console.log(this.content)
        // Вызов других методов или выполнение другой логики здесь

      } catch (error) {
        console.error(error);
      } finally {
        return this.content
      }
    })();
  }

};
</script>
  
<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1;
}

.sticky-object {
  margin-top: 70px;
  margin-inline: 100px;
  /* Опустить объект вниз */
}
</style>