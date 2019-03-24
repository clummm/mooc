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
        <my-video :video-src="session.url" :play-time="playTime"></my-video>
      </div>
      <div class="aside-menu">
        <el-menu default-active="catalog" mode="horizontal" @select="handleAsideMenuSelect">
          <el-menu-item index="catalog">课程章节</el-menu-item>
          <el-menu-item index="forum">发起讨论</el-menu-item>
          <el-menu-item index="note">发起笔记</el-menu-item>
          <el-menu-item index="test">自我检测</el-menu-item>
          <el-menu-item index="subtitles">字幕</el-menu-item>
        </el-menu>
        <div class="aside-menu-content"></div>
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
      <div class="footer-menu">
        <el-menu default-active="forum" mode="horizontal" @select="handleFootMenuSelect">
          <el-menu-item index="forum">课程讨论</el-menu-item>
          <el-menu-item index="notes">课程笔记</el-menu-item>
        </el-menu>
        <div class="footer-menu-content">
          <forum v-show="footMenuActive === 'forum'">
            <template v-slot:sortingType="sortingSlotProps">
              <span @click="sortingSlotProps.sortingWithoutQuery(0)"
                    :class="sortingSlotProps.getSortingTypeClass(0)">最新</span>
              <span @click="sortingSlotProps.sortingWithoutQuery(1)"
                    :class="sortingSlotProps.getSortingTypeClass(1)">最热</span>
            </template>
            <template v-slot:pagination="listSlotProps">
              <el-pagination
                layout="prev, pager, next"
                :total="listSlotProps.totalNum"
                :current-page="listSlotProps.currentPage"
                @current-change="listSlotProps.handleCurrentChangeWithoutQuery">
              </el-pagination>
            </template>
          </forum>
          <notes v-show="footMenuActive === 'notes'">
            <template v-slot:sortingType="sortingSlotProps">
              <span @click="sortingSlotProps.sortingWithoutQuery(0)"
                    :class="sortingSlotProps.getSortingTypeClass(0)">最新</span>
              <span @click="sortingSlotProps.sortingWithoutQuery(1)"
                    :class="sortingSlotProps.getSortingTypeClass(1)">最热</span>
            </template>
            <template v-slot:showMine="mineSlotProps">
              <el-switch
                v-model="mineSlotProps.mine"
                active-color="#13ce66"
                @change="mineSlotProps.showMineWithoutQuery">
              </el-switch>
            </template>
            <template v-slot:pagination="listSlotProps">
              <el-pagination
                layout="prev, pager, next"
                :total="listSlotProps.totalNum"
                :current-page="listSlotProps.currentPage"
                @current-change="listSlotProps.handleCurrentChangeWithoutQuery">
              </el-pagination>
            </template>
          </notes>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { SESSION } from './js/session'
  import myVideo from './myVideo/myVideo'
  import forum from '../course/forum/forum'
  import notes from '../course/notes/notes'

  export default {
    name: 'courseVideo',
    components: {
      myVideo,
      forum,
      notes
    },
    data () {
      return {
        // 课程id
        cid: '',
        // 第几章节
        chapter: '',
        // 第几课时
        sid: '',
        // 播放点：-1 -> 未观看
        playTime: 0,
        // 课时信息
        session: null,
        // 是否显示关键字解释
        explainActive: [],
        // 侧边菜单激活项
        asideMenuActive: 'catalog',
        // 底部菜单激活项
        footMenuActive: 'forum'
      }
    },
    created () {
      this.getSession()
      // let sessionStorage = window.sessionStorage
      // sessionStorage[`${this.cid}/${this.chapter}/${this.sid}`] = this.leaveTime
    },
    methods: {
      // 后台获取课时信息
      getSession () {
        this.cid = this.$route.params.cid
        this.chapter = this.$route.params.chapter
        this.sid = this.$route.params.sid
        this.playTime = this.$route.params.playTime || 0
        this.playTime = this.playTime < 0 ? 0 : this.playTime
        console.log(`cid: ${this.cid}, chapter: ${this.chapter}, sid: ${this.sid}, leaveTime: ${this.playTime}`)
        // ...post({uid, token, cid, chapter, sid}
        this.session = SESSION
      },
      // 底部目录页点击处理
      handleFootMenuSelect (key) {
        this.footMenuActive = key
      },
      // 侧边目录页点击处理
      handleAsideMenuSelect (key, keyPath) {
        console.log(key, keyPath)
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

    .subcontainer
      .footer-menu
        .footer-menu-content
          padding-top 36px
          padding-right 352px
</style>
