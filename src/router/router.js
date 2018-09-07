import Vue from 'vue'
import Router from 'vue-router'
import Md5Test from '@/pages/example/Md5Test'
import HeaderSearch from '@/pages/example/Search'
import Random from '@/pages/example/Random'
import Request from '@/pages/example/Request'
import HelloWorld from '@/pages/home/HelloWorld'
import HomeIndex from '@/pages/home/HomeIndex'
import UsersIndex from '@/pages/users/UsersIndex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/md5test', name: 'Md5Test', component: Md5Test, desc: '', meta: {title: ''}},
    {path: '/search', name: 'HeaderSearch', component: HeaderSearch, desc: '', meta: {title: ''}},
    {path: '/random', name: 'Random', component: Random, desc: '', meta: {title: ''}},
    {path: '/api', name: 'Api', component: Request, desc: '', meta: {title: ''}},
    {path: '/', name: 'HelloWorld', component: HelloWorld, desc: '首页', meta: {title: 'vue_base'}},
    {path: '/index', name: 'HomeIndex', component: HomeIndex, desc: '首页', meta: {title: 'vue_base'}},
    {path: '/users/index', name: 'UsersIndex', component: UsersIndex, desc: '用户首页', meta: {title: '用户中心'}
    }
  ]
})
