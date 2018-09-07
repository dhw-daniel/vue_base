<template>

    <div id="tz">
        <backbtn></backbtn>
        <ul v-if="!dataNull"  v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="bcontainer1"  v-for="(item,key,index) in list" v-bind:key="index">
                <div class="tzcontent">{{item.content}}</div>
                <div class="tzdate">{{item.time}}</div>
            </li>
        </ul>
      <mt-cell-swipe v-if="dataNull" title="暂无数据"></mt-cell-swipe>
      <div v-if="!loading" style="min-height:48px;line-height:48px;">
        <mt-spinner type="triple-bounce" :size="45"></mt-spinner>
      </div>
    </div>
</template>

<script>
import Backbtn from '@/common/template/backbtn'
export default {
  name: 'tz',
  components: {Backbtn},
  data () {
    return {
      dataNull: false,
      loading: false,
      page: 1,
      list: []
    }
  },
  methods: {
    loadMore: function () {
      this.getMerNoticeList()
    },
    getMerNoticeList: function () {
      this.loading = true
      var apiUrl = this.GLOBAL.requestHost + this.GLOBAL.requestList.getMerNoticeList.path
      var obj = {pageNumber: this.page}
      var params = this.GLOBAL.mergeSpidParams(obj)
      this.$http.jsonp(apiUrl, {params: params}).then((response) => {
        if (response.body.ret === 1) {
          this.list = this.list.concat(response.body.data.dataList)
          ++this.page
          if (this.list.length > 0) {
            this.dataNull = false
          }
          if (response.body.data.dataList.length < 15) {
            this.loading = true
          } else {
            this.loading = false
          }
        } else {
          this.$toast({
            message: response.body.msg
          })
        }
      }, function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getMerNoticeList()
  }
}
</script>
<style scoped>
    .bcontainer1{
        padding: 15px;
        margin-top: -1px;
    }
    .tzcontent{
        font-size: 18px;
        line-height: 28px;
    }
    .tzdate{
        text-align: right;
        line-height: 24px;
        font-size: 14px;
        color: #84888f;
        margin-top: 18px;
    }
</style>
