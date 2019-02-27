<template>
  <div class="account-wrapper">
    <div class="shadow" @click="hideAccountWindow"></div>
    <div class="content">
      <div class="tab-wrapper">
        <span class="login" :class="{'active':loginActive}" @click="changeTab('LOGIN')">登录</span>
        <span class="register " :class="{'active':registerActive}"
              @click="changeTab('REGISTER')">注册</span>
      </div>
      <div class="login-content" v-show="currentType==='LOGIN'">
        <input class="login-phone" type="text" placeholder="请输入登录手机号码" v-model="loginPhone" maxlength="11"
               oninput="value=value.replace(/[^\d]/g,'')">
        <div class="password-wrapper">
          <input class="login-password" type="password" placeholder="请输入登录密码" ref="loginPassword"
                 v-model="loginPassword">
          <img class="show-password" :src="eyeStatus" width="12" height="7.5" @click="toggleLoginPassword"/>
        </div>
        <div  class="hint">{{loginHint}}</div>
        <div class="other-way">
          <span class="phone">手机验证码登录</span>
          <span class="forget">忘记密码?</span>
        </div>
        <button class="login"  @click="login">登录超视慕课网</button>
        <p class="other-ways">QQ登录 · 微信登录 · 微博登录</p>
      </div>
      <div class="register-content" v-show="currentType==='REGISTER'">
        <input type="text" placeholder="请输入注册手机号码" v-model="registerPhone" maxlength="11"
               oninput="value=value.replace(/[^\d]/g,'')">
        <div class="identify-wrapper">
          <input type="text" maxlength="4" v-model="registerCode">
          <div @click="refreshCode" class="icon-wrapper">
            <identify class="identify" :identifyCode="identifyCode"></identify>
          </div>
        </div>
        <div class="hint">{{registerHint}}</div>
        <div class="protocol-wrapper">
          <el-checkbox type="checkbox" v-model="agreeProtocol" class="box"></el-checkbox>
          <div class="text">
            <span>同意</span><span @click="openProtocol" class="protocol">《超视慕课平台注册协议》</span>
          </div>
        </div>
        <button class="register" @click="register1">获取验证码</button>
      </div>
      <div class="register-content1" v-show="currentType==='REGISTER1'">
        <p class="text">填写短信验证码密码完成注册</p>
        <p class="text">短信验证码已发送至{{registerPhone}}</p>
        <div class="code-wrapper">
          <input type="text" placeholder="请输入短信验证码" maxlength="5" v-model="registerTextCode">
          <img class="again" src="./again.png" width="12" height="12">
        </div>
        <div class="password-wrapper">
          <input type="password" placeholder="6-16位密码，区分大小写" ref="registerPassword"
                 v-model="registerPassword">
          <img class="show-password" :src="eyeStatus" width="12" height="7.5" @click="toggleLoginPassword"/>
        </div>
        <p class="hint">{{register1Hint}}</p>
        <button class="done" @click="register">完成注册</button>
        <div class="back" @click="changeTab('REGISTER')">返回修改手机号码</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import identify from '../identify/identify' // 生成验证码的组件
  import { randomString } from '../../common/js/randomString' // 随机生成4位验证码
  import eyeclose from './eyeclose.png'
  import eyeopen from './eyeopen.png'
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
        currentType: 'LOGIN', // 当前是登录还是注册
        identifyCode: '', // 本地生成的验证码
        agreeProtocol: '' // 同意注册协议
      }
    },
    methods: {
      // 通知父组件隐藏登录/注册弹窗
      hideAccountWindow () {
        this.$emit('hideAccountWindow')
      },
      // 让父组件调用打开登录/注册弹窗
      openAccountWindow (type) {
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
      toggleRegisterPassword () {
        this.showRegisterPassword = !this.showRegisterPassword
        if (this.showRegisterPassword) {
          this.$refs.registerPassword.setAttribute('type', 'text')
        } else {
          this.$refs.registerPassword.setAttribute('type', 'password')
        }
      },
      // 切换登录/注册
      changeTab (type) {
        if (this.currentType !== type) {
          this.currentType = type
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
        this.registerHint = ''
        // 本地校验手机号位数与验证码是否正确
        // if (this.registerPhone.length !== 11) {
        //   this.registerHint = '手机号码格式错误！'
        //   return 0
        // }
        // // 检验验证码是否正确
        // if (this.registerCode.toLowerCase() !== this.identifyCode.toLowerCase()) {
        //   this.registerHint = '验证码输入错误'
        //   return 0
        // }
        // // 检验是否同意注册协议
        // if (!this.agreeProtocol) {
        //   this.registerHint = '请阅读并同意《超视慕课平台注册协议》'
        //   return 0
        // }
        // 向后台发送请求 获取手机验证码
        this.changeTab('REGISTER1')
      },
      // 提交注册
      register () {
        this.register1Hint = ''
        // 判断验证码是否正确
        // 检验密码格式
        if (this.registerPassword.length < 6 || this.registerPassword.length > 16) {
          this.register1Hint = '密码格式不正确'
          return 0
        }
        // 注册成功
        this.hideAccountWindow()
        this.$store.dispatch('account/setHasLogin', true)
        this.$store.dispatch('account/setUserInfo', { id: 123, name: '张三' })
        window.localStorage.token = 1
        window.alert('注册成功')
      },
      // 登录
      login () {
        this.loginHint = ''
        // // 校验手机格式
        // if (this.loginPhone.length !== 11) {
        //   this.loginHint = '手机号格式错误'
        //   return 0
        // }
        // // 检验密码不为空
        // if (this.loginPassword.length === 0) {
        //   this.loginHint = '密码不能为空'
        //   return 0
        // }
        // 后台校验账号密码是否正确
        // 登录失败
        // 登录成功
        // 7天自动登录
        if (this.autoLogin) {
          let storage = window.localStorage
          storage['phone'] = this.loginPhone
          storage['password'] = this.loginPassword
          storage['lastLoginTime'] = (new Date()).getTime()
        }
        this.hideAccountWindow()
        this.$store.dispatch('account/setHasLogin', true)
        this.$store.dispatch('account/setUserInfo', { id: 123, name: '张三' })
        window.localStorage.token = 1
        alert('登录成功')
      }
    },
    computed: {
      // 登录被选中
      loginActive: function () {
        return this.currentType === 'LOGIN'
      },
      registerActive: function () {
        return this.currentType === 'REGISTER' || this.currentType === 'REGISTER1'
      },
      eyeStatus: function () {
        if (this.showLoginPassword) {
          return eyeopen
        } else {
          return eyeclose
        }
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
      width: 290px;
      height: 270px;
      z-index 2
      position absolute
      left 0
      right 0
      bottom 0
      top 0
      margin auto
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1), 0px 1px 8px 0px rgba(0, 0, 0, 0.04);
      border-radius: 11px;

      .tab-wrapper
        width: 62px;
        height: 20px;
        line-height: 20px;
        margin 20px auto 14px auto
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 700;
        color: rgba(46, 49, 52, 0.5);

        .login
          float left
          cursor pointer

          &:hover
            color: rgba(46, 49, 52, 1);

        .register
          float right
          cursor pointer

          &:hover
            color: rgba(46, 49, 52, 1);

        .active
          color: rgba(46, 49, 52, 1);

      input
        width: 244px;
        height: 29px;
        padding-left 10px
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        border: 1px solid rgba(190, 195, 208, 1);
        font-size: 12px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(76, 116, 170, 1);
        line-height: 15px;
        outline none

        &::-webkit-input-placeholder /* WebKit browsers */
          color: rgba(76, 116, 170, 1);

        &:-moz-placeholder /* Mozilla Firefox 4 to 18 */
          color: rgba(76, 116, 170, 1);

        &::-moz-placeholder /* Mozilla Firefox 19+ */
          color: rgba(76, 116, 170, 1);

        &:-ms-input-placeholder /* Internet Explorer 10+ */
          color: rgba(76, 116, 170, 1);

      .login-content
        text-align center

        .login-phone
          margin-bottom 10px

        .password-wrapper
          position relative

          .show-password
            position absolute
            top 0
            bottom 0
            right 30px
            margin-top auto
            margin-bottom auto
            cursor pointer

        .hint
          padding 0 23px
          text-align left
          height 12px
          line-height: 12px;
          font-size:12px;
          margin-top 5px
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(250, 89, 108, 1);
        .other-way
          padding 0 23px
          height:20px;
          font-size:11px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          line-height:20px;
          .phone
            float left
            color:rgba(93,115,250,1);
          .forget
            float right
            color:rgba(168,178,183,1);
        .login
          width:164px;
          height: 32px;
          margin-top 20px
          background: linear-gradient(90deg, rgba(71, 54, 245, 1) 0%, rgba(155, 61, 247, 1) 100%);
          border-radius: 16px;
          color:rgba(255,255,255,1);
          font-size:12px;
          line-height:33px;
          border none
          box-shadow: 0px 4px 20px 0px rgba(71,54,245,0.1843), 0px 1px 8px 0px rgba(155,61,247,0.1843);
          cursor pointer
        .other-ways
          height:22px;
          font-size: 11px;
          line-height: 22px;
          margin-top 20px
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(168, 178, 183, 1);
      .register-content
        text-align center
        .identify-wrapper
          position relative
          margin-top 10px
          .icon-wrapper
            position absolute
            top 5px
            bottom 0
            right 30px
            cursor pointer
        .hint
          padding 0 23px
          text-align left
          height 12px
          line-height: 12px;
          font-size:12px;
          margin-top 5px
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(250, 89, 108, 1);
        .protocol-wrapper
          padding 0 23px
          height:22px;
          font-size:11px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(46,49,52,1);
          line-height:22px;
          .box
            float left
          .text
            position relative
            float left
            right 25px
          .protocol
            cursor pointer
            text-decoration underline
            &:hover
              color:rgba(72,55,245,1)
        .register
          width:164px;
          height: 32px;
          margin-top 25px
          background: linear-gradient(90deg, rgba(71, 54, 245, 1) 0%, rgba(155, 61, 247, 1) 100%);
          border-radius: 16px;
          color:rgba(255,255,255,1);
          font-size:12px;
          line-height:33px;
          border none
          box-shadow: 0px 4px 20px 0px rgba(71,54,245,0.1843), 0px 1px 8px 0px rgba(155,61,247,0.1843);
          cursor pointer

      .register-content1
        text-align center
        .text
          height:14px;
          font-size:12px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(168,178,183,1);
          line-height:14px;
          margin-bottom 5px
        .code-wrapper
          position relative
          margin-bottom 10px
          .again
            position absolute
            top 0
            bottom 0
            right 30px
            margin-top auto
            margin-bottom auto
            cursor pointer
        .password-wrapper
          position relative
          .show-password
            position absolute
            top 0
            bottom 0
            right 30px
            margin-top auto
            margin-bottom auto
            cursor pointer
        .hint
          padding 0 23px
          text-align left
          height 12px
          line-height: 12px;
          font-size:12px;
          margin-top 5px
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(250, 89, 108, 1);
        .done
          width:164px;
          height: 32px;
          margin-top 10px
          background: linear-gradient(90deg, rgba(71, 54, 245, 1) 0%, rgba(155, 61, 247, 1) 100%);
          border-radius: 16px;
          color:rgba(255,255,255,1);
          font-size:12px;
          line-height:33px;
          border none
          box-shadow: 0px 4px 20px 0px rgba(71,54,245,0.1843), 0px 1px 8px 0px rgba(155,61,247,0.1843);
          cursor pointer
        .back
          margin-top 15px
          height:22px;
          font-size:11px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(46,49,52,1);
          line-height:22px;
          cursor pointer
</style>
