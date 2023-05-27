import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

export default defineConfig({
	plugins: [
		vue(),
		vuetify({ autoImport: true })
	],

	optimizeDeps: {
		include: [
			'vue',
			'vue-router',
			'vue-property-decorator',
			'tinymce'
		],
	},
})
