<template>
  <div>
    <div class="left"><span>栏目</span></div>
    <div class="center"><mt-search v-model="value"></mt-search></div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'HeaderSearch',
  data () {
    return {
      popupVisible: false,
      slots: [
        {flex: 1,
          values: ['线路名称', '景点', '已确认', '确认中'],
          className: 'picker1',
          textAlign: 'center'
        }
      ],
      value: ''
    }
  },
  methods: {
    onValuesChange (picker, values) {
      alert(22)
    },
    handleClose: function () {
      alert(1)
    }
  },
  watch: {

  },
  computed: {

  }
}
</script>
<style scoped>
</style>
