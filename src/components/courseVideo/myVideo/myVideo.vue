<template>
  <div class="video" ref="vcontainer"
       @pointerup.prevent="stopDragging"
       @pointermove.prevent="handleMouseMove" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <video class="video-player" ref="v" @timeupdate="handleTimeUpdate" @ended="handleEnd">
      <source :src="`${videoSrc}#t=${playTime}`"/>
    </video>
    <div class="controller" v-show="isControlVisible">
      <div class="controller-progress-wrapper">
        <div class="controller-progress" ref="p" @click="handleProgressClick">
          <div class="controller-progress controller-progress-passed"
               :style="{width: videoProgressPercent}"></div>
          <div class="controller-dot"
               :style="{left: videoProgressPercent}"
               @pointerdown="startDragging">
            <div class="controller-inner-dot"></div>
          </div>
        </div>
      </div>
      <div class="controller-btn-wrapper">
        <div class="controller-btn" @click="togglePlaying">
          <button class="btn" v-show="isPaused">播放</button>
          <button class="btn" v-show="!isPaused">暂停</button>
        </div>
        <div class="controller-btn" @click="stopPlaying">
          <button class="btn" @click="stopPlaying">stop</button>
        </div>
        <div class="controller-btn" @click="toggleMute">
          <button class="btn" v-show="isMuted">已禁音</button>
          <button class="btn" v-show="!isMuted">禁音</button>
        </div>
        <div class="controller-timer">
          {{videoTime}}
        </div>
        <div class="controller-btn fullscreen" @click="toggleFullscreen">
          <button class="btn">fullscreen</button>
        </div>
      </div>
    </div>
    {{playTime}}
  </div>
</template>

<script type="text/ecmascript-6">
  import { secToTimer } from '../../../common/js/Time'

  export default {
    name: 'myVideo',
    props: [
      'videoSrc',
      'playTime'
    ],
    data () {
      return {
        video: null,
        isPaused: true,
        isMuted: false,
        videoTime: '00:00 / 00:00',
        fullscreen: false,
        videoProgress: 0,
        progress: null,
        dotOffsetX: 0,
        draggingStartX: 0,
        isDragging: false,
        isControlVisible: true
      }
    },
    computed: {
      videoProgressPercent () {
        return `${this.videoProgress * 100}%`
      }
    },
    methods: {
      toggleFullscreen () {
        let element = this.$refs.vcontainer
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen()
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen()
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen()
          }
        }
        this.fullscreen = !this.fullscreen
      },
      handleTimeUpdate () {
        this.videoTime = this.refreshTime()
        this.videoProgress = this.video.currentTime / this.video.duration
      },
      refreshTime () {
        if (!this.video) {
          return `${secToTimer(0)} / ${secToTimer(0)}`
        }
        const currTime = this.video.currentTime || 0
        const duration = this.video.duration || 0
        return `${secToTimer(currTime)} / ${secToTimer(duration)}`
      },
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
      },
      toggleMute () {
        this.video.muted = !this.video.muted
        this.isMuted = this.video.muted
      },
      handleProgressClick (event) {
        const clickX = event.clientX
        this.setProgress(clickX)
      },
      setProgress (x) {
        const progressRect = this.progress.getBoundingClientRect()
        let progressPercent = (x - progressRect.left) / progressRect.width
        if (progressPercent < 0) {
          progressPercent = 0
        } else if (progressPercent > 1) {
          progressPercent = 1
        }
        this.video.currentTime = this.video.duration * progressPercent
      },
      startDragging (event) {
        this.pauseVideo()
        this.isDragging = true
        this.draggingStartX = event.clientX
      },
      moveDragging (event) {
        if (this.isDragging) {
          const offsetX = event.clientX - this.draggingStartX
          this.dotOffsetX = offsetX < 0 ? 0 : offsetX
          this.setProgress(event.clientX)
        }
      },
      stopDragging () {
        this.isDragging = false
        this.dotOffsetX = 0
      },
      handleMouseEnter () {
        this.showControlBar()
      },
      handleMouseMove (event) {
        this.showControlBar()
        this.showCursor()
        if (this.hidingEvent !== null) {
          clearInterval(this.hidingEvent)
        }
        this.hidingEvent = setInterval(this.hideControlBar, 3000)
        this.moveDragging(event)
      },
      handleMouseLeave () {
        this.hideControlBar()
        this.stopDragging()
      },
      showControlBar () {
        this.isControlVisible = true
      },
      hideControlBar () {
        if (this.fullscreen) {
          this.hideCursor()
        }
        this.isControlVisible = false
      },
      hideCursor () {
        document.body.style.cursor = 'none'
      },
      showCursor () {
        document.body.style.cursor = 'default'
      }
    },
    watch: {
      '$route' (to, from) {
      },
      playTime: function (newVal, oldVal) {
        console.log(`in myVideo, playTime changed from ${oldVal} to ${newVal}`)
        if (this.video) {
          this.video.currentTime = newVal || 0
        }
      },
      videoSrc: function (newVal, oldVal) {
        if (this.video) {
          this.video.src = `${newVal}#t=${this.playTime}` || '#'
        }
      }
    },
    mounted () {
      let self = this
      self.video = self.$refs.v
      self.progress = self.$refs.p
      // 当加载的时候获取video对象的duration时长为NaN
      // 当浏览器能够开始播放指定的音频/视频时，更新播放器时长显示
      self.video.oncanplay = function () {
        self.handleTimeUpdate()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .video
    position: relative;
    width 100%
    height 100%

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

      .controller-progress-wrapper
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .controller-progress
          height: 5px;
          position: relative;
          width: calc(100% - 30px);
          border-radius: 100px;
          background: #dcdcdc;
          cursor: pointer;

        .controller-progress-passed
          position: absolute;
          top: 0;
          left: 0;
          background: #409EFF;

        .controller-dot
          position: absolute;
          z-index: 50;
          left: 0;
          top: -5px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;

          .controller__inner-dot
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #409EFF;

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

        .fullscreen
          position absolute
          right 15px
</style>
