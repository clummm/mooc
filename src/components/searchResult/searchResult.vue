<template>
  <div>搜索{{this.searchContent}}</div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'searchResult',
    data () {
      return {
        searchContent: ''
      }
    },
    created () {
      this.searchContent = this.$route.query.searchContent
      console.log(this.$route.query)
    }
  }
</script>

<style scoped>

</style>
