import Cookies from 'js-cookie'
import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home/home'
import category from './components/category/category'
import user from './components/user/user'
import course from './components/course/course'

import courseList from './components/user/courseList/courseList'
import message from './components/user/message/message'
import note from './components/user/note/note'
import upload from './components/user/upload/upload'
import discuss from './components/user/discuss/discuss'
import courseNote from './components/user/courseNote/courseNote'
import courseDiscuss from './components/user/courseDiscuss/courseDiscuss'

import catalog from './components/course/catalog/catalog'
import forum from './components/course/forum/forum'
import notes from './components/course/notes/notes'
import comments from './components/course/comments/comments'

import searchResult from './components/searchResult/searchResult'
import protocol from './components/help/protocol/protocol'
import store from './store/'
import courseVideo from './components/courseVideo/courseVideo'
import discussDetail from './components/dicussDetail/discussDetail'
import noteDetail from './components/noteDetail/noteDetail'
import settings from './components/settings/settings'
import { USER_INFO } from './common/js/data'

Vue.use(Router)
const NEED_LOGIN = 'needLogin'
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
      path: '/user',
      // name: 'user',
      component: user,
      children: [
        // 重定向路由'/user/:uid'为courseList组件
        {
          path: '/',
          redirect: 'courseList',
          name: 'user',
          meta: NEED_LOGIN
        },
        // 我的课程下与我相关的笔记
        {
          path: 'courseList/:cid/courseNote',
          name: 'courseNote',
          component: courseNote,
          meta: NEED_LOGIN
        },
        // 我的课程下与我相关的讨论
        {
          path: 'courseList/:cid/courseDiscuss',
          name: 'courseDiscuss',
          component: courseDiscuss,
          meta: NEED_LOGIN
        },
        // 我的课程
        {
          path: 'courseList',
          name: 'courseList',
          component: courseList,
          meta: NEED_LOGIN
        },
        // 我的笔记
        {
          path: 'note',
          name: 'note',
          component: note,
          meta: NEED_LOGIN
        },
        // 我的消息
        {
          path: 'message',
          name: 'message',
          component: message,
          meta: NEED_LOGIN
        },
        // 我的讨论
        {
          path: 'discuss',
          name: 'discuss',
          component: discuss,
          meta: NEED_LOGIN
        },
        // 上传管理
        {
          path: 'upload',
          name: 'upload',
          component: upload,
          meta: NEED_LOGIN
        }
      ]
    },
    // 个人设置
    {
      path: '/user/settings',
      name: 'settings',
      component: settings,
      meta: NEED_LOGIN
    },
    // 课程页
    {
      path: '/course/:cid',
      // name: 'course',
      component: course,
      children: [
        // 重定向路由'/course/:cid'为catalog组件
        {
          path: '/',
          redirect: 'catalog',
          name: 'course'
        },
        // 课程章节
        {
          path: 'catalog',
          name: 'catalog',
          component: catalog
        },
        // 课程笔记
        {
          path: 'notes',
          name: 'notes',
          component: notes
        },
        // 课程讨论
        {
          path: 'forum',
          name: 'forum',
          component: forum
        },
        // 课程评价
        {
          path: 'comments',
          name: 'comments',
          component: comments
        }
      ]
    },
    // 播放页
    {
      path: '/course/:cid/courseVideo/:sid/:time',
      name: 'courseVideo',
      component: courseVideo,
      meta: NEED_LOGIN

    },
    // 讨论详情页
    {
      path: '/discussDetail/:did',
      name: 'discussDetail',
      component: discussDetail
    },
    // 笔记详情页
    {
      path: '/noteDetail/:nid',
      name: 'noteDetail',
      component: noteDetail
    },
    // 搜索结果页
    {
      path: '/search',
      name: 'searchResult',
      component: searchResult
    },
    // 协议展示页
    {
      path: '/protocol',
      name: 'protocol',
      component: protocol
    }
    // 懒加载示例
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

// 在每次进入路由前判断
router.beforeEach((to, from, next) => {
  //  从cookie中获取token
  let token = Cookies.get('token')
  // 从vuex中获取用户基本信息
  let userInfo = store.getters['account/getUserInfo']
  if (token) {
    // token有效，但是无用户信息，可能1.未登录 2.刷新页面或者打开新窗口时vuex恢复默认状态
    // 从后台获取用户基本信息
    if (!userInfo) {
      store.dispatch('account/setUserInfo', USER_INFO)
    }
    // token有效且用户信息正常则无操作
  } else {
    // token无效 拦截直接通过url访问需要登录权限的页面，如果token失效则返回首页并显示登录窗口
    if (to.meta === NEED_LOGIN) {
      store.dispatch('account/setAccountWindowShow', {
        show: true,
        type: 'LOGIN'
      })
      next({ name: 'Home' })
    }
  }
  next()
})

export default router
