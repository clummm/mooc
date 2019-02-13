<!-- 用户页 -->
<template>
  <div>
    <!-- 测试组件跳转显示 -->
    <div>user id: {{ $route.params.uid }}</div>
    <router-link :to="{name: 'courseList'}">我的课程</router-link>
    <router-link :to="{name: 'myNotes'}">我的笔记</router-link>
    <router-link :to="{name: 'message'}">我的消息</router-link>
    <router-link :to="{name: 'myHistory'}">历史足迹</router-link>
    <router-link :to="{name: 'upload'}">上传管理</router-link>
    <router-view/>
    <!-- 测试组件跳转显示 -->
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
