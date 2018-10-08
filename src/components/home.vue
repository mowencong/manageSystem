
<!-- <template> -->
  <!-- <div id="app"> -->
   
    <template>
    <div>
        <el-container>
      <el-header class="header" height="100px">
        <div class="top">
						<!-- <img src="../../server/server/public/uploads/146f495f7394b862cb50088388dba3ab.jpg"> -->
						<img :src="imgurl">
						<h2>
						电商后台管理系统
					</h2>
					<p>欢迎<strong>{{username}}</strong>登录我们的电商管理系统</p>
					<el-row class="btn">
						<el-button type="primary" round @click = "getItem()">退出</el-button>
						</el-row>
					
					
				</div>
      </el-header>
      <el-container>
        <el-aside width="250px" class="aside">
          <!-- 写侧边栏 -->
          <ul class="sidebar">
            <li v-for="tab in tabs"  @click="goto(tab.id)" class="item">{{tab.title}}</li>
          </ul>
        </el-aside>
        <el-main class="main"><router-view></router-view></el-main>
      </el-container>
    </el-container>
    </div>
		</div>
</template>

  
<!-- </template> -->

<script>
// import Vue from 'vue';

export default {
  // name: 'App',

    methods: {
			goto(id){
      console.log(id);
      this.$router.push({name:id});
    },
		getItem(){
			let username = localStorage.getItem('user');
			localStorage.clear();
			console.log(username)
			this.$router.push({name:'login'})
    }
		},
  data(){
    return {
			username:localStorage.getItem('user'),
			imgurl:localStorage.getItem('imgurl').replace('publicuploads','../../server/server/public/uploads/'),
      tabs:[
        {
          title:'商品管理',
          id:'manage'
        },
        {
          title:'商品分类',
          id:'classify'
        },
        {
          title:'商品列表',
          id:'manage'
        },
        {
          title:'用户管理',
          id:'user'
        },
        {
          title:'修改密码',
          id:'password'
        },
        {
          title:'资料修改',
          id:'datum'
        },
        {
          title:'交易管理',
        },
        {
          title:'订单列表',
        },
      ],
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
 
}
*{margin: 0;padding: 0;}
  .header{border:1px solid #000;background: skyblue;}
  .aside{height:770px;border:1px solid #000;background: #fff;}
  .sidebar .filter-tree{height:60px;border-bottom:1px solid #000;text-align: center;line-height:60px;font-size: 20px;}
  .item{
		height: 50px;
		line-height: 50px;
		text-align:center;
		border: 1px solid #ccc;
		color:#000;
		}
		.item:nth-child(1),.item:nth-child(4),.item:nth-child(7){
			background: #ccc;
		}
		.item:nth-child(2),.item:nth-child(3),.item:nth-child(5),.item:nth-child(6),.item:nth-child(8){
			background: #fff;
		}
		.top{
			margin:0 auto;
			height: 100px;
			position: relative;
		}
		.top img{
			width: 80px;
			height: 80px;
			border-radius: 50%;
			margin-top:5px;
			margin-left:20px;
		}
		.top h2{
			display: inline-block;
			margin-left:30px;
			height: 50px;
			position: absolute;
			top:30%;
		}
		.top p{display: inline-block;position: absolute;top:30%;right:150px;}
		.top .btn{display: inline-block;position: absolute;top:30%;right:30px;}
		.top strong{color:#000}
</style>
