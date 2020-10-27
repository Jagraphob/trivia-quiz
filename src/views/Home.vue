<template>
  <div>
      <v-card>
        <v-container grid-list-lg text-xs-center>
          <v-layout row wrap>
              <v-flex xs12 sm6 offset-sm3>
                <router-link to="/quickplay">
                <v-card color="blue-grey darken-2" class="white--text" height="80px">
                    <h1 class="text-xs-center custom-padding">Quick Play</h1>
                </v-card>
                </router-link>
              </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <router-link to="/competitive">
                <v-card color="deep-purple darken-2" class="white--text" height="80px">
                  <h1 class="text-xs-center custom-padding">Competitive</h1>
                </v-card>
              </router-link>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3>
              <router-link to="/leaderboard">
                <v-card color="cyan darken-2" class="white--text" height="80px">
                    <h1 class="text-xs-center custom-padding">Leaderboard</h1>
                </v-card>
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
  </div>
</template>

<script>
import { db } from '../main'

export default {
  name: 'home',
  data () {
    return {
      error: ""
    }
  },
  created() {

    
    db.collection('users').doc(this.user.uid).get().then((doc) => {
      if(!doc.exists) {
        db.collection('users').doc(this.user.uid).set({
          displayName: this.user.displayName,
          email: this.user.email,
          photoURL: this.user.photoURL
        })
        .then(() => {
          console.log("Add user to firestore success")
        })
        .catch((error) => {
          console.log(error)
        })
      }
    })
  },
  methods: {

  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
