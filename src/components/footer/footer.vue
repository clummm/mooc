<template>
  <div class="footer-wrapper">
    <div class="top">
      <div class="content">
        <div class="cooperator-title">合作机构</div>
        <div class="cooperator-list">
          <span class="cooperator-item">多学多用</span>
          <span class="cooperator-item">考拉超级课堂</span>
        </div>
        <div class="apply">申请加入<i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
    <div class="bottom">
      <div class="content">
        <p class="intro">超视慕课平台专注于学习提升的线上平台</p>
        <div class="menu">
          <span class="menu-item">关于我们</span>
          <span class="menu-item">联系我们</span>
          <span class="menu-item">帮助中心</span>
        </div>
        <p class="copyright">@2018-2019 超视慕课平台 版权所有</p>
        <img src="./follow.png" class="follow" width="147" height="15">
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
  .content
    width 1024px
    height 150px
    margin 0 auto
    position relative
  .footer-wrapper
    height 300px
    .top
      width 100%
      height 150px
      background: rgba(244, 244, 244, 1);
      .cooperator-title
        display inline-block
        margin-top 41px
        margin-bottom 20px
        width: 80px;
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;

      .cooperator-list
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;

        .cooperator-item
          margin-right 20px

      .apply
        position absolute
        right 0
        top 41px
        width:80px;
        height:20px;
        text-align center
        border-radius:9px;
        border:1px solid rgba(201,201,201,1);
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:20px;

    .bottom
      width 100%
      height 150px
      background rgba(68, 68, 71, 1);
      .intro
        display inline-block
        margin-top 33px
        margin-bottom 12px
        width:216px;
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:17px;
      .menu
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:17px;
        .menu-item
          margin-right 12px
      .copyright
        position absolute
        left 0
        bottom 34px
        height:17px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(174,174,174,1);
        line-height:17px;
      .follow
        position absolute
        right 0
        bottom 35px
</style>
