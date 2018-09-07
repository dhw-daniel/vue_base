<template>
    <div class="top-space30" v-if="!dataNull"  v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
        <backbtn></backbtn>
        <div class="worker bcontainer1 top-space30 padding30lr padding30tb" v-for="(item,key,index) in list" v-bind:key="index">
            <div class="headimg"><img :src="item.avatar"></div>
            <div class="info">
                <ul>
                    <li class="l1">{{item.name}}<div class="p">{{item.price}}</div></li>
                    <li>[{{item.qtName}}]</li>
                    <li><span>状态</span><span class="wst1" v-if="item.status <4 ">{{statusName[item.status]}}</span><span class="wst2" v-if="item.status==4">待确认到岗</span><span class="wst3" v-if="item.status==5">服务中</span></li>
                    <li><span>报名时间</span>{{item.enrollDate}}</li>
                    <li v-if="item.status <4"><span>面试时间</span>{{item.intDate}}</li>
                    <li v-if="item.status <4 && item.itWay=='现场'"><span>面试地点</span>{{item.intAddress}}</li>
                    <li v-if="item.status ==4"><span>预计到岗时间</span>{{item.preDate}}</li>
                    <li v-if="item.status ==5"><span>到岗时间</span>{{item.preDate}}</li>
                    <li v-if="item.status >3"><span>工作地点</span>{{item.workAddr}}</li>
                </ul>
            </div>
        </div>
      <mt-cell-swipe v-if="dataNull" title="暂无数据"></mt-cell-swipe>
      <div v-if="!loading" style="min-height:48px;line-height:48px;">
        <mt-spinner type="triple-bounce" :size="45"></mt-spinner>
      </div>
    </div>
</template>
<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'zgry',
  components: {Backbtn},
  data () {
    return {
      dataNull: false,
      loading: false,
      page: 1,
      fid: 0,
      id: 0,
      statusName: ['面试申请', '面试邀请', '面试中', '面试未通过', '待确认到岗', '服务中'],
      list: []
    }
  },
  methods: {
    loadMore: function () {
      this.getSupplierDemandTalentEnrollList()
    },
    getSupplierDemandTalentEnrollList: function () {
      this.loading = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierDemandTalentEnrollList.path
      var obj = {pageNumber: this.page, id: this.id, fid: this.fid}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.list = this.list.concat(response.body.data.dataList)
          ++this.page
          if (this.list.length > 0) {
            this.dataNull = false
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
    }
  },
  mounted () {
    this.fid = this.$route.params.fid
    this.id = this.$route.params.id
    this.getSupplierDemandTalentEnrollList()
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
        margin-top: 10px;
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
    .info .wst1{
        color: #ff4e00;
    }
    .info .wst2{
        color: #ffae02;
    }
    .info .wst3{
        color: #0071b7;
    }
</style>
