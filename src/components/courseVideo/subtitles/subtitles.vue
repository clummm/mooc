<template>
  <div class="subtitles">
    <ul ref="box">
      <li v-for="(sentence, index) in subtitles" :key="index"
          ref="subtitles"
          @click="$emit('jump-to', sentence.start)">
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
    watch: {
      currentTime: function (newVal, oldVal) {
        let self = this
        // 获取字幕的dom元素
        self.$refs.subtitles.forEach(function (item, index) {
          let curSentence = self.subtitles[index] || {}
          let nextSentence = self.subtitles[index + 1] || {}
          if (newVal >= curSentence.start && newVal < nextSentence.start) {
            // 下一句与这一句之间
            item.className = 'active'
            // 滚动条滚动
            self.$emit('scroll-to', self.$refs.subtitles.length, index)
          } else if (newVal >= curSentence.start && !nextSentence.start) {
            // 最后一句字幕
            item.className = 'active'
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
      color red
</style>
