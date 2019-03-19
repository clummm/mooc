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
        <my-video :video-src="session.url"></my-video>
      </div>
      <div class="aside-menu">
        <el-menu default-active="catalog" mode="horizontal" @select="handleAsideMenuSelect">
          <el-menu-item index="catalog">课程章节</el-menu-item>
          <el-menu-item index="forum">发起讨论</el-menu-item>
          <el-menu-item index="note">发起笔记</el-menu-item>
          <el-menu-item index="test">自我检测</el-menu-item>
          <el-menu-item index="subtitles">字幕</el-menu-item>
        </el-menu>
      </div>
    </div>
    <ul class="keywords clearfix">
      <button @click="clickKeyword">检查关键字</button>
      <li class="meta left">关键字</li>
      <li class="left value" v-for="(keyword, index) in session.keywords" :key="index">
        <div class="explain"
             v-show="explainActive[index]"
             @mouseenter="enterKeyword(index, true)"
             @mouseleave="enterKeyword(index, false)"
             @click="clickKeyword">
          {{keyword.explain}}
        </div>
        <div @mouseenter="enterKeyword(index, true)"
             @mouseleave="enterKeyword(index, false)"
             @click="clickKeyword">
          <el-tag class="tag">{{keyword.keyword}}</el-tag>
        </div>
      </li>
    </ul>
    <div class="subcontainer">
      <div class="footer-menu">
        <el-menu default-active="forum" mode="horizontal" @select="handleFootMenuSelect">
          <el-menu-item index="forum">课程讨论</el-menu-item>
          <el-menu-item index="notes">课程笔记</el-menu-item>
        </el-menu>
        <div class="footer-menu-content"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { SESSION } from './js/session'
  import myVideo from './myVideo/myVideo'

  export default {
    name: 'courseVideo',
    components: { myVideo },
    data () {
      return {
        // 课程id
        cid: '',
        // 第几章节
        chapter: '',
        // 第几课时
        sid: '',
        // 课时信息
        session: null,
        explainActive: []
      }
    },
    created () {
      this.getSession()
    },
    methods: {
      clickKeyword () {
        console.log('--------------------')
        console.log(this.explainActive)
        console.log('--------------------')
      },
      enterKeyword (index, value) {
        this.explainActive[index] = value
        console.log(`explainActive[${index}] = ${this.explainActive[index]}`)
      },

      // 后台获取课时信息
      getSession () {
        this.cid = this.$route.params.cid
        this.chapter = this.$route.params.chapter
        this.sid = this.$route.params.sid
        console.log(`cid: ${this.cid}, chapter: ${this.chapter}, sid: ${this.sid}`)
        // ...post({uid, token, cid, chapter, sid}
        this.session = SESSION
      },
      // 底部目录页点击处理
      handleFootMenuSelect () {
      },
      // 侧边目录页点击处理
      handleAsideMenuSelect () {
      },
      // 关闭视频前上传离开时的节点
      beforeCloseHandler (e) {
        // ...
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
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
          min-width 100px
          background-color #ffffff
          font-size 12px
          padding 5px

    .main-content
      width 100%
      height 400px
      display flex

      .player
        flex 1

      .menu
        background grey
        transition .5s
</style>
