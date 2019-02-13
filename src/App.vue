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
  }
}
</script>

<style>
</style>
