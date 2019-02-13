# mooc



## 框架

* [vue 2.x](https://cn.vuejs.org/v2/guide/)

  前端MVVM框架，方便组件复用和数据双向绑定。

* [vue-router](https://router.vuejs.org/zh/)

  搭建于vue框架的库，用于路由。

* [vue-cli](https://cli.vuejs.org/zh/)

  搭建于vue框架的脚手架工具。

* [eslint](https://cn.eslint.org/)

  javascript代码检测与规范工具。该项目使用[standard规范](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)。

* webpack

  前端项目打包发布工具。



## 目录结构

```
mooc
├── build                    // webpack相关配置文件
├── config                   // webpack相关配置文件
├── node_modules             // 依赖库
├── src                      // 项目代码
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
|   |   |   ├── notes                    // 课程笔记
|   |   |   ├── QA                       // 课程问答
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
|   ├── router                   // 路由定义
|   |   └── index.js
|   ├── App.vue                  // 根组件
|   └── main.js                  // 项目js入口
├── static                   // 静态资源文件
|   ├── css
|   |   ├── reset.css               // KISSY CSS Reset，暂时采用该css reset文件
|   |   └── yui3.css                // YUI3 CSS Reset
|   └── .gitkeep
├── .babelrc                 // babel配置文件，babel用于将es6编译成es5
├── .editorconfig            // 编辑器配置文件
├── .eslintignore            // eslint忽略语法检查的目录/文件
├── .eslintrc.js             // eslint配置文件
├── .gitignore
├── .poscssrc.js
├── index.html               // 项目html入口
├── package.json
├── package-lock.json
└── README.md

```



## 运行

``` bash
# 运行前，确保已安装vue-cli
# 进入 mooc 目录
# 安装相关依赖
# npm install

# 启动项目，运行在localhost:8080
npm run dev
```


