import Vue from 'vue'
import Router from 'vue-router'
import keg from '../components/keg/kegs';
import vueResource from 'vue-resource';
import brewery from '../components/brewery/brewery'
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

    }
  ]
})
