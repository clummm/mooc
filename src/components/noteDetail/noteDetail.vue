<template>
  <div class="main-wrapper">
    <v-noteEditor v-if="isEditorShow" :note="editNote" @changeNote="changeNote"
                  @hideEditor="isEditorShow=false"></v-noteEditor>
    <div>
      <div v-if="isMyNote">我的笔记</div>
      <div v-else>{{note.creator.name}}的笔记</div>
      <div>笔记创建于{{note.createTime}}</div>
      <router-link :to="{name:'course',params:{cid:note.createPosition.cid}}">{{note.createPosition.courseName}}
      </router-link>
      <span>{{note.createPosition.sessionName}}</span>
      <router-link
        :to="{name: 'courseVideo',params: {cid: note.createPosition.cid,sid:note.createPosition.sid,time:note.createPosition.time}}">
        点击跳转到指定节点
      </router-link>
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
  import { LIKE_NOTE } from '../../common/js/data'
  import noteEditor from '../noteEditor/noteEditor'

  export default {
    name: 'noteDetail',
    created () {
      this.type = this.$route.params.type
      // 从后台请求note
      this.note = LIKE_NOTE[0]
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
        return this.type === 'myNote'
      }
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
