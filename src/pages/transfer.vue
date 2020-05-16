<template>
  <div class="cash">
    <div class="iptWrap">

      <div class="iptBox s_border">
        <div class="w92" style="margin-top:10px;font-size:18px;color:#666;">收款人ID</div>
        <van-cell-group style="margin-top:5px;">
          <van-field
            class="cashAmt"
            placeholder="收款人ID"
            v-model="transferData.transferId"
            type="number"
            left-icon="manager-o"></van-field>
        </van-cell-group>
      </div>

     <div class="iptBox s_border">
       <div class="w92" style="margin-top:10px;font-size:18px;color:#666;">转账金额</div>
       <van-cell-group style="margin-top:5px;">
         <van-field
           v-model="transferData.transferMoney"
           class="cashAmt"
           placeholder="0.00"
           type="number"
           left-icon="gold-coin-o"></van-field>
       </van-cell-group>
       <div class="w92" style="margin-top:5px;font-size:14px;color:#999;">
         可用余额:{{userBalance}}
       </div>
     </div>

      <div class="w92" style="margin-top:10px;">
        <van-button type="danger" @click="transfer" style="margin-top:10px;maring-botton:15px" size="large">确认转账</van-button>
      </div>

      <div class="w92" style="margin-top:10px;">
        <b style="color:red;font-size:14px;" class="dangerTip">
          *重要：请确保提现账号与姓名完全匹配
        </b>
      </div>
      <div class="w92 iptDesc descWrap">
        <div class="recharge-title"><b>提现需知</b></div>
        <ul class="descList">
          <li>1. 若提现至银行卡，请详细填写银行卡开户行名称!</li>
          <li>2. 玩家输赢流水需达到最新充值金额的一倍并且最低提现金额为五十，才可申请提现！</li>
        </ul>
      </div>

    </div>

    <van-popup v-model="show" position="bottom" style="over-flow:hidden;height:auto;">

      <van-password-input
        :value="tranPassword"
        :info="payKeyboardTip"
        @focus="showKeyboard = true"></van-password-input>

      <div v-show="showKeyboard" class="secKeyBoard s_border_top">
        <van-icon name="wechat"/>
        平台安全键盘
      </div>
      <van-number-keyboard
        style="position:static;"
       :show="showKeyboard"
       @input="onInput"
       @delete="onDelete"
       >
      </van-number-keyboard>
    </van-popup>
  </div>
</template>

<style>
  .cash .nameIpt i.van-icon {
    color: #ff2f2f !important;
  }
  .cash .cashAmt i.van-icon-gold-coin-o {
    font-size: 22px;
    color: red;
  }
  .cash .countIpt i.van-icon {
    color: #00a6cc !important;
  }
  .cashAmt {
    height: 50px;
    font-size: 22px;
  }
</style>

<style scoped>
  .iptBox{
    background: #fff;
    padding: 15px 0;
    margin-bottom: 10px;
  }
  .van-password-input__error-info, .van-password-input__info {
    margin-top: 6px;
  }
  .secKeyBoard {
    text-align: center;
    font-size: 12px;
    line-height: 32px;
  }
  .secKeyBoard i {
    color: #48C23D;
    font-size: 16px;
    position: relative;
    top: 4px;
    right: 0;
  }
  .van-password-input {
    padding: 15px 20px;
    margin: 0;
    background: #f7f7f7;
  }
  .cashList {
    height: 90vh;
    overflow: auto;
  }
  .cashAmt {
    height: 50px;
    font-size: 22px;
    line-height: 32px;
    padding-top: 15px;
  }
  .cashAmt input {
    line-height: 50px;
  }
  .cash {
    height: 100vh;
    background: #f7f7f7;
    overflow: auto;
  }
  .tabWrap {
    margin-top: 15px;
  }
</style>

<script>
  import Vue from 'vue'
  import {Field} from 'vant'
  import {PasswordInput, NumberKeyboard} from 'vant'
  import {Popup} from 'vant'
  import {Icon,CellGroup} from 'vant'
  import {mapGetters} from 'vuex'
  Vue.use(Icon)
  Vue.use(Popup)
  Vue.use(PasswordInput).use(NumberKeyboard)
  Vue.use(Field)
  Vue.use(CellGroup)

  export default {
    name: 'transfer',
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        count: 0,
        isLoading: false,
        show: false,
        tranPassword: '',
        showKeyboard: false,

        transferData:{
          transferId:15795,
          transferMoney:100,
        },
        payKeyboardTip:'设置账户支付密码'
      }
    },
    created(){
      this.$store.dispatch("fetchUserInfo");//获取用户信息
    },
    mounted(){

    },
    computed:{
      ...mapGetters({
        userBalance:"userBalance",
        userPayCode:"userPayCode"
      })
    },
    methods: {
      //转账
      async transfer() {
        if (parseInt(this.userBalance) <= 0) {
          this.$dialog.alert({
            message: "您的余额不足，无法转账"
          });
          return;
        }
        let sd = $util.trimJson(this.transferData);
        if (!sd.transferId) {
          this.$toast("请输入收款人ID");
          return;
        } else if (!sd.transferMoney||sd.transferMoney==false) {
          this.$toast("请输入转账金额");
          return;
        } else if (parseInt(sd.transferMoney)>parseInt(this.userBalance)) {
          this.$toast("您未有足够的金额转账");
          return;
        }
        const res = await $sr.chkTransfer(sd).catch((e)=>{
          console.log(e,77)
          if(e.status_code===405&&e.message.match("设置支付密码")){
            this.$dialog.confirm({
              message:e.message,
            }).then(()=>{
              this.showSetCashPwd();
            })
          }
        }).then((res)=>{
            if(!res) return;
            this.showTransferInfo(res.data);
            return;
            this.$dialog.alert({message:"转账成功"});
            this.$store.dispatch("fetchUserInfo");//获取用户信息
        });

      },
      //显示转账信息
      showTransferInfo(info){
        this.$dialog.confirm({
          title:'确认转账信息',
          message:$util.trimHtml(info),
        }).then((res)=>{
          //显示支付密码键盘
          this.showSetCashPwd();
          this.showKeyboard = true;
        });
      },
      //确认转账
      async confirmTransfer(){//确认转账
        let sd = {
          name:"",
          ...this.transferData
        }
        //先验证支付密码再转账
        await $sr.verifyPayCode({pay_code:this.tranPassword});
        $sr.transferInfo(sd).then((res)=>{
          this.$dialog.alert({message:res.message}).then(()=>{
            this.show = false
            this.tranPassword = "";
            $util.objClear(this.transferData);
            this.$store.dispatch("fetchUserInfo");//更新用户状态
          })
        });
      },

      showSetCashPwd() {
        this.show = true
        this.tranPassword = "";
        if(!this.userPayCode){
          this.payKeyboardTip = "设置账户支付密码";
        }else{
          this.payKeyboardTip = "输入账户支付密码";
        }
      },
      onInput(key) {
        console.log(this.userPayCode,'8588')
        this.tranPassword = (this.tranPassword + key).slice(0, 6);
        if(this.tranPassword.length===6&&!this.userPayCode){
          this.$dialog.confirm({
            title:'设置支付密码',
            message:`您将设置支付密码为"<b>${this.tranPassword}</b>",请牢记您的支付密码,是否设置？`
          }).then(async () => {
            const res = await $sr.setPayCode({pay_code: this.tranPassword});
            this.$toast.success("设置成功！");
            this.show = true;
          }).catch(()=>{});
        }else if(this.tranPassword.length===6&&this.userPayCode){
          //确认转账
          this.confirmTransfer();
        }
      },
      onDelete() {
        this.tranPassword = this.tranPassword.slice(0, this.tranPassword.length - 1)
      },
      onStart(e) {
        const point = e.touches ? e.touches[0] : e
      },
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功')
          this.isLoading = false
          this.count++
        }, 500)
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1)
          }
          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (this.list.length >= 20) {
            this.finished = true
          }
        }, 500)
      }
    }
  }
</script>


