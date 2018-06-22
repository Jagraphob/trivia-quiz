<template>
  <div>
    <loading-screen v-if="isLoading"></loading-screen>
    <v-alert :value="error" type="error">{{ error }}</v-alert>
    <v-card>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="question in questions" :key="question.Id">
            <v-card color="teal lighten-4">
              <h3>Question {{question.Id + 1}}: {{ question.question}}</h3>
              <v-radio-group v-model="answers[question.Id]">
                <v-radio v-for="ans in question.answers" :key="ans" :label="ans" :value="ans"></v-radio>
              </v-radio-group>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <div class="row">
        <v-layout row justify-center>
          <v-dialog v-model="dialog" persistent scrollable max-width="700">
            <v-btn slot="activator" color="success" large @click="submit">Submit</v-btn>
            <v-card>
              <v-card-title class="headline">Result: {{score}} out of 10</v-card-title>
              <v-card-text>
                <template>
                  <v-data-table :headers="headers" :items="result" hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-left">{{ props.item.Id}}</td>
                      <td class="text-xs-left">
                        <v-icon color="red" v-if="!props.item.correct">clear</v-icon>
                        <v-icon color="green" v-if="props.item.correct">check</v-icon></td>
                      <td class="text-xs-left">{{ props.item.answer}}</td>
                      <td class="text-xs-left">{{ props.item.correct_answer}}</td>
                    </template>
                  </v-data-table>
                </template>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link to="/">
                  <v-btn color="green darken-1" flat>Home</v-btn>
                </router-link>
                <router-link to="/leaderboard">
                  <v-btn color="green darken-1" flat>Leaderboard</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn color="warning" large @click="reset">Reset</v-btn>
        </v-layout>
      </div>
    </v-card>
    {{user}}
  </div>
</template>

<script>
import { db } from '../main'
import loadingScreen from '../components/loadingScreen'

export default {
  name: 'playcompetitive',
  data () {
    return {
      error: "",
      isLoading: true,
      questions: [],
      answers: [],
      dialog: false,
      headers: [
        { text: 'Question', value: 'Id', sortable: false, align: 'left' },
        { text: 'Result', value: 'correct', sortable: false, align: 'left' },
        { text: 'You answer', value: 'answer', sortable: false, align: 'left' },
        { text: 'Correct answer', value: 'correct_answer', sortable: false, align: 'left'},
      ]
    }
  },
  created () {
    var today = new Date()
    today.setHours(0,0,0,0)
    
    db.collection('quizset').where('date', '==', today).get().then((querySnapshot) => {
      console.log(querySnapshot)
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
        this.questions = doc.data().questions
        this.isLoading = false
      })} else {
        this.error = "Questions not loaded, try again later"
        this.isLoading = false
      }
    })
    .catch((err) => {
      console.log(err)
    })
  },
  methods: {
    reset () {
      this.answers = []
    },
    submit () {
      console.log("Score: " + this.score)
      //TODO: set score in leader board, the lock user out after he played for the day
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    result () {
      var mappedR = this.questions.map((question, index) => {
        
        return {
          Id: question.Id + 1,
          answer: this.answers[index],
          correct: question.correct_answer == this.answers[index],
          correct_answer: question.correct_answer
        }
      })
      return mappedR
    },
    score () {
      return this.result.filter((r) => {
        return r.correct == true
      }).length
    }
  },
  components: {
    loadingScreen
  }
}
</script>
