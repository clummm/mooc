<!-- 课程目录 -->
<template>
  <div class="catalog-wrapper">
    <div class="intro course-box">简介：{{catalog.intro}}</div>
    <div class="catalog">
      <div class="chapter course-box" v-for="(chapter, index) in catalog.catalog" :key="index">
        <div class="chapter-title">{{chapter.title}}</div>
        <div class="chapter-intro">{{chapter.intro}}</div>
        <ul class="sessions">
          <li class="session" v-for="(session, i) in chapter.sessions" :key="i" @click="playVideo(session.id, session.leaveTime)">
            {{`${chapter.id}-${session.id} ${session.title} (${timeFormatter(session.time)})`}}
            <div class="learningState">
              <span v-if="leavePosition.chapter === chapter.id && leavePosition.sid === session.id">最近学习</span>
              <i :class="getLearningState(session.finish)"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { CATALOG, CATALOG_LOGOUT } from '../js/course'
  import { mapGetters } from 'vuex'
  import { secToTimer } from '../../../common/js/Time'

  export default {
    name: 'catalog',
    data () {
      return {
        cid: '',
        catalog: {},
        // 用户最近学习的课时
        leavePosition: {}
      }
    },
    methods: {
      timeFormatter (second) {
        return secToTimer(second)
      },
      // 根据课时学习进度更改图标
      getLearningState (finish) {
        let className = 'el-icon-warning'
        switch (finish) {
        // 未学习
        case 0:
          break
        // 未学习完
        case 1:
          className = 'el-icon-question'
          break
        case 2:
          className = 'el-icon-success'
          break
        default:
          break
        }
        return className
      },
      playVideo (sid, time) {
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
              sid: sid,
              time: time
            }
          })
        }
      }
    },
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    },
    created () {
      this.cid = this.$route.params.cid
      // 后台获取课程章节
      // ...post({cid: this.$route.params.cid})
      this.catalog = this.userInfo ? CATALOG : CATALOG_LOGOUT
      this.leavePosition = this.$route.meta.leavePosition
      console.log(`catalog's name: ${this.$route.name}`)
      console.log(this.leavePosition)
    }
  }
</script>

<style lang="stylus" scoped>
  .catalog-wrapper
    .course-box
      border silver solid 1px
      line-height 26px
      padding 24px 32px 28px
      margin-bottom 8px

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
          &:hover
            background-color silver
          .learningState
            position absolute
            right 10px
            top 0px
            span
              font-size 14px
              padding-right 10px
</style>
