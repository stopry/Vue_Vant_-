import axios from 'axios'


axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

const AuthFailHandler = (res)=>{
  $App.$dialog.alert({title:"身份已过期，请重新登陆"}).then(()=>{
    $App.$store.commit("setAuthFailInfo",{isAuthFail:true,fromPath:$App.$route.path})
    $App.$router.push({path:'/login'});
    $App.$toast.clear();
  });
};

const $ajax = axios.create({
  baseURL: '/api',//web打包设为空,
  //超时时间 25s超时
  timeout: 1000 * 15,
  withCredentials:true,//允许跨域cookie
  //请求头
  headers: {
    'Authorization':"bearernull",
    'Accept':'application/agekcapder.redpackage.v1+json',
    'Accept-Language':'zh-CN,zh;q=0.8',
  },
  showLoading: true,//默认显示loading
  responseType: 'json',//返回对象 默认json
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return JSON.stringify(data);
  }],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    if(data.status_code===401){
      AuthFailHandler()
    }
    // 对 data 进行任意转换处理
    return data;
  }],
  //代理服务器
});
//请求拦截
$ajax.interceptors.request.use(
  config => {
    config.headers['Authorization'] = localStorage.getItem("token")||"bearerey";//动态设置token
    if (config.showLoading) {
      $App.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '请求中...'
      });
    }
    return config;
  },
  error => {
    $App.$toast.fail('请求出错！');
    $App.$toast.clear();
    return Promise.reject(error);
  }
);
//返回拦截
$ajax.interceptors.response.use(
  response => {
    console.log(response,'返回数据');
    if (response.status === 200) {
      $App.$toast.clear();
      let res = response.data;
      if(res.status_code!==200){
        $App.$toast.fail(res.message||'系统异常');
        /*身份未认证-重新登陆*/
        if(res.status_code===401){
          AuthFailHandler()
        }
        return Promise.reject(res);
      }
      return res;
    }
  },
  (error,res) => {
    $App.$toast.clear();
    $App.$toast.fail('请求出错！');
    return Promise.reject(error);
  }
);

export default $ajax;
