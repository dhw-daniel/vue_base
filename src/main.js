// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store'
import fastClick from 'fastclick'
import md5 from 'js-md5'
import axios from 'axios'
import Qs from 'qs'
import infiniteScroll from 'vue-infinite-scroll'
// 公共参数配置
import configs from './common/Configs'
// 请求接口列表
import requestApi from './common/RequestApi'
// 公共函数
import functions from './common/Functions'
Vue.config.productionTip = false
// 使用无限加载组件
Vue.use(infiniteScroll)
// 消除部分手机300延时不准确
fastClick.attach(document.body)
// MD5加密
Vue.prototype.md5 = md5
// 公共参数
Vue.prototype.$configs = configs
// 请求接口列表
Vue.prototype.$requestApi = requestApi.requestList
// 公共函数
Vue.prototype.$functions = functions
// 设置axios全局默认请求域名
axios.defaults.baseURL = configs.requestHost
// 设置axios全局默认请求超时时间
axios.defaults.timeout = 2000
// 设置axios全局默认存在跨域请求消除OPTIONS请求
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios全局默认post请求数据格式为键值对方式
axios.defaults.transformRequest = function (data) {
  data = Qs.stringify(data)
  return data
}
// axios请求
Vue.prototype.$axios = axios
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'vue_base'
  }
  if (process.env.NODE_ENV === 'development') {
  }
  // localStorage.setItem('spid', 'ff8080815e7f541d015e82f27fe20003')
  if (to.path.indexOf('/users/hqmm') < 0) {
    next()
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
