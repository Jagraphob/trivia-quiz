<template>
  <v-app>
    <div class="container" id="app">
      <v-toolbar dark>
        <v-toolbar-title>Flux Trivia Quiz</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat>{{new Date() | formatDate}}</v-btn>
        </v-toolbar-items>
        <router-link to="/">
          <v-btn icon>
            <v-icon>home</v-icon>
          </v-btn>
        </router-link>
        <v-btn icon>
          <v-icon>person</v-icon>
        </v-btn>
      </v-toolbar>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {

    }
  }
}
</script>


<style lang="scss">
@import "../node_modules/vuetify/dist/vuetify.min.css";
@import "../node_modules/material-design-icons-iconfont/dist/material-design-icons.css";
@import "./assets/style/style.scss";
</style>
