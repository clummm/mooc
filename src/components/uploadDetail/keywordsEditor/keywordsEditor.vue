<template>
  <div class="keywordsEditor-wrapper">
    <div>关键词</div>
    <div class="words-wrapper">
      <div class="item-wrapper" v-for="(item,index) in words" :key="index">
        <p class="item-words">{{item.keyword}}</p>
        <span class="item-cancel" @click="deleteKeywords(index)">取消</span>
      </div>
    </div>
    <div>
      <input type="text" v-model="newKeywords.keyword" placeholder="请添加新的关键词">
      <span @click="addKeywords">添加</span>
    </div>
    <div>
      <span @click="saveKeywords">保存</span>
      <span @click="cancelKeywords">取消</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'keywordsEditor',
    props: {
      words: null
    },
    data () {
      return {
        newKeywords: {
          keyword: null,
          meaning: null,
          isMeaningShow: false
        },
        tempWords: null
      }
    },
    methods: {
      addKeywords () {
        this.newKeywords.meaning = this.newKeywords.keyword + '的解释'
        this.words.push(this.newKeywords)
        this.newKeywords = {
          keyword: null,
          meaning: null,
          isMeaningShow: false
        }
      },
      deleteKeywords (index) {
        this.words.splice(index, 1)
      },
      saveKeywords () {
        this.$emit('saveKeywords')
      },
      cancelKeywords () {
        this.$emit('cancelKeywords')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .keywordsEditor-wrapper
    width 800px
    height 300px

    .words-wrapper
      .item-wrapper
        position relative
        display inline-block
        width 80px
        height 50px
        margin 5px 5px
        background grey
        text-align center

        .item-words
          line-height 50px

        .item-cancel
          position absolute
          top 2px
          right 2px
</style>
