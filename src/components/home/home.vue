<!-- 主页 -->
<template>
  <div class="home-wrapper">
    <!--<router-link to="/category">一级分类页</router-link>-->
    <!--<router-link :to="{name: 'user', params:{uid: 1}}">用户id1</router-link>-->
    <!--<a @click="randomCourse">随机课程id</a>-->
    <div class="nav-container clearfix">
      <ul class="nav-wrapper">
        <li class="category-item" v-for="(item, index) in category" :key="index"
            @mouseenter="item.active = true"
            @mouseleave="item.active = false">
          <router-link :to="{name: 'category', params:{cid: item.id}}">{{item.name}}</router-link>
          <ul class="sub-category clearfix">
            <li class="sub-category-item" v-for="(subItem, i) in show3SubCategory(item.second)" :key="i">
              <router-link :to="{name: 'category', params:{cid: subItem.id}}">{{subItem.name}}</router-link>
            </li>
          </ul>
          <div class="sub-category-content" v-if="item.active">
            <div class="inner-box">
              <router-link :to="{name: 'category', params:{cid: subItem.id}}" v-for="(subItem, i) in item.second"
                           :key="i">
                {{subItem.name}}
              </router-link>
            </div>
            <div class="recommend-box">
              <router-link class="recommend" v-for="(course, i) in item.recommend" :key="i"
                           :to="{name: 'course', params:{cid: course.id}}">{{course.name}}
              </router-link>
            </div>
          </div>
        </li>
      </ul>
      <div class="carousel-wrapper">
        <el-carousel trigger="click" height="260px">
          <el-carousel-item v-for="item in carousels" :key="item.id">
            <a :href="item.url">{{ item.title }}</a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="interest-guide-container">
      <div class="interest-guide-wrapper">
        <span>兴趣推荐</span>
        <span class="interest-change">修改兴趣</span>
      </div>
    </div>
    <div class="recommend-box">
    </div>
  </div>
</template>

<script>
  import Category from './js/category'

  export default {
    name: 'home',
    data () {
      return {
        // 轮播图
        carousels: [
          {
            id: 1,
            title: 1,
            url: '#'
          },
          {
            id: 2,
            title: 2,
            url: '#'
          },
          {
            id: 3,
            title: 3,
            url: '#'
          }],
        // 获取分类数据
        category: Category
      }
    },
    methods: {
      // randomCourse () {
      //   this.$router.push({ path: '/course/' + Math.floor((Math.random() * 100) + 1) })
      // }
      // 显示前三个子分类
      show3SubCategory (arr) {
        return arr.slice(0, 3)
      }
    }
  }

</script>

<style lang="stylus" scoped>
  .home-wrapper
    width 1024px
    margin auto

    .nav-container
      margin 0 auto

      .carousel-wrapper
        width 740px
        float left

        .el-carousel__item
          &:nth-child(2n)
            background-color: #99a9bf

          &:nth-child(2n+1)
            background-color: #d3dce6

      .nav-wrapper
        float left
        position relative
        top 0
        left 0

        .category-item
          border silver solid 1px
          width 200px

          &:hover
            background-color silver

          .sub-category
            .sub-category-item
              float left
              margin 1px 2px

          .sub-category-content
            position absolute
            top 0
            left 200px
            z-index 3
            width 500px
            background-color #fff
            border silver solid 1px

            .inner-box
              height 60px

    .recommend
      border silver solid 1px
      width 200px
      height 100px
      margin 10px 30px 10px 10px
      display inline-block
</style>
