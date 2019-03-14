<template>
  <div class="discuss-wrapper">
    <div class="left">
      hhh
    </div>
    <div class="right">
      <div>相关讨论</div>
      <ul v-if="discuss">
        <li v-for="(item,index) in discuss.related" :key="index"></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { DISCUSS_DETAIL_OTHER, DISCUSS_DETAIL_MINE } from '../../common/js/data'

  export default {
    name: 'discussDetail',
    created () {
      // 从后台请求note
      let did = this.$route.params.did
      if (did >= 200 && did <= 203) {
        this.discuss = DISCUSS_DETAIL_MINE
      } else {
        this.discuss = DISCUSS_DETAIL_OTHER
      }
    },
    data () {
      return {
        discuss: null
      }
    },
    computed: {
      isMyNote () {
        // 未登录直接判断为不是我创建的讨论
        if (!this.userInfo) return false
        // 已登录则通过对比讨论创建者id和当前用户id来得到结果
        return this.discuss.creator.id === this.userInfo.id
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .discuss-wrapper
    width 1024px
    margin 0 auto
    position relative
    .left
      width 750px
      display inline-block
      background grey

    .right
      width 200px
      position absolute
      top 100px
      right 0
      background gainsboro
</style>
