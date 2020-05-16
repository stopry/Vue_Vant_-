<template>
  <div class="authAccount" @touchmove.prevent="onStart">
    <van-cell-group class="iptWrap">
      <van-field
        v-model="form.mobile"
        label="用户名"
        placeholder="手机号"
      />

      <van-field
        v-model="form.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
      <van-field
        v-model="form.confirmP"
        type="password"
        label="密码"
        placeholder="请再次输入密码"
      />
    </van-cell-group>
    <div class="wrap">

      <div class="w92" style="margin-top:10px;">
        <b style="color:red;font-size:14px;" class="dangerTip">
          * 绑定后，可使用手机号+密码登入平台，账号、代理关系将永久保存！
        </b>
      </div>

      <div class="w92">
        <van-button type="danger" @click="bindMobileAuth" style="margin-top:10px;maring-botton:15px;" size="large">立即认证</van-button>
      </div>

      <div class="w92 iptDesc descWrap">
        <div class="recharge-title"><b>手机号认证须知</b></div>
        <ul class="descList">
          <li>1. 每个账号，手机号只允许绑定一次，绑定后不可更改</li>
          <li>2. 账号只有在认证手机号后才可提现操作！</li>
          <li>3. 手机号停用或遗失请联系上级代理进行更改！</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Field } from 'vant';
  import { Cell, CellGroup } from 'vant';
  import { Row, Col } from 'vant';

Vue.use(Row).use(Col);
  Vue.use(Field);
  Vue.use(Cell).use(CellGroup);
export default {
  name: 'authAccount',
  data() {
    return {
      form:{
        mobile:'',
        password:'',
        confirmP:''
      }
    }
  },
  mounted() {

  },
  methods: {
    bindMobileAuth(){
      let sData = $util.trimJson(this.form);
      console.log(sData);
      if(!sData.mobile){
        this.$toast("请输入认证手机号");
        return;
      }else if(!$util.verMobile(sData.mobile)){
        this.$toast("请输入正确格式手机号");
        return;
      }else if(!sData.password){
        this.$toast("请输入登陆密码");
        return;
      }else if(sData.password.length<6){
        this.$toast("密码长度不能小于6位");
        return;
      }else if(sData.password!==sData.confirmP){
        this.$toast("两次密码不一致");
        return;
      }

      $sr.bindMobileAuth(sData).then((res)=>{
        $util.objClear(this.form);
        this.$dialog({message:res.message}).then(()=>{
          this.$store.dispatch("fetchUserInfo");//更新用户信息
          this.$router.push({path:'/home'});//回首页
        });
      });

    },

    //禁止微信弹性
    onStart(e) {
      const point = e.touches ? e.touches[0] : e;
    },
  }
}
</script>

<style scoped>
  .authAccount{
    height: 100vh;
    background: #f7f7f7;
    overflow: auto;
  }
  .van-cell{
    line-height: 28px;
  }
  .van-cell:not(:last-child)::after{
    left: 0;
  }
</style>
