<template>
  <div class="course-wrapper">
    <img :src="course.img" width="142" height="74" class="icon" @click="rHelp.openCourseNewWindow(item.id)"
         style="cursor: pointer">
    <div class="info">
      <div class="title" @click="rHelp.openCourseNewWindow(course.id)">{{course.name}}</div>
      <div class="subtitle">{{course.subtitle}}</div>
      <v-rate :score="course.rating" class="rate"></v-rate>
      <span class="learning-count"><img src="./people.png" width="10" height="10" style="margin-right: 8px">{{course.learningCount}}人学过</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import rate from '../../rate/rate'

  export default {
    name: 'courseItem',
    props: {
      course: null
    },
    components: {
      'v-rate': rate
    }
  }
</script>

<style lang="stylus" scoped>
  .course-wrapper
    height 74px
    width 350px
    .icon
      border-radius 5px
      margin-right 8px

    .info
      display inline-block
      width 200px
      vertical-align top

      .title
        cursor pointer
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 17px;

      .subtitle
        margin-top 6px
        font-size: 10px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 14px;

      .rate
        display inline-block
        margin-right 14px

      .learning-count
        font-size: 10px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 14px;

</style>
