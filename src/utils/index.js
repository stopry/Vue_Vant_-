import QRCode from "qrcode";
//格式化时间
Date.prototype.Format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
const $util = {
  //验证中文姓名
  verUserName(name) {
    let reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/
    return reg.test(name)
  },
  //验证手机号
  verMobile(phone) {
    let phoneReg = /(^1[1|2|3|4|6|5|7|8|9]\d{9}$)/
    return phoneReg.test(phone)
  },
  //验证是否为正整数
  isUnSingInt(value) {
    let r = /^\+?[1-9][0-9]*$/
    return r.test(value)
  },
  //清除空格
  trim(str) {
    try {
      if (!str) return str
      return str.toString().trim()
    } catch (e) {
      return false
    }
  },
  //清除提交json空格
  trimJson(json){
    if(!json) return json;
    try {
      for(let k in json){
        json[k] = $util.trim(json[k]);
      }
      return json;
    }catch (e) {
      return json;
    }
  },
  //清除html中字符串
  trimHtml(htmlStr){
    let a = $util.trim(htmlStr.replace(/\n/g,''));
    a = a.split('>')
    let html = '';
    for(let i = 0;i<a.length;i++){
      if(a[i].length){
        html+=$util.trim(a[i])+">";
      }
    }
    return html;
  },
  //清空对象中的值
  objClear(obj){
    Object.keys(obj).forEach(key =>obj[key]='');
  },
  //时间戳生成日期- 0日期 1时间
  ormatTimeArray(now) {
    let year = new Date(now).getFullYear()
    let month = new Date(now).getMonth() + 1 >= 10 ? new Date(now).getMonth() + 1 : '0' + (new Date(now).getMonth() + 1)
    let date = new Date(now).getDate() >= 10 ? new Date(now).getDate() : '0' + new Date(now).getDate()
    let hour = new Date(now).getHours()
    let minute = new Date(now).getMinutes()
    let second = new Date(now).getSeconds()
    return [year + '/' + month + '/' + date, (hour === 0 ? '00' : hour) + ':' + (minute === 0 ? '00' : minute) + ':' + (second === 0 ? '00' : second)]
  },
  //生成uuid
  createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  //是否时微信
  isWechat() {
    let ua = navigator.userAgent.toLowerCase()
    return ua.match(/MicroMessenger/i) == 'micromessenger'
  },
  //本地储存
  setItem(key, val) {
    return localStorage.setItem(key, val)
  },
  getItem(key) {
    return localStorage.getItem(key)
  },
  removeItem(key) {
    localStorage.removeItem(key)
  },
  //获取本地数据转化为json
  getLocalJson(item) {
    let jsonString = localStorage.getItem(item)
    if (!item) return false
    try {
      return JSON.parse(jsonString)
    } catch (e) {
      return false
    }
  },
  //复制文本
  copyText(text){
    if(!text) return;
    if(navigator.userAgent.indexOf('iPhone') > -1){//苹果手机 safari浏览器
      let el = document.createElement('input');
      el.value = text;
      el.style.opacity = '0';
      document.body.appendChild(el);
      let editable = el.contentEditable;
      let readOnly = el.readOnly;
      el.contentEditable = true;
      el.readOnly = false;
      let range = document.createRange();
      range.selectNodeContents(el);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      el.setSelectionRange(0, 999999);
      el.contentEditable = editable;
      el.readOnly = readOnly;
      let ret = document.execCommand('copy');
      el.blur();
      // ret?alert('复制成功'):alert('复制失败');
      el.remove();//移除这个节点 ios这个节点会显示在最上层造成点击异常
      return;
    }
    let _input = document.createElement('input');
    _input.value = text;
    _input.contentEditable = true;
    document.body.appendChild(_input);
    _input.select();
    let ret = document.execCommand('copy');
    _input.blur();
    // ret?alert('复制成功'):alert('复制失败');
    _input.remove();//移除这个节点 ios这个节点会显示在最上层造成点击异常
  },
  //生成二维码
  createQrCode(url,options){
    options = options||{};
    const code = QRCode.toDataURL(url,{
      width:options.width||300,
      height:options.height||300
    });
    return code;
  },
  //禁用微信弹性滚动(需要配合body的滚动条) 效果不理想
  stopDrop(){
    let lastY;//最后一次y坐标点
    document.body.addEventListener('touchstart', function(event) {
      lastY = event.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
    });
    document.body.addEventListener('touchmove', function(event) {
      const y = event.changedTouches[0].clientY;

      let st = document.documentElement.scrollTop;
      console.log(lastY,y,st);

      if (y >= lastY && st <= 0) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
        lastY = y;
        event.preventDefault();
      }
      lastY = y;

    },{passive:false});
  }
}

export default $util
