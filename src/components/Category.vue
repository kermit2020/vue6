<template>
  <div id="category" class="category">
    <nav-bar class="navbar"><div slot="center">优购分类</div></nav-bar>
    <!-- 搜索框 start -->
    <router-link to="search" >
      <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" background="var(--color-tint)" class="search"/>
    </router-link>
    <!-- 搜索框 end -->
    <div class="cates_container">
      <!-- 左侧分类栏 -->
      <!-- <scroll-div class="left_menu" scroll-y> bindtap="getMenuItem" data-index="{{index}}"-->
      <div class="left_menu">
        <div class="menu_item" :class="i1 === currentIndex ? 'active' : ''" v-for="(v1, i1) in leftList" :key="i1" @click="getMenuItem(i1)">
          {{ v1 }}
        </div>
      </div>
      <!-- </scroll-div> -->
      <!-- 右侧详情栏 -->
      <div class="right_menu">
        <div class="goods_group" v-for="(v2, i2) in rightList" :key="i2">
          <div class="all_title">
            <span class="stop">/</span>
            <span class="goods_title">{{ v2.cat_name }}</span>
            <span class="stop">/</span>
          </div>
          <div class="goods_list">
            <!-- ?cid=v3.cat_id -->
            <router-link :to="'/goods_list?cid=' + v3.cat_id" v-for="(v3, i3) in v2.children" :key="i3" class="goods_list_router">
              <img :src="v3.cat_icon" />
              <div class="goods_name">{{ v3.cat_name }}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
import { getCategoryData1 } from '@/api/'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      value: '',
      //左侧大菜单数据存储
      leftList: [],
      //右侧点击数据存储
      rightList: [],
      //左侧选中项
      currentIndex: 0,
      //右侧滚动条位置
      // scrollTop: 0,
      //------全局数据 start----
      cateList: []
    }
  },
  mounted() {
    /* [1]缓存思路
    0.用法区别 web中和小程序中
      1) web:localStorage.setItem("key",{data1:1,data2:t});localStorage.getItem("key");
       小程序:wx.setStorageSync("key",{data1:1,data2:t});wx.getStorageSync("key");
      2) 存储类型转换
      web:需要toString()成字符串存入
      小程序:不存在类型转换
    1.查看本地存储有无旧数据
    {time:Date.now(),data:[...]}
    2.判断数据是否过期
    3.不过期则使用,过期则加载新数据 */
    //1.获取本地存储数据(小程序中也有本地存储技术)key要加引号
    let Cates = localStorage.getItem('key01')
    //2.判断
    if (!Cates) {
      this.getCategoryList()
    } else {
      Cates = JSON.parse(Cates)
      //旧数据,定义过期时间10秒检测->最终5分钟
      //方法(清除缓存>全部清空)点击编译观察network,看是否有请求数据,有说明新数据,再点击编辑,看是否没请求,然后可以看到log中打印的信息
      if (Date.now() - Cates.time > 1000 * 60 * 5) {
        //重新发送请求
        this.getCategoryList()
        console.log('新数据')
      } else {
        console.log('可以使用旧数据')
        this.cateList = Cates.data
        let leftList = []
        let rightList = []
        leftList = this.cateList.map(v => v.cat_name)
        rightList = this.cateList[0].children
        this.$set((this.leftList = leftList), (this.rightList = rightList))
      }
    }
    // console.log(this.rightList)
  },
  methods: {
    //商品分类数据获取
    getCategoryList() {
      getCategoryData1().then(res => {
        this.cateList = res.data.message
        //接口数据存入本地存储
        localStorage.setItem('key01', JSON.stringify({ time: Date.now(), data: this.cateList }))
        let leftList = []
        let rightList = []
        leftList = this.cateList.map(v => v.cat_name)
        // console.log(leftList)
        rightList = this.cateList[0].children
        // console.log(rightList)
        this.$set((this.leftList = leftList), (this.rightList = rightList))
        // console.log(this.rightList)
      })
    },
    //左侧菜单点击项
    getMenuItem(index) {
      // console.log(e);
      // console.log(this.$set());
      //[1]全局数据加载会很慢,要解决需要缓存
      if (index != undefined) {
        // let rightList=[]
        this.currentIndex = index
        this.rightList = this.cateList[index].children
        // if(this.cateList[index]){rightList = this.cateList[index].children
        // console.log(this.cateList);
        // console.log(index);
        // this.$set(
        //   this.currentIndex= index,
        //   this.rightList=rightList,
        //   //重新赋值,滚动条实现置顶功能
        //   // scrollTop: 0
        // )}
      }
    }
  }
}
</script>
<style lang="less" scoped>
#category {
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
/* pages/category/index.wxss */
html {
  height: 100%;
}
.category {
  height: 100%;

  .cates_container {
    /* 防止less自动编译用 ~'内容' 且运算2边空格*/
    // height: ~'calc(100vh - 90*0.01rem)';
    // height: calc(100vh - 90*0.01rem);
    margin-top: 14vh;
    display: flex;
    overflow: hidden;
    height: 84%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 2vh;
    .left_menu {
      flex: 2;
      float: left;
      overflow: auto;
      // width: 70%;
      height: 93%;
      // padding-bottom: 1vh;
      .menu_item {
        height: 80 * 0.01rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30 * 0.01rem;
      }
    }
    .active {
      color: var(--color-tint);
      border-left: 5 * 0.01rem solid currentColor;
    }
    .right_menu {
      flex: 5;
      float: left;
      overflow: auto;

      height: 93%;
      padding-bottom: 2vh;
      .goods_group {
        .all_title {
          height: 80 * 0.01rem;
          justify-content: center;
          align-items: center;
          display: flex;
          .stop {
            color: #999;
            padding: 0 10 * 0.01rem;
          }
          .goods_title {
          }
        }

        .goods_list {
          display: flex;
          flex-wrap: wrap;
          .goods_list_router {
            width: 33.33%;
            text-align: center;
            img {
              width: 50%;
            }
            .goods_name {
            }
          }
        }
      }
    }
  }
}
</style>
