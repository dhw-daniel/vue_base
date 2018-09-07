<template>
    <div>
        <backbtn v-bind:route-bool="true" v-bind:route-name="'UserIndex'"></backbtn>
        <div class="top-space30">
            <mt-field placeholder="请输入您的宝贵意见" type="textarea" rows="4" v-model="introduction"></mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click.Native="sub">提交</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'yjfk',
  components: {Backbtn},
  data () {
    return {
      introduction: ''
    }
  },
  methods: {
    sub: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.saveComplain.path
      var obj = {content: this.introduction}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((res) => {
        // console.log(res.body)
        if (res.body.ret === 1) {
          this.$router.push({name: 'tip', params: {bool: 1}})
        } else {
          this.$router.push({name: 'tip', params: {bool: 0}})
        }
      }, function (err) {
        console.log(err)
        this.$router.push({name: 'tip', params: {bool: 0}})
      })
    }
  }
}
</script>

<style scoped>

</style>
