<template>
    <div>
        <backbtn></backbtn>
        <div class="top-space30">
            <mt-field placeholder="请输入您的异议" type="textarea" rows="4" v-model="introduction"></mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click.native="sub">提交</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'fkyy',
  components: {Backbtn},
  data () {
    return {
      id: '',
      introduction: ''
    }
  },
  methods: {
    sub: function () {
      this.savePurchaserUpdateFkdDissent()
    },
    savePurchaserUpdateFkdDissent: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserUpdateFkdDissent.path
      var obj = {id: this.id, content: this.introduction}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$toast({
            message: response.body.msg
          })
        } else {
          this.$toast({
            message: response.body.msg
          })
        }
        setTimeout(() => {
          this.$router.go(-1)
        }, 1000)
      }, function (err) {
        console.log(err)
      })
    },
    getPurchaserSettleFkyyInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserSettleFkyyInfo.path
      var obj = {id: this.id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.introduction = response.body.data.content
        }
      }, function (err) {
        console.log(err)
      })
    }
  },
  mounted: function () {
    this.id = this.$route.params.id
    this.getPurchaserSettleFkyyInfo()
  }
}
</script>

<style scoped>

</style>
