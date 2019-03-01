<template>
  <div class="video">
    <div class="main-content">
      <div class="player">
        <my-video :video-src="videoSrc"></my-video>
      </div>
      <div class="menu">我是菜单</div>
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
        videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
