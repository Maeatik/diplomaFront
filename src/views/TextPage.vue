<template>
  <v-app class="app">
    <v-app-bar app color="#AFEEEE" dark>
      <v-toolbar-title class="font" style="font-size: 35px; font-weight: 700;">TEXTGrabber</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn style="font-size: 14px; font-weight: 700;" @click="save()" class="saveButton font btn">Сохранить</v-btn>
      <v-btn class="btn font" style="font-size: 14px; font-weight: 700;" @click="checkSave()">Выйти</v-btn>
    </v-app-bar>

    <ContentEditor v-model="this.content" class="sticky-object" @update:model123="this.content"
      @getText="getTextFromEditor"></ContentEditor>
  </v-app>

  <v-overlay v-model="overlayDelete" contained class="align-center justify-center font">
    <v-card>
      <v-card-text>
        <v-form>
          <div>Вы уверены? Если вы не сохраните и выйдете, изменения потеряются</div>
          <div class="text-center deleteField">
            <v-btn justify-content="center" color="success" class="flex-1-0 ma-2 pa-2 btn" style="font-size: 14px; font-weight: 700;" @click="cancel()">
              Отменить
            </v-btn>
            <v-btn justify-content="right" type="submit" color="error" class="ma-2 pa-2 btn" style="font-size: 14px; font-weight: 700;" to="/account">
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
      const idsite = parseInt(this.$route.params.id, 10);
      const idtext = parseInt(this.$route.params.textid, 10);

      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken !== null) {
        this.token = jwtToken
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

      this.textData = { id: idtext, site_id: idsite, text: this.content }
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
      if (this.isOverlayClosed) {
        this.content = this.text
        this.overlayDelete = false
      }
      this.isOverlayClosed = true
    },

    getText() {
      const id = parseInt(this.$route.params.id, 10);
      const idtext = parseInt(this.$route.params.textid, 10);


      let content;
      (async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken !== null) {
          this.token = jwtToken
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        this.apiData = { id: idtext, site_id: id }

        try {
          const response = await axios.get('http://localhost:8000/api/texts/text', {
            headers: {
              'X-Data': JSON.stringify(this.apiData)
            }
          });
          this.content = response.data.text

          content = response.data.text
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
    const id = parseInt(this.$route.params.id, 10);
    const idtext = parseInt(this.$route.params.textid, 10);

    (async () => {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken !== null) {
        this.token = jwtToken
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

      this.apiData = { id: idtext, site_id: id }

      try {
        const response = await axios.get('http://localhost:8000/api/texts/text', {
          headers: {
            'X-Data': JSON.stringify(this.apiData)
          }
        });

        this.content = response.data.text

        this.$forceUpdate
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
}
</style>