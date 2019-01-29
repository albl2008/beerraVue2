import Vue from 'vue'
import Router from 'vue-router'
import keg from '../components/keg/kegs';
import bottle from '../components/bottle/bottle';
import vueResource from 'vue-resource';
import sale from '../components/sale/sale'
import payment from '../components/buy/payment'
import brewery from '../components/brewery/brewery'
import pipes from '../components/Pipes/pipes'
import clients from '../components/clients/clients'

import index from '../components/index/index'
import signup from '../components/user/signup'
import signin from '../components/user/signin'
import verify from '../components/user/verify'
import recover from '../components/user/recoverPassword'
import dashboard from '../components/user/dashboard'
import resetPassword from '../components/user/resetPassword'
import resetUsername from '../components/user/recoverUsername'

import pricize from '../components/pricize/pricize'
import outflow from '../components/outflow/outflows'
import container from '../components/container/container'
import admin from '../components/user/admin'
import help from '../components/help/help'
import board from '../components/board/board'
import cash from '../components/cash/cash'

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
      component: keg,
      beforeEnter: isLogin
    },
    {
      path: '/pricize',
      component: pricize,
      beforeEnter: isLogin
    },
    {
      path: '/buy',
      component: payment,
      beforeEnter: isLogin
    },
    {
      path: '/brewery',
      component: brewery,
      beforeEnter: isLogin

    },
    {
      path: '/bottle',
      component: bottle,
      beforeEnter: isLogin

    },
    {
      path: '/sale',
      component: sale,
      beforeEnter: isLogin
    },
    {
      path: '/pipes',
      component: pipes,
      beforeEnter: isLogin
    },
    {
      path: '/container',
      component: container,
      beforeEnter: isLogin

    },
    {
      path: '/admin',
      component: admin,
      beforeEnter: isLogin

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
      path: '/cash',
      name: cash,
      component: cash
    },

  { path: '/help',
    name: help,
    component: help

  },

{ path: '/board',
name: board,
component: board

},
    {
      path: '/signin',
     
      component: signin,
      beforeEnter: redirectToDashboard
    },
    {
      path: '/signin/:message',
      name: signin,
      component: signin,
      beforeEnter: redirectToDashboard
    },
    {
      path: '/dashboard',
      name: dashboard,
      component: dashboard,
      beforeEnter: isLogin
    },
    {
      path: '/dashboard/:message',
      name: dashboard,
      component: dashboard,
      beforeEnter: isLogin
    },
    {
      path: '/outflow',
      component: outflow,
      beforeEnter: isLogin


    },
    {
      path: '/verify/',
      component: verify,
    },
    {
      path: '/recover',
      component: recover,
    },
    {
      path: '/resetPassword/:token',
      component: resetPassword,
    },
    {
      path: '/recoverUsername',
      component: resetUsername,
    },
    {
      path: '/clients',
      component: clients,
      beforeEnter:isLogin
    }
  ]
})
