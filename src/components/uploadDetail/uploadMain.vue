<template>
  <div>
    <div class="shadow" v-show="isShadowShow"></div>
    <div class="upload-wrapper">
      <div>
        <router-link :to="{name:'upload'}">我的上传管理/</router-link>
        <span>{{course.name}}课程管理</span>
      </div>
      <div>
        <span @click="$router.replace({name:'uploadInfo'})">课程信息</span>
        <span @click="$router.replace({name:'uploadCatalogue'})">课程目录</span>
        <span @click="$router.replace({name:'uploadResource'})">课程课件</span>
        <span @click="$router.replace({name:'uploadTest'})">课程测试</span>
      </div>
      <router-view :course="course" @hideShadow="hideShadow"
                   @showShadow="showShadow" @saveBaseInfo="saveBaseInfo"></router-view>
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
        isShadowShow: false
      }
    },
    created () {
      this.course = UPLOAD_COURSE
    },
    methods: {
      showShadow () {
        this.isShadowShow = true
      },
      hideShadow () {
        this.isShadowShow = false
      },
      saveBaseInfo (baseInfo) {
        this.course.name = baseInfo.name
        this.course.subtitle = baseInfo.subtitle
        this.course.img = baseInfo.image
        this.course.category1 = baseInfo.category1
        this.course.category2 = baseInfo.category2
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .shadow
    z-index 98
    background rgba(0, 0, 0, 0.3)
    width 100%
    height 100%
    position fixed

  .upload-wrapper
    width 1024px
    margin 0 auto
</style>
