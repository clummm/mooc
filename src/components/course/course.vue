<!-- 课程页 -->
<template>
  <div class="course-wrapper">
    <div class="course-header">
      <div class="fixed-center-wrapper">
        <div class="breadcrumb">
          <el-breadcrumb separator="\">
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
              <span class="meta">时长</span>
              <span class="meta-value">{{timeFormatter(course.totalTime)}}</span>
            </div>
            <div class="info-item">
              <span class="meta">学习人数</span>
              <span class="meta-value">{{course.learningCount}}</span>
            </div>
            <div class="info-item">
              <span class="meta">综合评分</span>
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
      </div>
    </div>
    <div class="course-info-menu">
      <el-menu :default-active="this.$route.name" mode="horizontal"
               active-text-color="#049CFF" text-color="#333333" @select="handleSelect">
        <el-menu-item index="course">课程章节</el-menu-item>
        <el-menu-item index="forum">课程讨论</el-menu-item>
        <el-menu-item index="notes">课程笔记</el-menu-item>
        <el-menu-item index="comments">课程评价</el-menu-item>
      </el-menu>
    </div>
    <div class="course-info-main fixed-center-wrapper">
      <el-card class="aside">
        <div class="learn">
          <el-button type="primary" round @click="playVideo">{{course.leavePosition ? '继续学习' : '开始学习'}}</el-button>
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
      </el-card>
      <div class="course-content">
        <div class="course-content-wrapper">
          <router-view>
            <template v-slot:latest="sortingSlotProps">
              <span @click="sortingSlotProps.sortingWithQuery(0)"
                    :class="sortingSlotProps.getSortingTypeClass(0)">
                最新
              <img src="./new.png"/>
              </span>
            </template>
            <template v-slot:hottest="sortingSlotProps">
              <span @click="sortingSlotProps.sortingWithQuery(1)"
                    :class="sortingSlotProps.getSortingTypeClass(1)">
                最热
                <img src="./hot.png"/>
              </span>
            </template>
            <template v-slot:showMine="mineSlotProps">
              <el-switch
                v-model="mineSlotProps.mine"
                active-color="#13ce66"
                @change="mineSlotProps.showMineWithQuery">
              </el-switch>
            </template>
            <template v-slot:pagination="listSlotProps">
              <el-pagination
                background="false"
                layout="prev, pager, next"
                :total="listSlotProps.totalNum"
                :current-page="listSlotProps.currentPage"
                @current-change="listSlotProps.handleCurrentChangeWithQuery">
              </el-pagination>
            </template>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { COURSE, COURSE_LOGOUT } from './js/course'
  import { secToTimer } from '../../../public/js/Time'

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
          this.rHelp.openVideoWindow({
            cid: this.course.id,
            chapter: this.course.leavePosition ? this.course.leavePosition.chapter : 1,
            sid: this.course.leavePosition ? this.course.leavePosition.sid : 1,
            playTime: this.course.leavePosition ? this.course.leavePosition.time : 0
          })
        }
      },
      ...mapActions('account', {
        setAccountWindowShow: 'setAccountWindowShow'
      }),
      ...mapActions('course', {
        setLeavePosition: 'setLeavePosition'
      })
    },
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      }),
      ...mapGetters('course', {
        leavePosition: 'getLeavePosition'
      })
    },
    created () {
      this.cid = this.$route.params.cid
      // 后台获取课程信息
      // ...post({uid: this.userInfo.uid, cid: this.cid, token: token})
      this.course = this.userInfo ? COURSE : COURSE_LOGOUT
      this.favorite = this.course.favorite

      // 第一次获取到课程数据时，存储用户对课程的最近学习时间点 leavePosition
      this.setLeavePosition(this.course.leavePosition)
    }
  }
</script>

<style lang="stylus" scoped>
  .course-wrapper
    background-color #F8FAFC
    font-family PingFangSC-Regular
    padding-bottom 20px

    .course-header
      background-color #010101
      color #FFFFFF

    .breadcrumb
      padding 22px 0
      .el-breadcrumb
        .el-breadcrumb__item>>>.el-breadcrumb__inner
            color #B0B0B0
    .course-info
      padding-bottom 23px
      position relative
      left 0
      top 0
      .title
        font-size 32px
        font-weight 400
        line-height 48px
        padding-bottom 9px
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
            margin-left 10px
            float left
            .lector-name
              display block
              padding-bottom 4px
              font-family PingFangSC-Medium
            .lector-job
              font-size 14px
              color #E0E0E0
        .info-item
          float left
          position relative
          top 15px
          margin-right 16px
          font-size 14px
          &:after
            margin-left 16px
            content "·"
          .meta
            padding-right 10px
            font-weight 600
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

    .course-info-menu
      background-color #FFFFFF
      .el-menu
        margin auto
        width 1024px
        .el-menu-item
          font-size 16px
          font-weight 700
          font-family PingFangSC-Medium
          margin-right 72px

    .course-info-main
      position relative
      top 0
      left 0
      .course-content-wrapper
        padding-top 36px
        padding-right 352px
      .aside
        position absolute
        top -40px
        right 0
        width 320px
        padding 10px 0
        .learn
          text-align center
          .el-button.is-round
            width 230px
            padding 10px 0
            border-radius 24px
            font-size 20px
            font-family PingFangSC-Regular
            font-weight 500
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
