<template>
  <div>
    <div @click="back" class="back"><i class="el-icon-back"></i>返回</div>
    <div class="form-wrapper">
      <el-form :model="test" class="demo-ruleForm" :rules="rules" label-width="100px" ref="testForm">
        <el-form-item prop="name" label="测试题名称:">
          <el-input v-model="test.name" placeholder="请输入测试题名称" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="测试题简介:">
          <el-input v-model="test.description" placeholder="请输入测试题简介" type="textarea"
                    :rows="4" style="width: 60%"></el-input>
        </el-form-item>
      </el-form>
      <div class="test-wrapper">
        <div>测试题目：{{test.list.length}}</div>
        <div class="test-list">
          <el-card class="box-card test-card" v-for="(item,index) in test.list" :key="index">
            <div v-if="!isEdit(index)">
              <div>{{item.query}}</div>
              <div>A.{{item.choiceA}}</div>
              <div>B.{{item.choiceB}}</div>
              <div>C.{{item.choiceC}}</div>
              <div>D.{{item.choiceD}}</div>
              <div>答案：{{item.answer}}</div>
              <div>解析：{{item.explain}}</div>
              <div>
                <el-button type="primary" size="mini" @click="editTest(index)">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteTest(index)">删除</el-button>
              </div>
            </div>
            <div v-else>
              <el-form :model="tempTest" :rules="itemRules" label-width="100px" ref="itemForm" size="mini"
                       class="demo-ruleForm">
                <el-form-item prop="query" label="题目内容:">
                  <el-input v-model="tempTest.query" placeholder="请输入题目内容" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item prop="choiceA" label="选项A:">
                  <el-input v-model="tempTest.choiceA" placeholder="请输入选项内容" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item prop="choiceB" label="选项B:">
                  <el-input v-model="tempTest.choiceB" placeholder="请输入选项内容" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item prop="choiceC" label="选项C:">
                  <el-input v-model="tempTest.choiceC" placeholder="请输入选项内容" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item prop="choiceD" label="选项D:">
                  <el-input v-model="tempTest.choiceD" placeholder="请输入选项内容" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item prop="answer" label="题目答案:">
                  <el-radio-group v-model="tempTest.answer">
                    <el-radio label="A"></el-radio>
                    <el-radio label="B"></el-radio>
                    <el-radio label="C"></el-radio>
                    <el-radio label="D"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item prop="explain" label="题目解析:">
                  <el-input v-model="tempTest.explain" placeholder="请输入题目解析" style="width: 80%" type="textarea"
                            :rows="4"></el-input>
                </el-form-item>
                <div style="margin-left: 20px">
                  <el-button type="primary" size="mini" @click="submitForm('itemForm')">完成</el-button>
                  <el-button size="mini" @click="cancelItem(index)">取消</el-button>
                </div>
              </el-form>
            </div>
          </el-card>
          <el-button type="primary" @click="editTest(-1)">添加题目</el-button>
        </div>
      </div>
      <div class="form-menu">
        <el-button type="primary" @click="submitForm('testForm')" :loading="isLoading">保存</el-button>
        <el-button @click="cancelEdit">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { TEST_DETAIL } from '../../../../common/js/data'

  export default {
    name: 'testDetail',
    props: {
      course: null
    },
    data () {
      return {
        test: null,
        selectedIndex: null,
        tempTest: null,
        isAddingNew: false,
        isLoading: false,
        rules: {
          name: [
            { required: true, message: '测试题名称不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '测试题简介不能为空', trigger: 'blur' }
          ]
        },
        itemRules: {
          query: [
            { required: true, message: '题目内容不能为空', trigger: 'blur' }
          ],
          choiceA: [
            { required: true, message: '选项内容不能为空', trigger: 'blur' }
          ],
          choiceB: [
            { required: true, message: '选项内容不能为空', trigger: 'blur' }
          ],
          choiceC: [
            { required: true, message: '选项内容不能为空', trigger: 'blur' }
          ],
          choiceD: [
            { required: true, message: '选项内容不能为空', trigger: 'blur' }
          ],
          answer: [
            { required: true, message: '请选择答案', trigger: 'blur' }
          ],
          explain: [
            { required: true, message: '题目解释不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      let index = parseInt(this.$route.params.index)
      this.test = TEST_DETAIL
      if (index === -1) {
        this.test.name = null
        this.test.description = null
        this.test.list = []
      } else {
        let tempTest = this.course.tests[index]
        this.test.id = tempTest.id
        this.test.name = tempTest.name
        this.test.description = tempTest.description
      }
    },
    methods: {
      // 取消编辑测试题
      cancelItem (index) {
        // 取消添加题目
        if (this.isAddingNew) {
          this.test.list.splice(-1, 1)
          this.isAddingNew = false
        }
        this.selectedIndex = null
        this.tempTest = null
      },
      // 编辑测试题
      editTest (index) {
        this.selectedIndex = parseInt(index)
        if (this.selectedIndex === -1) { // 添加测试题
          this.isAddingNew = true
          this.tempTest = {
            query: null,
            choiceA: null,
            choiceB: null,
            choiceC: null,
            choiceD: null,
            answer: null,
            explain: null
          }
          this.selectedIndex = this.test.list.length
          this.test.list.push(this.tempTest)
        } else {
          this.tempTest = Object.assign({}, this.test.list[this.selectedIndex])
        }
      },
      // 删除测试题
      deleteTest (index) {
        this.$confirm('确定删除该题目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.test.list.splice(index, 1)
        })
      },
      // 返回测试题集列表
      back () {
        this.$confirm('直接返回将不会保存修改内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ name: 'uploadTest' })
        })
      },
      // 取消编辑
      cancelEdit () {
        this.back()
      },
      // 判断当前试题是否正在被编辑
      isEdit (index) {
        if (!this.selectedIndex && this.selectedIndex !== 0) {
          return false
        } else {
          if (index === this.selectedIndex) {
            return true
          } else {
            return false
          }
        }
      },
      // 提交表单
      submitForm (formName) {
        // 完成题目编辑
        if (formName === 'itemForm') {
          this.$refs[formName]['0'].validate((valid) => {
            if (valid) { // 验证成功
              this.test.list[this.selectedIndex] = this.tempTest
              this.selectedIndex = null
              this.tempTest = null
            } else {
              return false
            }
          })
        } else { // 完成全部编辑
          this.$refs[formName].validate((valid) => {
            if (valid) { // 验证成功
              // 判断测试题目不为空
              if (this.test.list.length === 0) {
                this.$message({
                  message: '请设置测试题目',
                  type: 'warning'
                })
              } else {
                let index = parseInt(this.$route.params.index)
                if (index === -1) {
                  this.course.tests.push({
                    id: 201,
                    name: this.test.name,
                    count: this.test.list.length,
                    description: this.test.description
                  })
                } else {
                  this.course.tests[index].name = this.test.name
                  this.course.tests[index].description = this.test.description
                  this.course.tests[index].count = this.test.list.length
                }
                this.isLoading = true
                setTimeout(() => {
                  this.$emit('saveInfo', this.course)
                  this.$router.push({ name: 'uploadTest' })
                }, 500)
              }
            } else {
              return false
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .back
    margin 10px 0

  .test-wrapper
    .test-list
      margin-top 20px
      padding 0 100px

      .test-card
        margin-bottom 20px

  .form-menu
    width 200px
    margin 20px auto

</style>
