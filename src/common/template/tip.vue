<template>
    <div>
        <backbtn v-bind:route-bool="true" v-bind:route-name="'UserIndex'"></backbtn>
        <div>
            <i class="icon iconfont righttip" v-if="param.r == '1'">&#xe621;</i>
            <i class="icon iconfont errortip" v-else>&#xe608;</i>
        </div>
        <div class="toptip" v-if="param.r == 1">
            {{param.c}}
        </div>
      <div class="toptip" v-else>
        {{param.t}}
      </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click="reback()">返回</mt-button>
        </div>
    </div>
</template>

<script>
import backbtn from './backbtn.vue'
export default {
  name: 'tip',
  components: {backbtn},
  data () {
    return {
      param: {
        r: false,
        t: '您的操作可能出现问题，请返回重新操作，如有问题请及时联系管理员。',
        c: '您的意见反馈甲乙方程已收到，感谢您对我们的关注与支持！'
      },
      routeName: 'UserIndex',
      paramsBool: false,
      routeBool: true,
      params: Object
    }
  },
  methods: {
    reback: function () {
      if (this.routeBool) {
        if (this.paramsBool) {
          this.$router.push({name: this.routeName, params: this.params})
        } else {
          this.$router.push({name: this.routeName})
        }
      } else {
        this.$router.go(-1)
      }
    }
  },
  created: function () {
    this.param.r = this.$route.params.bool
  }
}
</script>

<style scoped>
body{
    background: #fff;
}
    .iconfont{
        display: block;
        font-size: 120px;
        text-align: center;
        padding: 50px;
    }
    .righttip{
         color: #3fa9f5;
     }
    .errortip{
        color: #ffc000;
    }
.toptip{
    color:#666666;
    text-align:center;
}
</style>
