<template>
    <div class="jszx">
        <backbtn v-bind:route-bool="true" v-bind:route-name="'UserIndex'"></backbtn>
        <mt-navbar v-model="selected" :fixed = false>
            <mt-tab-item v-if="role=='3'|| role=='1'" id="1">我的付款单</mt-tab-item>
            <mt-tab-item v-if="role=='3'|| role=='2'" id="2">我的收款单</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="top-space30" @click="getlink(1)">
                    <div class="clear br1 padding30lr">
                        <div class="entermore"><i class="icon iconfont">&#xe610;</i></div>
                        <div class="cl">
                            <div class="cicon"><i class="icon iconfont">&#xe641;</i></div>
                            <div  class="ctitle">结算单查询</div>
                        </div>
                        <div class="cr">
                            <ul>
                                <li><span>待结算</span>{{infoOne.wtAmt}}</li>
                                <li><span>结算中</span>{{infoOne.wtiAmt}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="top-space30"  @click="getlink(2)">
                    <div class="clear br2 padding30lr">
                        <div class="entermore"><i class="icon iconfont">&#xe610;</i></div>
                        <div class="cl">
                            <div class="cicon"><i class="icon iconfont">&#xe607;</i></div>
                            <div  class="ctitle">我的付款单</div>
                        </div>
                        <div class="cr">
                            <ul>
                                <li>您有<span>{{infoOne.wtNum5}}</span>条付款单待处理</li>
                            </ul>
                        </div>
                    </div>
                    <ul class="clist2">
                        <li>待确认<span>{{infoOne.wtNum1}}</span>条</li>
                        <li>待乙方开票<span>{{infoOne.wtNum2}}</span>条</li>
                        <li>待付款<span>{{infoOne.wtNum3}}</span>条</li>
                        <li>已退票 待乙方重开<span>{{infoOne.wtNum4}}</span>条</li>
                    </ul>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="top-space30" @click="getlink(3)">
                    <div class="clear br1 padding30lr">
                        <div class="entermore"><i class="icon iconfont">&#xe610;</i></div>
                        <div class="cl">
                            <div class="cicon"><i class="icon iconfont">&#xe641;</i></div>
                            <div  class="ctitle">结算单管理</div>
                        </div>
                        <div class="cr">
                            <ul>
                                <li class="line1"><span>待结算</span>{{infoTwo.wtAmt}}</li>
                                <li><span>结算中</span>{{infoTwo.wtiAmt}}</li>
                            </ul>
                        </div>
                    </div>
                    <ul class="clist1">
                        <li>您当前有<span>{{infoTwo.wtNum}}</span>条结算单待处理</li>
                    </ul>
                </div>
                <div class="top-space30" @click="getlink(4)">
                    <div class="clear br2 padding30lr">
                        <div class="entermore"><i class="icon iconfont">&#xe610;</i></div>
                        <div class="cl">
                            <div class="cicon"><i class="icon iconfont">&#xe670;</i></div>
                            <div class="ctitle">我的收款单</div>
                        </div>
                        <div class="cr">
                            <ul>
                                <li>您有<span>{{infoTwo.wtNum6}}</span>条收款单待处理</li>
                            </ul>
                        </div>
                    </div>
                    <ul class="clist2">
                        <li>待甲方确认<span>{{infoTwo.wtNum1}}</span>条</li>
                        <li>待开票<span>{{infoTwo.wtNum2}}</span>条</li>
                        <li>待甲方付款<span>{{infoTwo.wtNum3}}</span>条</li>
                        <li>已退票，待重开<span>{{infoTwo.wtNum4}}</span>条</li>
                        <li>已付款，待确认<span>{{infoTwo.wtNum5}}</span>条</li>
                    </ul>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'jszx',
  components: {Backbtn},
  data () {
    return {
      role: '2',
      selected: '2',
      infoOne: [],
      infoTwo: []
    }
  },
  methods: {
    getlink: function (v) {
      if (v === 1) {
        this.$router.push({name: 'PurJsdgl'})
      }
      if (v === 2) {
        this.$router.push({name: 'PurWdskd'})
      }
      if (v === 3) {
        this.$router.push({name: 'SupJsdgl'})
      }
      if (v === 4) {
        this.$router.push({name: 'SupWdskd'})
      }
    },
    getSupplierSettleInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierSettleInfo.path
      var obj = {}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.infoTwo = response.body.data
        } else {
          this.$toast({
            message: response.body.msg
          })
        }
      }, function (err) {
        console.log(err)
      })
    },
    getPurchaserSettleInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserSettleInfo.path
      var obj = {}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.infoOne = response.body.data
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
    selected (val, oldVal) { // 切换类型tab
      if (this.selected === '1' && oldVal != null) { // 甲方
        this.$router.push({name: 'PurJszx', params: {type: '1'}})
      }
      if (this.selected === '2' && oldVal != null) { // 乙方
        this.$router.push({name: 'SupJszx', params: {type: '2'}})
      }
    }
  },
  mounted: function () {
    this.role = localStorage.getItem('role')
    if (this.role === 1 || this.role === '1') {
      this.$router.push({name: 'PurJszx', params: {type: '1'}})
      return false
    }
    this.selected = this.$route.params.type
    var spid = localStorage.getItem('spid')
    if (spid) {
      if (this.role === '3') { // 双方
        this.getPurchaserSettleInfo()
        this.getSupplierSettleInfo()
      }
      if (this.role === '1') { // 甲方
        this.getPurchaserSettleInfo()
      }
      if (this.role === '2') { // 乙方
        this.getSupplierSettleInfo()
      }
    }
  }
}
</script>
<style>
    .jszx .mint-tab-item-label{
        font-size: 16px;
    }
</style>
<style scoped>
.br1{
    height: 140px;
    background: #0071b7;
    width: 100%;
}
.br2{
    height: 140px;
    background: #ffae02;
    width: 100%;
}
.clear{
    overflow: auto;
    zoom: 1;
}
    .cl,.cr{
        float: left;
    }
    .cl{
        color: #fff;
        text-align: center;
        margin-top: 27px;
    }
.cl .ctitle{
    font-size: 14px;
}
    .cl i{
        font-size: 60px;
    }
    .cl .cicon{
        padding-bottom:2px;
    }
    .cr{
        color: #fff;

        margin-left: 25px;
    }
    .entermore{
        position: absolute;
        right: 30px;
        top:45px;
    }
    .entermore i{
        font-size: 50px;
        color: rgba(255,255,255,0.7);
    }
    .br1,.br2{
        position: relative;
    }
    .br1 .cr{
        margin-top: 49px;
    }
    .br2 .cr{
        margin-top: 60px;
    }
    .br1 .cr li{
       color: #8ff3ff;
        font-size: 18px;
        padding-bottom: 5px;
    }
    .br1 .cr li span{
        font-size: 18px;
    }

    .br2 .cr li{
        font-size: 18px;
    }
    .br1 .cr li span{
        color: #fff;
        padding-right:15px ;
    }
    .br2 .cr li span{
        color: #ff5400;
        padding-left: 3px;
        padding-right: 3px;
        font-size: 18px;
    }
    .clist1,.clist2{
        line-height: 44px;
        background: #fff;
    }
    .clist1 li,.clist2 li{
        padding-left: 15px;
        color: #283347;
    }
    .clist1 li span{
        color: #0071b7;
        padding-left: 3px;
        padding-right: 3px;
    }
    .clist2 li span{
        color: #ffae02;
        padding-left: 3px;
        padding-right: 3px;
    }

</style>
