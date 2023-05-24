<script lang="ts" setup>
import { ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { component as CKEditor } from '@ckeditor/ckeditor5-vue';

const editorData = ref('')
const editorConfig = ref({
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
        ]
    }
})
</script>

<template>
    <div class="ck_editor" >
        <CKEditor :editor="ClassicEditor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
</template>

<style>
.ck_editor {
    --ck-border-radius: 0.6rem;
    size: 100px;
}
</style>