<template>
  <div id="cart">
    <nav-bar class="navbar"><div slot="center">商品详情</div></nav-bar>
    <div class="cart_address_row">
      <!-- 无收货地址 显示按钮 -->
      <div class="address_btn" v-if="!address.userName">
        <van-button plain  type="primary">获取收货地址</van-button>
        <!-- <button type="primary" plain bindtap="chooseAddress">
          获取收货地址
        </button> -->
      </div>
      <!-- 有收货信息 显示地址 -->
      <div v-else>
        <div class="user_info_row">
          <div class="user_info">
            <div>收货人:{{ address.userName }}</div>
            <div>{{ address.provinceName }}{{ address.cityName }}{{ address.countyName }}{{ address.detailInfo }}</div>
          </div>
          <div class="user_phone">{{ address.telNumber }}</div>
        </div>
      </div>
    </div>
    <!-- 购物车容器 -->
    <div class="cart_content">
      <div class="cart_title">购物车</div>
      <div class="cart_main">
        <!-- 如果为空,则添加提示图片 -->
        <div v-if="cart.length !== 0">
          <div class="cart_item" v-for="(v1, i1) in cart" :key="i1">
            <!-- 3部分 复选框 -->
            <div class="cart_checked_wrap">
              <!-- <checkbox-group bindchange="changeOne" :name="v1.goods_id"> -->
              <!-- data-id="{{v1.goods_id}}" -->
              <!-- <checkbox :checked="v1.checked" name="v1.goods_id">            -->
              <!-- </checkbox>             -->
              <!-- </checkbox-group> -->
              <!-- <van-checkbox-group v-model="result"> -->
              <van-checkbox v-model="v1.checked" checked-color="var(--color-tint)" shape="square" @click="changeOne(v1.goods_id, v1.checked)"></van-checkbox>
              <!-- </van-checkbox-group> -->
            </div>
            <!-- 图片 -->
            <a class="cart_pic_wrap">
              <img :src="v1.goods_small_logo" />
            </a>
            <!-- 信息 -->
            <div class="cart_info_wrap">
              <div class="goods_name">{{ v1.goods_name }}</div>
              <div class="goods_price_wrap">
                <div class="goods_price">￥{{ v1.goods_price }}</div>
                <div class="goods_tool">
                  <div class="goods_sub" @click="changeGoodsNum(v1.goods_id, (num = -1))">-</div>
                  <!-- data-id="{{item.goods_id}}" data-operation="{{-1}} -->
                  <div class="goods_num">{{ v1.num }}</div>
                  <div class="goods_add" @click="changeGoodsNum(v1.goods_id, (num = 1))">+</div>
                  <!-- data-id="{{item.goods_id}}" data-operation="{{1}}" -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clearCart" v-else>
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596803337410&di=7e257390ec5339226793827fa9e97411&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe1b1467beea0a9c7d6a56b32bac6d7e5dcd914f7c3e6-YTwUd6_fw658"
          />
        </div>
      </div>
    </div>
    <!-- 底部工具栏 -->
    <div class="footer_tool">
      <!-- 3部分 全选 -->
      <div class="all_chk_wrap">
        <van-checkbox @click="changeAll(allChecked)" v-model="allChecked" checked-color="var(--color-tint)" shape="square">全选</van-checkbox>
      </div>
      <!-- 3部分 总计 -->
      <div class="total_price_wrap">
        <div class="total_price">
          合计: <span class="price_text">￥{{ totalPrice }}</span>
        </div>
        <div>
          包含运费
        </div>
      </div>
      <!-- 3部分 结算 -->
      <div class="order_pay_wrap" @click="userPay">结算({{ totalNum }})</div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
import { Dialog ,Toast} from 'vant'
export default {
  data() {
    return {
      address: {},
      cart: [],
      allChecked: false,
      totalPrice: 0,
      totalNum: 0
    }
  },
  components: {
    NavBar
  },
  beforeCreate() {},
  mounted() {
    //  const address = wx.getStorageSync('address')
    this.cart = JSON.parse(localStorage.getItem('cart')) || []
    this.setCart(this.cart)

    // this.cart.allChecked===undefined?this.cart.allChecked=true:this.cart.allChecked
    //every这方法对于空数组也是true
    // const allChecked =cart.length?cart.every(v=>v.checked):false;
    // this.setCart(cart)
    // this.setData({
    //   address
    // })
  },
  methods: {
    //商品单件选中
    changeOne(id, checked) {
      let index = this.cart.findIndex(v => v.goods_id === id)
      // console.log(index)

      this.cart[index].checked = checked

      // console.log(this.cart[index].checked)
      this.setCart(this.cart)
    },
    //商品全选反选功能
    changeAll(all1) {
      // console.log(all1);
      this.cart.forEach(v => (v.checked = all1))
      this.setCart(this.cart)
    },
    //商品计数功能
    changeGoodsNum(id, num) {
      const index = this.cart.findIndex(v => v.goods_id === id)
      //判断是否要执行
      if (this.cart[index].num === 1 && num === -1) {
        //弹窗提示
        Dialog.confirm({
          title: '提示',
          message: '您是否要删除该商品?'
        })
          .then(() => {
            // on confirm
            this.cart.splice(index, 1)
            this.setCart(this.cart)
          })
          .catch(() => {
            // on cancel
          })
      } else {
        this.cart[index].num += num
      }

      this.setCart(this.cart)
    },
    //封装方法----
    setCart(cart) {
      let allChecked = true
      // // 1 总价格 总数量
      let totalPrice = 0
      let totalNum = 0
      cart.forEach(v => {
        if (v.checked) {
          totalPrice += v.num * v.goods_price
          totalNum += v.num
        } else {
          allChecked = false
        }
      })
      console.log(totalPrice)
      // 判断数组是否为空
      allChecked = cart.length != 0 ? allChecked : false
      // this.$set((this.totalPrice = totalPrice), (this.totalNum = totalNum))
      this.cart = cart
      this.totalPrice = totalPrice
      this.totalNum = totalNum
      this.allChecked = allChecked
      // console.log(this.cart.allChecked);
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    //用户结算提示功能
  userPay(){
    
    if(!this.address.userName){
      Toast({
        message: '缺少送货地址',
        icon: 'none',
        duration: 1500,
      });
      return;  
    }
    if(this.totalNum===0){
      Toast({
        message: '缺少购买商品',
        icon: 'none',
        duration: 1500,
      });
      return;  
    }
    //跳转支付页面
    // wx.navigateTo({
    //   url: '/pages/pay/index',
    //   success: (result) => {
        
    //   },
    //   fail: () => {},
    //   complete: () => {}
    // });
      
  },
  }
}
</script>
<style lang="less" scoped>
#cart {
  padding-bottom: 10vh;
  padding-top: 7vh;
  width: 100%;
  font-size: 16/50rem;
}
/* pages/cart/index.wxss */
page {
  padding-bottom: 90 * 0.01rem;
}
.cart_address_row {
  .address_btn {
    padding: 20 * 0.01rem;
    text-align: center;
    button {
      width: 60%;
      font-weight: 400;
    }
  }
}
.user_info_row {
  display: flex;
  padding: 20 * 0.01rem;
  .user_info {
    flex: 5;
  }
  .user_phone {
    flex: 3;
    text-align: right;
  }
}
.cart_content {
  margin-bottom: 2rem;
  .cart_title {
    padding: 20 * 0.01rem;
    font-size: 36 * 0.01rem;
    color: var(--color-tint);
    border-top: 1 * 0.01rem solid currentColor;
    border-bottom: 1 * 0.01rem solid currentColor;
  }

  .cart_main {
    .cart_item {
      display: flex;
      padding: 10 * 0.01rem;
      border-bottom: 1 * 0.01rem solid #ccc;
      .cart_checked_wrap {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        
      }

      a.cart_pic_wrap {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 80%;
          height: 80%; //自修改的,根据实际图片删减
        }
      }

      .cart_info_wrap {
        flex: 4;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .goods_name {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; //第2行显示不下缩略
          color: #666;
        }

        .goods_price_wrap {
          display: flex;
          justify-content: space-between;
          .goods_price {
            color: var(--color-tint);
            font-size: 34 * 0.01rem;
          }

          .goods_tool {
            display: flex;
            .goods_sub {
              width: 55 * 0.01rem;
              height: 55 * 0.01rem;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1 * 0.01rem solid #ccc;
            }

            .goods_num {
              width: 55 * 0.01rem;
              height: 55 * 0.01rem;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .goods_add {
              width: 55 * 0.01rem;
              height: 55 * 0.01rem;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 1 * 0.01rem solid #ccc;
            }
          }
        }
      }
    }
  }
}
.footer_tool {
  border-top: 1 * 0.01rem solid #ccc;
  position: fixed;
  bottom: 7vh;
  left: 0;
  width: 100%;
  height: 90 * 0.01rem;
  background-color: #fff;
  display: flex;

  .all_chk_wrap {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .total_price_wrap {
    text-align: right;
    flex: 5;
    margin-right: 15 * 0.01rem;
    .total_price {
      .price_text {
        color: var(--color-tint);
        font-size: 34 * 0.01rem;
        font-weight: 600;
      }
    }
  }

  .order_pay_wrap {
    flex: 3;
    background-color: var(--color-tint);
    color: white;
    font-size: 32 * 0.01rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.clearCart img {
  width: 100%;
}
</style>
