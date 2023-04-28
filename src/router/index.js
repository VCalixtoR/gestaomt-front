import { createRouter, createWebHashHistory } from 'vue-router'
import AdmCloseEmployeeView from '../views/AdmCloseEmployeeView.vue'
import AdmEmployeeView from '../views/AdmEmployeeView.vue'
import AdmEventsView from '../views/AdmEventsView.vue'
import ClientCreView from '../views/ClientCreView.vue'
import ClientUpdView from '../views/ClientUpdView.vue'
import ClientVisView from '../views/ClientVisView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProductCreView from '../views/ProductCreView.vue'
import ProductVisView from '../views/ProductVisView.vue'
import SaleCreView from '../views/SaleCreView.vue'
import SaleVisView from '../views/SaleVisView.vue'
import SignView from '../views/SignView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: SignView
  },
  {
    path: '/cadastrocliente',
    name: 'cadastrocliente',
    component: ClientCreView
  },
  {
    path: '/vercliente',
    name: 'vercliente',
    component: ClientVisView
  },
  {
    path: '/alterarcliente',
    name: 'alterarcliente',
    component: ClientUpdView
  },
  {
    path: '/cadastrarproduto',
    name: 'cadastrarproduto',
    component: ProductCreView
  },
  {
    path: '/verproduto',
    name: 'verproduto',
    component: ProductVisView
  },
  {
    path: '/cadastrarvenda',
    name: 'cadastrarvenda',
    component: SaleCreView
  },
  {
    path: '/vervenda',
    name: 'vervenda',
    component: SaleVisView
  },
  {
    path: '/admin/funcionarios',
    name: 'admfuncionarios',
    component: AdmEmployeeView
  },
  {
    path: '/admin/fechamentofuncionario',
    name: 'admfechamentofuncionarios',
    component: AdmCloseEmployeeView
  },
  {
    path: '/admin/eventos',
    name: 'admeventos',
    component: AdmEventsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router