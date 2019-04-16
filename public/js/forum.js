import user from '../images/user.jpg'

const Forum = {
  forum: [
    {
      id: 100,
      title: '讨论标题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题',
      createTime: '2019-01-10',
      replyCount: 2,
      pageViews: 10,
      likeCount: 10,
      like: false,
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
        sessionName: 'mov_bbb',
        time: 123
      }
    },
    {
      id: 101,
      title: '讨论标题',
      createTime: '2018-07-10',
      replyCount: 2,
      pageViews: 10,
      likeCount: 10,
      like: true,
      creator: {
        id: 123,
        avatar: user,
        name: '张三'
      }
    }
  ],
  forumNum: 100
}
const secondForum = {
  forum: [
    {
      id: 100,
      title: '讨论标题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题题',
      createTime: '2019-01-10',
      replyCount: 2,
      pageViews: 10,
      likeCount: 10,
      like: false,
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
        sessionName: 'mov_bbb',
        time: 123
      }
    }
  ],
  forumNum: 100
}
export { Forum, secondForum }
