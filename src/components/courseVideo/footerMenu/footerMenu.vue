<template>
  <div class="footer-menu">
    <el-menu default-active="forum" mode="horizontal" @select="handleFootMenuSelect">
      <el-menu-item index="forum">课程讨论</el-menu-item>
      <el-menu-item index="notes">课程笔记</el-menu-item>
    </el-menu>
    <div class="footer-menu-content">
      <forum v-show="footMenuActive === 'forum'">
        <template v-slot:sortingType="sortingSlotProps">
              <span @click="sortingSlotProps.sortingWithoutQuery(0)"
                    :class="sortingSlotProps.getSortingTypeClass(0)">最新</span>
          <span @click="sortingSlotProps.sortingWithoutQuery(1)"
                :class="sortingSlotProps.getSortingTypeClass(1)">最热</span>
        </template>
        <template v-slot:pagination="listSlotProps">
          <el-pagination
            layout="prev, pager, next"
            :total="listSlotProps.totalNum"
            :current-page="listSlotProps.currentPage"
            @current-change="listSlotProps.handleCurrentChangeWithoutQuery">
          </el-pagination>
        </template>
      </forum>
      <notes v-show="footMenuActive === 'notes'">
        <template v-slot:sortingType="sortingSlotProps">
              <span @click="sortingSlotProps.sortingWithoutQuery(0)"
                    :class="sortingSlotProps.getSortingTypeClass(0)">最新</span>
          <span @click="sortingSlotProps.sortingWithoutQuery(1)"
                :class="sortingSlotProps.getSortingTypeClass(1)">最热</span>
        </template>
        <template v-slot:showMine="mineSlotProps">
          <el-switch
            v-model="mineSlotProps.mine"
            active-color="#13ce66"
            @change="mineSlotProps.showMineWithoutQuery">
          </el-switch>
        </template>
        <template v-slot:pagination="listSlotProps">
          <el-pagination
            layout="prev, pager, next"
            :total="listSlotProps.totalNum"
            :current-page="listSlotProps.currentPage"
            @current-change="listSlotProps.handleCurrentChangeWithoutQuery">
          </el-pagination>
        </template>
      </notes>
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
</style>
