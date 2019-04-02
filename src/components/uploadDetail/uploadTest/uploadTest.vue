<template>
  <div>
    <div v-if="isEditTestShow">
      <div class="shadow"></div>
      <div class="center editor-wrapper">
        <div class="title">新增测试题集</div>
        <div class="form-wrapper">
          <el-form :model="tempTest" class="demo-ruleForm" :rules="rules" label-width="100px" ref="testForm">
            <el-form-item prop="name" label="测试题名称:">
              <el-input v-model="tempTest.name" size="mini" placeholder="请输入测试题名称"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="测试题简介:">
              <el-input v-model="tempTest.description" size="mini" placeholder="请输入测试题简介" type="textarea"
                        :rows="4"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 10px;margin-left: 100px">
              <el-button type="primary" size="mini" @click="submitForm('testForm')">完成</el-button>
              <el-button @click="cancelEdit" size="mini">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-button size="mini" type="primary" style="margin: 20px 0" @click="editTest(-1)">新增测试题集</el-button>
    <el-table
      :data="course.tests"
      border
      style="width: 100%">
      <el-table-column
        label="测试名称"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="题目数量"
        width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="测试简介"
        width="400">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editTest(scope.$index)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'uploadTest',
    props: {
      course: null
    },
    data () {
      return {
        tempTest: null,
        currentIndex: null,
        isEditTestShow: false,
        rules: {
          name: [
            { required: true, message: '测试题名称不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '测试题简介不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      cancelEdit () {
        this.tempTest = null
        this.isEditTestShow = false
      },

      // 编辑测是题
      editTest (index) {
        this.$router.push({ name: 'testDetail', params: { index: index } })
      },
      handleDelete (index, row) {
        this.$confirm('此操作将永久删除该测试题集, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.course.tests.splice(index, 1)
          this.$emit('saveInfo', this.course)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../../common/style/popwindow.css"
  .editor-wrapper
    width 400px
    height 300px
    background white
    z-index 99

    .title
      margin 15px
      font-weight 700

    .form-wrapper
      width 360px
      padding 0 20px
</style>
