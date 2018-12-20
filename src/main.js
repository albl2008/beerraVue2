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
import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'
const initialState = {
  isLoggIn: false
};
import Chart from 'vue2-frappe'

Vue.use(Chart)

Vue.use(Chart)
Vue.use(persistentState,initialState)
Vue.use(VModal, { dynamic: true }) 
Vue.use(VueGlide)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(Notifications)
/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
