<template>
    <div>
        <backbtn></backbtn>
        <div class="prop top-space30 padding30lr">
            <ul>
                <li><span>姓名</span>{{info.name}}</li>
                <li><span>时间</span>{{info.time}}</li>
                <li><span>人月单价</span>￥{{info.qtAmt}}</li>
                <li><span>工作量</span>{{info.num}}人月</li>
                <li><span>费用</span>￥{{info.amt}}</li>
            </ul>
        </div>
        <div class="top-space30">
            <mt-field placeholder="请输入您的宝贵意见" type="textarea" rows="4" :v-model="content"></mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click.native="sub">提交</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'youyy',
  components: {Backbtn},
  data () {
    return {
      id: '',
      content: '',
      info: ''
    }
  },
  methods: {
    sub: function () {
      this.saveSupplierWrtDissent()
    },
    saveSupplierWrtDissent: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.saveSupplierWrtDissent.path
      var obj = {id: this.id, content: this.content}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$toast({
            message: response.body.msg
          })
          this.$router.go(-1)
        } else {
          this.$toast({
            message: response.body.msg
          })
        }
      }, function (err) {
        console.log(err)
      })
    },
    getSupplierWrtInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierWrtInfo.path
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
  mounted: function () {
    this.id = this.$route.params.id
    var spid = localStorage.getItem('spid')
    if (spid) {
      this.getSupplierWrtInfo()
    }
  }
}
</script>

<style scoped>
    ul{
        margin:0px;
        padding: 0px;
    }
    li{
        list-style-type:none;
        margin:0px;
        padding: 0px;
    }
</style>
