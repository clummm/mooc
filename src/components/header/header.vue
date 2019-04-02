<!-- header -->
<template>
  <div class="head-wrapper">
    <div class="head-content">
      <div class="title-wrapper">
        <img width="34" height="29" class="title-img" src="./titleIcon.png" @click="rHelp.goHome()">
        <span class="title" @click="rHelp.goHome()">超视慕课平台</span>
      </div>
      <div class="search-wrapper">
        <input type="text" placeholder="请输入搜索内容" v-model="searchContent" class="search-content"
               @focus="isShowSearchRecommend=false">

        <div class="search-button" @click="search">
          <img src="./search.png" width="14" height="13" class="search-icon">
          <span class="search-text">搜索</span>
        </div>
        <div class="search-recommend-wrapper" v-if="isShowSearchRecommend">
          <div class="search-recommend-item">
            <p class="search-recommend-text">java入门</p>
          </div>
          <div class="search-recommend-item">
            <p class="search-recommend-text">前端入门</p>
          </div>
        </div>
      </div>
      <div class="my-course" @mouseenter="isCourseMenuShow=true"
           @mouseleave="isCourseMenuShow=false">
        <span @click="rHelp.openCourse()">我的课程</span>
        <ul class="course-menu" v-show="isCourseMenuShow&&userInfo">
          <div class="course-menu-item" @click="rHelp.openCourseNewWindow(101)">课程1</div>
          <div class="course-menu-item" @click="rHelp.openCourseNewWindow(102)">课程2</div>
        </ul>
      </div>
      <div class="message" @mouseenter="isInfoMenuShow=true"
           @mouseleave="isInfoMenuShow=false">
        <img src="./info.png" width="16" height="16" @click="rHelp.openMessage()" class="message-icon">
        <ul class="info-menu" v-show="isInfoMenuShow&&userInfo">
          <div class="info-menu-item" @click="rHelp.openCourseNewWindow(103)">课程提醒消息</div>
          <div class="info-menu-item" @click="rHelp.openDiscussDetailNewWindow(101)">讨论互动消息</div>
        </ul>
      </div>
      <div class="user" @mouseenter="isUserMenuShow=true" @mouseleave="isUserMenuShow=false">
        <img v-if="userInfo" :src="this.userInfo.icon" @click="openUser" width="32" height="32" class="user-icon">
        <img v-else src="./avatar.png" width="32" height="32" class="user-icon"  @click="showAccountWindow('LOGIN')">
        <div class="user-menu" v-if="userInfo" v-show="isUserMenuShow">
          <p v-if="userInfo" @click="openUser">{{userInfo.name}}</p>
          <ul>
            <router-link class="user-menu-item" :to="{name: 'note'}">我的笔记</router-link>
            <router-link class="user-menu-item" :to="{name: 'upload'}">上传管理</router-link>
            <router-link class="user-menu-item" :to="{name: 'settings'}">个人设置</router-link>
            <li class="user-menu-item" @click="quit">安全退出</li>
          </ul>
        </div>
      </div>
      <div class="login-register" >
        <span class="login " @click="showAccountWindow('LOGIN')">登录</span>
        <span class="separator">/</span>
        <span class="register " @click="showAccountWindow('REGISTER')">注册</span>
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
        isCourseMenuShow: false,
        isShowSearchRecommend: true
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
        if (this.$route.meta.login === 'needLogin') {
          this.$router.push({ name: 'Home' })
        }
        location.reload()
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
    background rgba(255, 255, 255, 1)
    height 100px

    .head-content
      width 1024px
      height 100px
      margin-right auto
      margin-left auto

      .title-wrapper
        display inline-block

        .title-img
          margin-top 37px
          cursor pointer

        .title
          display inline-block
          margin 31px 127px 0 8px
          vertical-align top
          height: 33px;
          font-size: 24px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 33px;
          cursor pointer

      .search-wrapper
        display inline-block
        vertical-align top
        margin-top 28px
        position relative

        .search-content
          display inline-block
          padding-left 20px
          padding-right 66px
          width: 312px;
          height: 38px;
          border-radius: 19px;
          border: 1px solid rgba(4, 156, 255, 1);
          outline none

        .search-button
          position absolute
          right 0
          top 0
          z-index 2
          width: 66px;
          height: 39px;
          background: rgba(4, 156, 255, 1);
          border-radius: 0px 19px 19px 0px;
          cursor pointer

          .search-icon
            display inline-block
            margin 13px 5px 0 9px

          .search-text
            display inline-block
            vertical-align top
            margin-top 11px
            width: 24px;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 17px;

        .search-recommend-wrapper
          position absolute
          top 8px
          right 66px
          height 22px
          z-index 2

          .search-recommend-item
            display inline-block
            margin-right 17px
            width: 66px;
            height: 22px;
            background: rgba(243, 245, 247, 1);
            border-radius: 11px;
            text-align center
            cursor pointer

            .search-recommend-text
              font-size: 12px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(113, 119, 126, 1);
              line-height: 22px;
              -webkit-background-clip: text;

      .my-course
        display inline-block
        vertical-align top
        margin 39px 25px 0 73px
        width: 48px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 17px;
        cursor pointer

        .course-menu
          position absolute
          z-index 3
          background grey

          .course-menu-item
            color white
            display block

      .message
        display inline-block
        vertical-align top
        margin-top 39px
        cursor pointer

        .info-menu
          position absolute
          z-index 3
          background grey

          .info-menu-item
            color white
            display block

      .login-register
        display inline-block
        margin-top 39px
        float right
        width:70px;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:17px;
        cursor pointer
        .separator
          margin 0 5px
        .login,.register
          &:hover
            color rgba(4, 156, 255, 1);

      .user
        display inline-block
        float right
        margin-left 24px
        margin-top 31px
        cursor pointer

        .user-icon
          border-radius 50%

        .user-menu
          position absolute
          z-index 3
          background grey

          .user-menu-item
            color white
            display block

            &:hover
              text-decoration underline

</style>
