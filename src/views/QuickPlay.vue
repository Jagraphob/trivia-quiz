<template>
  <div>
    <loading-screen v-if="isLoading"></loading-screen>
    <v-alert :value="error" type="error">{{ error }}</v-alert>
    <v-card>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="question in questions" :key="question.question">
            <v-card color="teal lighten-4">
              <h3 class="headline">Question {{question.Id + 1}}: {{ question.question}}</h3>
              <v-radio-group v-model="answers[question.Id]">
                <v-radio v-for="ans in question.answers" :key="ans" :label="ans" :value="ans"></v-radio>
              </v-radio-group>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <div class="row">
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent scrollable max-width="700">
          <v-btn slot="activator" color="success" large>Submit</v-btn>
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
              <v-btn color="green darken-1" flat @click="reload">Play Again</v-btn>
              <router-link to="/">
                <v-btn color="green darken-1" flat>Home</v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn color="warning" large @click="reset">Reset</v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import loadingScreen from '../components/loadingScreen'

export default {
  name: 'quickplay',
  data () {
    return {
      isLoading: true,
      questions: [],
      error: "",
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
        this.isLoading = false
        this.questions = mappedQ
        
      })
      .catch((error) => {
        console.log(error)
        this.error = "Error Loading Quiz API"
        this.isLoading = false
      })
  },
  methods: {
    RightWrong () {

    },
    reload () {
      this.dialog = false
      location.reload()
    },
    reset () {
      this.answers = []
    },
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
    }
  },
  computed: {
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