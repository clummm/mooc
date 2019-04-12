import user from '../../../../../public/images/user.jpg'

const NOTES = {
  notes: [
    {
      id: 100,
      title: '笔记标题',
      createTime: '2019-01-10',
      replyCount: 2,
      pageViews: 10,
      likeCount: 10,
      creator: {
        id: 123,
        avatar: user,
        name: '张三'
      },
      createPosition: {
        cid: 0,
        courseName: '前端框架课程0',
        chapter: 2,
        sid: 1,
        sessionName: 'mov_bbb',
        time: 123
      }
    },
    {
      id: 100,
      title: '笔记标题',
      createTime: '2018-07-10',
      replyCount: 2,
      pageViews: 10,
      likeCount: 10,
      creator: {
        id: 123,
        avatar: user,
        name: '张三'
      },
      createPosition: {
        cid: 0,
        courseName: '前端框架课程0',
        chapter: 1,
        sid: 2,
        sessionName: 'trailer',
        time: 10
      }
    }
  ],
  notesNum: 100
}

export { NOTES }
