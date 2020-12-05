<template>
<div id="home">
  <nav-bar class="navbar"><div slot="center">优购首页</div></nav-bar>
<p>首页111111111111111111</p> 首页111111111111111111
<!-- 分类导航cate start-->
<div class="index_cate">
  <router-link class="index_cate_item" to='/category'  v-for="(v2,i2) in cateList" :key="i2" >
    <img  :src="v2.image_src"   />
  </router-link>
    
</div>
<!-- 分类导航cate end-->
</div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/common/NavBar'

import {getHomeData2} from '@/api/'

export default {
  name: 'Home',
  components: {
   NavBar,
  },
  data(){
    return{
      cateList:[],
    }
  },
  mounted(){
    getHomeData2().then(res => {
            console.log(res);
            //获取第二项-分类图
            this.cateList=res.data.message

           
        });
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
.title{
  color:var(--themeColor01);
}
swiper{
  width: 750*0.01rem;
  height: 340*0.01rem;
  image{
    width:100%;
  }
}
.index_cate{
  display: flex;
  .index_cate_item{
    flex:1;
    padding: 20*0.01rem;
    img{
      width: 100%;
    }
  }
}
.index_floor{
  .floor_group{
    padding: 10*0.01rem 0;
    .floor_title{
      image{
        width: 100%;
      }
    }
    .floor_content{
      
      navigator{
        
        float: left;
        width: 33.33%;
        
        /* 后四个超链接 */
        &:nth-last-child(-n+4){
          /* 第一个图片是232*386 
          232/386=33.33vw/height
          less语法可以直接计算
          */
         height: 33.33vw*386/232/2;
         border-left: 10*0.01rem solid white;
        //  border-bottom: 10*0.01rem solid white;
        }
        &:nth-child(2){border-bottom: 10*0.01rem solid white;}
        &:nth-child(3){border-bottom: 10*0.01rem solid white;}
        image{
          width: 100%;
          /* 做适应后高要继承 */
          height: 100%;
        }
      }
    }
  }
}
</style>
