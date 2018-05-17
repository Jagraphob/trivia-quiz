<template>
  <div>
    <v-alert :value="error" type="error">{{ error }}</v-alert>
    <v-card>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex x12>
            <v-card v-for="question in questions" :key="question.question">
              <h3>Question : {{ question.question}}</h3>
              <v-radio-group>
                <v-radio v-for="ans in question.answers" :key="ans" :label="ans" :value="ans"></v-radio>
              </v-radio-group>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    {{questions}}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'play',
  data () {
    return {
      questions: {},
      error: ""
    }
  },
  created () {
    axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((response) => {
        var count = 0
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