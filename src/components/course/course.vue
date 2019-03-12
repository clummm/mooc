<!-- 课程页 -->
<template>
  <div>
    course id: {{ cid }}
    <button @click="playVideo">播放</button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'course',
    data () {
      return {
        cid: ''
      }
    },
    methods: {
      playVideo () {
        // 未登录时无法播放课程，弹出登录窗口提示登录
        if (!this.userInfo) {
          this.setAccountWindowShow({
            show: true,
            type: 'LOGIN'
          })
        } else {
          this.$router.push({
            name: 'courseVideo',
            params: {
              cid: this.cid,
              sid: 1,
              time: 100
            }
          })
        }
      },
      ...mapActions('account', {
        setAccountWindowShow: 'setAccountWindowShow'
      })
    },
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    },
    created () {
      this.cid = this.$route.params.cid
      // 如果用户已登录则根据用户id获取用户在该课程的学习记录
      if (this.userInfo) {
        console.log('login')
      }
    }
  }
</script>

<style scoped>

</style>
