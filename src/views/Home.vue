<template>
  <div>
      <v-card>
        <v-container grid-list-lg>
          <v-layout row wrap>
              <v-flex xs12>
                <router-link to="/play">
                <v-card color="blue-grey darken-2" class="white--text">
                  <v-card-title primary-title>
                    <div class="headline">PLAY</div>
                  </v-card-title>
                </v-card>
                </router-link>
              </v-flex>
            <v-flex xs12>
              <v-card color="deep-purple darken-2" class="white--text">
                <v-card-title primary-title>
                  <div class="headline">Your records</div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-card color="cyan darken-2" class="white--text">
                <v-card-title primary-title>
                  <div class="headline">Ranking</div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      {{user}}
  </div>
</template>

<script>
export default {
  name: 'home',
  created() {
    var user = this.$store.state.user
    console.log(user)
    if(!user) {
      this.signIn()
    }
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
