import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import QuickPlay from './views/QuickPlay.vue'
import Competitive from './views/Competitive'
import Leaderboard from './views/Leaderboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/quickplay',
      name: 'quickplay',
      component: QuickPlay
    },
    {
      path: '/competitive',
      name: 'competitive',
      component: Competitive
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard
    }
  ]
})
