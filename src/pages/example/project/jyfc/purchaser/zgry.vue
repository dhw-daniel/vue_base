<template>
    <div style="overflow:hidden;">
        <backbtn v-bind:route-bool="true" v-bind:route-name="'UserIndex'"></backbtn>
            <div class="searchdiv" >
                <mt-search input type="search"
                    v-model="name"
                    cancel-text="取消"
                    placeholder="请输入员工姓名" >

                </mt-search>
            </div>
            <div v-if="!dataNull" style="margin-top: 50px;" v-infinite-scroll="loadMore"
                       infinite-scroll-disabled="loading"
                       infinite-scroll-distance="10">

                <div  class="worker bcontainer1 padding30lr padding30tb line-space"  v-for="(item,key,index) in list" v-bind:key="index">
                    <div class="headimg" @click="detail(item.id)"><img :src="item.avatar"></div>
                    <div class="info" @click="detail(item.id)">
                        <ul >
                            <li class="l1">{{item.name}}<div class="p">{{item.amt}}</div></li>
                            <li>[{{item.qtName}}]</li>
                            <li><span>到岗时间：</span>{{item.dgDate}}</li>
                            <li><span>最新上传工作量时间：</span>{{item.workDate}}</li>
                        </ul>
                    </div>
                    <div class="btngroup">
                      <div class="op borderspace top-space30 btncolor3">
                        <mt-button size="large" type="primary"  @click.native="sc()">上传工作量</mt-button>
                      </div>
                    </div>
                </div>
            </div>
            <mt-cell v-bind:class="{ cell: true }" v-if="dataNull" title="暂无数据"></mt-cell>
        </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'zgry',
  components: {Backbtn},
  data () {
    return {
      name: '',
      dataNull: false,
      loading: false,
      page: '1',
      list: [],
      timer: null
    }
  },
  watch: {
    name (val, oldVal) {
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
        this.getPurchaserEpibolyStaffList(2)
      }, 200)
    }
  },
  methods: {
    loadMore: function () {
      if (this.page > 1) {
        this.getPurchaserEpibolyStaffList()
      }
    },
    sc: function () {
      this.$messagebox('提示', '上传工作量请移步到甲乙方程平台(www.garyee.com)人才外包-在岗人员操作，谢谢！')
    },
    getPurchaserEpibolyStaffList: function (v) {
      this.loading = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserEpibolyStaffList.path
      var obj
      if (v === 2) {
        obj = {pageNumber: this.page, name: this.name}
      } else {
        obj = {pageNumber: this.page}
      }
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
    detail: function (id) {
      this.$router.push({name: 'PurGwxx', params: {id: id}})
    }
  },
  mounted: function () {
    this.getPurchaserEpibolyStaffList()
  }
}
</script>
<style>
    .mint-searchbar{
        padding-top: 0px;
        padding-bottom: 0px;
        height: 40px;
    }
    .mint-searchbar-core{
      padding-top: 0px;
      padding-bottom: 0px;
      height: 40px;
    }
</style>
<style scoped>
    .cell{
      text-align: center;
      margin-top: 60px;
    }
    .searchdiv{
        position: fixed;
        width: 100%;
        padding-top: 5px;
        padding-bottom: 5px;
        background: #f0eff5;
    }
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
        height:80px;
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
</style>
