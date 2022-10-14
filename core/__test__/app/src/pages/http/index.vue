<template>
  <div class="http">
    <div class="info">
    </div>
    <div>
     <a-button
        type="primary"
        @click="get1"
      >
        Get1
      </a-button>
       <a-button
        class="btn"
        type="primary"
        @click="get2"
      >
        Get2
      </a-button>
      <a-button
        class="btn"
        type="primary"
        @click="get3"
      >
        Get3
      </a-button>
       <a-button
        class="btn"
        type="primary"
        @click="get4"
      >
        Get4
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">

import TestApi from '../../Api/test';
import {useHttp,getCurrentInstance} from '../../../../../src';
const {getHttpService} = useHttp();

  export default {

    data(){
      return {
      }
    },
    created() {

    },

    mounted() {
   
    },
    methods:{
     get1(){
      TestApi.get1({
        params:{
          tel:'18916666069'
        }
      }).then(res=>{
        console.log(res);
      }).catch(e=>{
        console.log(e);
      });
     },
     get2(){
        TestApi.get2({
          pathParams:{
            type:'api',
            name:'nodes'
          },
          params:{
            name:'java'
          }
        }).then(res=>{
          console.log(res);
        });
     },
     get3(){
        TestApi.get3([
          {
            params:{
              name:'java'
            }
          },
          {
            params:{
              tel:'18916666069'
            }
          },
          {
            params:{
              tel:'18916666069'
            }
          }
        ]).then(res=>{
          console.log(res);
        });
     },
     get4(){

      // this.$http.get('/queryTel',{
      //   params:{
      //     tel:'18916666069'
      //   }
      // }).then(res=>{
      //   console.log(res);
      // }).catch(e=>{
      //   console.log(e);
      // });

      getHttpService().get('/queryTel',{
        params:{
          tel:'18916666069'
        }
      }).then(res=>{
        console.log(res);
      }).catch(e=>{
        console.log(e);
      });

     },
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

