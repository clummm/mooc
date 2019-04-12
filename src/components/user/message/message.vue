<!-- 我的消息 -->
<template>
  <div class="message-wrapper">
    <el-menu :default-active="activeIndex" class="el-menu-demo menu-text" mode="horizontal" @select="handleSelect"
             text-color="#666666" active-text-color="#049CFF">
      <el-menu-item index="0">课程提醒</el-menu-item>
      <el-menu-item index="1">互动提醒</el-menu-item>
    </el-menu>
    <div class="all-menu">
      <span @click="deleteAll" class="menu-item">全部删除</span>
      <span @click="tagAll" class="menu-item">全部标记已读</span>
    </div>
    <div class="content" v-if="(isCourse&&courseMessages)||(!isCourse&&discussMessages)">
      <div v-if="isCourse&&courseMessages[coursePosition.page]">
        <div class="course-item" v-for="(item,index) in courseMessages[coursePosition.page]" :key="index">
          <div class="course-desc">
            <img :src="item.img" width="142" height="74" class="course-icon"
                 @click="rHelp.openCourseNewWindow(item.cid)">
            <div class="course-info">
              <span class="course-name" @click="rHelp.openCourseNewWindow(item.cid)">{{item.name}}于</span>
              <span>{{item.updateTime}}时更新</span>
            </div>
            <div @click="rHelp.openCourseNewWindow(item.cid)" class="course-menu">
              立即学习
            </div>
          </div>
          <div class="menu">
            <span class="btn" @click="deleteMessage(index)">删除消息</span>
            <span v-if="!item.readed" @click="tagRead(index)" class="btn">标记已读</span>
            <span v-else class="show">已读</span>
          </div>
        </div>
      </div>
      <div v-else-if="!isCourse&&discussMessages[discussPosition.page]">
        <div class="discuss-item" v-for="(item,index) in discussMessages[discussPosition.page]" :key="index">
          <div class="discuss-info">
            <img :src="item.avatar" class="discuss-avatar">
            <span class="discuss-name">{{item.name}}</span>
            <span>在</span>
            <span class="discuss-course" @click="rHelp.openCourseNewWindow(item.cid)">{{item.discussTitle}}</span>
            <span>中回复了你</span>
            <span class="discuss-time">{{item.replyTime}}</span>
          </div>
          <div class="discuss-content text-ellipsis">
            {{item.content}}
          </div>
          <div class="menu">
            <span @click="rHelp.openDiscussDetailNewWindow(item.did)" class="btn">查看详情</span>
            <span @click="deleteMessage(index)" class="btn">删除消息</span>
            <span v-if="!item.readed" @click="tagRead(index)" class="btn">标记已读</span>
            <span v-else class="show">已读</span>
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
  import { MESSAGES_DISCUSS, MESSAGES_COURSE } from '../../../../public/js/data'

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
      this.activeIndex = this.$route.params.type + ''
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      // 处理tab切换
      handleSelect (index, indexPath) {
        let page = index === 0 ? this.coursePosition.page : this.discussPosition.page
        this.$router.replace({ name: 'message', params: { type: index }, query: { p: page } })
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
  @import "../../../../public/css/textEllipsis.css"
  .menu
    margin-top 15px
    margin-bottom 15px
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(166, 166, 166, 1);
    line-height: 17px;

    .btn
      cursor pointer
      margin-right 10px

      &:hover
        color rgba(4, 156, 255, 1);

    .show
      cursor default

  .message-wrapper
    position relative

    .all-menu
      position absolute
      top 23px
      right 0
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(166, 166, 166, 1);
      line-height: 17px;

      .menu-item
        cursor pointer
        margin-right 10px

        &:hover
          color rgba(4, 156, 255, 1);

  .content
    .course-item
      width 100%
      border-bottom 1px solid #CBCBCB
      margin-top 20px

      .course-desc
        position relative

        .course-icon
          cursor pointer
          border-radius 8px
          margin-right 20px

        .course-info
          width 400px
          text-align center
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          display inline-block
          position absolute
          top: 50%
          transform: translate(0, -50%)

          .course-name
            cursor pointer

            &:hover
              color rgba(4, 156, 255, 1);
              text-decoration underline

        .course-menu
          cursor pointer
          display inline-block
          position absolute
          color: rgba(166, 166, 166, 1);
          font-size: 16px;
          top: 50%
          right 20px
          transform: translate(0, -50%)

          &:hover
            color rgba(4, 156, 255, 1);

    .discuss-item
      width 100%
      border-bottom 1px solid #CBCBCB
      margin-top 20px

      .discuss-avatar
        display inline-block
        vertical-align top
        margin-right 5px
        width 18px
        height 18px
        border-radius 50%

      .discuss-name
        margin 0 15px

      .discuss-course
        cursor pointer

        &:hover
          text-decoration underline
          color rgba(4, 156, 255, 1);

      .discuss-info
        position relative
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;

        .discuss-desc
          position absolute
          top 50%
          transform: translate(0, -50%)

        .discuss-time
          position absolute
          top 50%
          transform: translate(0, -50%)
          right 10px

      .discuss-content
        margin 15px 0
        padding 0 20px
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 17px;

    .pagination
      text-align center

</style>
