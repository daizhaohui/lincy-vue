<template>
  <div class="home">
    <div class="info">
      {{userName}}
    </div>
    <div>
     <a-button
        type="primary"
        @click="back"
      >
        回退
      </a-button>

        <a-button
      class="btn"
        type="primary"
        @click="updateSate"
      >
      更新状态
      </a-button>
      <a-button
      class="btn"
        type="primary"
        @click="resetSate"
      >
      复位状态
      </a-button>
      
      <a-button
      class="btn"
        type="primary"
        @click="goNext"
      >
        前进
      </a-button>
      <a-button
      class="btn"
        type="primary"
        @click="goHttp"
      >
      Http
      </a-button>
        <a-button
      class="btn"
        type="primary"
        @click="goTrack"
      >
      Track
      </a-button>
        <a-button
      class="btn"
        type="primary"
        @click="goModel"
      >
      Model
      </a-button>
        <a-button
      class="btn"
        type="primary"
        @click="goDirectives"
      >
      Directives
      </a-button>
      <a-button
      v-auth="'utils'"
      class="btn"
        type="primary"
        @click="goUtils"
      >
      Utils
      </a-button>
      <a-button
      class="btn"
        type="primary"
        @click="goDOM"
      >
      DOM
      </a-button>
      <a-button
      class="btn"
        type="primary"
        @click="goRouteChildren"
      >
      routeChildren
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">

import LoginInfo from '../../state/loginInfo';
import UserInfo from '../../state/userInfo';
import TestState from '../../state/test';
import {reset} from '../../../../../src/state';

  export default {

    data(){
      return {
        userName: LoginInfo['userId']
      }
    },
    created() {
      let route = this.$route;
      console.log(route);
    },

    mounted() {
      // let route = this.$route;
      // this.routeInfo = JSON.stringify(route);
      console.log('userId:'+LoginInfo.userId);
     
    },
    
    beforeRouteEnter(to,from){
      console.log('beforeRouteEnter:home');
      return true;
    },
    beforeRouteUpdate(to,from){
        console.log('beforeRouteUpdate:home');
        return true;
    },
    beforeRouteLeave(to,from){
        console.log('beforeRouteLeave:home');
        return true;
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      updateSate(){
        UserInfo.updateUserInfo({
          userInfo:{
            name:'李刚',
            age:18,
            sex:1
          },
          scores:[
            {
              cname:'数学',
              score: 99
            },
             {
              cname:'英文',
              score: 60
            },
          ]
        });
      },
      resetSate(){
        reset(UserInfo);
      },
      goNext(){
        TestState.update({
          test1: '---test1',
          test2: 'test2____'
        });
        this.$router.push('about',{
          query:{
            from:'home'
          }
        })
      },
      goHttp(){
         this.$router.push('http');
      },
      goTrack(){
         this.$router.push({
           name:'track',
           params:{
             id:1
           }
         });
      },
      goModel(){
         this.$router.push('model');
      },
      goDirectives(){
        this.$router.push('directive');
      },
      goUtils(){
        this.$router.push('utils');
      },
      goDOM(){
        this.$router.push('dom');
      },
      goRouteChildren(){
        this.$router.push('routeChildren');
      }
    }
   
  }
</script>
<style lang="less" scoped>
.home{
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
