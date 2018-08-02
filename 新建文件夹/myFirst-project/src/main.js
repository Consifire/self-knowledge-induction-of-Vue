// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// main.js是入口文件，主要作用是初始化vue实例并使用需要的插件
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)


Vue.config.productionTip = false
Vue.prototype.$axios = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',//实例挂载元素，index.html中的 div#app,
            // 但编译后页面上显示的是主组件App.vue的根目录div#app,因为template配置的模板编译时会替换挂载元素
  router,
  components: { App },
  template: '<App/>'//一个字符串模板作为 Vue 实例的标识使用。
  // 模板将会替换挂载的元素,App.vue中的div#app将会替换调index.html中的div#app。挂载元素的内容都将被忽略，除非模板的内容有分发插槽
})
