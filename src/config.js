let getQueryStringByName = function (name) {
  /* eslint-disable */
  let result = document.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'))
  if (result == null || result.length < 1) return ''
  return result[1]
}

let config = {
  DEBUG: true,
  TITLE: '大富豪红包',
  model: (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) ? 'ios' : 'android',
  // 测试code，上线后注释掉！
  CODE: getQueryStringByName('code') || 'LHWHc72jYmJ2ZrecMiYBJrH1GOfxirLahZ5FiGXwvJPNm5qBEAo2vh1EEzahgLnfMJrQYEVwKkamiCCKuSoPyu+UZSZy7drBa4snOuqyy1S7I2sn+s8zbhuHSCq37Hn4H4M/hGJmRQqVL/SLXW8vTJxuiWRYjSSIlwcOaWAvK2L2l1R13AV54xUXb71ByV0vNVntMmmZAdw=',
  ticket: getQueryStringByName('ticket') || '49b5af49c3c1608c3a372af5cfe5c580', // 获取用户信息需要
  URL: 'http://dfhhb1.0001wan.com', // 本地服务的api地址
  LIMIT: 10, // 列表时，每次请求的记录数
  history: {}, // 保存页面滚动条的位置信息
  loginData: { // 用户登录信息，在api.login方法中赋值
    userInfo: {userId: 0}
  },
  VConsole: true
}

if (process.env.NODE_ENV === 'production') { // 如果是线上环境，修改对应的参数
  config.URL = 'http://dfhhb1.0001wan.com',
    config.VConsole = false  // 打包的时候取消vconsole
}

export default config
