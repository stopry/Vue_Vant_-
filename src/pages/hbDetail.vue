<template>
  <div class="hnDetail" v-show="showDetail">
    <van-pull-refresh class="getList" v-model="isLoading" @refresh="onRefresh">
    <div class="hbBaseInfo hbDtlHTopAni">
      <div class="fromUser">
        <img v-lazy="$store.state.app.imgPath+hbDetail.user.avatar" alt="">
        <b>{{hbDetail.user.name}}的红包</b>
      </div>
      <div class="moneyInfo">
        {{hbDetail.remark}}<span>/ 雷: {{hbDetail.red_lei}}</span>
      </div>
      <div class="getInfo">
        {{hbDetail.get_my_amount||'0.00'}} <span>金</span>
      </div>
      <div class="tipsInfo">
        {{hbDetail.get_my_amount?'恭喜发财大吉大利':'手慢了，红包已全部领完'}}
      </div>
    </div>
    <div class="hbTotalInfo">
      {{hbDetail.get_detail}}
    </div>


      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group>
          <van-cell v-for="item,index in hbDetail.get_users" :key="index" class="listCell">
            <img class="listImg" v-lazy="$store.state.app.imgPath+item.user.avatar" alt="">
            <b class="listGetName">{{item.user.name}}</b>
            <div class="listGetDetail">
              <div class="listGetJ">{{item.amount}}金</div>
              <div class="listGetS win" v-html="item.lei"></div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss">
  .listGetJ {
    font-size: 14px;
    color: #333;
  }

  .listGetS {
    font-size: 14px;
    padding-top: 2px;
  }

  .listGetS.win {
    color: #0c0;
  }
  .listGetS{
    span.red-lucky{
      color: #0c0;
    }
    span.red_bad{
      color: #ff0000;
    }
  }

  .listGetS.lost {
    color: #ff0000;
  }

  .listCell {
    display: block;
    height: 60px;
  }

  .listImg {
    width: 40px;
    height: 40px;
    border-radius: 3px;
  }

  .listGetName {
    position: absolute;
    top: 0;
    left: 50px;
    color: #777;
    font-size: 14px;
  }

  .listGetDetail {
    float: right;
    text-align: right;
  }

  .hbTotalInfo {
    padding: 10px 15px;
    font-size: 14px;
    color: #999;
    border-bottom: 1px solid #eee;
    background: #fff;
  }

  .tipsInfo {
    font-size: 16px;
  }

  .getInfo {
    font-size: 50px;
    margin-top: 40px;
    margin-bottom: 10px
  }

  .getInfo span {
    font-size: 14px;
  }

  .moneyInfo {
    font-size: 16px;
    margin-top: 15px;
  }

  .fromUser img {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin-right: 5px;
    vertical-align: middle;
    position: relative;
    top: -2px;
  }

  .fromUser {
    font-size: 16px;
    font-weight: bold;
    line-height: 30px;
    vertical-align: middle;
    height: 30px;
    margin-top: 26px;
  }

  .hbBaseInfo {
    width: 100%;
    height: 260px;
    border-top: 1px solid #ef453a;
    background: #fff url(../assets/img/redbg.5b7a3db.png) no-repeat;
    background-size: 100% 99%;
    color: #ffe2b1;
    text-align: center;
  }

  .hnDetail {
    min-height: 100vh;
  }
</style>

<script>
  import Vue from 'vue'
  import {Row, Col} from 'vant'
  import {List} from 'vant'
  import {PullRefresh} from 'vant'
  import {Cell, CellGroup} from 'vant'

  Vue.use(Cell).use(CellGroup)
  Vue.use(PullRefresh)
  Vue.use(List)
  Vue.use(Row).use(Col)

  export default {
    name: 'login',
    data() {
      return {
        showDetail:false,

        list: [],
        loading: false,
        finished: false,
        count: 0,
        isLoading: false,
        show: false,
        value: '',
        showKeyboard: false,

        //红包详情
        hbDetail:{
          get_detail:'已领取 7/7个，共 30/30 金币',//领取情况
          remark:'30金 / 7包 / 2.9倍',//备注（发红包的填写基本信息）
          red_lei:'2,7,6,4',//红包雷值标记
          get_my_amount:null,//我领取的金额
          red_status:'1',//红包状态
          user:{//发红包的人
            avatar:'files/avatars/a1a3486e373c6b708c89b1ffe2766c8b.jpg',
            name:'二胖',
          },
          get_users:[//领用用户列表
            {
              amount: "13.69",
              comp_amount: "13.69",
              created_at: "12-12 17:22:15",
              final_amount: "13.01",
              friend_time: " 17:22:15",
              lei: '<span class="aui-pull-right red-lucky">[幸运]&nbsp;<span>+13.69</span></span>',
              red_id: 33845,
              user:{//领取人信息
                avatar: "files/avatars/42701df696df6205529520d7bc1b6334.jpg",
                id: 81,
                name: "陈小姐"
              },
            }
          ]
        },
      }
    },
    created(){
      this.packetGetDetail();
    },
    mounted() {

    },
    methods: {
      //获取红包详情
      packetGetDetail(isFresh){
        let red_id = this.$route.params.hbId;
        $sr.packetGetDetail({red_id}).then((res)=>{
          this.showDetail = true;
          this.hbDetail = res.data;
          console.log(res,'11');
          this.loading = false;
          this.isLoading = false
          this.finished = true;
          if(isFresh){
            this.$toast('刷新成功', 2000)
          }
        }).catch(()=>{
          this.loading = false;
          this.isLoading = false
          this.finished = true;
          if(isFresh){
            this.$toast('获取失败', 2000)
          }
        });
      },

      onRefresh() {
        this.packetGetDetail(true);
/*        setTimeout(() => {
          this.$toast('刷新成功', 2000)
          this.isLoading = false
          this.count++
        }, 500)*/
      },
      onLoad() {
        // 异步更新数据
       /* setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1)
          }
          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (this.list.length >= 20) {
            this.finished = true
          }
        }, 500)*/
      },
      //禁止微信弹性
      onStart(e) {
        const point = e.touches ? e.touches[0] : e;
      },
    }
  }
</script>


