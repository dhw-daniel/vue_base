<template>
    <div id="content1">
        <div class="bcontainer line-space topdiv" style="height: 106px">
            <div class="headimg">
                <img v-bind:src="result.logo">
                <div class="verify"><i class="icon iconfont">&#xe625;</i></div>
            </div>
            <div class="compname fontcolor1 fsize32">{{result.name}}</div>
            <div class="compsign"><mt-badge size="small" color="#0071b7" v-if="selected=='2'">乙方</mt-badge> <mt-badge size="small" color="#ff8a00" v-if="selected=='1'">甲方</mt-badge></div>
        </div>
        <mt-navbar v-if="result.type=='3'" class="page-part" v-model="selected" ref="unav">
            <mt-tab-item id="1">我是甲方</mt-tab-item>
            <mt-tab-item id="2">我是乙方</mt-tab-item>
        </mt-navbar>
        <div v-if="selected=='2'" id="bottomnav2" key="yi" ref="footer" class="top-space30 line-space">
            <mt-tabbar>
                <mt-tab-item id="m1" @click.native="redicUrl('SupWdxq')" href="javascript:void(0)">
                  <div class="icondiv"><i class="icon iconfont c_fs1 iconsize1">&#xe61e;</i></div>
                  我的需求
                </mt-tab-item>
                <mt-tab-item id="m2" @click.native="redicUrl('SupZgry')" href="javascript:void(0)">
                    <div class="icondiv"><i class="icon iconfont iconsize1 c_fs6">&#xe617;</i></div>
                    在岗人员
                </mt-tab-item>
                <mt-tab-item id="m3" @click.native="redicUrl('SupGztj')" href="javascript:void(0)">
                    <div class="icondiv"><i class="icon iconfont iconsize1 c_fs7">&#xe687;</i></div>
                    工作统计
                </mt-tab-item>
                <mt-tab-item id="m4" @click.native="redicUrl('SupJszx')" href="javascript:void(0)">
                    <div class="icondiv"><i class="icon iconfont iconsize1 c_fs">&#xe61b;</i></div>
                    结算中心
                </mt-tab-item>
            </mt-tabbar>
        </div>
      <div v-if="selected=='1'" id="bottomnav1" key="jia" ref="footer" class="top-space30 line-space">
        <mt-tabbar>
          <mt-tab-item id="p1" @click.native="redicUrl('PurWdxq')" href="javascript:void(0)">
            <div class="icondiv"><i class="icon iconfont c_fs1 iconsize1">&#xe61e;</i></div>
            我的需求
          </mt-tab-item>
          <mt-tab-item id="p2" @click.native="redicUrl('PurZgry')" href="javascript:void(0)">
            <div class="icondiv"><i class="icon iconfont iconsize1 c_fs6">&#xe617;</i></div>
            在岗人员
          </mt-tab-item>
          <mt-tab-item id="p3" @click.native="redicUrl('PurGztj')" href="javascript:void(0)">
            <div class="icondiv"><i class="icon iconfont iconsize1 c_fs7">&#xe687;</i></div>
            工作统计
          </mt-tab-item>
          <mt-tab-item id="p4" @click.native="redicUrl('PurJszx')" href="javascript:void(0)">
            <div class="icondiv"><i class="icon iconfont iconsize1 c_fs">&#xe61b;</i></div>
            结算中心
          </mt-tab-item>
        </mt-tabbar>
      </div>
        <div class="line-space indexcell">
            <mt-cell title="企业联系人" to="/qylxr" is-link>
                <i slot="icon" class="icon iconfont iconfont2">&#xe602;</i>
            </mt-cell>
            <mt-cell title="管理员" to="/gly" is-link>
                <i slot="icon" class="icon iconfont iconfont2">&#xe7dd;</i>
            </mt-cell>
            <mt-cell title="通知" to="/tz" is-link>
                <i slot="icon" class="icon iconfont iconfont2 c_fs2">&#xe600;</i>
            </mt-cell>
        </div>
        <div class="indexcell space2">
            <mt-cell title="修改密码" to="/users/xgmm" is-link>
                <i slot="icon" class="icon iconfont iconfont2 c_fs3">&#xe620;</i>
            </mt-cell>
            <mt-cell title="更换绑定手机" :to="{name:'xgsjst2', params:{oldphone:oldphone}}" is-link>
                <i slot="icon" class="icon iconfont iconfont2">&#xe603;</i>
            </mt-cell>
            <mt-cell title="意见反馈" to="/yjfk" is-link>
                <i slot="icon" class="icon iconfont iconfont2 c_fs4">&#xe612;</i>
            </mt-cell>
            <mt-cell title="退出登录" @click.native="SignOut" href="javascript:void(0)">
                <i slot="icon" class="icon iconfont iconfont2 c_fs5">&#xe61c;</i>
            </mt-cell>
        </div>
    </div>
</template>
<script>
export default {
  name: 'UserIndex',
  data () {
    return {
      result: {},
      selected: '2',
      type: 2,
      oldphone: '0'
    }
  },
  watch: {
    selected: function (value, oldVal) {
      this.$refs.footer.id = 'bottomnav' + value
      this.selected = value
    }
  },
  methods: {
    getMerchantInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getMerchantInfo.path
      var params = this.GLOBAL.mergeSpidParams()
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.result = response.body.data
          this.selected = response.body.data.type < 3 ? response.body.data.type : '1'
          this.oldphone = response.body.data.bindPhone
          localStorage.setItem('role', response.body.data.type)
        } else {
          this.$toast({
            message: response.body.msg
          })
        }
      }, function (err) {
        console.log(err)
      })
    },
    SignOut: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.SignOut.path
      var cpid = localStorage.getItem('cpid') != 'undefined' ? localStorage.getItem('cpid') : ''
      var obj = {cpid: cpid}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          localStorage.clear()
          this.$router.go(0)
        }
        this.$toast({
          message: response.body.msg
        })
      }, function (err) {
        console.log(err)
      })
    },
    redicUrl: function (e) {
      if (e === 'SupWdxq') {
        this.$router.push({name: e, params: {type: '1'}})
      } else if (e === 'PurWdxq') {
        this.$router.push({name: e, params: {type: '1'}})
      } else if (e === 'SupJszx') {
        this.$router.push({name: e, params: {type: '2'}})
      } else if (e === 'PurJszx') {
        this.$router.push({name: e, params: {type: '1'}})
      } else {
        this.$router.push({name: e})
      }
    }
  },
  mounted () {
    var spid = localStorage.getItem('spid')
    if (spid) {
      this.getMerchantInfo()
    }
  }
}
</script>
<style scoped>
    .topdiv{
        position: relative;
    }
    #bottomnav1 .mint-tabbar,#bottomnav2 .mint-tabbar{
        position: relative;
    }
    #bottomnav1 .mint-tabbar,#bottomnav3 .mint-tabbar{
      position: relative;
    }
    .space1{
        margin-bottom: 3px;
    }
    .verify{
        position: absolute;
        right: -8px;
        bottom: -3px;
        color: #ff8a00;

    }
    .verify i{
        font-size: 20px;
    }
    .headimg{
        border:3px solid #74d0ff;
        width: 50px;
        height:50px;
        border-radius: 30px;
        position: absolute;
        top:25px;
        left: 15px;
    }
    .compname{
        position: absolute;
        left: 80px;
        width: 220px;
        height: 106px;
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: left;
    }
    .compsign{
        position: absolute;
        top:42px;
        right: 15px;
    }
    .headimg{
        border:3px solid #74d0ff;
        width: 50px;
        height:50px;
        border-radius: 30px;
        position: absolute;
        top:25px;
        left: 15px;
    }
    .headimg img{
        width: 50px;
        height: 50px;
        border-radius: 30px;
    }
   #bottomnav1 .mint-tabba,#bottomnav1  .mint-tab-item{
        color: #da7600;
       background: #fff;
    }
    #bottomnav1 .mint-tab-item, #bottomnav2 .mint-tab-item{
        min-height:40px;
        padding: 16px 0px;
    }
    #bottomnav2 .mint-tabba,#bottomnav2  .mint-tab-item{
        color: #0071b7;
        background: #fff;
    }
    .icondiv{
        height: 22px;
        margin-bottom: 3px;
    }
    .iconsize1{
        font-size: 22px;
        line-height: 22px;
    }
    .c_fs{
        font-size: 18px;
    }
    .c_fs1{
        font-size: 20px;
    }
    .iconfont2{
        font-size: 20px;
        color: #b5bdc0;
        position: absolute;
    }
    .c_fs2{
        font-size: 24px;
        top:10px;
        left:8px;
    }
    .c_fs3{
        font-size: 24px;
        top:10px;
        left:8px;
    }
    .c_fs4{
        top:12px;

    }
    .c_fs5{
        font-size: 24px;
        left:2px;
        top:14px;
    }
    .c_fs6{
     font-size: 24px;
    }
    .c_fs7{
        font-size: 20px;
    }
    .page-part{
        margin-bottom: 3px;
    }
    .space2{
        padding-bottom: 60px;
    }
</style>
