<template>
    <div>
        <div>
            <div class="logo">企业账号绑定</div>
            <div class="bdinput">
                <mt-field placeholder="请输入企业账号用户名/手机号" v-model="uname"></mt-field>
                <mt-field placeholder="密码" type="password" v-model="pwd"></mt-field>
            </div>
            <div class="forget" @click="getpwd">忘记密码</div>
            <div class="borderspace top-space50 btncolor1">
                <mt-button size="large" type="primary" @click="logIn">绑定账号</mt-button>
            </div>
        </div>
        <div class="bgdiv">
            <img src="@/assets/img/bg.jpg">
        </div>
    </div>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      uname: '',
      pwd: '',
      show: false,
      code: '',
      openid: 'oQDcV1C-k6dB4dGtMxLXsAcZRLh8'
    }
  },
  methods: {
    getpwd () {
      this.$router.push({name: 'hqmm1'})
    },
    getUserInfo () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.GetUserInfo.path
      var obj = { code: this.code }
      var params = this.GLOBAL.mergeParams(obj)
      // post 传参数 需要加 {emulateJSON:true}
      // this.$http.post('in.php',{a:1,b:2},{emulateJSON:true}).then((res) => {console.log(res.body)})
      // get传参数 需要 {params: {a:1,b:2}}
      // this.$http.get('getin.php',{params: {a:1,b:2}}).then((res) => {console.log(res.body)})
      // jsonp 传参数
      // this.$http.jsonp("https://sug.so.360.cn/suggest",{params:{word:'a'}}).then((res) => {console.log(res.body)})
      this.$http.jsonp(apiUrl, {params: params}).then((res) => {
        if (res.body.ret === 1) {
          if (process.env.NODE_ENV === 'development') {
            localStorage.setItem('openId', this.openid)
          } else {
            localStorage.setItem('openId', res.body.data.openId)
          }
          if (res.body.data.isBind) {
            localStorage.setItem('spid', res.body.data.spid)
            this.$router.push({name: 'UserIndex'})
          }
        }
      }, function (err) {
        console.log(err)
      })
    },
    logIn () {
      if (!this.uname) {
        this.$toast('请输入企业账号用户名/手机号')
        return false
      }
      if (!this.pwd) {
        this.$toast('请输入密码')
        return false
      }
      if (process.env.NODE_ENV === 'development') {
        localStorage.setItem('openId', this.openid)
      }
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.SignIn.path
      var obj = {openId: localStorage.getItem('openId'), uname: this.uname, pwd: this.md5(this.pwd)}
      var params = this.GLOBAL.mergeParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((res) => {
        if (res.body.ret === 1) {
          localStorage.setItem('spid', res.body.data.spid)
          localStorage.setItem('cpid', res.body.data.cpid)
          this.$toast(res.body.msg + '1秒后跳转到首页')
          this.show = true
          this.uname = this.uname
          this.pwd = this.pwd
          setTimeout(() => {
            this.$router.push({name: 'UserIndex'})
          }, 1000)
          // this.$router.push({name: 'home', params: { userId: wise}})
        } else {
          this.$toast(res.body.msg)
        }
      }, function (err) {
        console.log(err)
      })
    }
  },
  mounted: function () {
    this.code = this.GLOBAL.getUrlKey('code')
    if (this.code) {
      this.getUserInfo()
    }
  }
}
</script>

<style scoped>
    .forget{
        padding: 0px 15px;
        float: right;
        display: inline-block;
        color:#fff;
    }
    .logo{
        padding: 70px;
        text-align: center;
        color: #fff;
    }
.bgdiv{
    position: fixed;
    bottom: -4px;
    z-index: -1;
}.bgdiv img{
    width: 100%;
 }
    .bdinput{
        margin: 15px;
    }
.bdinput .mint-field{
    border-radius: 6px;
    margin-bottom: 15px;
}
    .borderspace{

        margin-top: 120px;
    }
</style>
