<template>
  <div class="home">
    <div class="title">dom test</div>
    <div>
       <button @click="addClass">addClass</button>
      <button @click="removeClass">removeClass</button>
      <button @click="removeAllClass">removeAllClass</button>
      <button @click="replaceClass">replaceClass</button>
      <button @click="customStyle">customStyle</button>
    </div>
    <!-- <div :class="[testClass1, testClass2]" ref="domObjRef" id="domObjRef" style="font-size:20px"> -->
    <div :class="[testClass1, testClass2]" ref="domObjRef" id="domObjRef">
      dom
    </div>
  </div>
</template>

<script lang="ts">
import LoginInfo from "../../state/loginInfo";

const style1 = {
  width: "300px",
  height: "300px",
  border: "2px solid yellow"
};

const testClass1 = "testClass1";
const testClass2 = "testClass2";

export default {
  data() {
    return {
      userName: LoginInfo["userId"],
      style1: style1,
      testClass1: testClass1,
      testClass2: testClass2
    };
  },
  created() {
    let route = this.$route;
    console.log(route);
  },

  mounted() {
    // let route = this.$route;
    // this.routeInfo = JSON.stringify(route);
    console.log("userId:" + LoginInfo["userId"]);
  },

  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter:home");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate:home");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave:home");
    next();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  }
};
</script>
<style lang="less" scoped>
.home {
  margin: 60px 60px;
  .title {
    color: blue;
    font-size: 24px;
  }
  .testClass1 {
    width: 450px;
    height: 300px;
    border: 1px solid red;
    font-size: 12px;
  }
  .testClass2 {
    background-color: pink;
  }
  .testClass3 {
    width: 600px;
  }
  .testClass4 {
    height: 800px;
  }
  .testClass5 {
    background-color: red;
  }
  .testClass6 {
    width: 800px;
  }
}
</style>
