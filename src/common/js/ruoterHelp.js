import router from '../../router'
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
        cid: position.cid,
        sid: position.sid,
        time: position.time
      }
    })
    window.open(routeData.href, '_blank')
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
  }
}
