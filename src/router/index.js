import Vue from 'vue'
import Router from 'vue-router'
import keg from '../components/keg/kegs';
import bottle from '../components/bottle/bottle';
import vueResource from 'vue-resource';
import sale from '../components/sale/sale'
import payment from '../components/buy/payment'
import brewery from '../components/brewery/brewery'
import pipes from '../components/Pipes/pipes'
import pricize from '../components/pricize/pricize'
import outflow from '../components/outflow/outflows'

Vue.use(vueResource)
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/keg',
      component: keg
    },
    {
      path: '/pricize',
      component: pricize
    },
    {
      path: '/buy',
      component: payment
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
      path: '/',
      component: pipes

    },
    {
      path: '/outflow',
      component: outflow

    }

  ]
})
