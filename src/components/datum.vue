<template>
	<div>
		<h3>资料修改</h3>
			<el-form ref="form" :model="form" label-width="80px">
			  <el-form-item label="我的角色">
					<el-input v-model="form.part" class="part" disabled></el-input>
				<!-- <el-select v-model="form.part">
					
				  <el-option label="超级管理员" value="超级管理员" disabled></el-option>
				  <el-option label="管理员" value="管理员"></el-option>
				</el-select> -->
			  </el-form-item>
			  <el-form-item label="用户名" class="xg">
			  <el-input v-model="form.username" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="昵称" class="xg">
			  <el-input v-model="form.nickname"></el-input>
			  </el-form-item>
			  <el-form-item label="性别">
				<el-radio-group v-model="form.radio">
				  <el-radio v-model="form.radio" :label="form.value1"></el-radio>
				  <el-radio v-model="form.radio" :label="form.value2"></el-radio>
				</el-radio-group>
			  </el-form-item>
				
			  <el-form-item label="头像" class="xg" >
				  		<!-- <form action="http://10.3.137.38:8081/chk" method="post" enctype="multipart/form-data">
				          <input type="hidden" name="a" :value="form.id"/>
				          <hr>
				          <input type="file" name="img1" /><input type="submit" value="上传图片">
				      </form> -->
					
					<el-upload
						class="upload-demo"
						ref="upload"
						action="http://10.3.137.28:8081/chk/posts/"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:file-list="fileList"
						:auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
					
					
				  <!-- <el-upload
							class="upload-demo"
							action="http://10.3.137.196:8081/chk"
							method="post"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							multiple
							:limit="3"
							:on-exceed="handleExceed"
							:file-list="fileList">
							<el-button size="small" type="primary" @change="update">点击上传</el-button>
							
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
						<form action="/api/chk" method="post" enctype="multipart/form-data">
						<input type="file" name="form1" />
						<input type="submit" value="提交图片" />
						</form> -->
			  </el-form-item>
			  <el-form-item label="手机" class="xg">
			  <el-input v-model="form.phone"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱" class="xg">
			  <el-input v-model="form.email"></el-input>
			  </el-form-item>
			  <el-form-item label="备注" class="bz">
			  <el-input
				  type="textarea"
				  :rows="3"
				  placeholder="请输入内容"
				  v-model="form.remark">
				</el-input>
				</el-form-item>
			  <el-form-item>
				<el-button  @click="onSubmit" type="submit">确认修改</el-button>
				<el-button>重新填写</el-button>
			  </el-form-item>
		</el-form>

	</div>
</template>
<script>
  export default {
    data() {
      return {
				
        form: {
//           name: '',
//           part: '',
//           date1: '',
//           date2: '',
//           delivery: false,
//           type: [],
//           resource: '',
//           desc: ''
				part:localStorage.getItem('part'),
				nickname:localStorage.getItem('nickname'),
				username:localStorage.getItem('user'),
				email:localStorage.getItem('email'),
				phone:localStorage.getItem('phone'),
				remark:localStorage.getItem('remark'),
				id:localStorage.getItem('id'),
				radio: '男',
				value1:'男',
				value2:'女'
        },
				textarea:''
      }
    },
    methods: {
      onSubmit() {
				this.$axios.get('/api/changename',{
					params:{
						nickname:this.form.nickname,
						male:this.form.radio,
						phone:this.form.phone,
						email:this.form.email,
						remark:this.form.remark,
						id:localStorage.getItem('id')
					}
				}).then(res=>{
					if(res.data == "修改成功"){
						this.$notify({
							title: '提示',
							message: '资料修改成功',
							offset: 100,
						});
					}
					location.reload();
					console.log(res);
				})
        console.log('submit!');
      },
// 			onChange(){
// 				this.form.nickname:'',
// 				this.form.radio:'',
// 				this.form.phone:'',
// 				this.form.email:'',
// 				this.form.remark:''
// 			},
			submitUpload() {
        this.$refs.upload.submit();
      },
			handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
			 handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
			beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
// 添加请求头
// update (e) {  // 上传照片
//    var self = this
//    let file = e.target.files[0]
//    /* eslint-disable no-undef */
//    let param = new FormData() // 创建form对象
//    param.append('file', file, file.name) // 通过append向form对象添加数据
//    param.append('chunk', '0') // 添加form表单中其他数据
//    console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
//    let config = {
//     headers: {'Content-Type': 'multipart/form-data'}
//    }
//    添加请求头
//   axios.post('/api/upload', param, config)
//     .then(response => {
//      if (response.data.code === 0) {
//       self.ImgUrl = response.data.data
//      }
//      console.log(response.data)
//     })
  // }
    }
  }
</script>
<style>
	.xg{
		width:300px;
	}
	.part{width:220px}
</style>