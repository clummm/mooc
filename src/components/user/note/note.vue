<!-- 我的笔记 -->
<template>
  <div class="main-wrapper">
    <v-noteEditor v-if="isEditorShow" :note="currentNote" @hideEditor="hideEditor"
                  @changeNote="changeNote"></v-noteEditor>
    <div class="top-tabs">
      <span class="mine" @click="toggleList(true)">我的笔记</span>
      <span class="like" @click="toggleList(false)">收藏笔记</span>
    </div>
    <div v-if="currentList">
      <div v-for="(item,index) in currentList" :key="index">
        <div>
          <span>{{item.title}}</span>
          <span v-if="isMyNote">我在{{item.createTime}}创建</span>
          <span v-else>{{item.creator.name}}在{{item.createTime}}创建</span>
          <span
            @click="rHelp.openCourseNewWindow(item.createPosition.cid)">创建于《{{item.createPosition.courseName}}》</span>
          <span @click="rHelp.openVideoNewWindow(item.createPosition)">点击跳转到创建时间节点</span>
        </div>
        <div>
          <p class="text-ellipsis">{{item.content}}</p>
        </div>
        <div>
          <span @click="rHelp.openNoteDetailNewWindow(item.id)">查看详情</span>
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
    props: {
      cid: null
    },
    created () {
      if (!this.cid) {
        // 根据用户id取讨论
      } else {
        // 根据用户id和课程id取讨论
      }
      this.myNoteList = MY_NOTE
    },
    methods: {
      // 切换tab
      toggleList (value) {
        this.isMyNote = value
        // 第一次进入收藏笔记时请求数据
        if (!this.isMyNote && !this.likeNoteList) {
          this.likeNoteList = LIKE_NOTE
        }
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
