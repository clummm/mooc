<template>
  <div class="self-test">
    <div class="hint" v-if="!test || test.length <= 0">当前课时无作业</div>
    <ul v-if="test && test.length > 0">
      <li v-for="(question, index) in test" :key="index" class="question">
        <p>{{question.title}}</p>
        <p>{{question.description}}</p>
        <div class="answer-box">
          <el-radio-group v-model="choices[index]">
            <el-radio v-for="(choice, i) in question.choices" :key="i"
                      :label="choice.cid">{{choice.content}}
            </el-radio>
          </el-radio-group>
          <div v-if="showAnswer" class="analysis-box">
            <p>
              正确答案：{{String.fromCharCode(0x41+question.answer)}}，您的选择：{{String.fromCharCode(0x41+choices[index])}}
              <span :class="question.answer === choices[index] ? 'correct' : 'error'">
                ({{question.answer === choices[index] ? '正确' : '错误'}})
              </span>
            </p>
            <p class="analysis" v-if="question.analysis">解析：{{question.analysis}}</p>
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
  import { test } from './js/test'

  export default {
    name: 'selfTest',
    data () {
      return {
        // 测试题
        test: [],
        // 用户的选项
        choices: [],
        showAnswer: false
      }
    },
    created () {
      // 后台获取测试题
      this.test = test
    },
    methods: {
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
    height 100%
    .hint
      height 100%
      font-size 28px
      font-weight 700
      display flex
      justify-content center
      align-items center
    .question
      margin-bottom 8px
      line-height 26px
      padding 24px 32px 28px
    .analysis-box
      .correct
        color #67C23A
      .error
        color #F56C6C
</style>
