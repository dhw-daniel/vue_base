<template>
    <div>
        <backbtn></backbtn>
        <div class="top-space30">
            <mt-field label="企业联系人" placeholder="联系人姓名" name="name" v-model="data.name"></mt-field>
            <mt-field label="联系人电话" placeholder="联系人电话" type="tel" name="phone" v-model="data.phone"></mt-field>
            <mt-field label="联系人邮箱" placeholder="联系人邮箱" type="email" name="email" v-model="data.email"></mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click.native="updateData">更新</mt-button>
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
      data: {}
    }
  },
  methods: {
    getConInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getMerchantConInfo.path
      var params = this.GLOBAL.mergeSpidParams()
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        console.log(response)
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
    },
    updateData () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.updateMerchantCon.path
      if (this.GLOBAL.empty(this.data.name)) {
        this.$toast('请输入联系人')
        return false
      }
      if (this.GLOBAL.empty(this.data.phone)) {
        this.$toast('请输入电话')
        return false
      }
      if (!this.GLOBAL.isPhone(this.data.phone)) {
        this.$toast('电话号码格式错误')
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
      this.$indicator.open({text: '正在提交...', spinnerType: 'fading-circle'})
      var obj = {name: this.data.name, phone: this.data.phone, email: this.data.email}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        this.$toast(response.body.msg)
        this.$indicator.close()
      }, function (err) {
        console.log(err)
        this.$indicator.close()
      })
    }
  },
  mounted () {
    this.getConInfo()
  }
}
</script>

<style scoped>

</style>
