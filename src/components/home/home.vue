<!-- 主页 -->
<template>
  <div>
    <div>Home</div>
    <!-- 测试组件跳转显示 -->
    <router-link to="/category">一级分类页</router-link>
    <router-link :to="{name: 'user', params:{uid: 1}}">用户id1</router-link>
    <a @click="randomCourse">随机课程id</a>
    <!-- 测试组件跳转显示 -->
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {}
    },
    methods: {
      randomCourse () {
        this.$router.push({path: '/course/' + Math.floor((Math.random() * 100) + 1)})
      }
    }
  }

</script>

<style scoped>

</style>
