export default {
  apptest: state => state.app.test,
  timeDate: state => state.app.slideName,
  openLoading: state => state.app.openLoading,
  userBalance: state=>state.user.userInfo.balance,//用户余额
  userPayCode: state=>state.user.userInfo.pay_code,//用户是否设置支付密码

  groupInfo:state=>({
  	group_number:state.app.groupInfo.group_number,
  	group_type:state.app.groupInfo.group_type,
  }),
  isAutoGetHb:state=>state.app.isAutoGetHb,

}
