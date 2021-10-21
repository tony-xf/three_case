<template>
  <Header></Header>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  export default {
    components: {Header}
  }
</script>

<style lang="scss">
  @import "assets/styles/common";
</style>
