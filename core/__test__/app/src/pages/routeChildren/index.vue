<template>
	<div>
		<div class="title">{{title}}</div>
    <div>
      <div @click="childOne" class="btn">childone</div>
      <div @click="childTwo" class="btn">childtwo</div>
    </div>
    <div>
      	<router-view class="router-view-inner"></router-view>
    </div>
	
	</div>
</template>

<script lang="ts">

import { reactive,toRefs,defineComponent,useRouter} from '../../../../../src';
export default defineComponent({
    setup() {
      const state = reactive({
        title:'Route Children'
      });

      const childOne = ()=>{
        const router = useRouter();
        router.push("childrenOne");
      };

       const childTwo = ()=>{
        const router = useRouter();
        router.push("childrenTwo");
      };

      return { 
        ...toRefs(state),
        childOne,
        childTwo
      }
    }
})
</script>

<style lang="less" scoped>
.title{
  color:blue;
  font-size: 10px;
  margin-top: 30px;
}
.btn{
  width:100px;
  height: 44px;
}
.router-view-inner{
    width: 600px;
    height: 400px;
    background: lightgray;
}

</style>