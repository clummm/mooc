<template>
  <div>
    <div class="setting-wrapper">
      <div class="left">
        <img :src="userInfo.icon" width="100" height="100" class="user-avatar">
        <div>{{currentName}}</div>
      </div>
      <div class="right">
        <div class="menu">
          <span>个人信息</span>
          <span class="edit" @click="showEditor">编辑</span>
        </div>
        <div class="content" v-if="!isEditorShow">
          <div>昵称：{{currentName}}</div>
          <div v-if="currentSex">性别：{{currentSex}}</div>
          <div v-else>未设置</div>
          <div v-if="currentJob">职位：{{currentJob}}</div>
          <div v-else>未设置</div>
          <div v-if="currentAddress">城市：{{currentAddress[0]}}{{currentAddress[1]}}</div>
          <div v-else>未设置</div>
        </div>
        <div class="content" v-else>
          <div>
            <span>昵称：</span>
            <input type="text" v-model="currentName" placeholder="请输入昵称">
          </div>
          <div>
            <span>性别：</span>
            <input type="radio" name="sexChoose" value=null v-model="currentSex">保密
            <input type="radio" name="sexChoose" value="男" v-model="currentSex">男
            <input type="radio" name="sexChoose" value="女" v-model="currentSex">女
          </div>
          <div>
            <span>职位：</span>
            <input type="text" v-model="currentJob">
          </div>
          <div>
            <span>省份：</span>
            <input type="text" v-model="currentAddress[0]">
            <span>城市：</span>
            <input type="text" v-model="currentAddress[1]">
          </div>
          <div>
            <span @click="save">保存</span>
            <span @click="cancel">取消</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'settings',
    data () {
      return {
        isEditorShow: false,
        currentName: null,
        currentJob: null,
        currentAddress: null,
        currentSex: null,
        tempName: null,
        tempJob: null,
        tempAddress: null,
        tempSex: null
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        this.currentName = this.userInfo.name
        this.currentJob = this.userInfo.job
        this.currentAddress = this.userInfo.address
        this.currentSex = this.userInfo.sex
      },
      ...mapActions('account', {
        updateInfo: 'updateInfo'
      }),
      showEditor () {
        this.isEditorShow = true
        this.tempAddress = this.currentAddress
        this.tempJob = this.currentJob
        this.tempName = this.currentName
        this.tempSex = this.currentSex
      },
      cancel () {
        this.isEditorShow = false
      },
      save () {
        this.currentAddress = this.tempAddress
        this.currentJob = this.tempJob
        this.currentName = this.tempName
        this.currentSex = this.tempSex
        let info = {
          name: this.currentName,
          job: this.currentJob,
          sex: this.currentSex,
          address: this.currentAddress
        }
        this.updateInfo(info)
        this.isEditorShow = false
        //  刷新页面location.reload()
      }

    },
    computed: {
      ...mapGetters('account', {
        userInfo: 'getUserInfo'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .setting-wrapper
    width 1024px
    height 500px
    margin auto
    position relative

    .left
      width 200px
      background grey
      display inline-block

      .user-avatar
        border-radius 50%

    .right
      display inline-block
      position absolute
      right 50px
      width 750px
      background gainsboro

      .menu
        position relative

        .edit
          position absolute
          right 10px

      .content
        padding 10px 100px
</style>
