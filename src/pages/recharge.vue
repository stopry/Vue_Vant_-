<template>
  <div class="cash">
    <div class="rchTip">
      <van-icon name="wechat"/>
      快速、稳定，请选择“VIP充值”
    </div>
    <van-tabs type="card" @click="onTabClick" class="tabWrap" v-model="tabActive">
      <van-tab title="在线充值">
        <div class="iptWrap">
          <div class="w92 rchTypeTip">选择充值方式</div>
          <van-tabs v-model="onLineRchType">
            <van-tab>
              <div slot="title" style="color:#00a6cc  !important;">
                <van-icon name="alipay"/>
                支付宝
              </div>

              <div class="w92 moneyBtnWrap">
                <van-row gutter="20">
                  <van-col v-for="item,index in aliPayRchList" :key="index" span="8">
                    <van-button @click="selRchAmt(item)" size="" :plain="item!=onLineRchAmount" hairline :type="item==onLineRchAmount?'danger':'default'">{{item}}金币</van-button>
                  </van-col>
                </van-row>
              </div>
            </van-tab>

            <van-tab>
              <div slot="title" style="color:#48C23D  !important;">
                <van-icon name="wechat"/>
                微信
              </div>
              <div class="w92 moneyBtnWrap">
                <van-row gutter="20">
                  <van-col v-for="item,index in wxRchList" :key="index" span="8">
                    <van-button @click="selRchAmt(item)" size="" :plain="item!=onLineRchAmount" hairline :type="item==onLineRchAmount?'danger':'default'">{{item}}金币</van-button>
                  </van-col>
                </van-row>
              </div>

            </van-tab>
          </van-tabs>

          <div class="w92" style="margin-top:10px;font-size:18px;color:#999;">充值金额 <b style="color:red;font-size:12px;">(1金币=1元)</b></div>
          <van-cell-group style="margin-top:5px;">
            <van-field
              class="cashAmt"
              type="number"
              v-model="onLineRchAmount"
              placeholder="0.00"
              left-icon="gold-coin-o">
            </van-field>
          </van-cell-group>
          <div class="w92" style="margin-top:5px;font-size:14px;color:#999;">当前余额:{{$store.state.user.userInfo.balance}}</div>

          <div class="w92" style="margin-top:10px;">
            <van-button type="danger" @click="userRecharge" style="margin-top:10px;maring-botton:15px" size="large">去支付</van-button>
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

      <van-tab title="VIP充值">
        <div slot="title">
          <van-icon name="hot-o" style="top:2px;"/>
          VIP充值
        </div>

        <div class="iptWrap">

          <div class="kfListWrap" v-if="serviceList.length">
            <div class="kfWx" v-for="item in serviceList">
              <img class="listImg" src="../assets/img/kefu.7396f59.png" alt="">
              <div class="listGetDetail">
                <div class="listGetJ">微信: <b>{{item.kefu_number}}</b></div>
                <div class="listGetS win">{{item.kefu_name}}</div>
              </div>
              <van-button @click="copyWx(item.kefu_number)" size="small" type="danger">复制</van-button>
            </div>
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

      <van-tab title="充值记录" class="cashList">
        <div class="rchListWrap">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div>
                <van-cell
                  icon="shop-o"
                  v-for="(item,index) in rechargeList" :key="index"
                  :label="'订单号:'+(item&&item.ordersn)"
                >
                  <div class="diyCon">+{{item&&item.amount}}</div>
                  <template slot="title">
                    <span class="custom-text">{{item&&item.paytype}}</span>
                    <van-tag :type='item&&item.orderstatus==1?"danger":"success"'>
                      {{item&&item.orderstatus==1?"未支付":"已支付"}}
                    </van-tag>
                  </template>
                  <van-icon :style="{color:item&&item.paytype=='支付宝充值'?'#00A1E9':'#00D205'}" class="diyListIcon" slot="icon" :name="item&&item.paytype=='支付宝充值'?'alipay':'wechat'" />
                </van-cell>
              </div>

            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
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
  .iptWrap .van-icon-alipay, .iptWrap .van-icon-wechat {
    font-size: 18px !important;
    position: relative;
    top: 4px;
  }
  .kfWx {
    padding: 10px;
    border-bottom: 1px solid #eee;
    position: relative;
  }
  .kfWx .listImg {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  .kfWx button {
    float: right;
    position: relative;
    top: 12px;
  }
  .kfWx .listGetDetail {
    position: absolute;
    left: 70px;
    top: 15px;
    font-size: 15px;
    color: #777;
    line-height: 22px;
  }
  .kfWx .listGetDetail {

  }
  .kfWx .listGetJ b {
    color: #555;
  }
  .moneyBtnWrap .van-col {
    margin-bottom: 10px;
  }
  .moneyBtnWrap {
    padding-top: 15px;
  }
  .moneyBtnWrap .van-button {
    width: 100%;
  }
  .rchTypeTip {
    line-height: 32px;
    font-size: 14px;
    color: #888;
  }
  .rchTip {
    text-align: center;
    padding: 8px;
    background: #ef453a;
    color: #ffe2b1;
    font-size: 14px;
  }
  .rchTip i {
    position: relative;
    top: 4px;
    font-size: 18px;
    right: 2px;
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
  .tabWrap {
    margin-top: 15px;
  }
  .kfListWrap .kfWx:nth-child(1){
    margin-top: 20px;
    border-top: 1px solid #eee;
  }
  .cashList{
    height: calc(100vh - 93px);
    overflow: auto;
    margin-top: 10px;
    padding-top: 5px;
    background: #f7f7f7;
    .van-cell__label{
      white-space: nowrap;
    }
  }
  .moneyBtnWrap button.active{

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
</style>

<script>
  import Vue from 'vue'
  import {Tab, Tabs,Tag} from 'vant'
  import {Field} from 'vant'
  import {Cell, CellGroup} from 'vant'
  import {Row, Col} from 'vant'
  import {List} from 'vant'
  import {PullRefresh} from 'vant'
  import {Popup} from 'vant'
  import {Icon} from 'vant'

  Vue.use(Icon)
  Vue.use(Popup)
  Vue.use(PullRefresh)
  Vue.use(List)
  Vue.use(Row).use(Col)
  Vue.use(Field)
  Vue.use(Tag)
  Vue.use(Cell).use(CellGroup)

  Vue.use(Tab).use(Tabs)

  export default {
    name: 'recharge',
    data() {
      return {
        tabActive:1,//当前激活的大tab索引

        onLineRchType:0,//当前在线充值方式 0-支付宝 1-微信
        aliPayRchList:[
          10,20,30,40,50,60,70,80
        ],
        wxRchList:[
          1,10,15,20,25,30,40,55
        ],
        onLineRchAmount:'',//在线充值金额

        list: [],
        loading: false,
        finished: false,

        isLoading: false,
        show: false,
        value: '',

        serviceList:[],//客服列表

        page:1,//充值列表当前页数
        rechargeList:[],//充值列表
      }
    },
    created(){
      this.onTabClick(this.tabActive);
    },
    mounted() {

    },
    methods: {
      getServiceList(){
        $sr.serviceList().then((res)=>{
          this.serviceList = res.data;
        });
      },
      copyWx(text){
        $util.copyText(text);
        this.$toast("复制成功");
      },
      //标签栏点击
      onTabClick(index,title){
        if(index===1&&!this.serviceList.length){
          this.getServiceList();
        }else if(index===2&&!this.rechargeList.length){
          //加载数据的方法由 van-list 的load方法触发一次
          // this.getRchList();
        }else if(index===0){
          if(!this.$store.getters.userBalance)this.$store.dispatch("fetchUserInfo");//获取用户信息
        }
      },
      /*在线充值-s*/
       //选择金额
      selRchAmt(amt){
        this.onLineRchAmount = amt;
      },
      //提交充值
      userRecharge(){
        if(!parseInt($util.trim(this.onLineRchAmount))){
          this.$toast("请选择充值金额");
          return;
        }
        let sd = {
          amount:this.onLineRchAmount,
          paytype:this.onLineRchType==0?"Alipay":"Wxpay",
        }
        $sr.getRechargeRecord(sd).then((res)=>{
          this.$dialog.alert({
            message:'充值成功'
          }).then(()=>{
            this.onLineRchAmount = '';
            this.$store.dispatch("fetchUserInfo");//更新用户信息
          });
        }).catch((err)=>{
          //请求失败捕捉
          /*this.$dialog.alert({
            message:err.message
          })*/
        });
      },
      /*在线充值-e*/
      onStart(e) {
        const point = e.touches ? e.touches[0] : e
      },
      onRefresh() {
        this.page = 1;
        this.finished = false;
        this.getRchList(true);
      },
      getRchList(isFresh){
        if( this.finished) return;
        $sr.getRechargeRecord({page:this.page}).then((res)=>{
          if(!res.data.data){
            this.finished = true;
          }else{
            if(isFresh){
              this.rechargeList = res.data.data;
              this.$toast("刷新成功");
            }else{
              this.rechargeList = this.rechargeList.concat(res.data.data);
            };
            this.listTotalLength = res.data.total;
          }
          console.log(this.rechargeList,'数据')
          this.page++;
        }).catch((err)=>{
          this.finished = true;
          this.$toast("没有更多了");
        }).finally(()=>{
          this.loading = false;
          this.isLoading = false;
        });
      },
      onLoad() {
        if(this.listTotalLength&&this.listTotalLength==this.rechargeList.length){
          this.finished = true;
          this.loading = false;
          return;
        };
        this.getRchList();
      }
    }
  }
</script>


