<template>
  <div class="subtitles">
    <ul ref="box">
      <li v-for="(sentence, index) in subtitles" :key="index"
          ref="subtitles"
          @click="jumpTo(sentence.start)">
        {{sentence.content}}
      </li>
    </ul>
  </div>
</template>

<script>
  import { subtitles } from './js/subtitles'

  export default {
    name: 'subtitles',
    props: {
      // 视频当前播放点，用于高亮对应字幕
      currentTime: {
        type: Number,
        default: 0
      }
    },
    methods: {
      jumpTo (time) {
        console.log(`跳转到：${time}`)
        this.$emit('jump-to', time)
      }
    },
    watch: {
      currentTime: function (newVal, oldVal) {
        let self = this
        // 获取字幕的dom元素
        self.$refs.subtitles.forEach(function (item, index) {
          let curSentence = self.subtitles[index] || {}
          if (newVal >= curSentence.start && newVal <= curSentence.end) {
            // 下一句与这一句之间
            item.className = 'active'
            console.log(`当前字幕：${curSentence.content}(${curSentence.start} -> ${curSentence.end})`)
            // 滚动条滚动
            self.$emit('scroll-to', self.$refs.subtitles.length, index)
          } else {
            item.className = ''
          }
        })
      }
    },
    data () {
      return {
        // 字幕
        subtitles: null
      }
    },
    created () {
      // 后台获取字幕
      this.subtitles = subtitles
    }
  }
</script>

<style lang="stylus" scoped>
  .subtitles
    li
      cursor pointer
      margin-top 50px
      margin-bottom 10px
      text-align center
    .active
      color #049CFF
</style>
