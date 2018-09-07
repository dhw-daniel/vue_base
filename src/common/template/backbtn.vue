<template>
    <div class="backbtnsty" @click="goback">
        <i class="icon iconfont">&#xe6a6;</i>
    </div>
</template>

<script>
export default {
  name: 'backbtn',
  props: {
    routeName: {
      type: String,
      required: false
    },
    routeBool: {
      type: Boolean,
      required: false
    },
    paramsBool: {
      type: Boolean,
      required: false
    },
    params: {
      type: Object,
      required: false
    }
  },
  methods: {
    goback: function () {
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
  }
}
</script>
<style scoped>
    .backbtnsty{
        height: 40px;
        width: 40px;
        -moz-border-radius-topright:10px;
        -moz-border-radius-bottomright: 10px;
        -webkit-border-bottom-right-radius: 10px;
        -webkit-border-top-right-radius: 10px;
        background: rgba(170,180,197,0.7);
        position: fixed;
        left: 0px;
        bottom: 80px;
        z-index: 999;
    }
    .backbtnsty .iconfont{
        color:#fff;
        font-size: 25px;
        line-height: 40px;
        margin-left: 5px;
    }
</style>
