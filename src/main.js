// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './store'
import 'lib-flexible'
import 'fastclick'
import {Toast,Dialog,Button} from 'vant'
// import 'vant/lib/index.css'//已改为babel-plugin-import按需引入
import './assets/global.css'
import Mixins from './mixins'
import $util from './utils';
import $sr from './axios';
Vue.prototype.$sr = window.$sr = $sr;
window.$util = $util;

if (process.env.NODE_ENV !== 'production') { // 如果是开发环境
  require('./utils/vconsole')
}
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Mixins)
Vue.config.productionTip = false
// 延时加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/image-empty.png'),
  loading: require('./assets/loading.png'),
  attempt: 1
  // adapter: {
  //   loaded({bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init}) {
  //     // do something here
  //     // example for call LoadedHandler
  //     console.log(el)
  //   },
  //   loading(listender, Init) {
  //     console.log('loading')
  //   },
  //   error(listender, Init) {
  //     console.log('error')
  //   }
  // }
})

// 注册 fastclick
document.addEventListener('DOMContentLoaded', function () {
  if (window.FastClick) window.FastClick.attach(document.body)
}, false)
/* eslint-disable no-new */
window.$App = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
