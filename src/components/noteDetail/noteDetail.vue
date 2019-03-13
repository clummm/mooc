<template>
  <div class="main-wrapper">
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
      <p>{{note.content}}</p>
    </div>
    <div>
      <span>收藏人数{{note.likeCount}}</span>
      <span v-if="isMyNote">编辑笔记</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { LIKE_NOTE } from '../../common/js/data'

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
        type: null
      }
    },
    computed: {
      isMyNote () {
        return this.type === 'myNote'
      }
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
