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

  export default {
    name: 'App',
    data () {
      return {
        isAccountWindowShow: false, // 是否显示登录注册窗口
        userOnline: false // 用户是否在线
      }
    },
    methods: {
      // 显示登录/注册弹窗
      showAccountWindow (type) {
        this.isAccountWindowShow = true
        this.$refs.account.openAccountWindow(type)
      },
      // 隐藏登录注册弹窗
      hideAccountWindow () {
        this.isAccountWindowShow = false
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
