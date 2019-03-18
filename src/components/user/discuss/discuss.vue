<template>
  <div>
    <div>
      <span @click="toggleList(true)">我发起的</span>
      <span @click="toggleList(false)">我关注的</span>
    </div>
    <div v-if="currentList">
      <div class="item" v-for="(item,index) in currentList" :key="index">
        <div @click="rHelp.openDiscussDetailNewWindow(item.id)" class="course-img">
          <img :src="item.createPosition.image" width="150px" height="100px">
        </div>
        <div class="main-content">
          <div>
            <span v-if="!isMine(item.creator.id)">{{item.creator.name}}</span>
            <span>创建于{{item.createTime}}</span>
            <span @click="rHelp.openCourseNewWindow(item.createPosition.cid)">{{item.createPosition.courseName}}</span>
          </div>
          <div>
            <p>{{item.title}}</p>
          </div>
          <div>
            <span @click="rHelp.openDiscussDetailNewWindow(item.id)">{{item.replyCount}}</span>
            <span>{{item.pageViews}}</span>
            <span>{{item.likeCount}}</span>
          </div>
        </div>
        <div class="menu">
          <div v-if="item.createPosition.time" @click="rHelp.openVideoNewWindow(item.createPosition)">
            {{item.createPosition.time}}
          </div>
          <div v-if="isMine(item.creator.id)" @click="deleteMyDiscuss(index)">删除讨论</div>
          <div v-else @click="deleteLikeDiscuss(index)">取消关注</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { MY_DISCUSS, LIKE_DISCUSS } from '../../../common/js/data'
  import { mapGetters } from 'vuex'

  export default {
    name: 'discuss',
    data () {
      return {
        isMyDiscuss: true,
        myDiscuss: null,
        likeDiscuss: null
      }
    },
    props: {
      cid: null
    },
    created () {
      if (!this.cid) {
        // 根据用户id取讨论
      } else {
        // 根据用户id和课程id取讨论
      }
      this.myDiscuss = MY_DISCUSS
    },
    computed: {
      currentList () {
        return this.isMyDiscuss ? this.myDiscuss : this.likeDiscuss
      },
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    },
    methods: {
      toggleList (value) {
        this.isMyDiscuss = value
        if (!this.isMyDiscuss && !this.likeDiscuss) {
          this.likeDiscuss = LIKE_DISCUSS
        }
      },
      isMine (id) {
        return this.userInfo.id === id
      },
      deleteMyDiscuss (index) {
        this.myDiscuss.splice(index, 1)
      },
      deleteLikeDiscuss (index) {
        this.likeDiscuss.splice(index, 1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .item
    margin 10px 10px

    .course-img, .main-content, .menu
      display inline-block

    .menu
      float right
</style>
