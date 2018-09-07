<template>
  <div data-info="Md5Test">
    {{md5Sign}}
  </div>
</template>

<script>
export default {
  name: 'Md5Test',
  data () {
    return {
      md5Sign: ''
    }
  },
  created () {
    var o1 = { a: 1 }
    var data = this.$functions.mergeBaseParams(o1)
    console.log(data)
  }
}
</script>
<style scoped>
</style>
