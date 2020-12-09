<template>
  <div id="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-show="!isActive"><slot name="icon"></slot></div>
    <div class="item-active-icon" v-show="isActive"><slot name="active-icon"></slot></div>
    <div class="item-text" :style="activeStyle"><slot name="text"></slot></div>
  </div>
</template>

<script>
	export default {
		name: "TabBarItem",
    props: {
			link: {
				type: String,
        required: true
      }
    },
    computed: {
			isActive() {
				return this.$route.path.indexOf(this.link) !== -1
      },
      activeStyle() {
				return this.isActive ? {'color': 'red'} : {}
      }
    },
    methods: {
			itemClick() {
        
				this.$router.replace(this.link).catch(err=>err)
      }
    }
	}
</script>

<style lang="less" scoped>
  #tab-bar-item {
    flex: 1;
    height: 1rem;
    display: flex;
    flex-direction: column;
    
  }
  .item-icon,.item-active-icon{
    flex:2;
    height: 0.3rem;
    // margin-top: -0.3rem;
  }
  .item-icon img,  img {
    width: 24/50rem;
    height: 24/50rem;
    margin-top: -0.66rem; 
    // margin-top: 0.1rem;
    vertical-align: middle;
    
    
  }

  .item-text {
    flex:1;
    font-size: 12/50rem;
    margin-bottom: 0.09rem;
    color: #333;
    
  }
</style>