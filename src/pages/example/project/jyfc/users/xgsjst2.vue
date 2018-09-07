<template>
    <div>
        <backbtn v-bind:route-bool="true" v-bind:route-name="'UserIndex'"></backbtn>
        <div class="top-space30">
            <div class="toptip fontcolor1">当前绑定的手机号为：{{oldPhone}}</div>
            <mt-field placeholder="请输入要绑定的新手机号" type="tel" v-model="newPhone"></mt-field>
            <mt-field placeholder="请输入验证码" v-model="msgCode">
                <mt-button size="small" type="default" v-if="sendMsgDisabled" @click="sendMsgCode">获取验证码</mt-button>
              <mt-button size="small" type="default" v-else >{{time+'秒后获取'}}</mt-button>
            </mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click="changePhone">保存</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'xgsjst2',
  components: {Backbtn},
  data () {
    return {
      sendMsgDisabled: true,
      oldPhone: '',
      newPhone: '',
      time: 60,
      msgCode: ''
    }
  },
  methods: {
    sendMsgCode () {
      if (this.GLOBAL.empty(this.newPhone)) {
        this.$toast('请输入手机号')
        return false
      }
      if (!this.GLOBAL.isPhone(this.newPhone)) {
        this.$toast('手机格式错误')
        return false
      }
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.sendMsgCode.path
      var obj = {phone: this.newPhone}
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
    changePhone () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.changePhone.path
      var obj = {nphone: this.newPhone, msgcode: this.msgCode}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((res) => {
        // console.log(res.body)
        if (res.body.ret === 1) {
          this.$toast(res.body.msg + '2秒后跳转到用户首页')
          setTimeout(() => {
            this.$router.push({name: 'UserIndex'})
          }, 2000)
        } else {
          this.$toast(res.body.msg)
        }
      })
    }
  },
  mounted: function () {
    this.oldPhone = this.$route.params.oldphone
  }
}
</script>

<style scoped>

</style>
