<template>
  <div class="http">
    <div class="info">
    </div>
    <div v-clipboard="copyData" v-clipboard:success="copyDataSuccess">
      clipboard
    </div>
    <div>
      <a-button
      class="btn"
        type="primary"
        v-debounce="[debounce,1000]"
      >
      debounce
      </a-button>
      <a-input prefix="￥" suffix="RMB" v-input-filter:Price="2" v-model="money"/>
    </div>
  </div>
</template>

<script lang="ts">

import {useHttp} from '../../../../../src';

  export default {

    data(){
      return {
        copyData:'copy data',
        money:''
      }
    },
    created() {

    },

    mounted() {
   
    },
    methods:{
      copyDataSuccess(value){
        alert(JSON.stringify(value));
      },
      debounce(){
        console.log(Date.now());
      }
    }
   
  }
</script>
<style lang="less" scoped>
.http{
  margin: 60px 60px;
  .info{
    color: blue;
    font-size: 20px;
  }
  .btn{
    margin-left: 20px;
  }
}
</style>

