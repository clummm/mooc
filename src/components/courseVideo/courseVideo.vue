<template>
  <div class="course-video-wrapper">
    <ul class="header clearfix">
      <li class="back left">
        <router-link :to="{ name: 'course', cid: cid }"><i class="el-icon-back"></i></router-link>
      </li>
      <li class="left">
        <span>{{`${chapter}-${sid} ${session.title}`}}</span>
      </li>
    </ul>
    <div class="main-content">
      <div class="player">
        <my-video :video-src="session.url" :play-time="playTime" @time-update="timeUpdate"></my-video>
      </div>
      <div class="aside-menu">
        <el-menu default-active="catalog" mode="horizontal" @select="handleAsideMenuSelect">
          <el-menu-item index="catalog">课程章节</el-menu-item>
          <el-menu-item index="forum">发起讨论</el-menu-item>
          <el-menu-item index="note">发起笔记</el-menu-item>
          <el-menu-item index="test">自我检测</el-menu-item>
          <el-menu-item index="subtitles">字幕</el-menu-item>
        </el-menu>
        <div class="aside-menu-content" ref="aside">
          <session-list v-show="asideMenuActive === 'catalog'" @jump-to="jumpTo"></session-list>
          <publish-discuss v-show="asideMenuActive === 'forum'" :current-time="currentTime"></publish-discuss>
          <publish-note v-show="asideMenuActive === 'note'" :current-time="currentTime"></publish-note>
          <self-test v-show="asideMenuActive === 'test'"></self-test>
          <subtitles v-show="asideMenuActive === 'subtitles'"
                     :current-time="currentTime"
                     @jump-to="playTime = $event"
                     @scroll-to="scrollTo"></subtitles>
        </div>
      </div>
    </div>
    <ul class="keywords clearfix">
      <li class="meta left">关键字</li>
      <li class="left value" v-for="(keyword, index) in session.keywords" :key="index">
        <div class="explain"
             v-show="explainActive[index]"
             @mouseenter="$set(explainActive, index, true)"
             @mouseleave="$set(explainActive, index, false)">
          {{keyword.explain}}
          <a>查看更多>>></a>
        </div>
        <div @mouseenter="$set(explainActive, index, true)"
             @mouseleave="$set(explainActive, index, false)">
          <el-tag class="tag">{{keyword.keyword}}</el-tag>
        </div>
      </li>
    </ul>
    <div class="subcontainer">
      <footer-menu></footer-menu>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { CATALOG } from '../course/js/course'
  import myVideo from '../myVideo/myVideo'
  import footerMenu from './footerMenu/footerMenu'
  import sessionList from './sessionList/sessionList'
  import publishDiscuss from './publishDiscuss/publishDiscuss'
  import publishNote from './publishNote/publishNote'
  import selfTest from './selfTest/selfTest'
  import subtitles from './subtitles/subtitles'

  export default {
    name: 'courseVideo',
    components: {
      publishDiscuss,
      publishNote,
      selfTest,
      subtitles,
      myVideo,
      footerMenu,
      sessionList
    },
    data () {
      return {
        // 课程id
        cid: '',
        // 第几章节
        chapter: '',
        // 第几课时
        sid: '',
        // 播放点，用于跳转某个时间点播放：-1 -> 未观看
        playTime: 0,
        // 课时信息
        session: null,
        // 是否显示关键字解释
        explainActive: [],
        // 侧边菜单激活项
        asideMenuActive: 'catalog',
        // 当前播放点，用于高亮字幕
        currentTime: 0
      }
    },
    created () {
      this.getSession()
    },
    methods: {
      // 后台获取课程目录结构信息
      getSession () {
        this.cid = this.$route.params.cid
        this.chapter = this.$route.params.chapter
        this.sid = this.$route.params.sid
        this.playTime = this.$route.params.playTime || 0
        this.playTime = this.playTime < 0 ? 0 : this.playTime
        console.log(`cid: ${this.cid}, chapter: ${this.chapter}, sid: ${this.sid}, leaveTime: ${this.playTime}`)

        // 保存到 sessionStorage
        let sessionStorage = window.sessionStorage
        if (this.$route.params.playTime) {
          sessionStorage[`${this.cid}/${this.chapter}/${this.sid}`] = this.playTime
        } else {
          this.playTime = sessionStorage[`${this.cid}/${this.chapter}/${this.sid}`] || 0
        }

        // ...post({uid, token, cid, chapter, sid}
        // 得到当前播放的课时信息
        this.session = CATALOG.catalog[Number(this.chapter) - 1].sessions[Number(this.sid) - 1]
        // this.session = SESSION
      },
      // 关闭视频前上传离开时的节点
      beforeCloseHandler (e) {
        // ...
        console.log('beforeCloseHandler')
      },
      // 侧边目录页点击处理
      handleAsideMenuSelect (key) {
        this.asideMenuActive = key
      },
      // 侧边目录滚动，滚动距离=滚动条长度/数组长度*当前数组的index -默认不滚动的距离
      scrollTo (length, index) {
        this.$refs.aside.scrollTop = this.$refs.aside.scrollHeight / length * index - 100
        this.$refs.aside.scrollTop = this.$refs.aside.scrollTop < 0 ? 0 : this.$refs.aside.scrollTop
      },
      // 跳转到某个节点
      jumpTo (chapter, sid, sec) {
        if (Number(chapter) === Number(this.chapter) && Number(sid) === Number(this.sid)) {
          this.playTime = sec
        } else {
          this.rHelp.openVideoWindow({
            cid: this.cid,
            chapter: chapter,
            sid: sid,
            playTime: sec
          })
        }
      },
      // 视频的播放点更新
      timeUpdate (currentTime) {
        // console.log(`currentTime is ${currentTime}`)
        this.currentTime = currentTime
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log('-------------route change--------------')
        console.log(this.$route)
        this.getSession()
      }
    },
    destroyed () {
      window.removeEventListener('beforeunload', e => this.beforeCloseHandler(e))
    }
  }
</script>

<style lang="stylus" scoped>
  .course-video-wrapper
    .header
      height 60px

      li
        font-size 24px
        line-height 60px

      .back
        width 70px
        text-align center

        &:hover
          background-color silver

    .keywords
      border silver solid 1px
      margin 10px
      padding 20px

      .meta
        padding-top 5px

      .value
        margin-left 20px
        position relative
        top 0
        left 0

        .explain
          position absolute
          bottom 100%
          left 0
          min-height 80px
          min-width 150px
          background-color #ffffff
          font-size 12px
          padding 5px
          a
            position absolute
            right 0
            bottom 0

    .main-content
      width 100%
      height 400px
      display flex

      .player
        flex 1

      .aside-menu
        display flex
        flex-direction column
        .aside-menu-content
          flex 1
          overflow auto
          width 450px

</style>
