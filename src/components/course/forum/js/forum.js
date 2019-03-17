import user from '../../../../common/user.jpg'

const FORUM = {
  forum: [
    {
      id: 100,
      title: '讨论标题',
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
        courseName: 'Unity5.x 创造 3D VR游戏',
        chapter: 2,
        sid: 1,
        sessionName: '课时标题1',
        time: 123
      }
    },
    {
      id: 100,
      title: '讨论标题',
      createTime: '2018-07-10',
      replyCount: 2,
      pageViews: 10,
      likeCount: 10,
      creator: {
        id: 123,
        avatar: user,
        name: '张三'
      }
    }
  ],
  notesNum: 100
}

export { FORUM }
