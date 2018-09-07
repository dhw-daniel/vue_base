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
                        <li v-if="item.status==4 || item.status==7 || item.status==6" @click="getlink(2, item.id)">发票</li>
                        <li v-if="item.status==7" @click="getlink(3, item.id)">款项</li>
                        <li v-if="item.status==2" @click="getlink(5, item.yy)" class="ybg">异议</li>
                    </ul>
                </div>
                <div class="status"  @click="getlink(1, item.id)">{{statusName[item.status]}}</div>
                <div class="prop top-space30"  @click="getlink(1, item.id)">
                    <ul>
                        <li><span>编号</span>{{item.sn}}</li>
                        <li><span>生成日期</span>{{item.ctime}}</li>
                        <li><span>金额</span>{{item.amt}}</li>
                    </ul>
                </div>
              <div class="btngroup">
                <div class="op borderspace top-space30 btncolor1" v-if="item.status==1">
                  <mt-button v-if="true" size="large" type="primary" @click.native.stop="comp(1,item.id,item.amt)">确认付款单</mt-button>
                </div>
                <div class="op borderspace top-space30 btncolor3" v-if="item.status==1">
                  <mt-button v-if="true" size="large" type="primary" @click.native.stop="comp(2,item.id,item.amt)">有异议</mt-button>
                </div>
                <div class="op borderspace top-space30 btncolor1" v-if="item.status==4">
                  <mt-button v-if="true" size="large" type="primary" @click.native.stop="comp(4,item.id,item.amt)">登记付款</mt-button>
                </div>
                <div class="op borderspace top-space30 btncolor3" v-if="item.status==4">
                  <mt-button v-if="true" size="large" type="primary" @click.native.stop="comp(3,item.id,item.amt)">登记退票</mt-button>
                </div>
                <div class="op borderspace top-space30 btncolor1" v-if="item.status==5">
                  <mt-button v-if="true" size="large" type="primary" @click.native.stop="comp(6,item.id,item.amt)">编辑退票</mt-button>
                </div>
                <div class="op borderspace top-space30 btncolor1" v-if="item.status==6">
                  <mt-button v-if="true" size="large" type="primary" @click.native.stop="comp(5,item.id,item.amt)">编辑付款</mt-button>
                </div>
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
      btnvalue: ['', '确认付款单', '作废', '登记发票', '编辑发票', '登记发票', '确认已收款', ''],
      statusName: ['', '待确认', '有异议', '待乙方开票', '待付款', '已退票，待乙方重开', '已付款', '已付款', '已作废'],
      list: [],
      d1: [
        {flex: 1,
          values: ['所有', '待确认', '有异议', '待乙方开票', '待付款', '已退票，待乙方重开', '已付款', '已作废'],
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
        for (var j = 0, len = this.statusName.length; j < len; j++) {
          if (this.statusName[j] === this.pv) {
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
        this.$router.push({name: 'PurSkdmx', params: {id: id}})
      }
      if (v === 2) { // 发票
        this.$router.push({name: 'PurSkdcktp', params: {id: id}})
      }
      if (v === 3) { // 款项
        this.$router.push({name: 'PurSkdfkxx', params: {id: id}})
      }
      if (v === 5) { // 有异议
        this.memo = id
        this.popupVisible1 = true
      }
    },
    comp: function (v, id, amt) {
      if (v === 2) { // 有异议
        this.$router.push({name: 'PurFkyy', params: {id: id}})
      } else if (v === 1) { // 确认付款
        this.$messagebox.confirm('确认付款单后，乙方将开发票与您进行结算，您确定确认该付款单吗？', '确认付款单').then(action => {
          this.savePurchaserUpdateConfirmFkd(id)
        })
      } else if (v === 4) { // 登记付款
        this.$router.push({name: 'PurFkdfk', params: {id: id, amt: amt, type: 'dengji'}})
      } else if (v === 5) { // 编辑付款
        this.$router.push({name: 'PurFkdfk', params: {id: id, amt: amt, type: 'bianji'}})
      } else if (v === 3) { // 登记发票
        this.$router.push({name: 'PurFkdfp', params: {id: id, type: 'dengji'}})
      } else if (v === 6) { // 编辑发票
        this.$router.push({name: 'PurFkdfp', params: {id: id, type: 'bianji'}})
      } else {
      }
    },
    savePurchaserUpdateConfirmFkd: function (id) { // 确认付款单
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserUpdateConfirmFkd.path
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
    getPurchaserSettleFkList: function () {
      this.loading = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserSettleFkList.path
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
      this.getPurchaserSettleFkList()
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
      this.getPurchaserSettleFkList()
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
      this.getPurchaserSettleFkList()
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
    .op{
      display: inline-block;
      width: 120px;
    }
    .btngroup{
      text-align: center;
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
