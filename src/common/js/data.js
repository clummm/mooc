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
  interests: [1, 2, 3],
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
export { USER_INFO, MY_COURSE, HISTORY }
