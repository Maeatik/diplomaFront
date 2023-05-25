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
        content: '11231312' // Исправлено
      };
    },
    components: {
      ContentEditor
    },
    methods: {
      save() {
        console.log('Текст изменен:', this.content);
        this.saved = true;
      },
      checkSave() {
        // Проверка сохранения
      },
      getTextFromEditor(text) {
        this.content = text 
        console.log('Текст из редактора:', text);
        // Выполните необходимые действия с полученным текстом
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