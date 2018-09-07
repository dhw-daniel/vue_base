<template>
    <div>
        <backbtn></backbtn>
        <div class="d top-space30">
            <mt-cell title="快递公司" value="">{{info.kdlx}}</mt-cell>
            <mt-cell title="快递单号" value="">{{info.kdsn}}</mt-cell>
            <mt-cell title="寄出时间" value="">{{info.jcDate}}</mt-cell>
            <mt-cell title="退票原因" value="">{{info.tpReason}}</mt-cell>
        </div>
    </div>

</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'skdcktp',
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
    getSupplierSettleTpInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierSettleTpInfo.path
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
    this.getSupplierSettleTpInfo()
  }
}
</script>
<style>
    .d .mint-cell-text{
        color: #999999;
        display: inline-block;
        width: 80px;
    }
    .d .mint-cell-value span{
        color: #2c3e50;
        padding-top: 15px;
        padding-bottom: 15px;
        text-align: justify;
    }
</style>
<style scoped>

</style>
