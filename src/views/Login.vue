<template>
  <v-app>
    <v-main>

      <v-alert v-if="showErrorValues" type="error" dense>
        Проверьте введенные значения
      </v-alert>

      <div class="form-container">
        <v-card class="text-center" color="#00CED1">
          <v-card-title class="card-title text">ВХОД В АККАУНТ</v-card-title>
          <v-container fluid>
            <v-row justify="center">
              <v-col class="dialog-content" cols="16" sm="9" md="0">
                <v-card color="#AFEEEE">
                  <v-card-text>
                    <v-form @submit.prevent="submitForm">

                      <v-text-field v-model="login" class="text" label="Логин" :rules="[rules.required]" outlined
                        required></v-text-field>


                      <v-text-field v-model="password" class="text" label="Пароль" hint="Введите пароль для доступа к сервису"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'" counter @click:append="show1 = !show1" outlined
                        required></v-text-field>


                      <div class="text-center">
                        <v-btn justify-content="center" type="submit" color="#00CED1" class="text_bt" @click="submitForm">
                          Отправить
                        </v-btn>
                      </div>

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
  name: 'Login',
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
        required: (value: any) => !!value || 'Обязательно для заполния.',
        min: (v: string | any[]) => v.length >= 6 || 'Минимум 6 символов',
      },
    }
  },
  methods: {
    submitForm() {

      this.userData = {
        name: this.login,
        password: this.password
      }

      console.log(this.userData.name)
      axios.post('http://localhost:8000/auth/login', this.userData)
        .then(response => {
          localStorage.setItem('jwtToken', response.data.id);
          this.$router.push('/textgrabber');
        })
        .catch(error => {
          console.error(error);
        });


      
      console.log('Отправлено:', this.login, this.password, this.rePassword);
    }
  }
})
</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;700&display=swap');

.text_bt{
  font-size: 20px;
  font-weight: 700;
  font-family: 'Roboto Condensed';
}
.text{
  font-size: 20px;
  font-family: 'Roboto Condensed', sans-serif;
}
.card-title {
  margin-top: 2%;
  color: white;
}


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