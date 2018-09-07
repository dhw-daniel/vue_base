<template>
    <div>
        <backbtn></backbtn>
        <div class="bcontainer2 clear fixdiv">
            <div class="thirddiv" @click="openPicker" id="d1"><span ref="d1span">状态</span><i class="icon iconfont">&#xe609;</i></div>
            <div class="thirddiv" @click="selecttime(3)" id="d3"><span ref="d3span">开始时间</span><i class="icon iconfont">&#xe65d;</i></div>
            <div class="thirddiv" @click="selecttime(4)" id="d4"><span ref="d4span">结束时间</span><i class="icon iconfont">&#xe65d;</i></div>
        </div>

        <div style="margin-top: 50px"  v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
            <div v-if="!dataNull" class="needo bcontainer2 padding30lr padding30tb line-space" v-for="(item,key,index) in list" v-bind:key="index">
                <div class="oplist">
                    <ul>
                        <li @click="getlink(1, item.id)">明细</li>
                        <li v-if="item.status==6 || item.status==7" @click="getlink(2, item.id)">发票</li>
                        <li v-if="item.status==6 || item.status==7" @click="getlink(3, item.id)">款项</li>
                        <li v-if="item.status==5" @click="getlink(4, item.id)" class="ybg">退票</li>
                        <li v-if="item.status==2" @click="getlink(5, item.yy)" class="ybg">异议</li>
                    </ul>
                </div>
                <div class="status"  @click="getlink(1, item.id)">{{d1[0]['values'][item.status]}}</div>
                <div class="prop top-space30"  @click="getlink(1, item.id)">
                    <ul>
                        <li><span>编号</span>{{item.sn}}</li>
                        <li><span>生成日期</span>{{item.ctime}}</li>
                        <li><span>金额</span>{{item.amt}}</li>
                    </ul>
                </div>
                <div class="top-space30 btncolor1 op">
                    <mt-button v-if="item.status>1 && item.status<7" size="large" type="primary" @click.native.stop="comp(item.status,item.id)">{{btnvalue[item.status]}}</mt-button>
                </div>
            </div>
            <mt-cell v-if="dataNull" v-bind:class="{cell: true }" title="暂无数据"></mt-cell>
        </div>
        <div class="pop2">
            <mt-popup  v-model="popupVisible" position="">
                <mt-picker :slots="d1" @change="onValuesChange" :visibleItemCount="7" :itemHeight="44"></mt-picker>
                <div><mt-button size="large" type="default" @click.native="getv">确定</mt-button></div>
            </mt-popup>
            <mt-datetime-picker ref="time" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"  @confirm="handleConfirm"></mt-datetime-picker>
        </div>
        <div class="pop3">
            <mt-popup v-model="popupVisible1" popup-transition="popup-fade">
                <div class="mint-popup-1">
                    <span>异议内容</span>
                    <div>{{memo}}</div>
                </div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'wdskd',
  components: {Backbtn},
  data () {
    return {
      dataNull: false,
      loading: false,
      page: 1,
      bdate: null,
      edate: null,
      status: null,
      memo: null,
      popupVisible: false,
      popupVisible1: false,
      t: 0,
      pv: '',
      pickerVisible: new Date(),
      btnvalue: ['', '', '作废', '登记发票', '编辑发票', '登记发票', '确认已收款', ''],
      list: [],
      d1: [
        {flex: 1,
          values: ['所有', '待甲方确认', '甲方有异议', '待开票', '待甲方付款', '已退票待重开', '已付款待确认', '已收款', '已作废'],
          className: 'picker1',
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    selecttime: function (v) {
      this.t = v
      this.$refs.time.open()
    },
    formatDate: function (d) {
      this.m = '' + (d.getMonth() + 1)
      this.d = '' + d.getDate()
      this.y = d.getFullYear()
      if (this.m.length < 2) this.m = '0' + this.m
      if (this.d.length < 2) this.d = '0' + this.d
      return [this.y, this.m, this.d].join('-')
    },
    openPicker: function () {
      this.popupVisible = true
    },
    onValuesChange (picker, values) {
      this.pv = values[0]
    },
    getv: function () {
      this.$refs.d1span.innerHTML = this.pv
      if (this.pv === '所有') {
        this.status = null
      } else {
        for (var j = 0, len = this.d1[0].values.length; j < len; j++) {
          if (this.d1[0].values[j] === this.pv) {
            this.status = j
          }
        }
      }
      this.popupVisible = false
    },
    handleConfirm: function (v) {
      var date = this.formatDate(v)
      if (this.t === 3) {
        this.bdate = date
        this.$refs.d3span.innerHTML = date
      } else {
        this.edate = date
        this.$refs.d4span.innerHTML = date
      }
    },
    getlink: function (v, id) {
      if (v === 1) { // 明细
        this.$router.push({name: 'SupSkdmx', params: {id: id}})
      }
      if (v === 2) { // 发票
        this.$router.push({name: 'SupSkdckfp', params: {id: id}})
      }
      if (v === 3) { // 款项
        this.$router.push({name: 'SupSkdfkxx', params: {id: id}})
      }
      if (v === 4) { // 退票
        this.$router.push({name: 'SupSkdcktp', params: {id: id}})
      }
      if (v === 5) { // 有异议
        this.memo = id
        this.popupVisible1 = true
      }
    },
    comp: function (v, id) {
      if (v === 2) { // 作废
        this.$messagebox.confirm('作废后，您需要到结算单管理页面重新选择结算，您确定要作废该收款单么？', '作废').then(action => {
          this.saveSupplierSettleCancel(id)
        })
      } else if (v === 6) { // 确认付款
        this.$messagebox.confirm('您确认已收到甲方款项么？', '确认已收款').then(action => {
          this.saveSupplierSettlePayConfirm(id)
        })
      } else {
        this.$router.push({name: 'SupSkddjfp', params: {id: id}})
      }
    },
    saveSupplierSettleCancel: function (id) { // 作废收款单
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.saveSupplierSettleCancel.path
      var obj = {id: id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$toast({
            message: response.body.msg
          })
          setTimeout(() => {
            this.$router.go(0)
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
    saveSupplierSettlePayConfirm: function (id) { // 确认收款单
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.saveSupplierSettlePayConfirm.path
      var obj = {id: id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$toast({
            message: response.body.msg
          })
          setTimeout(() => {
            this.$router.go(0)
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
    getSupplierSettleSkList: function () {
      this.loading = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierSettleSkList.path
      var obj = {pageNumber: this.page, bdate: this.bdate, edate: this.edate, status: this.status}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.list = this.list.concat(response.body.data.dataList)
          ++this.page
          if (this.list.length > 0) {
            this.dataNull = false
          } else {
            this.dataNull = true
          }
          if (response.body.data.dataList.length < 15) {
            this.loading = true
          } else {
            this.loading = false
          }
        } else {
          this.$toast({
            message: response.body.msg
          })
        }
      }, function (err) {
        console.log(err)
      })
    },
    loadMore: function () {
      this.getSupplierSettleSkList()
    }
  },
  watch: {
    requestList (val, oldVal) {
      if (val !== 'null null null' || oldVal !== 'null null null') {
        // TODO此处初始化参数
        this.list = []
        this.dataNull = false
        this.loading = false
        this.page = 1
      }
      this.getSupplierSettleSkList()
    }
  },
  computed: {
    // 状态变换重新请求
    requestList: function () {
      return this.status + ' ' + this.edate + ' ' + this.bdate
    }
  },
  mounted: function () {
    var spid = localStorage.getItem('spid')
    if (spid) {
      this.getSupplierSettleSkList()
    }
  }
}
</script>
<style>

</style>
<style scoped>
    .cell{
      text-align: center;
    }
    .clear{
        overflow: auto;
        zoom: 1;
    }
    .op  .mint-button--primary{
        margin: 0 auto;
        width: 40%;
    }
    .thirddiv{
        float: left;
        height: 40px;
        line-height: 40px;
        width: 33.33%;
        text-align: center;
        color: #99a7c1;
        background: #fff;
    }
    .pop2 .mint-popup{
        width: 100%;
    }
    .status{
        color: #ffae02;
    }
    .needo{
        position: relative;
    }
    .oplist{
        position: absolute;
        right: 0px;
        top:8px;
    }
    .oplist ul li{
        background:#99a7c1;
        color: #fff;
        -moz-border-radius-topleft: 6px;
        -moz-border-radius-bottomleft: 6px;
        -webkit-border-top-left-radius: 6px;
        -webkit-border-bottom-left-radius: 6px;
        padding: 6px 10px;
        margin-bottom: 10px;
        text-decoration: underline;
    }
    .oplist ul .ybg{
        background:#ffae02;
    }
    .fixdiv{
        height: 40px;
        padding: 5px 0px;
        top: 0px;
    }
    .mint-popup-1{
        padding: 10px;
        line-height: 24px;
    }
    .mint-popup-1 span{
        font-weight: bold;
        line-height: 28px;
    }
    .pop3 .mint-popup{
        border-radius: 8px;
        width: 80%;
    }

</style>
