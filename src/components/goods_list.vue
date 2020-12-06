<template>
  <div id="goods_list" class="goods_list">
    <nav-bar class="navbar"><div slot="center">商品列表</div></nav-bar>
    <!-- 搜索框 start -->
    <router-link to="search" class="search">
      <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" background="var(--color-tint)" />
    </router-link>
    <tab-control :titles="['综合', '销量', '价格']"></tab-control>
    <div class="first_tab">
      <router-link class="goods_item" v-for="(v1, i1) in goodsList" :key="i1" :to="'/pages/goods_detail/index?goods_id=' + v1.goods_id">
        <!-- 左侧 图片容器 -->
        <div class="goods_img_wrap">
          <image :src="v1.goods_small_logo?v1.goods_small_logo:'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"  />
        </div>
        <!-- 右侧 商品容器 -->
        <div class="goods_info_wrap">
          <div class="goods_name">{{ v1.goods_name }}</div>
          <div class="goods_price">￥{{ v1.goods_price }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
import TabControl from '@/components/common/TabControl'
export default {
  components: {
    NavBar,
    TabControl
  },
  data() {
    return {
      value: ''
    }
  }
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
.van-search__content--round {
  border-radius: 15 * 0.01rem;
}
/* pages/goods_list/index.wxss */
.goods_list {
  .first_tab {
    .goods_item {
      display: flex;
      border-bottom: 1px solid #ccc;
      .goods_img_wrap {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          width: 70%;
        }
      }
      .goods_info_wrap {
        flex: 3;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .goods_name {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .goods_price {
          color: var(--themeColor01);
          font-size: 32rpx;
        }
      }
    }
  }
}
</style>
