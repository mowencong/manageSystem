// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import home from './components/home'
import router from './router'

Vue.config.productionTip = false

//引入axios
import axios from 'axios';
Vue.use(axios);
Vue.prototype.$axios = axios;

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//单独引进loading
import { Loading } from 'element-ui';

let loadinginstace;

//请求拦截
// axios.interceptors.request.use(config =>{
//   console.log('请求拦截：',config)
// 
//   //给所有的post且带传参数的请求添加content-type
//   if(config.method === 'post'){
//     config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//   }
// 
//   //loading用法两种之一
//   loadinginstace = Loading.service({
//     fullscreen:true,
//     background:red
//   });
// 
//   return config;
// });
// 
// //相应拦截
// axios.interceptors.response.use(data => {
//   //相应成功关闭loading
//   loadinginstace.close();
// 
//   //此处可以对相应的数据进行处理
// 
//   return data;
// });

//

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
