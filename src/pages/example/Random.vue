<template>
  <div data-info="Md5Test">
    <input v-model="count" placeholder="count">
    <input v-model="n" placeholder="n">
    <button v-on:click="getNum">点击</button>
    <div>当前随机到的数：{{num}}</div>
  </div>
</template>

<script>
export default {
  name: 'Random',
  data () {
    return {
      count: 10,
      n: 0,
      num: ''
    }
  },
  methods: {
    getNum () {
      var n = this.n
      var count = this.count
      this.num = Math.floor(Math.random() * (count - n)) + n
    }
  },
  watch: {
    requestList (val, oldVal) {
      this.getNum()
    }
  },
  computed: {
    // 状态变换重新请求
    requestList: function () {
      return this.n + this.count
    }
  }
}
</script>
<style scoped>
</style>
