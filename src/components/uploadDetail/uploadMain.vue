<template>
  <div>
    <div>
      <router-link :to="{name:'uploadInfo'}">课程信息</router-link>
      <router-link :to="{name:'uploadCatalogue'}">课程目录</router-link>
      <router-link :to="{name:'uploadResource'}">课程课件</router-link>
      <router-link :to="{name:'uploadTest'}">课程测试</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'uploadMain'
  }
</script>

<style lang="stylus" scoped>

</style>
