import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import VModel from '../views/VModel.vue'
import VFor from '../views/VFor.vue'
import VIf from '../views/VIf.vue'
import Select from '../views/Select.vue'
import Modal from '../views/Modal.vue'
import Input from '../views/Input.vue'
import Poker from '../views/Poker.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'about',
        name: 'About',
        component: About
      },
      {
        path: 'v-model',
        name: 'VModel',
        component: VModel
      },
      {
        path: 'v-for',
        name: 'VFor',
        component: VFor
      },
      {
        path: 'v-if',
        name: 'VIf',
        component: VIf
      },
      {
        path: 'select',
        name: 'Select',
        component: Select
      },
      {
        path: 'modal',
        name: 'Modal',
        component: Modal
      },
      {
        path: 'input',
        name: 'Input',
        component: Input
      },
      {
        path: 'poker',
        name: 'Poker',
        component: Poker
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

function getRouterMenu () {
  const menu = []
  routes[0].children.forEach(element => {
    menu.push({
      name: element.name,
      path: element.path
    })
  })
  return menu
}

const routerMenu = getRouterMenu()

router.beforeEach(function (to, from, next) {
  const check = routes[0].children.some((item, index, array) => item.name === to.name)
  if (check) {
    next()
  } else {
    next(false)
  }
})

export { routerMenu }
export default router
