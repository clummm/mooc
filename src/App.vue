<!-- 根组件 -->
<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from './components/header/header'
  import footer from './components/footer/footer'

  export default {
    name: 'App',
    components: {
      'v-header': header,
      'v-footer': footer
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
