<template>
  <div class="agent">
    <div class="header">
      <div class="freshTip">
        <van-icon name="info-o"/>
        统计数据每60分钟更新一次
      </div>
      <div class="total">
        <div class="totalItem totalLeft">
          <div class="toData">
            <span>{{agentInfo.invitCount}}</span>/
            <span>{{agentInfo.teamCount}}</span>人
          </div>
          <div class="toDesc">
            下级/团队
          </div>
        </div>
        <div class="totalItem totalRight">
          <div class="toData">
            <span>{{agentInfo.commssion}}</span>元
          </div>
          <div class="toDesc">
            总计返佣
          </div>
        </div>
      </div>
    </div>
    <div class="agentDesc s_border">
      <div class="yjMs">
        佣金比例：<b>{{agentInfo.rateAmount}}%</b> / 今日待结：<b>0</b>元
      </div>
      <div class="yjTip">
        Tip: 佣金于每日凌晨十二点进行结算并发放至佣金余额！
      </div>
    </div>
    <div class="bigBorder"></div>
    <div class="botNav">
      <van-cell @click="toUserListPage" icon="friends-o" is-link>
        <div>设置下级返佣比例</div>
        <template slot="title">
          <span class="custom-text">直属下级玩家</span>
        </template>
      </van-cell>
      <van-cell @click="toCashPage" icon="balance-o" is-link>
        <div>余额：<b>{{agentInfo.userAgentInfo.commssion}}</b></div>
        <template slot="title">
          <span class="custom-text">佣金提现</span>
        </template>
      </van-cell>
      <van-cell @click="toCommissionPage" icon="refund-o" is-link>
        <div>查看返佣明细</div>
        <template slot="title">
          <span class="custom-text">返佣记录</span>
        </template>
      </van-cell>
      <van-cell @click="toRecordPage" icon="balance-list-o" is-link>
        <div>对账入口</div>
        <template slot="title">
          <span class="custom-text">账单明细</span>
        </template>
      </van-cell>
      <van-cell @click="toMyQrCodePage" icon="qr" is-link>
        <div>专属推广海报</div>
        <template slot="title">
          <span class="custom-text">推广海报</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Icon} from 'vant'
  import {Cell, CellGroup} from 'vant'

  Vue.use(Cell).use(CellGroup)
  Vue.use(Icon)

  export default {
    name: 'agent',
    data() {
      return {
        agentInfo: {
          invitCount: '0',//下级
          rateAmount: '0',//佣金比例
          subAgentInfo: null,
          teamCount: '0',//团队
          toBeSettlement: '0',//今日待结
          userAgentInfo: {
            inviter_id: 0,
            unique_id: 83782,
            agent_rate: '0',
            commssion: '0.000',//佣金提现
            name: 'q'
          },
          agent_rate: '0',
          commssion: '0.000',//总计佣金
          inviter_id: 0,
          name: 'q',
          unique_id: 83782
        }
      }
    },
    mounted() {

    },
    methods: {
      //获取代理信息预览
      getUserAgengtInfo() {
        $sr.userAgentInfo(res => {
          Object.assign(this.agentInfo,res.data);
        })
      },

      toUserListPage() {
        this.$router.push({
          path: 'userList'
        })
      },
      toCashPage() {
        this.$router.push({
          path: 'cash'
        })
      },
      toCommissionPage() {
        this.$router.push({
          path: 'commission'
        })
      },
      toRecordPage() {
        this.$router.push({
          path: 'record/42701a'
        })
      },
      toMyQrCodePage() {
        this.$router.push({
          path: 'myQrCode'
        })
      },
      onStart(e) {
        const point = e.touches ? e.touches[0] : e
      },
    }
  }
</script>

<style scoped>
  .agent {

  }

  .header {
    width: 100%;
    height: 120px;
    color: #ffe2b1;
    background: #ef453a;
    text-align: center;
  }

  .freshTip {
    font-size: 14px;
    padding: 10px 0;
    vertical-align: middle;
    line-height: 20px;
  }

  .freshTip i {
    position: relative;
    top: 2px;
  }

  .agent {
    min-height: 100vh;
    background: #fff;
  }

  .total {
    width: 100%;
    height: 56px;
    margin-top: 5px;
  }

  .totalItem {
    box-sizing: border-box;
    width: 50%;
    float: left;
    height: 56px;
    font-size: 14px;
  }

  .totalItem span {
    font-size: 29px;
  }

  .toData {
    line-height: 30px;
  }

  .toDesc {
    line-height: 24px;
  }

  .totalItem:nth-child(1) {
    border-right: 1px solid #ffe2b1;
  }

  .bigBorder {
    height: 10px;
    background: #f7f7f7;
  }

  .agentDesc {
    padding: 10px;
    text-align: center;
  }

  .yjMs {
    font-size: 16px;
    line-height: 30px;
    color: #000;
  }

  .yjTip {
    font-size: 12px;
    color: rgb(239, 69, 58);
    line-height: 20px;
  }

  .botNav .van-cell {
    padding: 15px
  }

  .botNav .van-icon.van-cell__left-icon {
    font-size: 18px;
  }

  .botNav b {
    color: rgb(242, 85, 66);
  }

  .custom-text {
    font-size: 16px;
  }
</style>
