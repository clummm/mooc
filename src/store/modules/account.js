const state = {
  // 是否显示登录窗口
  isAccountWindowShow: {
    show: false,
    type: 'LOGIN'
  },
  hasLogin: false,
  userInfo: null
}
const getters = {
  getAccountWindowShow: (state, getters, rootState) => {
    return state.isAccountWindowShow
  },
  getHasLogin: (state, getters, rootState) => {
    return state.hasLogin
  },
  getUserInfo: (state, getters, rootState) => {
    return state.userInfo
  }
}

const actions = {
  setAccountWindowShow: ({ state, commit }, accountWindowShow) => {
    commit('setAccountWindowShow', accountWindowShow)
  },
  setHasLogin: ({ state, commit }, hasLogin) => {
    commit('setHasLogin', hasLogin)
  },
  setUserInfo: ({ state, commit }, userInfo) => {
    commit('setUserInfo', userInfo)
  }
}
const mutations = {
  setAccountWindowShow (state, accountWindowShow) {
    state.isAccountWindowShow = accountWindowShow
  },
  setHasLogin (state, hasLogin) {
    state.hasLogin = hasLogin
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
