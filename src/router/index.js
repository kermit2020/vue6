import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import pay from '../components/pay.vue'
import Category from '../components/Category.vue'
import Cart from '../components/Cart.vue'
import User from '../components/User.vue'
import goods_list from '../components/goods_list.vue'
import detail from '../components/goods_detail.vue'
import search from '../components/search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
    
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      showFooter: true,
      isKeep: true
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      showFooter: true,
      isKeep: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/goods_list',
    name: 'goods_list',
    component: goods_list,
    meta: {
      isKeep: true
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/pay',
    component: pay
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../components/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
