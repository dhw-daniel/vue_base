<template>
    <div>
        <backbtn v-bind:route-bool="true" v-bind:route-name="'UserIndex'"></backbtn>
        <div class="top-space30 btncolor1 line-space">
            <mt-button size="large" type="primary" @click.native="addmanager"><i class="icon iconfont">&#xe658;</i><span>添加管理员</span></mt-button>
        </div>
        <ul class="managers" v-if="!dataNull">
            <li v-for="(item,key,index) in list" v-bind:key="index" @click="bianji(item.id)">
                <ul class="bcontainer1 fontcolor1">
                    <li><i class="icon iconfont">&#xe63f;</i>{{item.name}}(<span class="fontcolor2 fsize30">{{item.uname}}</span>)</li>
                    <li><i class="icon iconfont">&#xe603;</i>{{item.phone}}</li>
                    <li><i class="icon iconfont">&#xe64c;</i>{{item.email}}</li>
                    <i class="icon iconfont morelink">&#xe610;</i>
                </ul>
            </li>
        </ul>
      <mt-cell-swipe v-if="dataNull" title="暂无数据"></mt-cell-swipe>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'gly',
  components: {Backbtn},
  data () {
    return {
      dataNull: true,
      list: []
    }
  },
  methods: {
    bianji: function (id) {
      this.$router.push({name: 'tjgly', params: {id: id}})
    },
    getMerMesgList: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getMerMesgList.path
      var params = this.GLOBAL.mergeSpidParams()
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        console.log(response)
        if (response.body.ret === 1) {
          this.list = response.body.data.dataList
          if (this.list.length > 0) {
            this.dataNull = false
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
    addmanager: function () {
      this.$router.push({name: 'tjgly', params: {id: 0}})
    }
  },
  mounted () {
    if (!this.GLOBAL.empty(this.$route.params.isAdd)) {
      this.$toast({message: '添加成功', duration: 1000})
    }
    this.getMerMesgList()
  }
}
</script>

<style scoped>
    .bcontainer1{
        padding: 15px;
        position: relative;
        margin-bottom: 15px;
    }
    .bcontainer1 li{
        line-height: 28px;

    }
.iconfont{
    color: #8ff3ff;
    margin-right: 10px;

}
    li .iconfont{
        color: #bbbbbb;
    }
    .mint-button--primary{
        border-radius: 0px;
    }
    .morelink{
        position: absolute;
        right: 10px;
        top:45px;
        font-size: 20px;
    }
</style>
