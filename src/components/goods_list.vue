<template>
  <div id="goods_list" class="goods_list">
     <nav-bar class="navbar"><div slot="center">商品列表</div></nav-bar>
    <!-- 搜索框 start -->
    <router-link to="search" class="search">
      <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" background="var(--color-tint)" />
    </router-link>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      value: '',
    }
  },
}
</script>
<style lang="less" scoped>
#goods_list {
  padding-bottom: 10vh;
  padding-top: 7vh;
  width: 100%;
  font-size: 16/50rem;
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
.van-search__content--round{
border-radius:15*0.01rem ;
 }
</style>