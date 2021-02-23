import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 声明 $bus  为了之后使用事件总线监听 goodsItem 中的图片加载完成  
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//安装vue-lazyload插件
Vue.use(VueLazyLoad, {
	loading: require('./assets/img/common/placeholder.png')
})

// 解决移动端点击时的300ms延时问题
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
