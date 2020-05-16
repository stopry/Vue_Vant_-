<template>
<!--  返佣记录-->
  <div class="userList" >
    <div class="userListHeader">
      <div class="rchTip">
        <van-icon name="info-o" /> 统计数据每60分钟更新一次
      </div>
      <div class="searchIpt s_border">
        <div class="filterItem fl tl">
          <van-icon name="bars" />数据筛选
        </div>
        <div class="filterItem fr tr" @click="openSelDate">
          <van-icon name="todo-list-o" />{{curSelDate.name||"时间选择"}}
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

    <van-actionsheet
      v-model="showSelDate"
      :actions="actions"
      cancel-text="取消"
      @select="onSelDate"
      @cancel="onCancelSel">
    </van-actionsheet>

  </div>
</template>
<style scoped>
  .rchTip{
    text-align: center;
    padding: 10px 8px;
    background: #ef453a;
    color: #ffe2b1;
    font-size: 14px;
  }
  .rchTip i{
    position: relative;
    top: 4px;
    font-size: 18px;
    right: 2px;
  }
  .searchIpt{
    background: #fff;
    padding: 10px 12px;
    font-size: 18px;
    color: #333;
    overflow: hidden;
  }
  .searchIpt .van-icon{
    position: relative;
    top: 3px;
  }
  .filterItem{
    width: 50%;
  }
  .userListHeader{
    margin-bottom: 5px;
  }
  .userListWrap{
    height: calc(100vh - 92px);
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
import { Row, Col } from 'vant';
import { List } from 'vant';
import { PullRefresh } from 'vant';
import { Popup } from 'vant';
import { Icon } from 'vant';
import { Search } from 'vant';
import { Actionsheet } from 'vant';

Vue.use(Actionsheet);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Row).use(Col);
Vue.use(Cell).use(CellGroup);


export default {
  name: 'commission',
  data() {
    return {
      showSelDate:false,
      list: [],
      loading: false,
      finished: false,
      count: 0,
      isLoading: false,
      show:false,
      value: '',
      showKeyboard: false,
      curSelDate:{
        name:'全部',
        value:'all',
      },
      actions: [
        {
          name: '全部',
          value:'all',
        },
        {
          name: '两小时',
          value:'secondHours',
        },
        {
          name: '今日',
          value:'today',
        },
        {
          name: '本周',
          value:'week',
        }
      ],
      page:1,
    }
  },
  mounted() {

  },
  methods: {
    getAgentCommList(isFresh){
      const {page} = this.$data;
      const timeType = this.curSelDate.value;
      $sr.getAgentCommList({page,timeType}).then(res=>{
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
      }).catch(err=>{
        this.finished = true;
        // this.$toast("")
      }).finally(()=>{
        this.loading = false;
        this.isLoading = false;
      })
    },

    openSelDate(){
      this.showSelDate = true;
    },

    onSelDate(item){
      this.$toast(item.value);
      Object.assign(this.curSelDate,item);
      this.page = 1;
      this.showSelDate = false;
      this.getAgentCommList(true);
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
      this.getAgentCommList();
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


