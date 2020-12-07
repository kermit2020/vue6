<template>
  <div id="detail">
    <nav-bar class="navbar"><div slot="center">商品详情</div></nav-bar>
    <!-- 轮播图swiper start -->
    <van-swipe class="detail_swiper" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(v1, i1) in goodsObj.pics" :key="i1" class="van-swipe-item">
        <a :herf="v1.pics_big" target="_blank"><img :src="v1.pics_mid"/></a>
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图swiper end -->
    <div class="goods_price">￥{{ goodsObj.goods_price }}</div>
    <div class="goods_name_row">
      <div class="goods_name">{{ goodsObj.goods_name }}</div>
      <div class="goods_collect">
        <!-- bindtap="chooseCollect" -->
        <span class="iconfont" :class="isCollect ? 'icon-shoucang1' : 'icon-shoucang'"></span>
        <div class="icon_text">收藏</div>
      </div>
    </div>
    <div class="goods_info">
      <div class="goods_info_title">图文详情</div>
      <div class="goods_info_content">
        <!-- 富文本标签 -->
        <!-- <quill-editor class="" v-model="goodsObj.goods_introduce">
            可以不用编辑器直接插入
    </quill-editor> -->
    <!-- 静态页面绘制 -->
    <div v-html="goodsObj.goods_introduce"></div>
       
      </div>
    </div>
    <div class="btm_tool">
      <div class="tool_item">
        <div class="iconfont icon-kefu"></div>
        <div class="text_dec">客服</div>
        <button open-type="contact"></button>
      </div>
      <div class="tool_item">
        <div class="iconfont icon-yixianshi-"></div>
        <div class="text_dec">分享</div>
        <button open-type="share"></button>
      </div>
      <!-- 跳转到TAB页面 open-type="switchTab" -->
      <router-link class="tool_item" to="/pages/cart">
        <div class="iconfont icon-gouwuche"></div>
        <div class="text_dec">购物车</div>
      </router-link>
      <div class="tool_item btn_cart" bindtap="addCart">
        加入购物车
      </div>
      <div class="tool_item btn_buy">
        立即购买
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
import { getDetailData1 } from '@/api/'

export default {
  data() {
    return {
      goodsObj: {},
      isCollect: false,
      GoodsInfo: {}
    }
  },
  components: {
    NavBar,
   
  },
  mounted() {
    console.log(this.$route)
    getDetailData1(this.$route.query).then(res => {
      this.goodsObj = res.data.message
      console.log(this.goodsObj)
    })
  }
}
</script>
<style lang="less" scoped>
#detail {
  padding-bottom: 10vh;
  padding-top: 7vh;
  width: 100%;
  font-size: 16/50rem;
}
/* pages/goods_detail/index.wxss */
.detail_swiper {
  .van-swipe-item {
    height: 65vw;
    text-align: center;

    img {
      width: 60%;
    }
  }
}
.goods_price {
  color: var(--color-tint);
  font-weight: 600;
  padding: 15 * 0.01rem;
  font-size: 32 * 0.01rem;
}
.goods_name_row {
  padding: 0 10 * 0.01rem;
  display: flex;
  color: #666;
  font-size: 26 * 0.01rem;
  border-bottom: 10 * 0.01rem solid #fff;
  .goods_name {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    flex: 5;
  }
  .goods_collect {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-left: 1px solid #ccc;

    .iconfont {
      font-size: 36 * 0.01rem;
    }
    .icon-shoucang1 {
      color: orangered;
    }
    .icon_text {
      font-size: 20 * 0.01rem;
    }
  }
}
.goods_info {
  padding-bottom: 90 * 0.01rem;
  .goods_info_title {
    color: var(--color-tint);
    font-size: 32 * 0.01rem;
    font-weight: 600;
    padding: 20 * 0.01rem;
    border-top: 10 * 0.01rem solid #eee;
    border-bottom: 10 * 0.01rem solid #eee;
  }
}
.btm_tool {
  border-top: 1px solid #ccc;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  height: 90 * 0.01rem;
  background-color: #fff;
  .tool_item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    button {
      /* 魔术按钮,通过定位大小,并透明来实现功能 */
      position: absolute;
      left: 0;
      right: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
    .text_dec {
      font-size: 20 * 0.01rem;
    }
  }
  .btn_cart {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffa500;
    color: white;
    font-size: 30 * 0.01rem;
    font-weight: 600;
  }
  .btn_buy {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #eb4450;
    color: white;
    font-size: 30 * 0.01rem;
    font-weight: 600;
  }
}
</style>
