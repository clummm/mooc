<template>
  <div class="upload-info-wrapper">
    <el-card class="card">
      <span class="title">基本信息</span>
      <el-button @click="editBaseInfo" type="text" style="float: right">编辑</el-button>
      <div class="base-info">
        <div v-if="!isEditBaseInfo">
          <img :src="course.img" width="250" height="150" class="img">
          <div class="text">
            <div>
              <span>标题：</span>
              <span>{{course.name}}</span>
            </div>
            <div>
              <span>副标题：</span>
              <span v-if="course.subtitle">{{course.subtitle}}</span>
            </div>
            <div class="base-info-category">
              <span>分类：</span>
              <span>{{course.category1.name}}/</span>
              <span>{{course.category2.name}}</span>
            </div>
          </div>
        </div>
        <div v-else class="base-info-editor">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <div v-if="tempCourse.img" class="avatar">
              <img :src="tempCourse.img" width="100%" height="100%" style="border-radius: 8px">
              <div class="hint">点击上传</div>
            </div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-form :model="tempCourse" :rules="baseInfoRules" ref="baseInfoForm" label-width="100px"
                   class="demo-ruleForm base-info-form">
            <el-form-item label="课程标题:" prop="title">
              <el-input v-model="tempCourse.name" placeholder="请输入课程标题" class="base-info-input"></el-input>
            </el-form-item>
            <el-form-item label="课程副标题:">
              <el-input v-model="tempCourse.subtitle" placeholder="请输入课程副标题" class="base-info-input"></el-input>
            </el-form-item>
            <el-form-item label="课程分类:">
              <el-cascader
                expand-trigger="hover"
                size="small"
                :options="options"
                :props="props"
                v-model="tempOptions">
              </el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="saveBaseInfo">完成</el-button>
              <el-button size="mini" @click="cancelBaseInfo">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="card keyword-wrapper">
      <v-keyword-tag v-for="(word,index) in course.keyWords" :key="index" class="keyword-item" :word="word"
                     :index="index"></v-keyword-tag>
      <v-keyword-editor style="margin-top: 10px" :words="course.keyWords"
                        @save="saveKeywords"></v-keyword-editor>
    </el-card>
    <el-card class="card">
      <div>
        <span class="title">课程简介</span>
        <el-button @click="editArea(0)" type="text" style="float: right">编辑</el-button>
      </div>
      <div v-if="currentArea!==0" v-html="course.intro"></div>
      <div v-else>
        <v-quill-editor
          class="quill-editor-size"
          v-model="areaContent"
          :options="editorOption"
        >
        </v-quill-editor>
        <div style="margin-top: 20px">
          <el-button size="mini" type="primary" @click="saveArea">保存</el-button>
          <el-button size="mini" @click="cancelArea">取消</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="card">
      <div>
        <span class="title">课程须知</span>
        <el-button @click="editArea(1)" type="text" style="float: right">编辑</el-button>
      </div>
      <div v-if="currentArea!==1" v-html="course.needToKnow"></div>
      <div v-else>
        <v-quill-editor
          class="quill-editor-size"
          v-model="areaContent"
          :options="editorOption"
        >
        </v-quill-editor>
        <div style="margin-top: 20px">
          <el-button size="mini" type="primary" @click="saveArea">保存</el-button>
          <el-button size="mini" @click="cancelArea">取消</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="card" style="margin-bottom: 60px">
      <div>
        <span class="title">老师告诉你能学到什么</span>
        <el-button @click="editArea(2)" type="text" style="float: right">编辑</el-button>
      </div>
      <div v-if="currentArea!==2" v-html="course.gains"></div>
      <div v-else>
        <v-quill-editor
          class="quill-editor-size"
          v-model="areaContent"
          :options="editorOption"
        >
        </v-quill-editor>
        <div style="margin-top: 20px">
          <el-button size="mini" type="primary" @click="saveArea">保存</el-button>
          <el-button size="mini" @click="cancelArea">取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import { SELECT_CATEGORY } from './category'
  import { quillEditor } from 'vue-quill-editor'
  import keywordTag from '../../keywordTag/keywordTag'
  import keywordEditor from '../../keywordEditor/keywordEditor'

  const INTRO = 0
  const NEED_KNOW = 1
  const GAINS = 2
  const MEANING = 3
  export default {
    name: 'uploadInfo',
    props: {
      course: null
    },
    data () {
      return {
        options: SELECT_CATEGORY,
        props: {
          value: 'id',
          label: 'name'
        },
        tempOptions: [],
        tempCourse: null,
        isEditBaseInfo: false,
        baseInfoRules: {
          title: [
            // { required: true, message: '课程标题不能为空', trigger: 'blur' },
            { min: 3, max: 15, message: '课程长度在 3 到 15 个字符', trigger: 'blur' }
          ]
        },
        isEditKeywords: false,
        currentKeyword: null,
        currentArea: null,
        areaContent: null,
        areaPlaceholder: null,
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block']
            ]
          },
          placeholder: this.areaPlaceholder
        }
      }
    },
    methods: {
      // 上传课程封面成功
      handleAvatarSuccess (res, file) {
        this.tempCourse.img = URL.createObjectURL(file.raw)
      },
      saveKeywords (words) {
        this.course.keyWords = words
      },
      editBaseInfo () {
        this.tempCourse = Object.assign({}, this.course)
        if (this.course.category1) {
          this.tempOptions = [this.course.category1.id, this.course.category2.id]
        } else {
          this.tempOptions = []
        }
        this.isEditBaseInfo = true
      },
      saveBaseInfo () {
        this.$refs.baseInfoForm.validate((valid) => {
          if (valid) {
            let c1 = SELECT_CATEGORY[this.tempOptions[0] / 4]
            this.tempCourse.category1 = {
              id: c1.id,
              name: c1.name
            }
            this.tempCourse.category2 = {
              id: c1.children[this.tempOptions[1] % 4 - 1].id,
              name: c1.children[this.tempOptions[1] % 4 - 1].name
            }
            this.$emit('saveInfo', this.tempCourse)
            this.isEditBaseInfo = false
          }
        })
      },
      cancelBaseInfo () {
        this.isEditBaseInfo = false
      },
      showMeaning (index) {
        this.course.keyWords[index].isMeaningShow = true
      },
      hideMeaning (index) {
        this.course.keyWords[index].isMeaningShow = false
      },
      modifyMeaning (index) {
        this.currentArea = MEANING
        this.currentKeyword = index
        this.areaTitle = this.course.keyWords[index].keyword + '在本课程的解释'
        this.areaContent = this.course.keyWords[index].meaning
        this.areaPlaceholder = '请输入' + this.course.keyWords[index].keyword + '在本课程的解释'
        this.isEditArea = true
        this.hideMeaning(index)
      },
      editKeyword () {
        this.tempCourse = Object.assign({}, this.course)
        this.tempCourse.keyWords = []
        for (let i = 0, j = this.course.keyWords.length; i < j; i++) {
          this.tempCourse.keyWords.push(this.course.keyWords[i])
        }
        this.isEditKeywords = true
      },
      // 取消手动编辑关键词
      cancelKeywords () {
        this.isEditKeywords = false
      },
      // 自动生成关键词
      autoKeywords () {
        let k = [
          {
            keyword: '自动生成1',
            meaning: '自动生成1的解释',
            isMeaningShow: false
          },
          {
            keyword: '自动生成2',
            meaning: '自动生成2的解释',
            isMeaningShow: false
          }, {
            keyword: '自动生成3',
            meaning: '自动生成3的解释',
            isMeaningShow: false
          }, {
            keyword: '自动生成4',
            meaning: '自动生成4的解释',
            isMeaningShow: false
          },
          {
            keyword: '自动生成5',
            meaning: '自动生成5的解释',
            isMeaningShow: false
          }
        ]
        this.course.keyWords = k
      },
      editArea (type) {
        this.currentArea = type
        if (this.currentArea === INTRO) {
          this.areaTitle = '简介'
          this.areaContent = this.course.intro
          this.areaPlaceholder = '请输入课程简介'
        } else if (this.currentArea === NEED_KNOW) {
          this.areaTitle = '课程须知'
          this.areaContent = this.course.needToKnow
          this.areaPlaceholder = '请输入课程须知'
        } else if (this.currentArea === GAINS) {
          this.areaTitle = '老师告诉你能学到什么'
          this.areaContent = this.course.gains
          this.areaPlaceholder = '请告诉学生本课程能学到什么'
        }
        this.isEditArea = true
      },
      saveArea () {
        if (this.currentArea === INTRO) {
          this.course.intro = this.areaContent
        } else if (this.currentArea === NEED_KNOW) {
          this.course.needToKnow = this.areaContent
        } else if (this.currentArea === GAINS) {
          this.course.gains = this.areaContent
        } else if (this.currentArea === MEANING) {
          this.course.keyWords[this.currentKeyword].meaning = this.areaContent
        }
        this.$emit('saveInfo', this.course)
        this.isEditArea = null
      },
      cancelArea () {
        this.currentArea = null
      }
    },
    components: {
      'v-quill-editor': quillEditor,
      'v-keyword-tag': keywordTag,
      'v-keyword-editor': keywordEditor
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../common/style/popwindow.css"
  .avatar-uploader .el-upload {
    display inline-block
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar
    width: 250px;
    height: 150px;
    display: inline-block;
    position relative

    .hint
      position absolute
      bottom 0
      width 100%
      background rgba(0, 0, 0, 0.5)
      color white
      text-align center
      font-family: PingFangSC-Regular;
      font-weight: 400
      font-size 14px
      line-height 24px
      border-radius 0 0 8px 8px

  .upload-info-wrapper
    .card
      margin-top 20px

    .editor
      position fixed
      top 0
      bottom 0
      right 0
      left 0
      margin auto
      background white
      z-index 99

    .editor-base-info
      width 400px
      height 400px

    .editor-area
      width 400px
      height 400px

      .quill-editor-size
        width 400px
        height 200px
        margin-bottom 58px

    .title
      display inline-block
      font-size: 18px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 25px;
      margin-bottom 20px

    .base-info
      .img
        border-radius 8px
        margin-right 20px

      .text
        vertical-align top
        display inline-block
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;

      .base-info-editor
        position relative
        height 240px

        .base-info-form
          position absolute
          top: 0
          left 250px
          width 50%

          .base-info-input
            display inline-block

    .keyword-wrapper
      .keyword-item
        display inline-block
        margin-right 10px
        margin-bottom 10px
</style>
