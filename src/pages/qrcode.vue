<template>
  <div class="qrcode" v-show="showPage">
    <div class="qrCodeWrap w92">
      <div class="qrHead">
        <div class="codeImg">
          <img v-for="img,index in qrCodeInfo.member" v-lazy="$store.state.app.imgPath+img" :key="index" alt="">
          <!--          <img src="http://dfhhb1.0001wan.com/upload/files/avatar/8.jpg" alt="">
                    <img src="http://dfhhb1.0001wan.com/upload/files/avatar/854f644f4e97381e3902eddd9c9cb768.jpg" alt="">
                    <img src="http://dfhhb1.0001wan.com/upload/files/avatar/364ea8a233eab0682347ed7e2d8aaf93.jpg" alt="">
                    <img src="http://dfhhb1.0001wan.com/upload/files/avatar/83846cf5bfd2bd39b25c85785c6de3dc.jpg" alt="">
                    <img src="http://dfhhb1.0001wan.com/upload/files/avatar/342d5f332fb26c0e80198d067f48e25b.jpg" alt="">
                    <img src="http://dfhhb1.0001wan.com/upload/files/avatar/e1c3b5b2552c2f957e7031def313e775.jpg" alt="">
                    <img src="http://dfhhb1.0001wan.com/upload/files/avatar/u=3203579422,2778703937&fm=26&gp=0.jpg" alt="">
                    <img src="http://dfhhb1.0001wan.com/upload/files/avatar/83846cf5bfd2bd39b25c85785c6de3dc.jpg" alt="">
                    <img src="http://dfhhb1.0001wan.com/upload/files/avatar/342d5f332fb26c0e80198d067f48e25b.jpg" alt="">-->
        </div>
        <div class="codeDesc">
          <div class="descTop">
            {{groupName}} <span class="editCodeName" style="color:red;"><van-icon v-show="!simpleMode" name="edit" @click="showEditCodeName" /></span>
          </div>
          <div class="descBot">
            <span class="qrCodeNo">
              群号:{{qrCodeInfo.group_number}}
            </span>
            <van-button style="top:-3px;" type="danger" v-show="!simpleMode" @click="simpleMode=true" size="small" class="submitBtn">简洁模式</van-button>
          </div>
        </div>
      </div>
      <div class="qrBody">
        <img v-lazy="codeImgSrc" alt="">
      </div>
      <div class="qrFooter" style="color:#999;font-size:14px;text-align:center;">
        扫一扫上面的二维码即可进群
      </div>
    </div>

    <van-dialog
      v-model="show"
      title="自定义群名"
      show-cancel-button
      @confirm="confirm"
    >
      <input class="qmIpt" v-model="groupNameIpt" maxlength="10" placeholder="自定义群名" type="text">
      <div class="qmTips">
        Tip：临时自定义群名，方便分享截图
      </div>
    </van-dialog>

  </div>
</template>
<style scoped>
  .qmIpt{
    background: #fff;
    margin: 20px auto 5px auto;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    border:none;
    display: block;
    border-bottom:1px solid #eee;
    text-align: center;
    font-size: 16px;
  }
  .qmTips{
    font-size: 14px;
    color: #c5984c;
    font-weight: 700;
    padding: 10px 15px 0;
    margin-bottom: 15px;
  }
  .editCodeName{
    font-size: 22px;
    position: relative;
    top: 3px;
  }
  .qrCodeNo{
    margin-right: 8px;
  }
  .descTop{
    font-size: 18px;
    color: #666;
  }
  .descBot{
    font-size: 16px;
    color:#777;
    margin-top: 6px;
  }
  .qrHead{
    overflow: hidden;
    padding: 15px;
  }
  .qrcode{
    position: relative;
  }
  .codeImg{
    float: left;
    width: 60px;
    height: 60px;
    padding: 1px;
    background-color: #e7e7e7;
    border-radius: 5px;
    overflow: hidden;
  }
  .codeImg img{
    width: 18px;
    height: 18px;
    float: left;
    display: block;
    margin: 1px;
  }
  .qrBody{
    width: 230px;
    height: 230px;
    margin: 20px auto;
    position: relative;
  }
  .qrBody img{
    width: 230px;
    height: 230px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .codeDesc{
    float: left;
    margin-left: 15px;
  }
  .qrCodeWrap{
    position: fixed;
    width: 90%;
    top: 50%;
    left: 5%;
    height: 430px;
    background: #fff;
    margin-top: -215px;
    border-radius: 5px;
    -webkit-box-shadow: #eee 0 1px 10px 0;
    box-shadow: 0 1px 10px 0 #eee;
    border-radius: 6px;
  }
  .qrcode{
    min-height: 100vh;
    background: #f7f7f7;
  }
</style>
<script>

  import Vue from  'vue';
  import { Icon } from 'vant';
  Vue.use(Icon);

  export default {
    name: 'login',
    data() {
      return {
        show:false,
        showPage:false,
        qrCodeInfo:{
          group_number: '42701a',
          member:[""],
          qrcode_link:"https://www.baidu.com"
        },
        groupName:"来过年",
        groupNameIpt:"来过年",
        codeImgSrc:'',

        simpleMode:false,
      }
    },
    created(){
      this.getQrCodeLink();
    },
    mounted() {

    },
    methods: {
      confirm(){
        this.groupName = this.groupNameIpt;
      },
      getQrCodeLink(){
        const group_number = this.$route.params.groupId;
        const qrcode_type = 'group';
        $sr.getQrcodeLink({group_number,qrcode_type}).then(async res => {
          Object.assign(this.qrCodeInfo, res.data);
          const url = this.qrCodeInfo.qrcode_link;
          this.showPage = true;
          this.codeImgSrc = await $util.createQrCode(url,{width:400,height:400});
        });
      },
      showEditCodeName(){
        this.show = true;
      }
    }
  }
</script>


