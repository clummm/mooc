<template>
  <div class="course-card"
       @click="rHelp.openCourseNewWindow(course.id)">
    <div class="course-card-img" :style="{ backgroundImage:'url(' + course.img + ')'}"></div>
    <div class="course-card-content">
      <div class="course-card-title">{{course.name}}</div>
      <div class="course-card-info">
        <span class="course-card-subtitle">{{course.subtitle}}</span>
        <span>{{course.learningCount}}人学过</span>
      </div>
      <div class="course-card-rating">
        <el-rate
          v-model="course.rating"
          disabled>
        </el-rate>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'courseCardVertical',
    props: ['course'],
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .course-card
    font-size 14px
    color rgba(51,51,51,1)
    cursor pointer
    margin 30px 18px 10px 0
    display inline-block
    &:nth-of-type(4n)
      margin-right 0

    .course-card-img
      width 242px
      height 146px
      border-radius 6px
      overflow hidden
      background-size cover
      background-repeat no-repeat
      background-position center

    .course-card-content
      margin-top 12px
      .course-card-title
        font-weight 600

      .course-card-info
        font-size 12px
        color rgba(153,153,153,1)
        margin-top 8px
        .course-card-subtitle
          padding-right 30px
      .course-card-rating
        margin-top 5px

</style>
