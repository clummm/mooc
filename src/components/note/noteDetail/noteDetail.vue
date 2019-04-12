<template>
  <div class="main-wrapper">
    <v-noteEditor v-if="isEditorShow" :note="editNote" @changeNote="changeNote"
                  @hideEditor="isEditorShow=false"></v-noteEditor>
    <div>
      <div v-if="isMyNote">我的笔记</div>
      <div v-else>{{note.creator.name}}的笔记</div>
      <div>笔记创建于{{note.createTime}}</div>
      <span @click="rHelp.openCourseNewWindow(note.createPosition.cid)">{{note.createPosition.courseName}}
      </span>
      <span>{{note.createPosition.sessionName}}</span>
      <span @click="rHelp.openVideoNewWindow(note.createPosition)">点击跳转到指定节点</span>
    </div>
    <div class="content">
      <div>{{note.title}}</div>
      <p>{{note.content}}</p>
    </div>
    <div>
      <span>收藏人数{{note.likeCount}}</span>
      <span v-if="isMyNote" @click="openEditor(note)">编辑笔记</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { LIKE_NOTE, MY_NOTE } from '../../../../public/js/data'
  import { mapGetters } from 'vuex'
  import noteEditor from '../noteEditor/noteEditor'

  export default {
    name: 'noteDetail',
    created () {
      // 从后台请求note
      let nid = this.$route.params.nid
      if (nid >= 100 && nid <= 102) {
        this.note = MY_NOTE[0]
      } else {
        this.note = LIKE_NOTE[0]
      }
    },
    data () {
      return {
        note: null,
        type: null,
        editNote: null,
        isEditorShow: false
      }
    },
    methods: {
      openEditor (note) {
        this.isEditorShow = true
        this.editNote = note
      },
      // 完成修改通知后台，后台成功收到数据后改变笔记内容，否则给出失败提示
      changeNote (note) {
        this.isEditorShow = false
        this.note.title = note.title
        this.note.content = note.content
      }
    },
    computed: {
      isMyNote () {
        // 未登录直接判断为不是我的笔记
        if (!this.userInfo) return false
        // 已登录则通过对比笔记创建者id和当前用户id来得到结果
        return this.note.creator.id === this.userInfo.id
      },
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    },
    components: {
      'v-noteEditor': noteEditor
    }
  }
</script>

<style lang="stylus" scoped>
  .main-wrapper
    width 1024px
    margin 0 auto

    .content
      word-break break-all
</style>
