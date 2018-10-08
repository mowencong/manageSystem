<template>
<div>
  <h3>修改密码</h3>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    
    <el-form-item label="原始密码" prop="age">
      <el-input v-model.number="ruleForm2.age" disabled class="fore" ></el-input>
    </el-form-item>

    <el-form-item label="新密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" class="fore" auto-complete="off"></el-input><span style="margin-left:10px;">6-16个字符</span>
    </el-form-item>

    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" class="fore" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
    
  </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原始密码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 100000 && value > 999999) {
              callback(new Error('原始密码必须为6位数'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!/^\S{6,20}$/.test(value)){
          callback(new Error('密码不能有空格'));
        }else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        // yuanshimima:sessionStorage.getItem('user'),
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: localStorage.getItem('pwd')
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
//           age: [
//             { validator: checkAge, trigger: 'blur' }
//           ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$axios.get('/api/change',{
        	params: {
        		id:localStorage.getItem('id'),
        		password:this.ruleForm2.pass
        	}
        }).then(res=>{
					console.log(res)
					this.msg = res.data;
					console.log(this.msg);
					this.$refs[formName].validate((valid) => {
						if (res.data == '修改成功') {
							if(this.pass!='' || this.checkPass!=''){
								this.$router.push('/login');
							}
							
						} else {
							console.log('error submit!!');
							return false;
						}
					});
				})
      },
      resetForm(formName) {
        // this.$refs[formName].resetFields();
				this.ruleForm2.pass='',
				this.ruleForm2.checkPass=''
      },
    }
  }
</script>


<style scoped>
    .fore{width: 300px;}
    h3{height: 40px;line-height: 40px;border-bottom:1px solid #eee;margin-bottom:20px;}
</style> 