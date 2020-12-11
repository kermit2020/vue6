<template>
  <div id="app">
    <!-- exclude="Detail" -->
    <keep-alive >
    <router-view class="wrap" v-if="$route.meta.isKeep"></router-view>
    </keep-alive>
    <router-view class="wrap" v-if="!$route.meta.isKeep"></router-view>
    <MainTabBar v-show="$route.meta.showFooter"></MainTabBar>
  </div>
</template>
<script>
import MainTabBar from './components/common/tabbar/MainTabBar.vue'
export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style lang="less">
@import 'assets/css/base.css';
@import 'assets/css/iconfont.css';
/* css里用@才可以引用import */
#app {
  position: relative;
  .wrap {
    overflow: auto;
  }
  .nav-bar {
    background-color: var(--color-tint);
    /* height: 7vh;  */
    font-weight: 700;
    color: #fff;
    position: fixed; /* 这些是原生滚动使用的 */
    left: 0;
    top: 0;
    right: 0;
    z-index: 999;
    width: 100%;
    /* box-shadow: 0 1px 1px #eee; 会漏陷*/
  }
  .search {
    height: 7vh !important;
  }
  .van-cell {
    font-size: 14/50rem;
    line-height: 24/50rem;
  }
  .van-search__content--round {
    border-radius: 15 * 0.01rem;
  }
  .van-icon {
    font-size: 16/50rem;
  }
  .back>.van-icon {
    font-size: 25/50rem;
  }
  .van-checkbox__icon{
    // height: 0;
    font-size:20/50rem;
  }
  .van-button{
    height: 44/50rem;
  }
  .van-button--normal{
    font-size: 14/50rem;
  }
}
</style>
