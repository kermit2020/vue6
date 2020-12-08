import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //商品的数组
    cartList:[],
    //收藏的商品信息
    GoodsInfo: {}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
