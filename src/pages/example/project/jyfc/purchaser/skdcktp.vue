<template>
    <div>
        <backbtn></backbtn>
        <div class="d top-space30">
            <mt-cell title="发票类型" value="">{{info.fplx}}</mt-cell>
            <mt-cell title="发票号" value="">{{info.fpsn}}</mt-cell>
            <mt-cell title="快递类型" value="">{{info.kdlx}}</mt-cell>
            <mt-cell title="快递号码" value="">{{info.kdsn}}</mt-cell>
            <mt-cell title="寄出时间" value="">{{info.jcDate}}</mt-cell>
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
    getPurchaserSettleFpInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserSettleFpInfo.path
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
    this.getPurchaserSettleFpInfo()
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
