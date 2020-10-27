<template>
  <div>
    <loading-screen v-if="isLoading"></loading-screen>
    <v-alert :value="error" type="error">{{ error }}</v-alert>

    <v-tabs fixed-tabs>
      <v-tab>
        Daily Leader
      </v-tab>
      <v-tab>
        Total Leader
      </v-tab>
      <v-tab-item>
        <v-card >
          <template>
            
          </template>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <template>
            <v-data-table :headers="headers" :items="leaderboardData" hide-actions class="elevation-1">
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.index + 1}}</td>
                <td class="text-xs-left">
                  <v-avatar>
                    <img :src="props.item.player_pic" />
                  </v-avatar>
                  {{ props.item.player_name}}
                </td>
                <td class="text-xs-left">{{ props.item.games_played}}</td>
                <td class="text-xs-left">{{ props.item.total_score}}</td>
              </template>
            </v-data-table>
          </template>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { db } from '../main'
import loadingScreen from '../components/loadingScreen'

export default {
  name: 'leaderboard',
  data () {
    return {
      isLoading: true,
      error: "",
      dailyleaderData: [],
      leaderboardData: [],
      headers: [
        { text: 'Rank', value: 'index', sortable: false, align: 'left' },
        { text: 'Name', value: 'player_name', sortable: false, align: 'left' },
        { text: 'Quiz played', value: 'games_played', sortable: false, align: 'left' },
        { text: 'Total Scores', value: 'total_score', sortable: false, align: 'left' }
      ],
      tabs: [ 'Daily Leader', 'Total Leader']
    }
  },
  methods: {
    loadLeaderBoardData () {
      db.collection('leaderboard').where('scores','>', 0).orderBy('scores', 'desc').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var data = doc.data()
          this.leaderboardData.push({
            player_name: data.player_name,
            player_pic: data.player_pic,
            games_played: data.games_played,
            total_score: data.scores
          })
        })
        this.isLoading = false
      })
      .catch((err) => {
        console.log(err)
        this.error = 'Error loading Leaderboard data, please try again later'
      })
    },
    loadDailyLeaderData () {
      console.log(this.today)
      db.collection('leaderboard').where('last_played', '>', this.today).get()
        .then((querySnapshot) => {
          console.log(querySnapshot)
          querySnapshot.forEach(() => {
            this.dailyleaderData.push({
            })
          })
        })
        .catch((err) => {
          console.log(err)
          this.error = 'Error loading Leaderboard data, please try again later'
        })
    }
  },
  created() {
    this.loadLeaderBoardData()
    this.loadDailyLeaderData()

    db.collection('testusers').doc('abc').set({
      name: 'Toh',
      gender: 'Male'
    })
  },
  computed: {
    today () {
      var today = new Date()
      today.setHours(0,0,0,0)
      return today.getTime()
    }
  },
  components: {
    loadingScreen
  }
}
</script>
