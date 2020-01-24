// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Notifications from 'vue-notification'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
import VModal from 'vue-js-modal'
import ReactiveStorage from "vue-reactive-localstorage";
import pdf from 'vue-pdf'
import { Slide } from 'vue-burger-menu'
import Chart from 'vue2-frappe'
import EasySlider from 'vue-easy-slider'
import lang from 'element-ui/lib/locale/lang/es'
import locale from 'element-ui/lib/locale'
locale.use(lang)
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueDataTables from 'vue-data-tables'
Vue.use(ElementUI)
Vue.use(VueDataTables)
Vue.use(EasySlider)
Vue.use(Slide)
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
