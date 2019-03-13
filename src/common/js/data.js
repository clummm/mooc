import ICON from '../user.jpg'
import COURSE from '../course.png'

const USER_INFO = {
  id: '123',
  phone: '13676010795',
  name: '张三',
  icon: ICON,
  sex: '男',
  age: ['1995', '12', '22'],
  job: 'android开发工程师',
  address: ['四川', '成都', '天府新区'],
  interest: [1, 2, 3],
  cuorses: [{
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
export { USER_INFO, MY_COURSE, HISTORY, MY_NOTE, LIKE_NOTE }
