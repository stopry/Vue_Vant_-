<template>
  <div class="cash">
    <van-tabs type="card" class="tabWrap" v-model="tabActive">
      <van-tab title="支付宝">
        <div class="iptWrap">
          <van-cell-group>
            <van-field
              class="nameIpt"
              placeholder="收款人真实姓名"
              label="真实姓名"
              v-model="cashForm.username"
              left-icon="manager"></van-field>
            <van-field
              class="countIpt"
              placeholder="支付宝帐号"
              v-model="cashForm.alipay_account"
              label="收款帐号"
              left-icon="alipay">
            </van-field>
          </van-cell-group>
          <div class="w92" style="margin-top:10px;font-size:18px;color:#999;">提现金额</div>
          <van-cell-group style="margin-top:5px;">
            <van-field
              class="cashAmt"
              type="number"
              v-model="cashForm.forward_money"
              placeholder="0.00"
              left-icon="gold-coin-o">
            </van-field>
          </van-cell-group>
          <div class="w92" style="margin-top:5px;font-size:14px;color:#999;">可用余额:{{userBalance}}</div>
          <div class="w92" style="margin-top:10px;">
            <van-button type="danger" @click="forwardAndBind" style="margin-top:10px;maring-botton:15px" size="large">确认提现</van-button>
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
      </van-tab>

      <van-tab title="银行卡">
        <div class="iptWrap">
          <van-cell-group>
            <van-field
              class="nameIpt"
              placeholder="收款人真实姓名"
              v-model="cashForm.username"
              label="真实姓名"
              left-icon="manager"></van-field>
            <van-field
              class="nameIpt"
              placeholder="银行卡号"
              v-model="cashForm.bank_card"
              label="银行卡号"
              left-icon="debit-pay">
            </van-field>
            <van-field
              class="countIpt"
              placeholder="开户行名称"
              v-model="cashForm.bank_name"
              label="开户行"
              left-icon="shop-o"></van-field>
          </van-cell-group>

          <div class="w92" style="margin-top:10px;font-size:18px;color:#999;">提现金额</div>
          <van-cell-group style="margin-top:5px;">
            <van-field
              class="cashAmt"
              placeholder="0.00"
              type="number"
              v-model="cashForm.forward_money"
              left-icon="gold-coin-o">
            </van-field>
          </van-cell-group>
          <div class="w92" style="margin-top:5px;font-size:14px;color:#999;">可用余额:{{userBalance}}</div>

          <div class="w92" style="margin-top:10px;">
            <van-button type="danger" @click="forwardAndBind" style="margin-top:10px;maring-botton:15px" size="large">确认提现</van-button>
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
      </van-tab>

      <van-tab title="提现记录" class="cashList">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >

            <van-cell
              icon="shop-o"
              v-for="(item,index) in cashList" :key="index"
              :label="item&&item.labels"
            >
              <div class="diyCon">{{item&&item.account}}</div>
              <template slot="title">
                <span class="custom-text">{{item&&item.realname}}</span>
                <van-tag :type='item&&item.tag'>
                  {{item&&item.tagStr}}
                </van-tag>
              </template>
              <van-icon :style="{color:item&&item.color}" class="diyListIcon" slot="icon" :name="item&&item.icon" />
            </van-cell>

          </van-list>
        </van-pull-refresh>

      </van-tab>
    </van-tabs>

    <van-popup v-model="show" position="bottom" style="over-flow:hidden;height:auto;">

      <van-password-input
        :value="tranPassword"
        :info="payKeyboardTip"
        @focus="showKeyboard = true">
      </van-password-input>

      <div v-show="showKeyboard" class="secKeyBoard s_border_top">
        <van-icon name="wechat"/>
        平台安全键盘
      </div>
      <van-number-keyboard
        style="position:static;"
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete">
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

<style scoped lang="scss">
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
    top: 3px;
    right: 2px;
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
  .iptWrap {
    margin-top: 10px;
  }
  .cash {
    height: 100vh;
    background: #fff;
    overflow: auto;
  }
  .cashList{
    height: calc(100vh - 93px);
    overflow: auto;
    margin-top: 10px;
    padding-top: 5px;
    background: #f7f7f7;
    .van-cell{
      white-space: nowrap;
    }
  }
  .diyCon{
    color: #333;
    height: 100%;
    vertical-align: middle;
    line-height: 45px;
    font-size: 16px;
  }
  .diyListIcon{
    height: 45px;
    line-height: 45px;
    padding-right: 12px;
    text-align: center;
    font-size: 22px;
  }
  .tabWrap {
    margin-top: 15px;
  }
</style>

<script>
  import Vue from 'vue'
  import {Tab, Tabs} from 'vant'
  import {Field} from 'vant'
  import {Cell, CellGroup} from 'vant'
  import {Row, Col} from 'vant'
  import {List} from 'vant'
  import {PullRefresh} from 'vant'
  import {PasswordInput, NumberKeyboard} from 'vant'
  import {Popup} from 'vant'
  import {Icon,Tag} from 'vant'
  import {mapGetters} from 'vuex'
  Vue.use(Icon)
  Vue.use(Popup)
  Vue.use(PasswordInput).use(NumberKeyboard)
  Vue.use(PullRefresh)
  Vue.use(List)
  Vue.use(Row).use(Col)
  Vue.use(Field)
  Vue.use(Tag)
  Vue.use(Cell).use(CellGroup)

  Vue.use(Tab).use(Tabs)

  export default {
    name: 'cash',
    data() {
      return {
        tabActive:0,//当前激活的大tab索引

        //提现白澳但
        cashForm:{
          username:'',//收款人姓名
          forward_way:'alipay',//默认提现方式-支付宝 - bank
          forward_money:'',//提现金额

          alipay_account:'',//支付宝账号


          bank_card:'',//收款卡号
          bank_name:'',//开户行名称
        },


        list: [],
        loading: false,
        finished: false,
        count: 0,
        isLoading: false,

        show: false,//显示popup
        tranPassword: '',//支付密码
        showKeyboard: false,//显示数字键盘

        page:1,//提现记录列表当前页数
        cashList:[],//提现记录当前列表

        //密码键盘提示
        payKeyboardTip:'设置账户支付密码',
      }
    },
    created(){
      this.$store.dispatch("fetchUserInfo");//获取用户信息
    },
    computed:{
      ...mapGetters({
        userBalance:"userBalance",
        userPayCode:"userPayCode"
      })
    },
    mounted() {

    },
    methods: {
      //提现
      async forwardAndBind() {
        let sData = {};//最终提交的数据
        if (parseInt(this.userBalance) <= 0) {
          this.$dialog.alert({
            message: "您的余额不足，无法提现"
          });
          return;
        }
        let sd = $util.trimJson(this.cashForm);
        if (!sd.username) {
          this.$toast("请输入收款人真实姓名");
          return;
        } else if (!sd.forward_money||sd.forward_money==false) {
          this.$toast("请输入提现金额");
          return;
        } else if (parseInt(sd.forward_money)>parseInt(this.userBalance)) {
          this.$toast("您未有足够的金额提现");
          return;
        }
        if(this.tabActive==0){
          this.cashForm.forward_way = "alipay"
          if(!this.cashForm.alipay_account){
            this.$toast("请您填写支付宝账号");
            return;
          }
          sData = {
            username:this.cashForm.username,
            forward_way:this.cashForm.forward_way,
            forward_money:this.cashForm.forward_money,
            alipay_account:this.cashForm.alipay_account,
          };
        }else if(this.tabActive==1){
          this.cashForm.forward_way = "bank"
          if(!this.cashForm.bank_card){
            this.$toast("请您填写收款卡号");
            return;
          }else if(!this.cashForm.bank_name){
            this.$toast("请您填写银行卡开户行名称");
            return;
          }
          sData = {
            username:this.cashForm.username,
            forward_way:this.cashForm.forward_way,
            bank_card:this.cashForm.bank_card,
            forward_money:this.cashForm.forward_money,
            bank_name:this.cashForm.bank_name,
          };
        }
        this.sData = sData;
        if(!this.userPayCode){
          this.$dialog({message:'您还未设置支付密码，请先设置支付密码!'}).then(()=>{
            this.showSetCashPwd();
          })
        }else{
          this.showSetCashPwd();
        }
      },

      showSetCashPwd() {

        this.show = true
        this.tranPassword = "";
        this.showKeyboard = true;
        if(!this.userPayCode){
          this.payKeyboardTip = "设置账户支付密码";
        }else{
          this.payKeyboardTip = "输入账户支付密码";
        }
      },
      hideSetCashPwd(){
        this.show = false
        this.tranPassword = "";
      },
      //确认提现
      async confirmCash(){

        await $sr.verifyPayCode({pay_code:this.tranPassword});

        const res = await $sr.forwardAndBind(this.sData).catch((e)=>{
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
          this.$dialog.alert({message:"您的提现申请已提交"}).then(()=>{
            this.tabActive = 2;
            this.onRefresh();
          });
          this.hideSetCashPwd();
          this.$store.dispatch("fetchUserInfo");//获取用户信息
        });
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
            this.$store.dispatch("fetchUserInfo");//获取用户信息
            this.confirmCash();
            this.show = true;
          }).catch(()=>{});
        }else if(this.tranPassword.length===6&&this.userPayCode){
          //确认转账
          this.confirmCash();
        }
      },
      onDelete() {
        this.tranPassword = this.tranPassword.slice(0, this.tranPassword.length - 1)
      },
      onStart(e) {
        const point = e.touches ? e.touches[0] : e
      },

      getCashList(isFresh){
        if( this.finished) return;
        $sr.userForwardLog({page:this.page}).then((res)=>{
          if(!res.data.data){
            this.finished = true;
          }else{
            if(isFresh){
              this.cashList = this.formatCashList(res.data.data);
              this.$toast("刷新成功");
            }else{
              this.cashList = this.cashList.concat(this.formatCashList(res.data.data));
            };
            this.listTotalLength = res.data.total;
          }
          console.log(this.cashList,'数据')
          this.page++;
        }).catch((err)=>{
          this.finished = true;
          this.$toast("没有更多了");
        }).finally(()=>{
          this.loading = false;
          this.isLoading = false;
        });
      },

      onRefresh() {
        this.page = 1;
        this.finished = false;
        this.getCashList(true);
        /*setTimeout(() => {
          this.$toast('刷新成功')
          this.isLoading = false
          this.count++
        }, 500)*/
      },
      onLoad() {
        if(this.listTotalLength&&this.listTotalLength==this.cashList.length){
          this.finished = true;
          this.loading = false;
          return;
        };
        this.getCashList();
        // 异步更新数据
       /* setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1)
          }
          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true
          }
        }, 500)*/
      },
      //格式化提现列表数据
      formatCashList(list){
        let nl = [];
        let label = '';
        let icon = '';
        let color = '';
        let tag = '';
        let tagStr = '';


        for(let i = 0;i<list.length;i++){
          let item = list[i];
          if(item.forward_way=="alipay"){
            label = `支付宝:${item.alipay_code}`;
            icon = "alipay";
            color = "#00A1E9";
          }else{
            // label = `${item.bankname}|${item.bankcard}`
            label = `卡号:${item.bankcard}`
            icon = "card"
            color = "#d2b234";
          }
          if(item.status==0){
            tag = "default"
            tagStr = "申请中"
          }else if(item.status==1){
            tag = "success";
            tagStr = "已提现";
          }

          nl[i] = {
            forward_way:item.forward_way,
            realname:item.realname,
            account:item.account,

            labels:label,//label
            icon:icon,//label
            tag:tag,//label
            tagStr:tagStr,//label
            color:color,//label
          }
        }
        console.log(nl,'777')
        return nl;
      },
    }
  }
</script>


