<template>
    <v-app class="app">
        <v-app-bar app color="#AFEEEE" dark>
            <v-toolbar-title class="font" style="font-size: 35px; font-weight: 700;">TEXTGrabber</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn class="btn font" style="font-size: 14px; font-weight: 700;" to="/account">Мой аккаунт</v-btn>

        </v-app-bar>

        <div class="form-container">
            <v-container class="container d-flex justify-center" fluid>
                <v-layout class="text-center">
                    <v-row justify="center" align="center" class="h-100 justify-center">
                        <v-col cols="12" md="8" class="col-6">
                            <v-text-field v-model="url" class="font" label="Введите ссылку" :rules="[rules.required]">
                                <template v-slot:append>
                                    <v-tooltip activator="parent" class="font" location="top"
                                        text="Введите ссылку на корень сайта, с которого вы хочете забрать текст">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" icon @click="showHelp('link')">
                                                <v-icon>mdi-help-circle-outline</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-tooltip>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" class="col-4">
                            <v-text-field v-model="tag" class="font" label="Введите теговое слово или фразу">
                                <template v-slot:append>
                                    <v-tooltip activator="parent" class="font" location="top"
                                        text="Вы можете ввести слово или фразу, по которой будет определяться релевантность текста">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" icon @click="showHelp('keyword')">
                                                <v-icon>mdi-help-circle-outline</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-tooltip>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-btn color="#00CED1" @click=handleClick class="btn font"
                                style="font-size: 14px; font-weight: 700;">Собрать текст
                                <v-progress-circular v-if="isLoading" indeterminate size="24"
                                    color="white"></v-progress-circular></v-btn>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>
        </div>
    </v-app>
    <v-footer class="flex-column">
        <div class="bg-teal d-flex  w-100">
            <strong>Проект расположен в открытом доступе</strong>

            <v-spacer></v-spacer>
            <a href="https://github.com/Maeatik">
                <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="plain" size="small"></v-btn>
            </a>
        </div>

        <div class="bg-black text-center w-100">
            {{ new Date().getFullYear() }} — <strong>КФУ</strong>
        </div>
    </v-footer>
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
            icons: [
                'mdi-github',
            ],
            links: [
                'https://github.com/Maeatik/VKR'
            ],
            isLoading: false,
        };
    },

    methods: {
        handleClick(): void {
            this.isLoading = true;
            this.data.url = this.url
            this.data.tag = this.tag
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            axios.post('http://localhost:8000/api/parse', this.data)
                .then(response => {
                    console.log(response.data);
                    this.isLoading = false;
                    this.$router.push('/account')
                })
                .catch(error => {
                    console.error(error);
                    this.isLoading = false;
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
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;700&display=swap');

.font {
    font-family: 'Roboto Condensed';
}

.container.d-flex.justify-center {
    width: 150vh;
    height: 200px;
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

.btn {
    color: #000000;

    align-content: center;
    border: none;
    background-color: #30ac59;
    border-radius: 12px;
    border: 5px solid #003512;
    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
}

.btn:hover {
    color: #ffffff !important;
    background-color: transparent;
    text-shadow: rgb(110, 6, 6);
}

.btn:active {
    color: #834b4b;
    border: none;
}

.btn:hover:before {
    right: 0%;
    left: auto;
    width: 100%;
}

btn:before {
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 0px;
    z-index: -1;
    content: '';
    border: none;

    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
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

.v-footer {
    padding: 0;
    margin-top: auto;
    width: 100%;
}
</style>

