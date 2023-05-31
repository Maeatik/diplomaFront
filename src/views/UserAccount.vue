<template>
    <v-app class="app">
        <v-app-bar app color="#AFEEEE" dark>
            <v-toolbar-title class="font" style="font-size: 35px; font-weight: 700;">TEXTGrabber</v-toolbar-title>

            <v-spacer></v-spacer>
            <div class="d-flex justify-space-around">
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
                    </template>

                    <v-list class="flex-column">
                        <v-btn variant="plain" class="w-100 font" to="/textgrabber">Вернуться на главную</v-btn>
                        <v-btn variant="plain" class="w-100 font" @click="overlayPassword = !overlayPassword">Сменить
                            пароль</v-btn>
                        <v-btn variant="plain" class="w-100 font" @click=logout() to="/">Выйти из аккаунта
                        </v-btn>
                        <v-btn variant="plain" class="w-100 font" @click="overlayDelete = !overlayDelete">Удалить аккаунт</v-btn>
                    </v-list>
                </v-menu>
            </div>
        </v-app-bar>

        <v-overlay v-model="overlayDelete" contained class="align-center justify-center">
            <v-card>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="pass" class="font" label="Введите пароль" outlined required></v-text-field>
                        <v-text-field v-model="check_pass" class="font" label="Введите повторно пароль"></v-text-field>

                        <v-tooltip activator="deleteField" class="font" location="top" text="Это действие нельзя обратить">
                            <template v-slot:activator="{ props }">
                                <div class="text-center deleteField">
                                    <v-btn class="font" v-bind="props"  style="font-size: 14px; font-weight: 700;" justify-content="center" color="error" @click="deleteUser()"
                                        to="/">
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
                        <v-text-field v-model="old" class="font" label="Введите старый пароль" outlined required></v-text-field>
                        <v-text-field v-model="newPass" class="font" label="Введите новый пароль" outlined required></v-text-field>
                        <v-text-field v-model="reNewPass" class="font" label="Введите повторно новый пароль"></v-text-field>
                        <div class="text-center deleteField">
                            <v-btn justify-content="center" class="font" style="font-size: 14px; font-weight: 700;" type="submit" color="success" @click="changePassword()">
                                Сменить пароль
                            </v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-overlay>

        <v-card v-if="hasTexts" class="content" max-height="90%">
            <v-card-title class="titlecard font" style="font-size: 40px; font-weight: 700;">
                Мои тексты
            </v-card-title>
            <v-virtual-scroll v-if="hasTexts" :items="textItems" height="70%" class="texts">
                <template v-slot:default="{ item, index }">
                    <v-list-item :class="[
                        'my-2',
                        'rounded-lg',
                        'elevation-1',
                        index % 2 === 0 ? 'bg-grey-lighten-2' : index % 5 === 0 ? 'LawnGreen' : '',
                        'px-2'
                    ]" style="border-color: black;  background-color:#AFEEEE">
                        <v-text class="font" style="white-space: nowrap;">{{ item.url }}</v-text>


                        <template v-slot:append>
                            <v-text class="tag justify-end font">{{ item.tag }}</v-text>
                            <v-text class="date font">{{ item.date }}</v-text>
                            <v-btn icon="mdi-cloud-upload" size="x-small" variant="tonal" class="textsButton"
                                @click="download(item)"></v-btn>
                            <v-btn icon="mdi-pencil" size="x-small" variant="tonal" class="textsButton"
                                @click="toText(item)"></v-btn>
                            <v-btn icon="mdi-delete" size="x-small" variant="tonal" class="textsButton"
                                @click="deleteSite(item)"></v-btn>
                        </template>
                    </v-list-item>
                </template>
            </v-virtual-scroll>
        </v-card>
        <v-card v-if="!hasTexts" class="content">
            <v-card-title>У вас пока нет текстов</v-card-title>
        </v-card>
    </v-app>
    <v-footer class="flex-column">
        <div class="bg-teal d-flex  w-100">
            <strong>Проект расположен в открытом доступе</strong>

            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="plain" size="small"></v-btn>
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
    name: 'MyTexts',
    data: () => ({
        token: '',
        old: '',
        reNewPass: '',
        newPass: '',
        pass: '',
        check_pass: '',
        hasTexts: false,
        overlayDelete: false,
        overlayPassword: false,
        sitesdata: { id: 0, site_id: 0, text: '' },
        textItems: [],
        downloadData: {},
        deleteData: { password: "" },
        userData: { password: "", new_password: "" },
        icons: [
            'mdi-github',
        ],
    }),
    mounted() {
        this.getSitesLists().then(response => {
            this.hasTexts = true
            this.textItems = response.data;
            console.log(this.textItems);
            this.sortTextItems();
        }).catch(error => {
            this.hasTexts = false
        });
    },

    methods: {
        sortTextItems() {
            if (this.hasTexts) {
                this.textItems.sort((a, b) => {
                    const urlA = parseInt(a.id_site);
                    const urlB = parseInt(b.id_site);
                    return urlA - urlB;
                });
            }
        },
        getSitesLists() {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken !== null) {
                this.token = jwtToken
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            return axios.get('http://localhost:8000/api/sites/')
        },
        deleteSite(item) {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken !== null) {
                this.token = jwtToken
            }
            console.log(item.id)

            const idsite = parseInt(item.id_site, 10);

            this.downloadData = { id: idsite }

            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            const resp = axios.delete('http://localhost:8000/api/sites/site', {
                headers: {
                    'X-Data': JSON.stringify(this.downloadData)
                },
            })
                .then(() => {
                    const index = this.textItems.findIndex((el) => el.id_site === item.id_site);
                    if (index !== -1) {
                        this.textItems.splice(index, 1);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        download(item) {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken !== null) {
                this.token = jwtToken
            }
            console.log(item.id)

            const idtext = parseInt(item.id_text, 10);
            const idsite = parseInt(item.id_site, 10);

            this.downloadData = { id: idtext, site_id: idsite }

            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            const resp = axios.get('http://localhost:8000/api/download', {
                headers: {
                    'X-Data': JSON.stringify(this.downloadData)
                },
                responseType: 'blob'
            }).then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'document.doc');
                document.body.appendChild(link);
                link.click();
            })
                .catch(error => {
                    console.error('Ошибка при скачивании файла:', error);
                });

            console.log(resp)
            return resp
        },
        logout() {
            localStorage.removeItem('jwtToken');
        },
        toText(item) {
            console.log(item)
            this.$router.push({
                name: 'Text',
                params: { id: item.id_site, textid: item.id_text }
            });
        },
        async changePassword() {
            if (this.reNewPass == this.newPass) {
                const jwtToken = localStorage.getItem('jwtToken');
                if (jwtToken !== null) {
                    this.token = jwtToken
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

                this.userData.password = this.old
                this.userData.new_password = this.newPass

                try {
                    await axios.put('http://localhost:8000/api/passwordChange', this.userData);
                } catch (error) {
                    console.error(error);
                }
            }
        },

        async deleteUser() {
            if (this.pass == this.check_pass) {
                this.deleteData.password = this.pass
                try {
                    await axios.delete('http://localhost:8000/api/users/client', {
                        headers: {
                            'X-Data': JSON.stringify(this.deleteData)
                        },
                    });
                    localStorage.removeItem('jwtToken')
                    this.$router.push('/')
                } catch (error) {
                    console.error(error);
                }
            }
        },

    }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;700&display=swap');


.font {
    font-family: 'Roboto Condensed'
}

.deleteField {
    padding-inline: 100px;
}

.my-2 {
    margin-top: 8px;
    margin-bottom: 8px;
}

.rounded-lg {
    border: 50px solid black;
    border-radius: 10px;
    padding: 8px;
}

.black--text {
    color: black;
    font-weight: bold;
}

.texts {
    margin-top: 10px;
    width: 100%;
    overflow-x: hidden;
}

.titlecard {
    margin-top: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    margin-top: 100px;
    padding-inline: 5%;
    overflow-x: hidden;
}

.textsButton {
    margin: 5px;
}

.tag {
    background-color: white;
    background-size: 20%;
    border-radius: 8px;
    padding: 4px 8px;
}

.date {
    background-size: 20%;
    border-radius: 8px;
    padding: 4px 8px;
    white-space: nowrap;
}
</style>