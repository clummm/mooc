<template>
  <div class="footer">
    <div class="cooperation">
      <div class="wrapper">
        <div class="title clearfix">
          <div class="left">合作机构</div>
          <el-button round size="small" class="right">申请加入 ></el-button>
        </div>
        <div class="websites">
          <a>多学多用</a>
          <a>考拉超级课程</a>
        </div>
      </div>
    </div>
    <div class="contact">
      <div class="wrapper">
        <div class="text">超视慕课平台专注于学习提升的线上平台</div>
        <div class="about">
          <a>关于我们</a>
          <a>联系我们</a>
          <a>帮助中心</a>
        </div>
        <div class="copyright clearfix">
          <div class="left">@2018-2019 超视慕课平台 版权</div>
          <div class="follow right">
            <span>关注我们：</span>
            <a><img src="/images/weibo.jpg"/></a>
            <a><img src="/images/renren.jpg"/></a>
            <a><img src="/images/wechat.jpg"/></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .footer
    font-family PingFangSC-Regular
    .wrapper
      width 1024px
      margin auto

    .cooperation
      background-color rgba(244,244,244,1)
      padding-bottom 40px
      padding-top 40px
      .title
        div
          font-size 20px
          color #333333
          font-weight 700
      .websites
        margin-top 20px
        a
          font-size 14px
          font-weight 400
          color rgba(102,102,102,1)
          line-height 20px
          padding-right 20px

    .contact
      background-color #444447
      padding-bottom 33px
      padding-top 33px
      font-size 12px
      font-weight 400
      color rgba(255,255,255,1)
      line-height 17px
      .about
        margin-top 12px
        a
          text-decoration none
          color rgba(255,255,255,1)
          padding-right 12px
      .copyright
        margin-top 20px
        color rgba(174,174,174,1)
        .follow
          a
            padding-right 10px
            img
              vertical-align middle
</style>
