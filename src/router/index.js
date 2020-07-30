import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/menu'
import ItemDetail from '../views/menu/item-detal'
import SignIn from '../views/sign-in'
import Order from '../views/order'
import ImageUploader from '../views/image-uploader'
import Account from '../views/account'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-in',
    name: 'SignInView',
    component: SignIn
  },
  {
    path: '/item-detail/:id',
    name: 'ItemDetailView',
    component: ItemDetail
  },
  {
    path: '/menu',
    name: 'MenuView',
    component: Menu
  },
  {
    path: '/Order',
    component: Order

  },
  {
    path: '/image-uploader',
    name: 'ImageUploaderView',
    component: ImageUploader
  },
  {
    path: '/account',
    name: 'AccountView',
    component: Account
  },
  {
    path: '*',
    redirect: '/menu'
  },
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
