<!-- 我的课程 -->
<template>
  <div class="main-wrapper">
    <div class="top-tabs">
      <span class="my-course" @click="changMyCourse">我的收藏</span>
      <span class="history" @click="changeHistory">历史足迹</span>
    </div>
    <div class="content-wrapper" :is="currentComponent" :data="isCurrentMyCourse?myCourse:history"
         @deleteCourse="deleteCourse" @addCourse="addCourse" @deleteHistory="deleteHistory"
         @deleteCourseById="deleteCourseById"></div>
  </div>
</template>

<script>
  import { MY_COURSE, HISTORY } from '../../../common/js/data'
  import myCourse from './myCourse/myCourse'
  import myHistory from './myHistory/myHistory'

  export default {
    name: 'courseList',
    data () {
      return {
        myCourse: null,
        history: null,
        currentComponent: myCourse
      }
    },
    created () {
      // 向后台请求我收藏的课程列表
      this.myCourse = MY_COURSE
    },
    methods: {
      changeHistory () {
        this.currentComponent = myHistory
        // 如果历史记录还未请求则向后台请求历史记录
        if (!this.history) {
          this.history = HISTORY
        }
      },
      changMyCourse () {
        this.currentComponent = myCourse
      },
      // 删除收藏的课程
      deleteCourse (index) {
        // 查看历史足迹中是否有要取消收藏的课程，如果有更改该用户对其的收藏状态
        let id = this.myCourse[index].id
        if (this.history) {
          for (let i = 0; i < this.history.length; i++) {
            if (this.history[i].id === id) {
              this.history[i].like = false
            }
          }
        }
        this.myCourse.splice(index, 1)
        // 通知后台删除
      },
      // 在历史足迹收藏新的课程
      addCourse (course, index) {
        this.myCourse.push(course)
        this.history[index].like = true
        // 通知后台
      },
      // 删除历史足迹
      deleteHistory (index) {
        this.history.splice(index, 1)
        // 通知后台
      },
      // 在历史足迹取消课程的收藏
      deleteCourseById (id, index) {
        this.history[index].like = false
        for (var i = 0; i < this.myCourse.length; i++) {
          if (this.myCourse[i].id === id) {
            this.myCourse.splice(i, 1)
            // 通知后台修改该用户对该课程的收藏状态
            break
          }
        }
      }
    },
    computed: {
      isCurrentMyCourse () {
        return this.currentComponent === myCourse
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main-wrapper
    .top-tabs
      .my-course
        margin 5px 10px
</style>
