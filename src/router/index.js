import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import category from '../components/category/category'
import user from '../components/user/user'
import course from '../components/course/course'

import courseList from '../components/user/courseList/courseList'
import message from '../components/user/message/message'
import myHistory from '../components/user/myHistory/myHistory'
import myNotes from '../components/user/myNote/myNote'
import upload from '../components/user/upload/upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 主页
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // 一级分类页
    {
      path: '/category/:cid',
      name: 'category',
      component: category
    },
    // 用户页
    {
      path: '/user/:uid',
      // name: 'user',
      component: user,
      children: [
        // 重定向路由'/user/:uid'为courseList组件
        {
          path: '/',
          redirect: 'courseList',
          name: 'user'
        },
        // 我的课程
        {
          path: 'courseList',
          name: 'courseList',
          component: courseList
        },
        // 我的笔记
        {
          path: 'myNotes',
          name: 'myNotes',
          component: myNotes
        },
        // 我的消息
        {
          path: 'message',
          name: 'message',
          component: message
        },
        // 历史足迹
        {
          path: 'myHistory',
          name: 'myHistory',
          component: myHistory
        },
        // 上传管理
        {
          path: 'upload',
          name: 'upload',
          component: upload
        }
      ]
    },
    // 课程页
    {
      path: '/course/:cid',
      name: 'course',
      component: course
    }
    // 未完待续
  ]
})
