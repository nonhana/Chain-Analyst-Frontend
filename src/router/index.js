import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/upload/index.vue')
  },
  {
    path: "/details/:id",
    name: "details",
    component: () => import('@/views/details/index.vue')
  },
  {
    path: '/personalCenter/:id',
    name: 'personalCenter',
    redirect: "/MyInfo/:id",
    component: () => import('../views/personalCenter/index.vue'),
    children: [{
      path: '/MyInfo/:id',
      name: 'MyInfo',
      component: () => import('../components/ModelPersonalCenter/MyInfo.vue'),
    }]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
