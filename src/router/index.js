import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import manage from '@/components/manage'
import classify from '@/components/classify'
import goodslist from '@/components/goodslist'
import user from '@/components/user'
import password from '@/components/password'
import datum from '@/components/datum'
import home from '@/components/home'

Vue.use(Router)


let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
      
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
			meta:{requiresAuth:true},
      children: [
        // {
        //   // 当 /user/:id/profile 匹配成功，
        //   // UserProfile 会被渲染在 User 的 <router-view> 中
        //   path: 'profile',
        //   component: UserProfile
        // },
        {
          path: '/manage',
          name: 'manage',
          component: manage,
					meta:{requiresAuth:true}
        },
        {
          path: '/classify',
          name: 'classify',
          component: classify,
					meta:{requiresAuth:true}
        },
        {
          path: '/goodslist',
          name: 'goodslist',
          component: manage,
					meta:{requiresAuth:true}
        },
        {
          path: '/user',
          name: 'user',
          component: user,
					meta:{requiresAuth:true}
        },
        {
          path: '/password',
          name: 'password',
          component: password,
					meta:{requiresAuth:true}
        },
        {
          path: '/datum',
          name: 'datum',
          component: datum,
					meta:{requiresAuth:true}
        }
      ]
    },
    
  ]
});


router.beforeEach((to, from, next) => {
  console.log('路由:'+to);

  // 需要登录才允许进入路由
  if(to.meta.requiresAuth){
  	// 判断是否登录
  	if(localStorage.getItem('user')){
  		next();
  	}else{
  		next({
  			path:'/login'
  		})
  	}
  }else{
	  // 调用next()方法，放行路由跳转
	  next();
  }

});


export default router;
