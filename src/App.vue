<template>
  <v-app id="app">
    <div class="container">
      <v-toolbar dark>
        <v-toolbar-title>Flux Trivia Quiz</v-toolbar-title>
        <v-spacer></v-spacer>
        <h4>{{ now }}</h4>
        <router-link to="/">
          <v-btn icon>
            <v-icon>home</v-icon>
          </v-btn>
        </router-link>
        <v-avatar>
          <img :src="user.photoURL" />
        </v-avatar>
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
      else {
        if(Object.keys(this.user).length === 0) {
          this.signIn()
        }
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
    }
  },
  computed: {
    now () {
      return moment().format('DD MMMM YYYY');
    },
    user () {
      return this.$store.state.user
    },
    userName () {
      return this.user.displayName.split(' ')[0]
    }
  }
}
</script>

<style lang="scss">
@import "../node_modules/vuetify/dist/vuetify.min.css";
@import "../node_modules/material-design-icons-iconfont/dist/material-design-icons.css";
@import "./assets/style/style.scss";
</style>
