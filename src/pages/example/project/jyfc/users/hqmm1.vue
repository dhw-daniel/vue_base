<template>
    <div>
        <backbtn></backbtn>
        <div class="top-space30">
            <div class="toptip fontcolor1">请输入您注册时绑定的手机号进行验证</div>
            <mt-field placeholder="输入手机号" type="tel" v-model="phone"></mt-field>
            <mt-field placeholder="请输入验证码" v-model="msgCode">
              <mt-button size="small" type="default" v-if="sendMsgDisabled" @click="sendMsgCode">获取验证码</mt-button>
              <mt-button  size="small" type="default" v-else >{{time+'秒后获取'}}</mt-button>
            </mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click.Native="nextstep">下一步</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'hqmm1',
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
  components: {Backbtn},
  methods: {
    nextstep: function () {
      if (this.GLOBAL.empty(this.phone)) {
        this.$toast('请输入手机号')
        return false
      }
      if (!this.GLOBAL.isPhone(this.phone)) {
        this.$toast('手机格式错误')
        return false
      }
      if (this.GLOBAL.empty(this.msgCode)) {
        this.$toast('请输入验证码')
        return false
      }
      this.$router.push({name: 'hqmm2', params: {phone: this.phone, msgcode: this.msgCode}})
    },
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
    }
  }
}
</script>

<style scoped>

</style>
