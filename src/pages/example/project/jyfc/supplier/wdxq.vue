<template>
    <div class="myreq">
        <backbtn v-bind:route-bool="true" v-bind:route-name="'UserIndex'"></backbtn>
        <div class="line-space">
            <mt-navbar v-model="selected" :fixed = true>
                <mt-tab-item id="1" >人才外包</mt-tab-item>
                <mt-tab-item id="2">快捷工单</mt-tab-item>
                <mt-tab-item id="3">项目整包</mt-tab-item>
            </mt-navbar>
        </div>
        <div>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="rq1top">
                    <div class="bcontainer2">
                        <div class="halfdiv" @click="btime" id="d3"><span ref="d3span">派单开始时间</span><i class="icon iconfont">&#xe65d;</i></div>
                        <div class="halfdiv" @click="etime" id="d4"><span ref="d4span">派单结束时间</span><i class="icon iconfont">&#xe65d;</i></div>
                    </div>
                    <div class="datebtn">
                        <mt-button type="default" @click.Native="clickit(null)" :class="{ckbtn:null==curbtn}">全部</mt-button>
                        <mt-button type="default" @click.Native="clickit(1)" :class="{ckbtn:1==curbtn}">一周内</mt-button>
                        <mt-button type="default" @click.Native="clickit(2)" :class="{ckbtn:2==curbtn}">一个月内</mt-button>
                        <mt-button type="default" @click.Native="clickit(3)" :class="{ckbtn:3==curbtn}">三个月内</mt-button>
                    </div>
                </div>

                <div class="rq1content" v-infinite-scroll="loadMore"
                     infinite-scroll-disabled="loadingOne"
                     infinite-scroll-distance="10">
                    <div v-if="!dataNullOne" class="needo bcontainer2 padding30lr padding30tb line-space" v-for="(item,key,index) in listOne" v-bind:key="index" @click="showDetail(item.id,1,item.fid,item.enrollStatus)">
                        <div class="more"><i class="icon iconfont">&#xe66a;</i> </div>
                        <div class="req">{{item.name}}<div class="new" v-if="item.enrollStatus<2"><i class="icon iconfont">&#xe618;</i></div> </div>
                        <div class="prop top-space30">
                            <ul>
                                <li><span>派单时间</span><strong>{{item.disDate}}</strong></li>
                                <li><span>报名时间</span><strong>{{item.beginDate}}至{{item.endDate}}</strong><div class="tip1 tipc1 " v-if="item.enrollStatus==0">未开始</div><div class="tip1" v-if="item.enrollStatus==1">报名中</div><div class="tip1 tipc2" v-if="item.enrollStatus==2">已结束</div></li>
                                <li><span>工作地点</span>{{item.workAddr}}</li>
                                <li><span>联系人</span>{{item.conName}}</li>
                                <li><span>联系电话</span>{{item.conPhone}}</li>
                            </ul>
                        </div>
                        <div class="top-space30 btncolor1">
                            <mt-button size="large" type="primary" @click.Native.stop="showworker(item.id, item.fid)" v-if="item.isBm">查看已报名人员</mt-button>
                        </div>
                    </div>
                    <div v-if="!loadingOne" style="min-height:48px;line-height:48px;">
                      <mt-spinner type="triple-bounce" :size="45"></mt-spinner>
                    </div>
                </div>
              <mt-cell-swipe v-if="dataNullOne" v-bind:class="{ cell: true }" title="暂无数据"></mt-cell-swipe>
            </mt-tab-container-item>

            <mt-tab-container-item id="2">
                <div class="rq1top">
                    <div class="bcontainer2">
                        <div class="halfdiv" @click="openPicker" id="d1"><span ref="d1span">项目状态</span><i class="icon iconfont">&#xe609;</i></div>
                        <div class="halfdiv" @click="openPicker" id="d2"><span ref="d2span">结算状态</span><i class="icon iconfont">&#xe609;</i></div>
                    </div>
                    <div class="datebtn">
                      <mt-button type="default" @click.Native="clickit(null)" :class="{ckbtn:null==curbtn}">全部</mt-button>
                      <mt-button type="default" @click.Native="clickit(1)" :class="{ckbtn:1==curbtn}">一周内</mt-button>
                      <mt-button type="default" @click.Native="clickit(2)" :class="{ckbtn:2==curbtn}">一个月内</mt-button>
                      <mt-button type="default" @click.Native="clickit(3)" :class="{ckbtn:3==curbtn}">三个月内</mt-button>
                    </div>
                </div>

                <div class="rq1content" v-infinite-scroll="loadMore"
                     infinite-scroll-disabled="loadingTwo"
                     infinite-scroll-distance="10">
                    <div v-if="!dataNullTwo" class="needo bcontainer2 padding30lr padding50tb line-space"  v-for="(item,key,index) in listTwo" v-bind:key="index" @click="showDetail(item.id,2,item.fid)">
                        <div class="more"><i class="icon iconfont">&#xe66a;</i> </div>
                        <div class="req">{{item.name}}</div>
                        <div class="prop top-space30">
                            <ul>
                                <li><span>派单时间</span><strong>{{item.disDate}}</strong></li>
                                <li><span>工单编号</span>{{item.sn}}</li>
                                <li><span>工单金额</span>{{item.amt}}</li>
                                <li><span>联系人</span>{{item.conName}}</li>
                                <li><span>联系电话</span>{{item.conPhone}}</li>
                                <li><span>项目状态</span><strong>{{gd_statusName[item.status]}}</strong></li>
                                <li><span>结算状态</span><strong class="fontcolor2">{{gd_jsstatusName[item.jsStatus]}}</strong></li>
                            </ul>
                        </div>
                        <div class="top-space30 btncolor1">
                            <mt-button size="large" type="primary" @click.Native.stop="comp" v-if="item.status==1">发起验收</mt-button>
                        </div>
                    </div>
                    <mt-cell-swipe  v-bind:class="{ cell: true }" v-if="dataNullTwo" title="暂无数据"></mt-cell-swipe>
                    <div v-if="!loadingTwo" style="min-height:48px;line-height:48px;">
                      <mt-spinner type="triple-bounce" :size="45"></mt-spinner>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div class="rq2top">
                    <div class="datebtn">
                        <mt-button type="default" @click.Native="clickit(null)" :class="{ckbtn:null==curbtn}">全部</mt-button>
                        <mt-button type="default" @click.Native="clickit(1)" :class="{ckbtn:1===curbtn}">一周内</mt-button>
                        <mt-button type="default" @click.Native="clickit(2)" :class="{ckbtn:2===curbtn}">一个月内</mt-button>
                        <mt-button type="default" @click.Native="clickit(3)" :class="{ckbtn:3===curbtn}">三个月内</mt-button>
                    </div>
                </div>
                <div class="rq2content" v-infinite-scroll="loadMore"
                     infinite-scroll-disabled="loadingThree"
                     infinite-scroll-distance="10">
                    <div v-if="!dataNullThree" class="needo bcontainer2 padding30lr padding50tb line-space"  v-for="(item,key,index) in listThree" v-bind:key="index" @click="showDetail(item.id,3,item.fid)">
                        <div class="more"><i class="icon iconfont">&#xe66a;</i> </div>
                        <div class="req">{{item.name}}</div>
                        <div class="prop top-space30">
                            <ul>
                                <li><span>派单时间</span><strong>{{item.disDate}}</strong></li>
                                <li><span>编号</span>{{item.sn}}</li>
                                <li><span>上线时间</span>{{item.preDate}}</li>
                                <li><span>预算上限</span>{{item.preAmt}}</li>
                                <li><span>项目实施</span>{{item.name}}</li>
                                <li><span>联系人</span>{{item.conName}}</li>
                                <li><span>联系电话</span>{{item.conPhone}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <mt-cell-swipe v-bind:class="{ cell: true }" v-if="dataNullThree" title="暂无数据"></mt-cell-swipe>
                <div v-if="!loadingThree" style="min-height:48px;line-height:48px;">
                  <mt-spinner type="triple-bounce" :size="45"></mt-spinner>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        </div>
        <div>
            <mt-datetime-picker ref="picker" type="date" :startDate="startDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm">
            </mt-datetime-picker>
          <mt-popup  v-model="popupVisible1" position="">
            <mt-picker :slots="d3" @change="onValuesChange1" :visibleItemCount = 5 :itemHeight = 44></mt-picker>
            <div><mt-button size="large" type="default" @click.Native="getv">确定</mt-button></div>
          </mt-popup>
          <mt-popup  v-model="popupVisible2" position="">
            <mt-picker :slots="d4" @change="onValuesChange2" :visibleItemCount=5 :itemHeight=44></mt-picker>
            <div><mt-button size="large" type="default" @click.Native="getv">确定</mt-button></div>
          </mt-popup>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'wdxq',
  components: {Backbtn},
  data () {
    return {
      gd_statusName: ['预留', '进行中', '待验收', '已完成'],
      gd_jsstatusName: ['待结算', '结算中', '已结算'],
      gd_status: null,
      gd_jsstatus: null,
      nowDate: '',
      dataNullOne: false,
      loadingOne: false,
      dataNullTwo: false,
      loadingTwo: false,
      dataNullThree: false,
      loadingThree: false,
      pageOne: '1',
      pageTwo: '1',
      pageThree: '1',
      listOne: [],
      listTwo: [],
      listThree: [],
      curbtn: null,
      selected: null,
      orgDate: new Date(2017, 0, 1),
      startDate: new Date(2017, 0, 1),
      bdate: '',
      edate: '',
      c: '0',
      popupVisible1: false,
      popupVisible2: false,
      y: '',
      m: '',
      d: '',
      pv1: '所有',
      pv2: '所有',
      d3: [
        {flex: 1,
          values: ['所有', '进行中', '待验收', '已完成'],
          className: 'picker1',
          textAlign: 'center'
        }
      ],
      d4: [
        {flex: 1,
          values: ['所有', '待结算', '结算中', '已结算'],
          className: 'picker1',
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    loadMore: function () {
      if (this.selected === '1') { // 人才外包
        this.getSupplierDemandTalentList()
      }
      if (this.selected === '2' && !this.popupVisible1 && !this.popupVisible2) { // 快捷工单
        this.getSupplierDemandWoList()
      }
      if (this.selected === '3') { // 项目整包
        this.getSupplierDemandWholeList()
      }
    },
    clickit: function (v) {
      this.curbtn = v
    },
    showTimeBoard: function () {
      this.$refs.picker.open()
    },
    formatDate: function (d) {
      this.m = '' + (d.getMonth() + 1)
      this.d = '' + d.getDate()
      this.y = d.getFullYear()
      if (this.m.length < 2) this.m = '0' + this.m
      if (this.d.length < 2) this.d = '0' + this.d
      return [this.y, this.m, this.d].join('-')
    },
    btime: function () {
      this.c = '3'
      if (this.startDate > this.orgDate) {
        this.startDate = this.orgDate
      }
      this.showTimeBoard()
    },
    etime: function () {
      this.c = '4'
      this.showTimeBoard()
    },
    handleConfirm: function (value) {
      var formDate = this.formatDate(value)
      if (this.c === '3') {
        this.startDate = value
        this.bdate = formDate
        this.$refs.d3span.innerHTML = formDate
        this.$refs.d4span.innerHTML = '派单结束时间'
        this.edate = null
      }
      if (this.c === '4') {
        this.edate = formDate
        this.$refs.d4span.innerHTML = formDate
      }
    },
    showworker: function (id, fid) {
      this.$router.push({name: 'SupYbmry', params: {id: id, fid: fid}})
    },
    onValuesChange1 (picker, values) {
      console.log(picker.getSlotValue(values[0]))
      this.pv1 = values[0]
    },
    onValuesChange2 (picker, values) {
      this.pv2 = values[0]
    },
    openPicker: function (event) {
      this.col = event.currentTarget.id
      if (this.col === 'd1') {
        this.popupVisible1 = true
      } else if (this.col === 'd2') {
        this.popupVisible2 = true
      }
    },
    getv: function () {
      if (this.col === 'd1') {
        this.$refs.d1span.innerHTML = this.pv1
      } else if (this.col === 'd2') {
        this.$refs.d2span.innerHTML = this.pv2
      }
      this.popupVisible1 = false
      this.popupVisible2 = false
      this.getSupplierDemandWoList(1)
    },
    comp: function () {
      this.$toast({
        message: '发起验收请移步到甲乙方程平台(www.garyee.com)我的需求-工单外包操作，谢谢！',
        duration: 3000
      })
    },
    showDetail: function (id, type, fid, status = 0) {
      if (type === 1) {
        this.$router.push({name: 'SupRcwbxq', params: {id: id, fid: fid, status: status}})
      }
      if (type === 2) {
        this.$router.push({name: 'SupKjgdxq', params: {id: id}})
      }
      if (type === 3) {
        this.$router.push({name: 'SupXmzbxq', params: {id: id, fid: fid}})
      }
    },
    getSupplierDemandTalentList: function (type) {
      this.loadingOne = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierDemandTalentList.path
      var obj = {}
      if (type) {
        obj = {pageNumber: this.pageOne, type: this.curbtn, bdate: this.bdate, edate: this.edate}
      } else {
        obj = {pageNumber: this.pageOne, type: this.curbtn}
      }
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.listOne = this.listOne.concat(response.body.data.dataList)
          ++this.pageOne
          if (this.listOne.length > 0) {
            this.dataNullOne = false
          } else {
            this.dataNullOne = true
          }
          if (response.body.data.dataList.length < 15) {
            this.loadingOne = true
          } else {
            this.loadingOne = false
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
    getSupplierDemandWholeList: function () {
      this.loadingThree = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierDemandWholeList.path
      var obj = {pageNumber: this.pageThree, type: this.curbtn}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.listThree = this.listThree.concat(response.body.data.dataList)
          ++this.pageThree
          if (this.listThree.length > 0) {
            this.dataNullThree = false
          } else {
            this.dataNullThree = true
          }
          if (response.body.data.dataList.length < 15) {
            this.loadingThree = true
          } else {
            this.loadingThree = false
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
    getSupplierDemandWoList: function (type) {
      this.loadingTwo = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierDemandWoList.path
      var obj = {}
      if (type) {
        obj = {pageNumber: this.pageTwo, type: this.curbtn, status: this.gd_status, jsStatus: this.gd_jsstatus}
      } else {
        obj = {pageNumber: this.pageTwo, type: this.curbtn}
      }
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.listTwo = this.listTwo.concat(response.body.data.dataList)
          ++this.pageTwo
          if (this.listTwo.length > 0) {
            this.dataNullTwo = false
          } else {
            this.dataNullTwo = true
          }
          if (response.body.data.dataList.length < 15) {
            this.loadingTwo = true
          } else {
            this.loadingTwo = false
          }
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
      this.curbtn = null // 日期高亮取消
      this.pv1 = '所有'
      this.pv2 = '所有'
      if (this.selected === '1' && oldVal != null) { // 人才外包
        this.loadingOne = false
        this.dataNullOne = false
        this.pageOne = '1'
        this.listOne = []
        this.$refs.d3span.innerHTML = '派单开始时间'
        this.$refs.d4span.innerHTML = '派单结束时间'
        this.$router.push({name: 'SupWdxq', params: {type: '1'}})
        // this.getSupplierDemandTalentList()
      }
      if (this.selected === '2' && oldVal != null) { // 快捷工单
        this.loadingTwo = false
        this.dataNullTwo = false
        this.pageTwo = '1'
        this.listTwo = []
        this.$refs.d1span.innerHTML = '项目状态'
        this.$refs.d2span.innerHTML = '结算状态'
        this.$router.push({name: 'SupWdxq', params: {type: '2'}})
        // this.getSupplierDemandWoList()
      }
      if (this.selected === '3' && oldVal != null) { // 项目整包
        this.loadingThree = false
        this.dataNullThree = false
        this.pageThree = '1'
        this.listThree = []
        this.$router.push({name: 'SupWdxq', params: {type: '3'}})
        // this.getSupplierDemandWholeList()
      }
    },
    curbtn (val, oldVal) { // 切换时间tab
      if (this.selected === '1' && this.curbtn !== null) { // 人才外包
        this.loadingOne = false
        this.dataNullOne = false
        this.pageOne = '1'
        this.listOne = []
        this.getSupplierDemandTalentList()
      }
      if (this.selected === '2' && this.curbtn !== null) { // 快捷工单
        this.loadingTwo = false
        this.dataNullTwo = false
        this.pageTwo = '1'
        this.listTwo = []
        this.getSupplierDemandWoList()
      }
      if (this.selected === '3' && this.curbtn !== null) { // 项目整包
        this.loadingThree = false
        this.dataNullThree = false
        this.pageThree = '1'
        this.listThree = []
        this.getSupplierDemandWholeList()
      }
    },
    edate (val, oldVal) { // 时间变换
      if (this.selected === '1' && this.edate !== '派单结束时间') { // 人才外包
        this.curbtn = null
        this.loadingOne = false
        this.dataNullOne = false
        this.pageOne = '1'
        this.listOne = []
        this.getSupplierDemandTalentList(1) // 有起止时间默认没有起止时间
      }
    },
    bdate (val, oldVal) { // 时间变换
      if (this.selected === '1' && this.edate !== '派单开始时间') { // 人才外包
        this.curbtn = null
        this.loadingOne = false
        this.dataNullOne = false
        this.pageOne = '1'
        this.listOne = []
        this.getSupplierDemandTalentList(1) // 有起止时间默认没有起止时间
      }
    },
    pv1 (val, oldVal) { // 项目状态变化
      if (this.selected === '2') { // 快捷工单
        this.loadingTwo = false
        this.dataNullTwo = false
        this.pageTwo = '1'
        this.listTwo = []
        if (val === '所有') {
          this.gd_status = null
        }
        if (val === '进行中') {
          this.gd_status = 1
        }
        if (val === '待验收') {
          this.gd_status = 2
        }
        if (val === '已完成') {
          this.gd_status = 3
        }
      }
    },
    pv2 (val, oldVal) { // 结算状态变化
      if (this.selected === '2') { // 快捷工单
        this.loadingTwo = false
        this.dataNullTwo = false
        this.pageTwo = '1'
        this.listTwo = []
        if (val === '所有') {
          this.gd_jsstatus = null
        }
        if (val === '待结算') {
          this.gd_jsstatus = 0
        }
        if (val === '结算中') {
          this.gd_jsstatus = 1
        }
        if (val === '已结算') {
          this.gd_jsstatus = 2
        }
      }
    }
  },
  mounted: function () {
    this.selected = this.$route.params.type
    this.nowDate = this.GLOBAL.getNowDay()
    this.getSupplierDemandTalentList()
    this.getSupplierDemandWoList()
    this.getSupplierDemandWholeList()
  }
}
</script>
<style>
    .myreq .mint-tab-item-label{
        font-size: 16px;
        font-weight: bold;
    }
    .mint-navbar .mint-tab-item.is-selected{
        margin-bottom: 0px;
    }
</style>
<style scoped>
    .cell{
      text-align: center;
    }
    .rq1top{
        position: fixed;
        z-index: 90;
        top: 52px;
        padding-top: 15px;
        background: #f0eff5;
        width: 100%;
    }

    .rq1content{
        margin-top: 142px;
    }
    .rq2top{
        position: fixed;
        z-index: 90;
        top: 52px;
        background: #f0eff5;
        width: 100%;
    }
    .rq2content{
         margin-top: 80px;
     }
    .needo{
        position: relative;
        font-size: 14px;
    }
    .needo strong{
        color:#26a2ff;
    }
    .datebtn .mint-button--default{
        background-color: #fff;
        color:#26a2ff;
        height: 32px;
        margin: 10px;
        margin-right: 0px;
        font-size: 14px;
    }
    .datebtn  .ckbtn{
        color: #fff;
        background-color:#0071b7;
    }
    .bcontainer2{
        overflow: auto;
        zoom: 1;
    }
    .halfdiv{
        text-align: center;
        color: #99a7c1;
    }
    .bcontainer2 i{
        margin-left: 10px;
    }
    .more{
        position: absolute;
        right: 15px;
    }
    .more i{
        font-size: 26px;
        color: #999999;
    }
    .req{
        font-size: 18px;
        position: relative;
    }
    .req .new{
        display: inline-block;
        position: relative;
        height: 15px;
        width: 24px;
    }
    .req i{
        color: #ff4e00;
        font-size: 28px;
        margin: 0px;
        line-height: 18px;
        height: 18px;
        position: absolute;
        top: 0px;
        left: 8px;
    }
    .tip1{
        background: #0071b7;
        display: inline-block;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        border-radius: 18px;
        padding-left: 6px;
        padding-right: 6px;
        color: #fff;
        margin-left: 14px;
    }
    .tipc1{
        background: #ffae02;
    }
    .tipc2{
        background: #84888f;
    }
    .mint-popup{
        width: 100%;
    }
    .needo .fontcolor2{
        color: #ffae02;
    }
</style>
