<template>
  <div class="account-wrapper">
    <div class="shadow" @click="hideAccountWindow"></div>
    <div class="content">
      <span class="login" @click="changeTab('LOGIN')">登录</span>
      <span class="register" @click="changeTab('REGISTER')">注册</span>
      <span class="clsoe" @click="hideAccountWindow">关闭</span>
      <div class="login-content" v-show="currentType==='LOGIN'">
        <input type="number" placeholder="请输入登录手机号码" v-model="loginPhone">
        <div class="password-wrapper">
          <input type="password" placeholder="请输入登录密码" ref="loginPassword" v-model="loginPassword">
          <span class="show-password" @click="toggleLoginPassword">显示</span>
        </div>
        <div class="hint">{{loginHint}}</div>
        <div>
          <input type="checkbox" v-model="autoLogin">
          <span>7天自动登录</span>
        </div>
        <button>登录</button>
      </div>
      <div class="register-content" v-show="currentType==='REGISTER'">
        <input type="number" placeholder="请输入注册手机号码" v-model="registerPhone">
        <div class="identify-wrapper">
          <input type="text" maxlength="4" v-model="registerCode">
          <span @click="refreshCode">刷新</span>
          <identify class="identify" :identifyCode="identifyCode"></identify>
        </div>
        <div>
          <input type="checkbox" v-model="agreeProtocol">
          <span>同意</span>
          <span @click="openProtocol">《超视慕课平台注册协议》</span>
        </div>
        <div>{{registerHint}}</div>
        <span @click="register1">注册</span>
      </div>
      <div class="register-content1" v-show="currentType==='REGISTER1'">
        注册第二步
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import identify from '../identify/identify' // 生成验证码的组件

  import {randomString} from '../../common/js/randomString' // 随机生成4位验证码

  export default {
    name: 'account',
    data () {
      return {
        showLoginPassword: false, // 登录时是否显示密码
        showRegisterPassword: false, // 注册时是否显示密码
        loginPhone: '', // 登录手机号
        loginPassword: '', // 登录时密码
        autoLogin: '', // 是否7天自动登录
        registerPhone: '', // 注册时电话
        registerCode: '', // 注册时本地验证码
        registerTextCode: '', // 注册时短信验证码
        registerPassword: '', // 注册时密码
        loginHint: '', // 登录时提示信息
        registerHint: '', // 注册第一步时提示信息
        register1Hint: '', // 注册第二步时提示信息
        currentType: '', // 当前是登录还是注册
        identifyCode: '', // 本地生成的验证码
        agreeProtocol: '' // 同意注册协议
      }
    },
    methods: {
      // 通知父组件隐藏登录/注册弹窗
      hideAccountWindow () {
        this.$emit('hideAccountWindow')
      },
      // 登录时显示/隐藏密码
      toggleLoginPassword () {
        this.showLoginPassword = !this.showLoginPassword
        if (this.showLoginPassword) {
          this.$refs.loginPassword.setAttribute('type', 'text')
        } else {
          this.$refs.loginPassword.setAttribute('type', 'password')
        }
      },
      // 切换登录/注册
      changeTab (type) {
        if (this.currentType !== type) {
          this.currentType = type
          // 初始化信息
          this.showLoginPassword = false
          this.showRegisterPassword = false
          this.loginPhone = ''
          this.loginPassword = ''
          this.autoLogin = false
          this.registerPhone = ''
          this.registerCode = ''
          this.registerTextCode = ''
          this.registerPassword = ''
          this.loginHint = ''
          this.registerHint = ''
          this.register1Hint = ''
          this.agreeProtocol = false
          // 如果是注册则生成验证码
          if (this.currentType === 'REGISTER') {
            this.refreshCode()
          }
        }
      },
      // 刷新验证码
      refreshCode () {
        this.identifyCode = randomString(4)
      },
      // 再新窗口打开协议
      openProtocol () {
        let routeData = this.$router.resolve({
          name: 'protocol'
        })
        window.open(routeData.href, '_blank')
      },
      // 注册第一步获取短信验证码
      register1 () {
        // 本地校验手机号位数与验证码是否正确
        console.log(this.registerCode + ' aa ' + this.identifyCode)
        // if (this.registerPhone.length !== 11) {
        //   this.registerHint = '手机号码格式错误！'
        //   return 0
        // }
        if (this.registerCode !== this.identifyCode) {
          this.registerHint = '验证码输入错误'
          return 0
        }
        // 向后台发送请求 获取手机验证码
        this.changeTab('REGISTER1')
      }
    },
    components: {
      identify
    }
  }
</script>

<style lang="stylus" scoped>
  .account-wrapper
    .shadow
      z-index 1
      background rgba(0, 0, 0, 0.1)
      width 100%
      height 100%
      position fixed

    .content
      z-index 2
      position absolute
      left 0
      right 0
      bottom 0
      top 0
      margin auto
      width 400px
      height 300px

      .register-content
        .identify-wrapper
          .identify
            display inline-block
</style>
