<template>
  <div>
    <img v-for="(item,index) in stars" :key="index" :src="chooseStatus(item)" :width="width" :height="height"
         style="margin-right: 4px">
    <span class="text">{{score}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import blank from './blank.png'
  import full from './full.png'
  import half from './half.png'

  export default {
    name: 'rate',
    props: {
      score: {
        default: 5
      },
      width: {
        default: 10
      },
      height: {
        default: 10
      }
    },
    data () {
      return {
        stars: []
      }
    },
    created () {
      let score = this.score
      for (let i = 0; i < 5; ++i) {
        if (score >= 1) {
          this.stars.push('full')
        } else if (score >= 0.5 && score < 1) {
          this.stars.push('half')
        } else {
          this.stars.push('blank')
        }
        score--
      }
    },
    methods: {
      chooseStatus (status) {
        if (status === 'full') {
          return full
        } else if (status === 'half') {
          return half
        } else {
          return blank
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .text
    font-size: 10px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 10px;
</style>
