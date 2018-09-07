<script type="text/javascript">
// 后端请求域名  在config文件夹下 dev.env.js 和 prod.env.js
var requestHost = process.env.BASE_API
// 请求版本号
const version = ''
// 加密密钥标识
const md5Key = 'wb_ticket_2018'
// 客户号标识
const appid = '454hdh44s'

export default
{
  version,
  md5Key,
  appid,
  requestHost
}
</script>
