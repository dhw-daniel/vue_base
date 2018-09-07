<template>
    <div>
        <Backbtn></Backbtn>
        <div class="titlesty1 line-space top-space30">
            {{info.name}}
            <span>[{{info.sn}}]</span>
        </div>
        <div class="bcontainer line-space padding30lr padding30tb infoarea">
            <div class="title1">基本信息</div>
            <div class="prop">
                <ul>
                    <li><span class="s">企业需求编号</span>{{info.merSn?info.merSn:'-'}}</li>
                    <li><span>项目分类</span>{{info.category}}</li>
                    <li><span>项目实施</span>{{info.ssfs}}</li>
                    <li><span>建设属性</span>{{info.natureJs}}</li>
                    <li><span>预算上限</span><strong>{{info.preAmt}}</strong></li>
                    <li><span>迁移需求</span>{{info.qy}}</li>
                    <li><span>接口开发</span>{{info.jk}}</li>
                    <li><span>上线时间</span>{{info.preDate}}</li>
                    <li><span>联系人</span>{{info.conName}}</li>
                    <li><span>联系电话</span>{{info.conPhone}}</li>
                </ul>
            </div>
        </div>
        <div class="bcontainer line-space padding30lr padding30tb infoarea">
            <div class="title1">项目需求概述</div>
            <div class="content1" v-html="info.desc">
            </div>
            <div v-if="false" class="otherlink padding30tb" @click="showall">查看完整概述</div>
          <div class="top-space30 btncolor1" v-if="info.docFile"><mt-button size="large" type="primary" @click.native="download(info.docFile)">下载需求说明文档</mt-button></div>
        </div>
        <div class="bcontainer line-space padding30lr padding30tb infoarea">
            <div class="title1">其他要求</div>
            <div class="content1">
                <p>{{info.otherReq?info.otherReq:'暂无'}}</p>
            </div>
        </div>
        <mt-popup v-model="popupVisible"  position="bottom" v-html="info.desc">
        </mt-popup>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'xmzbxq',
  components: {Backbtn},
  data () {
    return {
      popupVisible: false,
      id: '',
      fid: '',
      info: []
    }
  },
  methods: {
    download: function (url) {
      if (url === '') {
        this.$toast({
          message: '没有需求说明文档'
        })
      } else {
        window.location.href = decodeURIComponent(url)
      }
    },
    showall: function () {
      this.popupVisible = true
    },
    getSupplierDemandWholeInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierDemandWholeInfo.path
      var obj = {fid: this.fid}
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
    this.getSupplierDemandWholeInfo()
  }
}
</script>

<style scoped>
  .mint-button-text a{
    color: #fff;
  }
    .prop .s{
        width: 100px;
    }
    .mint-popup{
        width: 100%;
        height: 65%;
        overflow: scroll;
    }
    .poptitle{
        text-align: center;
        font-size: 18px;
        color: #0071b7;
    }
    .popcontent{
        line-height: 24px;
        text-indent: 2em;
        text-align: justify;
    }
    .popcontent img{
        max-width: 100%;
        padding-top: 15px;
        padding-bottom: 15px;
    }
</style>
