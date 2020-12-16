<template>
  <div id="collect">
    <nav-bar class="navbar">
      <div slot="left" class="back" @click="$router.replace('/home')">
        <van-icon class="iconLeft" name="wap-home-o" color="#fff" />
      </div>
      <div slot="center">我的收藏</div></nav-bar
    >
    <tab-control :titles="['商品收藏', '品牌收藏', '店铺收藏', '浏览足迹']" class="tab-control" @tabClickNow="tabClickNow"></tab-control>
    <div class="collect_main">
      <div class="collect_title">
        <span class="collect_tips" :class="isTag === i2 ? 'active' : ''" v-for="(v2, i2) in ['全部', '正在热卖', '即将上线']" :key="i2" @click="tagBar(i2)">{{ v2 }} </span>
      </div>
      <div class="collect_content">
        <router-link class="goods_item" v-for="(v1, i1) in collect" :key="i1" :to="'/detail?goods_id=' + v1.goods_id">
          <!-- 左侧 图片容器 -->
          <div class="goods_img_wrap">
            <img :src="v1.goods_small_logo ? v1.goods_small_logo : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'" />
          </div>
          <!-- 右侧 商品容器 -->
          <div class="goods_info_wrap">
            <div class="goods_name">{{ v1.goods_name }}</div>
            <div class="goods_price">￥{{ v1.goods_price }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
import TabControl from '@/components/common/TabControl'

export default {
  data() {
    return {
      collect: [],
      isTag: 0
    }
  },
  components: {
    NavBar,
    TabControl
  },
  mounted() {
    this.collect = JSON.parse(localStorage.getItem('collect')) || []
  },
  methods: {
    tabClickNow() {},
    tagBar(i) {
      this.isTag = i
    }
  }
}
</script>
<style lang="less" scoped>
#collect {
  padding-bottom: 10vh;
  padding-top: 7vh;
  width: 100%;
  font-size: 16/50rem;
}
.back .iconLeft {
  text-align: left;
  // margin-left: -0.4rem;
  vertical-align: middle;
}
.tab-control {
  position: fixed; /* 这些是原生滚动使用的 */
  left: 0;
  top: 7vh;
  right: 0;
}
/* pages/collect/index.wxss */
.collect_main {
  margin-top: 6vh;
  background-color: #f3f4f6;
  .collect_title {
    padding: 40 * 0.01rem 0;
    .collect_tips {
      padding: 15 * 0.01rem;
      border: 1 * 0.01rem solid #ccc;
      margin-left: 25 * 0.01rem;
      background-color: #fff;
    }
    .active {
      color: var(--color-tint);
      border-color: currentColor;
    }
  }
  .collect_content {
    .goods_item {
      display: flex;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      .goods_img_wrap {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
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
          color: var(--color-tint);
          font-size: 32 * 0.01rem;
        }
      }
    }
  }
}
</style>
