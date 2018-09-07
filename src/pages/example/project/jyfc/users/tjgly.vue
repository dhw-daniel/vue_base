<template>
    <div>
        <backbtn></backbtn>
        <div class="top-space30">
            <mt-field v-if="id != 0" class="xish" label="管理员登录用户名" placeholder="" readonly v-model="data.uname"></mt-field>
            <mt-field v-else class="xish" label="管理员登录用户名" placeholder="" v-model="data.uname"></mt-field>
            <mt-field class="xish" label="管理员登录密码" placeholder="" type="password"  v-model="data.pwd"></mt-field>
            <mt-field class="xish" label="确认密码" placeholder="" type="password"  v-model="data.repwd"></mt-field>
            <mt-field class="xish" label="管理员Email" placeholder="" type="email" v-model="data.email"></mt-field>
            <mt-field class="xish" label="管理员姓名" placeholder="" v-model="data.name"></mt-field>
            <mt-field class="xish" label="管理员手机号" placeholder="" type="tel" v-model="data.phone"></mt-field>
            <mt-field class="xish" label="短信验证码" placeholder="" v-model="data.code">
            <mt-button size="small" type="default" v-if="sendMsgDisabled" @click.native="sendMsgCode">获取验证码</mt-button>
            <mt-button size="small" type="default" v-if="!sendMsgDisabled">{{time+'秒后获取'}}</mt-button>
            </mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary"  @click.native="saveData">提交</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'qylxr',
  components: {Backbtn},
  data () {
    return {
      id: 0,
      time: 60,
      sendMsgDisabled: true,
      oldphone: 0,
      data: {}
    }
  },
  methods: {
    sendMsgCode: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.sendMsgCode.path
      if (this.GLOBAL.empty(this.data.phone)) {
        this.$toast('请输入电话')
        return false
      }
      if (!this.GLOBAL.isPhone(this.data.phone)) {
        this.$toast('手机格式错误')
        return false
      }
      this.$indicator.open({text: '发送中...', spinnerType: 'fading-circle'})
      var obj = {phone: this.data.phone}
      var params = this.GLOBAL.mergeParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        this.$toast({
          message: response.body.msg
        })
        if (response.body.ret === 1) {
          this.sendMsgDisabled = false
          var f = setInterval(() => {
            if ((this.time--) <= 0) {
              this.time = 60
              this.sendMsgDisabled = true
              window.clearInterval(f)
            }
          }, 1000)
        }
        this.$indicator.close()
      }, function (err) {
        console.log(err)
        this.$indicator.close()
      })
    },
    saveData: function () {
      if (this.GLOBAL.empty(this.data.uname)) {
        this.$toast('请输入用户名')
        return false
      }
      if (this.GLOBAL.empty(this.data.pwd)) {
        this.$toast('请输入密码')
        return false
      }
      if (this.GLOBAL.empty(this.data.repwd)) {
        this.$toast('请确认密码')
        return false
      }
      if (this.data.pwd !== this.data.repwd) {
        this.$toast('两次密码不一致')
        return false
      }
      if (this.GLOBAL.empty(this.data.name)) {
        this.$toast('请输入管理员姓名')
        return false
      }
      if (this.GLOBAL.empty(this.data.repwd)) {
        this.$toast('请确认密码')
        return false
      }
      if (this.GLOBAL.empty(this.data.email)) {
        this.$toast('请输入邮箱')
        return false
      }
      if (!this.GLOBAL.isEmail(this.data.email)) {
        this.$toast('邮箱格式错误')
        return false
      }
      if (this.GLOBAL.empty(this.data.phone)) {
        this.$toast('请输入电话')
        return false
      }
      if (!this.GLOBAL.isPhone(this.data.phone)) {
        this.$toast('手机格式错误')
        return false
      }
      if (this.GLOBAL.empty(this.data.code)) {
        this.$toast('请输入短信验证码')
        return false
      }
      this.$indicator.open({text: '正在提交...', spinnerType: 'fading-circle'})
      var apiUrl = ''
      var obj = ''
      if (this.id) {
        apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.updateMerMesg.path
        obj = {id: this.id, name: this.data.name, pwd: this.md5(this.data.pwd), code: this.data.code, email: this.data.email, phone: this.data.phone}
      } else {
        apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.saveMerMesg.path
        obj = {uname: this.data.uname, name: this.data.name, pwd: this.md5(this.data.pwd), code: this.data.code, email: this.data.email, phone: this.data.phone}
      }
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$toast({
            message: response.body.msg
          })
          setTimeout(() => {
            this.$router.push({name: 'gly'})
          }, 1000)
        } else {
          this.$toast({
            message: response.body.msg
          })
        }
        this.$indicator.close()
      }, function (err) {
        console.log(err)
        this.$indicator.close()
      })
    },
    isPhoneUse: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.isPhoneUse.path
      var obj = {phone: this.data.phone}
      var params = this.GLOBAL.mergeParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.data.result) {
          return 1
        }
        return 2
      }, function (err) {
        console.log(err)
        return 2
      })
    },
    getMerMesgInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getMerMesgInfo.path
      var obj = {id: this.id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.data = response.body.data
        } else {
          this.$toast({
            message: response.body.msg
          })
        }
      }, function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    this.id = this.$route.params.id
    if (this.id != 0) {
      this.getMerMesgInfo()
    }
  }
}
</script>

<style>
</style>
<style scoped>
  .xish >>> .mint-cell-title{
    width:130px;
  }
  .xish >>> .mint-field-core{
    margin-left: 21px;
  }
  .xish >>> .mint-button-text{
    font-size: 10px;
  }
</style>
