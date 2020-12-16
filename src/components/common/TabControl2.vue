<template>
<!-- 以页面传递的参数控制的tab栏 -->
  <div class="tabcontrol">
    <div class="tab_item" v-for="(v,i) in titles" :key="i" :class="{active: i=== currentIndex}" @click="tabClick(i)"><span >{{v}}</span></div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  data(){
     return {
       currentIndex:0
     }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    },
  },
  mounted(){
    this.currentIndex=this.$route.query.type-1
  },
  methods:{
    tabClick(i){
      // this.currentIndex = i
      this.$emit('tabClickNow',i)
    },
  }
}
</script>

<style scoped>
.tabcontrol {
  display: flex;
  text-align: center;
  position: sticky;
  top:6.8vh;
  background-color: #fff;
}
.tab_item {
  flex:1;
  height: 6vh;
  line-height: 6vh;
  background-color: #eee;
  font-size: 14/50rem;
  
}
.active{
  color: var(--color-high-text);
  

}
.active span {
padding: 5px;
border-bottom:2px solid var(--color-tint);
}
</style>