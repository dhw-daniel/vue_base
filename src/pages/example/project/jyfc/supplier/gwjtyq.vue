<template>
    <div>
        <backbtn></backbtn>
        <div class="titlesty1 line-space">{{info.name}}</div>
        <div class="bcontainer line-space padding30lr padding30tb infoarea">
            <div class="title1">基本要求</div>
            <div class="prop">
                <ul>
                    <li><span>年龄要求</span>{{info.ageReq}}</li>
                    <li><span>性别要求</span>{{info.sexReq}}</li>
                    <li><span>学历要求</span>{{info.xlReq}}</li>
                    <li><span>证书要求</span>{{info.zsReq}}</li>
                    <li><span>工作年限</span>{{info.wyReq}}</li>
                </ul>
            </div>
        </div>
        <div class="bcontainer line-space padding30lr padding30tb infoarea">
            <div class="title1">工作经历要求</div>
            <div class="content1" v-html="info.baseReq?info.baseReq:'无'">
            </div>
        </div>
        <div class="bcontainer line-space padding30lr padding30tb infoarea">
            <div class="title1">技能要求</div>
            <div class="content1" v-html="info.skillReq?info.skillReq:'无'">
            </div>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'gwjtyq',
  components: {Backbtn},
  data () {
    return {
      id: '',
      fid: '',
      info: []
    }
  },
  methods: {
    getSupplierDemandQuarterInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierDemandQuarterInfo.path
      var obj = {fid: this.fid, id: this.id}
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
    this.fid = this.$route.params.fid
    this.getSupplierDemandQuarterInfo()
  }
}
</script>

<style scoped>


</style>
