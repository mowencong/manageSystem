<template>
	<div class="demo-input-size">
		<span>登陆名</span>
		<el-input
		  placeholder="请输入内容"
		  v-model="input10"
		  clearable class="el">
		</el-input>
		<span>手机</span>
		<el-input
		placeholder="请输入内容"
		v-model="input11"
		clearable class="el">
		</el-input>
		<span>邮箱</span>
		<el-input
		placeholder="请输入内容"
		v-model="input12"
		clearable class="el">
		</el-input>
		<span>角色</span>
		<el-select v-model="value" placeholder="请选择">
			<el-option label="管理员" value="管理员"></el-option>
			<el-option label="超级管理员" value="超级管理员"></el-option>
		  </el-select>
		<el-button type="primary" icon="el-icon-search" @click="getSelect"></el-button>
		<el-row class="add">
			<el-button type="primary" @click = "add">添加</el-button>
			<!-- 添加商品按钮弹出框 -->
					<el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
						<el-form :model="form">
							<el-form-item label="用户名" :label-width="formLabelWidth">
								<el-input v-model="form.username" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="昵称" :label-width="formLabelWidth">
								<el-input v-model="form.nickname" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="密码" :label-width="formLabelWidth">
								<el-input v-model="form.password" autocomplete="off"></el-input>
								<!-- </el-select> -->
								<!-- <el-select v-model="form.password" clearable placeholder="请选择">
									<el-option
										v-for="item in options"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select> -->
							</el-form-item>
							<el-form-item label="手机" :label-width="formLabelWidth">
								<el-input v-model="form.phone" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="邮箱" :label-width="formLabelWidth">
								<el-input v-model="form.email" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="角色" :label-width="formLabelWidth">
								<el-select v-model="form.part" placeholder="请选择角色类型">
								<el-option label="管理员" value="管理员"></el-option>
								<el-option label="超级管理员" value="超级管理员"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="审核状态" :label-width="formLabelWidth">
								<el-select v-model="form.state" placeholder="请选择审核状态">
								<el-option label="已审核" value="已审核"></el-option>
								<el-option label="未审核" value="未审核"></el-option>
								</el-select>
							</el-form-item>
			<!-- 				<el-form-item label="商品信息不能为空,请输入商品信息" :label-width="LabelWidth" class="red">
							</el-form-item> -->
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="addpart()">确 定</el-button>
						</div>
					</el-dialog>
			
			
			
			<el-button type="danger" @click = "del">删除</el-button>
		</el-row>
			
		<el-table class="list"
			ref="multipleTable"
			:data="options"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange">
			<el-table-column
				type="selection"
				width="55">
			</el-table-column>
			<el-table-column
			prop="id"
				label="ID"
			sortable
				width="100">
				<!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
			</el-table-column>
			<el-table-column
				prop="username"
				label="登陆名"
				width="100">
			</el-table-column>
			<el-table-column
				prop="手机"
				label="手机"
				show-overflow-tooltip>
			</el-table-column>
			<el-table-column
			prop="邮箱"
			label="邮箱"
			show-overflow-tooltip>
			</el-table-column>
			<el-table-column
			prop="角色"
			label="角色"
			show-overflow-tooltip>
			</el-table-column>
			<el-table-column
			prop="regtime"
			label="加入时间"
			sortable
			show-overflow-tooltip>
			</el-table-column>
			<el-table-column
			prop="审核状态"
			label="审核状态"
			show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button
					size="mini"
					@click="readin(scope.$index,scope.row)"><i class="el-icon-edit"></i></el-button>
					
					
					<!-- 修改商品按钮弹出框 -->
							<el-dialog title="修改管理员信息" :visible.sync="changeFormVisible">
								<el-form :model="form">
									<el-form-item label="用户名" :label-width="formLabelWidth">
										<el-input v-model="form.username" autocomplete="off" :icon="icon"></el-input>
									</el-form-item>
									<el-form-item label="昵称" :label-width="formLabelWidth">
										<el-input v-model="form.nickname" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item label="手机" :label-width="formLabelWidth">
										<el-input v-model="form.phone" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item label="邮箱" :label-width="formLabelWidth">
										<el-input v-model="form.email" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item label="角色" :label-width="formLabelWidth">
										<el-select v-model="form.part" placeholder="请选择角色类型">
										<el-option label="管理员" value="管理员"></el-option>
										<el-option label="超级管理员" value="超级管理员"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="审核状态" :label-width="formLabelWidth">
										<el-select v-model="form.state" placeholder="请选择审核状态">
										<el-option label="已审核" value="已审核"></el-option>
										<el-option label="未审核" value="未审核"></el-option>
										</el-select>
									</el-form-item>
					<!-- 				<el-form-item label="商品信息不能为空,请输入商品信息" :label-width="LabelWidth" class="red">
									</el-form-item> -->
								</el-form>
								<div slot="footer" class="dialog-footer">
									<el-button @click="changeFormVisible = false">取 消</el-button>
									<el-button type="primary" @click="handleEdit()">确 定</el-button>
								</div>
							</el-dialog>
					
					
					
				<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row),del()"><i class="el-icon-delete"></i></el-button>
			</template>
			</el-table-column>
		</el-table>
			
			
	</div>
</template>
<script>
	export default {
		data() {
			return {
				dialogFormVisible:false,
				changeFormVisible:false,
				formLabelWidth:'120px',
				input10:'',
				input11:'',
				input12:'',
				options:[],
				selects:[],
				icon:'',
				Edit:{
					id:'',
					},                                                
				value: '管理员',
				form:{
					username:'',
					password:'',
					phone:'',
					email:'',
					part:'',
					state:'',
					nickname:''
				},
				
			}
		},
  methods:{
		// 获取用户信息
	  getUser(){
		  this.$axios.get('/api/getuser').then(res=>{
		  	console.log(666)
		  	let data = res;
			data.data.forEach(item=>{
				item.regtime = new Date(item.regtime).toLocaleDateString();
			})
			this.options.push(...data.data);
		})
	},
	// 搜索方法
	getSelect(){
		if(this.input10!='' || this.input11!='' || this.input12!='' || this.part!=''){
			this.$axios.get('/api/selectuser',{
				params:{
					username:this.input10,
					phone:this.input11,
					email:this.input12,
					part:this.value
				}
			}).then(res=>{
				console.log(res)
				this.options = [];
				this.options.push(...res.data);
			})
		}
		
		this.input10 = '',
		this.input11 = '',
		this.input12 = '',
		this.part = ''
		
	},
	//添加管理员判断权限
	add(){
		if(localStorage.getItem('part')=="管理员"){
			this.$notify.error({
				title:'错误',
				message:'你没有此权限',
				duration:1000
			})
			this.dialogFormVisible=false
		}else if(localStorage.getItem('part')=="超级管理员"){
			this.dialogFormVisible=true
		}
	},
	//删除管理员判断权限
	del(){
		if(localStorage.getItem('part')=="管理员"){
			this.$notify.error({
				title:'错误',
				message:'你没有此权限',
				duration:1000
			})
			dialogFormVisible=false
		}else if(localStorage.getItem('part')=="超级管理员"){
			this.$axios.get('api/delnamemanage?id='+this.selects).then(res=>{
				
			})
		}
	},
	// 全选单选
	handleSelectionChange(val) {
	this.multipleSelection = val;
	this.selects = []
	val.map(item=>{
		this.selects.push(item.id);
	});
	},
	// 添加管理员
	addpart(){
		this.$axios.get('/api/adduser',{
			params:{
				username:this.form.username,
				password:this.form.password,
				phone:this.form.phone,
				email:this.form.email,
				part:this.form.part,
				state:this.form.state,
				nickname:this.form.nickname
			}
		}).then(res=>{
			console.log(res)
			if(res.data == "请输入用户信息"){
				this.dialogFormVisible=true;
				this.$message.error('用户信息不能为空');
			}else{
				this.dialogFormVisible=false;
				 location.reload();
				 this.$message.success('用户信息添加成功');
			 }
		})
				this.form.username = '',
				this.form.password = '',
				this.form.phone = '',
				this.form.email = '',
				this.form.part = '',
				this.form.state = ''
	},
	//写入信息
	readin(index, row,id){
		console.log("行信息:"+row.id);
		this.Edit.id = row.id;
		if(localStorage.getItem('part')=="管理员"){
			this.$notify.error({
				title:'错误',
				message:'你没有此权限',
				duration:1000
			})
			this.changeFormVisible=false
		}else if(localStorage.getItem('part')=="超级管理员"){
			this.changeFormVisible=true
		}
	},
	//删除单个管理员信息
	handleDelete(index,row){
		if(localStorage.getItem('part')=="超级管理员"){
			this.$axios.get('/api/delnamemanage?id='+row.id).then(res=>{
				if(res.data == "删除成功"){
					this.$message.success('用户信息删除成功');
					location.reload();
				}
				
			})
		}else if(localStorage.getItem('part')=="管理员"){
				this.$notify.error({
					title:'错误',
					message:'你没有此权限',
					duration:1000
				})
		}
		
	},
	// 编辑管理员信息
	handleEdit(index, row,id) {
		console.log(this.form)
		this.$axios.get('/api/changenamemanage',{
			
		params:{
			username:this.form.username,
			nickname:this.form.nickname,
			phone:this.form.phone,
			email:this.form.email,
			part:this.form.part,
			state:this.form.state,
			id:this.Edit.id,
		},
		
	}).then(res=>{
		console.log(res)
		if(res.data == "请填写相应的信息"){
			this.changeFormVisible = true,
			this.$message.error('用户信息不能为空');
		}else{
			this.changeFormVisible=false;
			 location.reload();
			 this.$message.error('用户信息添加成功');
}
	})
	},
	
	},
  created(){
  	this.getUser();
  },
	mounted(){
		this.del();
	}
}
</script>
<style>
	.el{width:200px}
	.add{margin:10px 0;}
</style>