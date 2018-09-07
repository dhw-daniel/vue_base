<template>
    <div>
        <backbtn></backbtn>
        <div class="padding30tb padding30lr">快递信息</div>
        <div class="line-space">
            <mt-field label="快递公司" placeholder="请输入快递公司" v-model="number1"></mt-field>
            <mt-field label="快递单号" placeholder="请输入快递单号" v-model="number2"></mt-field>
            <div class="mint-field" style="height: 48px; background: #fff">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                        <span class="mint-cell-text">寄出日期</span>
                    </div>
                    <div class="mint-cell-value">
                        <div @click="selecttime" id="d4"><span ref="d2span">请选择寄出日期</span></div>
                        <div class="mint-field-clear" style="display: none;">
                            <i class="mintui mintui-field-error"></i>
                        </div>
                        <span class="mint-field-state is-default">
                                <i class="mintui mintui-field-default"></i>
                            </span>
                        <div class="mint-field-other"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="padding30tb padding30lr">退票原因</div>
        <div class="line-space">
          <mt-field placeholder="请输入退票原因" type="textarea" rows="4" v-model="introduction"></mt-field>
        </div>
        <div class="pop">
            <mt-datetime-picker ref="time" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"  @confirm="handleConfirm"></mt-datetime-picker>
        </div>
        <div class="top-space30 btncolor1 padding30lr" style="margin-top: 50px;">
            <mt-button size="large" type="primary" @click.native="save">提交</mt-button>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'fkdfp',
  components: {Backbtn},
  data () {
    return {
      number1: '',
      number2: '',
      introduction: '',
      id: '',
      pv: '',
      date: '',
      popupVisible: false,
      pickerVisible: new Date()
    }
  },
  methods: {
    formatDate: function (d) {
      this.m = '' + (d.getMonth() + 1)
      this.d = '' + d.getDate()
      this.y = d.getFullYear()
      if (this.m.length < 2) this.m = '0' + this.m
      if (this.d.length < 2) this.d = '0' + this.d
      return [this.y, this.m, this.d].join('-')
    },
    openPicker: function () {
      this.popupVisible = true
    },
    onValuesChange (picker, values) {
      this.pv = values[0]
    },
    getv: function () {
      this.$refs.d1span.innerHTML = this.pv
      this.popupVisible = false
    },
    handleConfirm: function (v) {
      var date = this.formatDate(v)
      this.$refs.d2span.innerHTML = date
      this.date = date
    },
    selecttime: function () {
      this.$refs.time.open()
    },
    save: function () {
      if (this.number1 === '') {
        this.$toast({
          message: '请填写快递公司'
        })
        return false
      }
      if (this.number2 === '') {
        this.$toast({
          message: '请填写快递单号'
        })
        return false
      }
      if (this.date === '') {
        this.$toast({
          message: '请选择寄出日期'
        })
        return false
      }
      this.savePurchaserUpdateSettleTp()
    },
    savePurchaserUpdateSettleTp: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserUpdateSettleTp.path
      var obj = {id: this.id, reason: this.introduction, kdlx: this.number1, kdsn: this.number2, jcsj: this.date}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$toast({
            message: response.body.msg
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        } else {
          this.$toast({
            message: response.body.msg
          })
          setTimeout(() => {
            this.$router.go(0)
          }, 1000)
        }
      }, function (err) {
        console.log(err)
      })
    },
    getPurchaserSettleTpInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserSettleTpInfo.path
      var obj = {id: this.id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$refs.d2span.innerHTML = response.body.data.jcDate
          this.number1 = response.body.data.kdlx
          this.date = response.body.data.jcDate
          this.number2 = response.body.data.kdsn
          this.introduction = response.body.data.tpyy
        }
      }, function (err) {
        console.log(err)
      })
    }
  },
  mounted: function () {
    this.id = this.$route.params.id
    if (this.$route.params.type === 'bianji') {
      this.getPurchaserSettleTpInfo()
    }
  }
}
</script>

<style scoped>
    .pop .mint-popup{
        width: 100%;
    }
</style>
