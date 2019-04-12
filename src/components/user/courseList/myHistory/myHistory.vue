<template>
  <div class="main-wrapper">
    <div v-for="(item,index) in data" :key="index">
      <div v-if="index===0||data[index-1].date!==item.date" class="date">{{item.date}}</div>
      <div class="item-wrapper">
        <v-course :course="item" class="course-item"></v-course>
        <div class="leave-position">
          <div>上传学习到{{item.leavePosition.name}}</div>
          <el-button plain @click="rHelp.openVideoNewWindow(item.leavePosition)" size="mini" class="continue">继续学习
          </el-button>
        </div>
        <div @click="addCourse(item,index)" v-if="!item.like" class="like-btn">收藏</div>
        <div @click="deleteCourseById(item.id,index)" v-if="item.like" class="like-btn">取消收藏</div>
        <div @click="deleteHistory(index)" class="delete-btn">删除记录</div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import courseItem from '../../courseItem/courseItem'

  export default {
    name: 'myHistory',
    props: {
      data: {
        Type: Array,
        default: []
      }
    },
    methods: {
      addCourse (course, index) {
        this.$emit('addCourse', course, index)
      },
      deleteCourseById (id, index) {
        this.$emit('deleteCourseById', id, index)
      },
      deleteHistory (index) {
        this.$confirm('确定删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('deleteHistory', index)
        })
      }
    },
    components: {
      'v-course': courseItem
    }
  }
</script>

<style lang="stylus" scoped>
  .main-wrapper
    .date
      font-size: 18px;
      font-family: PingFangSC-Regular;
      font-weight: 700;
      color: rgba(102, 102, 102, 1);
      line-height: 25px;
      margin-top 20px
      margin-bottom 10px

    .item-wrapper
      width 100%
      height 150px
      border-bottom 1px solid #CBCBCB

      .course-item
        margin-top 40px
        display inline-block

      .leave-position
        width 190px
        text-align center
        display inline-block
        vertical-align top
        margin-top 40px
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(198, 198, 198, 1);
        line-height: 20px;

        .continue
          margin-top 10px

      .like-btn
        cursor pointer
        text-align center
        display inline-block
        vertical-align top
        margin-top 59px
        width: 93px;
        height: 37px;
        border: 1px solid rgba(4, 156, 255, 1);
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(4, 156, 255, 1);
        line-height: 37px;

      .delete-btn
        cursor pointer
        display inline-block
        vertical-align top
        margin-top 65px
        float right
        width: 72px;
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(166, 166, 166, 1);
        line-height: 25px;
</style>
