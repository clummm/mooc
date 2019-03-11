<!-- header -->
<template>
  <div class="head-wrapper">
    <div class="head-content">
      <span class="title" @click="goHome">超视慕课平台</span>
      <div class="search-wrapper">
        <form @submit.prevent="search">
          <input type="text" placeholder="请输入搜索内容" v-model="searchContent">
          <input type="submit" value="搜索">
        </form>
      </div>
      <div class="user" v-show="userInfo"  @mouseenter="showUserMenu" @mouseleave="hideUserMenu">
        <span @click="openUser">头像</span>
        <span v-if="userInfo" @click="openUser">{{userInfo.name}}</span>
        <ul class="user-menu" @click="quit" v-show="isUserMenuShow">
          <li class="user-menu-item" >安全退出</li>
        </ul>
      </div>
      <div class="login-register" v-show="!userInfo">
        <span class="login" @click="showAccountWindow('LOGIN')">登录</span>
        <span class="register" @click="showAccountWindow('REGISTER')">注册</span>
      </div>
      <div class="message" @click="openMessage">消息</div>
      <span class="my-course">我的课程</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'header',
    props: {
      userOnline: {
        type: Boolean
      }
    },
    data () {
      return {
        searchContent: '',
        isUserMenuShow: false
      }
    },
    methods: {
      // 搜索
      search () {
        this.$router.push({
          name: 'searchResult',
          query: { searchContent: this.searchContent }
        })
        // let routeData = this.$router.resolve({
        //   name: 'searchResult',
        //   query: { searchContent: this.searchContent }
        // })
        // window.open(routeData.href, '_blank')
      },
      // 返回首页
      goHome () {
        this.$router.push({ name: 'Home' })
      },
      // 打开登录/注册弹窗
      showAccountWindow (type) {
        this.setAccountWindowShow(
          {
            show: true,
            type: type
          })
      },
      // 打开用户个人模块
      openUser () {
        let userInfo = this.userInfo
        if (userInfo) {
          this.$router.push({ name: 'user', params: { uid: userInfo.id } })
        }
      },
      // 打开用户个人模块,消息子组件
      openMessage () {
        let userInfo = this.userInfo
        // 用户已登录
        if (userInfo) {
          this.$router.push({ name: 'message', params: { uid: userInfo.id } })
        } else {
          // 用户未登录则提醒登录
          this.setAccountWindowShow(
            {
              show: true,
              type: 'LOGIN'
            })
        }
      },
      // 显示个人菜单
      showUserMenu () {
        this.isUserMenuShow = true
      },
      // 隐藏个人菜单
      hideUserMenu () {
        this.isUserMenuShow = false
      },
      // 安全退出
      quit () {
        this.setUserInfo(null)
        window.localStorage.clear()
        this.$cookies.remove('token')
        // 如果当前页面是需要登录权限的则返回首页
        if (this.$route.meta === 'needLogin') {
          this.goHome()
        }
      },
      ...mapActions('account', {
        setUserInfo: 'setUserInfo',
        setAccountWindowShow: 'setAccountWindowShow'
      })
    },
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .head-wrapper
    background grey
    color white

    .head-content
      width 1024px
      margin-right auto
      margin-left auto

      .title
        cursor pointer

      .search-wrapper
        display inline-block

      .user, .login-register, .my-course, .message
        display inline-block
        float right
        padding 0 10px

        .user-menu
          position absolute
          background grey
</style>
