<template>
  <div class="subtitles">
    <ul>
      <li v-for="(item, index) in subtitles" :key="index">
        <span></span>
        {{item.content}}
      </li>
    </ul>
  </div>
</template>

<script>
  import { subtitles } from './js/subtitles'

  export default {
    name: 'subtitles',
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
      margin-top 10px
      margin-bottom 10px
      text-align center
</style>
