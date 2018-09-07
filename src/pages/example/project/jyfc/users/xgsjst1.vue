<template>
    <div>
        <backbtn></backbtn>
        <div class="top-space30">
            <div class="toptip fontcolor1">当前绑定手机138****4841，请验证确认</div>
            <mt-field placeholder="请输入验证码" v-model="captcha">
                <mt-button size="small" type="default">获取验证码</mt-button>
            </mt-field>
        </div>
        <div class="borderspace top-space50 btncolor1">
            <mt-button size="large" type="primary" @click.native="nextstep">下一步</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'xgsjst1',
  components: {Backbtn},
  methods: {
    nextstep: function () {
      this.$router.push({path: '/xgsjst2'})
    }
  }
}
</script>

<style scoped>

</style>
