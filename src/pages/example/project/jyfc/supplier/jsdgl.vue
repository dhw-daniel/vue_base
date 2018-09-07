<template>
    <div>
        <backbtn></backbtn>
        <div>
            <mt-navbar v-model="selected" :fixed="true">
                <mt-tab-item id="0">待结算</mt-tab-item>
                <mt-tab-item id="1">结算中</mt-tab-item>
                <mt-tab-item id="2">已结算</mt-tab-item>
            </mt-navbar>
        </div>
        <div class="bcontainer2 clear line-space fixdiv">
            <div class="thirddiv" @click="openPicker" id="d1"><span ref="d1span">类型</span><i class="icon iconfont">&#xe609;</i></div>
            <div class="thirddiv" @click="selecttime(3)" id="d3"><span ref="d3span">开始时间</span><i class="icon iconfont">&#xe65d;</i></div>
            <div class="thirddiv" @click="selecttime(4)" id="d4"><span ref="d4span">结束时间</span><i class="icon iconfont">&#xe65d;</i></div>
        </div>
        <div style="margin-bottom: 40px;margin-top: 101px;" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="0">
                    <div v-if="!dataNull" class="bcontainer ck1 padding30lr padding30tb line-space" v-for="(item,key,index) in list" v-bind:key="index">
                        <div class="prop">
                            <div class="cks"><input type="checkbox" class="input-check" :value="item.id" :id="item.id" v-model="ids"></div>
                            <ul>
                                <li><span>状态</span><span class="b">待结算</span></li>
                                <li><span>金额</span><strong>{{item.amt}}</strong></li>
                                <li v-if="item.isSg"><span>类型</span>{{type_name[item.type]}}[手工生成]</li>
                                <li v-else><span>类型</span>{{type_name[item.type]}}</li>
                                <li v-if="item.type==1 && item.isSg == false"><span>人员</span>{{item.name}}</li>
                                <li v-if="item.type==2 && item.isSg == false"><span>名称</span>{{item.gdName}}</li>
                                <li v-if="item.type ==1 &&item.isSg == false"><span>工作量时间</span>{{item.time}}</li>
                                <li><span class="spanfont">结算单生成日期</span>{{item.ctime}}</li>
                                <li v-if="item.jsStatus>0"><span class="spanfont">生成收款单日期</span>{{item.skTime}}</li>
                                <li v-if="item.type ==1 &&item.isSg == false"><span>工作量</span>{{item.num}}人月</li>
                                <li><span>结算单编号</span>{{item.sn}}</li>
                                <li><span v-if="item.type==2">工单编号</span><span v-else="">工作量编号</span>{{item.tsn}}</li>
                                <li v-if="item.jsStatus>0"><span>收款单编号</span>{{item.skSn}}</li>
                                <li v-if="item.isSg == true"><span class="minxtest1">备注</span><span class="minxtest" style="color:#283347">{{item.sgMemo?item.sgMemo:'暂无'}}</span><span v-if="item.sgMemo" class="linkdiv minxtest1" @click="show(item.sgMemo)">[完整备注]</span></li>
                            </ul>
                        </div>
                        <div class="vb top-space30 btncolor3"><mt-button v-if="item.isYy" size="large" type="primary" @click.Native="getlink(item.id, item)">编辑异议</mt-button><mt-button v-else size="large" type="primary" @click.Native="getlink(item.id, item)">我有异议</mt-button></div>
                    </div>
                  <mt-cell v-if="dataNull" v-bind:class="{cell: true }" title="暂无数据"></mt-cell>
                    <div class="bottom btncolor1"><mt-button size="large" type="primary" @click.native="getIds">合并开票并生成收款单</mt-button></div>
                </mt-tab-container-item>
                <mt-tab-container-item id="1">
                    <div v-if="!dataNull" class="bcontainer ck1 padding30lr padding30tb line-space" v-for="(item,key,index) in list" v-bind:key="index">
                        <div class="prop">
                            <ul>
                              <li><span>状态</span><span class="b">结算中</span><span class="b" style="font-size: 14px">[{{item.skMemo}}]</span></li>
                              <li><span>金额</span><strong>{{item.amt}}</strong></li>
                              <li v-if="item.isSg"><span>类型</span>{{type_name[item.type]}}[手工生成]</li>
                              <li v-else><span>类型</span>{{type_name[item.type]}}</li>
                              <li v-if="item.type==1 && item.isSg == false"><span>人员</span>{{item.name}}</li>
                              <li v-if="item.type==2 && item.isSg == false"><span>名称</span>{{item.gdName}}</li>
                              <li v-if="item.type ==1 &&item.isSg == false"><span>工作量时间</span>{{item.time}}</li>
                              <li><span class="spanfont">结算单生成日期</span>{{item.ctime}}</li>
                              <li v-if="item.jsStatus>0"><span class="spanfont">生成收款单日期</span>{{item.skTime}}</li>
                              <li v-if="item.type ==1 &&item.isSg == false"><span>工作量</span>{{item.num}}人月</li>
                              <li><span>结算单编号</span>{{item.sn}}</li>
                              <li><span v-if="item.type==2">工单编号</span><span v-else="">工作量编号</span>{{item.tsn}}</li>
                              <li v-if="item.jsStatus>0"><span>收款单编号</span>{{item.skSn}}</li>
                              <li v-if="item.isSg == true"><span class="minxtest1">备注</span><span class="minxtest" style="color: #283347">{{item.sgMemo?item.sgMemo:'暂无'}}</span><span v-if="item.sgMemo" class="linkdiv minxtest1" @click="show(item.sgMemo)">[完整备注]</span></li>
                            </ul>
                        </div>
                        <div class="vb top-space30 btncolor3"><mt-button v-if="item.isYy" size="large" type="primary" @click.Native="getlink(item.id, item)">编辑异议</mt-button><mt-button v-else size="large" type="primary" @click.Native="getlink(item.id, item)">我有异议</mt-button></div>
                    </div>
                  <mt-cell v-if="dataNull" v-bind:class="{cell: true }" title="暂无数据"></mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div v-if="!dataNull" class="bcontainer ck1 padding30lr padding30tb line-space" v-for="(item,key,index) in list" v-bind:key="index">
                        <div class="prop">
                            <ul>
                              <li><span>状态</span><span class="b">已结算</span></li>
                              <li><span>金额</span><strong>{{item.amt}}</strong></li>
                              <li v-if="item.isSg"><span>类型</span>{{type_name[item.type]}}[手工生成]</li>
                              <li v-else><span>类型</span>{{type_name[item.type]}}</li>
                              <li v-if="item.type==1 && item.isSg == false"><span>人员</span>{{item.name}}</li>
                              <li v-if="item.type==2 && item.isSg == false"><span>名称</span>{{item.gdName}}</li>
                              <li v-if="item.type ==1 &&item.isSg == false"><span>工作量时间</span>{{item.time}}</li>
                              <li><span class="spanfont">结算单生成日期</span>{{item.ctime}}</li>
                              <li v-if="item.jsStatus>0"><span class="spanfont">生成收款单日期</span>{{item.skTime}}</li>
                              <li v-if="item.type ==1 &&item.isSg == false"><span>工作量</span>{{item.num}}人月</li>
                              <li><span>结算单编号</span>{{item.sn}}</li>
                              <li><span v-if="item.type==2">工单编号</span><span v-else="">工作量编号</span>{{item.tsn}}</li>
                              <li v-if="item.jsStatus>0"><span>收款单编号</span>{{item.skSn}}</li>
                              <li v-if="item.isSg == true"><span class="minxtest1">备注</span><span class="minxtest" style="color: #283347">{{item.sgMemo?item.sgMemo:'暂无'}}</span><span v-if="item.sgMemo" class="linkdiv minxtest1" @click="show(item.sgMemo)">[完整备注]</span></li>
                            </ul>
                        </div>
                        <div class="vb top-space30 btncolor3"><mt-button v-if="item.isYy" size="large" type="primary" @click.Native="getlink(item.id, item)">编辑异议</mt-button><mt-button v-else size="large" type="primary" @click.Native="getlink(item.id, item)">我有异议</mt-button></div>
                    </div>
                  <mt-cell v-if="dataNull" v-bind:class="{cell: true }" title="暂无数据"></mt-cell>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div class="pop1">
            <mt-popup v-model="popupVisible" popup-transition="popup-fade">
                <div class="mint-popup-1">
                    <span>完整备注信息</span>
                    <div>{{sgMemo}}</div>
                </div>
            </mt-popup>
        </div>
        <div class="pop2">
            <mt-popup  v-model="popupVisible1" position="">
                <mt-picker :slots="d1" @change="onValuesChange" :visibleItemCount="5" :itemHeight="44"></mt-picker>
                <div><mt-button size="large" type="default" @click.Native="getv">确定</mt-button></div>
            </mt-popup>
            <mt-datetime-picker ref="time" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"  @confirm="handleConfirm"></mt-datetime-picker>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'jsdgl',
  components: {Backbtn},
  data () {
    return {
      dataNull: false,
      loading: false,
      page: 1,
      ids: [],
      ids_str: '',
      bdate: null,
      edate: null,
      type: null,
      list: [],
      type_name: [' ', '人才外包', '工单'],
      sgMemo: '',
      t: 0,
      pv: '',
      y: '',
      m: '',
      d: '',
      selected: '0',
      popupVisible: false,
      popupVisible1: false,
      pickerVisible: new Date(),
      d1: [
        {flex: 1,
          values: ['所有', '人才外包', '工单'],
          className: 'picker1',
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    getIds: function () {
      this.ids_str = this.ids.join(',')
      if (this.ids_str === '') {
        this.$toast({
          message: '请选择待结算的结算单！'
        })
        return false
      }
      this.saveSupplierSettleKp()
    },
    show: function (v) {
      this.sgMemo = v
      this.popupVisible = true
    },
    formatDate: function (d) {
      this.m = '' + (d.getMonth() + 1)
      this.d = '' + d.getDate()
      this.y = d.getFullYear()
      if (this.m.length < 2) this.m = '0' + this.m
      if (this.d.length < 2) this.d = '0' + this.d
      return [this.y, this.m, this.d].join('-')
    },
    selecttime: function (v) {
      this.t = v
      this.$refs.time.open()
    },
    openPicker: function () {
      this.popupVisible1 = true
    },
    onValuesChange (picker, values) {
      this.pv = values[0]
    },
    getv: function () {
      this.$refs.d1span.innerHTML = this.pv
      if (this.pv === '所有') {
        this.type = null
      }
      if (this.pv === '人才外包') {
        this.type = 1
      }
      if (this.pv === '工单') {
        this.type = 2
      }
      this.popupVisible1 = false
    },
    handleConfirm: function (v) {
      var data = this.formatDate(v)
      if (this.t === 3) {
        this.$refs.d3span.innerHTML = data
        this.bdate = data
      } else {
        this.$refs.d4span.innerHTML = data
        this.edate = data
      }
    },
    getlink: function (v, item) {
      this.$router.push({name: 'SupJsdyyy', params: item})
    },
    saveSupplierSettleKp: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.saveSupplierSettleKp.path
      var obj = {id: this.id, ids: this.ids_str}
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
    getSupplierSettleList: function () {
      this.loading = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierSettleList.path
      var obj = {pageNumber: this.page, bdate: this.bdate, edate: this.edate, status: this.selected, type: this.type}
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
      this.getSupplierSettleList()
    }
  },
  watch: {
    requestList (val, oldVal) {
      if (val !== 'null 0 null null' || oldVal !== 'null 0 null null') {
        // TODO此处初始化参数
        this.list = []
        this.dataNull = false
        this.loading = false
        this.page = 1
      }
      this.getSupplierSettleList()
    }
  },
  computed: {
    // 状态变换重新请求
    requestList: function () {
      return this.type + ' ' + this.selected + ' ' + this.edate + ' ' + this.bdate
    }
  },
  mounted: function () {
    var spid = localStorage.getItem('spid')
    if (spid) {
      this.getSupplierSettleList()
    }
  }
}
</script>
<style>
    .mint-tab-item-label{
        font-size: 16px;
    }
    .mint-navbar .mint-tab-item.is-selected{
        margin-bottom: 0px;
    }
</style>
<style scoped>
  .spanfont{
    font-size: 10px;
  }
    .cell{
      text-align: center;
    }
    .clear{
        overflow: auto;
        zoom: 1;
        margin-top: 65px;
    }
    .b{
        color: #0071b7;

    }
    .ck1 .prop  .b{
        text-align:left;
        text-align-last: left;
        width: auto;
    }
.ck1 .prop span{
    width: 80px;
}
    .linkdiv{
        width: auto;
        color: #0071b7;
        padding-left: 10px;
    }
    .mint-popup-1{
        padding: 10px;
        line-height: 24px;
    }
    .mint-popup-1 span{
        font-weight: bold;
        line-height: 28px;
    }
    .pop1 .mint-popup{
        border-radius: 8px;
        width: 80%;
    }
    .pop2 .mint-popup{
        width: 100%;
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
    .bottom{
        position: fixed;
        bottom: 0px;
        width: 100%;

    }
    .bottom .mint-button--large{
        border-radius: 0px;
    }
    .vb .mint-button--large{
        width: 50%;
        margin: 0 auto;
    }
    .prop{
        position: relative;
    }
    .cks{
        position: absolute;
        right: 0px;
        top: 0px;
    }
    .cks input{
        zoom: 120%;
    }
    .fixdiv{
        height: 40px;
        padding: 5px 0px;
        top: -13px;
    }
</style>
