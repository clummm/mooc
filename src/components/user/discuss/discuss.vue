<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo menu-text" mode="horizontal" @select="handleSelect"
             text-color="#666666" active-text-color="#049CFF">
      <el-menu-item index="0">我的讨论</el-menu-item>
      <el-menu-item index="1">关注讨论</el-menu-item>
    </el-menu>
    <div v-if="currentList">
      <div v-for="(item,index) in currentList" :key="index" class="item-wrapper">
        <div class="create-info">
          <div v-if="!isMyDiscuss" class="creator">
            <img :src="item.creator.avatar" class="avatar">
            {{item.creator.name}}
          </div>
          <span class="date">创建于{{item.createTime}}</span>
          <span class="course"
                @click="rHelp.openCourseNewWindow(item.createPosition.cid)">《{{item.createPosition.courseName}}》</span>
          <span class="iconfont icon-shipin play" @click="rHelp.openVideoNewWindow(item.position)"></span>
        </div>
        <div class="title">{{item.title}}</div>
        <div class="menu">
          <span class="btn" @click="rHelp.openDiscussDetail(item.id)"><i class="iconfont icon-huifu icon"/>{{item.replyCount}}</span>
          <span class="btn" @click="rHelp.openDiscussDetail(item.id)"><i class="iconfont icon-liulan icon"/>{{item.pageViews}}</span>
          <div v-if="isMine(item.creator.id)" class="mine">
            <span class="like-btn"><i class="iconfont icon-xihuan icon like"/>{{item.likeCount}}</span>
            <span @click="deleteMyDiscuss(index)" class="btn">删除讨论</span>
          </div>
          <span v-else @click="deleteLikeDiscuss(index)" class="like-btn"><i class="iconfont icon-xihuan icon like"/>{{item.likeCount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { MY_DISCUSS, LIKE_DISCUSS } from '../../../../public/js/data'
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
      this.activeIndex = this.$route.params.type + ''
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
      // 处理tab切换
      handleSelect (index, indexPath) {
        this.isMyDiscuss = index === '0'
        // 第一次进入收藏笔记时请求数据
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
        this.$confirm('确定取消关注该笔记?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.likeDiscuss.splice(index, 1)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .item-wrapper
    width 100%
    border-bottom 1px solid #CBCBCB

    .create-info
      margin 15px 0
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;

      .title
        margin-right 15px

      .creator
        display inline-block
        width 150px

        .avatar
          display inline-block
          vertical-align top
          margin-right 5px
          width 18px
          height 18px
          border-radius 50%

      .date
        display inline-block
        width 150px
        text-align center

      .course
        cursor pointer
        display inline-block
        text-align center
        width 250px

        &:hover
          color rgba(4, 156, 255, 1);
          text-decoration underline

      .play
        display inline-block
        cursor pointer
        font-size 16px

        &:hover
          color rgba(4, 156, 255, 1);

    .title
      padding 0 20px
      margin-bottom 15px
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;

    .menu
      margin-bottom 15px
      margin-left 20px
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(166, 166, 166, 1);
      line-height: 17px;

      .icon
        margin-right 3px

      .btn
        cursor pointer
        margin-right 10px

        &:hover
          color rgba(4, 156, 255, 1);

      .like-btn
        cursor pointer
        margin-right 10px

        .like
          color rgba(4, 156, 255, .6);

          &:hover
            color rgba(4, 156, 255, 1);

      .mine
        display inline-block

</style>
