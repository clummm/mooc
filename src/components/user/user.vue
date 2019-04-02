<!-- 用户页 -->
<template>
  <div class="user-wrapper">
    <img src="./topBackgroud.jpg" width="100%" height="146px" class="top-background">
    <div class="top-content">
      <img :src="this.userInfo.icon" width="146" height="146" class="user-icon">
      <div class="base-info">
        <p class="user-name">{{this.userInfo.name}}</p>
        <span v-if="this.userInfo.sex">{{this.userInfo.sex}}</span>
        <span v-else>性别保密</span>
        <span>{{this.userInfo.address[0]}}</span>
        <span> {{this.userInfo.address[1]}}</span>
        <span>|</span>
        <span>{{this.userInfo.job}}</span>
      </div>
      <div class="settings" @click="()=>{this.$router.push({name:'settings'})}">
        <img src="./setting.png" width="14" height="14">
        <span>个人设置</span>
      </div>
    </div>
    <div class="main-content">
      <div class="left-tabs">
        <div @click="changeTab('courseList')" class="tab" :class="{'selected':currentTab==='courseList'}">我的课程
        </div>
        <div @click="changeTab('note')" class="tab" :class="{'selected':currentTab==='note'}">我的笔记</div>
        <div @click="changeTab('discuss')" class="tab" :class="{'selected':currentTab==='discuss'}">我的讨论</div>
        <div class="tab" @click="changeTab('message')" :class="{'selected':currentTab==='message'}">我的消息</div>
        <div @click="changeTab('upload')" class="tab" :class="{'selected':currentTab==='upload'}">上传管理</div>
      </div>
      <div class="right-content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'user',
    data () {
      return {
        currentTab: null
      }
    },
    created () {
      this.currentTab = this.$route.name
    },
    methods: {
      changeTab (name) {
        if (name !== 'message') {
          this.$router.push({ name: name })
        } else {
          this.rHelp.openMessage()
        }
        this.currentTab = name
      }
    },
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .user-wrapper
    position relative

    .top-background
      position absolute
      z-index -1
      top 0

    .top-content
      width 1024px
      margin 0 auto
      position relative

      .user-icon
        border-radius 50%
        border solid 2px rgba(4, 156, 255, 1)
        margin-top 20px

      .base-info
        display inline-block
        vertical-align top
        margin-top 20px
        margin-left 30px

        .user-name
          height: 45px;
          margin-bottom 14px
          font-size: 32px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(251, 251, 251, 1);
          line-height: 45px;

        span
          height: 25px;
          margin-right 20px
          font-size: 18px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(251, 251, 251, 1);
          line-height: 25px;

      .settings
        position: absolute;
        right 0
        top: 59px
        width: 108px;
        height: 28px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 1);
        text-align center
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;

        img
          vertical-align middle
          margin-right 5px
          margin-bottom 2px

    .main-content
      width 1024px
      margin 0 auto
      display flex

      .left-tabs
        display inline-block
        width 180px
        margin-right 93px
        margin-top 62px
        text-align center

        .tab
          cursor pointer
          display block
          height: 28px;
          margin-bottom 30px
          font-size: 20px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 28px;

        .selected
          width: 180px;
          height: 58px;
          margin-bottom 15px
          background: rgba(4, 156, 255, 1);
          border-radius: 29px;
          font-size: 24px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 58px;

      .right-content
        flex 1
        margin-top 17px
        display inline-block
        overflow: hidden;
        background darkgrey

</style>
