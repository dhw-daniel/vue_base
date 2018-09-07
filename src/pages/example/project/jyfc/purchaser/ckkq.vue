<template>
    <div>
        <backbtn></backbtn>
        <div class="totalinfo top-space30 bcontainer1 padding50tb padding30lr">
            <div class="uif">{{info.name}}<span class="fontcolor3">{{info.time}}</span>考勤明细</div>
            <div class="prop top-space30">
                <ul>
                    <li><span>正常工时</span>{{info.totalNorNum}}小时</li>
                    <li><span>加班工时</span>{{info.totalOtNum}}小时</li>
                    <li><span>总工时</span>{{info.totalNum}}小时</li>
                    <li><span>标准总工时</span>{{info.flagNum}}小时</li>
                </ul>
            </div>
        </div>
        <div class="listinfo">
            <div class="prop kqone bcontainer1 padding30lr  top-space30" v-for="(item,key,index) in info.dataList" v-bind:key="index">
                <div class="hicon" v-if="item.holidayMemo != ''"><i class="icon iconfont">&#xe637;</i></div>
                <div class="indexd"></div>
                <div class="infod padding50tb">
                    <ul>
                      <li><span>日期</span>{{item.date}}</li>
                      <li><span>工作时段</span>{{item.time}}<span class="att1" v-if="item.holidayMemo != ''">({{item.holidayMemo}})</span></li>
                      <li><span>正常工时</span>{{item.normalNum}}小时</li>
                      <li><span>加班工时</span>{{item.otNum}}小时</li>
                      <li><span>总工时</span>{{item.totalNum}}小时</li>
                    </ul>
                    <div class="bz" v-if="item.memo != ''">{{item.memo}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'ckkq',
  components: {Backbtn},
  data () {
    return {
      id: '',
      info: ''
    }
  },
  methods: {
    getPurchaserWrtAttenceInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserWrtAttenceInfo.path
      var obj = {id: this.id}
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
    }
  },
  mounted: function () {
    this.id = this.$route.params.id
    var spid = localStorage.getItem('spid')
    if (spid) {
      this.getPurchaserWrtAttenceInfo()
    }
  }
}
</script>

<style scoped>
    .bz{
        margin-top: 10px;
        padding-top: 10px;
        border-top:1px solid #ccc;
        color: #999;
    }
    .indexd{
        background: #0071b7;
        color: #fff;
        margin-bottom: -15px;
        margin-left: -15px;
        margin-right: -15px;
        padding-top:3px;
        padding-bottom:3px;
        text-align: left;
        padding-left: 15px;
    }
    .infod{
    }
    .kqone{
        overflow: auto;
        zoom: 1;
        position: relative;
    }
    .hicon{
        position: absolute;
        right: 0px;
        top:-1px;
        background: #fff;
        color: #d81e06;
    }
    .hicon i{
        font-size: 26px;
    }
    .kqone .att1{
        padding-left: 10px;
        color: #ffae02;
    }
    .uif{
        font-size: 18px;
    }
    .uif span{
        padding-left: 5px;
        padding-right: 5px;
        font-weight: bold;
    }
    .prop span{
        width: 80px;
    }
</style>
