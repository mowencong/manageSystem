<template>
  <div id="app">
    <router-view/>
    
    </div>
</template>

  </div>
</template>

<script>
import Vue from 'vue';
import Element from 'element-ui';
Vue.use(Element);
import 'element-ui/lib/theme-chalk/index.css';
export default {
  name: 'App',
// 	provide(){
// 		return{
// 			reload:this.reload
// 		}
// 	},
// 	data(){
// 		return{
// 			isRouterAlive:true
// 		}
// 	},
// 	methods:{
// 		reload(){
// 			this.isRouterAlive = false
// 			this.$nextTick(function(){
// 				this.isRouterAlive = true
// 			})
// 		}
// 	}
  
  
}
</script>

<style>
	body{
		height: auto;
		background: url(img/login-background.jpg) no-repeat center fixed;
    background-size: cover;
    color: rgba(255,255,255,.95);
	}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */

 
}

</style>
