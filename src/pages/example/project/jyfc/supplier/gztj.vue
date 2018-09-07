<template>
    <div class="searchdiv top-space30">
        <backbtn v-bind:route-bool="true" v-bind:route-name="'UserIndex'"></backbtn>
        <div class="fixdiv">
            <mt-search
                v-model="keyword"
                placeholder="人员姓名">
            </mt-search>
            <div class="bcontainer2 fourline">
                <div class="halfdiv bcontainer2">
                    <div class="halfdiv" @click="openPicker" id="d1"><span ref="d1span">确认状态</span><i class="icon iconfont">&#xe609;</i></div>
                    <div class="halfdiv" @click="openPicker" id="d2"><span ref="d2span">结算状态</span><i class="icon iconfont">&#xe609;</i></div>
                </div>
                <div class="halfdiv bcontainer2">
                    <div class="halfdiv" @click="openPicker" id="d3"><span ref="d3span">开始时间</span><i class="icon iconfont">&#xe65d;</i></div>
                    <div class="halfdiv" @click="openPicker" id="d4"><span ref="d4span">结束时间</span><i class="icon iconfont">&#xe65d;</i></div>
                </div>
            </div>
        </div>
        <div class="top-space30" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10" style="margin-top: 93px;">
            <div v-if="!dataNull" class="jso bcontainer2 padding30lr padding30tb line-space" v-for="(item,key,index) in list" v-bind:key="index">
                <div class="more" @click="viewdetial(item.id,item.isAttence)"><i class="icon iconfont">&#xe66a;</i> </div>
                <div class="user" @click="viewdetial(item.id,item.isAttence)">{{item.name}}<span v-if="!item.isConfirm" class="status1">[待确认]</span><span v-if="item.isConfirm" class="status1">[已确认]</span><span class="status2">[{{jsStatusName[item.jsStatus]}}]</span></div>
                <div class="prop top-space30" @click="viewdetial(item.id,item.isAttence)">
                    <ul>
                        <li><span>编号</span>{{item.sn}}</li>
                        <li><span>时间</span><strong>{{item.time}}</strong></li>
                        <li><span>工作量</span><strong>{{item.num}}人月</strong></li>
                        <li><span>费用</span><strong>{{item.amt}}</strong></li>
                        <li><span>需求名称</span>{{item.dtName}}</li>
                        <li><span>岗位</span>{{item.qtName}}</li>
                        <li><span>岗位价格</span>{{item.qtAmt}}</li>
                    </ul>
                </div>
                <div class="btngroup">
                    <div class="op borderspace top-space30 btncolor1" v-if="!item.isConfirm && item.isSysConfirm">
                        <mt-button size="large" type="primary" @click.native="queren(item.id)">确认</mt-button>
                    </div>
                    <div class="op borderspace top-space30 btncolor3" v-if="!item.isConfirm">
                        <mt-button size="large" type="primary"  @click.native="nextstep(item.id)">有异议</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <mt-cell v-if="dataNull" v-bind:class="{cell: true }" title="暂无数据"></mt-cell>
        <mt-popup  v-model="popupVisible1" position="">
            <mt-picker :slots="d1" @change="onValuesChange1" :visibleItemCount="5" :itemHeight="44"></mt-picker>
            <div><mt-button size="large" type="default" @click.native="getv">确定</mt-button></div>
        </mt-popup>
        <mt-popup  v-model="popupVisible2" position="">
            <mt-picker :slots="d2" @change="onValuesChange2" :visibleItemCount="5" :itemHeight="44"></mt-picker>
            <div><mt-button size="large" type="default" @click.native="getv">确定</mt-button></div>
        </mt-popup>
        <mt-popup  v-model="popupVisible3" position="">
            <mt-picker :slots="d3" @change="onValuesChange3" :visibleItemCount="5" :itemHeight="44"></mt-picker>
            <div><mt-button size="large" type="default" @click.native="getv">确定</mt-button></div>
        </mt-popup>
        <mt-popup  v-model="popupVisible4" position="">
            <mt-picker :slots="d3" @change="onValuesChange4" :visibleItemCount="5" :itemHeight="44"></mt-picker>
            <div><mt-button size="large" type="default" @click.native="getv">确定</mt-button></div>
        </mt-popup>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'gztj',
  components: {Backbtn},
  data () {
    return {
      dataNull: false,
      loading: false,
      page: 1,
      keyword: '',
      jsStatusName: ['待结算', '结算中', '已结算'],
      timer: null,
      bdate: null,
      edate: null,
      jsStatus: null,
      isConfirm: null,
      col: '',
      pv1: '',
      pv2: '',
      pv3: '',
      pv4: '',
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      popupVisible4: false,
      d1: [
        {flex: 1,
          values: ['所有', '待确认', '已确认'],
          className: 'picker1',
          textAlign: 'center'
        }
      ],
      d2: [
        {flex: 1,
          values: ['所有', '待结算', '结算中', '已结算'],
          className: 'picker1',
          textAlign: 'center'
        }
      ],
      d3: [
        {
          flex: 1,
          values: ['2016', '2017', '2018', '2019', '2020'],
          className: 'picker1',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-'
        },
        {
          flex: 1,
          values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          className: 'picker2',
          textAlign: 'center'
        }
      ],
      list: []
    }
  },
  methods: {
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
    },
    onValuesChange1 (picker, values) {
      this.pv1 = values[0]
    },
    onValuesChange2 (picker, values) {
      this.pv2 = values[0]
    },
    onValuesChange3 (picker, values) {
      this.pv3 = values[0] + '-' + values[1]
    },
    onValuesChange4 (picker, values) {
      this.pv4 = values[0] + '-' + values[1]
    },
    getv: function () {
      if (this.col === 'd1') {
        this.$refs.d1span.innerHTML = this.pv1
        if (this.pv1 === '所有') {
          this.isConfirm = null
        }
        if (this.pv1 === '待确认') {
          this.isConfirm = false
        }
        if (this.pv1 === '已确认') {
          this.isConfirm = true
        }
      }
      if (this.col === 'd2') {
        this.$refs.d2span.innerHTML = this.pv2
        if (this.pv2 === '所有') {
          this.jsStatus = null
        }
        if (this.pv2 === '待结算') {
          this.jsStatus = 0
        }
        if (this.pv2 === '结算中') {
          this.jsStatus = 1
        }
        if (this.pv2 === '已结算') {
          this.jsStatus = 2
        }
      }
      if (this.col === 'd3') {
        this.$refs.d3span.innerHTML = this.pv3
        this.bdate = this.pv3
      }
      if (this.col === 'd4') {
        this.$refs.d4span.innerHTML = this.pv4
        this.edate = this.pv4
      }
      this.popupVisible1 = false
      this.popupVisible2 = false
      this.popupVisible3 = false
      this.popupVisible4 = false
    },
    queren: function (id) {
      this.$messagebox.confirm('确定要提交吗？', '提示').then(action => {
        var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierWrtConfirm.path
        var obj = {id: id}
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
      })
    },
    nextstep: function (id) {
      this.$router.push({name: 'SupYouyy', params: {id: id}})
    },
    viewdetial: function (id, isAttence) {
      this.$router.push({name: 'SupGztjxq', params: {id: id, isdata: isAttence}})
    },
    getSupplierWrtList: function () {
      this.loading = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierWrtList.path
      var obj = {pageNumber: this.page, name: this.keyword, bdate: this.bdate, edate: this.edate, jsStatus: this.jsStatus, isConfirm: this.isConfirm}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$refs.d3span.innerHTML = response.body.data.bdate
          this.$refs.d4span.innerHTML = response.body.data.edate
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
      if (this.page > 1) {
        this.getSupplierWrtList()
      }
    }
  },
  watch: {
    keyword (val, oldVal) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (val !== '' || oldVal !== '') {
        // TODO此处初始化参数
        this.list = []
        this.dataNull = false
        this.loading = false
        this.page = 1
      }
      this.timer = setTimeout(() => {
        // TODO此处写逻辑
        this.getSupplierWrtList()
      }, 200)
    },
    requestList (val, oldVal) {
      if (val !== 'null null null null' || oldVal !== 'null null null null') {
        // TODO此处初始化参数
        this.list = []
        this.dataNull = false
        this.loading = false
        this.page = 1
      }
      this.getSupplierWrtList()
    }
  },
  computed: {
    // 状态变换重新请求
    requestList: function () {
      return this.isConfirm + ' ' + this.jsStatus + ' ' + this.edate + ' ' + this.bdate
    }
  },
  mounted: function () {
    var spid = localStorage.getItem('spid')
    if (spid) {
      this.getSupplierWrtList()
    }
  }
}
</script>
<style>
.picker1{
    width: 375px;
}
.mint-searchbar{
    padding-top: 0px;
    padding-bottom: 0px;
    height: 40px;
}
.searchdiv .mint-searchbar-core{
    font-size: 14px;
    line-height: 40px;
    padding-left: 16px;
}
</style>
<style scoped>
    .cell{
      text-align: center;
    }
    .mint-searchbar-core{
        color:#99a7c1 ;
    }
    .op{
        display: inline-block;
        width: 120px;
    }
    .btngroup{
        text-align: center;
    }
    .user{
        font-size: 20px;
    }
    .user span{
        display: inline-block;
        margin-left: 10px;
        font-size: 16px;
    }
    .jso{
        position: relative;
    }

    .more{
        position: absolute;
        right: 15px;
    }
    .more i{
        font-size: 26px;
        color: #999999;
    }
    .status1{
        color: #ffae02;
    }
    .status2{
        color: #ff4e00;
    }
    .prop ul li{
        line-height: 24px;
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
    .prop ul li{
        line-height: 24px;
        font-size: 14px;
    }
    .fixdiv{
        padding: 5px 0px;
    }
    .fourline {
      margin-top: 5px;
    }
</style>
