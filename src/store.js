import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = { // 要设置的全局访问的state对象
  hasLogin: false,
  user: {
    name: ''
  }
}
const getters = { // 实时监听state值的变化(最新状态)
  getHasLogin (state) { // 方法名随意,主要是来承载变化的showFooter的值
    return state.hasLogin
  },
  getUser (state) { // 方法名随意,主要是用来承载变化的changableNum的值
    return state.user
  }
}
const mutations = {
  changeHasLogin (state, hasLogin) { // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象)
    state.hasLogin = hasLogin
  },
  setUser (state, user) { // 同上，这里面的参数除了state之外还传了需要增加的值sum
    state.user = user
  }
}
const actions = {
  changeHasLogin (context, hasLogin) { // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('changeHasLogin', hasLogin)
  },
  setUser (context, user) {
    context.commit('setUser', user)
  }
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
