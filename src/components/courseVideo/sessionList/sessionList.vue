<template>
  <div class="session-list">
    <ul>
      <li v-for="(chapter, c_index) in catalog" :key="c_index" class="chapter-box">
        {{`第${chapter.id}章 ${chapter.title}`}}
        <ul class="sessions">
          <li v-for="(session, s_index) in chapter.sessions" :key="s_index">
            <div class="clearfix">
              <div class="session left" @click="playVideo(chapter.id, session.id, session.leaveTime)">
                {{`${chapter.id}-${session.id} ${session.title} (${timeFormatter(session.duration)})`}}
                <div class="learning-state right">
                  <span v-if="Number(chapterId) === Number(chapter.id) && Number(sid) === Number(session.id)">
                  正在学习
                  </span>
                  <img src="../../../common/radio-unchecked.png" v-if="session.leaveTime <= -1"/>
                  <img src="../../../common/contrast.png" v-else-if="session.leaveTime < session.duration"/>
                  <img src="../../../common/checkmark.png" v-else-if="session.leaveTime >= session.duration"/>
                </div>
              </div>
              <div class="nodes-shown-label right">
                <i :class="nodesActive[`${c_index}${s_index}`] ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                   @click="$set(nodesActive, `${c_index}${s_index}`, !nodesActive[`${c_index}${s_index}`])"></i>
              </div>
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
      // 根据课时学习进度更改图标
      getLearningState (leaveTime, duration) {
        leaveTime = Number(leaveTime)
        duration = Number(duration)
        let className = 'el-icon-warning'
        if (leaveTime === -1) {
          className = 'el-icon-warning'
        } else if (leaveTime < duration) {
          // 未学习完
          className = 'el-icon-question'
        } else if (leaveTime === duration) {
          // 学习完
          className = 'el-icon-success'
        }
        return className
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
    }
  }
</script>

<style lang="stylus" scoped>
  .session-list
    .chapter-box
      margin-bottom 8px
      .sessions
        .session
          width 300px
          &:hover
            cursor pointer
            color grey
            background-color silver
          .learning-state
            img
              width 15px

        .nodes-shown-label
          &:hover
            cursor pointer

        .nodes
          &:hover
            cursor pointer
</style>
