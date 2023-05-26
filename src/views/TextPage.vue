<template>
    <v-app class="app">
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>TextGrabber</v-toolbar-title>
        <v-spacer></v-spacer>
  
        <v-btn @click="save()" class="saveButton">Сохранить</v-btn>
        <v-btn @click="checkSave()">Выйти</v-btn>
      </v-app-bar>
  
      <ContentEditor v-model="content" class="sticky-object" @getText="getTextFromEditor"></ContentEditor>
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
  
  export default {
    data() {
      return {
        saved: false,
        overlayDelete: false,
        overlayPassword: false,
        text: '',
        content: '' // Исправлено
      };
    },
    components: {
      ContentEditor
    },
    methods: {
      save() {
        console.log('Текст сохранен:', this.content);
        this.saved = true;
      },
      checkSave() {
        if (!this.saved){
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
        // Выполните необходимые действия с полученным текстом
      },
      cancel() {
      if (this.isOverlayClosed) { // Отмена только при закрытии v-overlay
        this.content = this.text
        this.overlayDelete = false
      }
      this.isOverlayClosed = true // Обновление состояния isOverlayClosed
    }
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