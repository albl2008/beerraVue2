import Vue from 'vue'
import Router from 'vue-router'
import keg from '../components/keg/kegs';
import bottle from '../components/bottle/bottle';
import vueResource from 'vue-resource';
import sale from '../components/sale/sale'
import brewery from '../components/brewery/brewery'
import pipes from '../components/Pipes/pipes'

Vue.use(vueResource)
Vue.use(Router);
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
      path: '/',
      component: pipes

    }

  ]
})
