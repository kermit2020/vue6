<template>
  <div id="goods_list" class="goods_list">
    <nav-bar class="navbar"><div slot="center">商品列表</div></nav-bar>
    <!-- 搜索框 start -->
    <router-link to="search" >
      <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" background="var(--color-tint)" class="search"/>
    </router-link>
    <tab-control :titles="['综合', '销量', '价格']" class="tab-control" @tabClickNow="tabClickNow"></tab-control>
    <div class="first_tab" ref="tabRef" id="tab">
      <router-link class="goods_item" v-for="(v1, i1) in goodsList" :key="i1" :to="'/detail?goods_id=' + v1.goods_id">
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
</template>
<script>
import NavBar from '@/components/common/NavBar'
import TabControl from '@/components/common/TabControl'
import { getGoodsListData1 } from '@/api'
import { Toast } from 'vant'
export default {
  components: {
    NavBar,
    TabControl
  },
  data() {
    return {
      value: '',
      goodsList: [],
      QueryParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
      },
      now: 0,
      isLoad: false,
      totalPages: Number
    }
  },
  mounted() {
    // console.log(this.$route)
    let a
    if (!a) {
      a = window.addEventListener('scroll', this.discuzScroll)
    }
    this.QueryParams.cid = this.$route.query.cid || ''
    this.QueryParams.query = this.$route.query.query || ''
    console.log(this.QueryParams.cid);
    this.getGoodsList()
  },
  updated() {},
  destroyed() {
    window.removeEventListener('scroll', this.discuzScroll)
  },
  methods: {
    getGoodsList() {
      // console.log(this.QueryParams)
      getGoodsListData1(this.QueryParams).then(res => {
        // console.log(res.data)
        let total = res.data.message.total
        //计算总页数
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
        //根据tab栏进行排序//判断是否追加数据

        let goodsList = [...this.goodsList, ...res.data.message.goods]
        if (this.now == 2) {
          goodsList = this.sortObj(goodsList, 'goods_price')
          console.log('yunxingle')
        } else if (this.now == 1) {
          goodsList = this.sortObj(goodsList, 'hot_mumber')
        }

        this.$set(
          //加载要进行数组拼接,而不能直接赋值替换
          (this.goodsList = goodsList)
        )
        this.isLoad = false
      })
    },
    sortObj(arr, v) {
      //排序
      return arr.sort((a, b) => a[v] - b[v])
    },
    tabClickNow(i) {
      //点击事件
      console.log(i)
      this.now = i
      this.$set((this.goodsList = []))
      this.QueryParams.pagenum = 1
      this.getGoodsList()
    },
    //下拉加载
    discuzScroll() {
      //兼容模式
      //滚动条运动高度
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
      let dom = document.getElementById('goods_list')
      let domHeight = dom.offsetHeight
      let top = Math.ceil(document.documentElement.clientHeight*0.85)//设备高度减去margin的15vh,可能这里用padding就不用计算了
      // let domHeight = this.$refs.tabRef.$el.offsetHeight
      console.log(top);
      console.log(scrollTop, domHeight)
      // console.log(this.$refs.tabRef.scrollTop)

      let that = this
      if (domHeight <= scrollTop + top + 1 && !this.isLoad) {
        that.isLoad = true
        // setTimeout(function() {
        that.getHomeGoods()
        // }, 1000)
      }
    },
    //请求多次商品数据
    getHomeGoods() {
      if (this.QueryParams.pagenum >= this.totalPages) {
        console.log('已经没有新信息了')
        // Toast('您好,信息已经展示完全!')
        Toast({
          message: '您好,信息已经展示完全!',
          icon: 'search'
        })
        this.isLoad = false
      } else {
        this.QueryParams.pagenum++
        this.getGoodsList()
      }
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

.search {
  position: fixed; /* 这些是原生滚动使用的 */
  left: 0;
  top: 7vh;
  right: 0;
}
.tab-control {
  position: fixed; /* 这些是原生滚动使用的 */
  left: 0;
  top: 14vh;
  right: 0;
}
.van-search__content--round {
  border-radius: 15 * 0.01rem;
}
/* pages/goods_list/index.wxss */
.goods_list {
  margin-top: 15vh;
  .first_tab {
    .goods_item {
      display: flex;
      border-bottom: 1px solid #ccc;
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
          color: var(--themeColor01);
          font-size: 32rpx;
        }
      }
    }
  }
}
</style>
