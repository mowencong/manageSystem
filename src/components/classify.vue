<template>
	<div>
	<el-breadcrumb separator="/">
	  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
	  <el-breadcrumb-item :to="{path:'/manage'}">商品管理</el-breadcrumb-item>
	  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
	</el-breadcrumb>
	<el-row class="add">
		<el-button type="primary" class="add" @click="dialogFormVisible = true">添加</el-button>
			<!-- 添加商品按钮弹出框 -->
					<el-dialog title="添加商品分类" :visible.sync="dialogFormVisible">
						<el-form v-model="fenlei">
							<el-form-item label="商品分类" :label-width="formLabelWidth">
								<!-- <el-input v-model="form.fenlei" autocomplete="off"></el-input>
								</el-select> -->
								<el-select v-model="fenlei" clearable placeholder="请选择">
									<el-option
										v-for="item in options"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
			<!-- 				<el-form-item label="商品信息不能为空,请输入商品信息" :label-width="LabelWidth" class="red">
							</el-form-item> -->
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="addfenlei(),dialogFormVisible = false">确 定</el-button>
						</div>
					</el-dialog>
		</el-row>
	<el-table class="fenlei"
    :data="tabs"
    style="width: 100%">
	<el-table-column
      type="index"
      width="50"
			>
    </el-table-column>
    <el-table-column
	  prop="id"
      label="ID"
	  sortable
      width="120">
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="商品分类"
      label="商品分类"
      width="120">
    </el-table-column>
		<el-table-column

			width="120">
		</el-table-column>
		<el-table-column

			width="120">
		</el-table-column>
		<el-table-column
			width="120">
		</el-table-column>
		<el-table-column
			width="120">
		</el-table-column>
		<el-table-column
			width="120">
		</el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button class="cap"
          size="mini"
          @click="readin(scope.$index, scope.row),dialogEditVisible = true"><i class="el-icon-edit"></i>编辑</el-button>
					<!-- 添加商品按钮弹出框 -->
							<el-dialog title="添加商品分类" :visible.sync="dialogEditVisible">
								<el-form v-model="fenlei">
									<el-form-item label="商品分类" :label-width="formLabelWidth">
										<!-- <el-input v-model="form.fenlei" autocomplete="off"></el-input>
										</el-select> -->
										<el-select v-model="fenlei" clearable placeholder="请选择">
											<el-option
												v-for="item in options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
					<!-- 				<el-form-item label="商品信息不能为空,请输入商品信息" :label-width="LabelWidth" class="red">
									</el-form-item> -->
								</el-form>
								<div slot="footer" class="dialog-footer">
									<el-button @click="dialogEditVisible = false">取 消</el-button>
									<el-button type="primary" @click="handleEdit(scope.$index, scope.row),dialogEditVisible = false">确 定</el-button>
								</div>
							</el-dialog>
					
					
					
					
					
					
        <el-button class="cap"
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
	</div>
</template>
<script>
	export default {
    data() {
      return {
		tabs:[],
		wor:{
			id:''
		},
		options: [{
			value: '美食',
			label: '美食'
		}, {
			value: '电影',
			label: '电影'
		}, {
			value: '新闻',
			label: '新闻'
		}, {
			value: '娱乐',
			label: '娱乐'
		}, 
		{
			value: '零食',
			label: '零食'
		},
		{
			value: '教育',
			label: '教育'
		},
		{
			value: '服装',
			label: '服装'
		},
		{
			value: '家用',
			label: '家用'
		},
		{
			value: '洗浴',
			label: '洗浴'
		},
		{
			value: '选项10',
			label: '包包'
		},
		{
			value: '鞋子',
			label: '鞋子'
		},
		{
			value: '电器',
			label: '电器'
		},
		{
			value: '腌制品',
			label: '腌制品'
		},
		{
			value: '艺术品',
			label: '艺术品'
		},
		{
			value: '乐器',
			label: '乐器'
		}
		],
		dialogFormVisible: false,
		dialogEditVisible:false,
		fenlei:'',
		formLabelWidth:'120px',
      }
			
    },
    methods: {
			//写入信息
			readin(index, row,id){
				console.log(row);
				this.wor.id = row.id;
			},
			// 编辑商品信息
      handleEdit(index, row) {
        console.log(index, row);
				console.log(row)
				this.$axios.get('/api/modclass',{
					
					params:{
						fenlei:this.fenlei,
						id:this.wor.id,
					}
				}).then(res=>{
					if(res.data == "修改成功"){
						location.reload();
					}
				})
      },
     // 删除商品分类信息
     handleDelete(index, row,id) {
     	console.log(row);
     this.$axios.get('/api/delclassify?id='+row.id).then(res=>{
     	if(res.data == "删除成功"){
     		
     	}
     });
     		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
     	confirmButtonText: '确定',
     	cancelButtonText: '取消',
     	type: 'warning',
     	center: true
     }).then(() => {
     	this.$message({
     		type: 'success',
     		message: '删除成功!',
				
     	});
			location.reload();
     }).catch(() => {
     	this.$message({
     		type: 'info',
     		message: '已取消删除'
     	});
     });
     },
	  getItem(){
		  this.$axios.get('/api/gofenlei').then(res=>{
			  let data = res
				this.tabs.push(...data.data);
			  })
	  },
		// 添加商品分类
		addfenlei(){
			this.$axios.get('api/addclass?fenlei='+this.fenlei).then(res=>{
				console.log(res)
				location.reload();
			})
		},
	
    },
		created(){
			this.getItem();
		}
  }
</script>
<style scoped>
	.add{
		margin-top:10px;
	}
	.fenlei{
		margin-top:10px;
	}
	.cell{
		position: absolute;
		right:50px;
	}
</style>