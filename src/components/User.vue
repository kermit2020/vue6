<template>
  <div id="user">
    <nav-bar class="navbar"><div slot="center">个人中心</div></nav-bar>
    <!--pages/user/index.wxml-->

    <div class="user_info_wrap">
      <div v-if="userInfo.avatarUrl" class="user_img_wrap">
        <img class="user_big" :src="userInfo.avatarUrl" />
        <div class="user_info">
          <img class="user_name" :src="userInfo.avatarUrl" />
          <div class="user_text">{{ userInfo.nickName }}</div>
        </div>
      </div>
      <div v-else class="user_btn">
        <a class="tologin" target="" to="/login">
          登录
        </a>
      </div>
    </div>
    <div class="user_content">
      <div class="user_main">
        <!-- 历史足迹 -->
        <div class="history_wrap">
          <a>
            <div class="his_num">0</div>
            <div class="his_name">收藏的店铺</div>
          </a>
          <router-link  to="/collect">
            
            <div class="his_num">{{ collectNum }}</div>
            <div class="his_name">收藏的商品</div>
          </router-link>
          <a>
            <div class="his_num">0</div>
            <div class="his_name">关注的商品</div>
          </a>
          <a>
            <div class="his_num">0</div>
            <div class="his_name">我的足迹</div>
          </a>
        </div>
        <!-- 我的订单 -->
        <div class="orders_wrap">
          <div class="orders_title">我的订单</div>
          <div class="order_content">
            <a url="/pages/order/index?type=1">
              <div class="iconfont icon-ding_dan"></div>
              <div class="order_name">全部订单</div>
            </a>
            <a url="/pages/order/index?type=2">
              <div class="iconfont icon-fukuantongzhi"></div>
              <div class="order_name">待付款</div>
            </a>
            <a url="/pages/order/index?type=3">
              <div class="iconfont icon-receipt-address"></div>
              <div class="order_name">待收货</div>
            </a>
            <a>
              <div class="iconfont icon-tuihuotuikuan_dianpu"></div>
              <div class="order_name">退款/退货</div>
            </a>
          </div>
          <!-- 收货地址管理 -->
          <div class="address_wrap">
            收货地址管理
          </div>
          <!-- 应用信息相关 -->
          <div class="app_info_wrap">
            <div class="app_info_item app_info_contact">
              <span>联系客服</span>
              <span>400-618-4000</span>
            </div>
            <router-link to="/feedback" class="app_info_item">意见反馈</router-link>
            <div class="app_info_item">关于我们</div>
          </div>

          <!-- 推荐 -->
          <div class="recommend_wrap">
            把应用推荐给其他人
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
export default {
  data() {
    return {
      userInfo: {},
      collectNum: 0
    }
  },
  components: {
    NavBar
  },
  mounted(){
    this.userInfo =JSON.parse(localStorage.getItem("userInfo"))||{};
    this.collect =JSON.parse(localStorage.getItem("collect"))||[];
    this.collectNum =this.collect.length  
  },
}
</script>
<style lang="less" scoped>
#user {
  padding-bottom: 10vh;
  padding-top: 7vh;
  width: 100%;
  font-size: 16/50rem;
  background-color: #edece8;
  height: 93vh;
}

/* pages/user/index.wxss */
.user_info_wrap {
  position: relative;
  height: 45vh;
  background-color: var(--color-tint);
  overflow: hidden;
  .user_img_wrap {
    img.user_big {
      height: 50vh;
      //高斯模糊
      filter: blur(10 * 0.01rem);
    }

    .user_info {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 20%;
      text-align: center;
      .user_name {
        width: 150 * 0.01rem;
        height: 150 * 0.01rem;
        border-radius: 50%;
      }
      .user_text {
        color: white;
        margin-top: 40 * 0.01rem;
        // font-size: 40*0.01rem;
      }
    }
  }
  .user_btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 40%;
    border: 1 * 0.01rem solid greenyellow;
    color: greenyellow;
    font-size: 38 * 0.01rem;
    padding: 30 * 0.01rem 50 * 0.01rem;
    border-radius: 10 * 0.01rem;
  }
}
.user_content {
  position: relative;

  .user_main {
    position: absolute;
    color: #666;
    padding-bottom: 100 * 0.01rem;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    top: -40 * 0.01rem;
    .history_wrap {
      background-color: #fff;
      display: flex;
      a {
        flex: 1;
        text-align: center;
        padding: 10 * 0.01rem 0;
        .his_num {
          color: var(--color-tint);
        }
        .his_name {
        }
      }
    }
    .orders_wrap {
      margin-top: 30 * 0.01rem;

      .orders_title {
        background-color: #fff;
        padding: 20 * 0.01rem;
        border-bottom: 1 * 0.01rem solid #ccc;
      }
      .order_content {
        display: flex;
        background-color: #fff;
        a {
          padding: 15 * 0.01rem 0;
          flex: 1;
          text-align: center;
          .iconfont {
            color: var(--color-tint);
            font-size: 40 * 0.01rem;
          }
          .order_name {
          }
        }
      }
    }
    .address_wrap {
      margin-top: 30 * 0.01rem;
      background-color: #fff;
      padding: 20 * 0.01rem;
      
    }
    .app_info_wrap {
      margin-top: 30 * 0.01rem;
      background-color: #fff;
    
      .app_info_item {
        display: flex;
        padding: 20 * 0.01rem;
        border-bottom: 1 * 0.01rem solid #ccc;
      }
      .app_info_contact {
        // display: flex;
        justify-content: space-between;
      }
    }
    .recommend_wrap {
      margin-top: 30 * 0.01rem;
      background-color: #fff;
      padding: 20 * 0.01rem;
    }
  }
}
</style>
