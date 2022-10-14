<template>
  <div>{{title}}</div>
  <div class="info">
    {{userInfo}}
  </div>
  <div class="info">
    {{testInfo}}
  </div>
  <div class="btnBack">
     <a-button
        type="primary"
        @click="back"
      >
        回退
      </a-button>
  </div>
</template>

<script lang="ts">

import { reactive,toRefs,onBeforeRouteLeave,useRouter,useRoute } from '../../../../../src';
import UserInfo from '../../state/userInfo';
import TestState from '../../state/test';

  export default {
    setup() {
      const state = reactive({
        title:'about'
      });

      onBeforeRouteLeave(()=>{
        console.log('BeforeRouteLeave: about');
         return true;
      });

      const userInfo = `${JSON.stringify(UserInfo.userInfo)},${JSON.stringify(UserInfo.scores)}`;
      const testInfo = TestState.toString();

      function back(){
        const router = useRouter();
        router.go(-2);
      }

      return { 
        ...toRefs(state),
        back,
        userInfo,
        testInfo
      }
    }
  }
</script>

<style lang="less" scoped>
.btnBack{
  margin: 100px 100px;
}
.info{
  color: blue;
  font-size: 20px;
}
</style>
