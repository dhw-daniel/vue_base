<template>
    <div>
        <backbtn></backbtn>
        <div class="top-space30">
            <mt-cell title="姓名">{{this.$route.params.name}}</mt-cell>
            <mt-cell title="时间">{{this.$route.params.time}}</mt-cell>
            <mt-cell title="岗位价格">{{this.$route.params.qtAmt}}</mt-cell>
            <mt-cell title="费用">{{this.$route.params.amt}}</mt-cell>
            <mt-field label="工作量" placeholder="请输入工作量" type="text"  v-model="num"></mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click="update">保存</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'bjgzl',
  components: {Backbtn},
  data () {
    return {
      num: '',
      id: ''
    }
  },
  methods: {
    update () {
      if (this.num < 0) {
        this.$toast('工作量不能为空')
        return false
      }
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserUpdateWrt.path
      var obj = {id: this.id, num: this.num}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((res) => {
        if (res.body.ret === 1) {
          this.$toast(res.body.msg + '2秒后跳转到工作统计列表')
          setTimeout(() => {
            this.$router.push({name: 'PurGztj'})
          }, 2000)
        } else {
          this.$toast(res.body.msg)
        }
      })
    }
  },
  mounted: function () {
    this.id = this.$route.params.id
    this.num = this.$route.params.num
  }
}
</script>

<style scoped>

</style>
