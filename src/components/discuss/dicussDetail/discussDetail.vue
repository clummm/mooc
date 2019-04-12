<template>
  <div class="discuss-wrapper">
    <div class="left">
      <div class="base-info">
        <img class="avatar" width="150" height="150" :src="discuss.creator.avatar">
        <div class="create-info">
          <div>
            <span>{{discuss.creator.name}}</span>
            <span>{{discuss.createTime}}</span>
            <span
              @click="rHelp.openCourseNewWindow(discuss.createPosition.cid)">{{discuss.createPosition.courseName}}</span>
          </div>
          <div>
            {{discuss.title}}
          </div>
        </div>
        <div class="menu">
          <span v-if="discuss.createPosition.time" @click="rHelp.openVideoNewWindow(discuss.createPosition)">{{discuss.createPosition.time}}</span>
          <div v-if="!isMyDiscuss">
            <span v-if="discuss.liked" @click="toggleLike">取消关注</span>
            <span v-else @click="toggleLike">关注</span>
            <span>举报</span>
          </div>
        </div>
      </div>
      <div class="reply-content">
        <div class="reply">
          <textarea class="reply-area" v-model="newReply" placeholder="说点什么"></textarea>
          <div @click="submit(-1)">发布</div>
        </div>
        <div v-for="(item,index) in discuss.reply" :key="index">
          <img class="avatar" :src="item.replyer.avatar" width="50" height="50">
          <div class="reply-info">
            <div v-if="item.replyName">{{item.replyer.name}}回复：</div>
            <div v-else>{{item.replyer.name}}回复{{item.replyName}}：</div>
            <div>{{item.date}}</div>
          </div>
          <div class="reply-menu">
            <span @click="replyReplyer(index)">回复</span>
            <span>举报</span>
            <span v-if="!item.liked" @click="toggleReplyLike(index)">点赞{{item.likeCount}}</span>
            <span v-else @click="toggleReplyLike(index)">取消点赞{{item.likeCount}}</span>
          </div>
          <div>
            {{item.content}}
          </div>
          <div v-if="item.replying">
            <textarea class="reply-replyer-area" v-model="newReplyReplyer"
                      :placeholder="replyHint(item.replyer.name)"></textarea>
            <div>
              <span class="submit" @click="submit(index)">发布</span>
              <span class="cancel" @click="cancel(index)">取消</span>
            </div>
          </div>
        </div>
      </div>
      <div>查看更多</div>
    </div>
    <div class="right">
      <div>相关讨论</div>
      <ul v-if="discuss">
        <li v-for="(item,index) in discuss.related" :key="index" @click="rHelp.openDiscussDetail(item.id)">
          {{item.title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { DISCUSS_DETAIL_OTHER, DISCUSS_DETAIL_MINE } from '../../../../public/js/data'

  export default {
    name: 'discussDetail',
    created () {
      // 从后台请求note
      let did = this.$route.params.did
      if (did >= 200 && did <= 203) {
        this.discuss = DISCUSS_DETAIL_MINE
      } else {
        this.discuss = DISCUSS_DETAIL_OTHER
      }
      for (let i = 0, j = this.discuss.reply.length; i < j; ++i) {
        this.discuss.reply[i].replying = false
      }
    },
    data () {
      return {
        discuss: null,
        newReply: null,
        newReplyReplyer: null
      }
    },
    methods: {
      toggleLike () {
        // 通知后台切换关注状态
        this.discuss.liked = !this.discuss.liked
      },
      // 切换对某条评论的点赞状态
      toggleReplyLike (index) {
        // 通知后台切换关注状态
        this.discuss.reply[index].liked = !this.discuss.reply[index].liked
      },
      // 回复某条回复
      replyReplyer (index) {
        // 同一时间只允许对一个进行回复
        for (let i = 0, j = this.discuss.reply.length; i < j; ++i) {
          this.discuss.reply[i].replying = false
        }
        this.discuss.reply[index].replying = true
        this.newReplyReplyer = null
        this.$forceUpdate()
      },
      // 取消对某条回复的回复
      cancel (index) {
        this.discuss.reply[index].replying = false
        this.$forceUpdate()
      },
      // 发布消息
      submit (index) {
        let reply = Object.assign({}, this.discuss.reply[0])
        // 为-1表示回复讨论发布者；否则为对某个回复者回复
        // 上传消息
        // 成功后返回新的消息对象
        if (index !== -1) {
          reply.content = this.newReplyReplyer
          this.newReplyReplyer = null
          this.discuss.reply[index].replying = false
          this.$forceUpdate()
        } else {
          reply.content = this.newReply
          this.newReply = null
        }
        reply.replying = false
        this.discuss.reply.unshift(reply)
      },
      replyHint (name) {
        return '回复' + name + '：'
      }
    },
    computed: {
      isMyDiscuss () {
        // 未登录直接判断为不是我创建的讨论
        if (!this.userInfo) return false
        // 已登录则通过对比讨论创建者id和当前用户id来得到结果
        return this.discuss.creator.id === this.userInfo.id
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .discuss-wrapper
    width 1024px
    margin 0 auto
    position relative

    .left
      width 750px
      display inline-block
      background grey

      .avatar
        border-radius 50%

      .base-info
        position relative

        .create-info
          display inline-block
          position absolute

        .menu
          display inline-block
          float right

      .reply-content
        .reply-info
          display inline-block

        .reply-menu
          display inline-block
          float right

        .reply-replyer-area
          min-height 100px
          width 700px

      .reply
        .reply-area
          min-height 150px
          width 700px

    .right
      width 200px
      position absolute
      top 100px
      right 0
      background gainsboro
</style>
