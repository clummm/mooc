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
    <el-button type="primary" plain size="mini" class="add" @click="isAddShow=true">新增课程</el-button>
    <el-table :data="this.courses"
              border
              style="width: 100%"
              v-if="this.courses"
              class="form-wrapper">
      <el-table-column
        label="课程信息"
        width="330">
        <template slot-scope="scope">
          <v-course :course="scope.row" class="course-item"></v-course>
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间"
        width="130">
        <template slot-scope="scope">
             <span v-if="scope.row.publishTime">
          {{scope.row.publishTime}}
        </span>
          <span v-else>暂未发布</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新状态"
        width="130">
        <template slot-scope="scope">
          <div class="update">
            <div v-if="scope.row.updateTime">上次更新：
              <div>{{scope.row.updateTime}}</div>
            </div>
            <span v-else>暂无更新</span>
            <div v-if="scope.row.updateStatus===1&&scope.row.updateTime" @click="scope.row.updateStatus=2" class="btn">
              提交更新
            </div>
            <div v-else-if="scope.row.updateStatus===2">更新审核中...</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="发布状态"
        width="80">
        <template slot-scope="scope">
          <div class="status">
            <div v-if="scope.row.status===0">
              <div>未审核</div>
              <div @click="scope.row.status=1" class="btn">提交审核</div>
            </div>
            <div v-else-if="scope.row.status===1">
              <div>审核中...</div>
            </div>
            <div v-else-if="scope.row.status===2">
              <div>发布中</div>
              <div @click="scope.row.status=3" class="btn">停止发布</div>
            </div>
            <div v-else>
              <div>停止发布</div>
              <div @click="scope.row.status=2" class="btn">发布</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <div class="menu">
            <div @click="rHelp.openUploadInfo(scope.row.id)" class="btn">管理</div>
            <div @click="deleteCourse(scope.$index)" class="btn">删除</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { PUBLISH_COURSES } from '../../../../public/js/data'
  import courseItem from '../courseItem/courseItem'

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
            updateStatus: 1,
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
    },
    components: {
      'v-course': courseItem
    }
  }
</script>

<style lang="stylus" scoped>
  .btn
    color: rgba(166, 166, 166, 1);
    cursor pointer

    &:hover
      color rgba(4, 156, 255, 1);
  .upload-wrapper
    .add
      margin 30px 0

    .form-wrapper
      margin-bottom 60px

      .status, .update,.menu
        text-align center

</style>
