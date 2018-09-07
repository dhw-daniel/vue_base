<template>
    <div id="curUser">
        <backbtn></backbtn>
        <div class="top-space30">
            <mt-cell title="员工姓名" v-model="info.name"></mt-cell>
            <mt-cell title="统计月份" ><div class="curbtn btncolor3"><span>{{info.time}}</span><mt-button v-if="isAttance === true || isAttance === 'true'" size="small" type="primary" @click.Native="showAttendance">查看考勤</mt-button></div></mt-cell>
            <mt-cell title="工作岗位" v-model="info.qtName+' '+ info.skillName +' '+ info.gradeName"></mt-cell>
            <mt-cell title="到岗时间" v-model="info.comeTime"></mt-cell>
            <mt-cell v-if="info.isLeave" title="离岗时间" v-model="info.leaveTime"></mt-cell>
            <mt-cell title="人月单价" v-model="info.qtAmt"></mt-cell>
            <mt-cell title="工作量" v-model="info.num+'人月'"></mt-cell>
            <mt-cell title="费用" v-model="info.amt"></mt-cell>
            <mt-cell title="工作地点" v-model="info.workAddr"></mt-cell>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'gztjxq',
  components: {Backbtn},
  data () {
    return {
      id: '',
      isAttance: false,
      info: ''
    }
  },
  methods: {
    showAttendance: function () {
      this.$router.push({name: 'PurCkkq', params: {id: this.id}})
    },
    getPurchaserWrtInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserWrtInfo.path
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
    this.isAttance = this.$route.params.isdata
    var spid = localStorage.getItem('spid')
    if (spid) {
      this.getPurchaserWrtInfo()
    }
  }
}
</script>
<style>
    #curUser .mint-cell-text{
        color: #999999;

    }
    #curUser .mint-cell-value{
        width: 260px;
        line-height: 22px;
    }
    #curUser .mint-cell-value span{
        color: #394252;
        display: inline-block;
    }
</style>
<style scoped>
.curbtn{
    color: #394252;
}
.curbtn span{
    display: inline-block;
    margin-right: 10px;
}
</style>
