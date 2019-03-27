<!-- 课程讨论 -->
<template>
  <div class="forum-wrapper">
    <div class="forum-header clearfix">
      <div class="left">
        <slot name="sortingType"
              :sortingWithQuery="sortingWithQuery"
              :sortingWithoutQuery="sortingWithoutQuery"
              :getSortingTypeClass="getSortingTypeClass"></slot>
      </div>
      <div class="publish">
        <el-button round @click="showPublishDialog">我要发布</el-button>
      </div>
    </div>
    <div class="forum">
      <div class="forum-item clearfix"
           v-for="(item, index) in forum" :key="index"
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
            <div class="content-footer">
              <span>回复数 {{item.replyCount}}</span>
              <span>浏览数 {{item.pageViews}}</span>
              <span>关注人数 {{item.likeCount}}</span>
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
          <div class="hint-box"><span class="hint" v-if="showTitleHint">标题不能少于5个字符</span></div>
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
        console.log(`sotring type is ${this.sortingType}`)
        // 后台获取讨论
        // ...post({cid: this.$route.params.cid, currentPage: this.currentPage, pageSize: this.pageSize, sortingType})
        this.forum = FORUM.forum
        this.forumNum = FORUM.forumNum
      },
      // 后台获取讨论
      getForum () {
        this.currentPage = Number(this.$route.query.p) || 1
        this.sortingType = Number(this.$route.query.type) || 0
        console.log(`sotring type is ${this.sortingType}`)
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
        if (this.discuss.title.trim().length < 5) {
          console.log('标题不能少于5个字符')
          this.showTitleHint = true
        } else {
          this.showTitleHint = false
        }
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

    .forum
      .forum-item
        padding 32px
        border silver solid 1px
        margin-bottom 8px

        &:hover
          background-color silver
          cursor pointer

        .forum-item-wrapper
          position relative
          top 0
          left 0

          .creator-icon
            float left

            img
              width 48px
              height 48px
              border-radius 100%

          .content
            padding-right 120px
            .content-footer
              font-size 12px

              span
                padding-right 5px

          .aside
            position absolute
            top 0
            right 0
            width 120px

            .binding-session
              cursor pointer

              &:hover
                color #ffff

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
