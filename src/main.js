import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

Vue.config.productionTip = false

Vue.use(Vuetify)

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
