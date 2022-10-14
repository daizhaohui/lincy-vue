<template>
  <div class="http">
    <div class="info">
    </div>
    <div>
     <a-button
        type="primary"
        @click="merge"
      >
        merge
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">

import Merge from '../../../../../src/utils/merge';

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
      merge(){
        let obj1 = { a: { b: 1, c: 1 } };
        let obj2 = { a: { b: 2 } };
        let obj3 = {};
        // 调用assignDeep方法
        Merge(obj3, obj1, obj2);
        console.log(obj3); // { a: { b: 2, c: 1 } }

        let obj4 = { a: { b: 1, c: [1, 2, 3] } };
        let obj5 = { a: { b: 2, c: [1, 4], d:'d' } };
        Merge(obj4,obj5); 
        console.log(obj4) // { a: { b: 2, c: [1, 4], d:'d' } };

        let obj6 = [1,2,3];
        let obj7 = [4,5];
        Merge(obj6, obj7);
        console.log(obj6) // [4,5,3]
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

