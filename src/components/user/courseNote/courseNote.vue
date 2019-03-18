<template>
  <div>
    <div>
      <router-link :to="{name:'courseList'}">我的课程/</router-link>
      <span @click="rHelp.openCourseNewWindow(100)">xxx课程/</span>
      <span>课程笔记</span>
    </div>
    <note :cid="cid"></note>
  </div>
</template>

<script type="text/ecmascript-6">
  import note from '../note/note'

  export default {
    name: 'courseNote',
    data () {
      return {
        cid: null
      }
    },
    components: {
      note
    },
    created () {
      this.cid = this.$route.params.cid
    }
  }
</script>

<style lang="stylus" scoped>

</style>
