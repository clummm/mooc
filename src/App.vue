<!-- 根组件 -->
<template>
  <div id="app">
    <account v-show="isAccountWindowShow" @hideAccountWindow="hideAccountWindow" ref="account"></account>
    <v-header @showAccountWindow="showAccountWindow"></v-header>
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
        isAccountWindowShow: false
      }
    },
    methods: {
      // 显示登录/注册弹窗
      showAccountWindow (type) {
        this.isAccountWindowShow = true
        this.$refs.account.changeTab(type)
      },
      // 隐藏登录注册弹窗
      hideAccountWindow () {
        this.isAccountWindowShow = false
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
