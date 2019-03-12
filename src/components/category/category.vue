<!-- 一级分类页 -->
<template>
  <div class="category-wrapper">
    <div class="nav-container">
      <div class="category-box">
        <ul class="clearfix">
          <li class="category-item">学习方向：</li>
          <li v-for="(item, index) in category" :key="index"
              :class="getCategoryClassName(item.id, item.second)">
            <router-link :to="{name: 'category', params:{cid: item.id}}">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="sub-category">
        <ul class="clearfix">
          <li class="category-item">分类：</li>
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
    <div class="course-list-container">
      <div class="course-list">
        <div>伪造假数据用于展示</div>
        <div class="course-container" v-for="(course, i) in this.courses" :key="i">
          <router-link class="course" :to="{name: 'course', params:{cid: course.id}}">
            {{course.name}}
          </router-link>
        </div>
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

  export default {
    name: 'category',
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
        pageSize: 20
      }
    },
    created () {
      // 获取一级分类
      this.category = PRIMARY_CATEGORY
      this.subCategory = this.category[0].second || []
      this.getCourses()
    },
    beforeMount () {
      console.log('----beforeMounted----')
    },
    mounted () {
      console.log('----Mounted----')
    },
    beforeUpdate () {
      console.log('----beforeUpdated----')
    },
    updated () {
      console.log('----updated----')
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log(`to is ${to.params.cid}, from is ${from.params.cid}`)
        console.log(`to not equals from ? ${String(to.params.cid) !== String(from.params.cid)}`)
        if (String(to.params.cid) !== String(from.params.cid)) {
          this.getCourses()
          this.currentPage = 1
        }
      }
    },
    methods: {
      // 获取导航栏一级分类item的类名
      getCategoryClassName (id, second) {
        let className = 'category-item'
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
        // 获取后台课程数据
        // ...post({cid: this.$route.params.cid, currentPage: this.currentPage, pageSize: this.pageSize})
        this.courses = COURSE_LIST.courses
        this.totalCourse = COURSE_LIST.courseNum
      },
      // 当前页变化
      handleCurrentChange (page) {
        this.currentPage = page
        this.getCourses()
        console.log(`the page is ${this.currentPage}.`)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .category-wrapper
    width 1024px
    margin auto

    .category-item-on
      font-weight bolder
      float left
      margin-right 5px

    .category-item
      float left
      margin-right 5px

     .pagination
       text-align center

    .course-container
      border silver solid 1px
      width 200px
      height 100px
      margin 20px
      display inline-block
</style>
