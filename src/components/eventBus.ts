import { reactive } from 'vue';

// Create a reactive event bus
const eventBus = reactive({
    editorData: '',
});

export default eventBus;
