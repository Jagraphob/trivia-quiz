<template>
  <div>
    <v-alert :value="error" type="error">{{ error }}</v-alert>
    <v-card>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="question in questions" :key="question.question">
            <v-card color="teal lighten-4">
              <h3 class="headline">Question : {{ question.question}}</h3>
              <v-radio-group v-model="answers[question.Id]">
                <v-radio v-for="ans in question.answers" :key="ans" :label="ans" :value="ans"></v-radio>
              </v-radio-group>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <div class="row">
      <v-btn large color="success">Submit</v-btn>
      <v-btn large color="warning" @click="reset">Reset</v-btn>
    </div>
  {{ answers }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'play',
  data () {
    return {
      questions: {},
      error: "",
      answers: []
    }
  },
  created () {
    axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((response) => {
        var count = -1
        var mappedQ = response.data.results.map((q) => {
          var ans = q.incorrect_answers
          ans.push(q.correct_answer)
          ans = this.shuffle(ans)
          ans = ans.map((item) => {
            return this.decodeHTMLEntities(item)
          })
          count++
          return {
            Id: count,
            question: this.decodeHTMLEntities(q.question),
            answers: ans,
            correct_answer: this.decodeHTMLEntities(q.correct_answer)
          }
        })
        this.questions = mappedQ
      })
      .catch((error) => {
        console.log(error)
        this.error = "Error Loading Quiz API"
      })
  },
  methods: {
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
  }
  

}
</script>