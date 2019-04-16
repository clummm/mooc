<!-- 课程笔记 -->
<template>
  <div class="notes-wrapper">
    <div class="notes-header clearfix">
      <span @click="sorting(0)" :class="getSortingTypeClass(0)">
        最新
        <img :src="Number(this.sortingType) === 0 ? require('../new_full.jpg') : require('../new.png')"/>
      </span>
      <span @click="sorting(1)" :class="getSortingTypeClass(1)">
        最热
        <img :src="Number(this.sortingType) === 1 ? require('../hot_full.jpg') : require('../hot.png')"/>
      </span>
      <div class="mine">
        <el-switch
          v-model="mine"
          active-color="#13ce66"
          @change="showMine">
        </el-switch>
        <span>只看自己</span>
      </div>
    </div>
    <mooc-list :list="notes" :total-num="notesNum" :current-page="currentPage"
               @current-change="handleCurrentChange"
               @to-detail="noteDetail"></mooc-list>
  </div>
</template>

<script>
  import { Notes, secondNotes } from '../../../../public/js/notes'
  import { mapGetters, mapActions } from 'vuex'
  import moocList from '../../list/moocList'

  export default {
    name: 'notes',
    props: {
      // url是否保留页码、排序方式等查询参数
      withQuery: {
        type: Boolean,
        default: true
      }
    },
    components: { moocList },
    data () {
      return {
        // 当前页
        currentPage: 1,
        // 当前条件下的总笔记数
        notesNum: 0,
        pageSize: 5,
        // 笔记列表
        notes: [],
        // 排序规则：0->最新, 1->最热
        sortingType: 0,
        // 是否只看自己的笔记
        mine: false
      }
    },
    methods: {
      ...mapActions('account', {
        setAccountWindowShow: 'setAccountWindowShow'
      }),
      // 进行当前页变化
      handleCurrentChange (page) {
        this.handleRoute(page, this.sortingType)
      },
      // 笔记页的路由逻辑处理
      handleRoute (page, sortingType) {
        page = String(page)
        sortingType = String(sortingType)
        if (this.withQuery) {
          if (this.mine) {
            this.$router.push({
              name: 'notes',
              params: this.$route.params,
              query: { p: page, type: sortingType, filter: 'mine' }
            })
          } else {
            this.$router.push({
              name: 'notes',
              params: this.$route.params,
              query: { p: page, type: sortingType }
            })
          }
        } else {
          this.currentPage = page
          this.sortingType = sortingType
          this.fetchNotes()
        }
      },
      // 展示自己的笔记
      showMine () {
        if (!this.userInfo) {
          this.mine = false
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          this.handleRoute('1', this.sortingType)
        }
      },
      // url获取查询参数
      getNotes () {
        this.currentPage = Number(this.$route.query.p) || 1
        this.sortingType = Number(this.$route.query.type) || 0
        this.mine = this.$route.query.filter === 'mine'
        this.fetchNotes()
      },
      // 后台获取笔记
      fetchNotes () {
        // 后台获取笔记
        let chapter = typeof (this.$route.params.chapter) === 'undefined' ? -1 : this.$route.params.chapter
        let sid = typeof (this.$route.params.sid) === 'undefined' ? -1 : this.$route.params.sid
        if (this.mine) {
          // 获取自己的笔记
          // ...post({cid: this.$route.params.cid, chapter: chapter, sid: sid,
          // currentPage: this.currentPage, pageSize: this.pageSize, sortingType
          // type: 'mine', uid, token})
        } else {
          // 获取所有笔记
          // ...post({cid: this.$route.params.cid, chapter: chapter, sid: sid,
          // currentPage: this.currentPage, pageSize: this.pageSize, sortingType})
        }
        console.log(`向后台申请笔记：章节(${chapter}), 课时(${sid}), 当前页(${this.currentPage}), 排序(${this.sortingType}), 是否只看自己(${this.mine})`)
        // 用于测试
        if (chapter === -1 || sid === -1) {
          this.notes = Notes.notes
          this.notesNum = Notes.notesNum
        } else {
          this.notes = secondNotes.notes
          this.notesNum = secondNotes.notesNum
        }
      },
      // 获取排序规则的样式
      getSortingTypeClass (sortingType) {
        return Number(this.sortingType) === sortingType ? 'sorting-type-on' : 'sorting-type'
      },
      // 更改讨论列表排序规则
      sorting (sortingType) {
        if (this.sortingType !== sortingType) {
          this.sortingType = sortingType
          this.handleRoute('1', sortingType)
        }
      },
      // 前往笔记详情页
      noteDetail (id) {
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          // 前往详情页
          this.$router.push({ name: 'noteDetail', params: { nid: id } })
        }
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.getNotes()
      }
    },
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    },
    created () {
      this.getNotes()
    }
  }
</script>

<style lang="stylus" scoped>
  .notes-wrapper
    font-family PingFangSC-Regular
    color rgba(51,51,51,1)
    line-height 22px
    .notes-header
      margin-bottom 30px
      &>span
        padding-right 36px
        img
          padding-left 10px
          vertical-align middle
      .sorting-type-on
        font-weight 600

      .sorting-type
        color #333333
        &:hover
          cursor pointer
          color #979797

      span
        padding-left 5px

      .mine
        float right
        display inline-block

    .notes
      .note-item
        padding 20px
        margin-bottom 8px

        &:hover
          background-color silver
          cursor pointer

        .note-item-wrapper
          position relative
          top 0
          left 0

          .creator-icon
            float left

            img
              width 48px
              height 48px
              border-radius 100%

          .content
            padding-right 120px
            .content-footer
              font-size 12px

              span
                padding-right 5px

          .aside
            position absolute
            top 0
            right 0
            width 120px

            .binding-session
              cursor pointer

              &:hover
                color #ffff

    .pagination
      text-align center
</style>
