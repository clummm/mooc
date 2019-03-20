<!-- 上传管理 -->
<template>
  <div class="upload-wrapper">
    <div v-if="isAddShow">
      <label>新增课程标题</label>
      <input type="text" v-model="newTitle" placeholder="请输入新增课程标题">
      <div>
        <span @click="addCourse">确定</span>
        <span @click="isAddShow=false">取消</span>
      </div>
    </div>
    <div @click="isAddShow=true">新增课程</div>
    <div v-if="this.courses">
      <div class="item" v-for="(item,index) in this.courses" :key="index">
        <img :src="item.img" width="150" height="100">
        <div class="base-info">
          <span>{{item.name}}</span>
          <div v-if="item.subtitle">{{item.subtitle}}</div>
          <el-rate
            v-if="item.rating"
            :value=parseInt(item.rating)
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}" class="rate">
          </el-rate>
          <span v-else>暂无评分</span>
          <span v-if="item.learningCount">{{item.learningCount}}学过</span>
          <span v-else>暂无人学过</span>
        </div>
        <span v-if="item.publishTime">
          {{item.publishTime}}
        </span>
        <span v-else>暂未发布</span>
        <span v-if="item.updateTime">{{item.updateTime}}</span>
        <span v-else>暂无更新</span>
        <div class="status">
          <div v-if="item.status===0">
            <div>未审核</div>
            <div @click="item.status=1">提交审核</div>
          </div>
          <div v-else-if="item.status===1">
            <div>审核中</div>
          </div>
          <div v-else-if="item.status===2">
            <div>发布中</div>
            <div @click="item.status=3">停止发布</div>
          </div>
          <div v-else>
            <div>停止发布</div>
            <div @click="item.status=2">发布</div>
          </div>
        </div>
        <div class="menu">
          <span @click="rHelp.openUploadInfo(item.id)">管理</span>
          <span @click="deleteCourse(index)">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { PUBLISH_COURSES } from '../../../common/js/data'

  export default {
    name: 'upload',
    data () {
      return {
        courses: null,
        isAddShow: false,
        newTitle: null
      }
    },
    created () {
      this.courses = PUBLISH_COURSES
    },
    methods: {
      addCourse () {
        // 通知后台增加课程 返回课程id
        let newCourse =
          {
            id: 1001,
            img: null,
            name: '课程名字1',
            subtitle: null,
            learningCount: null,
            rating: null,
            publishTime: null,
            updateTime: null,
            status: 0
          }
        this.courses.push(newCourse)
        this.newTitle = null
        this.isAddShow = false
      },
      deleteCourse (index) {
        console.log('a')
        this.courses.splice(index, 1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .upload-wrapper
    .item
      position relative

      .base-info
        display inline-block

      .menu
        position absolute
        right 20px
        top 10px

      .status
        display inline-block
</style>
