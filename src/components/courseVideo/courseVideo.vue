<template>
  <div class="video">
    <div class="main-content">
      <div class="player">
        <my-video :video-src="videoSrc"></my-video>
      </div>
      <div class="menu" @click="toggleMenu" :style="{width:menuWidth}">我是菜单</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import myVideo from './myVideo/myVideo'

  export default {
    name: 'courseVideo',
    components: { myVideo },
    created () {
      this.position = this.$route.params.position
    },
    data () {
      return {
        position: null,
        videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        menuWidth: '100px'
      }
    },
    methods: {
      toggleMenu () {
        if (this.menuWidth === '100px') {
          this.menuWidth = '400px'
        } else {
          this.menuWidth = '100px'
        }
      }
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
