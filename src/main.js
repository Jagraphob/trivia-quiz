import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM DD YYYY')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
