<template>
  <router-view
    v-slot="{ Component, route}"
    class="router-view"
  >
    <transition
      :name="route.meta && route.meta.transition || 'fade'"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="less">
html, body {
  overflow-x: hidden;
  overflow-y: auto;
}
.router-view{
  padding: 0 0;
}
</style>
