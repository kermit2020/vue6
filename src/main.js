import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入 vant ui
import './plugins/vant.js'
import 'vant/lib/icon/local.css';
//移动端适配处理
import './common/rem.js'
// import './common/flexible.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
