<template>
    <div>
        <backbtn></backbtn>
        <div class="padding30tb padding30lr">发票信息</div>
        <div class="line-space">
            <div class="mint-field" style="height: 48px; background: #fff">
                <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                        <span class="mint-cell-text">发票类型</span>
                    </div>
                    <div class="mint-cell-value">
                        <div @click="openPicker" id="d1"><span ref="d1span">增值税专用发票</span><i class="icon iconfont">&#xe609;</i></div>
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
            <mt-field label="发票号码" placeholder="请输入发票号码" v-model="code"></mt-field>
        </div>
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
        <div class="pop">
            <mt-popup  v-model="popupVisible" position="bottom">
                <mt-picker :slots="d1" @change="onValuesChange" :visibleItemCount="5" :itemHeight="44"></mt-picker>
                <div><mt-button size="large" type="default" @click.native="getv">确定</mt-button></div>
            </mt-popup>
            <mt-datetime-picker ref="time" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"  @confirm="handleConfirm"></mt-datetime-picker>
        </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'skdckfp',
  components: {Backbtn},
  data () {
    return {
      number1: '',
      number2: '',
      code: '',
      id: '',
      pv: '',
      date: '',
      popupVisible: false,
      pickerVisible: new Date(),
      d1: [
        {flex: 1,
          values: ['增值税专用发票', '增值税普通发票'],
          className: 'picker1',
          textAlign: 'center'
        }
      ]
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
    getSupplierSettleFpInfo: function () {
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getSupplierSettleFpInfo.path
      var obj = {id: this.id}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.$refs.d2span.innerHTML = response.body.data.jcsj
          this.$refs.d1span.innerHTML = response.body.data.fplx
          this.code = response.body.data.fpsn
          this.number1 = response.body.data.kdlx
          this.number2 = response.body.data.kdsn
          this.date = response.body.data.jcsj
        }
      }, function (err) {
        console.log(err)
      })
    }
  },
  mounted: function () {
    this.id = this.$route.params.id
    this.getSupplierSettleFpInfo()
  }
}
</script>

<style scoped>
    .pop .mint-popup{
        width: 100%;
    }
</style>
