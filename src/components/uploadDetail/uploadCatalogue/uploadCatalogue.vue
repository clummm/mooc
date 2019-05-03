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
            <div class="chapter">
              <span>第{{number2character(index+1)}}章 </span>
              <span>{{chapter.title}}</span>
              <el-button type="text" plain @click="editChapter(index)" style="float: right">编辑</el-button>
              <el-button type="text" plain @click="deleteChapter(index)" style="float: right;margin-right: 10px">删除</el-button>
            </div>
            <div class="intro">{{chapter.intro}}</div>
            <div >
              <div v-if="chapter.sessions">
                <div v-for="(session,sIndex) in chapter.sessions" :key="sIndex"
                     :class="{'session-chosen':isSessionChosen(session.id)}">
                  <div @click="chooseSession(index,sIndex)" class="session">
                    <span>{{index+1}}.{{sIndex+1}}</span>
                    <span>{{session.name}}</span>
                    <span>{{session.duration}}</span>
                    <span @click="editSession(index,sIndex)">编辑</span>
                    <span @click="deleteSession(index,sIndex)">删除</span>
                  </div>
                </div>
              </div>
              <el-button size="mini" style="margin: 10px" @click="editSession(index,-1)">添加课时</el-button>
            </div>
          </div>
          <el-button size="mini" style="margin: 10px" @click="editChapter(-1)">添加章节</el-button>
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
        <v-my-video :videoSrc="currentSession.url" :nodes="currentSession.nodes" :preview="currentSession.preview"
                    :duration="currentSession.duration" ref="video"></v-my-video>
      </div>
      <el-card class="keyword-wrapper">
        <v-keyword-tag v-for="(word,index) in currentSession.keyWords" :key="index" class="keyword-item" :word="word"
                       :index="index"></v-keyword-tag>
        <v-keyword-editor style="margin-top: 10px" :words="currentSession.keyWords" :sid="sessionIndex"
                          @save="saveKeywords"></v-keyword-editor>
      </el-card>
      <el-card style="margin-top: 20px">
        <el-button size="mini" @click="addNode">添加节点</el-button>
        <el-button size="mini" @click="autoNode">自动生成</el-button>
        <el-table
          :data="currentSession.nodes"
          style="width: 100%">
          <el-table-column
            label="节点名称"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="时间点"
            width="180">
            <template slot-scope="scope">
              <span>{{secToTimer(scope.row.time)}}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <i class="el-icon-circle-close-outline node-delete" @click="deleteNode(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { number2character } from '../../../../public/js/numberChange'
  import { secToTimer } from '../../../../public/js/Time'
  import myvideo from '../../myVideo/myVideo'
  import keywordTag from '../../keyword/keywordTag/keywordTag'
  import keywordEditor from '../../keyword/keywordEditor/keywordEditor'

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
      autoNode () {
        this.currentSession.nodes = [
          { name: '自动生成节点1', time: 10 },
          { name: '自动生成节点2', time: 20 },
          { name: '自动生成节点3', time: 30 }
        ]
      },
      // 添加节点
      addNode () {
        let time = this.$refs.video.video.currentTime
        this.$prompt('请输入节点名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{0,10}$/,
          inputErrorMessage: '节点名称不能超过10个字符'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '节点添加成功 '
          })
          this.currentSession.nodes.push({
            name: value,
            time: time
          })
        })
      },
      // 删除节点
      deleteNode (index) {
        this.currentSession.nodes.splice(index, 1)
      },
      secToTimer (time) {
        return secToTimer(time)
      },
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
        line-height: 28px
      .catalogue
        margin-bottom 40px
        height 500px
        overflow auto
        .chapter
          font-weight 700
        .intro
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          margin 10px 0
        .session
          margin 10px 0
      .session-chosen
        background rgba(4, 156, 255, .5);

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

      .node-delete
        cursor pointer

        &:hover
          color rgba(4, 156, 255, 1);

</style>
