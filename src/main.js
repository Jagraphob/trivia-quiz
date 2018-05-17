import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import moment from 'moment'
import firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM DD YYYY')
  }
})

var config = {
  apiKey: "AIzaSyBWWqpSCqqIzMDrNiJSVyhXO_3V7cefIv0",
  authDomain: "flux-trivia-quiz.firebaseapp.com",
  databaseURL: "https://flux-trivia-quiz.firebaseio.com",
  projectId: "flux-trivia-quiz",
  storageBucket: "flux-trivia-quiz.appspot.com",
  messagingSenderId: "1099426153481"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
