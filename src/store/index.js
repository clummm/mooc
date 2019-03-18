import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import course from './modules/course'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    account,
    course
  },
  strict: debug
})
