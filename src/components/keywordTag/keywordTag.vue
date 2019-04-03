<template>
  <div>
    <el-dialog :title="`修改${word.keyword}的解释`" :visible.sync="dialogFormVisible">
      <el-form :model="word">
        <el-input type="textarea" v-model="word.meaning" :rows="4"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <el-popover
      ref="popover"
      placement="top-start"
      :title="word.keyword"
      trigger="hover">
      <p>{{word.meaning}}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" @click="edit" type="text" v-if="editable">修改</el-button>
        <el-button size="mini" @click="more" type="text">更多</el-button>
      </div>
    </el-popover>
    <el-tag v-popover:popover>{{word.keyword}}</el-tag>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'keywordTag',
    props: {
      word: null,
      index: null,
      editable: {
        default: true
      }
    },
    data () {
      return {
        dialogFormVisible: false
      }
    },
    methods: {
      edit () {
        this.dialogFormVisible = true
      },
      save () {
        this.word.index = this.index
        this.$emit('save', this.word)
        this.dialogFormVisible = false
      },
      more () {
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
