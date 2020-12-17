<template>
  <div id="auth">
    <nav-bar class="navbar">
       <div slot="left" class="back" @click="$router.replace('/home')">
        <van-icon class="iconLeft" name="wap-home-o" color="#fff" />
      </div>
      <div slot="center">商品详情</div>
    </nav-bar>
    <div class="auth_btn">
      <van-button class="vb" plain type="primary" @click="userInfo">获取授权</van-button>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
export default {
  data() {
    return {}
  },
  components: {
    NavBar
  },
  mounted(){
    
  },
  methods:{
    userInfo(){
      //假数据
    const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    sessionStorage.setItem("token", JSON.stringify(token));
    if(token){this.$router.history.go(-1)}
    }
  }
}
</script>
<style lang="less" scoped>
#auth {
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
/* pages/auth/index.wxss */
.auth_btn{
  text-align: center;
.vb {
  width: 70%;
  font-weight: 400 !important;
  margin-top: 40 * 0.01rem;
}
}
</style>
