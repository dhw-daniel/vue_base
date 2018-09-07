<template>
    <div>
        <backbtn></backbtn>
        <div class="bcontainer line-space padding30lr padding30tb infoarea top-space30">
            <div class="title1">需求信息</div>
            <div class="prop">
              <ul>
                <li><span>需求名称</span>{{info.name}}</li>
                <li><span>岗位</span>{{info.qtName}}</li>
                <li><span>岗位价格</span><strong>{{info.price}}</strong></li>
                <li><span>面试方式</span>{{info.itWay}}</li>
                <li v-if="info.itWay=='现场'"><span>面试地点</span>{{info.intAddress}}</li>
                <li><span>工作地点</span>{{info.workAddr}}</li>
              </ul>
            </div>
        </div>
        <div>
            <div class="bcontainer2 line-space">
                <div class="searchdiv"><mt-search v-model="title" cancel-text="取消" placeholder="员工姓名"> </mt-search></div>
            </div>
        </div>
        <div class="worker bcontainer1 padding30lr padding30tb line-space" v-for="(item,key,index) in info.dataList" v-bind:key="index">
          <div class="clear">
            <div class="headimg"><img :src="item.m"></div>
            <div class="info">
              <ul>
                <li class="l1">{{item.name}}<div class="p" v-if="1">{{item.wages}}</div></li>
                <li><span>学历</span>{{item.xl}}</li>
                <li><span>岗位</span>{{item.qtName?item.qtName:'-'}}</li>
                <li><span>参加工作时间</span>{{item.jobDate}}</li>
              </ul>

            </div>
          </div>
          <div class="op top-space30 btncolor1" v-if="item.status==-1">
            <mt-button size="large" type="primary" @click.native="queren(item.id,info.id)">报名</mt-button>
          </div>
          <div class="op top-space30 btncolor2" v-if="item.status==0">
            <mt-button size="large" type="primary">岗位已报名</mt-button>
          </div>
          <div class="op top-space30 btncolor2" v-if="item.status==1">
            <mt-button size="large" type="primary">面试邀请</mt-button>
          </div>
          <div class="op top-space30 btncolor2" v-if="item.status==2">
            <mt-button size="large" type="primary">面试中</mt-button>
          </div>
          <div class="op top-space30 btncolor2" v-if="item.status==4">
            <mt-button size="large" type="primary">待确认到岗</mt-button>
          </div>
          <div class="op top-space30 btncolor2" v-if="item.status==5">
            <mt-button size="large" type="primary">服务中</mt-button>
          </div>
        </div>
        <div v-if="listlength==0" class="bcontainer line-space padding30lr padding30tb infoarea top-space30" style="text-align: center;">暂无符合条件的员工，请移步到甲乙方程平台(www.garyee.com)人才外包-外包储备添加相应人员后再报名！</div>
        <div class="morelink line-space padding30tb" @click="other">系统匹配人员报名</div>
        <mt-popup  v-model="popupVisible" position="bottom">
            <mt-picker :slots="d1" @change="onValuesChange" :visibleItemCount="5" :itemHeight="44"></mt-picker>
            <div><mt-button size="large" type="default" @click.Native="getv">确定</mt-button></div>
        </mt-popup>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'rcwbqtbm',
  components: {Backbtn},
  data () {
    return {
      listlength: 0,
      id: '',
      fid: '',
      title: null,
      timer: null,
      info: [],
      popupVisible: false,
      pv: '',
      d1: [
        {flex: 1,
          values: ['所有', '未报名', '已报名', '服务中'],
          className: 'picker1',
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    other: function () {
      this.$router.push({name: 'SupRcwbbm', params: {id: this.id, fid: this.fid}})
    },
    queren: function (did, id) {
      this.$messagebox.confirm('确定要报名吗？', '提示').then(action => {
        var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.saveSupplierDemandEnroll.path
        var obj = {did: did, id: id}
        var params = this.GLOBAL.mergeSpidParams(obj)
        this.$http.jsonp(apiUrl, {params: params}).then((response) => {
          if (response.body.ret === 1) {
            this.info = response.body.data
          } else {
          }
          this.$toast({
            message: response.body.msg
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 1000)
        }, function (err) {
          console.log(err)
        })
      })
    },
    openPicker: function (event) {
      this.popupVisible = true
    },
    onValuesChange (picker, values) {
      this.pv = values
    },
    getv: function () {
      this.$refs.d1span.innerHTML = this.pv
      this.popupVisible = false
    },
    getSupplierDemandEnrollOther: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierDemandEnrollOther.path
      var obj = {fid: this.fid, id: this.id, name: this.title}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.info = response.body.data
          this.listlength = response.body.data.dataList.length
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
    title (val, oldVal) { // 搜索变化
      if (val === '') {
        this.title = null
      }
      if (val !== null || oldVal !== null) {
        if (this.timer) {
          clearTimeout(this.timer)
        }

        this.timer = setTimeout(() => {
          this.getSupplierDemandEnrollOther()
        }, 300)
      }
    }
  },
  mounted: function () {
    this.id = this.$route.params.id
    this.fid = this.$route.params.fid
    this.getSupplierDemandEnrollOther()
  }
}
</script>

<style scoped>
    .worker{
        overflow:hidden;
        zoom: 1;
    }
    .headimg{
        float: left;
        width: 80px;
        height: 80px;
        margin-right: 15px;
        background: #99a7c1;
    }
    .headimg img{
        width: 80px;
        height: 80px;
    }
    .info{
        float: left;
        width: 230px;
    }
    .info .p{
        float: right;
        color: #ffae02;
    }
    .info .l1{
        font-weight: bold;
        padding-bottom: 10px;
    }
    .info li{
        line-height: 24px;
    }
    .info span{
        padding-right: 8px;
        color: #888;
    }
    .op{
        width: 40%;
        margin: 25px auto 15px;
    }
    .clear{
        zoom: 1;
        overflow: hidden;
    }
    .morelink{
        text-decoration: underline;
        text-align:center;
        color:#0071b7 ;
        font-weight: bold;
    }
    .bcontainer2{
        overflow: auto;
        zoom: 1;
    }
    .bcontainer2 i{
        margin-left: 10px;
    }
    .halfdiv{
        text-align: center;
        color: #99a7c1;
    }
    .halfdiv{
        width: 40%;
    }
    .searchdiv{
        float: left;
        width: 100%;
    }
    .mint-popup{
        width: 100%;
    }
</style>
