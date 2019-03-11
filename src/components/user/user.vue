<!-- 用户页 -->
<template>
  <div class="user-wrapper">
    <div class="top-content">
      <div class="base-info">
        <img :src="this.userInfo.icon" width="100" height="100" class="user-icon">
        <div class="info">
          <p>{{this.userInfo.name}}</p>
          <p>性别 {{this.userInfo.sex}}</p>
          <p>职业 {{this.userInfo.job}}</p>
          <p>所在地区 {{this.userInfo.address[0]}} {{this.userInfo.address[1]}}</p>
        </div>
      </div>
      <div class="settings">
        <router-link :to="{name:'settings'}">个人设置</router-link>
      </div>
    </div>
    <div class="main-content">
      <div class="left-tabs">
        <router-link :to="{name: 'courseList'}" class="tab">我的课程</router-link>
        <router-link :to="{name: 'myNotes'}" class="tab">我的笔记</router-link>
        <router-link :to="{name: 'message'}" class="tab">我的消息</router-link>
        <router-link :to="{name: 'upload'}" class="tab">上传管理</router-link>
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
      return {}
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
    width 1024px
    margin auto

    .top-content
      background burlywood
      height 200px

      .base-info
        .user-icon
          border-radius 50%

        .info
          display inline-block

      .settings
        float right

    .main-content
      display flex

      .left-tabs
        width 100px
        background grey

        .tab
          display block
          margin 30px 10px

      .right-content
        flex 1
        background darkgrey

</style>
