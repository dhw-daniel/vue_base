<template>
    <div>
        <backbtn></backbtn>
        <div class="nav">
            <mt-navbar v-model="selected" :fixed="true">
                <mt-tab-item id="2">基础信息</mt-tab-item>
                <mt-tab-item id="1">岗位信息</mt-tab-item>
            </mt-navbar>
        </div>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="p1">
                    <div class="worker bcontainer1 top-space30 padding30lr padding30tb" v-for="(item,key,index) in info.dataList" v-bind:key="index">
                        <div class="info prop">
                            <ul>
                                <li><span>岗位价格</span><strong>{{item.price}}</strong></li>
                                <li><span>岗位分类</span>{{item.name}}</li>
                                <li><span>岗位工种</span>{{item.gzName}}</li>
                                <li><span>岗位级别</span>{{item.gradeName}}<span class="linkdiv" @click="show1(item.id)">[查看具体要求]</span></li>
                                <li><span>所需人数</span>{{item.personNum}}人</li>
                                <li><span>工作周期</span>{{item.workCycle}}月</li>
                                <li><span>业务方向</span>{{item.industry}}</li>
                                <li><span>地区</span>{{item.area}}</li>
                                <li><span class="minxtest1">岗位描述</span><span class="minxtest" style="color: #283347;">{{item.memo?item.memo+'...':'暂无'}}</span><span v-if="item.memo" class="linkdiv minxtest1" @click="show2('岗位描述',item.memo)">[完整描述]</span></li>
                            </ul>
                        </div>
                        <div class="borderspace top-space50 padding30lr line-space">
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>

            <mt-tab-container-item id="2">
                <div class="titlesty1 line-space top-space30">
                    {{info.name}}
                    <span>[{{info.sn}}]</span>
                </div>

                <div class="bcontainer line-space padding30lr padding30tb infoarea">
                    <div class="title1">基本信息</div>
                    <div class="prop">
                        <ul>
                            <li><span>驻场方式</span>{{info.zcfs?info.zcfs:'暂无'}}</li>
                            <li><span>报名时间</span>{{info.enrollDate?info.enrollDate:'暂无'}}</li>
                            <li><span>联系人</span>{{info.conName?info.conName:'暂无'}}</li>
                            <li><span>联系电话</span>{{info.conPhone?info.conPhone:'暂无'}}</li>
                        </ul>
                    </div>
                </div>
                <div class="bcontainer line-space padding30lr padding30tb infoarea">
                    <div class="title1">面试信息</div>
                    <div class="prop">
                        <ul>
                            <li><span>面试方式</span>{{info.itWay?info.itWay:'暂无'}}</li>
                            <li><span>面试时间</span>{{info.intDate?info.intDate:'暂无'}}</li>
                            <li><span>面试地点</span>{{info.intAddress?info.intAddress:'暂无'}}</li>
                        </ul>
                    </div>
                </div>
                <div class="bcontainer line-space padding30lr padding30tb infoarea">
                    <div class="title1">工作信息</div>
                    <div class="prop">
                        <ul>
                            <li><span>上班时间</span>{{info.sbDate?info.sbDate:'暂无'}}</li>
                            <li><span>工作地点</span>{{info.workAddr?info.workAddr:'暂无'}}</li>
                            <li><span>工作单位</span>{{info.workComp?info.workComp:'暂无'}}</li>
                            <li><span>工作设备</span>{{info.workDev?info.workDev:'暂无'}}</li>
                        </ul>
                    </div>
                    <div class="top-space30 btncolor1"><mt-button size="large" type="primary" @click.Native.stop="getText(0)">查看加班规则</mt-button></div>
                </div>
                <div class="bcontainer line-space padding30lr padding30tb infoarea">
                    <div class="title1">结算信息</div>
                    <div class="top-space30 btncolor1"><mt-button size="large" type="primary" @click.Native.stop="getText(1)">查看工作量统计及计算方式</mt-button></div>
                </div>
                <div class="bcontainer line-space padding30lr padding30tb infoarea">
                    <div class="title1">备注信息</div>
                    <div class="content1">
                        <p>{{info.memo?info.memo:'暂无'}}</p>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>

        <mt-popup v-model="popupVisible" popup-transition="popup-fade">
            <div class="mint-popup-1">
                <span>{{title}}</span>
                <div>{{content}}</div>
            </div>
        </mt-popup>
        <div class="o">
            <mt-popup v-model="popupVisible1" position="bottom">
                <showbox :boxdata="pd" @transfer="closeit"> </showbox>
            </mt-popup>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
import Showbox from '@/common/template/showbox'
export default {
  name: 'rcwbxq',
  components: {Showbox, Backbtn},
  data () {
    return {
      selected: '2',
      id: '',
      title: '',
      content: '',
      popupVisible: false,
      popupVisible1: false,
      pd: 0,
      info: []
    }
  },
  methods: {
    show1: function (id) {
      this.$router.push({name: 'PurGwjtyq', params: {id: id}})
    },
    show2: function (t, v) {
      this.title = t
      this.content = v ? v : '无'
      this.popupVisible = true
    },
    getText: function (v) {
      this.pd = v
      this.popupVisible1 = true
    },
    closeit (v) {
      this.popupVisible1 = v
    },
    getPurchaserDemandTalentInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserDemandTalentInfo.path
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
  watch: {
    selected (val, oldVal) { // 切换类型tab
    }
  },
  mounted: function () {
    this.id = this.$route.params.id
    this.selected = this.$route.params.type
    this.getPurchaserDemandTalentInfo()
  }
}
</script>
<style>
    .nav .mint-tab-item-label{
        font-size: 16px;
    }
</style>
<style scoped>
    .linkdiv{
        width: auto;
        color: #0071b7;
        padding-left: 10px;
    }
    .mint-popup{
        border-radius: 8px;
        width: 80%;
    }
    .o .mint-popup{
        height: 50%;
        width: 100%;
        border-radius: 0px;
        overflow: scroll;
    }
    .mint-popup-1{
        padding: 10px;
        line-height: 24px;
    }
    .mint-popup-1 span{
        font-weight: bold;
        line-height: 28px;
    }
    .nav{
        margin-bottom: 53px;
    }
</style>
