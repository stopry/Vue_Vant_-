import $ajax from '../ajax'
//接口服务
const $sr = {
  //账号登陆
  actLogin(options) {
    let url = '/ApiLogin'
    return $ajax({
      method: 'post',
      data: options,
      url: url,
    })
  },
  //获取当前用户信息
  async getSelInfo() {
    let url = '/ApiGetSelfInfo'
    return $ajax({
      method: 'post',
      url: url,
    })
  },
  //身份认证
  //转账-确认用户信息
  /**
   * {transferId:int,transferMoney:int}
   * */
  async chkTransfer(options) {
    let url = '/ApiChkTransfer'
    return $ajax({
      method: 'post',
      url: url,
      data: options
    })
  },
  /*验证支付密码
  * {pay_code:''}
  * */
  async verifyPayCode(options) {
    let url = '/ApiVerifyPayCode'
    return $ajax({
      method: 'post',
      url: url,
      data: options
    })
  },
  /*
  * 转账信息-转账最后一步调用
  * {
  *  name: "娇娇"
  *  transferId: "8748"
  *  transferMoney: 100
  * }
  * ApiTransferInfo
  * */
  async transferInfo(options) {
    let url = '/ApiTransferInfo'
    return $ajax({
      method: 'post',
      url: url,
      data: options
    })
  },

  //设置支付密码 { pay_code: "732182" }
  async setPayCode(options) {
    let url = '/ApiSetUserPayCode'
    return $ajax({
      method: 'post',
      url: url,
      data: options
    })
  },

  //获取客服列表
  serviceList() {
    let url = '/ApiServiceList'
    return $ajax({
      url: url,
      method: 'post',
    })
  },
  /**
   * 充值列表
   * {page:1}
   * */
  async getRechargeRecord(options) {
    let url = '/getRechargeRecord'
    return $ajax({
      url: url,
      method: 'post',
      data: options,
      showLoading: false
    })
  },
  /*
  * 提交充值接口
  * {
  *   amount: 300,
  *   paytype: "Alipay","Wxpay"
  * }
  * */
  async userRecharge(options) {
    let url = '/ApiUserRecharge'
    return $ajax({
      url: url,
      method: 'post',
      data: options
    })
  },

  /**
   * 认证账号
   * ApiBindMobileAuth
   * {
   *  confirmP: "1"
   *  mobile: "1"
   *  password: "1"
   * }
   * */
  async bindMobileAuth(options) {
    let url = '/ApiBindMobileAuth'
    return $ajax({
      url: url,
      method: 'post',
      data: options
    })
  },
  /**
   * 提现
   * "/ApiForwardAndBind"
   * */
  async forwardAndBind(options) {
    let url = '/ApiForwardAndBind'
    return $ajax({
      url: url,
      method: 'post',
      data: options
    })
  },

  /**
   * 提现记录
   * "/ApiUserForwardLog"
   * {
   *   pageL:1
   * }
   * */
  async userForwardLog(options) {
    let url = '/ApiUserForwardLog'
    return $ajax({
      url: url,
      method: 'post',
      data: options,
      showLoading: false,
    })
  },

  /*
  * 获取玩法规则信息
  * '/ApiGroupRules'
  * {
  *   group_number:"42701a"
  * }
  * */
  groupRules(options) {
    let url = '/ApiGroupRules'
    return $ajax({
      url: url,
      method: 'post',
      data: options,
    })
  },
  /*
  * 发包
  * "/ApiSendRedPacket"
  * {
    group_number: "42701a"
    red_amount: "10.00"
    red_lei: "0,7,9"
    red_nums: "5"
    red_type: 1
  * }
  * */
  sendRedPacket(options) {
    let url = '/ApiSendRedPacket'
    return $ajax({
      url: url,
      method: 'post',
      data: options,
    })
  },
  /**
   * 红包详情
   * "/ApiPacketGetDetail"
   * { red_id: "33845" } 红包id
   * */
  packetGetDetail(options) {
    let url = '/ApiPacketGetDetail'
    return $ajax({
      url: url,
      method: 'post',
      data: options,
    })
  },
  /*
  * 获取群组二维码
  * "/ApiGetQrcodeLink"
  * {
  *  group_number:42701a
  *  qrcode_type:group
  * }
  * {
  *   qrcode_type:person //个人推广码
  * }
  * */
  getQrcodeLink(data) {
    let url = '/ApiGetQrcodeLink', method = 'post'
    return $ajax({
      url,
      method,
      data
    })
  },
  /**
   * 获取代理信息
   * "/ApiUserAgentInfo"
   *
   * */
  userAgentInfo() {
    let url = '/ApiUserAgentInfo', method = 'post'
    return $ajax({
      url,
      method,
    })
  },
  /*
  * 邀请玩家列表
  * "/ApiUserInvitList"
  * {
  *   keyword:'',
  *   page:1,
  * }
  * */
  userInvitList(data) {
    let url = '/ApiUserInvitList', method = 'post'
    return $ajax({
      url,
      method,
      data
    })
  },
  /**
   * 返佣记录
   * "/ApiGetAgentCommList"
   * {
   *   page:1,
   *   timeType:'all'
   * }
   * */
  getAgentCommList(data) {
    let url = '/ApiGetAgentCommList', method = 'post'
    return $ajax({
      url,
      method,
      data
    })
  },
  /**
   * 账单明细
   * "/ApiGetUserRecord"
   * {
   *   group_number: "" //群组名
   *   page:1, //页数
   *   screen_type:"" //筛选类型
   * }
   * */
  getUserRecord(data) {
    let url = '/ApiGetUserRecord', method = 'post';
    return $ajax({
      url,
      method,
      data
    })
  },

	/**
	* 秒抢开关
	*'/ApiGroupAutoRob'
	* {group_number:42701a}
	*/
  groupAutoRob(data) {
    let url = '/ApiGroupAutoRob', method = 'post';
    return $ajax({
      url,
      method,
      data
    })
  },

  /**
  *'/ApiRobRedPacket'
  * {red_id:33852}
  *
  */
  robRedPacket(data){
  	let url = '/ApiRobRedPacket', method = 'post';
    return $ajax({
      url,
      method,
      data
    })
},

};



export default $sr
