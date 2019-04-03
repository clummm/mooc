<template>
  <div class="main-wrapper">
    <div class="item-wrapper" v-for="(item,index) in data" :key="index">
      <v-course :course="item" class="course-item"></v-course>
      <div class="related-content">
        <router-link :to="{name:'courseNote',params: {cid:item.id}}" class="related-button">
          笔记 {{item.noteCount}}
        </router-link>
        <span class="separator">|</span>
        <router-link :to="{name:'courseDiscuss',params: {cid:item.id}}" class="related-button">讨论
          {{item.discussCount}}
        </router-link>
        <div class="last-name">上次学习到{{item.leavePosition.name}}</div>
      </div>
      <div class="continue" @click="openVideo(item.id,item.leavePosition)">继续学习</div>
      <div class="cancel" @click="deleteCourse(index)">
        取消收藏
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="6"
      @current-change="handleCurrentChange"
      :total="20"
      prev-text="上一页"
      next-text="下一页"
      class="pagination">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import courseItem from '../../courseItem/courseItem'

  export default {
    name: 'myCourse',
    props: {
      data: {
        Type: Array,
        default: []
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      // 翻页后获取数据
      fetchData () {

      },
      // 翻页
      handleCurrentChange (page) {
        this.$router.push({ query: { p: page } })
      },
      deleteCourse (index) {
        this.$confirm('确定取消收藏' + this.data[index].name + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('deleteCourse', index)
        })
      },
      // 继续学习视频
      openVideo (id, leavePosition) {
        let routeData = this.$router.resolve({
          name: 'courseVideo',
          params: { cid: id, chapter: '1', sid: leavePosition.sid, time: leavePosition.time }
        })
        window.open(routeData.href, '_blank')
      }
    },
    components: {
      'v-course': courseItem
    }
  }
</script>

<style lang="stylus" scoped>
  .main-wrapper
    .item-wrapper
      width 100%
      height 150px
      border-bottom 1px solid #CBCBCB
      .course-item
        margin-top 40px
        display inline-block
      .related-content
        width 190px
        vertical-align top
        margin-top: 51px;
        display inline-block
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;

        .separator
          margin 0 20px

        .related-button
          cursor pointer
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;

          &:hover
            text-decoration none
            color rgba(4, 156, 255, 1);

        .last-name
          margin-top 6px
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(198, 198, 198, 1);
          line-height: 20px;

      .continue
        display inline-block
        vertical-align top
        margin-top 59px
        margin-left 10px
        width: 93px;
        height: 37px;
        border: 1px solid rgba(4, 156, 255, 1);
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(4, 156, 255, 1);
        line-height: 37px;
        text-align center
        cursor pointer

      .cancel
        cursor pointer
        display inline-block
        vertical-align top
        margin-top 65px
        float right
        font-size: 18px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(166, 166, 166, 1);
        line-height: 25px;

    .pagination
      margin-top 51px
      margin-bottom 60px
      width 100%
      text-align center
</style>
