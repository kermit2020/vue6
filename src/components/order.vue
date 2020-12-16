<template>
  <div id="order">
    <nav-bar class="navbar">
      <div slot="left" class="back" @click="$router.replace('/home')">
        <van-icon class="iconLeft" name="wap-home-o" color="#fff" />
      </div>
      <div slot="center">我的订单</div>
    </nav-bar>
    <tab-control2 :titles="['全部', '待付款', '待发货', '退货/退款']" class="tab-control" @tabClickNow="tabClickNow"></tab-control2>
    <div class="order_main">
      <div v-for="(v1, i1) in orders" :key="i1" class="order_item">
        <div class="order_no_row">
          <div class="order_no_text">订单编号</div>
          <div class="order_no_value">{{ v1.order_number }}</div>
        </div>
        <div class="order_price_row">
          <div class="order_price_text">订单价格</div>
          <div class="order_price_value">￥{{ v1.order_price }}</div>
        </div>
        <div class="order_time_row">
          <div class="order_time_text">订单日期</div>
          <div class="order_time_value">{{ v1.create_time_cn }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
import TabControl2 from '@/components/common/TabControl2'
export default {
  data() {
    return {
      orders: [
        {
          order_id: 1104,
          user_id: 23,
          order_number: 'HMDD20200808000000001104',
          order_price: 1360,
          create_time: 1565616985
        },
        {
          order_id: 1104,
          user_id: 23,
          order_number: 'HMDD20200808000000001104',
          order_price: 1360,
          create_time: 1565616985
        },
        {
          order_id: 1104,
          user_id: 23,
          order_number: 'HMDD20200808000000001104',
          order_price: 1360,
          create_time: 1565616985
        },
        {
          order_id: 1104,
          user_id: 23,
          order_number: 'HMDD20200808000000001104',
          order_price: 1360,
          create_time: 1565616985
        },
        {
          order_id: 1104,
          user_id: 23,
          order_number: 'HMDD20200808000000001104',
          order_price: 1360,
          create_time: 1565616985
        },
        {
          order_id: 1104,
          user_id: 23,
          order_number: 'HMDD20200808000000001104',
          order_price: 1360,
          create_time: 1565616985
        },
        {
          order_id: 1104,
          user_id: 23,
          order_number: 'HMDD20200808000000001104',
          order_price: 1360,
          create_time: 1565616985
        },
        {
          order_id: 1104,
          user_id: 23,
          order_number: 'HMDD20200808000000001104',
          order_price: 1360,
          create_time: 1565616985
        }
      ],
      
    }
  },
  components: {
    NavBar,
    TabControl2
  },
  mounted() {
    //   const token =wx.getStorageSync("token");
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index'
    //   });
    //    return;
    // }
    // let pages =  getCurrentPages(); 这是微信$route方法
    this.getOrders(this.$route.query.type)
  },
  methods: {
    tabClickNow(e) {
      this.$router.replace("/order?type="+(e+1)).catch(err=>err)
    },
    //请求数据在此方法内
    getOrders() {
      //    const res =await request({url:"/my/orders/all",data:{type}})
      //    console.log(res);
      //处理时间
      //假数据//时间过滤 toLocaleString()本地时间格式
      this.orders = this.orders.map(v => ({ ...v, create_time_cn: new Date(v.create_time * 1000).toLocaleString() }))
    }
  }
}
</script>
<style lang="less" scoped>
#order {
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
/* pages/order/index.wxss */
.order_main {
  .order_item {
    padding: 20 * 0.01rem;
    border-bottom: 1 * 0.01rem solid #ccc;
    color: #666;
    .order_no_row {
      display: flex;
      padding: 10 * 0.01rem 0;
      justify-content: space-between;
      .order_no_text {
      }

      .order_no_value {
      }
    }

    .order_price_row {
      display: flex;
      padding: 10 * 0.01rem 0;
      justify-content: space-between;
      .order_price_text {
      }

      .order_price_value {
        color: var(--color-tint);
        font-size: 32 * 0.01rem;
      }
    }

    .order_time_row {
      display: flex;
      padding: 10 * 0.01rem 0;
      justify-content: space-between;
      .order_time_text {
      }

      .order_time_value {
      }
    }
  }
}
</style>
