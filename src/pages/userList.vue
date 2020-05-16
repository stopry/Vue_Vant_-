<template>
  <div class="userList" >
    <div class="userListHeader">
      <div class="totalDesc tc">
        当前邀请的玩家总数：<b>{{agent_rate}}</b>人
      </div>
      <div class="searchIpt s_border">
        <form action="/" class="w92">
          <van-search
            v-model="keyword"
            placeholder="请输入搜索关键词"
            show-action
            @search="onSearch"
            @cancel="onCancel">
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
        </form>
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
  </div>
</template>



<style scoped>
  .searchIpt{
    background: #fff;
    margin-bottom: 5px;
    padding-bottom: 10px;
  }
  .userListWrap{
    height: calc(100vh - 113px);
    overflow: auto;
  }
  .userList{
    min-height: 100vh;
    background: #f7f7f7;
  }
  .totalDesc{
    color:#333;
    font-size: 16px;
    background: #fff;
    padding: 15px 0 8px 0;
  }
</style>

<script>
import Vue from 'vue';
import { Field } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Row, Col } from 'vant';
import { List } from 'vant';
import { PullRefresh } from 'vant';
import { Popup } from 'vant';
import { Icon } from 'vant';
import { Search } from 'vant';

Vue.use(Search);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Row).use(Col);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);


export default {
  name: 'login',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      count: 0,
      isLoading: false,
      show:false,
      value: '',
      showKeyboard: false,

      page:1,
      keyword:'',

      agent_rate:0,


    }
  },
  mounted() {

  },
  methods: {
    getUserInvitList(isFresh){
      const {page,keyword} = this.$data;
      $sr.userInvitList({page,keyword}).then(res=>{
        if(res.data.data){
          this.agent_rate = res.data.agent_rate;
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

    onRefresh() {
      this.page = 1;
      this.finished = false
      // this.getUserInvitList(true);
      /*setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);*/
    },
    onLoad() {

      this.getUserInvitList();

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

    onSearch(){
      this.page = 1;//第一页开始
      this.getUserInvitList(true);
    },
    onCancel(){
      this.$toast("取消");
    },
  }
}
</script>


