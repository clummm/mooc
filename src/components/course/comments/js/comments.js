import user from '../../../../common/user.jpg'

const COMMENTS = {
  rating: 4.8,
  ratingItem: {
    practical: 4.8,
    simple: 4.7,
    logical: 4.9
  },
  comments: [
    {
      id: 100,
      content: '评价内容aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      rating: 4.8,
      createTime: '2019-01-10',
      likeCount: 10,
      like: true,
      creator: {
        id: 123,
        avatar: user,
        name: '张三'
      }
    },
    {
      id: 11,
      content: '评价内容',
      rating: 4.2,
      createTime: '2018-07-10',
      likeCount: 10,
      like: false,
      creator: {
        id: 124,
        avatar: user,
        name: '张四'
      }
    }
  ],
  commentsNum: 100
}

const MY_COMMENT = {
  id: 100,
  content: '评价内容aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  rating: 4.8,
  ratingItem: {
    practical: 4.8,
    simple: 4.7,
    logical: 4.9
  },
  createTime: '2019-01-10',
  likeCount: 10,
  like: true
}

export { COMMENTS, MY_COMMENT }
