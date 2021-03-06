<!-- 课程目录 -->
<template>
  <div class="catalog-wrapper">
    <el-card class="course-box intro-box">
      <div class="intro" :class="more ? '' : 'line-limit'">简介：{{catalog.intro}}</div>
      <i :class="more ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="more = !more"></i>
    </el-card>
    <div class="catalog">
      <el-card class="chapter course-box" v-for="(chapter, index) in catalog.catalog" :key="index">
        <div class="chapter-title">{{chapter.title}}</div>
        <div class="chapter-intro">{{chapter.intro}}</div>
        <ul class="sessions">
          <li class="session" v-for="(session, i) in chapter.sessions" :key="i"
              @click="playVideo(chapter.id, session.id, session.leaveTime)">
            <i class="play-icon"></i>
            {{`${chapter.id}-${session.id} ${session.title} (${timeFormatter(session.duration)})`}}
            <div class="learningState">
              <span v-if="leavePosition && leavePosition.chapter === chapter.id && leavePosition.sid === session.id">
                最近学习
              </span>
              <img src="../../../common/radio-unchecked.png" v-if="session.leaveTime <= -1"/>
              <img src="../../../common/contrast.png" v-else-if="session.leaveTime < session.duration"/>
              <img src="../../../common/checkmark.png" v-else-if="session.leaveTime >= session.duration"/>
            </div>
          </li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { CATALOG, CATALOG_LOGOUT } from '../js/course'
  import { mapGetters, mapActions } from 'vuex'
  import { secToTimer } from '../../../../public/js/Time'

  export default {
    name: 'catalog',
    data () {
      return {
        cid: '',
        catalog: {},
        // 是否展示更多简介
        more: false
      }
    },
    methods: {
      ...mapActions('account', {
        setAccountWindowShow: 'setAccountWindowShow'
      }),
      timeFormatter (second) {
        return secToTimer(second)
      },
      playVideo (chapter, sid, leaveTime) {
        console.log(`catalog, leaveTime: ${leaveTime}`)
        // 未登录时无法播放课程，弹出登录窗口提示登录
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          this.rHelp.openVideoWindow({
            cid: this.cid,
            chapter: chapter,
            sid: sid,
            playTime: leaveTime
          })
        }
      }
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
      // 后台获取课程章节
      // ...post({cid: this.$route.params.cid})
      this.catalog = this.userInfo ? CATALOG : CATALOG_LOGOUT
      // this.leavePosition = this.$route.meta.leavePosition
      // console.log(`catalog's name: ${this.$route.name}`)
    }
  }
</script>

<style lang="stylus" scoped>
  .catalog-wrapper
    .course-box
      line-height 26px
      padding 20px
      margin-bottom 8px

    .intro
      transition-property height
      transition-duration .2s
    .intro-box
      position relative
      top 0
      left 0
      i
        position absolute
        bottom 16px
        right 30px
        cursor pointer
    .chapter
      .chapter-title
        font-weight 700
        line-height 24px
      .chapter-intro
        font-size 14px
        line-height 18px
      .sessions
        padding-top 16px
        .session
          height 48px
          line-height 48px
          cursor pointer
          position relative
          top 0
          left 0
          background-image url("./play_empty.png")
          background-repeat no-repeat
          background-position left center
          &:hover
            background-color #E0F3FF
            background-image url("./play_full.png")
          .play-icon
            display inline-block
            width 26px
            height 26px
            padding-right 16px
          .learningState
            position absolute
            right 10px
            top 0
            span
              font-size 14px
              padding-right 10px
            img
              width 15px
</style>
