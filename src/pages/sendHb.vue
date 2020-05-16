<template>
  <div class="sendHb">
    <div class="sendHbWrap">
      <div class="iptBox" @click="showSelMoney">
        <div class="iptLeft tl">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAmCAMAAAB9PwLlAAABCFBMVEXINzfxT0//VFX/VVb/VVX/VVXuTUz/VFb7U1PPPjbQPjbVVVXQPTj/VFXvTU2+OjP2UVG4Ny+/OjPxT079VFTIOzO5NzC7ODDgSET+VFXuTUzDPDXPPTbJPDTHPjfrTEr3UVHUQz7MPDW9ODHGPTbiSUX5UlL/Y1X9d1b+VFTqTEnNQDrGOzPOPTbEOjO5Ny/KPzncRkLtTEv6UlP+Z1X5uVf311fvTk3fSETPQTy+OTK+OTHLPDXNPTXCOTK9RDPyy1Tzy1XISTm9ODDKOzTOPTXGOzS+ODDel0e6NzDDOjLFOzPuv1HFOjPMPDTzzVTHOjTor03Mazvaj0W/OTHIYDnel0bKPDSJKm3bAAAADXRSTlMcqOblhwa1iPTmiAaJhAmmrgAAARBJREFUOMvtz1lTwjAUBeCIa4tVD2rcLm6ouLW4QNyouxWUCmX9///ElLYjD20zvvngecq955tkwthYxkjO+MQkmzLSM81mFCLDDFX+jJhTivkFlUBuMRUssWW+srqWDNY3GOU5NrcS+u0dgBHtFoC9/YNgVzwsRvXR8QnAT6Ug0yrJ49n5xWW5IoSolOXrV9c3twDuquQLIvueyxEPj8LP03Ou5I94eZVdIIjenHegJoLU/Lr+UR02kZD5RCMUDRTcr2g9Iiw0Q9GE9bMeES14ofDQihU2b4eize1YQS46Q9CBS/GCuuj1vX4PXUoS5NT9bzqULMgc5AcmpYmY/ItfC00BNKYrhM6yetot2mz2GzBnfVaSwdeVAAAAAElFTkSuQmCC"
            alt="">
          总金额
        </div>
        <div class="iptRight tr">
          <b :class="{empty:!selMoney}">{{selMoney||'请选择发包金额'}}</b>
          <span>金</span>
        </div>
      </div>
      <div class="hbDesc">
        当前为拼手气红包，最多可埋雷6个
      </div>
      <div class="iptBox" @click="showSelAmount">
        <div class="iptLeft tl">
          总个数
        </div>
        <div class="iptRight tr">
          <b :class="{empty:!selAmount}">{{selAmount||'请选择发包个数'}}</b>
          <span>个</span>
        </div>
      </div>
      <div class="iptBox">
        <div class="iptLeft tl">
          红包埋
        </div>
        <div class="iptRight tr">
          <b class="empty" v-show="!curSelLz.length">请选择雷值</b>
          <div class="seledLz hbDtlHTopAni" v-for="item,index in curSelLz" :key="index">
            {{item.value}}
          </div>
        </div>
      </div>
      <div class="hbDesc">
        提示：再次点击选中的雷值以取消
      </div>
      <div class="lzList w92">
        <van-row gutter="5">
          <van-col v-for="item,index in allLz" :key="index" span="6">
            <div class="selLz hbDtlHTopAni" :class="{active: item.isSel}" @click="selLz(index)">
              {{item.value}}
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="curSelMoney">
        ￥<b>{{selMoney||'0'}}.00</b>
      </div>
      <div class="w92" style="margin-top:10px;">
        <van-button @click='sendPacket' type="danger" style="margin-top:10px;maring-botton:15px" size="large">塞进红包</van-button>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" style="over-flow:hidden;height:auto;">
      <div class="w92 moneyBtnWrap">
        <van-picker
          show-toolbar
          title="选择发包金额"
          :columns="moneyColumns"
          @cancel="moneyOnCancel"
          @confirm="moneyOnConfirm">
        </van-picker>
      </div>

    </van-popup>
    <van-popup v-model="showAmount" position="bottom" style="over-flow:hidden;height:auto;">
      <div class="w92 moneyBtnWrap">
        <van-picker
          show-toolbar
          title="选择发包数量"
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm">
        </van-picker>
      </div>
    </van-popup>
  </div>
</template>


<style scoped>
  .curSelMoney {
    text-align: center;
    line-height: 48px;
    color: #222;
    font-size: 14px;
    margin-top: 10px;
  }

  .curSelMoney b {
    font-size: 46px;
  }

  .lzList .van-col--6 {
    width: 20%;
  }

  .lzList {
    text-align: center;
    min-height: 112px;
  }

  /**/
  .selLz {
    margin: 0 auto;
    background: url(../assets/img/ball-2.dcb658a.png) no-repeat !important;
    background-size: 100% 100% !important;
    height: 46px;
    width: 46px;
    line-height: 46px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .selLz:nth-child(odd) {
    background: url(../assets/img/ball-1.7539696.png) no-repeat !important;
    background-size: 100% 100% !important;
  }

  .selLz.active {
    background: url(../assets/img/ball.8c42dec.png) no-repeat !important;
    background-size: 100% 100% !important;
  }
  .seledLz{
    background: url(../assets/img/ball.8c42dec.png) no-repeat !important;
    background-size: 100% 100% !important;
    text-align: center;
    height: 26px;
    width: 26px;
    line-height: 26px;
    color: #000;
    font-size: 12px;
    font-weight: bold;
    float: right;
    margin-right: 5px;
    margin-top: 10px;
    transition: trans;
  }

  .iptBox {
    background: #fff;
    border-radius: 5px;
    padding: 0 10px;
    position: relative;
    vertical-align: middle;
    height: 46px;
    line-height: 46px;
    margin-bottom: 10px;
  }

  .iptLeft {
    font-size: 16px;
    color: #333;
    float: left;
  }

  .iptRight {
    float: right;
    font-size: 16px;
  }

  .iptRight .empty {
    font-weight: normal;
    color: #999;
  }

  .iptLeft img {
    width: 15px;
    position: relative;
    top: 2px;
  }

  .sendHbWrap {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0;
  }

  .sendHb {
    min-height: 100vh;
    background: #f7f7f7;
  }

  .hbDesc {
    font-size: 14px;
    color: #c5984c;
    font-weight: bold;
    line-height: 20px;
    margin-bottom: 10px;
  }
</style>

<script>
  import Vue from 'vue'
  import {Cell, CellGroup} from 'vant'
  import {Row, Col} from 'vant'
  import {Popup} from 'vant'
  import {Icon} from 'vant'
  import {Picker} from 'vant'

  Vue.use(Picker)
  Vue.use(Icon)
  Vue.use(Popup)
  Vue.use(Row).use(Col)
  Vue.use(Cell).use(CellGroup)

  export default {
    name: 'sendHb',
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        count: 0,
        isLoading: false,
        show: false,
        value: '',

        selMoney:"",//当前选择金额
        selAmount:"",//当前选择红包数量

        allLz:[],//所有雷值
        curSelLz:[],//当前选择的雷值数组

        moneyColumns: [
          {
            text: '100',
            value:100,
          }
        ],

        showAmount:false,
        columns:[
          {
            text:'1包',
            value:1,
          }
        ],

      }
    },
    created(){
      this.getRules();
    },
    mounted() {

    },
    methods: {

      //获取规则
      getRules(){
        let groupNumber = this.$route.params.id;
        this.group_number = groupNumber;

        $sr.groupRules({group_number:groupNumber}).then((res)=>{
          this.initData(res);
        }).catch((err)=>{
          return;
          if(err.status_code==400){
            this.$dialog({message: err.message}).then(()=>{
              this.$router.push({path:'/login'});
            })
          }
        });
      },
      // 初始化数据
      initData(data){
        console.log(data,"444");
         this.moneyColumns = data.data.level_limit_amount.map((item)=>{
          if(item) return {
            text:`${item}金`,
            value:item,
          }
        });
        this.columns = data.data.level_packet_num.map((item)=>{
          if(item) return {
            text:`${item}包`,
            value:item,
          }
        });
        //雷值列表
        let arr = [];
        for(let i = 0;i<10;i++){
          arr[i] = {
            value:i,
            isSel:false,
          }
        }
        this.allLz = arr;

        this.level_limit_lei = data.data.level_limit_lei;
      },
      //选择雷
      selLz(index){
        if(this.curSelLz.length>=this.level_limit_lei&&!this.allLz[index].isSel){
          this.$toast(`不能大于${this.level_limit_lei}个雷`);
          return;
        }
        this.allLz[index].isSel = !this.allLz[index].isSel;
        if(this.allLz[index].isSel){
          this.curSelLz = [...this.curSelLz,this.allLz[index]]
        }else{
          for(let i = 0;i<this.curSelLz.length;i++){
            if(this.curSelLz[i]===this.allLz[index]){
              this.curSelLz.splice(i,1);
              break;
            };
          }
        }
        console.log(this.curSelLz);
      },
      showSelMoney() {
        this.show = true
      },
      showSelAmount(){
        this.showAmount = true;
      },

      sendPacket() {
        if(!this.selMoney){
          this.$toast("请选择发包金额");
          return;
        }else if(!this.selAmount){
          this.$toast("请选择发包数量");
          return;
        }else if(!this.curSelLz.length){
          this.$toast("请选择发包埋雷");
          return;
        }
        let red_lei = this.curSelLz.map(item=>item.value).join(',');

        let sd = {
          group_number: this.group_number,
          red_amount: this.selMoney,
          red_lei,
          red_nums: this.selAmount,
          red_type: 1,//默认类型
        };
        $sr.sendRedPacket(sd).then((res)=>{
          this.$dialog.alert({message:res.message}).then(()=>{
            this.$router.push({path:'/home'});
          });
        }).catch((err)=>{
          this.$dialog.alert({message:err.message});
        });

      },

      moneyOnConfirm(item, index) {
        // this.$toast(`当前值：${item.value}, 当前索引：${index}`)
        this.show = false
        this.selMoney = item.value;
      },
      moneyOnCancel() {
        this.$toast('取消')
        this.show = false;
      },

      onConfirm(item, index) {
        // this.$toast(`当前值：${item.value}, 当前索引：${index}`)
        this.showAmount = false
        this.selAmount = item.value;
      },
      onCancel() {
        this.$toast('取消')
        this.showAmount = false
      }
    }
  }
</script>


