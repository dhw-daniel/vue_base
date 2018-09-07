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
                      <mt-search
                        v-bind:class = "{sercher:true}"
                        v-model="title"
                        placeholder="需求名称/需求编号">
                      </mt-search>
                    </div>
                    <div class="datebtn">
                      <div class="halfdiv bcontainer2">
                        <div class="halfdiv" @click="openPicker" id="d2"><span ref="d2span">发布状态</span><i class="icon iconfont">&#xe609;</i></div>
                        <div class="halfdiv" @click="openPicker" id="d1"><span ref="d1span">确认状态</span><i class="icon iconfont">&#xe609;</i></div>
                      </div>
                      <div class="halfdiv bcontainer2">
                        <div class="halfdiv" @click="btime"><span ref="d3date1span">创建时间</span><i class="icon iconfont">&#xe65d;</i></div>
                        <div class="halfdiv" @click="etime"><span ref="d4date1span">创建时间</span><i class="icon iconfont">&#xe65d;</i></div>
                      </div>
                    </div>
                </div>

                <div class="rq1content" v-infinite-scroll="loadMore"
                     infinite-scroll-disabled="loadingOne"
                     infinite-scroll-distance="10">
                    <div v-if="!dataNullOne" class="needo bcontainer2 padding30lr padding30tb line-space" v-for="(item,key,index) in listOne" v-bind:key="index">
                        <div class="more" v-on:click="showDetail(item.id,1)"><i class="icon iconfont">&#xe66a;</i>  </div>
                        <div class="req" v-on:click="showDetail(item.id,1)">{{item.name}}<div class="new" v-if="false"><i class="icon iconfont">&#xe618;</i></div> </div>
                        <div class="prop top-space30" v-on:click="showDetail(item.id,1)">
                            <ul>
                                <li><span>编号</span><strong>{{item.sn}}</strong></li>
                                <li><span>创建时间</span><strong>{{item.ctime}}</strong></li>
                                <li><span>发布状态</span>{{gd_pubStatus[item.pubStatus]}}</li>
                                <li><span>确认状态</span>{{gd_confStatus[item.confStatus]}}</li>
                            </ul>
                        </div>
                        <div class="top-space30 btncolor1">
                          <a style="color: #6aaeec" v-on:click="chakanG(item.id)">查看岗位信息</a>
                        </div>
                        <div class="btngroup">
                          <div class="op borderspace top-space30 btncolor1" v-if="item.pubStatus==0">
                            <mt-button size="large" type="primary" @click.native="fabu(item.id)">发布</mt-button>
                          </div>
                          <div class="op borderspace top-space30 btncolor3" v-if="item.pubStatus==0">
                            <mt-button size="large" type="primary"  @click.native="bianji()">编辑</mt-button>
                          </div>
                          <div class="op borderspace top-space30 btncolor1" v-if="item.confStatus==0">
                            <mt-button size="large" type="primary" @click.native="queren(item.id)">确认</mt-button>
                          </div>
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
                    <mt-search
                      v-bind:class = "{sercher2:true}"
                      v-model="title"
                      placeholder="需求名称/需求编号">
                    </mt-search>
                    <div class="halfdiv bcontainer3" @click="openPicker" id="d3"><span ref="d3span">结算状态</span><i class="icon iconfont">&#xe609;</i></div>
                  </div>
                  <div class="datebtn">
                    <div class="halfdiv bcontainer2">
                      <div class="halfdiv" @click="openPicker" id="d4"><span ref="d4span">项目状态</span><i class="icon iconfont">&#xe609;</i></div>
                      <div class="halfdiv" @click="openPicker" id="d5"><span ref="d5span">确认状态</span><i class="icon iconfont">&#xe609;</i></div>
                    </div>
                    <div class="halfdiv bcontainer2">
                      <div class="halfdiv" @click="btime"><span ref="d3date2span">创建时间</span><i class="icon iconfont">&#xe65d;</i></div>
                      <div class="halfdiv" @click="etime"><span ref="d4date2span">创建时间</span><i class="icon iconfont">&#xe65d;</i></div>
                    </div>
                  </div>
                </div>

                <div class="rq1content" v-infinite-scroll="loadMore"
                     infinite-scroll-disabled="loadingTwo"
                     infinite-scroll-distance="10">
                    <div v-if="!dataNullTwo" class="needo bcontainer2 padding30lr padding50tb line-space"  v-for="(item,key,index) in listTwo" v-bind:key="index">
                        <div class="more" @click="showDetail(item.id,2)"><i class="icon iconfont">&#xe66a;</i>  </div>
                        <div class="req" @click="showDetail(item.id,2)">{{item.name}}</div>
                        <div class="prop top-space30" @click="showDetail(item.id,2)">
                            <ul>
                                <li><span>编号</span>{{item.sn}}</li>
                                <li><span>创建时间</span>{{item.ctime}}</li>
                                <li><span>项目状态</span><strong>{{gd_statusName[item.status+1]}}</strong></li>
                                <li><span>确认状态</span><strong>{{gd_k_confStatusName[item.confStatus]}}</strong></li>
                                <li><span>结算状态</span><strong>{{gd_jsStatusName[item.jsStatus]}}</strong></li>
                            </ul>
                        </div>
                        <div class="btngroup">
                          <div class="op borderspace top-space30 btncolor1" v-if="item.status == -1">
                            <mt-button size="large" type="primary" @click.native="fabu(item.id)">发布</mt-button>
                          </div>
                          <div class="op borderspace top-space30 btncolor3" v-if="item.status == -1">
                            <mt-button size="large" type="primary"  @click.native="bianji()">编辑</mt-button>
                          </div>
                          <div class="op borderspace top-space30 btncolor3" v-if="item.confStatus == 0">
                            <mt-button size="large" type="primary"  @click.native="queren(item.id)">确认</mt-button>
                          </div>
                          <div class="op borderspace top-space30 btncolor3" v-if="item.status == 2">
                            <mt-button size="large" type="primary"  @click.native="yanshou(item.id)">确认验收</mt-button>
                          </div>
                        </div>
                    </div>
                    <mt-cell-swipe  v-bind:class="{ cell: true }" v-if="dataNullTwo" title="暂无数据"></mt-cell-swipe>
                    <div v-if="!loadingTwo" style="min-height:48px;line-height:48px;">
                      <mt-spinner type="triple-bounce" :size="45"></mt-spinner>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
              <div class="rq1top">
                  <div class="bcontainer2">
                    <mt-search
                      v-bind:class = "{sercher:true}"
                      v-model="title"
                      placeholder="需求名称/需求编号">
                    </mt-search>
                  </div>
                  <div class="datebtn">
                    <div class="halfdiv bcontainer2 bcontainer3">
                      <div class="halfdiv width100" @click="openPicker" id="d6"><span ref="d6span">发布状态</span><i class="icon iconfont">&#xe609;</i></div>
                    </div>
                    <div class="halfdiv bcontainer2 bcontainer4">
                      <div class="halfdiv" @click="btime"><span ref="d3date3span">创建时间</span><i class="icon iconfont">&#xe65d;</i></div>
                      <div class="halfdiv" @click="etime"><span ref="d4date3span">创建时间</span><i class="icon iconfont">&#xe65d;</i></div>
                    </div>
                  </div>
                </div>
                <div class="rq2content" v-infinite-scroll="loadMore"
                     infinite-scroll-disabled="loadingThree"
                     infinite-scroll-distance="10">
                    <div v-if="!dataNullThree" class="needo bcontainer2 padding30lr padding50tb line-space"  v-for="(item,key,index) in listThree" v-bind:key="index">
                        <div class="more" @click="showDetail(item.id,3)"><i class="icon iconfont">&#xe66a;</i> </div>
                        <div class="req" @click="showDetail(item.id,3)">{{item.name}}</div>
                        <div class="prop top-space30" @click="showDetail(item.id,3)">
                            <ul>
                                <li><span>编号</span>{{item.sn}}</li>
                                <li><span>创建时间</span>{{item.ctime}}</li>
                                <li><span>发布状态</span>{{item.isPub?'已发布':'未发布'}}</li>
                            </ul>
                        </div>
                        <div class="btngroup">
                          <div class="op borderspace top-space30 btncolor1" v-if="!item.isPub">
                            <mt-button size="large" type="primary" @click.native="fabu(item.id)">发布</mt-button>
                          </div>
                          <div class="op borderspace top-space30 btncolor3" v-if="!item.isPub">
                            <mt-button size="large" type="primary"  @click.native="bianji()">编辑</mt-button>
                          </div>
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
            <mt-picker :slots="d1" @change="onValuesChange" :visibleItemCount = 5 :itemHeight = 44></mt-picker>
            <div><mt-button size="large" type="default" @click.Native="getv">确定</mt-button></div>
          </mt-popup>
          <mt-popup  v-model="popupVisible2" position="">
            <mt-picker :slots="d2" @change="onValuesChange" :visibleItemCount=5 :itemHeight=44></mt-picker>
            <div><mt-button size="large" type="default" @click.Native="getv">确定</mt-button></div>
          </mt-popup>
          <mt-popup  v-model="popupVisible3" position="">
            <mt-picker :slots="d3" @change="onValuesChange" :visibleItemCount = 5 :itemHeight = 44></mt-picker>
            <div><mt-button size="large" type="default" @click.Native="getv">确定</mt-button></div>
          </mt-popup>
          <mt-popup  v-model="popupVisible4" position="">
            <mt-picker :slots="d4" @change="onValuesChange" :visibleItemCount=5 :itemHeight=44></mt-picker>
            <div><mt-button size="large" type="default" @click.Native="getv">确定</mt-button></div>
          </mt-popup>
          <mt-popup  v-model="popupVisible5" position="">
            <mt-picker :slots="d5" @change="onValuesChange" :visibleItemCount = 5 :itemHeight = 44></mt-picker>
            <div><mt-button size="large" type="default" @click.Native="getv">确定</mt-button></div>
          </mt-popup>
          <mt-popup  v-model="popupVisible6" position="">
            <mt-picker :slots="d6" @change="onValuesChange" :visibleItemCount=5 :itemHeight=44></mt-picker>
            <div><mt-button size="large" type="default" @click.Native="getv">确定</mt-button></div>
          </mt-popup>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  components: {Backbtn},
  data () {
    return {
      title: null,
      timer: null,
      gd_confStatus: ['待确认', '已确认', '修订中'],
      gd_pubStatus: ['未发布', '已发布'],
      gd_jsStatusName: ['待结算', '结算中', '已结算'],
      gd_statusName: ['未发布', '未开始', '进行中', '待验收', '已完成'],
      gd_k_confStatusName: ['待确认', '已确认', '修改中'],
      confStatus: null,
      pubStatus: null,
      jsStatus: null,
      status: null,
      k_confStatus: null,
      z_pubStatus: null,
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
      selected: null,
      orgDate: new Date(2017, 0, 1),
      startDate: new Date(2017, 0, 1),
      bdate: '',
      edate: '',
      c: '0',
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      popupVisible4: false,
      popupVisible5: false,
      popupVisible6: false,
      col: null,
      y: '',
      m: '',
      d: '',
      pv1: '确认状态',
      pv2: '发布状态',
      pv3: '结算状态',
      pv4: '项目状态',
      pv5: '确认状态',
      pv6: '发布状态',
      d1: [
        {flex: 1,
          values: ['所有', '待确认', '已确认', '修订中'],
          className: 'picker1',
          textAlign: 'center'
        }
      ],
      d2: [
        {flex: 1,
          values: ['所有', '未发布', '已发布'],
          className: 'picker1',
          textAlign: 'center'
        }
      ],
      d3: [
        {flex: 1,
          values: ['所有', '待结算', '结算中', '已结算'],
          className: 'picker1',
          textAlign: 'center'
        }
      ],
      d4: [
        {flex: 1,
          values: ['所有', '未发布', '未开始', '进行中', '待验收', '已完成'],
          className: 'picker1',
          textAlign: 'center'
        }
      ],
      d5: [
        {flex: 1,
          values: ['所有', '待确认', '已确认', '修改中'],
          className: 'picker1',
          textAlign: 'center'
        }
      ],
      d6: [
        {flex: 1,
          values: ['所有', '未发布', '已发布'],
          className: 'picker1',
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    loadMore: function () {
      if (this.pageOne > 1 && !this.loadingOne) {
        if (this.selected === '1') { // 人才外包
          this.getPurchaserDemandTalentList()
        }
      }
      if (this.pageTwo > 1 && !this.loadingTwo) {
        if (this.selected === '2') { // 快捷工单
          this.getPurchaserDemandWoList()
        }
      }
      if (this.pageThree > 1 && !this.loadingThree) {
        if (this.selected === '3') { // 项目整包
          this.getPurchaserDemandWholeList()
        }
      }
    },
    chakanG: function (id) {
      this.$router.push({name: 'PurRcwbxq', params: {id: id, type: '1'}})
    },
    fabu: function (id) {
      this.$messagebox.confirm('发布需求后，将不能修改和删除该需求，您确定发布该需求吗？', '发布').then(action => {
        if (this.selected === '1') {
          this.savePurchaserDemandTalentPub(id)
        }
        if (this.selected === '2') {
          this.savePurchaserDemandWoPub(id)
        }
        if (this.selected === '3') {
          this.savePurchaserDemandWholePub(id)
        }
      })
    },
    bianji: function () {
      this.$messagebox('提示', '编辑需求请移步到甲乙方程平台(www.garyee.com)我的需求操作，谢谢！')
    },
    queren: function (id) {
      this.$messagebox.confirm('确认需求信息，则表示您对该需求内容没有任何异议，您确定要确认该需求吗？', '确认').then(action => {
        if (this.selected === '2') {
          this.savePurchaserDemandWoConf(id)
        }
        if (this.selected === '1') {
          this.savePurchaserDemandTalentConf(id)
        }
      })
    },
    yanshou: function (id) {
      this.$messagebox.confirm('您确定确认验收该快捷工单需求吗？', '确认验收').then(action => {
        if (this.selected === '2') {
          this.savePurchaserDemandWoCheck(id)
        }
      })
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
        this.$refs.d3date1span.innerHTML = formDate
        this.$refs.d4date1span.innerHTML = '创建时间'
        this.$refs.d3date2span.innerHTML = formDate
        this.$refs.d4date2span.innerHTML = '创建时间'
        this.$refs.d3date3span.innerHTML = formDate
        this.$refs.d4date3span.innerHTML = '创建时间'
        this.edate = ''
      }
      if (this.c === '4') {
        this.edate = formDate
        this.$refs.d4date1span.innerHTML = formDate
        this.$refs.d4date2span.innerHTML = formDate
        this.$refs.d4date3span.innerHTML = formDate
      }
    },
    showworker: function (id, fid) {
      this.$router.push({name: 'PurYbmry', params: {id: id, fid: fid}})
    },
    onValuesChange (picker, values) {
      if (this.col === 'd1') {
        this.pv1 = values[0]
      }
      if (this.col === 'd2') {
        this.pv2 = values[0]
      }
      if (this.col === 'd3') {
        this.pv3 = values[0]
      }
      if (this.col === 'd4') {
        this.pv4 = values[0]
      }
      if (this.col === 'd5') {
        this.pv5 = values[0]
      }
      if (this.col === 'd6') {
        this.pv6 = values[0]
      }
    },
    openPicker: function (event) {
      this.col = event.currentTarget.id
      if (this.col === 'd1') {
        this.popupVisible1 = true
      }
      if (this.col === 'd2') {
        this.popupVisible2 = true
      }
      if (this.col === 'd3') {
        this.popupVisible3 = true
      }
      if (this.col === 'd4') {
        this.popupVisible4 = true
      }
      if (this.col === 'd5') {
        this.popupVisible5 = true
      }
      if (this.col === 'd6') {
        this.popupVisible6 = true
      }
    },
    getv: function () {
      this.$refs.d1span.innerHTML = this.pv1
      this.$refs.d2span.innerHTML = this.pv2
      this.$refs.d3span.innerHTML = this.pv3
      this.$refs.d4span.innerHTML = this.pv4
      this.$refs.d5span.innerHTML = this.pv5
      this.$refs.d6span.innerHTML = this.pv6
      this.initReq()
    },
    initReq: function () {
      this.popupVisible1 = false
      this.popupVisible2 = false
      this.popupVisible3 = false
      this.popupVisible4 = false
      this.popupVisible5 = false
      this.popupVisible6 = false
      this.loadingOne = false
      this.dataNullOne = false
      this.pageOne = '1'
      this.listOne = []
      this.loadingTwo = false
      this.dataNullTwo = false
      this.pageTwo = '1'
      this.listTwo = []
      this.loadingThree = false
      this.dataNullThree = false
      this.pageThree = '1'
      this.listThree = []
      if (this.selected === '1') { // 人才外包
        this.getPurchaserDemandTalentList()
      }
      if (this.selected === '2') { // 快捷工单
        this.getPurchaserDemandWoList()
      }
      if (this.selected === '3') { // 项目整包
        this.getPurchaserDemandWholeList()
      }
    },
    comp: function () {
      this.$toast({
        message: '发起验收请移步到甲乙方程平台(www.garyee.com)我的需求-工单外包操作，谢谢！',
        duration: 3000
      })
    },
    showDetail: function (id, type) {
      if (type === 1) {
        this.$router.push({name: 'PurRcwbxq', params: {id: id, type: '2'}})
      }
      if (type === 2) {
        this.$router.push({name: 'PurKjgdxq', params: {id: id}})
      }
      if (type === 3) {
        this.$router.push({name: 'PurXmzbxq', params: {id: id}})
      }
    },
    getPurchaserDemandTalentList: function () {
      this.loadingOne = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserDemandTalentList.path
      var obj = {}
      obj = {pageNumber: this.pageOne, bdate: this.bdate, edate: this.edate, confStatus: this.confStatus, pubStatus: this.pubStatus, title: this.title}
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
    getPurchaserDemandWholeList: function () {
      this.loadingThree = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserDemandWholeList.path
      var obj = {pageNumber: this.pageThree, isPub: this.z_pubStatus, title: this.title, bdate: this.bdate, edate: this.edate}
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
    getPurchaserDemandWoList: function () {
      this.loadingTwo = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserDemandWoList.path
      var obj = {}
      obj = {pageNumber: this.pageTwo, status: this.status, jsStatus: this.jsStatus, confStatus: this.k_confStatus, title: this.title, bdate: this.bdate, edate: this.edate}
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
    },
    savePurchaserDemandTalentPub: function (id) {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserDemandTalentPub.path
      var obj = {id: id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        this.$toast({
          message: response.body.msg
        })
        if (response.body.ret === 1) {
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
        }
      }, function (err) {
        console.log(err)
      })
    },
    savePurchaserDemandWoPub: function (id) {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserDemandWoPub.path
      var obj = {id: id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        this.$toast({
          message: response.body.msg
        })
        if (response.body.ret === 1) {
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
        }
      }, function (err) {
        console.log(err)
      })
    },
    savePurchaserDemandTalentConf: function (id) {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserDemandTalentConf.path
      var obj = {id: id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        this.$toast({
          message: response.body.msg
        })
        if (response.body.ret === 1) {
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
        }
      }, function (err) {
        console.log(err)
      })
    },
    savePurchaserDemandWoConf: function (id) {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserDemandWoConf.path
      var obj = {id: id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        this.$toast({
          message: response.body.msg
        })
        if (response.body.ret === 1) {
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
        }
      }, function (err) {
        console.log(err)
      })
    },
    savePurchaserDemandWoCheck: function (id) {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserDemandWoCheck.path
      var obj = {id: id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        this.$toast({
          message: response.body.msg
        })
        if (response.body.ret === 1) {
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
        }
      }, function (err) {
        console.log(err)
      })
    },
    savePurchaserDemandWholePub: function (id) {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserDemandWholePub.path
      var obj = {id: id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        this.$toast({
          message: response.body.msg
        })
        if (response.body.ret === 1) {
          setTimeout(() => {
            location.reload()
          }, 2000)
        }
      }, function (err) {
        console.log(err)
      })
    }
  },
  watch: {
    selected (val, oldVal) { // 切换类型tab
      this.pv1 = '确认状态'
      this.pv2 = '发布状态'
      this.pv3 = '结算状态'
      this.pv4 = '项目状态'
      this.pv5 = '确认状态'
      this.pv6 = '发布状态'
      this.$refs.d3date1span.innerHTML = '创建时间'
      this.$refs.d4date1span.innerHTML = '创建时间'
      this.$refs.d3date2span.innerHTML = '创建时间'
      this.$refs.d4date2span.innerHTML = '创建时间'
      this.$refs.d3date3span.innerHTML = '创建时间'
      this.$refs.d4date3span.innerHTML = '创建时间'
      this.edate = ''
      this.bdate = ''
      if (this.selected === '1' && oldVal != null) { // 人才外包
        this.loadingOne = false
        this.dataNullOne = false
        this.pageOne = '1'
        this.listOne = []
        this.$router.push({name: 'PurWdxq', params: {type: '1'}})
        this.getPurchaserDemandTalentList()
      }
      if (this.selected === '2' && oldVal != null) { // 快捷工单
        this.loadingTwo = false
        this.dataNullTwo = false
        this.pageTwo = '1'
        this.listTwo = []
        console.log('b')
        this.$router.push({name: 'PurWdxq', params: {type: '2'}})
        this.getPurchaserDemandWoList()
      }
      if (this.selected === '3' && oldVal != null) { // 项目整包
        this.loadingThree = false
        this.dataNullThree = false
        this.pageThree = '1'
        this.listThree = []
        this.$router.push({name: 'PurWdxq', params: {type: '3'}})
        this.getPurchaserDemandWholeList()
      }
    },
    edate (val, oldVal) { // 时间变换
      if (this.selected === '1' && this.bdate !== '' && val !== '') { // 人才外包
        this.loadingOne = false
        this.dataNullOne = false
        this.pageOne = '1'
        this.listOne = []
        this.getPurchaserDemandTalentList()
      }
      if (this.selected === '2' && this.bdate !== '' && val !== '') { // 快捷工单
        this.loadingTwo = false
        this.dataNullTwo = false
        this.pageTwo = '1'
        this.listTwo = []
        this.getPurchaserDemandWoList()
      }
      if (this.selected === '3' && this.bdate !== '' && val !== '') { // 项目整包
        this.loadingThree = false
        this.dataNullThree = false
        this.pageThree = '1'
        this.listThree = []
        this.getPurchaserDemandWholeList()
      }
    },
    bdate (val, oldVal) { // 时间变换
      if (this.selected === '1' && this.bdate !== '') { // 人才外包
        this.loadingOne = false
        this.dataNullOne = false
        this.pageOne = '1'
        this.listOne = []
        this.getPurchaserDemandTalentList()
      }
      if (this.selected === '2' && this.bdate !== '') { // 快捷工单
        this.loadingTwo = false
        this.dataNullTwo = false
        this.pageTwo = '1'
        this.listTwo = []
        this.getPurchaserDemandWoList()
      }
      if (this.selected === '3' && this.bdate !== '') { // 项目整包
        this.loadingThree = false
        this.dataNullThree = false
        this.pageThree = '1'
        this.listThree = []
        this.getPurchaserDemandWholeList()
      }
    },
    pv1 (val, oldVal) { // 确认状态变化
      if (this.selected === '1') { // 人才外包
        if (val === '所有') {
          this.confStatus = null
        }
        if (val === '待确认') {
          this.confStatus = 0
        }
        if (val === '已确认') {
          this.confStatus = 1
        }
        if (val === '修订中') {
          this.confStatus = 2
        }
      }
    },
    pv2 (val, oldVal) { // 发布状态变化
      if (this.selected === '1') { // 人才外包
        if (val === '所有') {
          this.pubStatus = null
        }
        if (val === '未发布') {
          this.pubStatus = 0
        }
        if (val === '已发布') {
          this.pubStatus = 1
        }
      }
    },
    pv3 (val, oldVal) { // 结算状态变化
      if (this.selected === '2') { // 快捷工单
        if (val === '所有') {
          this.jsStatus = null
        }
        if (val === '待结算') {
          this.jsStatus = 0
        }
        if (val === '结算中') {
          this.jsStatus = 1
        }
        if (val === '已结算') {
          this.jsStatus = 2
        }
      }
    },
    pv4 (val, oldVal) { // 项目状态变化
      if (this.selected === '2') { // 快捷工单
        if (val === '所有') {
          this.status = null
        }
        if (val === '未发布') {
          this.status = -1
        }
        if (val === '未开始') {
          this.status = 0
        }
        if (val === '进行中') {
          this.status = 1
        }
        if (val === '待验收') {
          this.status = 2
        }
        if (val === '已完成') {
          this.status = 3
        }
      }
    },
    pv5 (val, oldVal) { // 确认状态变化
      if (this.selected === '2') { // 快捷工单
        if (val === '所有') {
          this.k_confStatus = null
        }
        if (val === '待确认') {
          this.k_confStatus = 0
        }
        if (val === '已确认') {
          this.k_confStatus = 1
        }
        if (val === '修改中') {
          this.k_confStatus = 2
        }
      }
    },
    pv6 (val, oldVal) { // 发布状态变化
      if (this.selected === '3') { // 整包需求
        if (val === '所有') {
          this.z_pubStatus = null
        }
        if (val === '未发布') {
          this.z_pubStatus = false
        }
        if (val === '已发布') {
          this.z_pubStatus = true
        }
      }
    },
    title (val, oldVal) { // 搜索变化
      if (val === '') {
        this.title = null
      }
      if (val !== null || oldVal !== null) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.initReq()
        }, 300)
      }
    }
  },
  mounted: function () {
    this.selected = this.$route.params.type
    this.nowDate = this.GLOBAL.getNowDay()
    this.getPurchaserDemandTalentList()
    this.getPurchaserDemandWoList()
    this.getPurchaserDemandWholeList()
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
    .sercher .mint-searchbar{
      background-color: white;
    }
    .sercher2 .mint-searchbar{
      background-color: white;
      width: auto;
    }

</style>
<style scoped>
    .cell{
      text-align: center;
    }
    .sercher{
      background-color: white;
      margin-bottom:1px;
      height: 100%;
    }
    .sercher2{
      float:left;
      margin-bottom:1px;
      height: 100%;
      width: 65%;
    }
    .op{
      display: inline-block;
      width: 120px;
    }
    .btngroup{
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
        margin-top: 161px;
    }
    .rq2top{
        position: fixed;
        z-index: 90;
        top: 52px;
        background: #f0eff5;
        width: 100%;
    }
    .rq2content{
         margin-top: 160px;
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
        font-size: 18px;
        color: #6aaeec;
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
    .bcontainer3{
      width: 35%;
    }
    .bcontainer4{
      width: 65%;
    }
    .width100{
      width: 100%;
    }
</style>
