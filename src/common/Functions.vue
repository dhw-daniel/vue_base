<script type="text/javascript">
import md5 from 'js-md5'
import configs from './Configs'

// 得到当前url的参数
function getUrlKey (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
}
// 得到当前时间戳 精确到秒 后三位补000
function getNowTimes () {
  return Date.parse(new Date())
}
// 得到加密后的sign
function getSign (times) {
  return md5(times + configs.md5Key)
}
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 得到今天的日期
function getNowDay () {
  var day = new Date()
  var Year = 0
  var Month = 0
  var Day = 0
  var CurrentDate = ''
  Year = day.getFullYear()
  Month = day.getMonth() + 1
  Day = day.getDate()
  CurrentDate += Year + '-'
  if (Month >= 10) {
    CurrentDate += Month + '-'
  } else {
    CurrentDate += '0' + Month + '-'
  }
  if (Day >= 10) {
    CurrentDate += Day
  } else {
    CurrentDate += '0' + Day
  }
  return CurrentDate
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (empty(o[key])) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
  接口处理函数-合并公共参数
*/
function mergeBaseParams (params) {
  var times = getNowTimes()
  var sign = getSign(times)
  var com = {appid: configs.appid, timestamp: times, sign: sign}
  var obj = filterNull(params)
  var o = Object.assign(com, obj)
  return o
}

/*
  接口处理函数-合并公共参数
*/
function mergeParams (params) {
  var times = getNowTimes()
  var sign = getSign(times)
  var spid = localStorage.getItem('spid')
  var com = {appid: configs.appid, timestamp: times, sign: sign, spid: spid}
  var obj = filterNull(params)
  var o = Object.assign(com, obj)
  return o
}

/*
* 非空验证
* */
function empty (str) {
  if (str === '' || str === null || str === undefined) {
    return true
  } else {
    return false
  }
}

function isPhone (str) {
  return /(^((\d{11})|(\d{7,8})|(\d{4}|\d{3})-(\d{7,8}))$)/g.test(str)
}

function isEmail (str) {
  return /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)/g.test(str)
}

export default
{
  getUrlKey,
  getNowTimes,
  filterNull,
  getSign,
  empty,
  isPhone,
  isEmail,
  mergeBaseParams,
  mergeParams,
  getNowDay
}
</script>
