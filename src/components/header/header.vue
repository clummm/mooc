<!-- header -->
<template>
  <div class="head-wrapper">
    <div class="head-content">
      <router-link class="title" :to="{name:'Home'}">超视慕课平台</router-link>
      <div class="search-wrapper">
        <form @submit.prevent="search">
          <input type="text" placeholder="请输入搜索内容" v-model="searchContent">
          <input type="submit" value="搜索">
        </form>
      </div>
      <div class="user" v-if="userInfo" @mouseenter="isUserMenuShow=true" @mouseleave="isUserMenuShow=false">
        <img :src="this.userInfo.icon" @click="openUser" width="40" height="40" class="user-icon">
        <span v-if="userInfo" @click="openUser">{{userInfo.name}}</span>
        <ul class="user-menu" v-show="isUserMenuShow">
          <router-link class="user-menu-item" :to="{name: 'myNotes'}">我的笔记</router-link>
          <router-link class="user-menu-item" :to="{name: 'upload'}">上传管理</router-link>
          <router-link class="user-menu-item" :to="{name: 'settings'}">个人设置</router-link>
          <li class="user-menu-item" @click="quit">安全退出</li>
        </ul>
      </div>
      <div class="login-register" v-show="!userInfo">
        <span class="login" @click="showAccountWindow('LOGIN')">登录</span>
        <span class="register" @click="showAccountWindow('REGISTER')">注册</span>
      </div>
      <div class="message" @mouseenter="isInfoMenuShow=true"
           @mouseleave="isInfoMenuShow=false">
        <span @click="openUserChild('message')">消息</span>
        <ul class="info-menu" v-show="isInfoMenuShow&&userInfo">
          <router-link class="info-menu-item" :to="{ name: 'course', params: { cid: 123 } }">课程提醒消息</router-link>
          <router-link class="info-menu-item" :to="{ name: 'myDiscussDetail', params: { did: 123 } }">讨论互动消息
          </router-link>
        </ul>
      </div>
      <div class="my-course" @mouseenter="isCourseMenuShow=true"
           @mouseleave="isCourseMenuShow=false">
        <span @click="openUserChild('course')">我的课程</span>
        <ul class="course-menu" v-show="isCourseMenuShow&&userInfo">
          <router-link class="course-menu-item" :to="{ name: 'course', params: { cid: 100 } }">课程1</router-link>
          <router-link class="course-menu-item" :to="{ name: 'course', params: { cid: 101 } }">课程2</router-link>
        </ul>
      </div>
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
        isUserMenuShow: false,
        isInfoMenuShow: false,
        isCourseMenuShow: false
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
          this.$router.push({ name: 'user' })
        }
      },
      // 打开用户个人模块,并进入指定子模块
      openUserChild (type) {
        let userInfo = this.userInfo
        // 用户已登录
        if (userInfo) {
          this.$router.push({ name: type })
        } else {
          // 用户未登录则提醒登录
          this.setAccountWindowShow(
            {
              show: true,
              type: 'LOGIN'
            })
        }
      },
      // 安全退出
      quit () {
        this.setUserInfo(null)
        window.localStorage.clear()
        window.sessionStorage.clear()
        this.$cookies.remove('token')
        // 如果当前页面是需要登录权限的则返回首页
        if (this.$route.meta === 'needLogin') {
          this.$router.push({ name: 'Home' })
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
    height 40px

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

        .user-icon
          border-radius 50%

        .user-menu, .info-menu, .course-menu
          position absolute
          z-index 3
          background grey

          .user-menu-item, .info-menu-item, .course-menu-item
            color white
            display block

            &:hover
              text-decoration underline

</style>
