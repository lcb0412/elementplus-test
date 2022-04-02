import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
    children:[
      {
        path: '/user1',
        name: 'user1',
        component: () => import(/* webpackChunkName: "about" */ '../views/User/User1.vue'),
      },
      {
        path: '/user2',
        name: 'user2',
        component: () => import(/* webpackChunkName: "about" */ '../views/User/User2.vue'),
      },
      {
        path: '/user3',
        name: 'user3',
        component: () => import(/* webpackChunkName: "about" */ '../views/User/User3.vue'),
      },
      {
        path: '/userMore',
        name: 'userMore',
        component: () => import(/* webpackChunkName: "about" */ '../views/User/UserMore.vue'),
      },
      {
        path: '/features',
        name: 'features',
        component: () => import(/* webpackChunkName: "about" */ '../views/Features/features.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import(/* webpackChunkName: "about" */ '../views/Setting/setting.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from,next) => {  
  (() => {
    const loadingInstance = ElLoading.service({
      fullscreen: true,
      lock: true,
      text: 'Loading',
      // background: 'rgba(0, 0, 0, 0.3)',
    })
    setTimeout(() => {
      loadingInstance.close()
      next()
    }, 1000)
  })()
  if(to.path !='/login'&&to.path !='/register'&&to.name!='404'&&sessionStorage.getItem('islogin')!='true'){
    ElMessage({
      showClose: true,
      message: '未登录！请先登录',
      type: 'error',
    })
    console.log('from',from.path)
    console.log(to.path)
    next('/login')
  }else{
    next()
  }
})

export default router
