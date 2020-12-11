<template>
  <div id="search">
    <nav-bar class="navbar">
      <div slot="left" class="back" @click="$router.history.go(-1)">
        <van-icon class="iconLeft" name="arrow-left" color="#fff" />
      </div>
      <div slot="center">搜索中心</div></nav-bar
    >
    <!-- 搜索框 start -->
    <div class="search_row">
      <input placeholder="请输入商品名称" @input="bindInput" :value="defaultV" />
      <button v-show="isbutton" @click="handleCancel">取消</button>
    </div>
    <!-- 搜索框 end -->
    <!-- 内容显示 start -->
    <div class="search_content">
      <div class="search_item" v-for="(v1, i1) in goods" :key="i1">
        <router-link :to="'/detail?goods_id=' + v1.goods_id">
          {{ v1.goods_name }}
          <!-- 内容显示 end -->
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar'
import { getSearchData1 } from '@/api'
export default {
  data() {
    return {
      value: '',
      goods: [],
      isbutton: false,
      defaultV: '',
      timeID: -1
    }
  },
  components: {
    NavBar
  },
  mounted() {},
  methods: {
    bindInput(e) {
      this.defaultV=e.target.value
      // let text1 = e.target.value.trim()
      // const { value } = e.detail
      // console.log(value)
      if (!e.target.value.trim()) {
        clearTimeout(this.timeID)
        ;(this.isbutton = false), (this.goods = [])
        return
      }

      this.isbutton = true

      //防抖函数
      clearTimeout(this.timeID)
      this.timeID = setTimeout(() => {
        getSearchData1(e.target.value.trim()).then(res => {
          console.log(res)
          this.goods = res.data.message
        })
      }, 1000)
    },
    handleCancel() {
      //按钮取消文字
      clearTimeout(this.timeID)
      ;(this.defaultV = ''), (this.isbutton = false), (this.goods = [])
    }
  }
}
</script>
<style lang="less" scoped>
#search {
  padding-bottom: 10vh;
  padding-top: 7vh;
  width: 100%;
  font-size: 16/50rem;
  background-color: #eee;
  height: 100vh;
 
}
.back .iconLeft {
  text-align: left;
  margin-left: -0.4rem;
  vertical-align: middle;
  // margin-bottom: 2px;
  // background-color: #fff;
}

// .search {

// }
/* pages/search/index.wxss */

.search_row {
  position: fixed; /* 这些是原生滚动使用的 */
  left: 0;
  top: 7vh;
  right: 0;
  height: 100 * 0.01rem;
  display: flex;
  padding: 20 * 0.01rem !important;
  background-color: var(--color-tint);
  justify-content: center;
  align-items: center;
   
  input {
    flex: 7;
    height: 100%;
    background-color: #fff;
    border: none;
    border-radius: 0.05rem;
    font-size:14/50rem ;
  }
  button {
    // border: none;
    width: 110 * 0.01rem;
    height: 100%;
    font-size: 26 * 0.01rem;
    padding: 0;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10 * 0.01rem !important;
    border-radius: 0.1rem;
  }
}
.search_content {
  margin-top: 30 * 0.01rem;
  .search_item {
    background-color: #fff;
    font-size: 26 * 0.01rem;
    padding: 15 * 0.01rem 10 * 0.01rem;
    border-bottom: 1 * 0.01rem solid #ccc;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
