import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: {}
  },
  mutations: {
    signUser (state, payload) {
      state.user = payload.user
      state.token = payload.token
    }
  },
  actions: {

  },
  plugins: [createPersistedState()]
})
