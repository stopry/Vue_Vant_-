import $sr from '../../axios/api/service';
const user = {
  state: {
    userName: 'userNamexxx',
    token:'defaultToken',
    wsToken:'defaultToken',//websocket token
    userInfo:{},
  },
  mutations: {
    setToken(state,token){
      state.token = token;
    },
    setWsToken(state,wsToken){
      state.wsToken = wsToken;
    },
    setUserInfo(state,userInfo){
      state.userInfo = userInfo;
    },
  },
  actions: {
    fetchUserInfo({commit}){
      $sr.getSelInfo().then((res)=>{
        commit("setUserInfo",res.data);
        $util.setItem("userInfo",JSON.stringify(res.data));
      })
    }
  }
}
export default user
