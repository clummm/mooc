<!-- 用户评价 -->
<template>
  <div class="comments-wrapper">
    <el-card class="comments-header">
      <div class="clearfix">
        <div class="rating-title left">综合<br/>评分</div>
        <div class="rating-score left">{{rating}}</div>
        <div class="star-box left">
          <el-rate v-model="rating" disabled></el-rate>
        </div>
        <ul class="rating-item left">
          <li v-for="(item, index) in ratingItem" :key="index">
            {{ratingItemTile[index]}}
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
    </el-card>
    <el-card class="comment-hint" v-if="!myComment">
      <div class="unqualified" v-if="!leavePosition">
        <i class="el-icon-warning"></i>您尚未学习该课程，不能对课程进行评价
      </div>
      <div class="qualified" v-if="leavePosition">
        <el-button round @click="dialogVisible = true">发表评价</el-button>
      </div>
    </el-card>
    <el-card class="my-comment" v-if="myComment">
      <span>我的评价</span>
      <el-button round size="medium" @click="dialogVisible = true">重新编辑</el-button>
      <div class="comment-wrapper">
        <div class="creator-icon">
          <img :src="userInfo.icon"/>
        </div>
        <div class="content-box">
          <div class="creator">{{userInfo.name}}</div>
          <div class="content">
            {{myComment.content}}
          </div>
          <div class="content-footer clearfix">
            <div class="thumb-up-box left" @click="thumbUp(myComment)">
              <i :class="myComment.like ? 'el-icon-star-on' : 'el-icon-star-off'">{{myComment.likeCount}}</i>
            </div>
            <div class="publish-time right">{{myComment.createTime}}</div>
          </div>
        </div>
        <div class="aside clearfix">
          <div class="rating right">{{myComment.rating}}</div>
          <el-rate v-model="myComment.rating" disabled></el-rate>
        </div>
      </div>
    </el-card>
    <div class="comments">
      <el-card class="comment" v-for="(item, index) in comments" :key="index">
        <div class="comment-wrapper">
          <div class="creator-icon">
            <img :src="item.creator.avatar"/>
          </div>
          <div class="content-box">
            <div class="creator">{{item.creator.name}}</div>
            <div class="content">
              {{item.content}}
            </div>
            <div class="content-footer clearfix">
              <div class="thumb-up-box left" @click="thumbUp(item)">
                <i :class="item.like ? 'el-icon-star-on' : 'el-icon-star-off'">{{item.likeCount}}</i>
              </div>
              <div class="publish-time right">{{item.createTime}}</div>
            </div>
          </div>
          <div class="aside clearfix">
            <div class="rating right">{{item.rating}}</div>
            <el-rate v-model="item.rating" disabled></el-rate>
          </div>
        </div>
      </el-card>
    </div>
    <div class="pagination">
      <el-pagination
        background="false"
        layout="prev, pager, next"
        :total="commentsNum"
        :current-page="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <div class="publish-dialog">
      <el-dialog
        :visible.sync="dialogVisible"
        :before-close="cancelPublish">
        <div class="content-wrapper clearfix">
          <div class="content">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入评价内容，最少5字，最多400字"
              v-model="localMyComment.content"
              @blur="checkComment(localMyComment.content)"
              @focus="showHint = false">
            </el-input>
            <span v-if="showHint">字数请控制在5 ~ 400字以内</span>
          </div>
          <div class="rating-box">
            <p class="clearfix" v-for="(item, index) in localMyComment.ratingItem" :key="index" >
              <span>{{ratingItemTile[index]}}</span>
              <el-rate v-model="localMyComment.ratingItem[index]" show-score></el-rate>
            </p>
          </div>
          <div class="commit">
            <el-button round @click="commitComment">发表评论</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { COMMENTS, MY_COMMENT } from './js/comments'
  import { mapGetters, mapActions } from 'vuex'
  import { DateFormatter } from '../../../../public/js/Time'

  const template = {
    content: '',
    rating: 0,
    ratingItem: {
      practical: 5.0,
      simple: 5.0,
      logical: 5.0
    },
    createTime: '',
    likeCount: 0,
    like: false
  }

  export default {
    name: 'comments',
    data () {
      return {
        // 当前页
        currentPage: 1,
        // 当前条件下的总评价数
        commentsNum: 0,
        pageSize: 5,
        // 评价列表
        comments: [],
        // 课程总评分
        rating: 0,
        // 课程各项评分
        ratingItem: {},
        ratingItemTile: {
          practical: '内容实用',
          simple: '简单易懂',
          logical: '逻辑清晰'
        },
        // 当前用户的评价
        myComment: null,
        // 浏览器输入区的当前用户评价
        localMyComment: template,
        // 是否显示评论编辑框
        dialogVisible: false,
        // 评价编辑框的字数提示
        showHint: false
      }
    },
    methods: {
      ...mapActions('account', {
        setAccountWindowShow: 'setAccountWindowShow'
      }),
      // 当前页变化
      handleCurrentChange (page) {
        this.$router.push({ name: 'comments', params: this.$route.params, query: { p: page } })
      },
      // 获取后台评价数据
      getComments () {
        this.currentPage = Number(this.$route.query.p) || 1
        // 获取当前页评价列表和课程评分
        // ...post({cid, currentPage, pageSize})
        this.comments = COMMENTS.comments
        this.commentsNum = COMMENTS.commentsNum
        this.rating = COMMENTS.rating
        this.ratingItem = COMMENTS.ratingItem
        // 获取当前用户评价
        if (this.userInfo) {
          // 已登录
          // ...post({uid, token, cid})
          this.myComment = this.leavePosition ? MY_COMMENT : null
          // this.myComment = null
        } else {
          this.myComment = null
        }
        // 存储用户评论到本地
        this.localMyComment = JSON.parse(JSON.stringify(this.myComment || this.localMyComment))
      },
      // 点赞 / 取消点赞
      thumbUp (comment) {
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          if (comment.like) {
            // 取消点赞
            comment.likeCount = Number(comment.likeCount) - 1
          } else {
            // 点赞
            comment.likeCount = Number(comment.likeCount) + 1
          }
          comment.like = !comment.like
          // 向后台提交点赞更改
          // ...post({uid, comment.id, comment.like})
        }
      },
      // 发表评价
      commitComment () {
        if (!this.showHint) {
          let localMyComment = this.localMyComment
          // 计算评分
          localMyComment.rating = 0
          Object.keys(localMyComment.ratingItem).forEach(function (key) {
            localMyComment.rating += Number(localMyComment.ratingItem[key])
          })
          localMyComment.rating = localMyComment.rating / 3
          localMyComment.rating = Number(localMyComment.rating.toFixed(1))
          // 创建时间
          localMyComment.createTime = this.myComment ? this.myComment.createTime : DateFormatter(new Date())
          // 提交到后台
          // ...post({uid, token, cid, this.localMyComment})
          // 提交成功时，刷新评价模块
          // this.getComments()
          this.myComment = JSON.parse(JSON.stringify({ id: this.myComment.id, ...this.localMyComment }))
          this.dialogVisible = false
          console.log('发布评价')
          console.log(this.localMyComment)
        }
      },
      // 取消发布
      cancelPublish (done) {
        this.dialogVisible = false
        this.localMyComment = JSON.parse(JSON.stringify(this.myComment || template))
        console.log('取消发布, localMyComment: ')
        console.log(this.localMyComment)
        done()
      },
      // 检查评价字数
      checkComment (content) {
        // 字数限定
        this.showHint = content.trim().length < 5 || content.trim().length >= 400
      }
    },
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      }),
      ...mapGetters('course', {
        leavePosition: 'getLeavePosition'
      })
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.getComments()
      }
    },
    created () {
      this.getComments()
    }
  }
</script>

<style lang="stylus" scoped>
  .comments-wrapper
    .comments-header
      padding 20px 0
      margin-bottom 30px

      .rating-title
        line-height 16px
        font-weight 700
      .rating-score
        padding-left 12px
        font-size 32px
        font-weight 700
        line-height 32px
      .star-box
        margin-top 6px
        padding-left 10px
      .rating-item
        padding-top 2px
        li
          padding-left 30px
          display inline-block
          span
            padding-left 2px
            font-size 24px
            color #f90
            line-height 24px

    .comment-hint
      height 100px
      line-height 100px
      text-align center
      margin-bottom 30px
      i
        margin-right 10px

    .comment
      padding 20px
      margin-bottom 8px

    .comment-wrapper
      position relative
      top 0
      left 0

      .creator-icon
        float left

        img
          width 48px
          height 48px
          border-radius 100%

      .content-box
        padding-left 64px
        .content
          word-wrap break-word
        .content-footer
          margin-top 10px
          .thumb-up-box
            cursor pointer
            padding 5px 14px
            font-size 14px
            background-color silver
            border silver solid 1px
            border-radius 18px

      .aside
        position absolute
        top 0
        right 0
        width 150px

    .my-comment
      position relative
      top 0
      left 0
      padding 52px 32px 32px 32px
      margin-bottom 30px
      span
        position absolute
        left 30px
        top 14px
        font-weight 700
        font-size 22px
      button
        position absolute
        right 32px
        top 8px

    .pagination
      text-align center

    .publish-dialog
      .rating-box
        width 250px
        float left
        p
          padding-top 10px
          padding-left 30px
          span
            float left
      .content-wrapper
        position relative
        top 0
        left 0
        .content
          width 350px
          float left
        .commit
          position absolute
          bottom 10px
          right 20px
</style>
