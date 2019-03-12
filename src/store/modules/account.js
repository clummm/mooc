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
  },
  getUserInterest: (state, getters, rootState) => {
    return state.userInfo ? state.userInfo.interest : null
  }
}

const actions = {
  setAccountWindowShow: ({ state, commit }, accountWindowShow) => {
    commit('setAccountWindowShow', accountWindowShow)
  },
  setUserInfo: ({ state, commit }, userInfo) => {
    commit('setUserInfo', userInfo)
  },
  setUserInterest: ({ state, commit }, interest) => {
    commit('setUserInterest', interest)
  }
}
const mutations = {
  setAccountWindowShow (state, accountWindowShow) {
    state.isAccountWindowShow = accountWindowShow
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setUserInterest (state, interest) {
    if (state.userInfo) {
      state.userInfo.interest = interest || []
    }
    console.log(state.userInfo)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
