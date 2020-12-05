<template>
  <div id="app">
    
    <!-- <keep-alive exclude="Detail"> -->
    <router-view class="wrap"></router-view>
    <!-- </keep-alive> -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>
import MainTabBar from './components/common/tabbar/MainTabBar.vue'
export default {
  name:'app',
  components:{
    MainTabBar,
  }

}
</script>

<style lang='less'>
 @import "assets/css/base.css";
/* css里用@才可以引用import */ 
#app {
  position: relative;
.wrap{
 overflow: auto;
 
}
}

</style>
