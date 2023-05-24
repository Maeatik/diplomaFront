<template>
    <v-app class="app">
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>TextGrabber</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn to="account" class="saveButton">Сохранить</v-btn>
            <v-btn to="account">Выйти</v-btn>
        </v-app-bar>

        <ContentEditor class="sticky-object"></ContentEditor>

        
    </v-app>
</template>


<script lang="ts">
import ContentEditor from '../components/ContentEditor.vue';

export default {
    components: {
        ContentEditor,
        
    },
}
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