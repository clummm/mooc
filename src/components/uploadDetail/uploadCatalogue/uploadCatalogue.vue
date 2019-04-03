<template>
  <div class="catalogue-wrapper">
    <div v-if="isEditChapter">
      <div class="shadow"></div>
      <div class="editor-wrapper edit-chapter">
        <div>
          <label>章节名</label>
          <input type="text" placeholder="请输入章节名" v-model="tempChapter.title">
        </div>
        <div>
          <label>章节简介</label>
          <input type="text" placeholder="请输入章节简介" v-model="tempChapter.intro">
        </div>
        <div>
          <span @click="saveChapter">完成</span>
          <span @click="cancelChapter">取消</span>
        </div>
      </div>
    </div>
    <div v-if="isEditSession">
      <div class="shadow"></div>
      <div class="editor-wrapper edit-session">
        <div>
          <label>课时名称</label>
          <input type="text" placeholder="请输入课时名称" v-model="tempSession.name">
        </div>
        <div>
          <span>上传课时视频</span>
        </div>
        <div>
          <span @click="saveSession">完成</span>
          <span @click="cancelSession">取消</span>
        </div>
      </div>
    </div>
    <div class="left">
      <el-card class="catalogue">
        <span class="title">课程目录</span>
        <div>
          <div v-for="(chapter,index) in course.catalogue.chapters" :key="index">
            <div>
              <span>第{{number2character(index+1)}}章</span>
              <span>{{chapter.title}}</span>
              <span @click="editChapter(index)">编辑</span>
              <span @click="deleteChapter(index)">删除</span>
            </div>
            <div>{{chapter.intro}}</div>
            <div>
              <div v-if="chapter.sessions">
                <div v-for="(session,sIndex) in chapter.sessions" :key="sIndex"
                     :class="{'session-chosen':isSessionChosen(session.id)}">
                  <div @click="chooseSession(index,sIndex)">
                    <span>{{index+1}}.{{sIndex+1}}</span>
                    <span>{{session.name}}</span>
                    <span>{{session.duration}}</span>
                    <span @click="editSession(index,sIndex)">编辑</span>
                    <span @click="deleteSession(index,sIndex)">删除</span>
                  </div>
                </div>
              </div>
              <div @click="editSession(index,-1)">添加课时</div>
            </div>
          </div>
          <div @click="editChapter(-1)">添加章节</div>
        </div>
      </el-card>
      <el-card class="resources">
        <span class="title">课程课件</span>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="uploadResourceSuccess"
          :on-error="uploadResourceError"
          :on-remove="handleResourceRemove"
          :before-remove="beforeResourceRemove"
          :file-list="course.resources"
          multiple>
          <el-button size="small" type="primary">添加课件</el-button>
        </el-upload>
      </el-card>
    </div>
    <div class="right">
      <div>
        <v-my-video :videoSrc="currentSession.url" :nodes="currentSession.nodes"
                    :duration="currentSession.duration"></v-my-video>
      </div>
      <el-card class="keyword-wrapper">
        <v-keyword-tag v-for="(word,index) in currentSession.keyWords" :key="index" class="keyword-item" :word="word"
                       :index="index"></v-keyword-tag>
        <v-keyword-editor style="margin-top: 20px" :words="currentSession.keyWords" :sid="sessionIndex"
                          @save="saveKeywords"></v-keyword-editor>
      </el-card>
      <div>nodes</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { number2character } from '../../../common/js/numberChange'
  import myvideo from '../../myVideo/myVideo'
  import keywordTag from '../../keywordTag/keywordTag'
  import keywordEditor from '../../keywordEditor/keywordEditor'

  export default {
    name: 'uploadCatalogue',
    props: {
      course: null
    },
    created () {
      this.initCurrentSession()
    },
    data () {
      return {
        currentSession: null,
        tempChapter: null,
        chapterIndex: null,
        sessionIndex: null,
        tempSession: null,
        tempResource: null,
        isEditChapter: false,
        isEditSession: false,
        isEditResource: false
      }
    },
    methods: {
      // 保存课时的关键词修改
      saveKeywords (words) {
        let cIndex = this.currentSession.cIndex
        let sIndex = this.currentSession.sIndex
        this.course.catalogue.chapters[cIndex].sessions[sIndex].keyWords = words
        this.$emit('saveInfo', this.course)
      },
      // 上传课件成功
      uploadResourceSuccess (response, file, fileList) {
        this.course.resources = fileList
        this.$emit('saveInfo', this.course)
      },
      // 上传课件失败
      uploadResourceError (err, file, fileList) {
        this.$message({
          showClose: true,
          message: '上传失败' + err,
          type: 'error'
        })
      },
      // 删除课件
      handleResourceRemove (file, fileList) {
        this.course.resources = fileList
        this.$emit('saveInfo', this.course)
      },
      beforeResourceRemove (file, fileList) {
        return this.$confirm(`此操作将永久删除 ${file.name},是否继续?`)
      },
      // 判断当前课时是否被选中
      isSessionChosen (id) {
        if (!this.currentSession) {
          return false
        } else {
          if (id === this.currentSession.id) {
            return true
          } else {
            return false
          }
        }
      },
      // 初始化当前选择课时
      initCurrentSession () {
        if (this.course.catalogue.chapters[0].sessions[0]) {
          this.currentSession = this.course.catalogue.chapters[0].sessions[0]
          this.currentSession.cIndex = 0
          this.currentSession.sIndex = 0
        }
      },
      number2character (n) {
        return number2character(n)
      },
      chooseSession (index, sIndex) {
        this.currentSession = this.course.catalogue.chapters[index].sessions[sIndex]
        this.currentSession.cIndex = index
        this.currentSession.sIndex = sIndex
      },
      // 删除课时
      deleteSession (index, sIndex) {
        if (this.course.catalogue.chapters[index].sessions[sIndex].id === this.currentSession.id) {
          this.course.catalogue.chapters[index].sessions.splice(sIndex, 1)
          this.$emit('saveInfo', this.course)
          this.initCurrentSession()
          return
        }
        this.course.catalogue.chapters[index].sessions.splice(sIndex, 1)
        this.$emit('saveInfo', this.course)
      },
      // 编辑章节
      editChapter (index) {
        this.chapterIndex = index
        if (this.chapterIndex !== -1) {
          this.tempChapter = Object.assign({}, this.course.catalogue.chapters[this.chapterIndex])
        } else {
          this.tempChapter = {
            id: null,
            title: null,
            intro: null,
            sessions: []
          }
        }
        this.isEditChapter = true
      },
      // 保存章节
      saveChapter () {
        if (this.chapterIndex !== -1) {
          this.course.catalogue.chapters[this.chapterIndex] = this.tempChapter
        } else {
          this.course.catalogue.chapters.push(this.tempChapter)
        }
        this.$emit('saveInfo', this.course)
        this.isEditChapter = false
      },
      cancelChapter () {
        this.isEditChapter = false
      },
      deleteChapter (index) {
        this.course.catalogue.chapters.splice(index, 1)
        this.$emit('saveInfo', this.course)
      },
      editSession (index, sIndex) {
        this.chapterIndex = index
        this.sessionIndex = sIndex
        if (this.sessionIndex !== -1) {
          this.tempSession = Object.assign({}, this.course.catalogue.chapters[this.chapterIndex].sessions[this.sessionIndex])
        } else {
          this.tempSession = {
            id: null,
            name: null,
            url: 1,
            duration: null,
            keyWords: [],
            nodes: []
          }
        }
        this.isEditSession = true
      },
      saveSession () {
        this.tempSession.id = this.tempSession.name
        if (this.sessionIndex !== -1) {
          this.course.catalogue.chapters[this.chapterIndex].sessions[this.sessionIndex] = this.tempSession
        } else {
          this.course.catalogue.chapters[this.chapterIndex].sessions.push(this.tempSession)
        }
        this.$emit('saveInfo', this.course)
        this.cancelSession()
      },
      cancelSession () {
        this.isEditSession = false
      }
    },
    components: {
      'v-my-video': myvideo,
      'v-keyword-tag': keywordTag,
      'v-keyword-editor': keywordEditor
    }
  }
</script>

<style lang="stylus" scoped>
  .catalogue-wrapper
    height 800px

    .editor-wrapper
      position fixed
      top 0
      bottom 0
      right 0
      left 0
      margin auto
      background white
      z-index 99

    .edit-chapter
      width 400px
      height 400px

    .edit-session
      width 400px
      height 400px

    .left
      display inline-block
      width 450px

      .title
        display inline-block
        margin-bottom 20px
        font-size: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;

      .catalogue
        margin-bottom 40px
        height 500px
        overflow auto

      .session-chosen
        background grey

    .right
      display inline-block
      width 500px

      .keyword-wrapper
        width 100%
        margin-top 15px

        .keyword-item
          cursor pointer
          display inline-block
          margin-right 10px
          margin-bottom 10px

</style>
