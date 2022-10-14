<template>
	<div>
		<div class="title">{{title}}</div>
    <div @click="back" class="btn">返回
    </div>
		<router-view class="router-view"></router-view>
	</div>
</template>

<script lang="ts">

import { reactive,toRefs,defineComponent,useRouter} from '../../../../../../src';
export default defineComponent({
    setup() {
      const state = reactive({
        title:'Children Two'
      });

      const back = ()=>{
        const router = useRouter();
        router.push("routeChildren");
      };

      return { 
        ...toRefs(state),
        back
      }
    }
})
</script>

<style lang="less" scoped>
.title{
  color:red;
  font-size: 10px;
  margin-top: 30px;
}
.btn{
  width:100px;
  height: 44px;
}
.router-view{
    width: 600px;
    height: 400px;
    background: lightgray;
}

</style>