const state = {
  // 是否显示登录窗口
  isAccountWindowShow: {
    show: false,
    type: 'LOGIN'
  },
  userInfo: null
}
const getters = {
  getAccountWindowShow: (state, getters, rootState) => {
    return state.isAccountWindowShow
  },
  getUserInfo: (state, getters, rootState) => {
    return state.userInfo
  }
}

const actions = {
  setAccountWindowShow: ({ state, commit }, accountWindowShow) => {
    commit('setAccountWindowShow', accountWindowShow)
  },
  setUserInfo: ({ state, commit }, userInfo) => {
    commit('setUserInfo', userInfo)
  }
}
const mutations = {
  setAccountWindowShow (state, accountWindowShow) {
    state.isAccountWindowShow = accountWindowShow
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
