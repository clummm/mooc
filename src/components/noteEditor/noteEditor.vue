<template>
  <div class="editor-wrapper">
    <div class="shadow"></div>
    <div class="editor">
      <div>笔记标题</div>
      <input type="text" v-model="currentNote.title">
      <div>笔记内容</div>
      <textarea v-model="currentNote.content" class="content"></textarea>
      <div>
        <span @click="changeNote">保存</span>
        <span @click="hideEditor">取消</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'noteEditor',
    props: {
      note: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        currentNote: {
          title: '',
          content: ''
        }
      }
    },
    methods: {
      changeNote () {
        this.$emit('changeNote', this.currentNote)
      },
      hideEditor () {
        this.$emit('hideEditor')
      }
    },
    mounted () {
      // 如果是编辑已有笔记则将内容赋给当前的笔记编辑器
      if (this.note) {
        this.currentNote.title = this.note.title
        this.currentNote.content = this.note.content
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .editor-wrapper
    .shadow
      z-index 98
      background rgba(0, 0, 0, 0.1)
      width 100%
      height 100%
      position fixed
      top 0
      left 0

    .editor
      width 400px
      height 300px
      position absolute
      z-index 99
      left 0
      right 0
      bottom 0
      top 0
      margin auto
      background white

      .content
        width 80%
        height 60%
</style>
