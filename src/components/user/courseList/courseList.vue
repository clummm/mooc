<!-- 我的课程 -->
<template>
  <div class="main-wrapper">
    <el-menu :default-active="activeIndex" class="el-menu-demo menu-text" mode="horizontal" @select="handleSelect"
             text-color="#666666" active-text-color="#049CFF">
      <el-menu-item index="0">收藏课程</el-menu-item>
      <el-menu-item index="1">学习记录</el-menu-item>
    </el-menu>
    <div :is="currentComponent" :data="isCurrentMyCourse?myCourse:history"
         @deleteCourse="deleteCourse" @addCourse="addCourse" @deleteHistory="deleteHistory"
         @deleteCourseById="deleteCourseById"></div>
  </div>
</template>

<script>
  import { MY_COURSE, HISTORY } from '../../../../public/js/data'
  import myCourse from './myCourse/myCourse'
  import myHistory from './myHistory/myHistory'

  export default {
    name: 'courseList',
    data () {
      return {
        activeIndex: null,
        myCourse: null,
        history: null,
        currentComponent: myCourse
      }
    },
    created () {
      this.activeIndex = this.$route.params.type + ''
      this.currentComponent = this.activeIndex === '0' ? myCourse : myHistory
      // 向后台请求我收藏的课程列表
      this.myCourse = MY_COURSE
    },
    methods: {
      // 处理tab切换
      handleSelect (index, indexPath) {
        this.currentComponent = index === '0' ? myCourse : myHistory
        if (index === '1' && !this.history) {
          this.history = HISTORY
        }
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
    .menu-text
      font-size: 18px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 25px;
      margin-bottom 7px

</style>
