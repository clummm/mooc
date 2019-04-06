<!-- 我的笔记 -->
<template>
  <div class="main-wrapper">
    <v-noteEditor v-if="isEditorShow" :note="currentNote" @hideEditor="hideEditor"
                  @changeNote="changeNote"></v-noteEditor>
    <el-menu :default-active="activeIndex" class="el-menu-demo menu-text" mode="horizontal" @select="handleSelect"
             text-color="#666666" active-text-color="#049CFF">
      <el-menu-item index="0">我的笔记</el-menu-item>
      <el-menu-item index="1">收藏笔记</el-menu-item>
    </el-menu>
    <div v-if="currentList">
      <div v-for="(item,index) in currentList" :key="index" class="item-wrapper">
        <div class="create-info">
          <span class="title">{{item.title}}</span>
          <div v-if="!isMyNote" class="creator">
            <img :src="item.creator.avatar" class="avatar">
            {{item.creator.name}}
          </div>
          <span class="date">创建于{{item.createTime}}</span>
          <span class="course"
                @click="rHelp.openCourseNewWindow(item.createPosition.cid)">《{{item.createPosition.courseName}}》</span>
          <span class="iconfont icon-shipin play" @click="rHelp.openVideoNewWindow(item.position)"></span>
        </div>
        <div class="content">
          <p class="text-ellipsis">{{item.content}}</p>
        </div>
        <div class="menu">
          <span @click="rHelp.openNoteDetailNewWindow(item.id)" class="btn">查看详情</span>
          <span v-if="isMyNote" @click="deleteMyNote(index)" class="btn">删除笔记</span>
          <span v-else @click="deleteLikeNote(index)" class="btn">取消收藏</span>
          <span v-if="isMyNote" @click="openEditor(item,index)" class="btn">编辑笔记</span>
          <span class="like"><i class="iconfont icon-shoucangrenshu like-icon"></i>{{item.likeCount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MY_NOTE, LIKE_NOTE } from '../../../../public/js/data'
  import noteEditor from '../../note/noteEditor/noteEditor'

  export default {
    name: 'note',
    data () {
      return {
        isMyNote: true,
        myNoteList: null,
        likeNoteList: null,
        isEditorShow: false,
        currentNote: null,
        currentEditIndex: null,
        activeIndex: null
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
      this.activeIndex = this.$route.params.type + ''
      this.myNoteList = MY_NOTE
    },
    methods: {
      // 处理tab切换
      handleSelect (index, indexPath) {
        this.isMyNote = index === '0'
        // 第一次进入收藏笔记时请求数据
        if (!this.isMyNote && !this.likeNoteList) {
          this.likeNoteList = LIKE_NOTE
        }
      },
      deleteMyNote (index) {
        this.myNoteList.splice(index, 1)
      },
      deleteLikeNote (index) {
        this.$confirm('确定删除该笔记?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.likeNoteList.splice(index, 1)
        })
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
  @import "../../../../public/css/textEllipsis.css"
  .main-wrapper
    .item-wrapper
      width 100%
      border-bottom 1px solid #CBCBCB

      .create-info
        margin 15px 0
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;

        .title
          margin-right 15px

        .creator
          display inline-block
          width 150px

          .avatar
            display inline-block
            vertical-align top
            margin-right 5px
            width 18px
            height 18px
            border-radius 50%

        .date
          display inline-block
          width 150px
          text-align center

        .course
          cursor pointer
          display inline-block
          text-align center
          width 250px

          &:hover
            color rgba(4, 156, 255, 1);
            text-decoration underline

        .play
          display inline-block
          cursor pointer
          font-size 16px

          &:hover
            color rgba(4, 156, 255, 1);

      .content
        margin-bottom 15px
        padding 0 20px
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 17px;

      .menu
        margin-bottom 20px
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(166, 166, 166, 1);
        line-height: 17px;

        .btn, .like
          display inline-block
          margin-right 10px

        .btn
          cursor pointer

          &:hover
            color rgba(4, 156, 255, 1);

        .like
          .like-icon
            font-size 12px

</style>
