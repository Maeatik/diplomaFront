<template>
    <v-app class="app">
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>TextGrabber</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="d-flex justify-space-around">
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>

                    <v-list class="flex-column">
                        <v-btn variant="plain" class="w-100" to="/">Вернуться на главную</v-btn>
                        <v-btn variant="plain" class="w-100" @click="overlayPassword = !overlayPassword">Сменить
                            пароль</v-btn>
                        <v-btn variant="plain" class="w-100" @click="overlayDelete = !overlayDelete">Удалить аккаунт</v-btn>
                    </v-list>
                </v-menu>
            </div>
        </v-app-bar>

        <v-overlay v-model="overlayDelete" contained class="align-center justify-center">
            <v-card>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Введите пароль" outlined required></v-text-field>
                        <v-text-field label="Введите повторно пароль"></v-text-field>

                        <v-tooltip activator="deleteField" location="top" text="Это действие нельзя обратить">
                            <template v-slot:activator="{ props }">
                                <div class="text-center deleteField">
                                    <v-btn v-bind="props" justify-content="center" type="submit" color="error">
                                        Удалить
                                    </v-btn>
                                </div>
                            </template>
                        </v-tooltip>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-overlay>

        <v-overlay v-model="overlayPassword" contained class="align-center justify-center">
            <v-card>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Введите старый пароль" outlined required></v-text-field>
                        <v-text-field label="Введите новый пароль" outlined required></v-text-field>
                        <v-text-field label="Введите повторно новый пароль"></v-text-field>
                        <div class="text-center deleteField">
                            <v-btn justify-content="center" type="submit" color="success">
                                Сменить пароль
                            </v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-overlay>

        <div class="content">
            <h2>Мои тексты</h2>
        </div>

        <v-virtual-scroll :items="items" height="300" class="texts">
            <template v-slot:default="{ item, index }">
                <v-list-item :class="[
                    index % 2 === 0 ? 'py-2' : index % 5 == 0 ? 'py-8' : 'py-4',
                    index % 2 === 0 ? 'bg-grey-lighten-2' : index % 5 === 0 ? 'bg-grey-darken-2' : '',
                    'px-2'
                ]">
                    Dynamic item {{ item }}

                    <template v-slot:append>
                        <v-btn icon="mdi-cloud-upload" size="x-small" variant="tonal" class="textsButton" @click="download(item)"></v-btn>
                        <v-btn icon="mdi-pencil" size="x-small" variant="tonal" class="textsButton"></v-btn>
                    </template>
                </v-list-item>
            </template>
        </v-virtual-scroll>
    </v-app>
</template>
  

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MyTexts',
    data: () => ({
        overlayDelete: false,
        overlayPassword: false,
        // items:[]
    }),
    computed: {
        items() {
            return Array.from({ length: 1000 }, (k, v) => v + 1)
        },
    },
    methods:{
        download(item){
            console.log(item)
        }
    }
//     methods: {
//     async api () {
//       return new Promise(resolve => {
//         setTimeout(() => {
//           resolve(Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1))
//         }, 1000)
//       })
//     },
//     async load ({ done }) {
//       // Perform API call
//       const res = await this.api()

//       this.items.push(...res)

//       done('ok')
//     },
//   },
});
</script>

<style>
.deleteField {
    /* padding-left: 100px; */
    padding-inline: 100px;
}

.texts {
    margin-top: 10px;
}

.content {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Высота экрана минус высота шапки */
}

.textsButton {
    margin: 5px;
}
</style>