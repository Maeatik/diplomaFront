<template>
    <v-app>
        <v-main>
            <v-container fluid class="fill-height">
                <v-row align="center" justify="center" class="text-center fill-height">
                    <v-col cols="12">
                        <h1>TextGrabber</h1>
                    </v-col>
                    <v-col cols="12">
                        <v-row align="center" justify="center">
                            <v-col cols="6" sm="6">
                                <v-card class="clickable-card card reg" @click="handleReg()">
                                    <v-card-text class="card-text">
                                        Регистрация
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="6" sm="6">
                                <v-card class="clickable-card card log" @click="handleIn()" >
                                    <v-card-text class="card-text">
                                        Вход в аккаунт
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script>
export default {
    methods: {
        handleClick(area) {
            // Обработка клика по области
            console.log(`Вы кликнули по области ${area}`);
        },
        handleIn(){
            this.$router.push("/login")
        },
        handleReg(){
            this.$router.push("/registration")
        }
    },
};
</script>
  
<style>
.fill-height {
    height: 100vh;
}

.clickable-card {
    cursor: pointer;
    padding-bottom: 35%;
    padding-top: 35%;
   
    background-color: #00ffff;
}
.reg{
    margin-left: 20%;
    margin-right: 5%;
}
.log{
    margin-right: 20%;
    margin-left: 5%;
}
.clickable-card:hover {
    background-color: #125858;
}

.clickable-card:hover .card-text{
    color: aliceblue;
}
</style>
  