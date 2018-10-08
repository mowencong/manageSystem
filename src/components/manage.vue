<template>
	<div>
		<!-- 商品管理头部 -->
    <el-row class="demo-autocomplete">
	
  <!-- <el-col :span="12">
	  <span class="sub-title" style="color:#000;font-size:20px">关键字</span>
    <el-autocomplete
      class="inline-input"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </el-col> -->
	<!-- 关键字 -->
	<span class="sub-title" style="color:#000;font-size:20px">关键字</span>
	<!-- <el-select
    v-model="value9"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入商品名称"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in states"
      :key="item.id"
      :label="item.商品名称"
      :value="item.商品名称">
    </el-option>
  </el-select> -->
		<el-input
			placeholder="请输入商品名称"
			v-model="value9"
			clearable class="el">
		</el-input>
	<!-- 商品分类 -->
  <span class="sub-title" style="color:#000;font-size:20px">商品分类</span>
  <el-select v-model="value" placeholder="请选择">
	  
      <el-option
        v-for="item in states"
        :key="item.id"
        :label="item.商品分类"
        :value="item.商品分类">
      </el-option>
    </el-select>
		<!-- 搜索按钮 -->
	<el-button type="primary" icon="el-icon-search" @click = "getSelect">搜索</el-button>
	
</el-row>
<!-- 添加商品按钮 -->
<el-row class="add">
	<el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
	<!-- 添加商品按钮弹出框 -->
		<el-dialog title="添加商品" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="商品名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品分类" :label-width="formLabelWidth">
					<!-- <el-input v-model="form.fenlei" autocomplete="off"></el-input>
					</el-select> -->
					<el-select v-model="form.fenlei" clearable placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="价格" :label-width="formLabelWidth">
					<el-input v-model="form.price" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="发布状态" :label-width="formLabelWidth">
					<el-select v-model="form.state" placeholder="请选择发布状态">
					<el-option label="待发布" value="待发布"></el-option>
					<el-option label="发布" value="发布"></el-option>
					</el-select>
				</el-form-item>
<!-- 				<el-form-item label="商品信息不能为空,请输入商品信息" :label-width="LabelWidth" class="red">
				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="add()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 删除按钮 -->
	<el-button type="danger" @click="getDelect">删除</el-button>
	</el-row>
	<!-- 商品数据详情 -->
	 <el-table class="list"
    ref="multipleTable"
    :data="tableData3"
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
      prop="商品分类"
      label="商品分类"
      width="100">
    </el-table-column>
    <el-table-column
      prop="商品名称"
      label="商品名称"
      show-overflow-tooltip>
    </el-table-column>
	<el-table-column
	prop="价格"
	label="价格"
	show-overflow-tooltip>
	</el-table-column>
	<el-table-column
	prop="time"
	label="上传时间"
	sortable
	show-overflow-tooltip>
	</el-table-column>
	<el-table-column
	prop="发布状态"
	label="发布状态"
	show-overflow-tooltip>
	</el-table-column>
	<!-- 编辑删除 -->
	<el-table-column label="操作">
      <template slot-scope="scope">
				<!-- <el-popover
					placement="top"
					width="160"
					v-model="visible2"
					>
					<p>这是一段内容这是一段内容确定删除吗？</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text"  @click="visible2 = false">取消</el-button>
						<el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
					</div>
					<el-button slot="reference" >删除</el-button>
				</el-popover> -->
        <el-button
          size="mini"
          @click="dialogEditVisible = true,readin(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
					<!-- 弹框修改商品信息 -->
					<el-dialog title="编辑商品" :visible.sync="dialogEditVisible">
						<el-form :model="form">
									<el-form-item label="商品名称" :label-width="formLabelWidth">
										<el-input v-model="form.name" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item label="商品分类" :label-width="formLabelWidth">
										<!-- <el-input v-model="form.fenlei" autocomplete="off"></el-input>
										</el-select> -->
										<el-select v-model="form.fenlei" clearable placeholder="请选择">
											<el-option
												v-for="item in options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="价格" :label-width="formLabelWidth">
										<el-input v-model="form.price" autocomplete="off"></el-input>
									</el-form-item>
									<el-form-item label="发布状态" :label-width="formLabelWidth">
										<el-select v-model="form.state" placeholder="请选择发布状态">
										<el-option label="上架" value="待发布"></el-option>
										<el-option label="下架" value="下架"></el-option>
										</el-select>
									</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="handleEdit(scope.$index, scope.row),dialogEditVisible = false">确 定</el-button>
						</div>
					</el-dialog>
					
					
					
					
					
					
					
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
	<!-- 数据分页操作 -->
   <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tiaoshu">
    </el-pagination>
  </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				wor:{
					id:''
					
				},
				// restaurants:[],
				// state2:'',
				selects:[],
				yeshu:'',
				count:'',
				tiaoshu:'',
				pageSize:[5,10,15,20],
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
					value: '包包',
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
        form: {
          name: '',
          fenlei:'',
					price:'',
					state:'',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
				LabelWidth:'300px',
				visible2:false,
				states:[
					{商品分类:'美食',商品名称:'舌尖上的中国第一季'},
					{商品分类:'电影',商品名称:'舌尖上的中国第二季'},
					{商品分类:'新闻',商品名称:'舌尖上的中国第三季'},
					{商品分类:'娱乐',商品名称:'舌尖上的中国第四季'},
					{商品分类:'零食',商品名称:'诸葛亮骂王朗'},
					{商品分类:'服装',商品名称:'新时代特色中国梦'},
					{商品分类:'包包',商品名称:'新时代特色中国梦'},
					{商品分类:'乐器',商品名称:'皇马大战飞利浦'},
					{商品分类:'艺术品',商品名称:'舌尖上的中国第三季'},
					{商品分类:'腌制品',商品名称:'舌尖上的中国第三季'},
				],
				value:'',
				tableData3: [],
				list: [],
				loading: false,
				value9:'',
				multipleSelection: [],
				currentPage4: 1,
					};
		},
		methods:{
			// 搜索方法
			getSelect(){
				this.$axios.get('/api/selectgoods',{
					params:{
						goodsname:this.value9,
						goodsfenlei:this.value
					}
				}).then(res=>{
					if(res.data != "查询失败"){
						console.log(res)
						this.tableData3 = [];
						this.tableData3.push(...res.data);
					}
					else{
						this.$notify.error({
							title:'错误',
							message:'商品名称不存在',
							duration:1000
						})
					}
					
				})
				this.value = '',
				this.value9 = ''
			},
			// 选中删除
			getDelect(){
				this.$axios.get('api/delselgoods?id='+this.selects).then(res=>{
					if(res.data == "删除成功"){
						location.reload();
					}
					
				});
				
			},
			// 关键字搜索商品名称
			remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.tableData3 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.tableData3 = [];
        }
      },
			// 添加商品信息
			 add() {
				 this.$axios.get('/api/addgoods',{
					 params:{
						 name:this.form.name,
						 fenlei:this.form.fenlei,
						 price:this.form.price,
						 state:this.form.state
					 }
				 }).then(res=>{
					 console.log(666);
					 console.log(res);
					 if(res.data == "请输入商品信息"){
					 	this.dialogFormVisible=true;
						this.$message.error('商品信息不能为空');
					 }else{
						 this.dialogFormVisible=false;
						 location.reload();
						 this.$message.error('商品添加成功');
						 location.reload();
					 }
				 })
				 this.form.name = '',
				 this.form.fenlei = '',
				 this.form.price = '',
				 this.form.state = ''
         console.log(6666)
      },
			// 请求获取数据
			getList(){
				this.$axios.get('/api/goodsfenlei').then(res=>{
					console.log(666)
					this.tiaoshu = res.data.length;
					console.log(this.tiaoshu)
					let data = res;
					console.log(data);
					data.data.forEach(item=>{
						item.time = new Date(item.time).toLocaleDateString();
					})
					this.tableData3.push(...data.data);
					this.restaurants.push(...data.data);
					
					let time = this.tableData3.time().toLocaleString()
				})
			},
			// 页数条数
			handleSizeChange(val) {
				this.count = val
				this.$axios.get('/api/getArtical',{
					params:{
						page:this.currentPage4,
						count:val
					}
				}).then(res=>{
					console.log(res)
						this.tableData3 = [],
						this.tableData3.push(...res.data.data);
// 						for(var i = 1; i < res.data.yeshu;i++){
// 							this.yeshu.push(i);
// 						}
						this.yeshu = res.data.yeshu;
						this.tiaoshu = res.data.tiaoshu;
				})
				console.log(val);
			  },
				//点击当前页获取数据
			  handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.$axios.get('/api/getArtical',{
					params:{
						page:val,
						count:this.count
					}
				}).then(res=>{
					console.log(res);
					this.tableData3 = [],
					this.tableData3.push(...res.data.data);
				})
			},
			//分页操作
// 			changeSize(){
// 				this.$axios.get('/api/getArtical',{
// 					params:{
// 						currentpage:this.currentPage4,
// 						
// 					}
// 				})
// 			},
			// 多选框
			toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
			  });
			} else {
			  this.$refs.multipleTable.clearSelection();
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
			//写入信息
			readin(index, row,id){
				console.log(row);
				this.wor.id = row.id;
			},
	// 	   formatter(row, column) {
	//         return row.address;
	//       },
			// 编辑商品信息
		  handleEdit(index, row,id) {
			console.log(row)
			this.$axios.get('/api/modgoods',{
				
				params:{
					name:this.form.name,
					fenlei:this.form.fenlei,
					price:this.form.price,
					state:this.form.state,
					id:this.wor.id,
				}
			}).then(res=>{
				if(res.data == "修改成功"){
					location.reload();
				}
			})
		  },
			//
			// 删除单个商品信息
		  handleDelete(index, row,id) {
				console.log(row);
			this.$axios.get('/api/delgoods?id='+row.id).then(res=>{
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
					message: '删除成功!'
				});
				location.reload();
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		  },
		},
		// 创建之后获取数据渲染页面
		created(){
		this.getList();
		
	},
	mounted() {
			this.list = this.tableData3.map(item => {
				return { value: item, label: item };
			});
    }
	}
</script>
<style>
	.add{margin-top:20px;}
	.demo-autocomplete{
		height: 60px;
		line-height: 30px;
		border-bottom:1px solid #ccc;
	}
	.list{
		margin-top:20px;
	}
	input{
		height:30px;
		width:300px;
	}
	p{
		font-size:16px;
	}
	.red label{color:red;}
	.el{width:200px}
</style>
