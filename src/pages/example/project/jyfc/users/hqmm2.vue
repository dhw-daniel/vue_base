<template>
    <div>
        <backbtn></backbtn>
        <div class="top-space30">
            <div class="toptip fontcolor1">请填写您的新密码</div>
            <mt-field placeholder="输入新密码" type="password" v-model="newPwd"></mt-field>
            <mt-field placeholder="确认新密码" type="password" v-model="surePwd"></mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click="changePwd">提交修改</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'hqmm2',
  components: {Backbtn},
  data () {
    return {
      newPwd: '',
      surePwd: ''
    }
  },
  methods: {
    changePwd () {
      if (this.newPwd !== this.surePwd && this.newPwd !== '') {
        this.$toast('俩次密码不一致')
        return false
      }
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.changePwd.path
      var obj = {phone: this.$route.params.phone, pwd: this.newPwd, msgcode: this.$route.params.msgcode}
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
    }
  }
}
</script>

<style scoped>

</style>
