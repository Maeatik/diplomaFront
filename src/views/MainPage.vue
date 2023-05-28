<template>
    <v-app class="app">
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>TextGrabber</v-toolbar-title>
            <v-spacer></v-spacer>

             <v-btn to="/account">Мой аккаунт</v-btn>


        </v-app-bar>

        <div class="form-container">
            <v-container bg fill-height grid-list-md text-xs-center class="container d-flex justify-center" fluid>
                <v-layout row wrap align-center class="text-center">
                    <v-row justify="center" align="center" class="h-100 justify-center">
                        <v-col cols="12" md="8" class="col-6">
                            <v-text-field v-model="url" label="Введите ссылку" :rules="[rules.required]">
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
                            <v-text-field v-model="tag" label="Введите теговое слово или фразу">
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
                            <v-btn color="primary" @click=handleClick>Собрать текст</v-btn>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </div>
    </v-app>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'MainPage',
    props: ['refresh'],
    data() {
        return {
            url: '',
            tag: '',
            token: '',
            data: { url: '', tag: '' },
            rules: {
                required: (value: any) => !!value || 'Введите ссылку',
            },
        };
    },

    methods: {
        handleClick(): void {
            this.data.url = this.url
            this.data.tag = this.tag
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            axios.post('http://localhost:8000/api/parse', this.data)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
            console.log('Button clicked');
        },
        showHelp(field: string) {
            if (field === 'link') {
                console.log('Button 1');
            } else if (field === 'keyword') {
                console.log('Button 2');
            }
        },
        isLoggedIn2() {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken !== null) {
                this.token = jwtToken
            }

            console.log(this.token)
            return !!this.token;
        },
    },
    watch: {
        refresh(newRefresh) {
            if (newRefresh) {
                this.isLoggedIn2(); // Вызов метода при изменении параметра refresh
            }
        }
    },
    computed: {
        isLoggedIn() {
            const jwtToken = localStorage.getItem('jwtToken');
            return !!jwtToken;
        },
    },
    created() {
        return this.isLoggedIn2();

        // const jwtToken = localStorage.getItem('jwtToken');
        // if (jwtToken !== null) {
        //     this.token = jwtToken
        // }

        // console.log(this.token)
        // return !!this.token;
    }
});
</script>

<style>
.container.d-flex.justify-center {
    align-items: center;
    width: 150vh;
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

