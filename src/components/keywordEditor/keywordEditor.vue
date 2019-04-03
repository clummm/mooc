<template>
  <div>
    <el-dialog title="编辑关键词" :visible.sync="dialogFormVisible">
      <div>
        <el-tag
          :key="index"
          v-for="(word,index) in tempWords"
          closable
          :disable-transitions="false"
          @close="handleClose(index)">
          {{word.keyword}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">添加关键词</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <el-button size="mini" plain @click="edit">手动编辑</el-button>
    <el-button size="mini" plain @click="auto">自动生成</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'keywordEditor',
    props: {
      words: null,
      sid: null
    },
    data () {
      return {
        dialogFormVisible: false,
        inputVisible: false,
        inputValue: '',
        tempWords: null
      }
    },
    methods: {
      // 删除关键词
      handleClose (index) {
        this.tempWords.splice(index, 1)
      },
      // 取消编辑
      cancel () {
        this.dialogFormVisible = false
      },
      // 确认编辑
      save () {
        this.dialogFormVisible = false
        this.$emit('save', this.tempWords)
      },
      auto () {
        // 根据sid从后台自动生成关键词
        this.tempWords = [{
          keyword: '自动生成1',
          meaning: '自动生成关键词1的解释'
        }, {
          keyword: '自动生成2',
          meaning: '自动生成关键词2的解释'
        }, {
          keyword: '自动生成3',
          meaning: '自动生成关键词3的解释'
        }, {
          keyword: '自动生成4',
          meaning: '自动生成关键词4的解释'
        }, {
          keyword: '自动生成5',
          meaning: '自动生成关键词5的解释'
        }]
        this.save()
      },
      // 手动编辑
      edit () {
        this.tempWords = []
        for (let i = 0, j = this.words.length; i < j; ++i) {
          this.tempWords.push(Object.assign({}, this.words[i]))
        }
        this.dialogFormVisible = true
      },
      // 显示添加关键词的输入框
      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      // 添加关键词
      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          this.tempWords.push({ keyword: inputValue, meaning: inputValue + '的解释' })
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
    margin-bottom 10px
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: top;
  }
</style>
