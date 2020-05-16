<template id="tpl">
  <div class="home">
    <div class="header" @touchmove.prevent="null">
      <div class="headerBox">
        <div class="headInfo">
          <img class="userImage" :src="$store.state.app.imgPath+userInfo.avatar" :key=""/>
          <div class="userDesc">
            <div>用户ID:&nbsp;<span class="uId">{{userInfo.id}}</span></div>
            <div>金&nbsp;&nbsp;&nbsp;币:&nbsp;&nbsp;<span class="uMoney">{{userInfo.balance}}</span></div>
          </div>
        </div>
        <div class="headIcon">
          <a class="oprIcon" @click="toQrCodePage"><img src="../assets/img/fenxiang.5edaa0a.png">分享</a>
          <div class="oprIcon" @click="toRchPage"><img src="../assets/img/chongzhi.e1047f6.png">充值</div>
          <div class="oprIcon" @click="toCashPage"><img src="../assets/img/tixian.fb51b07.png">提现</div>
          <div class="oprIcon" @click="playOpenAni"><img src="../assets/img/fudai.32b3a42.png">福利</div>
        </div>
      </div>
      <van-notice-bar class="homeNotice"
                      :text="userInfo.notice"
                      left-icon="volume-o"
      />
    </div>
    <div
      id="chatListBox"
      class="wrapper"
      ref="wrapper"
      @touchstart="onStart"
      @touchmove.prevent="onMove"
      @touchend="onEnd"
      @touchcancel="onEnd"
      @mousedown="onStart"
      @mousemove.prevent="onMove"
      @mouseup="onEnd"
      @mousecancel.prevent="onEnd"
      @mouseleave.prevent="onEnd"
      @transitionend="onTransitionEnd">
      <ul class="list aui-chat" ref="scroller" :style="scrollerStyle">

        <li diy="666" v-for="(item,index) in hbList" :key="item.id" class="aui-chat-item " :class="{'aui-chat-left':!item.isMy,'aui-chat-right':item.isMy}" style="pointer-events: auto;">
          <div diy="666" class="aui-chat-media">
            <img diy="666" v-lazy="item.avatar">
          </div>
          <div diy="666" class="aui-chat-inner">
            <div diy="666" class="aui-chat-name">{{item.fromUser}}&nbsp;</div>
            <div diy="666" @click="sendGetHbDetail(item.id)" class="aui-chat-content  chat-left " :class="{'lottery-empty':item.isOpen}">
              <span diy="666" class="lottery yellow-bg" :class="{'chat-triangle-left':!item.isMy,'chat-triangle-right':item.isMy}"></span>
              <div diy="666" class="lottery-up">
                <img diy="666" :src="item.isOpen?require('../assets/img/bac.1cc8a92.png'):require('../assets/img/redpack.0d953a3.png')" class="lottery-img">
                <div diy="666" class="lottery-content">
                  <div diy="666" class="aui-text-left">
                    <span diy="666" style="font-size: 16px;">
                      <b diy="666" class="ng-binding">{{item.moneyInfo}}</b>
                    </span>
                  </div>
                  <div diy="666" class="aui-text-left">
                    <span diy="666" class="ng-binding" style="font-size: 12px;">{{item.trapInfo}}</span>
                  </div>
                </div>
              </div>
              <div diy="666" class="lottery-down">
                <div diy="666" class="ng-binding aui-text-left hbBotDesc">
                  紫禁城
                  <span diy="666" class="red-count aui-pull-right">
                    <img diy="666" src="../assets/img/solo.67bea0d.png" width="16" alt="" style="vertical-align: middle; display: inline-block;">
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-show="item.my_rob_detail.rob_amount!=0" diy="888" class="aui-chat-header red-result-myself" style="font-family: 微软雅黑 !important;">
            <img diy="888"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAmCAMAAAB9PwLlAAABCFBMVEXINzfxT0//VFX/VVb/VVX/VVXuTUz/VFb7U1PPPjbQPjbVVVXQPTj/VFXvTU2+OjP2UVG4Ny+/OjPxT079VFTIOzO5NzC7ODDgSET+VFXuTUzDPDXPPTbJPDTHPjfrTEr3UVHUQz7MPDW9ODHGPTbiSUX5UlL/Y1X9d1b+VFTqTEnNQDrGOzPOPTbEOjO5Ny/KPzncRkLtTEv6UlP+Z1X5uVf311fvTk3fSETPQTy+OTK+OTHLPDXNPTXCOTK9RDPyy1Tzy1XISTm9ODDKOzTOPTXGOzS+ODDel0e6NzDDOjLFOzPuv1HFOjPMPDTzzVTHOjTor03Mazvaj0W/OTHIYDnel0bKPDSJKm3bAAAADXRSTlMcqOblhwa1iPTmiAaJhAmmrgAAARBJREFUOMvtz1lTwjAUBeCIa4tVD2rcLm6ouLW4QNyouxWUCmX9///ElLYjD20zvvngecq955tkwthYxkjO+MQkmzLSM81mFCLDDFX+jJhTivkFlUBuMRUssWW+srqWDNY3GOU5NrcS+u0dgBHtFoC9/YNgVzwsRvXR8QnAT6Ug0yrJ49n5xWW5IoSolOXrV9c3twDuquQLIvueyxEPj8LP03Ou5I94eZVdIIjenHegJoLU/Lr+UR02kZD5RCMUDRTcr2g9Iiw0Q9GE9bMeES14ofDQihU2b4eize1YQS46Q9CBS/GCuuj1vX4PXUoS5NT9bzqULMgc5AcmpYmY/ItfC00BNKYrhM6yetot2mz2GzBnfVaSwdeVAAAAAElFTkSuQmCC"
                                                                                                                                                                       width="12" style="display: inline-block; margin-top: -3px; vertical-align: middle;">
            抢包：<b  diy="888" class="result-receive">{{item.my_rob_detail.all_amount}}</b>金，
            <span diy="888">
              <span diy="888">
                <span diy="888" :class="item.my_rob_detail.rob_amount<0?'result-bad':'result-lucky'">[{{item.my_rob_detail.is_kui=='1'?'幸运':'中雷'}}]</span>
                增加：<b diy="888" :class="item.my_rob_detail.rob_amount<0?'result-bad':'result-lucky'">{{item.my_rob_detail.rob_amount}}</b>金
              </span>
            </span>
          </div>
        </li>

        <!--<li diy="666" @click="showBigHb(true)" class="aui-chat-item aui-chat-left" style="pointer-events: auto;">
          <div diy="666" class="aui-chat-media">
            <img diy="666" src="http://47.113.57.168/upload/files/avatars/0e5a2b88ccc7f6483d670e45927d2614.jpg">
          </div>
          <div diy="666" class="aui-chat-inner">
            <div diy="666" class="aui-chat-name">老仙女&nbsp;</div>
            <div diy="666" class="aui-chat-content  chat-left lottery-empty">
              <span diy="666" class="lottery yellow-bg chat-triangle-left"></span>
              <div diy="666" class="lottery-up">
                <img diy="666" src="../assets/img/bac.1cc8a92.png" class="lottery-img">
                <div diy="666" class="lottery-content">
                  <div diy="666" class="aui-text-left">
                    <span diy="666" style="font-size: 16px;">
                      <b diy="666" class="ng-binding">40金/9包</b>
                    </span>
                  </div>
                  <div diy="666" class="aui-text-left">
                    <span diy="666" class="ng-binding" style="font-size: 12px;">雷号:2,3,5</span>
                  </div>
                </div>
              </div>
              <div diy="666" class="lottery-down">
                <div diy="666" class="ng-binding aui-text-left hbBotDesc">
                  紫禁城
                  <span diy="666" class="red-count aui-pull-right">
                    <img diy="666" src="../assets/img/solo.67bea0d.png" width="16" alt="" style="vertical-align: middle; display: inline-block;">
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li diy="666" class="aui-chat-item aui-chat-left">
          <div diy="666" class="aui-chat-media">
            <img diy="666" src="http://dfhhb1.0001wan.com/upload/files/avatars/d1ed5c3ab1c4359d647966fdbabb1dd8.jpg">
          </div>
          <div diy="666" class="aui-chat-inner">
            <div diy="666" class="aui-chat-name">让你开&nbsp;</div>
            <div diy="666" class="aui-chat-content  chat-left">
              <span diy="666" class="lottery yellow-bg chat-triangle-left"></span>
              <div diy="666" class="lottery-up">
                <img diy="666" src="../assets/img/redpack.0d953a3.png" class="lottery-img">
                <div diy="666" class="lottery-content">
                  <div diy="666" class="aui-text-left">
                    <span diy="666" style="font-size: 16px;">
                      <b diy="666" class="ng-binding">150金/8包</b>
                    </span></div>
                  <div diy="666" class="aui-text-left">
                    <span diy="666" class="ng-binding" style="font-size: 12px;">雷号:0,1,2,3</span>
                  </div>
                </div>
              </div>
              <div diy="666" class="lottery-down">
                <div diy="666" class="ng-binding aui-text-left hbBotDesc">
                  紫禁城
                  <span diy="666" class="red-count aui-pull-right">
                    <img diy="666" src="../assets/img/solo.67bea0d.png" width="16" alt="" style="vertical-align: middle; display: inline-block;">
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li diy="666" class="aui-chat-item aui-chat-right" style="pointer-events: auto;">
          <div diy="666" class="aui-chat-media">
            <img diy="666" src="http://47.113.57.168/upload/files/avatars/dd8a9fea99eebfe5dee5329d53db870c.jpg">
          </div>
          <div diy="666" class="aui-chat-inner">
            <div diy="666" class="aui-chat-name">遇见不真实&nbsp;</div>
            <div diy="666" class="aui-chat-content  chat-right lottery-empty">
              <span diy="666" class="lottery yellow-bg chat-triangle-right"></span>
              <div diy="666" class="lottery-up">
                <img diy="666" src="../assets/img/bac.1cc8a92.png" class="lottery-img">
                <div diy="666" class="lottery-content">
                  <div diy="666" class="aui-text-left"><span diy="666" style="font-size: 16px;">
                    <b diy="666" class="ng-binding">10金/5包</b></span>
                  </div>
                  <div diy="666" class="aui-text-left">
                    <span diy="666" class="ng-binding" style="font-size: 12px;">雷号:1</span>
                  </div>
                </div>
              </div>
              <div diy="666" class="lottery-down">
                <div diy="666" class="ng-binding aui-text-left hbBotDesc">
                  紫禁城
                  <span diy="666" class="red-count aui-pull-right">
                    <img diy="666" src="../assets/img/solo.67bea0d.png" width="16" alt="" style="vertical-align: middle; display: inline-block;">
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li diy="666" class="aui-chat-item aui-chat-right" style="pointer-events: auto;">
          <div diy="666" class="aui-chat-media">
            <img diy="666" src="http://47.113.57.168/upload/files/avatars/dd8a9fea99eebfe5dee5329d53db870c.jpg">
          </div>
          <div diy="666" class="aui-chat-inner">
            <div diy="666" class="aui-chat-name">遇见不真实&nbsp;</div>
            <div diy="666" class="aui-chat-content  chat-right">
              <span diy="666" class="lottery yellow-bg chat-triangle-right"></span>
              <div diy="666" class="lottery-up">
                <img diy="666" src="../assets/img/redpack.0d953a3.png" class="lottery-img">
                <div diy="666" class="lottery-content">
                  <div diy="666" class="aui-text-left"><span diy="666" style="font-size: 16px;">
                    <b diy="666" class="ng-binding">10金/5包</b></span>
                  </div>
                  <div diy="666" class="aui-text-left">
                    <span diy="666" class="ng-binding" style="font-size: 12px;">雷号:1</span>
                  </div>
                </div>
              </div>
              <div diy="666" class="lottery-down">
                <div diy="666" class="ng-binding aui-text-left hbBotDesc">
                  紫禁城
                  <span diy="666" class="red-count aui-pull-right">
                    <img diy="666" src="../assets/img/solo.67bea0d.png" width="16" alt="" style="vertical-align: middle; display: inline-block;">
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>-->

      </ul>
    </div>
    <div class="footer" :class="{active:footerActive}">
      <div class="footerWrap s_border_top">
        <van-row class="sendArea">
          <van-col class="kfBtn" span="4">
            <img @click="toRchPage(1)" src="../assets/img/kefu.896ea8f.png" alt="">
          </van-col>
          <van-col span="16">
            <van-button class="sendHbBtn" @click="toSendHb" type="danger">点击 发包</van-button>
          </van-col>
          <van-col class="moreBtn" span="4">
            <img src="../assets/img/type.4338ef7.png" id="moreBtn" @click="toggleFooter" alt="">
          </van-col>
        </van-row>
        <div class="moreActionWrap s_border_top">
          <van-row class="moreOprArea">
            <van-col span="6">
              <div class="oprItem" @click="toRecord"><img src="../assets/img/record.20bef2f.png" alt=""></div>
              <p>记录</p>
            </van-col>
            <van-col span="6">
              <div class="oprItem" @click="toRchPage"><img src="../assets/img/recharge.e21f85f.png" alt=""></div>
              <p>充值</p>
            </van-col>
            <van-col span="6">
              <div class="oprItem" @click="toCashPage"><img src="../assets/img/forward.8b1437a.png" alt=""></div>
              <p>提现</p>
            </van-col>
            <van-col span="6">
              <div @click="toTransferPage" class="oprItem"><img src="../assets/img/zhuanzhang.b02d493.png" alt=""></div>
              <p>转账</p>
            </van-col>
            <van-col span="6">
              <div class="oprItem" @click="toAgentPage"><img src="../assets/img/agent.fbb75d7.png" alt=""></div>
              <p>代理</p>
            </van-col>
            <van-col span="6">
              <div class="oprItem" @click="toQrCodePage">
                <img src="../assets/img/opr_ewm.png" alt="">
              </div>
              <p>分享</p>
            </van-col>
            <van-col span="6">
              <div class="oprItem" @click="groupAutoRob" id="miaoId" :class="{'active':isAutoGetHb}">
                <img v-show="isAutoGetHb" id="miaoId1" src="../assets/img/miao-h.29517fb.png" alt="">
                <img v-show="!isAutoGetHb" id="miaoId2" src="../assets/img/miao.4c047d3.png" alt="">
              </div>
              <p>秒抢</p>
            </van-col>
            <van-col span="6">
              <div @click="toRulerPage" class="oprItem"><img src="../assets/img/rule.e8ffb86.png" alt=""></div>
              <p>规则</p>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>

    <!--红包节点-->
    <div diy="hongbao" class="redpacket" v-show="hbAni.showBigHb">
      <div diy="hongbao" class="packet-content animated" :class="{bounceIn:hbAni.showBigHb}">
        <div diy="hongbao" class="rednorth">
          <div diy="hongbao" class="avatar">
            <img diy="hongbao" :src="$store.state.app.imgPath+curHbDtl.red_detail.data.user.avatar">
          </div>
          <div diy="hongbao" class="nickName aui-text-center">{{curHbDtl.red_detail.data.user.name}}</div>
          <div diy="hongbao" class="red-notice aui-font-size-20 aui-text-center">
            <span diy="hongbao">{{!curHbDtl.red_detail.data.red_status?'恭喜发财，大吉大利':'红包已被领完'}}</span>
          </div>
          <div diy="hongbao" id="redgame-desc-bei" class="aui-font-size-20 aui-text-center aui-margin-t-10" style="color: rgb(255, 226, 177);">
            {{curHbDtl.red_detail.data.remark}}
          </div>
          <div diy="hongbao" id="redgame-desc-lei" class="aui-font-size-20 aui-text-center aui-margin-t-10" style="color: rgb(255, 226, 177);">
            雷值: {{curHbDtl.red_detail.data.red_lei}}
          </div>
          <div diy="hongbao" class="open" style="font-weight: bolder;margin-left: -50px;">
            <a @click="toHbDetail(curHbDtl.red_detail.data.id,curHbDtl.group_number)" v-show="curHbDtl.red_detail.data.red_status" diy="hongbao" href="javascript:;" class="aui-font-size-16">查看大家的手气&gt;</a>
            <img v-show="!curHbDtl.red_detail.data.red_status" diy="hongbao" @click="robRedPacket(curHbDtl.red_detail.data.id,curHbDtl.group_number)" :class="{openAnimation:hbAni.isOpenPct}" src="../assets/img/b5t.0146ed7.png" red-id="redPackInfo.id" width="100" alt="">
          </div>
        </div>
        <div diy="hongbao" class="redpacket-footer">
          <img diy="hongbao" src="../assets/img/b8o.e436396.png" width="20" alt="">
        </div>
      </div>
      <div diy="hongbao" class="close">
        <img diy="hongbao" @click="showBigHb(false)" src="../assets/img/close.4ed9e9b.png" width="45" alt="">
      </div>
    </div>

<!--    声音-->
    <audio id="music" ref="music" controls="controls" preload="auto" style="opacity: 1; position: fixed; left: -9999px;">
      <source src="../assets/media/clickRedpacket.a34ed0d.mp3" type="audio/mp3">
    </audio>
  </div>

</template>


<script>
  import Vue from 'vue'
  import {Row, Col} from 'vant'
  import {NoticeBar} from 'vant'
  import {mapGetters} from 'vuex'
  import $ws from '../axios/$ws'//

  Vue.use(NoticeBar)
  Vue.use(Row).use(Col)

  export default {
    name: 'home',
    data() {
      return {

        footerActive: false,
        wrapper: null,
        scroller: null,
        minY: 0,
        maxY: 0,
        wrapperHeight: 0,
        offsetY: 0,
        duration: 0,
        bezier: 'linear',
        startY: 0,
        pointY: 0,
        startTime: 0,                 // 惯性滑动范围内的 startTime
        momentumStartY: 0,            // 惯性滑动范围内的 startY
        momentumTimeThreshold: 300,   // 惯性滑动的启动 时间阈值
        momentumYThreshold: 15,       // 惯性滑动的启动 距离阈值
        isStarted: false,             // start锁
        //
        hbList: [
          {
            isOpen: true,//是否打开 未打开高亮显示
            id: 1,
            fromUser: '大富豪',//来自谁
            moneyInfo: '150金/8包',//金额信息
            trapInfo: '雷号:0,1,2,3',//雷信息
            isMy: false,//是否为当前用户发出
            avatar: this.$store.state.app.imgPath+'/files/avatars/0e5a2b88ccc7f6483d670e45927d2614.jpg',
            my_rob_detail: {
              all_amount: 0,//总金额
              is_kui: 1,//是否亏 取反
              rob_amount: 0,//获取金额
            },//抢包信息
            packetType: '紫禁城',
          },
          /*{
            isOpen: false,//是否打开 未打开高亮显示
            fromUser: 'A让你开',//来自谁
            id:2,
            moneyInfo: '100金/2包',//金额信息
            trapInfo: '雷号:0',//雷信息
            isMy: false,//是否为当前用户发出
            avatar: 'http://dfhhb1.0001wan.com/upload/files/avatars/d1ed5c3ab1c4359d647966fdbabb1dd8.jpg'
          },
          {
            isOpen: true,//是否打开 未打开高亮显示
            fromUser: 'A遇见不真实',//来自谁
            id:3,
            moneyInfo: '600金/10包',//金额信息
            trapInfo: '雷号:4,7,9',//雷信息
            isMy: true,//是否为当前用户发出
            avatar: 'http://47.113.57.168/upload/files/avatars/dd8a9fea99eebfe5dee5329d53db870c.jpg'
          },
          {
            isOpen: false,//是否打开 未打开高亮显示
            fromUser: 'A遇见不真实',//来自谁
            moneyInfo: '1000金/11包',//金额信息
            id:4,
            trapInfo: '雷号:5,9',//雷信息
            isMy: true,//是否为当前用户发出
            avatar: 'http://47.113.57.168/upload/files/avatars/dd8a9fea99eebfe5dee5329d53db870c.jpg'
          }*/
        ],//红包
        hbAni: {//红包动画状态相关
          isOpenPct: false,
          showBigHb: false,
        },
        //当前打开的红包详情
        curHbDtl: {
          group_number: '42701a',
          red_detail: {
            data: {
              group_number: '42701a',
              group_type: 5,
              id: 33867,
              red_amount: 10,
              red_lei: '3',
              red_nums: 6,
              red_receive: 6,
              red_status: 1,
              red_type: 1,
              red_y_amount: 10,
              remark: '10金 / 6包 / 1.7倍',
              status_code: 1001,
              status_remark: '手慢了,红包已被领完',
              user: {
                avatar: 'files/avatars/9c9f145e34ace33406517b89128077d4.jpg',
                id: 6,
                name: '还好'
              },
              user_id: 6,
            }
          }
        }
      }
    },
    //keepalive组件的生命周期开始
    activated() {
      if (!$ws.isConnect && $ws.manualClose) {
        $ws._connect()
        console.log('声明吱吱吱吱1111')
      }
      if ($ws.isConnect) {
        this.$nextTick(() => {
          this.initScroll()
        })
      }

      console.log('声明吱吱吱吱')
    },
    //keepalive组件的生命周期结束
    deactivated() {

    },
    computed: {
      scrollerStyle() {
        return {
          'transform': `translate3d(0, ${this.offsetY}px, 0)`,
          'transition-duration': `${this.duration}ms`,
          'transition-timing-function': this.bezier,
        }
      },
      userInfo() {
        return {
          balance: this.$store.state.user.userInfo.balance,
          id: this.$store.state.user.userInfo.unique_id,
          avatar: this.$store.state.user.userInfo.avatar,
          notice: this.$store.state.user.userInfo.notice
        }
      },
      ...mapGetters({
        groupInfo: 'groupInfo',
        isAutoGetHb: 'isAutoGetHb'
      })
    },
    created() {

    },
    mounted() {
      if (!$ws.isConnect) $ws._connect()
      this.addWsHandler()

      this.initList()
      this.$nextTick(() => {
        this.initScroll()
        this.setDocumentClick()
      })

      this.$store.dispatch('fetchUserInfo')
    },
    methods: {

      //发送获取聊天列表红包消息
      getHbList() {
        let $this = this
        let sd = {
          data: {
            group_number: '42701a',
            group_type: 4,
            token: localStorage.getItem('wsToken'),
          },
          type: 'init'
        }
        $ws.send(JSON.stringify(sd))
        console.log('发送数据')
      },
      //发送获取单个红包详情的消息
      sendGetHbDetail(red_id) {
        let sd = {
          data: {
            group_number: '42701a',
            group_type: 4,
            red_id,
            token: localStorage.getItem('wsToken'),
          },
          type: 'ApiPacketDetail'
        }
        $ws.send(JSON.stringify(sd))
      },

      //添加wesocket事件监听
      addWsHandler() {
        //初始化红包列表数据
        let $this = this
        $ws.addHandler('init', (res) => {
          console.log(res, '红包列表数据')
          let chatInfo = res.data.chatinfo//聊天信息
          if (res.data.code !== 200) {
            this.$toast(res.message)
          } else {
            if (chatInfo) {
              //自动抢包状态更新
              let isAutoGetHb = !!chatInfo.is_setting
              $this.$store.commit('setIsAutoGetHb', isAutoGetHb)
              //生成红包聊天列表
              let myId = res.data.uinfo.unique_id//我的id
              $this.hbList = []
              for (let i = 0; i < chatInfo.data.length; i++) {
                let item = chatInfo.data[i]
                console.log(item, 'item')
                let isOpen = !!item.packetInfo.status
                let id = item.id
                let fromUser = item.userInfo.nickname
                let moneyInfo = item.packetInfo.title
                let trapInfo = item.packetInfo.desc
                let isMy = item.userInfo.unique_id == myId
                let avatar = this.$store.state.app.imgPath + item.userInfo.avatar
                let my_rob_detail = item.my_rob_detail
                let packetType = item.packetInfo.packetType
                $this.hbList.push(
                  {
                    isOpen,
                    id,
                    fromUser,
                    moneyInfo,
                    trapInfo,
                    isMy,
                    avatar,
                    my_rob_detail,
                    packetType,
                  }
                )
              }

              $this.$nextTick(() => {
                $this.initScroll()
              })
            }
          }
        })

        //接收单个红包详情数据
        $ws.addHandler('ApiPacketDetail', (res) => {
          console.log(res, '接收单个红包详情数据')
          $this.curHbDtl = res.data
          $this.showBigHb(true)
        })

        $ws.addHandler('sendRedPacket', (res) => {
          console.log(res, '获取发送的单个红包详情,往聊天红包列表中插入数据')
          let myId = $this.$store.state.user.userInfo.unique_id
          let item = res.data
          console.log(item, 'item')
          let isOpen = !!item.packetInfo.status
          let id = item.id
          let fromUser = item.userInfo.nickname
          let moneyInfo = item.packetInfo.title
          let trapInfo = item.packetInfo.desc
          let isMy = item.userInfo.unique_id == myId
          let avatar = this.$store.state.app.imgPath + item.userInfo.avatar
          let my_rob_detail = item.my_rob_detail || {all_amount:0,is_kui:1,rob_amount:0}
          let packetType = item.packetInfo.packetType
          $this.hbList.push(
            {
              isOpen,
              id,
              fromUser,
              moneyInfo,
              trapInfo,
              isMy,
              avatar,
              my_rob_detail,
              packetType,
            }
          )
          $this.$nextTick(() => {
            $this.initScroll()
          })
        })

        //更新已发红包状态
        $ws.addHandler('GroupChatInfo', (res) => {
          console.log(res, '接收更新已发红包状态')
          let red_id = res.data.red_id
          let red_status = res.data.red_status
          let all_amount = res.data.all_amount//总金额
          let is_kui = res.data.is_kui//是否亏
          let rob_amount = res.data.rob_amount//增加金额
          for (let i = 0; i < $this.hbList.length; i++) {
            if ($this.hbList[i].id == red_id) {
              $this.hbList[i].isOpen = !!red_status
              $this.hbList[i].my_rob_detail.all_amount = all_amount
              $this.hbList[i].my_rob_detail.is_kui = is_kui
              $this.hbList[i].my_rob_detail.rob_amount = rob_amount
              break
            }
          }
          $this.$nextTick(() => {
            $this.initScroll();
          })
        })

        $ws.addHandler('error', (res) => {
          console.log(res, '出错')
          if (res.data.code === 401) {
            $wsIns.close()
            $ws.manualClose = true
          }
        })
        $ws.addCloseHandler(() => {
          console.log('连接已经关闭')
          this.$dialog.alert({message: `连接已经断开，请重新登陆!`}).then(() => {
            this.$router.push({path: '/login'})
          })
        })
        $ws.addOpenHandler(() => {
          console.log('连接已经打开2')
          this.getHbList()
        })
      },
      //删除websocket事件监听
      deleteWsHandler() {
        // delete $ws.handlers['getPlayerInfo'];
        // delete $ws.closeHandler['close'];
      },
      //开红包
      robRedPacket(red_id, group_id) {
        $sr.robRedPacket({red_id}).then(res => {
          let amount = res.data.amount//获取的金额
          this.playOpenAni()
          setTimeout(() => {
            this.toHbDetail(red_id, group_id)
          }, 400)
        }).catch(res => {
          if (res.status_code == 400) {//红包已被领完-更新状态
            for (let i = 0; i < this.hbList.length; i++) {
              if (this.hbList[i].id == red_id) {
                this.hbList[i].isOpen = true
                break
              }
            }
            this.curHbDtl.red_detail.data.red_status = 1
          }
        })
      },

      toRchPage(index) {
        if (index != undefined && !isNaN(parseInt(index))) {
          this.$router.push(
            {
              path: '/recharge',
              query: {index}
            }
          )
          return
        }
        this.$router.push({path: '/recharge'})
      },
      toAgentPage() {
        this.$router.push({path: '/agent'})
      },
      toCashPage() {
        console.log(this.$store.state.user.userInfo, 444)
        if (!this.$store.state.user.userInfo.mobile) {
          this.$dialog.confirm({
            message: '您还未认证账号，为了您的账户安全请先认证！'
          }).then(() => {
            this.$router.push({path: '/authAccount'})
          })
          return
        }
        this.$router.push({path: '/cash'})
      },
      toRecord() {
        this.$router.push({path: '/record/42701a'})
      },
      toQrCodePage() {
        this.$router.push({path: '/qrcode/42701a'})
      },
      toHbDetail(red_id, group_id) {
        this.$router.push({path: `/hbDetail/${red_id}/${group_id}`})
        this.showBigHb(false)
      },
      toSendHb() {
        this.$router.push({path: '/sendHb/42701a'})
      },
      toTransferPage() {
        this.$router.push({path: '/transfer'})
      },
      toRulerPage() {
        this.$router.push({path: '/ruler/42701a'})
      },

      //实则hi自动秒抢
      groupAutoRob() {
        let kg = this.isAutoGetHb ? '关闭' : '开启'
        this.$dialog.confirm({
          title: `是否确认${kg}秒抢？`,
          message: '<b>秒</b>在离开群聊页面后自动关闭\n<span style="color:red">注意：直接推出<b>秒</b>不会关闭！</span>'
        }).then(() => {
          const group_number = this.groupInfo.group_number
          $sr.groupAutoRob({group_number}).then(res => {
            this.$store.commit('setIsAutoGetHb', !this.isAutoGetHb)
            this.$toast.success('设置成功')
          })
        })

      },
      //展示大红包
      showBigHb(bool) {
        this.hbAni.showBigHb = bool
        this.hbAni.isOpenPct = false
      },
      //播放红包动画
      playOpenAni() {
        this.hbAni.isOpenPct = true;
        let audio =  document.getElementById('music')
        audio.currentTime = 0;
        audio.play();
      },
      setDocumentClick() {
        let $this = this
        document.addEventListener('click', (event) => {
          let _id = event.target.id
          if (_id === 'moreBtn' || _id === 'miaoId' || _id === 'miaoId1' || _id === 'miaoId2') {

          } else {
            $this.footerActive ? $this.footerActive = false : void (0)
          }
        })
      },
      initList() {
        // for (let i = 0; i < 30; i++) {
        //   this.hbList.push(i)
        // }
      },
      initScroll() {
        this.wrapper = this.$refs.wrapper
        this.scroller = this.$refs.scroller
        const {height: wrapperHeight} = this.wrapper.getBoundingClientRect()
        const {height: scrollHeight} = this.scroller.getBoundingClientRect()
        this.wrapperHeight = wrapperHeight
        this.minY = wrapperHeight - scrollHeight
        this.offsetY = -(scrollHeight - wrapperHeight)
      },
      onStart(e) {
        const point = e.touches ? e.touches[0] : e
        this.isStarted = true
        this.duration = 0
        this.stop()
        this.pointY = point.pageY
        this.momentumStartY = this.startY = this.offsetY
        this.startTime = new Date().getTime()
      },
      onMove(e) {
        if (!this.isStarted) return
        const point = e.touches ? e.touches[0] : e
        const deltaY = point.pageY - this.pointY
        // 浮点数坐标会影响渲染速度
        let offsetY = Math.round(this.startY + deltaY)
        // 超出边界时增加阻力
        if (offsetY < this.minY || offsetY > this.maxY) {
          offsetY = Math.round(this.startY + deltaY / 3)
        }
        this.offsetY = offsetY
        const now = new Date().getTime()
        // 记录在触发惯性滑动条件下的偏移值和时间
        if (now - this.startTime > this.momentumTimeThreshold) {
          this.momentumStartY = this.offsetY
          this.startTime = now
        }
      },
      onEnd(e) {
        if (!this.isStarted) return
        this.isStarted = false
        if (this.isNeedReset()) return
        const absDeltaY = Math.abs(this.offsetY - this.momentumStartY)
        const duration = new Date().getTime() - this.startTime
        // 启动惯性滑动
        if (duration < this.momentumTimeThreshold && absDeltaY > this.momentumYThreshold) {
          const momentum = this.momentum(this.offsetY, this.momentumStartY, duration)
          this.offsetY = Math.round(momentum.destination)
          this.duration = momentum.duration
          this.bezier = momentum.bezier
        }
      },
      onTransitionEnd() {
        this.isNeedReset()
      },
      momentum(current, start, duration) {
        const durationMap = {
          'noBounce': 2500,
          'weekBounce': 800,
          'strongBounce': 400,
        }
        const bezierMap = {
          'noBounce': 'cubic-bezier(.17, .89, .45, 1)',
          'weekBounce': 'cubic-bezier(.25, .46, .45, .94)',
          'strongBounce': 'cubic-bezier(.25, .46, .45, .94)',
        }
        let type = 'noBounce'
        // 惯性滑动加速度
        const deceleration = 0.003
        // 回弹阻力
        const bounceRate = 10
        // 强弱回弹的分割值
        const bounceThreshold = 300
        // 回弹的最大限度
        const maxOverflowY = this.wrapperHeight / 6
        let overflowY

        const distance = current - start
        const speed = 2 * Math.abs(distance) / duration
        let destination = current + speed / deceleration * (distance < 0 ? -1 : 1)
        if (destination < this.minY) {
          overflowY = this.minY - destination
          type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce'
          destination = Math.max(this.minY - maxOverflowY, this.minY - overflowY / bounceRate)
        } else if (destination > this.maxY) {
          overflowY = destination - this.maxY
          type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce'
          destination = Math.min(this.maxY + maxOverflowY, this.maxY + overflowY / bounceRate)
        }

        return {
          destination,
          duration: durationMap[type],
          bezier: bezierMap[type],
        }
      },
      // 超出边界时需要重置位置
      isNeedReset() {
        let offsetY
        if (this.offsetY < this.minY) {
          offsetY = this.minY
        } else if (this.offsetY > this.maxY) {
          offsetY = this.maxY
        }
        if (typeof offsetY !== 'undefined') {
          this.offsetY = offsetY
          this.duration = 500
          this.bezier = 'cubic-bezier(.165, .84, .44, 1)'
          return true
        }
        return false
      },
      stop() {
        // 获取当前 translate 的位置
        const matrix = window.getComputedStyle(this.scroller).getPropertyValue('transform')
        this.offsetY = Math.round(+matrix.split(')')[0].split(', ')[5])
      },
      activeFooter(bool) {
        this.footerActive = bool
      },
      toggleFooter() {
        this.footerActive = !this.footerActive
      },
      add() {
        this.hbList.push(99)
        this.$nextTick(() => {
          this.initScroll()
        })
      }
    }
  }
</script>


<style scoped>
  .homeNotice {
    height: 26px;
    color: #ef453a;
    background: rgba(255, 255, 255, .6);
  }

  #chatListBox {
    height: 100vh;
    background: url('../assets/img/chatBg.png') repeat center;
    background-size: 100% 100%;
  }

  .wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 100%;
    transform: translateY(-50%);
    overflow: hidden;
  }

  .list {
    background: none;
  }

  .list-item {
    height: 80px;
    line-height: 80px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
  }

  .headerBox {
    width: 100%;
    position: relative;
    height: 60px;
    overflow: hidden;
    background: rgb(237, 237, 237);
  }

  .headInfo {
    font-size: 12px;
    float: left;
    height: 100%;
    width: 44%;
    overflow: visible;
    padding-left: 9px;
    padding-top: 9px;
  }

  .userImage {
    display: block;
    float: left;
    width: 44px;
    height: 44px;
    border-radius: 10px;
  }

  .userDesc {
    float: left;
    padding-top: 5px;
    color: #212121;
    margin-left: 5px;
    width: 90px;
    white-space: nowrap;
    overflow: visible;
  }

  .userDesc div {
    line-height: 15px;
  }

  .userDesc div:nth-child(1) {
    margin-top: 2px;
  }

  .userDesc div:nth-child(2) {
    margin-top: 5px;
  }

  .uId {
    color: rgb(239, 69, 58);
  }

  .uMoney {
    color: #f0c40d;
    font-weight: 700;
  }

  .headIcon {
    float: right;
    width: calc(55% - 15px);
    display: flex;
  }

  .oprIcon {
    float: left;
    margin-right: 2px;
    vertical-align: middle;
    text-align: center;
    color: #000;
    font-weight: bold;
    margin-top: 12px;
    cursor: pointer;
    flex: 1;
    font-size: 12px;
  }

  .oprIcon img {
    width: 20px;
    position: relative;
    margin: 0 auto 1px auto;
    display: block;
  }

  .footer {
    transition: transform linear 50ms;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2;
    min-height: 60px;
    background: #f5f5f5;
    transform: translate3d(0, 230px, 0);
  }

  .footer.active {
    transform: translate3d(0, 0, 0);
  }

  .moreActionWrap {
    transition: opacity linear 300ms, transform linear 200ms;
    transform: translate3d(0, 30px, 0);
    opacity: 0.2;
  }

  .footer.active .moreActionWrap {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  .footerWrap {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #eee;
  }

  .sendArea {
    margin: 6px auto;
  }

  .sendHbBtn {
    width: 100%;
    color: #ffe2b1;
    font-weight: bold;
    height: 30px;
    font-size: 12px;
    line-height: initial;
    background: #ea5f39;
  }

  .moreBtn {
    text-align: center;
    padding-top: 2px;
  }

  .kfBtn {
    text-align: center;
    padding-top: 2px;
  }

  .kfBtn img {
    width: 26px;
  }

  .moreBtn img {
    width: 26px;
  }

  .moreActionWrap {
    width: 100%;
    text-align: center;
    padding-bottom: 15px;
  }

  .moreOprArea {
    margin: 0 auto;
    color: #999;
    font-size: 12px;
  }

  .moreOprArea p {
    color: #999;
    font-size: 13px;
    height: 20px;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .moreOprArea .oprItem {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    color: #999;
    text-align: center;
    font-size: 12px;
    background: #fff;
    margin: 22.5px auto 5px;
    display: -webkit-flex;
    -webkit-align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .moreOprArea .oprItem img {
    width: 25px;
    display: block;
    margin: 0 auto;
  }

  .oprItem.active {
    background-color: #ffe53b;
    background-image: linear-gradient(147deg, #ffe53b, #ff2525 74%);
    background-image: -o-linear-gradient(147deg, #ffe53b 0, #ff2525 74%);
  }

  /*聊天列表*/
  .aui-chat {
    padding: 8px;
    padding-top: 96px;
    padding-bottom: 50px;
    min-height: calc(100vh + 1px);
    height: auto;
    overflow: hidden;
  }

  .aui-chat .aui-chat-left {
    float: left;
  }

  .aui-chat .aui-chat-item {
    position: relative;
    width: 100%;
    margin-bottom: 1.5em;
    overflow: hidden;
    display: block;
  }

  .aui-chat .aui-chat-left .aui-chat-media {
    width: 35px;
    float: left;
  }

  .aui-chat .aui-chat-media {
    display: inline-block;
    max-width: 2rem;
  }

  .aui-chat .aui-chat-media img[diy="666"] {
    margin-top: 5px;
  }

  .aui-chat-media img[diy="666"] {
    height: 35px;
    width: 35px;
  }

  .aui-chat .aui-chat-media img {
    border-radius: 5px;
  }

  .aui-chat .aui-chat-left .aui-chat-inner {
    max-width: 90%;
  }

  .aui-chat .aui-chat-inner {
    position: relative;
    overflow: hidden;
    display: inherit;
  }

  .aui-chat .aui-chat-left .aui-chat-name[diy="666"] {
    left: 14px;
    margin-bottom: 0 !important;
    text-align: left;
  }

  .aui-chat .aui-chat-name {
    width: 100%;
    position: relative;
    font-size: 10px;
    color: #757575;
  }

  .aui-chat-left .aui-chat-content[diy="666"] {
    left: 14px !important;
  }

  .aui-chat-content.chat-left[diy="666"] {
    padding: 0 !important;
  }

  .aui-chat-content.chat-left[diy="666"], .aui-chat-content.chat-right[diy="666"] {
    background-color: transparent !important;
    width: 100% !important;
  }

  .aui-chat .aui-chat-left .aui-chat-content {
    background-color: #8ce97f;
  }

  .aui-chat-content[diy="666"] {
    -webkit-box-shadow: #eee 0 1px 10px 0;
    box-shadow: 0 1px 10px 0 #eee;
  }

  .aui-chat .aui-chat-content {
    color: #000;
    font-size: 13px;
    border-radius: .2rem;
    min-height: 2rem;
    position: relative;
    padding: 5px;
    max-width: 72%;
    word-break: break-all;
    word-wrap: break-word;
  }

  .lottery-empty .yellow-bg[diy="666"] {
    border-color: transparent rgba(251, 157, 58, .5) transparent transparent;
  }

  .chat-triangle-left[diy="666"] {
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    top: 9px;
    left: -18px;
    border-style: solid;
    border-width: 7px 9px;
  }

  .lottery-empty .lottery-up[diy="666"] {
    background: url(../assets/img/red-bg-active.222e6fc.png) no-repeat;
    background-color: rgba(251, 157, 58, .5) !important;
  }

  .lottery-lucky-up[diy="666"], .lottery-up[diy="666"] {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 70px;
  }

  .aui-chat .aui-chat-content img {
    max-width: 100%;
    display: block;
  }

  .lottery-img[diy="666"] {
    height: 40px;
    position: absolute;
    top: 10px;
    left: 10px;
    text-align: left;
  }

  .lottery-content[diy="666"] {
    color: #fff;
    position: absolute;
    top: 10px;
    left: 50px;
    font-size: 16px;
    width: 145px;
    overflow: hidden;
  }

  .aui-text-left {
    text-align: left !important;
  }

  .aui-text-left {
    text-align: left !important;
  }

  .lottery-down[diy="666"] {
    line-height: 25px;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .aui-text-left {
    text-align: left !important;
  }

  .red-count[diy="666"] {
    margin-right: 5px;
    float: right;
  }

  .aui-chat .aui-chat-content img {
    max-width: 100%;
  }

  .aui-chat .aui-chat-right {
    float: right;
  }

  .aui-chat .aui-chat-right .aui-chat-media {
    width: 35px;
    float: right;
  }

  .aui-chat .aui-chat-right .aui-chat-inner[diy="666"] {
    float: none !important;
  }

  .aui-chat .aui-chat-right .aui-chat-inner {
    float: right;
    max-width: 100%;
  }

  .aui-chat .aui-chat-right .aui-chat-name[diy="666"] {
    right: 14px !important;
    margin-bottom: 0 !important;
    text-align: right;
  }

  .aui-chat .aui-chat-right .aui-chat-name {
    float: right;
  }

  .aui-chat-right .aui-chat-content[diy="666"] {
    right: 14px !important;
  }

  .aui-chat-content.chat-right[diy="666"] {
    padding: 0 !important;
  }

  .aui-chat .aui-chat-right .aui-chat-content {
    float: right;
  }

  .lottery-empty .chat-triangle-right.lottery[diy="666"] {
    border-color: transparent transparent transparent #fba17a;
    top: 9px;
  }

  .chat-triangle-right.lottery[diy="666"] {
    border-color: transparent transparent transparent #f56a40;
  }

  .lottery-empty .yellow-bg[diy="666"] {
    border-color: transparent rgba(251, 157, 58, .5) transparent transparent;
  }

  .chat-triangle-right[diy="666"] {
    display: inline-block;
    border-color: transparent transparent transparent #fb9d3a;
    border-style: solid;
    border-width: 7px 9px;
    width: 0;
    height: 0;
    position: absolute;
    top: 9px;
    right: -18px;
  }

  .lottery-lucky-up[diy="666"], .lottery-up[diy="666"] {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 60px;
  }

  .lottery-up[diy="666"] {
    background: url(../assets/img/red-bg.595e9dc.png) no-repeat;
    background-size: 100% 100%;
    background-color: #fb9d3a !important;
  }

  .chat-triangle-left[diy="666"] {
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    top: 9px;
    left: -18px;
    border-color: transparent #f98f3c transparent transparent;
    border-style: solid;
    border-width: 7px 9px;
  }

  .hbBotDesc {
    line-height: 20px;
    font-size: 9px;
    color: rgb(153, 153, 153);
    margin-left: 8px;
  }

  /*红包节点*/
  .redpacket[diy="hongbao"] {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1601;
    width: 100%;
    height: 100%;
    background: hsla(0, 0%, 86.7%, .8);
  }

  .packet-content[diy="hongbao"] {
    position: fixed;
    width: 255px !important;
    height: 382.5px !important;
    top: 50%;
    left: 50%;
    margin-top: -212.5px;
    margin-left: -127.5px;
    background: url(../assets/img/redPacket-bg.7353f51.png) repeat-y;
    background-color: #f35543;
    border-radius: 3px;
    -webkit-box-shadow: #f35543 0 1px 10px 0;
    box-shadow: 0 1px 10px 0 #f35543;
  }

  .rednorth[diy="hongbao"] {
    top: -1px;
    margin-top: -1px;
    height: 80%;
    position: relative;
    border: solid #db4f3f;
    border-width: 1px 1px 3px;
    background: url(../assets/img/redPacket-bg.7353f51.png) repeat-y;
    border-radius: 4px 4px 50% 50%/4px 4px 13% 13%;
    -webkit-box-shadow: 0 3px 0 -1px rgba(97, 95, 95, .04);
    box-shadow: 0 3px 0 -1px rgba(97, 95, 95, .04);
  }

  .redpacket-footer[diy="hongbao"] {
    position: absolute;
    bottom: 15px;
    width: 100%;
  }

  .rednorth .avatar[diy="hongbao"] {
    margin: 50px auto 9px;
    width: 56px;
    height: 56px;
    border-radius: 12px;
    overflow: hidden;
  }

  .rednorth .nickName[diy="hongbao"] {
    margin: 8px 0;
    color: #ffe2b1;
    font-size: 14px;
    font-weight: bolder;
  }

  .aui-text-center {
    text-align: center !important;
  }

  .open a[diy="hongbao"], .red-notice[diy="hongbao"] {
    color: #ffe2b1;
  }

  .aui-font-size-16 {
    font-size: 12px !important;
  }

  .aui-text-center {
    text-align: center !important;
  }

  .aui-font-size-20 {
    font-size: 16px !important;
  }

  .aui-text-center {
    text-align: center !important;
  }

  .aui-margin-t-10 {
    margin-top: 14px !important;
  }

  .aui-text-center {
    text-align: center !important;
  }

  .open[diy="hongbao"] {
    position: absolute;
    bottom: -37px;
    left: 50%;
  }

  .close[diy="hongbao"] {
    position: absolute;
    bottom: 15px;
    width: 100%;
  }

  .close img[diy="hongbao"], .redpacket-footer img[diy="hongbao"] {
    margin: 0 auto;
  }

  .redpacket img {
    max-width: 100%;
    display: block;
  }
  .red-result-myself[diy="888"] {
    color: #999 !important;
    font-weight: 400;
  }
  .aui-chat .aui-chat-header {
    width: 100%;
    text-align: center;
    margin-top: 8px;
    font-size: 12px;
    color: #757575;
  }
  .red-result-myself b.result-receive[diy="888"] {
    color: #fe982f;
  }
  .red-result-myself .result-lucky[diy="888"] {
    color: #0c0;
  }
  .red-result-myself .result-bad[diy="888"] {
    color: #cc0400;
  }
</style>
