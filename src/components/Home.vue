<template>
  <div id="home">
    <nav-bar class="navbar"><div slot="center">优购首页</div></nav-bar>
    <!-- 搜索框 start -->
    <router-link to="search">
      <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" background="var(--color-tint)"/>
      </router-link>

    <!-- 搜索框 end -->
    <!-- 轮播图swiper start -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="v1 in swiperList" :key="v1.goods_id">
        <router-link :to="v1.navigator_url.replace(/\/pages/,'')"><img :src="v1.image_src"/></router-link>
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图swiper end -->
    <!-- 分类导航cate start-->
    <div class="index_cate">
      <router-link class="index_cate_item" to="/category" v-for="(v2, i2) in cateList" :key="i2">
        <img :src="v2.image_src" />
      </router-link>
    </div>
    <!-- 分类导航cate end-->
    <!-- floor start-->
    <div class="index_floor">
      <div class="floor_group" v-for="(v3, i3) in floorList" :key="i3">
        <!-- 标题 -->
        <div class="floor_title">
          <img :src="v3.floor_title.image_src" />
        </div>
        <!-- 内容 -->
        <div class="floor_content">
          <router-link :to="v4.navigator_url.replace(/\/pages/,'')" v-for="(v4, i4) in v3.product_list" :key="i4">
            <img :src="v4.image_src" />
          </router-link>
          <!-- mode="{{index===0?'widthFix':'scaleToFill'}}" -->
        </div>
      </div>
    </div>
    <!-- floor end-->
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/common/NavBar'

import { getHomeData1, getHomeData2, getHomeData3 } from '@/api/'

export default {
  name: 'Home',
  components: {
    NavBar
  },
  data() {
    return {
      value: '',
      swiperList: [],
      cateList: [],
      floorList: []
    }
  },
  mounted() {
    getHomeData1().then(res => {
      // console.log(res);
      //获取第1项-轮播图
      this.swiperList = res.data.message
    })
    getHomeData2().then(res => {
      // console.log(res);
      //获取第二项-分类图
      this.cateList = res.data.message
    })
    getHomeData3().then(res => {
      console.log(res.data.message)
      //获取第3项-楼层
      this.floorList = res.data.message
    })
  },
  methods: {
    // onSearch(val) {
    //   Toast(val);
    // },
    // onCancel() {
    //   Toast('取消');
    // },
  }
}
</script>
<style lang="less" scoped>
#home {
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
/**index.wxss**/
.title {
  color: var(--themeColor01);
}
.my-swipe .van-swipe-item {
  //    {
  //   color: #fff;
  //   font-size: 20px;
  //   line-height: 150px;
  //   text-align: center;
  //   background-color: #39a9ed;
  // }
  width: 750 * 0.01rem;
  height: 340 * 0.01rem;
  img {
    width: 100%;
  }
}
.index_cate {
  display: flex;
  .index_cate_item {
    flex: 1;
    padding: 20 * 0.01rem;
    img {
      width: 100%;
    }
  }
}
.index_floor {
  .floor_group {
    padding: 10 * 0.01rem 0;
    .floor_title {
      img {
        width: 100%;
      }
    }
    .floor_content {
      a {
        float: left;
        width: 33.33%;

        /* 后四个超链接 */
        &:nth-last-child(-n + 4) {
          /* 第一个图片是232*386 
          232/386=33.33vw/height
          less语法可以直接计算
          */
          height: 33.33vw * 386/232/2;
          border-left: 10 * 0.01rem solid white;
          //  border-bottom: 10*0.01rem solid white;
        }
        &:nth-child(2) {
          border-bottom: 10 * 0.01rem solid white;
        }
        &:nth-child(3) {
          border-bottom: 10 * 0.01rem solid white;
        }
        img {
          width: 100%;
          /* 做适应后高要继承 */
          height: 100%;
        }
      }
    }
  }
}
</style>
