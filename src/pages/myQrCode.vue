<template>
  <div class="myQrCode" ref="qrCodeBox">

    <van-popup class="popEl" v-model="isShowBgList" position="left">
      <div class="bgListWrap">
        <div class="li" :class="{active:curBgIndex===index}" v-for="img,index in bgImgs" @click="setImgBg(index)">
          <img v-lazy="img" :key="" alt="">
        </div>
      </div>
    </van-popup>

    <div class="qrCodeTop" v-show="isShowTopBar">
      <div class="topItem chStyle fl"  @click="showBgList()">
        <van-icon name="photo-o"/>选择模板
      </div>
      <div class="topItem chStyle fr"  @click="setImgBg()">
        <van-icon name="exchange"/>换个样式
      </div>
    </div>
    <div class="hideTopBar" @click="hideTopBar" v-show="isShowTopBar">
      <van-icon name="arrow-up" style="top:2px;"/> 隐藏
    </div>

    <div class="codeIns">
      <div class="codeInsTop s_border">
        <img v-lazy="$store.state.app.imgPath+qrCodeInfo.avatar" class="fl uImg" alt="">
        <div class="fl">
          <div class="uName">{{qrCodeInfo.name}}</div>
          <div class="invCode">邀请码：{{qrCodeInfo.unique_id}}</div>
        </div>
      </div>
      <div class="codeInsBot">
        <img v-lazy="myQrCode" :key="" alt="">
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
  .popEl{
    height: 100vh;
  }
  .myQrCode{
    min-height: 100vh !important;
    background-repeat: no-repeat;
    position: relative;
    .qrCodeTop{
      z-index: 2;
      position:fixed;
      width: 100%;
      height: 42px;
      left: 0;
      top: 0;
      background: rgba(255,255,255,1);
      .topItem{
        width: 40%;
        text-align: center;
        line-height: 42px;
        color: #111;
        font-size: 16px;
        .van-icon{
          font-size: 18px;
          position: relative;
          top:3.5px;
          right: 1px;
        }
      }
    }
  }
  .codeIns{
    width:170px;
    height: 190px;
    position: absolute;
    left: calc(50% - 85px);
    top: 283px;
    background: #fff;
    border-radius: 5px;
    .codeInsTop{
      height: 55px;
      width: 100%;
      overflow: hidden;
      .uImg{
        width: 35px;
        height: 35px;
        margin: 10px;
      }
      .uName{
        margin-top: 10px;
        line-height: 19px;
        font-size: 12px;
        color: #555;
      }
      invCode{
        margin-top: 8px;
        line-height: 18px;
        font-size: 12px;
        color: #888;
      }
    }
    .codeInsBot{
      width: 130px;
      height: 130px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .bgListWrap{
    width: 40vw;
    min-height: auto;
    overflow: hidden;
    padding: 10px;
    .li{
      padding: 5px;
      border-radius: 5px;
      margin-bottom: 5px;
      border: 1px solid #eee;
      img{
        width: 100%;
      }
      &:last-child{
        margin-bottom: 0;
      }
      &.active{
        border-color: #ff5722;
      }
    }
  }
  .hideTopBar{
    width: 100px;
    height: 25px;
    line-height: 25px;
    background: rgba(255,255,255,.9);
    position: fixed;
    margin-top: 42px;
    color: #888;
    text-align: center;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    left: calc(50vw - 50px);

  }
</style>

<script>
  import Vue from 'vue';
  import {Popup,Icon} from 'vant';
  Vue.use(Icon);
  Vue.use(Popup);

export default {
  name: 'myQrCode',
  data() {
    return {
      bgImgs:[
        require("@/assets/img/ban1.8496ca9.png"),
        require("@/assets/img/ban2.eb860b5.png"),
        require("@/assets/img/ban3.99ee995.png"),
        require("@/assets/img/ban4.ec68ec2.png"),
        require("@/assets/img/ban5.20bb791.png"),
        require("@/assets/img/ban6.64f70f1.png"),
        require("@/assets/img/ban7.3da124d.png"),
        require("@/assets/img/ban8.de40373.png"),
        require("@/assets/img/ban9.8b9039a.jpg"),
      ],
      curBgIndex:0,
      isShowBgList:false,
      isShowTopBar:true,

      qrCodeInfo:{
        avatar:'',
        name: "",
        qrcode_link: "",
        unique_id: '',//邀请码
      },
      myQrCode:'',//个人推广二维码
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.setImgBg(this.curBgIndex);
    });
    this.getQrCodeLink();
  },
  methods: {
    getQrCodeLink(){
      const qrcode_type = 'person';
      $sr.getQrcodeLink({qrcode_type}).then(async res => {
        Object.assign(this.qrCodeInfo, res.data);
        const url = this.qrCodeInfo.qrcode_link;

        this.myQrCode = await $util.createQrCode(url);
      });
    },
    hideTopBar(){
      this.$dialog.confirm({
        title: '温馨提示',
        message: '隐藏后将在下一次进入时显示'
      }).then(() => {
        this.isShowTopBar = false;
      }).catch(() => {
        // on cancel
      });
    },
    showBgList(){
      this.isShowBgList = true;
    },
    hideBgList(){
      this.isShowBgList = false;
    },
    selCodeBg(index){
      this.hideBgList();
      this.setImgBg(index);
    },
    setImgBg(index){
      if(index===undefined){
        index = this.curBgIndex>7?(0,this.curBgIndex=0):++this.curBgIndex;
      }
      this.curBgIndex = index;
      this.$refs.qrCodeBox.style.backgroundImage = `url(${this.bgImgs[index]})`;
      this.$refs.qrCodeBox.style.backgroundSize = "100%";
    },
  }
}
</script>


