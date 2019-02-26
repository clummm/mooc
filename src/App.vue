<!-- 根组件 -->
<template>
  <div id="app">
    <account v-show="isAccountWindowShow" @hideAccountWindow="hideAccountWindow" ref="account"
             @loginSuccess="loginSuccess"></account>
    <v-header @showAccountWindow="showAccountWindow" :userOnline="userOnline"></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from './components/header/header'
  import footer from './components/footer/footer'
  import account from './components/account/account'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'App',
    data () {
      return {
        userOnline: false // 用户是否在线
      }
    },
    methods: {
      ...mapActions('account', {
        setAccountWindowShow: 'setAccountWindowShow'
      }),
      // 显示登录/注册弹窗
      showAccountWindow (type) {
        this.setAccountWindowShow(true)
        this.$refs.account.openAccountWindow(type)
      },
      // 隐藏登录注册弹窗
      hideAccountWindow () {
        this.setAccountWindowShow(false)
      },
      // 登录成功
      loginSuccess () {
        console.log('ok')
        this.userOnline = true
      },
      // 退出登录
      quitLogin () {
        this.userOnline = false
      }
    },
    computed: {
      ...mapGetters('account', {
        isAccountWindowShow: 'getAccountWindowShow'
      })
    },
    components: {
      'v-header': header,
      'v-footer': footer,
      account
    },
    created () {
      // 测试跨域请求
      this.$http.get('/api/wxarticle/chapters/json')
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
</script>

<style lang="stylus" scoped>
</style>
