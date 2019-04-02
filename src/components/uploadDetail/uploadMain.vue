<template>
  <div class="upload-wrapper">
    <div class="shadow" v-show="isShadowShow"></div>
    <div class="upload-content-wrapper">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{name:'upload'}">我的上传管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{course.name}}课程管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-menu :default-active="currentType" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="0"><i class="el-icon-date"></i> 课程信息</el-menu-item>
        <el-menu-item index="1"><i class="el-icon-tickets"></i> 课程目录</el-menu-item>
        <el-menu-item index="2"><i class="el-icon-edit"></i> 课程测试</el-menu-item>
      </el-menu>
      <router-view :course="course" @saveInfo="saveInfo"></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { UPLOAD_COURSE } from '../../common/js/data'

  export default {
    name: 'uploadMain',
    data () {
      return {
        course: null,
        isShadowShow: false,
        currentType: null
      }
    },
    created () {
      this.checkCurrentType()
      for (let i = 0, j = UPLOAD_COURSE.keyWords.length; i < j; ++i) {
        UPLOAD_COURSE.keyWords[i].isMeaningShow = false
      }
      this.course = UPLOAD_COURSE
      this.course.needToKnow = this.course.needToKnow.replace(/\n/g, '<br>')
      this.course.gains = this.course.gains.replace(/\n/g, '<br>')
      // 新增属性是否显示关键词解释
    },
    methods: {
      checkCurrentType () {
        let name = this.$route.name
        if (name === 'uploadInfo') {
          this.currentType = '0'
        } else if (name === 'uploadCatalogue') {
          this.currentType = '1'
        } else if (name === 'uploadTest' || name === 'testDetail') {
          this.currentType = '2'
        }
      },
      handleSelect (key, keyPath) {
        if (key === '0') {
          this.$router.push('info')
        } else if (key === '1') {
          this.$router.push('catalogue')
        } else if (key === '2') {
          this.$router.push({ name: 'uploadTest' })
        }
      },
      saveInfo (tempInfo) {
        this.course = tempInfo
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .upload-wrapper
    .upload-content-wrapper
      width 1024px
      margin 0 auto
</style>
