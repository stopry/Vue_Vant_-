const $ws = {
  link: 'ws://47.56.83.240:1161/',
  isConnect: false,
  connectTimes: 0,//websocket连接次数
  reConnectTimes: 0,//重连次数 大于三次不做处理 跳回登陆界面
  //连接
  manualClose: false,
  _connect() {

    window.$wsIns = new WebSocket(this.link)

    $wsIns.onopen = (res) => {
      console.log(res, '连接已经打开1')
      this.reConnectTimes = 0//连接成功设置重连次数为零
      $ws.isConnect = true

      if (typeof $ws.openHandler.open === 'function') {
        $ws.openHandler.open()
      }

      if (this.isReconnet) {
        this.isReconnet = false
      }
    }
    $wsIns.onmessage = (res) => {
      $ws.onMessageHandler(res.data)
    }
    $wsIns.onclose = (res) => {
      console.log('globalClose,111')
      $ws.isConnect = false
      if (true) {//默认全部手机ws断开重连
        this.reConnectTimes++
        this.connectTimes++
        if (this.reConnectTimes > 3 || this.connectTimes > 10) {//重连次数超过10次 返回登陆界面

          if (typeof $ws.closeHandler.close === 'function') {
            $ws.closeHandler.close()
          }
          this.reConnectTimes = 0
          this.connectTimes = 0
          return
        }
        this.isReconnet = true
        this._connect()

        if ($wsIns.keepLink) {
          clearInterval($wsIns.keepLink)
        }
        return
      }
      if (typeof $ws.closeHandler.close === 'function') {
        $ws.closeHandler.close()
      }
    }

    $wsIns.onerror = (res) => {
      console.log(res, '连接出错')
      if ($wsIns.keepLink) {
        clearInterval($wsIns.keepLink)
      }
      $ws.isConnect = false
    }
    //心跳包 保持链接 超过30s未与服务器通信将断开 todo(待优化)
    $wsIns.keepLink = setInterval(() => {
      $wsIns.send(JSON.stringify({'type': '@heart', 'data': {}}))
    }, 60000)//一分钟一次心跳
  },
  //关闭回调
  closeHandler: {
    close: () => {
    }
  },
  //打开回调
  openHandler: {
    open: () => {
    }
  },
  //连接被关闭处理回调
  addCloseHandler(fn) {
    $ws.closeHandler['close'] = () => {
      fn()
    }
  },
  addOpenHandler(fn) {
    $ws.openHandler['open'] = () => {
      fn()
    }
  },
  send(msg) {
    if ($ws.isConnect) {
      $wsIns.send(msg)
    } else {

    }
  },
  handlers: {},//
  //对websocket 接收信息的处理(公共websocket接受消息处理方法);
  onMessageHandler(res) {
    try {
      res = JSON.parse(res)
    } catch (e) {

    }
    let cmd = res.type
    console.log(cmd, res, 'cmdddd')

    if ($ws.isConnect) {
      for (let key in $ws.handlers) {
        let fn = $ws.handlers[key]
        if (typeof fn === 'function' && key === cmd) {
          fn(res)
        }
      }
    }
    return res
  },
  //给ws添加处理消息
  addHandler(cmd, fn) {
    if ($ws.handlers[cmd]) {
      return
    }
    $ws.handlers[cmd] = (data) => {
      if ($ws.isConnect) {
        fn(data)
      }
    }
  },
}

export default $ws












