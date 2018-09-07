<template>
    <div>
        <backbtn></backbtn>
        <div class="needo bcontainer2 padding30lr padding30tb line-space" >
            <div class="status">{{satus_name[info.status]}}</div>
            <div class="prop top-space30">
                <ul>
                    <li><span>编号</span>{{info.sn}} </li>
                    <li><span>生成日期</span>{{info.ctime}}</li>
                    <li><span>金额</span>{{info.amt}}元</li>
                </ul>
            </div>
        </div>
        <div class="padding30lr padding30tb ">付款单明细</div>

        <div class="needo bcontainer2 padding30lr padding30tb" v-for="(item,key,index) in info.dataList" v-bind:key="index">
            <div class="cash">金额：{{item.amt}}</div>
            <div class="prop top-space30">
                <ul>
                    <li v-if="item.isSg"><span>类型</span>{{type_name[item.type]}}[手工生成]</li>
                    <li v-else><span>类型</span>{{type_name[item.type]}}</li>
                    <li v-if="item.type==1 && !item.isSg"><span>人员</span>{{item.name}}</li>
                    <li v-if="item.type==2 && !item.isSg"><span>名称</span>{{item.gdName}}</li>
                    <li><span>结算单编号</span>{{item.sn}}</li>
                    <li v-if="item.type==1"><span>工作量编号</span>{{item.tsn}}</li>
                    <li v-if="item.type==2"><span>工单号</span>{{item.tsn}}</li>
                    <li v-if="item.type==1 && !item.isSg"><span>工作量</span>{{item.num}}人月</li>
                    <li v-if="item.type==1 && !item.isSg"><span>工作量时间</span>{{item.time}}</li>
                    <li v-if="item.isSg == true"><span>备注</span>{{item.sgMemo}}<span class="linkdiv" @click="show(item.sgMemo)">[完整描述]</span></li>
                </ul>
            </div>
        </div>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade">
            <div class="mint-popup-1">
                <span>完整备注信息</span>
                <div>{{sgMemo}}</div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'skdmx',
  components: {Backbtn},
  data () {
    return {
      id: '',
      satus_name: [' ', '待确认', '有异议', '待乙方开票', '待付款', '已退票,待乙方重开', '已付款', '', '已作废'],
      type_name: [' ', '人才外包', '工单'],
      sgMemo: '',
      popupVisible: false,
      info: ''
    }
  },
  methods: {
    show: function (v) {
      this.sgMemo = v
      this.popupVisible = true
    },
    getPurchaserSettleFkDetail: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserSettleFkDetail.path
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
    this.getPurchaserSettleFkDetail()
  }
}
</script>

<style scoped>
    .status{
        color: #ffae02;
    }
    .prop span{
        width: 80px;
    }
    .mint-popup{
        border-radius: 8px;
        width: 80%;
    }
    .mint-popup-1{
        padding: 10px;
        line-height: 24px;
    }
    .mint-popup-1 span{
        font-weight: bold;
        line-height: 28px;
    }
    .linkdiv{
        width: auto;
        color: #0071b7;
        padding-left: 10px;
    }
    .cash{
        color: #0071b7;
        font-weight: bold;
    }
</style>
