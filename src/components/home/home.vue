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
              <router-link :to="{name: 'category', params:{cid: subItem.id}}"
                           v-for="(subItem, i) in item.second"
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
        <span>{{interestHint}}</span>
        <el-button type="text" class="interest-change" @click="checkLoginBeforeInterestDialog">修改兴趣</el-button>
        <el-dialog
          title="修改兴趣"
          :visible.sync="interestDialogVisible"
          :before-close="cancelInterestChange">
          <el-tabs>
            <el-tab-pane
              :label="item.name"
              v-for="(item, index) in category" :key="index">
              <el-checkbox-group v-model="localInterest" @change="changeInterest">
                <el-checkbox
                  v-for="(subItem, i) in item.second" :key="i"
                  :label="subItem.id" border>
                  {{subItem.name}}
                </el-checkbox>
              </el-checkbox-group>
              <div>
                <span>已选择{{localInterest.length}}个兴趣:</span>
                <span v-for="(item, index) in localInterest" :key="index"> {{categoryType[item]}} </span>
              </div>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="commitInterest">完 成</el-button>
            <el-button type="primary" @click="clearInterest">清 空</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div>由于后台请求尚未完成，先默认展示3个二级分类的推荐课程</div>
    <div class="recommend-box" v-for="(item, index) in recommendCourseOnSubCate" :key="index">
      <div class="recommend-title">{{item.name}}</div>
      <router-link class="recommend" v-for="(course, i) in item.recommend" :key="i"
                   :to="{name: 'course', params:{cid: course.id}}">{{course.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { CATEGORY_TYPE, PRIMARY_CATEGORY, SECOND_CATEGORY } from './js/category'

  export default {
    name: 'home',
    data () {
      return {
        // 是否显示修改兴趣对话框
        interestDialogVisible: false,
        // 用户兴趣
        localInterest: [],
        interestHint: '',
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
        // 一级分类数据
        category: {},
        // 二级分类推荐视频
        recommendCourseOnSubCate: [],
        categoryType: CATEGORY_TYPE
      }
    },
    methods: {
      // randomCourse () {
      //   this.$router.push({ path: '/course/' + Math.floor((Math.random() * 100) + 1) })
      // }
      // 显示前三个子分类
      show3SubCategory (arr) {
        return arr.slice(0, 3)
      },
      changeInterest (interest) {
        this.localInterest = interest
      },
      // 打开兴趣对话框前检查登录状态
      checkLoginBeforeInterestDialog () {
        if (window.localStorage.token) {
          this.interestDialogVisible = true
        } else {
          this.$store.dispatch('account/setAccountWindowShow', {
            show: true,
            type: 'LOGIN'
          })
        }
      },
      // 提交兴趣
      commitInterest () {
        // 提交到后台
        // ...post({uid: ..., token: ..., interest: this.interest})
        // 保存到本地
        // window.localStorage.interest = JSON.stringify(this.interest)
        this.setUserInterest(this.localInterest)
        this.interestDialogVisible = false
        this.interestHint = this.interest.length <= 0 ? '未选择学习兴趣，随机推荐课程' : '兴趣推荐'
      },
      // 取消兴趣更改
      cancelInterestChange (done) {
        this.localInterest = this.interest || []
        console.log('cancel interest change.')
        done()
      },
      // 清空兴趣
      clearInterest () {
        this.localInterest = []
        this.setUserInterest(this.localInterest)
      },
      ...mapMutations('account', {
        setUserInterest: 'setUserInterest'
      })
    },
    created () {
      // 获取用户兴趣
      if (this.interest && this.interest.length > 0) {
        this.interestHint = '兴趣推荐'
      } else {
        this.interestHint = '未选择学习兴趣，随机推荐课程'
      }
      this.localInterest = this.interest || []
      // 后台获取一级分类
      // ...
      this.category = PRIMARY_CATEGORY
      // 后台获取二级分类推荐视频
      // ...post({interest: this.interest.slice(0, 3)})
      this.recommendCourseOnSubCate = SECOND_CATEGORY
    },
    computed: {
      ...mapGetters('account', {
        interest: 'getUserInterest'
      })
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
