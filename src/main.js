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
//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.config.productionTip = false
Vue.use(VueQuillEditor)
new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
