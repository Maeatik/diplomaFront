import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainPage from "../views/MainPage.vue"
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Account from '../views/UserAccount.vue'
import Text from '../views/TextPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/registration',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/text',
    name: 'Text',
    component: Text
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;