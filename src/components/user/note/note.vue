<!-- 我的笔记 -->
<template>
  <div class="main-wrapper">
    <div class="top-tabs">
      <span class="mine" @click="toggleList">我的笔记</span>
      <span class="like" @click="toggleList">收藏笔记</span>
    </div>
    <div v-if="currentList">
      <div v-for="(item,index) in currentList" :key="index">
        <div>
          <span>{{item.title}}</span>
          <span v-if="isMyNote">我在{{item.createTime}}创建</span>
          <span v-else>{{item.creator.name}}在{{item.createTime}}创建</span>
          <span @click="openCourse(item.createPosition.cid)">创建于《{{item.createPosition.courseName}}》</span>
          <span @click="openVideo(item.createPosition)">点击跳转到创建时间节点</span>
        </div>
        <p class="text-ellipsis">{{item.content}}</p>
        <div>
          <span @click="openNoteDetail(item.id)">查看全部</span>
          <span>收藏人数{{item.likeCount}}</span>
          <span v-if="isMyNote" @click="deleteMyNote(index)">删除笔记</span>
          <span v-else @click="deleteLikeNote(index)">取消收藏</span>
          <span v-if="isMyNote">编辑笔记</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MY_NOTE, LIKE_NOTE } from '../../../common/js/data'

  export default {
    name: 'note',
    data () {
      return {
        isMyNote: true,
        myNoteList: null,
        likeNoteList: null
      }
    },
    created () {
      this.myNoteList = MY_NOTE
    },
    methods: {
      // 切换tab
      toggleList () {
        this.isMyNote = !this.isMyNote
        // 第一次进入收藏笔记时请求数据
        if (!this.isMyNote && !this.likeNoteList) {
          this.likeNoteList = LIKE_NOTE
        }
      },
      // 新窗口打开视频并进入指定节点
      openVideo (position) {
        let routeData = this.$router.resolve({
          name: 'courseVideo',
          params: {
            cid: position.cid,
            sid: position.sid,
            time: position.time
          }
        })
        window.open(routeData.href, '_blank')
      },
      // 在新窗口打开课程详情页
      openCourse (id) {
        let routeData = this.$router.resolve({
          name: 'course',
          params: {
            cid: id
          }
        })
        window.open(routeData.href, '_blank')
      },
      // 新窗口查看笔记详情
      openNoteDetail (id) {
        let routeData = ''
        if (this.isMyNote) {
          routeData = this.$router.resolve({
            name: 'myNoteDetail',
            params: {
              nid: id,
              type: 'myNote'
            }
          })
        } else {
          routeData = this.$router.resolve({
            name: 'myNoteDetail',
            params: {
              nid: id,
              type: 'commonNote'
            }
          })
        }
        window.open(routeData.href, '_blank')
      },
      deleteMyNote (index) {
        this.myNoteList.splice(index, 1)
      },
      deleteLikeNote (index) {
        this.likeNoteList.splice(index, 1)
      }
    },
    computed: {
      currentList () {
        return this.isMyNote ? this.myNoteList : this.likeNoteList
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../common/style/textEllipsis.css"
  .main-wrapper
    .top-tabs
      .mine
        margin 5px 10px
</style>
