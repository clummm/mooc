<!-- 课程讨论 -->
<template>
  <div class="forum-wrapper">
    <div class="forum-header clearfix">
      <div class="left">
        <slot name="latest"
              :sortingWithQuery="sortingWithQuery"
              :sortingWithoutQuery="sortingWithoutQuery"
              :getSortingTypeClass="getSortingTypeClass">
        </slot>
        <slot name="hottest"
              :sortingWithQuery="sortingWithQuery"
              :sortingWithoutQuery="sortingWithoutQuery"
              :getSortingTypeClass="getSortingTypeClass">
        </slot>
      </div>
      <div class="publish">
        <!--<el-button @click="showPublishDialog" size="small">我要发布</el-button>-->
        <button class="publish-button" @click="showPublishDialog">我要发布</button>
      </div>
    </div>
    <div class="forum">
      <div v-for="(item, index) in forum" :key="index">
        <el-card class="forum-item clearfix"
                 @click="discussDetail(item.id)">
          <div class="forum-item-wrapper">
            <div class="creator-icon">
              <img :src="item.creator.avatar"/>
            </div>
            <div class="content">
              <div class="creator line-limit">{{item.creator.name}}</div>
              <div class="content-title line-limit">
                {{item.title}}
              </div>
            </div>
            <div class="aside">
              <div class="publish-time">{{item.createTime}}</div>
              <div class="binding-session line-limit" v-if="item.createPosition"
                   @click.stop="playVideo(item.createPosition)">
                {{`${item.createPosition.chapter}-${item.createPosition.sid} ${item.createPosition.sessionName}`}}
              </div>
            </div>
          </div>
        </el-card>
        <div class="forum-item-footer">
          <span><img src="../hot.png"/> {{item.pageViews}}</span>
          <span><img src="../reply.jpg"/> {{item.replyCount}}</span>
          <span><img :src="item.like ? require('../like_full.png') : require('../like.png')"/> {{item.likeCount}}</span>
        </div>
      </div>
    </div>
    <div class="pagination">
      <slot name="pagination"
            :totalNum="forumNum"
            :currentPage="currentPage"
            :handleCurrentChangeWithQuery="handleCurrentChangeWithQuery"
            :handleCurrentChangeWithoutQuery="handleCurrentChangeWithoutQuery"></slot>
    </div>
    <div class="publish-dialog">
      <el-dialog
        title="我要发布"
        :visible.sync="dialogVisible"
        :before-close="cancelPublish">
        <div class="title">
          <el-input name="title" type="text" placeholder="请输入讨论标题"
                    @blur="checkTitle"
                    @focus="showTitleHint = false"
                    v-model="discuss.title"></el-input>
          <div class="hint-box"><span class="hint" v-if="showTitleHint">标题不能少于4个字符</span></div>
        </div>
        <div class="content">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="discuss.content">
          </el-input>
        </div>
        <div class="commit clearfix"><el-button round @click="commit">提交</el-button></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { FORUM } from './js/forum'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'forum',
    data () {
      return {
        // 当前页
        currentPage: 1,
        // 当前课程下的总讨论数
        forumNum: 0,
        pageSize: 5,
        // 讨论列表
        forum: [],
        // 排序规则：0->最新, 1->最热
        sortingType: 0,
        // 讨论发布框是否显示
        dialogVisible: false,
        // 要发布的讨论
        discuss: {
          title: '',
          content: ''
        },
        // 标题字数提示
        showTitleHint: false
      }
    },
    methods: {
      ...mapActions('account', {
        setAccountWindowShow: 'setAccountWindowShow'
      }),
      // url带页码的形式进行当前页变化
      handleCurrentChangeWithQuery (page) {
        this.$router.push({ name: 'forum', params: this.$route.params, query: { p: page, type: String(this.sortingType) } })
      },
      // url不带页码的形式进行当前页变化
      handleCurrentChangeWithoutQuery (page) {
        this.currentPage = page
        // 后台获取讨论
        // ...post({cid: this.$route.params.cid, currentPage: this.currentPage, pageSize: this.pageSize, sortingType})
        this.forum = FORUM.forum
        this.forumNum = FORUM.forumNum
      },
      // 后台获取讨论
      getForum () {
        this.currentPage = Number(this.$route.query.p) || 1
        this.sortingType = Number(this.$route.query.type) || 0
        // 后台获取讨论
        // ...post({cid: this.$route.params.cid, currentPage: this.currentPage, pageSize: this.pageSize, sortingType})
        this.forum = FORUM.forum
        this.forumNum = FORUM.forumNum
      },
      /**
       * *********************************
       * 发布讨论
       * *********************************
       * */
      // 取消发布讨论
      cancelPublish (done) {
        this.discuss.title = ''
        this.discuss.content = ''
        done()
      },
      // 打开发布讨论框
      showPublishDialog () {
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          // 弹出填写框
          if (this.leavePosition) {
            this.dialogVisible = true
          } else {
            this.$message({
              showClose: true,
              message: '您尚未学习该课程，不能对课程发表讨论',
              duration: 3000
            })
          }
        }
      },
      // 检查是否讨论标题是够符合要求
      checkTitle () {
        console.log(`title is ${this.discuss.title}`)
        this.showTitleHint = this.discuss.title.trim().length < 4
      },
      // 发布讨论
      commit () {
        console.log(`before commit, title's length is ${this.discuss.title.length}`)
        if (this.discuss.title.trim().length >= 5) {
          this.discuss.title = this.discuss.title.trim()
          this.discuss.content = this.discuss.content.trim()
          // 向后台提交讨论
          // ...post(uid, cid, discuss)
          alert('提交成功')
          this.discuss.title = ''
          this.discuss.content = ''
          this.dialogVisible = false
        } else {
          alert('提交失败')
        }
      },
      /**
       * *******************************************
       * 讨论列表的逻辑处理
       * *******************************************
       * */
      // 前往讨论详情页
      discussDetail (id) {
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          // 前往详情页
          this.$router.push({ name: 'discussDetail', params: { did: id } })
        }
      },
      // 获取排序规则的样式
      getSortingTypeClass (sortingType) {
        return Number(this.sortingType) === sortingType ? 'sorting-type-on' : 'sorting-type'
      },
      // url保留排序规则的方式，更改讨论列表排序规则
      sortingWithQuery (sortingType) {
        if (this.sortingType !== sortingType) {
          this.$router.push({ name: 'forum', params: this.$route.params, query: { p: '1', type: sortingType } })
        }
      },
      // url不保留排序规则的方式，更改讨论列表排序规则
      sortingWithoutQuery (sortingType) {
        if (this.sortingType !== sortingType) {
          this.sortingType = sortingType
        }
      },
      // 前往课时播放页
      playVideo (position) {
        // 未登录时无法播放课程，弹出登录窗口提示登录
        console.log('play')
        console.log(position)
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          this.rHelp.openVideoWindow({
            cid: position.cid,
            chapter: position.chapter,
            sid: position.sid,
            playTime: position.time
          })
        }
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.getForum()
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
    created () {
      // 后台获取讨论
      this.getForum()
    }
  }
</script>

<style lang="stylus" scoped>
  .forum-wrapper
    .forum-header
      margin-bottom 30px

      .sorting-type-on
        font-weight 700

      .sorting-type
        &:hover
          cursor pointer
          color grey

      span
        padding-left 5px

      .publish
        float right
        display inline-block
      .publish-button
        width 77px
        height 32px
        background-color #FFFFFF
        box-shadow 0 2px 4px 0 rgba(0,0,0,0.12)
        border-radius 5px
        border 0
        cursor pointer
        font-size 14px
        font-family PingFangSC-Medium
        font-weight 500
        color rgba(102,102,102,1)
        line-height 20px
        &:hover
          color #049CFF

    .forum
      .forum-item-footer
        margin-top 18px
        margin-bottom 22px
        text-align right
        font-size 12px
        span
          padding-left 20px

      .forum-item
        margin-bottom 8px
        border-radius 15px

        &:hover
          background-color #E0F3FF
          cursor pointer

        .forum-item-wrapper
          display flex
          font-size 14px
          font-family PingFangSC-Regular
          font-weight 400
          color rgba(102,102,102,1)

          .creator-icon
            img
              width 48px
              height 48px
              border-radius 100%

          .content
            padding-left 8px
            padding-right 50px
            flex 1
            .creator
              font-size 16px
              font-weight 600
            .content-title
              padding 5px 0

          .aside
            width 110px
            .binding-session
              cursor pointer
              margin-top 5px
              &:hover
                color #049CFF

    .pagination
      text-align center

    .publish-dialog
      .title
        margin-bottom 8px
        .hint-box
          height 20px
          .hint
            font-size 12px
            color #ff0000
      .content
        margin-bottom 8px
      .commit
        margin-bottom 8px
        button
          float right
</style>
