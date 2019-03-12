<template>
  <div class="video">
    <div class="main-content">
      <div class="player">
        <my-video :video-src="videoSrc"></my-video>
      </div>
      <div class="menu" @click="toggleMenu" :style="{width:menuWidth}">我是菜单</div>
    </div>
    <div>播放{{this.time}}</div>
  </div>
</template>

<script type="text/ecmascript-6">

  import myVideo from './myVideo/myVideo'

  export default {
    name: 'courseVideo',
    components: { myVideo },
    created () {
      let storage = window.sessionStorage
      let cid = this.$route.params.cid
      let sid = this.$route.params.sid
      this.time = this.$route.params.time
      // 从路径中取得cid去后台获取播放列表
      // 通过sid找到播放列表中需要播放的视频
      // 如果sessionStorage中有时间记录则使用该记录，该时间记录在播放过程中与播放进度同步，在刷新当前页面时可以继续播放；
      // 如果sessionStorage中没有则记录下来
      if (storage[cid + '/' + sid]) {
        this.time = storage[cid + '/' + sid]
      } else {
        storage[cid + '/' + sid] = this.time
      }
    },
    data () {
      return {
        videoList: null, // 播放列表
        videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        menuWidth: '100px',
        time: null
      }
    },
    methods: {
      toggleMenu () {
        if (this.menuWidth === '100px') {
          this.menuWidth = '400px'
        } else {
          this.menuWidth = '100px'
        }
      },
      // 关闭视频前上传离开时的节点
      beforeCloseHandler (e) {
        // ...
      }
    },
    destroyed () {
      window.removeEventListener('beforeunload', e => this.beforeCloseHandler(e))
    }
  }
</script>

<style lang="stylus" scoped>
  .main-content
    width 100%
    height 400px
    display flex

    .player
      flex 1

    .menu
      background grey
      transition .5s
</style>
