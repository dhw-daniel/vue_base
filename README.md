# 前言

本项目只是对初始化的vue项目进行简单封装，涉及公共参数、方法、组件的配置封装等，配置详情可看目录结构，目前处理了以下问题

>  消除部分手机300延时问题

>  配置请求api路由表与版本号

>  配置了简单的接口验证用到的appid与sign

>  配置axios请求头Content-Type为application/x-www-form-urlencoded

>  添加了MD5加密方法

>  添加了api请求数据公共数据与其它数据合并方法

>  添加了对象数据过滤方法

>  添加了验证数据为空方法

>  添加了验证手机号方法

>  添加了验证邮箱方法

>  添加了得到今天日期方法: 格式2017-02-06

>  添加了得到当前url的具体参数值方法

>  .....

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + axios


## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本

```
git clone https://github.com/dhw-daniel/vue_base.git  

cd vue2-elm

npm install  或 yarn(推荐)

npm run dev

```

# 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

# 目标功能

# 最终目标

1、用vue构建足够多的模板组件，做项目时只需搭配需要用的模板组件即可构建一个项目的UI

。。。敬请期待

# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目配置
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── assets                                  // 静态资源目录
│   │   ├── images                              // 图片目录
│   │   ├── css                                 // css目录
│   │   └── js                                  // js目录
│   ├── common
│   │   ├── template                            // 公共模板目录
│   │   │   └── showbox.vue                     // 弹出框组件
│   │   ├── Configs.vue                         // 公共参数配置
│   │   ├── Functions.vue                       // 公共方法
│   │   └── RequestApi.vue                      // 请求api配置
│   ├── page
│   │   ├── components                          //通用组件
│   │   ├── example
│   │   │   ├── Request.vue                     // 请求范例
│   │   │   ├── Md5Test.vue                     // md5加密范例
│   │   │   └── Search.vue                      // 搜索范例
│   │   ├── home
│   │   │   ├── components
│   │   │   └── HomeIndex.vue                   // 首页
│   │   └── users
│   │   │   ├── components
│   │   │   └── UsersIndex.vue                  // 用户首页
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── store                                   // vuex的状态管理
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── state                               // 配置state
│   │   └── mutations.js                        // 配置mutations
│   ├── App.vue                                 // 页面入口文件
│   └── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.

```

# License

[MIT]
