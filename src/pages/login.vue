<template>
  <div
  	class="login"
	@touchmove.prevent="onStart">
    <div class="logos">
    	<img src="../assets/img/logo.png" alt="">
    </div>
    <div class="title">
    	紫禁城
    </div>

	<div id="loginForm">
		<div class="uName s_border">
			<input type="text" v-model="loginData.account" placeholder="用户ID/手机号" class="uName"/>
		</div>
		<div class="uName s_border">
			<input type="password" v-model="loginData.password" placeholder="密码" class="uPassword"/>
		</div>

		<van-button type="danger" @click="actLogin" class="submitBtn">提交</van-button>
	</div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginData:{
        account:'13855418476',
        password:'123456'
      }
    }
  },
  mounted() {

  },
  methods: {
    dtl(){
      this.$router.push({path:"/hbDetail/33845/42701a"})
    },
    onStart(e) {
      const point = e.touches ? e.touches[0] : e;
    },
    actLogin(){

      let sData = $util.trimJson(this.loginData);
      if(!sData.account){
        this.$toast("请输入账号！")
        return;
      }else if(!sData.password){
        this.$toast("请输入密码！")
        return;
      }
      $sr.actLogin(sData).then(async (res) => {
        let token = res.data.request_type + res.data.token;
        this.$store.commit("setToken", token);
        this.$store.commit("setWsToken", res.data.token);
        localStorage.setItem("token", token);
        localStorage.setItem("wsToken", res.data.token);
        this.getSelfInfo();

        // this.$store.dispatch("fetchUserInfo");
        // console.log(this.$store.state.user.userInfo,'www');
      })
    },
    async getSelfInfo(){
      let res = await $sr.getSelInfo();
      this.$store.commit("setUserInfo",res.data);
      $util.setItem("userInfo",JSON.stringify(res.data));
      this.$toast.success("登陆成功");
      //认证失败跳转过来的标识
      if(this.$store.state.app.authFailInfo.isAuthFail){
        this.$router.push({path:this.$store.state.app.authFailInfo.fromPath||'/home'});
        this.$store.commit("setAuthFailInfo",{isAuthFail:false,fromPath:null});
        return;
      }
      this.$router.push({path:'/home'});
    }
  }
}
</script>

<style scoped>
  .login{
  	height: 100vh;
  	background: url("../assets/img/chatBg.png");
  }
  .logos{
  	width: 80px;
  	margin:0 auto;
  	padding: 60px 0 10px 0;
  }
  .logos img{
  	width: 100%;
  }
  .title{
  	text-align: center;
  	font-size: 20px;
  }
  #loginForm{
  	padding: 15px 40px;
  	margin-top: 15px;
  }
  .submitBtn{
  	width: 100%;
  	margin-top: 30px;
  }
  #loginForm input{
  	width: 100%;
  	border:none;
    display: block;
    background: none;
    height: 60px;
    margin-bottom: 10px;
    outline: none;
    color:#333;
    font-size: 20px !important;
  }
</style>
