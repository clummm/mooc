<!-- header -->
<template>
  <div class="head-wrapper">
    <span class="title" @click="goHome">超视慕课平台</span>
    <div class="search-wrapper">
      <form @submit.prevent="search">
        <input type="text" placeholder="请输入搜索内容" v-model="searchContent">
        <input type="submit" value="搜索">
      </form>
    </div>
    <span class="mycourse">我的课程</span>
    <div class="message">消息</div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        searchContent: ''
      }
    },
    methods: {
      // 打开新窗口搜索
      search () {
        let routeData = this.$router.resolve({
          name: 'searchResult',
          query: {searchContent: this.searchContent}
        })
        window.open(routeData.href, '_blank')
      },
      // 返回首页
      goHome () {
        this.$router.push('home')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .head-wrapper
    .title
      cursor pointer

    .search-wrapper
      display inline-block

    .message
      display inline-block

    .login-register
      display inline-block
</style>
