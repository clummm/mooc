<template>
  <div class="footer-menu">
    <el-menu default-active="forum" mode="horizontal" @select="handleFootMenuSelect"
             active-text-color="#049CFF" text-color="#333333">
      <el-menu-item index="forum">课程讨论</el-menu-item>
      <el-menu-item index="notes">课程笔记</el-menu-item>
    </el-menu>
    <div class="footer-menu-content">
      <forum v-show="footMenuActive === 'forum'" :with-query="false"></forum>
      <notes v-show="footMenuActive === 'notes'" :with-query="false"></notes>
    </div>
  </div>
</template>

<script>
  import forum from '../../course/forum/forum'
  import notes from '../../course/notes/notes'

  export default {
    name: 'footerMenu',
    data () {
      return {
        // 底部菜单激活项
        footMenuActive: 'forum'
      }
    },
    components: {
      forum,
      notes
    },
    methods: {
      // 底部目录页点击处理
      handleFootMenuSelect (key) {
        this.footMenuActive = key
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .footer-menu
    .footer-menu-content
      padding-top 36px
      padding-right 352px
      padding-bottom 20px
    .el-menu
      background-color #F5F7FA
      .el-menu-item
        font-size 16px
        font-weight 700
        font-family PingFangSC-Medium
        margin-right 72px
        &:focus, &:hover
          background-color #F5F7FA
</style>
