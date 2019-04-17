<template>
  <div class="session-list">
    <ul>
      <li v-for="(chapter, c_index) in catalog" :key="c_index" class="chapter-box">
        <span class="chapter">章节<span class="chapter-id">{{chapter.id}}</span>{{chapter.title}}</span>
        <ul class="sessions">
          <li v-for="(session, s_index) in chapter.sessions" :key="s_index">
            <div class="session-box clearfix">
              <div class="session left" @click="playVideo(chapter.id, session.id, session.leaveTime)">
                {{`课时${session.id} ${session.title} (${timeFormatter(session.duration)})`}}
                <div class="learning-state right">
                  <span v-if="Number(chapterId) === Number(chapter.id) && Number(sid) === Number(session.id)">
                  正在学习
                  </span>
                  <img src="../../../common/radio-unchecked.png" v-if="session.leaveTime <= -1"/>
                  <img src="../../../common/contrast.png" v-else-if="session.leaveTime < session.duration"/>
                  <img src="../../../common/checkmark.png" v-else-if="session.leaveTime >= session.duration"/>
                </div>
              </div>
              <i class="nodes-shown-label right"
                 :class="nodesActive[`${c_index}${s_index}`] ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                 @click="$set(nodesActive, `${c_index}${s_index}`, !nodesActive[`${c_index}${s_index}`])"></i>
            </div>
            <ul class="nodes" v-if="nodesActive[`${c_index}${s_index}`]">
              <li v-for="(node, n_index) in session.nodes" :key="n_index"
                  @click="$emit('jump-to', chapter.id, session.id, node.time)">
                {{`${node.name} (${ timeFormatter(node.time) })`}}
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import { CATALOG } from '../../course/js/course'
  import { secToTimer } from '../../../../public/js/Time'

  export default {
    name: 'sessionList',
    data () {
      return {
        cid: '',
        chapterId: '',
        sid: '',
        catalog: {},
        // 是否显示课时节点
        nodesActive: {}
      }
    },
    methods: {
      // 后台获取课程目录
      getSessionList () {
        this.catalog = CATALOG.catalog
      },
      timeFormatter (second) {
        return secToTimer(second)
      },
      playVideo (chapter, sid, leaveTime) {
        console.log(`catalog, leaveTime: ${leaveTime}`)
        this.rHelp.openVideoWindow({
          cid: this.cid,
          chapter: chapter,
          sid: sid,
          playTime: leaveTime
        })
      }
    },
    created () {
      this.cid = this.$route.params.cid || '0'
      this.chapterId = this.$route.params.chapter || '0'
      this.sid = this.$route.params.sid || '0'
      this.getSessionList()
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.cid = this.$route.params.cid || '0'
        this.chapterId = this.$route.params.chapter || '0'
        this.sid = this.$route.params.sid || '0'
        this.getSessionList()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .session-list
    font-family PingFangSC-Regular
    font-size 14px

    .chapter-box
      margin-bottom 8px
      .chapter
        font-family PingFangSC-Medium
        font-weight 600
        color rgba(102,102,102,1)
        .chapter-id
          display inline-block
          text-align center
          width 23px
          border-radius 100%
          border 1px solid rgba(151,151,151,1)
          margin 15px

      .sessions
        .session-box:hover
          background-color #E0F3FF
        .session
          width 300px
          padding 15px 5px
          color rgba(134,134,134,1)
          &:hover
            cursor pointer
          .learning-state
            img
              width 15px

        .nodes-shown-label
          padding 15px 5px
          &:hover
            cursor pointer

        .nodes
          padding-left 20px
          color rgba(134,134,134,1)
          &:hover
            cursor pointer
</style>
