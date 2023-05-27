<template>
  <div class="ck_editor">
    <CKEditor :editor="editor" v-model="editorData" :config="editorConfig" :update="modelValue"></CKEditor>
  </div> 
</template>

<script lang="ts" setup>  
import { ref, watch, onMounted } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { component as CKEditor } from '@ckeditor/ckeditor5-vue'; 
 

const props = defineProps({
  modelValue: String, 
  content: String
});


const emit = defineEmits(['update:modelValue', 'getText']);
console.log(props.modelValue)
const editor= ClassicEditor

const editorData = ref(props.modelValue || '');
const editorConfig = ref({
  toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    ]
  },
  language: 'ru'
}); 

watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined){
    editorData.value = newValue;
  } else {
    console.log('хуй')
  }
});

watch(editorData, () => {
  emit('update:modelValue', editorData.value);
  emit('getText', editorData.value);
});

onMounted(() => {
  editorData.value = props.modelValue || '';
});

</script>
  
<style>
.ck_editor {
  --ck-border-radius: 0.6rem;
  size: 100px;
}
</style>
  