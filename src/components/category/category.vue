<!-- 一级分类页 -->
<template>
  <div class="category-wrapper">
    <div class="nav-container">
      <div class="category-box">
        <ul class="category-list clearfix">
          <li class="category-item">学习方向</li>
          <li v-for="(item, index) in category" :key="index"
              :class="getCategoryClassName(item.id, item.second)">
            <router-link :to="{name: 'category', params:{cid: item.id}}">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="sub-category">
        <ul class="category-list clearfix">
          <li class="category-item">分类</li>
          <li :class="currentCategoryType === 1 ? 'category-item-on' : 'category-item'">
            <router-link :to="{name: 'category', params:{cid: categoryId}}">全部</router-link>
          </li>
          <li v-for="(item, index) in subCategory" :key="index"
              :class="getSubCategoryClassName(item.id)">
            <router-link :to="{name: 'category', params:{cid: item.id}}">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div style="background-color: #C9C9C9; height: 1px"></div>
    <div class="course-list-container">
      <div class="sorting">
        <span :class="sortingType === 0 ? 'sorting-on' : ''" @click="sorting(0)">热度<img src="/images/hot.png"></span>
        <span :class="sortingType === 1 ? 'sorting-on' : ''" @click="sorting(1)">好评<img src="/images/like.png"></span>
        <span :class="sortingType === 2 ? 'sorting-on' : ''" @click="sorting(2)">最新<img src="/images/new.png"></span>
      </div>
      <div class="course-list">
        <course-card-vertical v-for="(course, i) in courses" :key="i" :course="course"></course-card-vertical>
      </div>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="this.totalCourse"
          :current-page="currentPage"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { PRIMARY_CATEGORY } from './js/category'
  import { COURSE_LIST } from './js/courseList'
  import courseCardVertical from '../courseCardVertical/courseCardVertical'

  export default {
    name: 'category',
    components: {
      courseCardVertical
    },
    data () {
      return {
        // 一级分类
        category: [],
        subCategory: [],
        // 推荐课程
        courses: [],
        // 当前分类是一级分类还是二级分类
        currentCategoryType: 1,
        // 当前分类所属的一级分类
        categoryId: 0,
        // 当前页
        currentPage: 1,
        // 当前分类下的总课程数
        totalCourse: 0,
        pageSize: 20,
        // 排序规则
        sortingType: 0
      }
    },
    created () {
      console.log(`when created, currentPage is ${this.currentPage}`)
      // 获取一级分类
      this.category = PRIMARY_CATEGORY
      this.subCategory = this.category[0].second || []
      // 后台获取课程
      this.getCourses()
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log(`to is ${to.params.cid}, from is ${from.params.cid}`)
        console.log(`when route changes, currentPage is ${this.currentPage}`)
        this.getCourses()
        console.log(`change currentPage, currentPage is ${this.currentPage}`)
      }
    },
    methods: {
      // 获取导航栏一级分类item的类名
      getCategoryClassName (id, second) {
        let className = ''
        let route = String(this.$route.params.cid)
        let self = this
        if (String(id) === route) {
          self.subCategory = second
          self.currentCategoryType = 1
          self.categoryId = id
          className = 'category-item-on'
        } else {
          second.forEach(function (item) {
            if (String(item.id) === route) {
              self.subCategory = second
              self.currentCategoryType = 2
              self.categoryId = id
              className = 'category-item-on'
            }
          })
        }
        return className
      },
      // 获取导航栏二级分类item的类名
      getSubCategoryClassName (id) {
        let className = 'category-item'
        if (this.currentCategoryType === 2 && String(id) === String(this.$route.params.cid)) {
          className = 'category-item-on'
        }
        return className
      },
      // 获取分类课程
      getCourses () {
        this.currentPage = Number(this.$route.query.p) || 1
        this.sortingType = Number(this.$route.query.type) || 0
        // 获取后台课程数据
        // ...post({cid: this.$route.params.cid, currentPage: this.currentPage, pageSize: this.pageSize})
        this.courses = COURSE_LIST.courses
        this.totalCourse = COURSE_LIST.courseNum
      },
      // 当前页变化
      handleCurrentChange (page) {
        this.$router.push({ name: 'category', params: this.$route.params, query: { p: page } })
      },
      // 排序
      sorting (type) {
        if (this.sortingType !== type) {
          this.$router.push({ name: 'category', params: this.$route.params, query: { p: '1', type: type } })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .category-wrapper
    width 1024px
    margin auto
    font-family PingFangSC-Regular
    color rgba(51,51,51,1)
    line-height 22px

    .category-item-on
      padding-bottom 2px
      border-bottom solid #979797 1px

    ul.category-list
      padding-bottom 32px
      li
        float left
        margin-right 33px
        &:first-child
          font-size 16px
          font-family PingFangSC-Medium
          font-weight 600
        a:hover
          text-decoration none
          color #979797

    .pagination
      margin 30px 0
      text-align center

    .course-list-container
      .sorting
        padding-top 26px
        span
          cursor pointer
          margin-right 27px
          &:hover
            color #979797
        img
          padding-left 6px
          vertical-align middle

    .sorting-on
      font-weight 600
</style>
