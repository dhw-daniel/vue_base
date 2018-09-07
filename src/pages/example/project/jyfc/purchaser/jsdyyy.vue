<template>
    <div>
        <backbtn></backbtn>
        <div class="prop top-space30 padding30lr">
            <ul>
                <li><span>金额</span>{{item.amt}}</li>
                <li v-if="item.isSg"><span>类型</span>{{type_name[item.type]}}[手工生成]</li>
                <li v-else><span>类型</span>{{type_name[item.type]}}</li>
                <li v-if="item.type==1 && item.isSg == false"><span>人员</span>{{item.name}}</li>
                <li v-if="item.type==2 && item.isSg == false"><span>名称</span>{{item.gdName}}</li>
                <li v-if="item.type ==1 &&item.isSg == false"><span>工作量</span>{{item.num}}人月</li>
                <li v-if="item.type ==1 &&item.isSg == false"><span>月份</span>{{item.time}}</li>
            </ul>
        </div>
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
  name: 'jsdyyy',
  components: {Backbtn},
  data () {
    return {
      type_name: [' ', '人才外包', '工单'],
      id: '',
      introduction: '',
      item: []
    }
  },
  methods: {
    sub: function () {
      this.savePurchaserUpdateSettleDissent()
    },
    savePurchaserUpdateSettleDissent: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserUpdateSettleDissent.path
      var obj = {id: this.id, content: this.introduction}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$toast({
            message: response.body.msg
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        } else {
          this.$toast({
            message: response.body.msg
          })
        }
      }, function (err) {
        console.log(err)
      })
    },
    getPurchaserSettleYyInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserSettleYyInfo.path
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
    this.item = this.$route.params
    this.getPurchaserSettleYyInfo()
  }
}
</script>

<style scoped>

</style>
