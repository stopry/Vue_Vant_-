<template>
  <div class="ruler" ref="ruleBox">
    <div class="ruleBox">
      <div class="rulerTitle tc">
        {{gameName}} 规则
      </div>
      <div class="rulerCon" v-html="rulers">
        
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .ruleBox{
    padding: 20px 15px;
    overflow: hidden;
  }
  .ruler {
    background: #f7f7f7;
    font-size: 14px;
    color: #757575;
    .rulerTitle {
      font-size: 20px;
      color: #333;
      line-height: 20px;
      margin-bottom: 25px;
    }
    .rulerCon {
      i{
        font-style: normal;
      }
    }
  }
</style>

<script>

  export default {
    name: 'ruler',
    data() {
      return {
        rulers:'',
        gameName:'',
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.tx(this.$refs.ruleBox);
      });
      this.getRulers();
    },
    methods: {
      getRulers(){
        let group_number = this.$route.params.groupId;
        console.log({group_number})
        $sr.groupRules({group_number}).then(res=>{
          this.rulers = res.data.rules;
          this.gameName = res.data.game_name;
        });
      },
      tx(el){
        el.addEventListener('touchstart',()=>{

        });
      }
    }
  }
</script>


