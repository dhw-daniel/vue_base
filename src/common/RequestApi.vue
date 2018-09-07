<script type="text/javascript">
import configs from './Configs'
var version = configs.version
const requestList = {
  SignIn: {path: version + '/cgi-bin/bind', desc: '登录绑定'},
  SignOut: {path: version + '/cgi-bin/log_out', desc: '退出登录'},
  getMerchantConInfo: {path: version + '/api/menu', desc: '测试得到接口'},
  updateMerchantCon: {path: version + '/cgi-bin/update_mer_con', desc: '更新企业联系人信息'},
  saveMerMesg: {path: version + '/cgi-bin/save_mer_mesg', desc: '添加管理员'}
}

export default
{
  requestList
}
</script>
