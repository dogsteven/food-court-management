import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/menu'
import ItemDetail from '../views/menu/item-detal'
import SignIn from '../views/sign-in'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-in',
    component: SignIn
  },
  {
    path: '/item-detail/:id',
    component: ItemDetail
  },
  {
    path: '/menu',
    component: Menu
  },
  {
    path: '*',
    redirect: '/menu'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let isAtPublicPath = to.path === '/sign-in'
  let isSignedIn = localStorage.getItem('account') !== null
  if (isAtPublicPath && isSignedIn)
    next('/menu')
  else if (!isAtPublicPath && !isSignedIn)
    next('/sign-in')
  else
    next()
})

export default router
