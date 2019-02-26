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
    <div class="user" v-show="hasLogin">
      <span>头像</span>
      <span>{{getUser.name}}</span>
    </div>
    <div class="login-register" v-show="!hasLogin">
      <span class="login" @click="showAccountWindow('LOGIN')">登录</span>
      <span class="register" @click="showAccountWindow('REGISTER')">注册</span>
    </div>
    <div class="message">消息</div>
    <span class="my-course">我的课程</span>
  </div>
</template>

<script>
  export default {
    name: 'header',
    props: {
      userOnline: {
        type: Boolean
      }
    },
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
          query: { searchContent: this.searchContent }
        })
        window.open(routeData.href, '_blank')
      },
      // 返回首页
      goHome () {
        this.$router.push('/')
      },
      // 通知父组件打开登录/注册弹窗
      showAccountWindow (type) {
        this.$emit('showAccountWindow', type)
      }
    },
    computed: {
      hasLogin () {
        return this.$store.getters.getHasLogin
      },
      getUser () {
        return this.$store.getters.getUser
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

    .user, .login-register, .my-course, .message
      display inline-block
      float right
      padding 0 10px
</style>
