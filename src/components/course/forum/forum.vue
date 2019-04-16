<!-- 课程讨论 -->
<template>
  <div class="forum-wrapper">
    <div class="forum-header clearfix">
      <span @click="sorting(0)" :class="getSortingTypeClass(0)">
        最新
        <img :src="Number(this.sortingType) === 0 ? require('../new_full.jpg') : require('../new.png')"/>
      </span>
      <span @click="sorting(1)" :class="getSortingTypeClass(1)">
        最热
        <img :src="Number(this.sortingType) === 1 ? require('../hot_full.jpg') : require('../hot.png')"/>
      </span>
      <div class="publish">
        <!--<el-button @click="showPublishDialog" size="small">我要发布</el-button>-->
        <button class="publish-button" @click="showPublishDialog">我要发布</button>
      </div>
    </div>
    <mooc-list :list="forum" :total-num="forumNum" :current-page="currentPage"
               @current-change="handleCurrentChange"
               @to-detail="discussDetail"></mooc-list>
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
  import { Forum, secondForum } from '../../../../public/js/forum'
  import { mapGetters, mapActions } from 'vuex'
  import moocList from '../../list/moocList'

  export default {
    name: 'forum',
    props: {
      // url是否保留页码、排序方式等查询参数
      withQuery: {
        type: Boolean,
        default: true
      }
    },
    components: {
      moocList
    },
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
      handleCurrentChange (page) {
        this.handleRoute(page, this.sortingType)
      },
      getForum () {
        this.currentPage = Number(this.$route.query.p) || 1
        this.sortingType = Number(this.$route.query.type) || 0
        this.fetchForum()
      },
      // 后台获取讨论
      fetchForum () {
        // 后台获取讨论
        let chapter = typeof (this.$route.params.chapter) === 'undefined' ? -1 : this.$route.params.chapter
        let sid = typeof (this.$route.params.sid) === 'undefined' ? -1 : this.$route.params.sid
        // ...post({cid: this.$route.params.cid, chapter: chapter, sid: sid,
        // currentPage: this.currentPage, pageSize: this.pageSize, sortingType})
        console.log(`向后台申请讨论：章节(${chapter}), 课时(${sid}), 当前页(${this.currentPage}), 排序(${this.sortingType}), 是否只看自己(${this.mine})`)
        // 用于测试
        if (chapter === -1 || sid === -1) {
          this.forum = Forum.forum
          this.forumNum = Forum.forumNum
        } else {
          this.forum = secondForum.forum
          this.forumNum = secondForum.forumNum
        }
      },
      // 路由处理逻辑
      handleRoute (page, sortingType) {
        page = String(page)
        sortingType = String(sortingType)
        if (this.withQuery) {
          this.$router.push({
            name: 'forum',
            params: this.$route.params,
            query: { p: page, type: sortingType }
          })
        } else {
          this.currentPage = page
          this.sortingType = sortingType
          this.fetchForum()
        }
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
      sorting (sortingType) {
        if (this.sortingType !== sortingType) {
          this.sortingType = sortingType
          this.handleRoute('1', sortingType)
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
    font-family PingFangSC-Regular
    color rgba(51,51,51,1)
    line-height 22px
    .forum-header
      margin-bottom 30px
      &>span
        padding-right 36px
        img
          padding-left 10px
          vertical-align middle
      .sorting-type-on
        font-weight 600

      .sorting-type
        color #333333
        &:hover
          cursor pointer
          color #979797

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
