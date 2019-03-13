<template>
  <div class="main-wrapper">
    <div class="item-wrapper" v-for="(item,index) in data" :key="index">
      <div v-if="index===0||data[index-1].date!==item.date">{{item.date}}</div>
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
        <router-link :to="{name:'courseNote',params: {cid:item.id}}">笔记{{item.noteCount}}</router-link>
        <router-link :to="{name:'courseDiscuss',params: {cid:item.id}}">讨论{{item.discussCount}}</router-link>
      </div>
      <div class="leave-position">
        <div>上传学习到{{item.leavePosition.name}}</div>
        <div @click="openVideo(item.id,item.leavePosition)">继续学习</div>
      </div>
      <div class="menu">
        <div @click="addCourse(item,index)" v-if="!item.like">收藏</div>
        <div @click="deleteCourseById(item.id,index)" v-if="item.like">取消收藏</div>
        <div @click="deleteHistory(index)">删除记录</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'myHistory',
    props: {
      data: {
        Type: Array,
        default: []
      }
    },
    methods: {
      openVideo (id, leavePosition) {
        let routeData = this.$router.resolve({
          name: 'courseVideo',
          params: { cid: id, sid: leavePosition.sid, time: leavePosition.time }
        })
        window.open(routeData.href, '_blank')
      },
      addCourse (course, index) {
        this.$emit('addCourse', course, index)
      },
      deleteCourseById (id, index) {
        this.$emit('deleteCourseById', id, index)
      },
      deleteHistory (index) {
        this.$emit('deleteHistory', index)
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
