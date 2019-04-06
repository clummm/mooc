import router from '../../src/router'
// 辅助路由跳转的公共方法
export default {
  // 在新窗口打开课程详情页面
  openCourseNewWindow: function (cid) {
    let routeData = router.resolve({
      name: 'course',
      params: {
        cid: cid
      }
    })
    window.open(routeData.href, '_blank')
  },
  // 在新窗口打开视频播放页面
  openVideoNewWindow: function (position) {
    let routeData = router.resolve({
      name: 'courseVideo',
      params: {
        cid: position.cid, // 课程id
        chapter: position.chapter, // 第几章节
        sid: position.sid, // 第几课时
        playTime: position.playTime // 希望播放的时间点
      }
    })
    window.open(routeData.href, '_blank')
  },
  // 当前窗口打开视频播放页
  openVideoWindow: function (position) {
    router.push({
      name: 'courseVideo',
      params: {
        cid: position.cid, // 课程id
        chapter: position.chapter, // 第几章节
        sid: position.sid, // 第几课时
        playTime: position.playTime // 希望播放的时间点
      }
    })
  },
  // 新窗口打开笔记详情页
  openDiscussDetailNewWindow (id) {
    let routeData = router.resolve({
      name: 'discussDetail',
      params: {
        did: id,
        type: 'myDiscuss'
      }
    })
    window.open(routeData.href)
  },
  // 新窗口查看笔记详情
  openNoteDetailNewWindow (id) {
    let routeData = router.resolve({
      name: 'noteDetail',
      params: {
        nid: id
      }
    })
    window.open(routeData.href, '_blank')
  },
  // 当前窗口打开笔记详情页
  openDiscussDetail (id) {
    router.push({
      name: 'discussDetail',
      params: {
        did: id,
        type: 'myDiscuss'
      }
    })
  },
  // 当前窗口打开个人模块消息子模块
  openMessage () {
    router.push({
      name: 'message',
      params: {
        type: 0
      },
      query: {
        p: 1
      }
    })
  },
  // 当前窗口打开个人模块课程子模块
  openCourse () {
    router.push({
      name: 'courseList',
      params: {
        type: 0
      },
      query: {
        p: 1
      }
    })
  },
  // 跳转上传管理详情页 基本信息
  openUploadInfo (id) {
    router.push({
      name: 'uploadInfo',
      params: {
        cid: id
      }
    })
  },
  // 返回首页
  goHome () {
    router.push({
      name: 'Home'
    })
  }
}
