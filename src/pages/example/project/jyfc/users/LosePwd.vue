<template>
    <div id="ChangePwd">
      <div v-if="oneFlag" id="ChangePwd-one">
        <input key="phone" v-model="phone" placeholder="请输入手机号"/>
        <input key="msgCodeOne" v-model="msgCode" placeholder="请输入验证码"/>
        <mt-button type="default" v-if="sendMsgDisabled" @click="sendMsgCode">请求验证码</mt-button>
        <mt-button type="default" v-else >{{time+'秒后获取'}}</mt-button>
        <mt-button @click="next">下一步</mt-button>
      </div>
      <div v-else id="ChangePwd-two">
        <input key="newPwd" v-model="newPwd" placeholder="新密码"/>
        <input key="surePwd" v-model="surePwd" placeholder="确认密码"/>
        <mt-button @click="changePwd">提交</mt-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'LosePwd',
  data () {
    return {
      time: 60,
      sendMsgDisabled: true,
      oneFlag: true,
      msgCode: '',
      phone: '',
      newPwd: '',
      surePwd: ''
    }
  },
  methods: {
    sendMsgCode () {
      if (this.GLOBAL.empty(this.phone)) {
        this.$toast('请输入手机号')
        return false
      }
      if (!this.GLOBAL.isPhone(this.phone)) {
        this.$toast('手机格式错误')
        return false
      }
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.sendMsgCode.path
      var obj = {phone: this.phone}
      var params = this.GLOBAL.mergeParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((res) => {
        // console.log(res.body)
        if (res.body.ret === 1) {
          this.sendMsgDisabled = false
          var f = setInterval(() => {
            if ((this.time--) <= 0) {
              this.time = 60
              this.sendMsgDisabled = true
              window.clearInterval(f)
            }
          }, 1000)
        }
      }, function (err) {
        console.log(err)
      })
    },
    changePwd () {
      if (this.newPwd !== this.surePwd && this.newPwd !== '') {
        this.$toast('俩次密码不一致')
        return false
      }
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.changePwd.path
      var obj = {phone: this.phone, pwd: this.pwd, msgcode: this.msgCode}
      var params = this.GLOBAL.mergeParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((res) => {
        // console.log(res.body)
        if (res.body.ret === 1) {
          this.$toast(res.body.msg + '2秒后跳转到绑定页')
          setTimeout(() => {
            this.$router.push({name: 'LogIn'})
          }, 2000)
        } else {
          this.$toast(res.body.msg)
        }
      })
    },
    next () {
      if (this.GLOBAL.empty(this.phone)) {
        this.$toast('请输入手机号')
        return false
      }
      if (!this.GLOBAL.isPhone(this.phone)) {
        this.$toast('手机格式错误')
        return false
      }
      this.oneFlag = !this.oneFlag
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
