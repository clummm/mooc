<template>
  <div>
    <div></div>
    <div>
      <span>测试名称</span>
      <span>测试描述</span>
      <span>题目数量</span>
      <span>添加测试</span>
    </div>
    <div>
      <div v-for="(item,index) in course.tests" :key="index">
        <span>{{item.name}}</span>
        <span>{{item.description}}</span>
        <span>{{item.count}}</span>
        <span @click="deleteTest(index)">删除</span>
        <span>编辑</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'uploadTest',
    props: {
      course: null
    },
    methods: {
      deleteTest (index) {
        this.course.tests.splice(index, 1)
        this.$emit('saveInfo', this.course)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
