<template>
  <div class="upload-info-wrapper">
    <div class="editor-base-info editor" v-if="isEditBaseInfo">
      <div>
        <span>课程基本信息</span>
        <span @click="cancelBaseInfo">关闭</span>
      </div>
      <div>
        <span>课程封面</span>
        <div>
          <img :src="tempCourse.img" width="250" height="150">
          <span>点击更换图片</span>
        </div>
      </div>
      <div>
        <span>标题：</span>
        <input type="text" v-model="tempCourse.name">
      </div>
      <div>
        <span>副标题：</span>
        <input type="text" v-model="tempCourse.subtitle" placeholder="请输入课程副标题">
      </div>
      <div>
        <span>分类：</span>
        <el-cascader
          expand-trigger="hover"
          size="small"
          :options="options"
          :props="props"
          v-model="tempOptions">
        </el-cascader>
      </div>
      <div>
        <span @click="saveBaseInfo">保存</span>
        <span @click="cancelBaseInfo">取消</span>
      </div>
    </div>
    <v-keywords class="editor" :words="tempCourse.keyWords" v-if="isEditKeywords" @saveKeywords="saveKeywords"
                @cancelKeywords="cancelKeywords"></v-keywords>
    <div class="editor editor-area" v-if="isEditArea">
      <div>{{areaTitle}}</div>
      <v-quill-editor
        class="quill-editor-size"
        v-model="areaContent"
        :options="editorOption"
      >
      </v-quill-editor>
      <div>
        <span @click="saveArea">保存</span>
        <span @click="cancelArea">取消</span>
      </div>
    </div>
    <div>
      <div>
        <span>基本信息</span>
        <span @click="editBaseInfo">编辑</span>
      </div>
      <div>
        <img :src="course.img" width="250" height="150">
        <div class="base-info-name">
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
      <div class="keywords-wrapper">
        <span>关键词</span>
        <div class="keywords-words-wrapper">
          <div class="keywords-item" v-for="(item,index) in course.keyWords" :key="index"
               @mouseenter="showMeaning(index)" @mouseleave="hideMeaning(index)">
            <p class="keywords-words">{{item.keyword}}</p>
            <div class="keywords-meaning" v-show="course.keyWords[index].isMeaningShow">
              <div v-html="item.meaning"></div>
              <div>
                <span @click="modifyMeaning(index)">改善解释</span>
                <span>查看更多</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span @click="editKeyword">手动编辑</span>
          <span @click="autoKeywords">智能生成</span>
        </div>
      </div>
      <div>
        <div>
          <span>课程简介</span>
          <span @click="editArea(0)">编辑</span>
        </div>
        <div v-html="course.intro"></div>
      </div>
      <div>
        <div>
          <span>课程须知</span>
          <span @click="editArea(1)">编辑</span>
        </div>
        <div v-html="course.needToKnow"></div>
      </div>
      <div>
        <div>
          <span>老师告诉你能学到什么</span>
          <span @click="editArea(2)">编辑</span>
        </div>
        <div v-html="course.gains"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { SELECT_CATEGORY } from './category'
  import keywordsEditor from '../keywordsEditor/keywordsEditor'
  import { quillEditor } from 'vue-quill-editor'

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
        isEditKeywords: false,
        isEditArea: false,
        currentKeyword: null,
        currentArea: null,
        areaContent: null,
        areaTitle: null,
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
      hideShadow () {
        this.$emit('hideShadow')
      },
      showShadow () {
        this.$emit('showShadow')
      },
      editBaseInfo () {
        this.tempCourse = Object.assign({}, this.course)
        if (this.course.category1) {
          this.tempOptions = [this.course.category1.id, this.course.category2.id]
        } else {
          this.tempOptions = []
        }
        this.isEditBaseInfo = true
        this.showShadow()
      },
      saveBaseInfo () {
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
        this.hideShadow()
      },
      cancelBaseInfo () {
        this.isEditBaseInfo = false
        this.hideShadow()
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
        this.showShadow()
        this.hideMeaning(index)
      },
      editKeyword () {
        this.tempCourse = Object.assign({}, this.course)
        this.tempCourse.keyWords = []
        for (let i = 0, j = this.course.keyWords.length; i < j; i++) {
          this.tempCourse.keyWords.push(this.course.keyWords[i])
        }
        this.isEditKeywords = true
        this.showShadow()
      },
      // 保存手动编辑关键词结果
      saveKeywords () {
        this.$emit('saveInfo', this.tempCourse)
        this.isEditKeywords = false
        this.hideShadow()
      },
      // 取消手动编辑关键词
      cancelKeywords () {
        this.isEditKeywords = false
        this.hideShadow()
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
        this.showShadow()
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
        this.isEditArea = false
        this.hideShadow()
      },
      cancelArea () {
        this.isEditArea = false
        this.hideShadow()
      }
    },
    components: {
      'v-keywords': keywordsEditor,
      'v-quill-editor': quillEditor
    }
  }
</script>

<style lang="stylus" scoped>
  .upload-info-wrapper
    .editor
      position absolute
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

      .base-info-name
        display inline-block

    .editor-keywords
      width 800px
      height 300px

    .editor-area
      width 400px
      height 400px

      .quill-editor-size
        width 400px
        height 200px
        margin-bottom 58px

    .keywords-wrapper
      .keywords-words-wrapper
        .keywords-item
          position relative
          display inline-block
          width 80px
          height 50px
          margin 5px 5px
          background grey
          text-align center

          .keywords-meaning
            position absolute
            height 100px
            width 200px
            top -100px
            background grey

          .keywords-words
            line-height 50px
</style>
