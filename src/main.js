import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 声明 $bus  为了之后使用事件总线监听 goodsItem 中的图片加载完成  
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
