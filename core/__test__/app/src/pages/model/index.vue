<template>
    <div class="title">{{output}}</div>
</template>

<script lang="ts">

import Order from '../../model/order';
import { reactive,toRefs,defineComponent} from '../../../../../src';


  export default defineComponent({
    setup() {
      const obj = Order.parse({
        price:12.34567,
        a:{
          b:{
            c:[1,2,3]
          }
        },
        id: 12,
        orderName: 'order_name',
        name1:'ssss',
        testArr:[
          {a:1,b:2},
          {c:3,d:'ddd'}
        ],
        testDate:1616077374439,
        firstProduct:{
          productId:12,
          productName: 'pname'
        },
        products:[
          {
            productId:12,
            productName: 'pname',
            firstProductInfo:{
              id:1,
              title:'info1'
            }
          },
           {
            productId:22,
            productName: 'pname222',
            ProductInfos:[{
              id:1,
              title:'info1'
            }]
          }
        ]
      });
      const output = JSON.stringify(obj);
      const disposedObj = Order.dispose(obj);
      return { 
        output
      }
    }
  })
</script>

<style lang="less" scoped>
.title{
  color:red;
  font-size: 10px;
}

</style>