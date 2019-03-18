<template>
  <div>
    <div>
      <router-link :to="{name:'courseList'}">我的课程/</router-link>
      <span @click="rHelp.openCourseNewWindow(100)">xxx课程/</span>
      <span>课程讨论</span>
    </div>
    <discuss :cid="cid"></discuss>
  </div>
</template>

<script type="text/ecmascript-6">
  import discuss from '../discuss/discuss'

  export default {
    name: 'courseDiscuss',
    components: {
      discuss
    },
    data () {
      return {
        cid: null
      }
    },
    created () {
      this.cid = this.$route.params.cid
    }
  }
</script>

<style lang="stylus" scoped>

</style>
