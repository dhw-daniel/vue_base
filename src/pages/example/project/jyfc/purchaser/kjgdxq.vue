<template>
    <div>
        <backbtn></backbtn>
        <div class="titlesty1 line-space top-space30">
            {{info.name}}
            <span>[{{info.sn}}]</span>
        </div>
        <div class="bcontainer line-space padding30lr padding30tb infoarea">
            <div class="title1">基本信息</div>
            <div class="prop">
                <ul>
                    <li><span>工单类型</span>{{info.typeName}}</li>
                    <li v-if="info.status >= 0"><span>工单状态</span>{{statusName[info.status]}}</li>
                    <li v-else><span>工单状态</span>未发布</li>
                    <li><span>预计费用</span><strong>{{info.preAmt}}</strong></li>
                    <li><span>实际费用</span><strong>{{info.amt}}</strong></li>
                    <li><span>联系人</span>{{info.conName}}</li>
                    <li><span>联系电话</span>{{info.conPhone}}</li>
                    <li><span>预计时间</span>{{info.preDate}}</li>
                </ul>
            </div>
        </div>
        <div class="bcontainer line-space padding30lr padding30tb infoarea">
            <div class="title1">工单需求描述</div>
            <div class="content1" v-html="info.desc?info.desc:'暂无'">

            </div>
            <div v-if="info.docFile!=''" class="top-space30 btncolor1"><mt-button size="large" type="primary" @click.Native.stop="getText(info.docFile,'没有需求附件')">下载相关附件</mt-button></div>
        </div>
        <div class="bcontainer line-space padding30lr padding30tb infoarea">
            <div class="title1">交付说明</div>
            <div class="prop">
                <ul>
                    <li><span>交付方式</span>{{info.jfWay}}</li>
                    <li v-if="info.jfWay=='线下'"><span>交付地点</span>{{info.jfAddress}}</li>
                </ul>
            </div>
            <div class="content1">
              {{info.jfMemo}}
            </div>
            <div class="top-space30 btncolor1" v-if="info.jfDocFile!=''"><mt-button size="large" type="primary" @click.Native.stop="getText(info.jfDocFile,'没有交付附件')">下载交付附件</mt-button></div>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'kjgdxq',
  components: {Backbtn},
  data () {
    return {
      id: 0,
      statusName: ['未开始', '进行中', '待验收', '已完成'],
      info: []
    }
  },
  methods: {
    getText: function (url, msg) {
      if (url === '') {
        this.$toast({
          message: msg
        })
      } else {
        window.location.href = decodeURIComponent(url)
      }
    },
    getPurchaserDemandWoInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserDemandWoInfo.path
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
    this.getPurchaserDemandWoInfo()
  }
}
</script>

<style scoped>
</style>
