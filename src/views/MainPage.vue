<template>
    <v-app class="app">
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>TextGrabber</v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-if="isLoggedIn">
                <v-btn>Мой аккаунт</v-btn>
            </template>
            <template v-else>
                <v-btn to="/registration">Регистрация</v-btn>
                <v-btn to="/login">Вход в систему</v-btn>
            </template>

        </v-app-bar>

        <div class="form-container">
            <v-container bg fill-height grid-list-md text-xs-center class="container d-flex justify-center" fluid>
                <v-layout row wrap align-center class="text-center">
                    <v-row justify="center" align="center" class="h-100 justify-center">
                        <v-col cols="12" md="8" class="col-6">
                            <v-text-field v-model="textField1" label="Введите ссылку" :rules="[rules.required]">
                                <template v-slot:append>
                                    <v-tooltip activator="parent" location="top"
                                        text="Введите ссылку на корень сайта, с которого вы хочете забрать текст">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" icon @click="showHelp('link')">
                                                <!-- Добавленная кнопка справки -->
                                                <v-icon>mdi-help-circle-outline</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-tooltip>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" class="col-4">
                            <v-text-field v-model="textField2" label="Введите теговое слово или фразу">
                                <template v-slot:append>
                                    <v-tooltip activator="parent" location="top"
                                        text="Вы можете ввести слово или фразу, по которой будет определяться релевантность текста">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" icon @click="showHelp('keyword')">
                                                <!-- Добавленная кнопка справки -->
                                                <v-icon>mdi-help-circle-outline</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-tooltip>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-btn color="primary">Собрать текст</v-btn>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </div>
    </v-app>
</template>
  
<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MainPage',
    data() {
        return {
            textField1: '',
            textField2: '',

            rules: {
                required: (value: any) => !!value || 'Введите ссылку',
            },
        }
    },

    methods: {
        handleClick(): void {
            console.log('Button clicked');
        },
        showHelp(field: string) {
            if (field == 'link') {
                console.log('Button 1');
            } else if (field == 'keyword') {
                console.log('Button 2');
            }
        }
    },
    computed: {
        isLoggedIn() {
            // Проверка наличия сохраненного JWT токена
            // const token = localStorage.getItem('jwtToken');
            // return !!token;
            return true
        }
    }
})
</script>

<style>
/* .app {
    background-image: url('https://cdn-edge.kwork.ru/pics/t3/77/739464-1546954541.jpg');
    background-size: cover;
    background-position: center;
} */

.container {
    width: 150vh;

}

.container.d-flex.justify-center {
    align-items: center;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.absolute {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}

.container>.row {
    flex-wrap: nowrap;
}
</style>

