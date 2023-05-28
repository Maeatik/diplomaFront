import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainPage from "../views/MainPage.vue"
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Account from '../views/UserAccount.vue'
import Text from '../views/TextPage.vue'
import LogSignPage from '../views/LogSignPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'LogSignPage',
    component:LogSignPage
  },
  {
    path: '/textgrabber',
    name: 'MainPage',
    component: MainPage,
    props: (route) => ({ refresh: route.query.refresh })
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
    path: '/text/:id&:textid',
    name: 'Text',
    component: Text
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;