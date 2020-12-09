<template>
  <div id="detail">
    <nav-bar class="navbar"><div slot="center">商品详情</div></nav-bar>
    <!-- javascript:history.go(-1) -->
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
      <div class="goods_collect" @click="chooseCollect">
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
      <router-link class="tool_item" to="/cart">
        <div class="iconfont icon-gouwuche"></div>
        <div class="text_dec">购物车</div>
      </router-link>
      <div class="tool_item btn_cart" @click="addCart">
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
import { Toast } from 'vant'
/* 引入配置发送文件 */
/* 业务逻辑
1.点击轮播图大图功能 (未做)
 1]绑定点击事件
 2]调用api previewImage
2.加入购物车功能 
 1]绑定点击事件
 2]获取相关数据
 3]添加步骤
  1-判断是否存在,存在则填充缓存中数量++
  2.不存在直接加新元素,填充缓存
 4]提示消息 
3.商品收藏功能
 1]点击改变图标
 2]收藏或取消缓存本地数据,在一个数组中(实际开发是写入后台数据库)
  1-用onshow是因为常用功能 
  2-页面栈拿数据getcurrentpages
 3]关联其他展示数据
 4.点击购买跳转支付页面 (添加购物车功能并跳转支付页面 未做)
 */
export default {
  data() {
    return {
      goodsObj: {},
      isCollect: false,
      GoodsInfo: {} //这是个全局变量需要存储到vuex中
    }
  },
  components: {
    NavBar
  },
  mounted() {
    console.log(this.$route)
    this.getGoodsDetail()
  },
  methods: {
    getGoodsDetail() {
      //请求数据和加载缓存
      getDetailData1(this.$route.query).then(res => {
        let goodsObj = res.data.message
        this.GoodsInfo = goodsObj
        //获取缓存收藏
        let collect = JSON.parse(localStorage.getItem('collect')) || []
        let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
        goodsObj = {
          //减少数据调用
          goods_name: goodsObj.goods_name,
          goods_price: goodsObj.goods_price,
          //iphone部分手机不识别webp格式
          //让后台修改图片,或判断使用不同图片
          //临时用正则替换
          goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: goodsObj.pics
        }
        this.goodsObj = goodsObj
        this.isCollect = isCollect
        console.log(this.goodsObj)
        console.log(this.GoodsInfo)
      })
    },
    chooseCollect() {//图标收藏选择
      let isCollect = false
      let collect = JSON.parse(localStorage.getItem('collect')) || []
      let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
      if (index !== -1) {
        collect.splice(index, 1)
        isCollect = true
        Toast({
          message: '收藏取消',
          icon: 'none'
        })
      } else {
        collect.push(this.GoodsInfo)
        Toast({
          message: '收藏成功',
          icon: 'success'
        })
      }
      localStorage.setItem('collect', JSON.stringify(collect))
      isCollect = !isCollect
      this.isCollect = isCollect
    },
    addCart() {
    //1.获取缓存中的数据
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    //2.判断商品是否存在过
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      //3 不存在 第一次添加
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      //4.已经存在购物车数据 执行 num++
      cart[index].num++
      console.log(cart[index].num);
    }
    //5.把购物车重新添加入缓存中
    localStorage.setItem('cart', JSON.stringify(cart))
    //6.弹窗提示
    Toast({
      message: '加入成功',
      icon: 'success',//可传入图片链接
      duration: 1500,//存在时长
      // overlay:true//蒙版,并防止手抖
      forbidClick:true//禁止点击
    })
  },
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
  font-size: 28 * 0.01rem;
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
