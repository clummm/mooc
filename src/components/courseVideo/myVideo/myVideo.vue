<template>
  <div class="video">
    <video class="video-player" ref="v">
      <source :src="videoSrc"/>
    </video>
    <div class="controller">
      <div class="controller-btn-wrapper">
        <div class="controller-btn" @click="togglePlaying">
          <button class="btn" v-show="isPaused">播放</button>
          <button class="btn" v-show="!isPaused">暂停</button>
        </div>
        <div class="controller-btn" @click="stopPlaying">
          <button class="btn" @click="stopPlaying">stop</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'myVideo',
    props: [
      'videoSrc'
    ],
    data () {
      return {
        video: null,
        isPaused: true
      }
    },
    methods: {
      togglePlaying () {
        if (this.video.paused) {
          this.playVideo()
        } else {
          this.pauseVideo()
        }
      },
      handleEnd () {
        this.pauseVideo()
      },
      playVideo () {
        this.isPaused = false
        this.video.play()
      },
      pauseVideo () {
        this.isPaused = true
        this.video.pause()
      },
      stopPlaying () {
        this.video.currentTime = 0
        this.pauseVideo()
      }
    },
    mounted () {
      this.video = this.$refs.v
    }
  }
</script>

<style lang="stylus" scoped>
  .video
    position: relative;

    .video-player
      width: 100%;
      height: 100%;
      display: flex;

    .controller
      flex-direction: column;
      height: 50px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);

      .controller-btn-wrapper
        position: relative;
        height: calc(100% - 5px);
        display: flex;
        align-items: center;
        color: #fff;
        padding: 0 18px;

        .controller-btn
          margin: 0 20px;
          transition: .5s;
          .btn:hover
            cursor: pointer;
            background: #409eff
</style>
