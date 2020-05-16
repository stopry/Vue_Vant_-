<template>
  <!--  返佣记录-->
  <div class="userList" >
    <div class="commissionHeader">
      <div class="filterType" @click="toShowSelType">
        <div class="typeDesc">{{curSelType.text||'筛选类型'}}</div>
        <van-icon name="arrow-down"/>
      </div>
      <div class="userAvt">
        <img v-lazy="$store.state.app.imgPath+userInfo.avatar" alt="">
        <div class="userName">
          {{userInfo.name}}
        </div>
      </div>
      <div class="totalGet">
        <div class="totalData">
          <span>{{userInfo.agent_rate}}</span>元
        </div>
        <div class="totalDesc">
          ☆累计总收益☆
        </div>
      </div>
    </div>
    <div class="userListWrap">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item"
            :title="item"></van-cell>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-popup v-model="showSelType" position="bottom" style="over-flow:hidden;height:auto;">
      <div class="w92 moneyBtnWrap">
        <van-picker
          show-toolbar
          title="选择筛选类型"
          :columns="columns"
          @cancel="selOnCancel"
          @confirm="selOnConfirm">
        </van-picker>
      </div>
    </van-popup>

  </div>
</template>
<style scoped lang="scss">
  .commissionHeader{
    height: 280px;
    background: rgb(239, 69, 58);
    color: rgb(255, 226, 177);
    position: relative;
    text-align: center;
  }
  .typeDesc{
    padding-bottom: 2px;
  }
  .filterType{
    position: absolute;
    font-size: 17px;
    top: 15px;
    right: 15px;
  }
  .userAvt{
    padding-top: 50px;
    img{
      width: 56px;
      height: 56px;
      border-radius: 5px;
      box-shadow: rgb(255, 226, 177) 0 1px 10px 0;
    }
    .userName{
      font-size: 16px;
      line-height: 22px;
      margin-top: 15px;
    }
  }
  .totalGet{
    font-size: 20px;
    .totalData{
      margin-top: 30px;
      line-height: 52px;
      span{
        font-size: 54px;
      }
    }
    .totalDesc{
      font-size: 16px;
    }
  }

  .userListWrap{
    height: calc(100vh - 280px);
    overflow: auto;
  }
  .userList{
    min-height: 100vh;
    background: #f7f7f7;
  }
  .van-actionsheet__cancel{
    font-size: 14px;
    color: #666;
  }
</style>

<script>
  import Vue from 'vue';
  import { Cell, CellGroup } from 'vant';
  import { List } from 'vant';
  import { PullRefresh } from 'vant';
  import { Icon } from 'vant';
  import { Picker } from 'vant';
  import { Popup } from 'vant';
  Vue.use(Picker)
  Vue.use(Popup)
  Vue.use(Icon);
  Vue.use(PullRefresh);
  Vue.use(List);
  Vue.use(Cell).use(CellGroup);

  export default {
    name: 'record',
    data() {
      return {
        columns: [
          {text:'全部',value:0},
          {text:'转账',value:4},
          {text:'提现',value:6},
          {text:'充值',value:7},
          {text:'发出红包',value:1},
          {text:'发出+领取',value:3},
          {text:'佣金返现',value:8},
        ],
        showSelType:false,

        showSelDate:false,
        list: [],
        loading: false,
        finished: false,
        count: 0,
        isLoading: false,
        show:false,
        value: '',

        userInfo:{
          userName:'',
          avatar:'',
          agent_rate:''
        },

        curSelType:{
          text:null,
          value:null,
        },
        page:1,
        group_number:'',
        screen_type:0,
      }
    },
    mounted() {

    },
    methods: {
      setUserInfo(info){
        Object.assign(this.userInfo,info);
      },
      getUserRecord(isFresh){
        const {page} = this.$data;
        const screen_type = this.screen_type;
        const group_number = '';
        $sr.getUserRecord({page,screen_type,group_number}).then(res=>{
          if(res.data.data){
            if(isFresh){
              this.list = res.data.data;
            }else{
              this.list = this.concat(res.data.data);
            }
            this.page++;
          }else{
            this.finished = true;
          }
          res.data.userInfo&&this.setUserInfo(res.data.userInfo);
        }).catch(data=>{
          this.finished = true;
          data.data.userInfo&&this.setUserInfo(data.data.userInfo);
          // this.$toast("")
        }).finally((data)=>{
          this.loading = false;
          this.isLoading = false;
        })
      },

      toShowSelType(){
        this.showSelType = true;
      },

      selOnConfirm(item, index) {
        this.$toast(`当前值：${item.text}, 当前索引：${index}`)
        Object.assign(this.curSelType,item);
        this.screen_type = this.curSelType.value;
        this.page = 1;
        this.showSelType = false
        this.getUserRecord(true);
      },
      selOnCancel() {
        this.$toast('取消')
        this.showSelType = false
      },

      onCancelSel(){
        this.showSelDate = false;
      },

      onRefresh() {
        this.page = 1;
        this.finished = false
        // this.getAgentCommList(true);
        /*setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
          this.count++;
        }, 500);*/
      },
      onLoad() {
        this.getUserRecord();
        /*// 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 30) {
            this.finished = true;
          }
        }, 500);*/
      },
    }
  }
</script>


