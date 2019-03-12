<template>
  <div class="main-wrapper">
    <div class="item-wrapper" v-for="(item,index) in data" :key="index">
      <img :src="item.img" width="150px" height="100px" class="icon">
      <div class="info">
        <div>{{item.name}}</div>
        <div>{{item.subtitle}}</div>
        <el-rate
          :value=item.rating
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}" class="rate">
        </el-rate>
        <div>{{item.learningCount}}人学过</div>
        <span>笔记{{item.noteCount}}</span>
        <span>讨论{{item.discussCount}}</span>
      </div>
      <div class="leave-position">
        <div>上传学习到{{item.leavePosition.name}}</div>
        <div @click="openVideo(item.id,item.leavePosition)">继续学习</div>
      </div>
      <div class="menu" @click="deleteCourse(index)">
        取消收藏
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'myCourse',
    props: {
      data: {
        Type: Array,
        default: []
      }
    },
    methods: {
      deleteCourse (index) {
        this.$emit('deleteCourse', index)
      },
      openVideo (id, leavePosition) {
        let routeData = this.$router.resolve({
          name: 'courseVideo',
          params: { cid: id, sid: leavePosition.sid, time: leavePosition.time }
        })
        window.open(routeData.href, '_blank')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main-wrapper
    .item-wrapper
      padding 10px 10px

      .info
        display inline-block

      .leave-position
        display inline-block

      .menu
        display inline-block
</style>
