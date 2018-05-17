<template>
  <v-app id="app">
    <div class="container">
      <v-toolbar dark>
        <v-toolbar-title>Flux Trivia Quiz</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat>{{now}}</v-btn>
        </v-toolbar-items>
        <router-link to="/">
          <v-btn icon>
            <v-icon>home</v-icon>
          </v-btn>
        </router-link>
        <v-btn icon @click="signIn">
          <v-icon>person</v-icon>
        </v-btn>
      </v-toolbar>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import moment from 'moment'

export default {
  name: 'app',
  created () {
    firebase.auth().getRedirectResult().then((result) => {
      if(result.credential) {
        var token = result.credential.accessToken;
        var user = result.user

        this.$store.commit('signInUser', {user, token})
      }
    })
  },
  data() {
    return {

    }
  },
  methods: {
    signIn() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      firebase.auth().signInWithRedirect(provider)
      // firebase.auth().signInWithPopup(provider).then((result) => {
      //   var token = result.credential.accessToken;
      //   var user = result.user

      //   this.$store.commit('signInUser', {user: user, token: token})
      // })
    }
  },
  computed: {
    now () {
      return moment().format('DD MMMM YYYY');
    }
  }
}
</script>


<style lang="scss">
@import "../node_modules/vuetify/dist/vuetify.min.css";
@import "../node_modules/material-design-icons-iconfont/dist/material-design-icons.css";
@import "./assets/style/style.scss";
</style>
