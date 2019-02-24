<!-- 根组件 -->
<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
    <account></account>
    <v-footer v-if=this.showAccountWindow></v-footer>
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
        showAccountWindow: false
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

<style>
</style>
