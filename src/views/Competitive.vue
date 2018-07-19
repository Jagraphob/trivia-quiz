<template>
  <div>
    <loading-screen v-if="isLoading"></loading-screen>
    <v-alert :value="error" type="error">{{ error }}</v-alert>
    <v-card>
      <v-jumbotron color="deep-purple darken-2" dark >
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-2">COMPETITIVE</h3>
            <v-divider class="my-3"></v-divider>
            <h4 class="display-3"><u>Rules</u></h4>
            <p class="display-1">You can play once a day</p>
            <p class="display-1">Question changes everyday</p>
            <p class="display-1">Everyone plays the same question. Please don't share answers !!</p>
            <router-link v-if="!playedToday" to="/playcomp">
              <v-btn large color="error">START</v-btn>
            </router-link>
            <p v-if="playedToday" class="red">== You have played today, please come back tomorrow ==</p>
          </v-flex>
        </v-layout>
      </v-jumbotron>
    </v-card>
    {{ user }}
  </div>
</template>

<script>
import { db } from '../main'
import axios from 'axios'
import loadingScreen from '../components/loadingScreen'

export default {
  name: 'competitive',
  data () {
    return {
      isLoading: true,
      error: "",
      playedToday: false
    }
  },
  created () {
    this.checkPlayedToday()
    this.loadQuestionfromAPI()
  },
  methods: {
    shuffle (a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      } 

      return a;
    },
    decodeHTMLEntities (text) {
      var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#039', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"'],
        ['&ldquo;', '"'],
        ['&ldquo;', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
    },
    loadQuestionfromAPI () {
      db.collection('quizset').where('date', '==', this.today).get().then((querySnapshot) => {
        if (!querySnapshot.empty) {
          this.isLoading = false
        } else {
          axios.get('https://opentdb.com/api.php?amount=10&type=multiple&difficulty=easy')
            .then((response) => {
              var mappedQ = response.data.results.map((q ,index) => {
                var ans = q.incorrect_answers
                ans.push(q.correct_answer)
                ans = this.shuffle(ans)
                ans = ans.map((item) => {
                  return this.decodeHTMLEntities(item)
                })
                return {
                  Id: index,
                  question: this.decodeHTMLEntities(q.question),
                  answers: ans,
                  correct_answer: this.decodeHTMLEntities(q.correct_answer)
                }
              })
              db.collection('quizset').add({
                date: this.today,
                questions: mappedQ
              }).then((docRef) => {
                console.log("added quizset with ID: " + docRef.id)
              }).catch((err) => {
                console.log(err)
              })
            })
            .catch((error) => {
              console.log(error)
              this.error = "Error Loading Quiz API, please try again later"
              this.isLoading = false
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    checkPlayedToday () {
      db.collection('leaderboard').doc(this.user.uid).get().then((doc) => {
        if (doc.exists) {
          console.log(doc.data())
          var lastPlayed = doc.data().last_played
          if (lastPlayed && (lastPlayed.seconds * 1000 == this.today.getTime())) {
            this.playedToday = true
          }
        } else {
          db.collection('leaderboard').doc(this.user.uid).set({
            player_name: this.user.displayName,
            games_played: 0,
            last_played: null,
            scores: 0            
          })
        }
      })
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }, 
    today () {
      var today = new Date()
      today.setHours(0,0,0,0)
      return today
    }
  },
  components: {
    loadingScreen
  }
}
</script>

