<template>
    <div>
        <backbtn></backbtn>
        <div class="padding30tb padding30lr">付款信息</div>
        <div class="line-space">
            <mt-cell class="mint-field" title="金额">{{amt}}</mt-cell>
            <mt-field label="付款银行" placeholder="请输入付款银行" v-model="bank"></mt-field>
            <mt-field label="银行流水号" placeholder="请输入银行流水号" v-model="sn"></mt-field>
            <div class="mint-field" style="height: 48px; background: #fff">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                        <span class="mint-cell-text">付款日期</span>
                    </div>
                    <div class="mint-cell-value">
                        <div @click="selecttime" id="d4"><span ref="d2span">请选择付款日期</span></div>
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
  name: 'fkdfk',
  components: {Backbtn},
  data () {
    return {
      amt: '',
      bank: '',
      sn: '',
      code: '',
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
      if (this.bank === '') {
        this.$toast({
          message: '请填写银行信息'
        })
        return false
      }
      if (this.sn === '') {
        this.$toast({
          message: '请填写银行流水号'
        })
        return false
      }
      if (this.date === '') {
        this.$toast({
          message: '请选择付款时间'
        })
        return false
      }
      this.savePurchaserUpdateSettlePay()
    },
    savePurchaserUpdateSettlePay: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.savePurchaserUpdateSettlePay.path
      var obj = {id: this.id, bank: this.bank, sn: this.sn, fksj: this.date}
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
    getPurchaserSettlePayInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getPurchaserSettlePayInfo.path
      var obj = {id: this.id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$refs.d2span.innerHTML = response.body.data.fkDate
          this.amt = response.body.data.amt
          this.date = response.body.data.fkDate
          this.bank = response.body.data.fkBank
          this.sn = response.body.data.bankSn
        }
      }, function (err) {
        console.log(err)
      })
    }
  },
  mounted: function () {
    this.id = this.$route.params.id
    this.amt = this.$route.params.amt
    if (this.$route.params.type === 'bianji') {
      this.getPurchaserSettlePayInfo()
    }
  }
}
</script>

<style scoped>
    .pop .mint-popup{
        width: 100%;
    }
</style>
