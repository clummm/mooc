<!-- 课程页 -->
<template>
  <div class="course-wrapper">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'category', params: {cid: course.category1.id}}">
          {{course.category1.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'category', params: {cid: course.category2.id}}">
          {{course.category2.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{course.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="course-info">
      <div class="title">
        <span>{{course.name}}</span>
      </div>
      <div class="brief-info clearfix">
        <div class="lector-info">
          <div class="lector-icon">
            <img :src="course.lector.icon">
          </div>
          <div class="lector-rside">
            <span class="lector-name">{{course.lector.name}}</span>
            <span class="lector-job">{{course.lector.job}}</span>
          </div>
        </div>
        <div class="info-item">
          <span class="meta">学习总时长</span>
          <span class="meta-value">{{timeFormatter(course.totalTime)}}</span>
        </div>
        <div class="info-item">
          <span class="meta">学习人数</span>
          <span class="meta-value">{{course.learningCount}}人</span>
        </div>
        <div class="info-item">
          <span class="meta">评价</span>
          <span class="meta-value">{{course.rating}}</span>
        </div>
      </div>
      <div class="extra">
        <div class="favorite" @click="changeFavor">
          <i :class="favorite ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
          <span>收藏</span>
        </div>
      </div>
    </div>
    <div class="course-info-menu">
      <el-menu :default-active="this.$route.name" mode="horizontal" @select="handleSelect">
        <el-menu-item index="catalog">课程章节</el-menu-item>
        <el-menu-item index="forum">课程讨论</el-menu-item>
        <el-menu-item index="notes">课程笔记</el-menu-item>
        <el-menu-item index="comments">课程评价</el-menu-item>
      </el-menu>
    </div>
    <div class="course-info-main">
      <div class="aside">
        <div class="aside-wrapper">
          <div class="learn">
            <el-button round @click="playVideo">开始学习</el-button>
          </div>
          <div class="course-info-tip">
            <dl class="needToKnow">
              <dt>课程须知</dt>
              <dd>{{course.needToKnow}}</dd>
            </dl>
            <dl class="gains">
              <dt>老师告诉你能学到什么？</dt>
              <dd>{{course.gains}}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="course-content">
        <div class="course-content-wrapper">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { COURSE } from './js/course'
  import { secToTimer } from '../../common/js/Time'

  export default {
    name: 'course',
    data () {
      return {
        cid: '',
        // 课程基本信息
        course: {},
        favorite: false
      }
    },
    methods: {
      // 秒 转换成 时分秒
      timeFormatter (second) {
        return secToTimer(second)
      },
      // 更新用户对课程的收藏状态
      changeFavor () {
        // 检查登录状态
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          this.favorite = !this.favorite
          // 推送后台用户对课程的收藏状态
          // ... post({uid: this.userInfo.uid, cid: this.course.cid, token: token, favorite: this.favorite})
          // 更改成功后
          this.$message({
            showClose: true,
            message: this.favorite ? '收藏成功' : '取消收藏成功',
            duration: 1500
          })
        }
      },
      // 处理 menu 的点击事件
      handleSelect (index, path) {
        this.$router.push({ name: index })
      },
      playVideo () {
        // 未登录时无法播放课程，弹出登录窗口提示登录
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          this.$router.push({
            name: 'courseVideo',
            params: {
              cid: this.cid,
              sid: 1,
              time: 0
            }
          })
        }
      },
      ...mapActions('account', {
        setAccountWindowShow: 'setAccountWindowShow'
      })
    },
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    },
    created () {
      this.cid = this.$route.params.cid
      // 后台获取课程信息
      // ...post({uid: this.userInfo.uid, cid: this.cid, token: token})
      this.course = COURSE
      this.favorite = this.course.favorite
      console.log(this.$route)
    }
  }
</script>

<style lang="stylus" scoped>
  .course-wrapper
    width 1024px
    margin auto

    .breadcrumb
      margin 10px 10px 10px 0
    .course-info
      height 150px
      position relative
      left 0
      top 0
      .title
        font-size 32px
        font-weight 400
        line-height 48px
        padding-bottom 8px
      .brief-info
        .lector-info
          float left
          margin-right 30px
          .lector-icon
            float left
            img
              width 48px
              height 48px
              border-radius 100%
          .lector-rside
            margin-left 5px
            float left
            .lector-name
              display block
            .lector-job
              font-size 12px
        .info-item
          float left
          position relative
          top 15px
          margin-right 16px
          &:after
            margin-left 16px
            content "·"
          .meta
            padding-right: 8px
          &:last-child
            &:after
              display none
      .extra
        cursor pointer
        position absolute
        right 100px
        top 0
        &:hover
          color grey
        span
          margin-top 2px
          margin-left 5px
          font-size 14px

    .course-info-main
      position relative
      top 0
      left 0
      .course-content-wrapper
        padding-top 36px
        padding-right 352px
      .aside
        border silver solid 1px
        border-radius 12px
        background-color #ffff
        position absolute
        top -150px
        right 0
        width 320px
        .aside-wrapper
          padding 24px 32px 32px
          .learn
            text-align center
          .course-info-tip
            dl
              margin-top 24px
            dt
              font-weight 700
              margin-bottom 6px
              font-size 14px
            dd
              font-size 12px
              line-height 24px
              white-space pre-line
              word-wrap break-word
              word-break break-all
</style>
