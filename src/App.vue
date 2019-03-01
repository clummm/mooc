<!-- 根组件 -->
<template>
  <div id="app">
    <account v-show="isAccountWindowShow.show"></account>
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from './components/header/header'
  import footer from './components/footer/footer'
  import account from './components/account/account'
  import { mapGetters } from 'vuex'

  export default {
    name: 'App',
    data () {
      return {}
    },
    methods: {},
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
