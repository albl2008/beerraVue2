// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Notifications from 'vue-notification'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
import VModal from 'vue-js-modal'
import persistentState from 'vue-persistent-state'
import ReactiveStorage from "vue-reactive-localstorage";
import pdf from 'vue-pdf'
import { Slide } from 'vue-burger-menu'
import Chart from 'vue2-frappe'
import EasySlider from 'vue-easy-slider'
 
Vue.use(EasySlider)
Vue.use(Slide)
Vue.use(Chart)
Vue.use(pdf)
Vue.use(Chart)
Vue.use(ReactiveStorage,{
  load: false
})
Vue.use(VModal, { dynamic: true }) 

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(Notifications)
/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
