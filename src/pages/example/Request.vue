<template>
    <div id="content1">
        api
    </div>
</template>
<script>
export default {
  data () {
    return {
      result: {},
      selected: '2',
      type: 2,
      oldphone: '0'
    }
  },
  watch: {
  },
  methods: {
    getTestInfo: function () {
      // var params = this.$functions.mergeBaseParams()
      var obj = {page: this.page, times: this.times, days: this.days, keyword: this.keyword}
      var params = this.$functions.mergeBaseParams(obj)
      this.$axios.post(this.$requestApi.getMerchantConInfo.path, params)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getTestInfo()
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
