<template>
  <div class="publish-container">
    <p>发表笔记</p>
    <div class="title">
      <el-input name="title" type="text" placeholder="请输入笔记标题"
                @blur="checkTitle"
                @focus="showTitleHint = false"
                v-model="note.title"></el-input>
      <div class="hint-box"><span class="hint" v-if="showTitleHint">标题不能少于5个字符</span></div>
    </div>
    <div class="content">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="note.content">
      </el-input>
    </div>
    <div class="commit clearfix"><el-button round @click="commit">提交</el-button></div>
  </div>
</template>

<script>
  export default {
    name: 'publishNote',
    data () {
      return {
        // 要发布的笔记
        note: {
          title: '',
          content: ''
        },
        // 标题字数提示
        showTitleHint: false
      }
    },
    methods: {
      // 检查是否讨论标题是够符合要求
      checkTitle () {
        console.log(`title is ${this.note.title}`)
        if (this.note.title.trim().length < 5) {
          console.log('标题不能少于5个字符')
          this.showTitleHint = true
        } else {
          this.showTitleHint = false
        }
      },
      // 发布讨论
      commit () {
        console.log(`before commit, title's length is ${this.note.title.length}`)
        if (this.note.title.trim().length >= 5) {
          this.note.title = this.note.title.trim()
          this.note.content = this.note.content.trim()
          // 向后台提交讨论
          // ...post(uid, cid, note)
          alert('提交成功')
          this.note.title = ''
          this.note.content = ''
          // 通知父组件刷新
          // this.$emit('submit-add', this.note)
        } else {
          alert('提交失败')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .publish-container
    p
      font-size  16px
      font-weight 700
      line-height 24px
      margin-bottom 16px
    .title
      margin-bottom 8px
      .hint-box
        height 20px
        .hint
          font-size 12px
          color #ff0000
    .content
      margin-bottom 8px
    .commit
      margin-bottom 8px
      button
        float right
</style>
