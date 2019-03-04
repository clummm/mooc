// 分类id与分类名的映射
const CATEGORY_TYPE = {
  0: '前端开发',
  1: '前端框架',
  2: '小程序',
  3: '语言基础',
  4: '编程语言',
  5: 'C/C++',
  6: 'JAVA',
  7: 'Python',
  8: '移动开发',
  9: 'Android',
  10: 'iOS',
  11: '混合开发',
  12: '前沿',
  13: '数据科学',
  14: '人工智能',
  15: '区块链',
  16: '网络安全',
  17: '运维测试',
  18: '信息安全',
  19: '后端开发',
  20: 'JAVA',
  21: 'Python',
  22: 'PHP',
  23: '.NET'
}

// 获取分类关系以及一级分类推荐课程
const PRIMARY_CATEGORY = [
  {
    id: 0,
    name: '前端开发',
    active: false,
    second: [
      {
        id: 1,
        name: '前端框架'
      },
      {
        id: 2,
        name: '小程序'
      },
      {
        id: 3,
        name: '语言基础'
      }
    ],
    recommend: [
      {
        id: 0,
        img: '#',
        name: '前端课程0',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 1,
        img: '#',
        name: '前端课程1',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 2,
        img: '#',
        name: '前端课程2',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 3,
        img: '#',
        name: '前端课程3',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      }
    ]
  },
  {
    id: 4,
    name: '编程语言',
    active: false,
    second: [
      {
        id: 5,
        name: 'C/C++'
      },
      {
        id: 6,
        name: 'JAVA'
      },
      {
        id: 7,
        name: 'Python'
      }
    ],
    recommend: [
      {
        id: 4,
        img: '#',
        name: '编程课程0',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 5,
        img: '#',
        name: '编程课程1',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 6,
        img: '#',
        name: '编程课程2',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 7,
        img: '#',
        name: '编程课程3',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      }
    ]
  },
  {
    id: 8,
    name: '移动开发',
    active: false,
    second: [
      {
        id: 9,
        name: 'Android'
      },
      {
        id: 10,
        name: 'iOS'
      },
      {
        id: 11,
        name: '混合开发'
      }
    ],
    recommend: [
      {
        id: 8,
        img: '#',
        name: '移动课程0',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 9,
        img: '#',
        name: '移动课程1',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 10,
        img: '#',
        name: '移动课程2',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 11,
        img: '#',
        name: '移动课程3',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      }
    ]
  },
  {
    id: 12,
    name: '前沿',
    active: false,
    second: [
      {
        id: 13,
        name: '数据科学'
      },
      {
        id: 14,
        name: '人工智能'
      },
      {
        id: 15,
        name: '区块链'
      }
    ],
    recommend: [
      {
        id: 12,
        img: '#',
        name: '前沿课程0',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 13,
        img: '#',
        name: '前沿课程1',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 14,
        img: '#',
        name: '前沿课程2',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 15,
        img: '#',
        name: '前沿课程3',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      }
    ]
  },
  {
    id: 16,
    name: '网络安全',
    active: false,
    second: [
      {
        id: 17,
        name: '运维测试'
      },
      {
        id: 18,
        name: '信息安全'
      }
    ],
    recommend: [
      {
        id: 16,
        img: '#',
        name: '网络安全课程0',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 17,
        img: '#',
        name: '网络安全课程1',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 18,
        img: '#',
        name: '网络安全课程2',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 19,
        img: '#',
        name: '网络安全课程3',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      }
    ]
  },
  {
    id: 19,
    name: '后端开发',
    active: false,
    second: [
      {
        id: 20,
        name: 'JAVA'
      },
      {
        id: 21,
        name: 'Python'
      },
      {
        id: 22,
        name: 'PHP'
      },
      {
        id: 23,
        name: '.NET'
      }
    ],
    recommend: [
      {
        id: 20,
        img: '#',
        name: '后端课程0',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 21,
        img: '#',
        name: '后端课程1',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 22,
        img: '#',
        name: '后端课程2',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 23,
        img: '#',
        name: '后端课程3',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      }
    ]
  }
]

// 获取二级分类推荐课程
const SECOND_CATEGORY = [
  {
    id: 1,
    name: '前端框架',
    recommend: [
      {
        id: 0,
        img: '#',
        name: '前端框架课程0',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 1,
        img: '#',
        name: '前端框架课程1',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 2,
        img: '#',
        name: '前端框架课程2',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 3,
        img: '#',
        name: '前端框架课程3',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      }
    ]
  },
  {
    id: 2,
    name: '小程序',
    recommend: [
      {
        id: 0,
        img: '#',
        name: '小程序课程0',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 1,
        img: '#',
        name: '小程序课程1',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 2,
        img: '#',
        name: '小程序课程2',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 3,
        img: '#',
        name: '小程序课程3',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      }
    ]
  },
  {
    id: 3,
    name: '语言基础',
    recommend: [
      {
        id: 0,
        img: '#',
        name: '语言基础课程0',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 1,
        img: '#',
        name: '语言基础课程1',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 2,
        img: '#',
        name: '语言基础课程2',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      },
      {
        id: 3,
        img: '#',
        name: '语言基础课程3',
        subtitle: '课程副标题',
        learningCount: 1000,
        rating: 5.0
      }
    ]
  }
]

export { CATEGORY_TYPE, PRIMARY_CATEGORY, SECOND_CATEGORY }
