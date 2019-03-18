<!-- 我的消息 -->
<template>
  <div>
    <div class="main-menu">
      <span @click="changeContent(true)">课程提醒</span>
      <span @click="changeContent(false)">互动提醒</span>
      <div class="all-menu">
        <span @click="deleteAll">全部删除</span>
        <span @click="tagAll">全部标记已读</span>
      </div>
    </div>
    <div class="content">
      <div v-if="isCourse&&courseMessages">
        <div class="course-item" v-for="(item,index) in courseMessages" :key="index">
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
      <div v-else-if="!isCourse&&discussMessages">
        <div class="discuss-item" v-for="(item,index) in discussMessages" :key="index">
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
          page: 0,
          size: 10,
          total: null
        },
        discussPosition: {
          page: 0,
          size: 10,
          total: null
        }
      }
    },
    created () {
      this.courseMessages = MESSAGES_COURSE.messages
      this.coursePosition.total = MESSAGES_COURSE.totalNum
    },
    methods: {
      changeContent (type) {
        this.isCourse = type
        if (!type && !this.discussMessages && !this.discussPosition.total) {
          this.discussMessages = MESSAGES_DISCUSS.messages
          this.discussPosition.total = MESSAGES_DISCUSS.totalNum
        }
      },
      handleCurrentChange (page) {
        // console.log(page)
      },
      // 标记为已读
      tagRead (index) {
        if (this.isCourse) {
          this.courseMessages[index].readed = true
        } else {
          this.discussMessages[index].readed = true
        }
      },
      // 全部删除
      deleteAll () {
        if (this.isCourse) {
          this.courseMessages = null
        } else {
          this.discussMessages = null
        }
      },
      // 全部标记已读
      tagAll () {
        if (this.isCourse) {
          for (let i = 0, j = this.courseMessages.length; i < j; ++i) {
            this.courseMessages[i].readed = true
          }
        } else {
          for (let i = 0, j = this.discussMessages.length; i < j; ++i) {
            this.discussMessages[i].readed = true
          }
        }
      },
      // 删除消息
      deleteMessage (index) {
        if (this.isCourse) {
          this.courseMessages.splice(index, 1)
        } else {
          this.discussMessages.splice(index, 1)
        }
      }
    },
    computed: {
      currentTotal () {
        return this.isCourse ? this.coursePosition.total : this.discussPosition.total
      },
      currentPage () {
        return this.isCourse ? (this.coursePosition.page + 1) : (this.discussPosition.page + 1)
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
