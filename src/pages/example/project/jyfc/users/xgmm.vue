<template>
    <div>
        <backbtn v-bind:route-bool="true" v-bind:route-name="'UserIndex'"></backbtn>
        <div class="top-space30">
            <mt-field label="输入旧密码" placeholder="输入旧密码" type="password"  v-model="oldPwd"></mt-field>
            <mt-field label="设置新密码" placeholder="6-15位/字母/字符组合" type="password"  v-model="newPwd"></mt-field>
            <mt-field label="确认新密码" placeholder="再次确认新密码" type="password"  v-model="surePwd"></mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click="changePwd">保存</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'xgmm',
  components: {Backbtn},
  data () {
    return {
      oldPwd: '',
      newPwd: '',
      surePwd: ''
    }
  },
  methods: {
    changePwd () {
      if (this.newPwd !== this.surePwd && this.newPwd !== '') {
        this.$toast('输入的俩次密码不一致')
        return false
      }
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.changeOldPwd.path
      var obj = {opwd: this.oldPwd, npwd: this.newPwd}
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
  }
}
</script>

<style scoped>

</style>
