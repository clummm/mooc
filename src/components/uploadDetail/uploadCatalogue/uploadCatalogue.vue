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
      <div>
        <p>课程目录</p>
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
      </div>
      <div>
        <span>课程课件</span>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="uploadResourceSuccess"
          :on-error="uploadResourceError"
          :on-progress="uploadResourceProgress"
          :on-preview="handleResourcePreview"
          :on-remove="handleResourceRemove"
          :before-remove="beforeResourceRemove"
          :file-list="course.resources"
          multiple>
          <el-button size="small" type="primary">添加课件</el-button>
        </el-upload>
      </div>
    </div>
    <div class="right">
      <div>
        <v-my-video :videoSrc="currentSession.url" :nodes="currentSession.nodes"></v-my-video>
      </div>
      <div>keywords</div>
      <div>nodes</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { number2character } from '../../../common/js/numberChange'
  import myvideo from '../../courseVideo/myVideo/myVideo'

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
      uploadResourceSuccess (response, file, fileList) {
        this.course.resources = fileList
        this.$emit('saveInfo', this.course)
      },
      uploadResourceError (err, file, fileList) {
        console.log('error:' + err)
      },
      handleResourceRemove (file, fileList) {
        this.course.resources = fileList
        this.$emit('saveInfo', this.course)
      },
      beforeResourceRemove (file, fileList) {
        return this.$confirm(`此操作将永久删除 ${file.name},是否继续?`)
      },
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
      initCurrentSession () {
        if (this.course.catalogue.chapters[0].sessions[0]) {
          this.currentSession = this.course.catalogue.chapters[0].sessions[0]
        }
      },
      number2character (n) {
        return number2character(n)
      },
      chooseSession (index, sIndex) {
        this.currentSession = this.course.catalogue.chapters[index].sessions[sIndex]
      },
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
      'v-my-video': myvideo
    }
  }
</script>

<style lang="stylus" scoped>
  .catalogue-wrapper
    height 500px
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

      .session-chosen
        background grey

    .right
      display inline-block
      width 500px

</style>
