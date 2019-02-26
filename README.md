# mooc



## 框架

* [Node.js](https://nodejs.org/en/)

  版本要求 >= 8.9。

* [vue 2.x](https://cn.vuejs.org/v2/guide/)

  前端 MVVM 框架，方便组件复用和数据双向绑定。

* [vue-router](https://router.vuejs.org/zh/)

  搭建于 Vue 框架的库，用于路由。

* [vue-cli 3.0](https://cli.vuejs.org/zh/)

  搭建于 Vue 框架的脚手架工具。

* [eslint](https://cn.eslint.org/)

  javascript 代码检测与规范工具。该项目使用 [standard 规范](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)。

* [element](http://element-cn.eleme.io/#/zh-CN)

  基于 Vue 2.0 的桌面端组件库。





## 更新 vue-cli

```
# 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，
# 通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它
# Node 版本要求 >= 8.9 
# 安装 vue-cli 3.0
npm install -g @vue/cli
# 或者
yarn global add @vue/cli
```





## 运行

```bash
# 运行前，确保已安装 vue-cli 3.0
# 进入 mooc 目录
# 安装/更新相关依赖
npm install

# 启动项目，运行在 localhost:8080
npm run serve
```





## 目录结构

```
mooc
├── doc                      // 文档
├── public                   // 相当于 vue-cli 2.x 的 static 目录，存放静态资源
|   ├── css
|   |   ├── reset.css               // KISSY CSS Reset，暂时采用该css reset文件
|   |   └── yui3.css                // YUI3 CSS Reset
|   └── index.html               // 项目入口
├── src                      // 项目代码
|   ├── assets                   // 多媒体资源文件
|   ├── common                   // 公共资源文件
|   |   ├── css
|   |   ├── fonts
|   |   └── js
|   ├── components               // 组件
|   |   ├── category                 // 一级分类页
|   |   ├── course                   // 课程详情页
|   |   |   ├── catalog                  // 课程目录
|   |   |   ├── comments                 // 课程评价
|   |   |   ├── courseLearn              // 课时内容详情页
|   |   |   ├── discuss                  // 课程讨论
|   |   |   ├── notes                    // 课程笔记
|   |   |   └── course.vue
|   |   ├── footer                   // 网站共用footer
|   |   ├── header                   // 网站共用header
|   |   ├── home                     // 主页
|   |   └── user                     // 用户页
|   |       ├── courseList               // 我的课程
|   |       ├── message                  // 我的消息
|   |       ├── myHistory                // 历史记录
|   |       ├── myNote                   // 我的笔记
|   |       └── upload                   // 上传管理
|   ├── plugins                  // 第三方插件
|   |   └── element.js               // element插件
|   ├── views                    // 视图组件
|   ├── router.js                // 路由定义
|   ├── store.js                 // vex文件
|   ├── App.vue                  // 根组件
|   └── main.js                  // 项目 js 入口
├── .browserslistrc          // 浏览器兼容性配置文件
├── .editorconfig            // 编辑器配置文件
├── .eslintrc.js             // eslint配置文件
├── .gitignore
├── babel.config.js          // babel配置文件，babel用于将es6编译成es5
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
└── vue.config.js            // 相当于 vue-cli 2.x 中 build、config 配置文件

```


