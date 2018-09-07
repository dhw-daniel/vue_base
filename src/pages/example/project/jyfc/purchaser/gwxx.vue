<template>
    <div>
        <backbtn></backbtn>
        <div class="nav line-space fixdiv">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">基础信息</mt-tab-item>
                <mt-tab-item id="2">岗位信息</mt-tab-item>
            </mt-navbar>
        </div>
        <div style="margin-top: 65px">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <div class="p1">
                        <mt-cell title="员工姓名" v-model="info.name"></mt-cell>
                        <mt-cell title="需求来源" v-model="info.dtName"></mt-cell>
                        <mt-cell title="身份证号" v-model="info.idCard"></mt-cell>
                        <mt-cell title="工作岗位" v-model="info.qtName+' '+info.qtGradeName+' '+info.qtSkill"></mt-cell>
                        <mt-cell title="岗位编号" v-model="info.sn"></mt-cell>
                        <mt-cell title="所属模板" v-model="info.mouldName"></mt-cell>
                        <mt-cell title="到岗时间" v-model="info.dgDate"></mt-cell>
                        <mt-cell title="预计离岗时间" v-model="info.levDate"></mt-cell>
                        <mt-cell title="当前人月价格" v-model="info.amt"></mt-cell>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="p2">
                        <div class="worker bcontainer1 padding30lr padding30tb line-space" v-for="(item,key,index) in list" v-bind:key="index" >
                            <div class="info prop">
                                <ul>
                                    <li class="uname">{{item.name}}</li>
                                    <li><span>岗位</span>{{item.qtName}}</li>
                                    <li><span>岗位编号</span>{{item.sn}}</li>
                                    <li><span>工作时段</span>{{item.workDate}}</li>
                                    <li><span>到岗方式</span>{{item.dgWay}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                  <mt-cell v-if="dataNull" v-bind:class="{cell: true }" title="暂无数据"></mt-cell>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>

    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'gwxx',
  components: {Backbtn},
  data () {
    return {
      info: '',
      name: '',
      page: '1',
      selected: '1',
      list: [],
      loading: false,
      dataNull: false

    }
  },
  methods: {
    getPurchaserEpibolyStaffInfo: function () {
      this.loading = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserEpibolyStaffInfo.path
      var obj = {pageNumber: this.page, id: this.$route.params.id}

      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.list = this.list.concat(response.body.data.dataList)
          this.info = response.body.data
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
    }
  },
  mounted: function () {
    this.getPurchaserEpibolyStaffInfo()
  }
}
</script>
<style>
    .nav .mint-tab-item-label{
        font-size: 16px;
    }
    .p1 .mint-cell-text{
        color: #999999;

    }
    .p1 .mint-cell-value{
        width: 260px;
        line-height: 22px;
    }
    .p1 .mint-cell-value span{
        color: #394252;
        display: inline-block;
    }
</style>
<style scoped>
  .cell{
    text-align: center;
  }
    .uname{
        font-size: 20px;
        color: #0071b7;
        font-weight: bold;
        padding-bottom: 10px;
    }
    .fixdiv{
        padding-top: 0px;
        padding-bottom: 3px;
    }
</style>
