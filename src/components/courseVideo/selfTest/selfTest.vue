<template>
  <div class="self-test">
    <div class="hint" v-if="!tests || tests.length <= 0">当前课程无作业</div>
    <div v-if="tests && tests.length > 0 && !showDetail">
      <el-card class="test-card" v-for="(item, index) in tests" :key="index">
        <div class="test-card-header clearfix" slot="header">
          <span class="test-name left">{{item.name}}</span>
          <span class="test-count right" @click="showTestDetail">共{{item.count}}道选择题</span>
        </div>
        <div>{{item.description}}</div>
      </el-card>
    </div>
    <ul v-if="showDetail">
      <li class="back" @click="backToTests">返回</li>
      <li v-for="(question, index) in test.list" :key="index" class="question">
        <p>{{question.query}}</p>
        <div class="answer-box">
          <el-radio-group v-model="choices[index]">
            <el-radio label="A">{{question.choiceA}}</el-radio>
            <el-radio label="B">{{question.choiceB}}</el-radio>
            <el-radio label="C">{{question.choiceC}}</el-radio>
            <el-radio label="D">{{question.choiceD}}</el-radio>
          </el-radio-group>
          <div v-if="showAnswer" class="analysis-box">
            <p>
              正确答案：{{question.answer}}，您的选择：{{choices[index]}}
              <span :class="question.answer === choices[index] ? 'correct' : 'error'">
                ({{question.answer === choices[index] ? '正确' : '错误'}})
              </span>
            </p>
            <p class="analysis" v-if="question.explain">解析：{{question.explain}}</p>
          </div>
        </div>
      </li>
      <div>
        <el-button @click="commit">提交</el-button>
      </div>
    </ul>
  </div>
</template>

<script>
  import { tests, test } from './js/test'

  export default {
    name: 'selfTest',
    data () {
      return {
        // 测试题集
        tests: [],
        // 测试题
        test: [],
        // 是否展示具体的测试题列表
        showDetail: false,
        // 用户的选项
        choices: [],
        showAnswer: false
      }
    },
    created () {
      // 后台获取测试题
      this.tests = tests
    },
    methods: {
      // 返回题集列表，清空答题情况
      backToTests () {
        this.showDetail = false
        this.showAnswer = false
        this.choices = []
      },
      // 展示具体测试题列表
      showTestDetail () {
        this.showDetail = true
        // 后台获取具体测试题列表
        this.test = test
      },
      // 提交答案
      commit () {
        console.log(this.choices)
        this.showAnswer = true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .self-test
    font-family PingFangSC-Regular
    font-size 14px
    height 100%
    .hint
      height 100%
      font-size 28px
      font-weight 700
      display flex
      justify-content center
      align-items center

    .test-card
      margin-bottom 20px
      .test-name
        font-family PingFangSC-Medium
        font-weight 600
        font-size 16px
      .test-count
        color #049CFF
        cursor pointer

    .question
      margin-bottom 8px
      line-height 26px
      padding 20px 0
    .analysis-box
      .correct
        color #67C23A
      .error
        color #F56C6C
    .back
      color #049CFF
      cursor pointer
</style>
