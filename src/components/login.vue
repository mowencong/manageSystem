<template>
	<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
  <el-form-item
    prop="phone"
    label="用户名"
  >
    <el-input v-model="dynamicValidateForm.phone" id="username" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
	  
    <el-input v-model="ruleForm2.pass" autocomplete="off" id="psw" placeholder="请输入密码" type="password"></el-input>
  </el-form-item>
  <el-form-item>
	  <el-checkbox v-model="checked">记住密码</el-checkbox>
	  <a href="#">忘记密码</a>
	  </el-form-item>
 <el-form-item>
    <el-button type="primary" @click="getname()">登录</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
		checked: true,
        dynamicValidateForm: {
          phone: ''
        },
		ruleForm2: {
          pass: '',
          checkPass: ''
        },
		tabs:[{icon1:'person'},{icon2:'lock'}]
      };
    },
    methods: {
//       submitForm(formName) {
//         this.$refs[formName].validate((valid) => {
//           if (valid) {
//             this.$router.push({name:'home'})
//           } else {
//             console.log('error submit!!');
//             return false;
//           }
//         });
//       },
	  getname(){
		  console.log(this.dynamicValidateForm.phone);
		  let username = this.dynamicValidateForm.phone;
		  let password = this.ruleForm2.pass;
		  console.log(this.$axios)
		  
		  this.$axios.get('/api/login',{
			   params: {
				   username:username,
				   password:password
				  }
		  }).then(res=>{
			  let str = res.data;
				console.log(res.data);
			  if(str.text == '登陆成功'){
				  if(this.checked == true){
					  localStorage.setItem('user',username);
					  localStorage.setItem('pwd',password);
						localStorage.setItem('pwd',str.imgurl);
						localStorage.setItem('id',str.id);
						localStorage.setItem('part',str.ad);
						localStorage.setItem('nickname',str.nina);
						localStorage.setItem('email',str.email);
						localStorage.setItem('phone',str.phone);
						localStorage.setItem('remark',str.remark);
						localStorage.setItem('imgurl',str.imgurl);
				  }
				  this.$router.push({
				  path:'/home'
				  })
				 
			  }else{
				  this.$notify.error({
				  	title: '错误',
				  message: '账号或密码错误，请重新输入'
				  });
			  }
		  })
	  }
    },
	created(){
		this.getname();
        console.log(this.tabs);
        this.tabs.forEach(item=>{
            item.icon = 'static/assets/octicons/build/svg/'+item.icon + '.svg';
        });
    }
  }
</script>
<style>
	.demo-dynamic{
		margin: 15% auto;
		width: 450px!important;
		padding: 20px;
		border:1px solid #ccc;
	}
	#username{
		width: 300px;
	}
	#psw{
		width:300px;
	}
	el-form-item{
		margin:0 auto;
	}
	a{
		margin-left:150px;
		color:skyblue;
	}
</style>