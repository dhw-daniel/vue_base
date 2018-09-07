<template>
    <div>
        <backbtn></backbtn>
        <div class="d top-space30">
            <mt-cell title="付款金额" value="">{{info.amt}}</mt-cell>
            <mt-cell title="付款银行" value="">{{info.fkBank}}</mt-cell>
            <mt-cell title="银行流水" value="">{{info.bankSn}}</mt-cell>
            <mt-cell title="付款时间" value="">{{info.fkDate}}</mt-cell>
        </div>
    </div>

</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'skdfkxx',
  components: {Backbtn},
  data () {
    return {
      id: '',
      info: ''
    }
  },
  methods: {
    sure: function (v) {
    },
    getSupplierSettlePayInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierSettlePayInfo.path
      var obj = {id: this.id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.info = response.body.data
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
  watch: {
  },
  mounted: function () {
    this.id = this.$route.params.id
    this.getSupplierSettlePayInfo()
  }
}
</script>
<style>
    .d .mint-cell-text{
        color: #999999;
    }
    .d .mint-cell-value span{
        color: #2c3e50;
    }
</style>
<style scoped>

</style>
