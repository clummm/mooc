<!-- 主页 -->
<template>
  <div class="home-wrapper">
    <div class="nav-container clearfix">
      <div class="wrapper">
        <ul class="nav-wrapper">
          <li class="category-item" v-for="(item, index) in category" :key="index"
              @mouseenter="item.active = true"
              @mouseleave="item.active = false">
            <router-link class="category" :to="{name: 'category', params:{cid: item.id}}">{{item.name}}</router-link>
            <router-link class="sub-category-item"
                         v-for="(subItem, i) in show2SubCategory(item.second)" :key="i"
                         :to="{name: 'category', params:{cid: subItem.id}}">{{subItem.name}}</router-link>
            <el-card class="sub-category-content" v-if="item.active">
              <div class="inner-box">
                <router-link :to="{name: 'category', params:{cid: subItem.id}}"
                             v-for="(subItem, i) in item.second"
                             :key="i">
                  {{subItem.name}}
                </router-link>
              </div>
              <div class="recommend-box">
                <course-card-horizon v-for="(course, i) in item.recommend" :key="i" :course="course"></course-card-horizon>
              </div>
            </el-card>
          </li>
        </ul>
        <div class="carousel-wrapper">
          <el-carousel trigger="click" height="260px">
            <el-carousel-item v-for="item in carousels" :key="item.id">
              <a :href="item.url"></a>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="interest-guide-container">
        <div class="interest-guide-wrapper">
          <div class="interest-hint clearfix">
            <span>{{interestHint}}</span>
            <el-button type="text" class="interest-change right" @click="checkLoginBeforeInterestDialog">修改兴趣</el-button>
          </div>
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
      <div class="recommend-box" v-for="(item, index) in recommendCourseOnSubCate" :key="index">
        <p class="recommend-title">{{item.name}}</p>
        <course-card-vertical v-for="(course, i) in item.recommend" :key="i" :course="course"></course-card-vertical>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { CATEGORY_TYPE, PRIMARY_CATEGORY, SECOND_CATEGORY } from './js/category'
  import courseCardHorizon from '../courseCard/courseCardHorizon/courseCardHorizon'
  import courseCardVertical from '../courseCard/courseCardVertical/courseCardVertical'

  export default {
    name: 'home',
    components: {
      courseCardHorizon,
      courseCardVertical
    },
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
          }],
        // 一级分类数据
        category: {},
        // 二级分类推荐视频
        recommendCourseOnSubCate: [],
        categoryType: CATEGORY_TYPE
      }
    },
    methods: {
      // 显示前2个子分类
      show2SubCategory (arr) {
        return arr.slice(0, 2)
      },
      changeInterest (interest) {
        this.localInterest = interest
      },
      // 打开兴趣对话框前检查登录状态
      checkLoginBeforeInterestDialog () {
        if (this.userInfo) {
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
        this.interestHint = this.interest.length <= 0 ? '未选择学习兴趣，随机推荐课程' : '兴 / 趣 / 推 / 荐'
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
        this.interestHint = '兴 / 趣 / 推 / 荐'
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
        interest: 'getUserInterest',
        userInfo: 'getUserInfo'
      })
    }
  }

</script>

<style lang="stylus" scoped>
  bg-image($url)//默认2x图，dpr为3则使用3x图
    background-image: url($url)
    background-size contain
    background-repeat no-repeat
    background-position center

  .home-wrapper
    font-family PingFangSC-Medium
    .wrapper
      width 1024px
      margin auto
      height 260px

    .nav-container
      background rgba(231,231,231,1)

      .carousel-wrapper
        width 740px
        float left
        .el-carousel__item
          bg-image('/images/advertisement.jpg')

      .nav-wrapper
        background rgba(244,244,244,1)
        border-radius 6px 0 0 6px
        float left
        position relative
        top 0
        left 0
        height 100%
        width 264px

        .category-item
          padding 10px 0
          &:hover
            background-color #FFFFFF

          >a
            padding 0 12px
          .category
            font-size 16px
            font-weight 700
            color rgba(51,51,51,1)
            line-height 20px
            width 88px

          .sub-category-item
            font-size 14px
            font-family PingFangSC-Light
            font-weight 300
            color rgba(102,102,102,1)
            line-height 20px

          .sub-category-content
            position absolute
            top 0
            left 265px
            z-index 3
            width 800px
            background-color #fff

            .inner-box
              padding 40px 30px 20px 30px
              a
                padding-right 20px
                font-size 14px
                font-family PingFangSC-Regular
                font-weight 400
                color rgba(51,51,51,1)
                line-height 20px

            .recommend-box
              padding 0 30px

    .main-content
      width 1024px
      margin auto
      .interest-hint
        text-align center
        padding-top 36px
        >span
          font-size 20px
          font-weight 400
          color rgba(51,51,51,1)
          line-height 28px
      .recommend-box
        font-family PingFangSC-Regular
        margin 30px 0
        .recommend-title
          font-size 20px
          font-weight 400
          color rgba(51,51,51,1)
          line-height 28px
</style>
