<!-- 我的消息 -->
<template>
  <div>
    <div class="main-menu">
      <span @click="changeContent(0)">课程提醒</span>
      <span @click="changeContent(1)">互动提醒</span>
      <div class="all-menu">
        <span @click="deleteAll">全部删除</span>
        <span @click="tagAll">全部标记已读</span>
      </div>
    </div>
    <div class="content" v-if="(isCourse&&courseMessages)||(!isCourse&&discussMessages)">
      <div v-if="isCourse&&courseMessages[coursePosition.page]">
        <div class="course-item" v-for="(item,index) in courseMessages[coursePosition.page]" :key="index">
          <div class="course-desc">
            <img :src="item.img" width="100" height="50">
            <div class="course-info">
              <span>{{item.name}}于</span>
              <span>{{item.updateTime}}时更新</span>
            </div>
            <div @click="rHelp.openCourseNewWindow(item.cid)" class="course-menu">
              立即学习
            </div>
          </div>
          <div>
            <span @click="deleteMessage(index)">删除消息</span>
            <span v-if="!item.readed" @click="tagRead(index)">标记已读</span>
            <span v-else>已读</span>
          </div>
        </div>
      </div>
      <div v-else-if="!isCourse&&discussMessages[discussPosition.page]">
        <div class="discuss-item" v-for="(item,index) in discussMessages[discussPosition.page]" :key="index">
          <div class="discuss-info">
            <img :src="item.avatar" width="50" height="50" class="discuss-avatar">
            <span class="discuss-desc">{{item.name}}在{{item.discussTitle}}中回复了你</span>
            <span class="discuss-time">{{item.replyTime}}</span>
          </div>
          <div class="discuss-content text-ellipsis">
            {{item.content}}
          </div>
          <div>
            <span @click="deleteMessage(index)">删除消息</span>
            <span v-if="!item.readed" @click="tagRead(index)">标记已读</span>
            <span v-else>已读</span>
            <span @click="rHelp.openDiscussDetailNewWindow(item.did)">查看详情</span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="currentTotal"
          :current-page="currentPage"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { MESSAGES_DISCUSS, MESSAGES_COURSE } from '../../../common/js/data'

  export default {
    name: 'message',
    data () {
      return {
        courseMessages: null,
        discussMessages: null,
        isCourse: true,
        coursePosition: {
          page: 1,
          size: 10,
          total: null
        },
        discussPosition: {
          page: 1,
          size: 10,
          total: null
        }
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      changeContent (type) {
        let page = type === 0 ? this.coursePosition.page : this.discussPosition.page
        this.$router.replace({ name: 'message', params: { type: type }, query: { p: page } })
      },
      handleCurrentChange (page) {
        // console.log(page)
        this.$router.push({ name: 'message', query: { p: page } })
      },
      fetchData () {
        // 获取页数 默认为1
        let page = this.$route.query.p
        // 判断是课程提醒还是互动提醒
        this.isCourse = parseInt(this.$route.params.type) === 0
        // 课程提醒
        if (this.isCourse) {
          // 总数未知还没有请求过数据
          if (!this.coursePosition.total) {
            // 根据page获取内容
            this.coursePosition.total = MESSAGES_COURSE.totalNum
            this.courseMessages = []
            for (let i = 0, j = this.coursePosition.total / this.coursePosition.size + 1; i <= j; ++i) {
              this.courseMessages.push(null)
            }
            this.courseMessages[page] = MESSAGES_COURSE.messages
            this.coursePosition.page = page
          } else {
            // 总数已知 在请求前先看是否有缓存
            // 有则直接使用
            if (this.courseMessages[page]) {
              this.coursePosition.page = page
            } else {
              // 无缓存则从后台获取
              this.coursePosition.total = MESSAGES_COURSE.totalNum
              this.courseMessages[page] = MESSAGES_COURSE.messages
              this.coursePosition.page = page
            }
          }
        } else { // 互动消息
          // 总数未知还没有请求过数据
          if (!this.discussPosition.total) {
            // 根据page获取内容
            this.discussPosition.total = MESSAGES_DISCUSS.totalNum
            this.discussMessages = []
            for (let i = 0, j = this.discussPosition.total / this.discussPosition.size + 1; i <= j; ++i) {
              this.discussMessages.push(null)
            }
            this.discussMessages[page] = MESSAGES_DISCUSS.messages
            this.discussPosition.page = page
          } else {
            // 总数已知 在请求前先看是否有缓存
            // 有则直接使用
            if (this.discussMessages[page]) {
              this.discussPosition.page = page
            } else {
              // 无缓存则从后台获取
              this.discussPosition.total = MESSAGES_DISCUSS.totalNum
              this.discussMessages[page] = MESSAGES_DISCUSS.messages
              this.discussPosition.page = page
            }
          }
        }
      },
      // 标记为已读
      tagRead (index) {
        if (this.isCourse) {
          this.courseMessages[this.coursePosition.page][index].readed = true
        } else {
          this.discussMessages[this.discussPosition.page][index].readed = true
        }
        this.$forceUpdate()
      },
      // 全部删除
      deleteAll () {
        if (this.isCourse) {
          this.courseMessages = null
          this.coursePosition.total = null
        } else {
          this.discussMessages = null
          this.discussPosition.total = null
        }
      },
      // 全部标记已读
      tagAll () {
        if (this.isCourse) {
          if (this.courseMessages) {
            for (let i = 1, j = this.courseMessages.length; i <= j; ++i) {
              if (this.courseMessages[i]) {
                for (let k = 0, l = this.courseMessages[i].length; k < l; ++k) {
                  this.courseMessages[i][k].readed = true
                }
              }
            }
          }
        } else {
          if (this.discussMessages) {
            for (let i = 1, j = this.discussMessages.length; i <= j; ++i) {
              if (this.discussMessages[i]) {
                for (let k = 0, l = this.discussMessages[i].length; k < l; ++k) {
                  this.discussMessages[i][k].readed = true
                }
              }
            }
          }
        }
        this.$forceUpdate()
      },
      // 删除消息
      deleteMessage (index) {
        if (this.isCourse) {
          this.courseMessages[this.coursePosition.page].splice(index, 1)
        } else {
          this.discussMessages[this.discussPosition.page].splice(index, 1)
        }
        this.$forceUpdate()
      }
    },
    computed: {
      currentTotal () {
        return this.isCourse ? this.coursePosition.total : this.discussPosition.total
      },
      currentPage () {
        return this.isCourse ? parseInt(this.coursePosition.page) : parseInt(this.discussPosition.page)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../common/style/textEllipsis.css"
  .main-menu
    position relative

    .all-menu
      display inline-block
      position absolute
      right 10px

  .content
    .course-item
      .course-desc
        position relative

        .course-info
          display inline-block
          position absolute
          top: 50%
          transform: translate(0, -50%)

        .course-menu
          display inline-block
          position absolute
          top: 50%
          right 20px
          transform: translate(0, -50%)

    .discuss-item
      .discuss-avatar
        border-radius 50%

      .discuss-info
        position relative

        .discuss-desc
          position absolute
          top 50%
          transform: translate(0, -50%)

        .discuss-time
          position absolute
          top 50%
          transform: translate(0, -50%)
          right 10px

    .pagination
      text-align center

</style>
