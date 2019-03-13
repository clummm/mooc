<!-- 我的笔记 -->
<template>
  <div class="main-wrapper">
    <v-noteEditor v-if="isEditorShow" :note="currentNote" @hideEditor="hideEditor"
                  @changeNote="changeNote"></v-noteEditor>
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
        <div>
          <p class="text-ellipsis">{{item.content}}</p>
        </div>
        <div>
          <span @click="openNoteDetail(item.id)">查看全部</span>
          <span>收藏人数{{item.likeCount}}</span>
          <span v-if="isMyNote" @click="deleteMyNote(index)">删除笔记</span>
          <span v-else @click="deleteLikeNote(index)">取消收藏</span>
          <span v-if="isMyNote" @click="openEditor(item,index)">编辑笔记</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MY_NOTE, LIKE_NOTE } from '../../../common/js/data'
  import noteEditor from '../../noteEditor/noteEditor'

  export default {
    name: 'note',
    data () {
      return {
        isMyNote: true,
        myNoteList: null,
        likeNoteList: null,
        isEditorShow: false,
        currentNote: null,
        currentEditIndex: null
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
      },
      // 打开笔记编辑器并记录编辑的笔记序号
      openEditor (note, index) {
        this.currentNote = note
        this.isEditorShow = true
        this.currentEditIndex = index
      },
      // 取消编辑
      hideEditor () {
        this.isEditorShow = false
      },
      // 完成编辑后修改笔记内容并通知后台
      changeNote (note) {
        // 通知后台成功后修改内容，失败则给出提示
        this.isEditorShow = false
        this.myNoteList[this.currentEditIndex].title = note.title
        this.myNoteList[this.currentEditIndex].content = note.content
      }
    },
    computed: {
      currentList () {
        return this.isMyNote ? this.myNoteList : this.likeNoteList
      }
    },
    components: {
      'v-noteEditor': noteEditor
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
