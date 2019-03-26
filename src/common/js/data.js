import AVATAR from '../user.jpg'
import COURSE from '../course.png'

const USER_INFO = {
  id: 123,
  phone: '13676010795',
  name: '张三',
  icon: AVATAR,
  sex: null,
  age: ['1995', '12', '22'],
  job: 'android开发工程师',
  address: ['四川', '成都'],
  interest: [1, 2, 3],
  courses: [{
    id: '100',
    icon: COURSE,
    name: 'Unity5.x 创造 3D VR游戏'
  }]
}

const MY_COURSE = [
  {
    id: '100',
    img: COURSE,
    name: 'Unity5.x 创造 3D VR游戏',
    subtitle: '零基础入门游戏行业',
    learningCount: 802,
    rating: 4.8,
    discussCount: 3,
    noteCount: 0,
    leavePosition: {
      sid: 1,
      name: '课时名称',
      time: '离开时学到课时的时间点'
    }
  },
  {
    id: '101',
    img: COURSE,
    name: 'Unity5.x 创造 3D VR游戏',
    subtitle: '零基础入门游戏行业',
    learningCount: 740,
    rating: 4.0,
    discussCount: 2,
    noteCount: 1,
    leavePosition: {
      sid: 1,
      name: '课时名称',
      time: '离开时学到课时的时间点'
    }
  },
  {
    id: '102',
    img: COURSE,
    name: 'Unity5.x 创造 3D VR游戏',
    subtitle: '零基础入门游戏行业',
    learningCount: 300,
    rating: 3.5,
    discussCount: 0,
    noteCount: 0,
    leavePosition: {
      sid: 1,
      name: '课时名称',
      time: '离开时学到课时的时间点'
    }
  }
]

const HISTORY = [
  {
    id: '103',
    img: COURSE,
    name: 'Unity5.x 创造 3D VR游戏',
    subtitle: '零基础入门游戏行业',
    learningCount: 802,
    rating: 4.8,
    discussCount: 3,
    noteCount: 0,
    date: '2019-3-10',
    like: false,
    leavePosition: {
      sid: 1,
      name: '课时名称',
      time: '离开时学到课时的时间点'
    }
  },
  {
    id: '104',
    img: COURSE,
    name: 'Unity5.x 创造 3D VR游戏',
    subtitle: '零基础入门游戏行业',
    learningCount: 740,
    rating: 4.0,
    discussCount: 2,
    noteCount: 1,
    date: '2019-3-10',
    like: false,
    leavePosition: {
      sid: 1,
      name: '课时名称',
      time: '离开时学到课时的时间点'
    }
  },
  {
    id: '105',
    img: COURSE,
    name: 'Unity5.x 创造 3D VR游戏',
    subtitle: '零基础入门游戏行业',
    learningCount: 300,
    rating: 3.5,
    discussCount: 0,
    noteCount: 0,
    date: '2019-3-8',
    like: false,
    leavePosition: {
      sid: 1,
      name: '课时名称',
      time: '离开时学到课时的时间点'
    }
  }
]

const MY_NOTE = [
  {
    id: 100,
    img: COURSE,
    title: '自己的笔记1',
    content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    createTime: '2019-3-13',
    likeCount: 100,
    creator: {
      id: 123,
      avatar: AVATAR,
      name: '张三'
    },
    createPosition: {
      cid: 1000,
      courseName: 'Unity5.x 创造 3D VR游戏',
      sid: 1,
      sessionName: '课时名称1',
      time: '记录笔记的时间节点1'
    }
  },
  {
    id: 101,
    img: COURSE,
    title: '自己的笔记2',
    content: 'bbbbbbbbbbbbbbbbbbbbbbbbb',
    createTime: '2019-3-12',
    likeCount: 101,
    creator: {
      id: 123,
      avatar: AVATAR,
      name: '张三'
    },
    createPosition: {
      cid: 1001,
      courseName: 'Unity5.x 创造 3D VR游戏',
      sid: 2,
      sessionName: '课时名称2',
      time: '记录笔记的时间节点2'
    }
  },
  {
    id: 103,
    img: COURSE,
    title: '自己的笔记3',
    content: 'ccccccccccccccc',
    createTime: '2019-3-11',
    likeCount: 102,
    creator: {
      id: 123,
      avatar: AVATAR,
      name: '张三'
    },
    createPosition: {
      cid: 1002,
      courseName: 'Unity5.x 创造 3D VR游戏',
      sid: 3,
      sessionName: '课时名称3',
      time: '记录笔记的时间节点3'
    }
  }
]

const LIKE_NOTE = [
  {
    id: 104,
    img: COURSE,
    title: '收藏的笔记1',
    content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    createTime: '2019-3-13',
    likeCount: 104,
    creator: {
      id: 1001,
      avatar: AVATAR,
      name: '笔记创建者姓名1'
    },
    createPosition: {
      cid: 100,
      courseName: 'Unity5.x 创造 3D VR游戏',
      sid: 1,
      sessionName: '课时名称1',
      time: '记录笔记的时间节点1'
    }
  },
  {
    id: 105,
    img: COURSE,
    title: '收藏的笔记2',
    content: 'bbbbbbbbbbbbbbbbbbbbbbbbb',
    createTime: '2019-3-12',
    likeCount: 105,
    creator: {
      id: 1002,
      avatar: AVATAR,
      name: '笔记创建者姓名2'
    },
    createPosition: {
      cid: 100,
      courseName: 'Unity5.x 创造 3D VR游戏',
      sid: 2,
      sessionName: '课时名称2',
      time: '记录笔记的时间节点2'
    }
  },
  {
    id: 106,
    img: COURSE,
    title: '收藏的笔记3',
    content: 'ccccccccccccccc',
    createTime: '2019-3-11',
    likeCount: 106,
    creator: {
      id: 1003,
      avatar: AVATAR,
      name: '笔记创建者姓名3'
    },
    createPosition: {
      cid: 100,
      courseName: 'Unity5.x 创造 3D VR游戏',
      sid: 3,
      sessionName: '课时名称3',
      time: '记录笔记的时间节点3'
    }
  }
]

const MY_DISCUSS = [
  {
    id: 200,
    title: '讨论标题1',
    createTime: '讨论创建时间1',
    replyCount: '回复数1',
    pageViews: '浏览数1',
    likeCount: '关注人数1',
    creator: {
      id: 123,
      avatar: AVATAR,
      name: '张三'
    },
    createPosition: {
      cid: 3001,
      courseName: '课程名字1',
      image: COURSE,
      sid: '课时id1',
      sessionName: '课时名称1',
      time: '记录笔记的时间节点1'
    }
  },
  {
    id: 201,
    title: '讨论标题2',
    createTime: '讨论创建时间2',
    replyCount: '回复数2',
    pageViews: '浏览数2',
    likeCount: '关注人数2',
    creator: {
      id: 123,
      avatar: AVATAR,
      name: '张三'
    },
    createPosition: {
      cid: 3002,
      courseName: '课程名字2',
      image: COURSE,
      sid: null,
      sessionName: null,
      time: null
    }
  },
  {
    id: 203,
    title: '讨论标题3',
    createTime: '讨论创建时间3',
    replyCount: '回复数3',
    pageViews: '浏览数3',
    likeCount: '关注人数3',
    creator: {
      id: 123,
      avatar: AVATAR,
      name: '张三'
    },
    createPosition: {
      cid: 3003,
      courseName: '课程名字3',
      image: COURSE,
      sid: '课时id3',
      sessionName: '课时名称3',
      time: '记录笔记的时间节点3'
    }
  }
]

const LIKE_DISCUSS = [
  {
    id: 204,
    title: '讨论标题1',
    createTime: '讨论创建时间1',
    replyCount: '回复数1',
    pageViews: '浏览数1',
    likeCount: '关注人数1',
    creator: {
      id: 124,
      avatar: AVATAR,
      name: '李四'
    },
    createPosition: {
      cid: 3001,
      courseName: '课程名字1',
      image: COURSE,
      sid: '课时id1',
      sessionName: '课时名称1',
      time: '记录笔记的时间节点1'
    }
  },
  {
    id: 205,
    title: '讨论标题2',
    createTime: '讨论创建时间2',
    replyCount: '回复数2',
    pageViews: '浏览数2',
    likeCount: '关注人数2',
    creator: {
      id: 125,
      avatar: AVATAR,
      name: '王五'
    },
    createPosition: {
      cid: 3002,
      courseName: '课程名字2',
      image: COURSE,
      sid: null,
      sessionName: null,
      time: null
    }
  },
  {
    id: 206,
    title: '讨论标题3',
    createTime: '讨论创建时间3',
    replyCount: '回复数3',
    pageViews: '浏览数3',
    likeCount: '关注人数3',
    creator: {
      id: 126,
      avatar: AVATAR,
      name: '哈哈哈'
    },
    createPosition: {
      cid: 3003,
      courseName: '课程名字3',
      image: COURSE,
      sid: '课时id3',
      sessionName: '课时名称3',
      time: '记录笔记的时间节点3'
    }
  }
]

const DISCUSS_DETAIL_MINE = {
  id: 200,
  title: '讨论标题1',
  content: '讨论内容',
  createTime: '讨论创建时间1',
  replyCount: '回复数1',
  pageViews: '浏览数1',
  likeCount: '关注人数1',
  creator: {
    id: 123,
    avatar: AVATAR,
    name: '张三'
  },
  createPosition: {
    cid: 3001,
    courseName: '课程名字1',
    image: COURSE,
    sid: '课时id1',
    sessionName: '课时名称1',
    time: '记录笔记的时间节点1'
  },
  related: [
    {
      id: 2001,
      title: '讨论标题1'
    },
    {
      id: 2002,
      title: '讨论标题2'
    },
    {
      id: 2003,
      title: '讨论标题3'
    }
  ],
  reply: [
    {
      id: 2010,
      date: '回复时间1',
      content: '回复内容1',
      likeCount: '点赞人数1',
      liked: true,
      replyer: {
        id: '2020',
        avatar: AVATAR,
        name: '回复者昵称1'
      },
      replyName: '被回复者昵称1'
    },
    {
      id: 2011,
      date: '回复时间2',
      content: '回复内容2',
      likeCount: '点赞人数2',
      liked: false,
      replyer: {
        id: '2021',
        avatar: AVATAR,
        name: '回复者昵称2'
      },
      replyName: null
    }, {
      id: 2013,
      date: '回复时间3',
      content: '回复内容3',
      likeCount: '点赞人数3',
      liked: false,
      replyer: {
        id: '2023',
        avatar: AVATAR,
        name: '回复者昵称3'
      },
      replyName: '被回复者昵称3'
    }
  ]
}

const DISCUSS_DETAIL_OTHER = {
  id: 200,
  title: '讨论标题1',
  content: '讨论内容',
  createTime: '讨论创建时间1',
  replyCount: '回复数1',
  pageViews: '浏览数1',
  likeCount: '关注人数1',
  liked: true,
  creator: {
    id: 1234,
    avatar: AVATAR,
    name: '李三'
  },
  createPosition: {
    cid: 3001,
    courseName: '课程名字1',
    image: COURSE,
    sid: '课时id1',
    sessionName: '课时名称1',
    time: '记录笔记的时间节点1'
  },
  related: [
    {
      id: 2001,
      title: '讨论标题1'
    },
    {
      id: 2002,
      title: '讨论标题2'
    },
    {
      id: 2003,
      title: '讨论标题3'
    }
  ],
  reply: [
    {
      id: 2010,
      date: '回复时间1',
      content: '回复内容1',
      likeCount: '点赞人数1',
      liked: true,
      replyer: {
        id: '2020',
        avatar: AVATAR,
        name: '回复者昵称1'
      },
      replyName: '被回复者昵称1'
    },
    {
      id: 2011,
      date: '回复时间2',
      content: '回复内容2',
      likeCount: '点赞人数2',
      liked: false,
      replyer: {
        id: '2021',
        avatar: AVATAR,
        name: '回复者昵称2'
      },
      replyName: null
    }, {
      id: 2013,
      date: '回复时间3',
      content: '回复内容3',
      likeCount: '点赞人数3',
      liked: true,
      replyer: {
        id: '2023',
        avatar: AVATAR,
        name: '回复者昵称3'
      },
      replyName: '被回复者昵称3'
    }
  ]
}

const MESSAGES_COURSE = {
  totalNum: 100,
  messages: [
    {
      id: 1001,
      cid: 2001,
      name: '课程名字1',
      subhead: '副标题1',
      img: COURSE,
      learningCount: 200,
      rating: 4.3,
      updateTime: '2019-3-18 20:00',
      readed: false
    },
    {
      id: 1002,
      cid: 2002,
      name: '课程名字2',
      subhead: '副标题2',
      img: COURSE,
      learningCount: 201,
      rating: 4.4,
      updateTime: '2019-3-18 21:00',
      readed: false
    },
    {
      id: 1003,
      cid: 2003,
      name: '课程名字3',
      subhead: '副标题3',
      img: COURSE,
      learningCount: 203,
      rating: 4.5,
      updateTime: '2019-3-18 22:00',
      readed: false
    }
  ]
}

const MESSAGES_DISCUSS = {
  totalNum: 100,
  messages: [
    {
      id: 1000,
      did: 2000,
      name: '回复者名字1',
      avatar: AVATAR,
      content: '回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1回复内容1',
      discussTitle: '讨论标题1',
      replyTime: '2019-3-18 20:00',
      readed: false
    },
    {
      id: 1001,
      did: 2001,
      name: '回复者名字2',
      avatar: AVATAR,
      content: '回复内容2',
      discussTitle: '讨论标题2',
      replyTime: '2019-3-18 21:00',
      readed: false
    },
    {
      id: 1002,
      did: 2002,
      name: '回复者名字3',
      avatar: AVATAR,
      content: '回复内容3',
      discussTitle: '讨论标题3',
      replyTime: '2019-3-18 22:00',
      readed: false
    }
  ]
}

const PUBLISH_COURSES = [
  {
    id: 1001,
    img: COURSE,
    name: '课程名字1',
    subtitle: '课程副标题1',
    learningCount: '200',
    rating: '4.5',
    publishTime: '2019-3-19 20:00',
    updateTime: '2019-3-19 21:00',
    status: 1
  },
  {
    id: 1002,
    img: COURSE,
    name: '课程名字2',
    subtitle: '课程副标题1',
    learningCount: '200',
    rating: '4.5',
    publishTime: '2019-3-19 20:00',
    updateTime: '2019-3-19 21:00',
    status: 2
  },
  {
    id: 1003,
    img: COURSE,
    name: '课程名字3',
    subtitle: '课程副标题1',
    learningCount: '200',
    rating: '4.5',
    publishTime: '2019-3-19 20:00',
    updateTime: '2019-3-19 21:00',
    status: 3
  }
]

const UPLOAD_COURSE = {
  id: 1001,
  img: COURSE,
  name: '课程名字1',
  subtitle: '课程副标题1',
  category1: {
    id: 0,
    name: '前端开发'
  },
  category2: {
    id: 1,
    name: '前端框架'
  },
  needToKnow: '1、对es6语法有基本了解\n' +
    '2、了解前端工程化\n' +
    '3、了解vuejs',
  gains: '1、通过webpack搭建vue工程workflow\n' +
    '2、哪些是学习vue的重点\n' +
    '3、.vue文件开发模式\n' +
    '4、vue使用jsx进行开发的方式\n' +
    '5、vue组件间通信的基本方式\n' +
    '6、webpack打包优化的基本点',
  totalTime: '2小时23分',
  learningCount: '52523',
  rating: '4.5',
  intro: '简介：本课程基于一个TODO示例应用讲解VUE2的基本使用以及如何搭建一个vue的工程。首先通过webpack我们搭建了一个完善的vue的workflow，然后围绕功能实现讲解vue的使用，并介绍了vue的.vue文件以及jsx的开发模式。 对应实战课已经上线：https://coding.imooc.com/class/196.html，欢迎学习',
  keyWords: [
    {
      keyword: '关键词1',
      meaning: '关键词1的解释'
    },
    {
      keyword: '关键词2',
      meaning: '关键词2的解释'
    },
    {
      keyword: '关键词3',
      meaning: '关键词3的解释'
    },
    {
      keyword: '关键词4',
      meaning: '关键词4的解释'
    },
    {
      keyword: '关键词5',
      meaning: '关键词5的解释'
    }
  ],
  catalogue: {
    chapters: [
      {
        id: 1,
        title: '课程介绍',
        intro: '对课程整体进行介绍',
        sessions: [
          {
            id: 1,
            url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
            duration: '2000',
            keyWords: ['关键词1', '关键词2'],
            nodes: [
              {
                name: '节点名1',
                time: '节点1对应时间戳'
              },
              {
                name: '节点名2',
                time: '节点2对应时间戳'
              }
            ]
          }, {
            id: 2,
            url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
            duration: '2000',
            keyWords: ['关键词1', '关键词2'],
            nodes: [
              {
                name: '节点名1',
                time: '节点1对应时间戳'
              },
              {
                name: '节点名2',
                time: '节点2对应时间戳'
              }
            ]
          }

        ]
      }

    ]
  },
  resources: [
    {
      id: 100,
      name: '文件名1',
      url: '文件地址1',
      description: '文件描述1',
      uploadTime: '2019-3-20',
      size: '23.5M'
    },
    {
      id: 100,
      name: '文件名1',
      url: '文件地址1',
      description: '文件描述1',
      uploadTime: '2019-3-20',
      size: '23.5M'
    },
    {
      id: 100,
      name: '文件名1',
      url: '文件地址1',
      description: '文件描述1',
      uploadTime: '2019-3-20',
      size: '23.5M'
    }

  ],
  tests: [
    {
      id: 200,
      name: '测试名字1',
      count: 3,
      description: '测试描述1'
    },
    {
      id: 200,
      name: '测试名字1',
      count: 3,
      description: '测试描述1'
    },
    {
      id: 200,
      name: '测试名字1',
      count: 3,
      description: '测试描述1'
    }
  ]
}

export {
  USER_INFO,
  MY_COURSE,
  HISTORY,
  MY_NOTE,
  LIKE_NOTE,
  MY_DISCUSS,
  LIKE_DISCUSS,
  DISCUSS_DETAIL_MINE,
  DISCUSS_DETAIL_OTHER,
  MESSAGES_COURSE,
  MESSAGES_DISCUSS,
  PUBLISH_COURSES,
  UPLOAD_COURSE,
  DICTIONARY
}
