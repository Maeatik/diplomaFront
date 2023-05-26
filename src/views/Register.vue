<template>
  <v-app>
    <v-main>

      <v-alert v-if="showErrorPass" type="error" dense>
        Пароли не совпадают
      </v-alert>

      <v-alert v-if="showErrorValues" type="error" dense>
        Проверьте введенные значения
      </v-alert>

      <div class="form-container">
        <v-card text="Регистрация" class="text-center">

          <v-container fluid>
            <v-row justify="center">
              <v-col class="dialog-content" cols="16" sm="9" md="0">
                <v-card>
                  <v-card-text>
                    <v-form @submit.prevent="submitForm">

                      <v-text-field v-model="login" label="Логин" :rules="[rules.required]" outlined
                        required></v-text-field>


                      <v-text-field v-model="password" label="Пароль" hint="Введите пароль для доступа к сервису"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'" counter @click:append="show1 = !show1" outlined
                        required></v-text-field>


                      <v-text-field v-model="rePassword" label="Повторите пароль" hint="Повторите пароль"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]"
                        :type="show1 ? 'text' : 'password'" counter @click:append="show1 = !show1" outlined
                        required></v-text-field>


                      <div class="text-center">
                        <v-btn justify-content="center" type="submit" color="primary" @click="checkPasswords">
                          Отправить
                        </v-btn>
                      </div>
                      <router-link to="/login">Уже зарегистрированы?</router-link>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>
  
<script lang='ts'>
import { defineComponent } from 'vue'
import axios from 'axios';

export default defineComponent({
  name: 'Register',
  data() {
    return {
      login: '',
      rePassword: '',
      show1: false,
      show2: true,
      password: '',
      showErrorPass: false,
      showErrorValues: false,
      userData: { name: '', password: '' },

      rules: {
        required: (value: any) => !!value || 'Required.',
        min: (v: string | any[]) => v.length >= 8 || 'Минимум 8 символов',
      },
    }
  },
  methods: {
    checkPasswords() {
      if (this.password !== "" && this.rePassword !== "" && this.login !== "") {
        this.showErrorValues = false
        if (this.password !== this.rePassword) {
          this.showErrorPass = true;
        } else {

          this.userData = {
            name: this.login,
            password: this.password
          }

          console.log(this.userData.name)
          axios.post('http://localhost:8000/auth/register', this.userData)
            .then(response => {
              console.log(response.data);

              axios.post('http://localhost:8000/auth/login', this.userData)
                .then(response => {
                  localStorage.setItem('jwtToken', response.data.id);
                  console.log(localStorage.getItem('jwtToken'));
                }).catch(error => {
                  console.error(error);
                });
            })
            .catch(error => {
              console.error(error);
            });

        }
      } else {
        this.showErrorPass = false;
        this.showErrorValues = true
      }

    },
    submitForm() {
      if (this.password != this.rePassword) {
        this.showErrorPass = true;
        return
      }

      this.$router.push('/');

      console.log('Отправлено:', this.login, this.password, this.rePassword);
    },
  }
})
</script>

<style>
.v-dialog--active .v-dialog__content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.dialog-content {
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  width: 100vh;
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
  /* Position it at the top */
  left: 50%;
  /* Horizontally center it */
  transform: translateX(-50%);
  /* Adjust horizontally centering */
}
</style>