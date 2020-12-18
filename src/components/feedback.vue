<template>
  <div id="feedback">
    <nav-bar class="navbar">
      <div slot="left" class="back" @click="$router.history.go(-1)">
        <van-icon class="iconLeft" name="arrow-left" color="#fff" />
      </div>
      <div slot="center">意见反馈</div>
    </nav-bar>
    <tab-control :titles="['体验问题', '商品、商家投诉']" class="tab-control" @tabClickNow="tabClickNow"></tab-control>

    <div class="fb_main">
      <div class="fb_title">问题的种类</div>
      <div class="fb_tips">
        <span>功能建议</span>
        <span>购买遇到问题</span>
        <span>性能问题</span>
        <span>其他</span>
      </div>
      <div class="fb_content">
        <textarea v-model="textVal" bindinput="handleTextInput" placeholder="请描述一下您的问题"> </textarea>
        <div class="fb_tool">
          <button bindtap="handleChooseImg">+</button>

          <!-- <div class="up_img_item"
          v-for="(v1,i1) in chooseImgs"
          :key="i1"
          bindtap="handleRemoveImg"
          
          > -->
          <!-- data-index="{{index}}" -->
          <!-- <UpImg :src="v1" ></UpImg> -->
        </div>
        <!-- </div> -->
      </div>
      <div class="form_btn_wrap">
        <button bindtap="handleFormSubmit">
          <van-icon name="success" color="#fff" style="font-size: 0.5rem; padding: 0.5rem 0.1rem;" />
          &nbsp; 提交
        </button>
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
      // 被选中的图片路径 数组
      chooseImgs: [],
      // 文本域的内容
      textVal: '',
      // 外网的图片的路径数组
      UpLoadImgs: []
    }
  },
  components: {
    NavBar,
    TabControl
  },
  methods: {
    tabClickNow() {},
    // 点击 “+” 选择图片
  handleChooseImg() {
    // 2 调用小程序内置的选择图片api
    // wx.chooseImage({
    //   // 同时选中的图片的数量
    //   count: 9,
    //   // 图片的格式  原图  压缩
    //   sizeType: ['original', 'compressed'],
    //   // 图片的来源  相册  照相机
    //   sourceType: ['album', 'camera'],
    //   success: (result) => {

    //     this.setData({
    //       // 图片数组 进行拼接 
    //       chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
    //     })
    //   }
    // });

  },
  }
}
</script>
<style lang="less" scoped>
#feedback {
  padding-bottom: 10vh;
  padding-top: 7vh;
  width: 100%;
  font-size: 16/50rem;
  background-color: #eeeeee;
  height: 100vh;
}
.back .iconLeft {
  text-align: left;
  margin-left: -0.4rem;
  vertical-align: middle;
}
.fb_main {
  padding: 20 * 0.01rem;
  color: #666;
  .fb_title {
  }

  .fb_tips {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 30%;
      padding: 10 * 0.01rem;
      text-align: center;
      background-color: #fff;
      margin: 20 * 0.01rem 10 * 0.01rem;
    }
  }

  .fb_content {
    background-color: #fff;
    margin-top: 20 * 0.01rem;
    textarea {
      padding: 10 * 0.01rem;
      border: none;
      overflow: hidden;
      width: 100%;
      height: 30vh;
      resize: none;
    }
  }

  .fb_tool {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 30 * 0.01rem;
    button {
      margin: 0;
      width: 90 * 0.01rem;
      height: 90 * 0.01rem;
      font-size: 60 * 0.01rem;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20 * 0.01rem;
      margin-top: 20 * 0.01rem;
      color: #ccc;
    }
    .up_img_item {
      margin-left: 20 * 0.01rem;
      margin-top: 20 * 0.01rem;
    }
  }

  .form_btn_wrap {
    margin-top: 20 * 0.01rem;
    display: flex;
    justify-content: flex-end;

    button {
      flex: 0.3;
      margin: 0;
      // width: 30%;
      // height: 100%;
      font-size: 0.4rem;
      background-color: var(--color-tint);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.7rem;
      border-radius: 0.1rem;
      border: 0;
    }
  }
}
</style>
