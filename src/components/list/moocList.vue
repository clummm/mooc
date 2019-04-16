<template>
  <div class="list-wrapper">
    <div class="list">
      <div v-for="(item, index) in list" :key="index">
        <el-card class="list-item clearfix">
          <div class="list-item-wrapper" @click="$emit('to-detail', item.id)">
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
        <div class="list-item-footer">
          <span><img src="./hot.png"/> {{item.pageViews}}</span>
          <span><img src="./reply.jpg"/> {{item.replyCount}}</span>
          <span><img :src="item.like ? require('./like_full.png') : require('./like.png')"/> {{item.likeCount}}</span>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalNum"
        :current-page="Number(currentPage)"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'mooc-list',
    props: ['list', 'totalNum', 'currentPage'],
    data () {
      return {
        pageSize: 5,
        // 排序规则：0->最新, 1->最热
        sortingType: 0
      }
    },
    methods: {
      ...mapActions('account', {
        setAccountWindowShow: 'setAccountWindowShow'
      }),
      // 当前页码发生变化
      handleCurrentChange (page) {
        console.log(`current is ${this.currentPage}`)
        this.$emit('current-change', page)
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
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .list-wrapper
    .list
      .list-item-footer
        margin-top 18px
        margin-bottom 22px
        text-align right
        font-size 12px
        span
          padding-left 20px

      .list-item
        margin-bottom 8px
        border-radius 15px

        &:hover
          background-color #E0F3FF
          cursor pointer

        .list-item-wrapper
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
</style>
