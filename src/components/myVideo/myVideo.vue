<template>
  <div class="video" ref="vcontainer"
       @pointerup.prevent="stopDragging"
       @pointermove.prevent="handleMouseMove" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <video class="video-player" ref="v" @timeupdate="handleTimeUpdate" @ended="handleEnd" @click="togglePlaying">
      <source :src="`${videoSrc}#t=${playTime}`"/>
      <track :src="webvtt" kind="subtitles" label="中文字幕" srclang="zh" default/>
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
          <div class="node-dot" v-for="(node,index) in nodes" @click.stop="jump2Node(index)" :key="index"
               :style="{left:nodePlace(node.time)}" @mouseenter="node.show=true" @mouseleave="node.show=false">
            <div v-if="previewSize&&preview[node.time]&&node.show" class="preview"
                 :style="{width:previewSize.width+'px',height:previewSize.height+'px',bottom:previewSize.height*0.5+5+'px'}">
              <img :src="preview[node.time]" :width="previewSize.width" :height="previewSize.height">
              <div class="preview-text"
                   :style="{fontSize:previewSize.fontSize+'px',lineHeight:previewSize.lineHeight+'px'}">{{node.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="controller-btn-wrapper">
        <div class="controller-btn" @click="togglePlaying" style="margin-right: 1%">
          <img class="btn" v-show="isPaused" src="./play.png">
          <img class="btn" v-show="!isPaused" src="./pause.png">
        </div>
        <div class="controller-btn" @click="stopPlaying" style="margin-right: 2%">
          <img class="stop" @click="stopPlaying" src="./stop.png" width="20" height="20">
        </div>
        <div class="controller-timer">
          {{videoTime}}
        </div>
        <div class="controller-btn voice" @click="toggleMute">
          <img class="btn" v-show="isMuted" src="./silence.png">
          <img class="btn" v-show="!isMuted" src="./voice.png">
        </div>
        <div class="controller-btn fullscreen" @click="toggleFullscreen">
          <img class="btn" src="./fullscreen.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { secToTimer } from '../../../public/js/Time'

  export default {
    name: 'myVideo',
    props: {
      videoSrc: {
        default: null
      },
      playTime: {
        default: 0
      },
      duration: {
        default: 60
      },
      nodes: {
        type: Array,
        default: null
      },
      preview: {
        default: () => {
          return []
        }
      },
      webvtt: {
        type: String,
        default: ''
      },
      size: {
        default: 'mini'
      }
    },
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
        isControlVisible: true,
        pictureSrc: null,
        videoSize: null
      }
    },
    computed: {
      videoProgressPercent () {
        return `${this.videoProgress * 100}%`
      },
      // 略缩图大小
      previewSize () {
        if (this.videoSize) {
          if (this.fullscreen) {
            return {
              width: document.body.offsetWidth * 0.15,
              height: document.body.offsetHeight * 0.15,
              fontSize: document.body.offsetWidth * 0.015,
              lineHeight: document.body.offsetWidth * 0.02
            }
          } else {
            return {
              width: this.videoSize.width * 0.2,
              height: this.videoSize.height * 0.2,
              fontSize: this.videoSize.width * 0.02,
              lineHeight: this.videoSize.width * 0.03
            }
          }
        } else {
          return null
        }
      }
    },
    watch: {
      // 切换视频源时需要重新加载一下播放器来更新视频源
      videoSrc: function (newVal, oldVal) {
        if (this.video) {
          console.log(`videoSrc changed to ${newVal}`)
          this.video.load()
          this.video.src = `${newVal}#t=${this.playTime}` || '#'
        }
      },
      // 跳转到其他视频播放点
      playTime: function (newVal, oldVal) {
        if (this.video) {
          console.log(`playTime changed to ${newVal}`)
          this.video.currentTime = newVal || 0
        }
      }

    },
    methods: {
      // 计算节点位置
      nodePlace (time) {
        return `${(time / this.duration) * 100}%`
      },
      jump2Node (index) {
        this.videoProgress = this.nodes[index].time / this.video.duration
        this.video.currentTime = this.video.duration * this.videoProgress
      },
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
        console.log('fenge')
        console.log(this.video.offsetWidth)
        console.log(this.previewSize)
        console.log(this.fullscreen)
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
        console.log('click2')
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
    mounted () {
      let self = this
      self.video = self.$refs.v
      self.progress = self.$refs.p
      // 当加载的时候获取video对象的duration时长为NaN
      // 当浏览器能够开始播放指定的音频/视频时，更新播放器时长显示
      self.video.oncanplay = function () {
        self.handleTimeUpdate()
      }
      self.video.ontimeupdate = function () {
        self.$emit('time-update', self.video.currentTime)
      }
      this.videoSize = {
        width: this.video.offsetWidth,
        height: this.video.offsetHeight
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
          height: 3px;
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

        .node-dot
          position: absolute;
          z-index: 49;
          left: 0;
          top: -2.5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;

          .preview
            position relative

            .preview-text
              position absolute
              bottom 0
              width 100%
              background rgba(0, 0, 0, 0.5)
              color white
              text-align center
              font-family: PingFangSC-Regular;
              font-weight: 400

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
        margin-top 5px
        color: #fff;
        padding: 0 18px;

        .controller-btn
          cursor: pointer;

          .btn
            width 28px
            height 28px

        .voice
          position absolute
          right calc(3% + 28px)

        .fullscreen
          position absolute
          right 2%
  ::cue
    font-size 16px

</style>
