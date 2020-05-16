// import Cookies from 'js-cookie'
const app = {
  state: {
    openLoading: false,
    slideName: 'right', // 过度动画
    //记录用户未登陆时从哪个页面返回到登陆页，从而在登陆后返回之前页面
    authFailInfo:{
      isAuthFail:false,
      fromPath:null,
    },
    //群组类型 群组名-socket 信息中获取
    groupInfo:{
      group_number:'42701a',
      group_type:'4',
    },
    //是否自动抢包-socket信息中获取
    isAutoGetHb:false,//
    //外部图片路径
    imgPath:'http://dfhhb1.0001wan.com/upload/',
  },
  mutations: {
    app_setSlideName(state, slide) {
      if (slide) { // 如果时间戳存在
        state.slideName = slide
      } else {
        state.slideName = 'right'
      }
    },
    app_openLoading(state) {
      state.openLoading = true
    },
    app_closeLoading(state) {
      state.openLoading = false
    },
    setAuthFailInfo(state,info){
      state.authFailInfo.isAuthFail = info.isAuthFail;
      state.authFailInfo.fromPath = info.fromPath;
    },
    setGroupInfo(state,info){
      state.groupInfo.group_number = info.group_number;
       state.groupInfo.group_type = info.group_type;
    },
    setIsAutoGetHb(state,info){
      state.isAutoGetHb = info;
    },
    setImgPath(state,imgPath){
      state.imgPath = imgPath;
    }
  },
  actions: {}
}
export default app
