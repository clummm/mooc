<template>
  <div class="upload-info-wrapper">
    <div class="editor-base-info editor" v-if="isEditBaseInfo">
      <div>
        <span>课程封面</span>
        <div>
          <img :src="tempImage" width="250" height="150">
          <span>点击更换图片</span>
        </div>
      </div>
      <div>
        <span>标题：</span>
        <input type="text" v-model="tempTitle">
      </div>
      <div>
        <span>副标题：</span>
        <input type="text" v-model="tempTitle" placeholder="请输入课程副标题">
      </div>
      <div>
        <span>分类：</span>
        <span>{{course.category1.name}}</span>
        <span>{{course.category2.name}}</span>
      </div>
      <div>
        <span @click="saveBaseInfo">保存</span>
        <span @click="cancelBaseInfo">取消</span>
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
          <div>
            <span>分类：</span>
          </div>
        </div>
        <div class="base-info-category">
          <span>分类：</span>
          <span>{{course.category1.name}}</span>
          <span>{{course.category2.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'uploadInfo',
    props: {
      course: null
    },
    data () {
      return {
        tempTitle: null,
        tempSubTitle: null,
        tempImage: null,
        tempCategory1: null,
        tempCategory2: null,
        isEditBaseInfo: false
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
        this.tempTitle = this.course.name
        this.tempSubTitle = this.course.subtitle
        this.tempImage = this.course.img
        this.tempCategory1 = this.course.category1
        this.tempCategory2 = this.course.category2
        this.isEditBaseInfo = true
        this.showShadow()
      },
      saveBaseInfo () {
        let baseInfo = {
          name: this.tempTitle,
          subtitle: this.tempSubTitle,
          image: this.tempImage,
          category1: this.tempCategory1,
          category2: this.tempCategory2
        }
        this.$emit('saveBaseInfo', baseInfo)
        this.isEditBaseInfo = false
        this.hideShadow()
      },
      cancelBaseInfo () {
        this.isEditBaseInfo = false
        this.hideShadow()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .upload-info-wrapper
    .editor
      width 400px
      height 400px
      position absolute
      top 0
      bottom 0
      right 0
      left 0
      margin auto
      background white
      z-index 99

    .base-info-name
      display inline-block

    .base-info-category
      display inline-block
</style>
