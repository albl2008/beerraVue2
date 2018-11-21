import Vue from 'vue'
import Router from 'vue-router'
import keg from '../components/keg/kegs';
import bottle from '../components/bottle/bottle';
import vueResource from 'vue-resource';
import sale from '../components/sale/sale'
import brewery from '../components/brewery/brewery'
import pipes from '../components/Pipes/pipes'
import index from '../components/index/index'
import signup from '../components/user/signup'
import signin from '../components/user/signin'
import dashboard from '../components/user/dashboard'

Vue.use(vueResource)
Vue.use(Router);

function redirectToDashboard(to, from, next)  {
  if(localStorage.token){
    next('/dashboard')
  }else{
    next()
  }
}
function isLogin(to, from, next)  {
  if(localStorage.token){
    next()
  }else{
    next('/signin')
  }
}
export default new Router({
  routes: [
    {
      path: '/keg',
      component: keg
    },
    {
      path: '/brewery',
      component: brewery

    },
    {
      path: '/bottle',
      component: bottle

    },
    {
      path: '/sale',
      component: sale

    },
    {
      path: '/pipes',
      component: pipes

    },
    {
      path: '/',
      component: index

    },
    {
      path: '/signup',
      name: signup,
      component: signup,
      beforeEnter: redirectToDashboard
    },
    {
      path: '/signin',
      name: signin,
      component: signin,
      beforeEnter: redirectToDashboard
    },
    {
      path: '/dashboard',
      name: dashboard,
      component: dashboard,
      beforeEnter: isLogin
    }
  ]
})
