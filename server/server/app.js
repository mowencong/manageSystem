var fs = require("fs");
let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
app.use(cookieParser());

let session = require("express-session");
app.use(session({"secret":"wy"}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
let captcha = require("./modules/captcha.js");
var encode = require("./modules/md5.js");
let con = require("./modules/conn.js");

//所有的代码必须执行的代码
app.all("*",function(req,res,next){
    // res.writeHead(200,{
    //     'Content-Type':'text/html;charset=utf-8',
    //     'Access-Control-Allow-Credentials':'true',
    //     'Access-Control-Allow-Origin':'http://10.3.137.16'
    // });

    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.setHeader('Access-Control-Allow-Credentials','true');
    res.hasHeader('Access-Control-Allow-Origin','http://10.3.137.16');
    next();
});

//获取验证码
// app.post("/getcode",function(req,res){
//     var svg = captcha.getCode(req,res);
//     res.end(svg);
// });

// app.get("/124",function(req,res){
    
//     res.end("你好");
// });
//识别验证码是否一致
// app.post("/chkcode",function(req,res){
//     if(req.body.code == req.session.captcha){
//         res.end("相同");
//     }else{
//         res.end("不同");
//     }
// });

//用户登录
app.get("/login",function(req,res){
    
    var strname = req.query.username;
    var strpass = req.query.password;
    
    if(strname!='' && strpass!=''){
        var sql = "select * from userlist where username = '"+strname+"' and password = '"+strpass+"'";
        con.query(sql,function(err,result){
            if(result.length == 0){
                res.end('登录失败');
            }else{
                console.log(result)
                var r = {
                    "id":result[0].id,
                    "text":"登陆成功",
                    "ad":result[0].角色,
                    "nina":result[0].nickname,
                    "email":result[0].邮箱,
                    "phone":result[0].手机,
                    "remark":result[0].remark,
					"imgurl":result[0].photo,
                }
                res.end(JSON.stringify(r));
                console.log(JSON.stringify(r))
            }
        })
    }
    // res.end(strname)
});

//进入商品管理
app.get('/goodsfenlei',function(req,res){
    var sql = "select * from goodslist";
        con.query(sql,function(err,result){
            // console.log(666);
            // console.log(JSON.stringify(result));
            if(result.length == 0){
                res.end('登录失败');
            }else{
                // console.log(result.length)
                // var r = {
                //     "state":"1",
                //     "total":result.length,
                //     "data" :result
                // }
                res.end(JSON.stringify(result));
            }
        })
        // res.end(result);
});

//进入商品分类
app.get('/gofenlei',function(req,res){
    
    var sql = "select * from classify";
        con.query(sql,function(err,result){
            // console.log(666);
            // console.log(JSON.stringify(result));
            if(result.length == 0){
                res.end('登录失败');
            }else{
                // console.log(result.length)
                // var r = {
                //     "state":"1",
                //     "total":result.length,
                //     "data" :result
                // }
                res.end(JSON.stringify(result));
            }
        })
        // res.end(result);
});
//添加分类
app.get('/addclass',function(req,res){

    let fenlei = req.query.fenlei;
    console.log(fenlei);
    
    if(fenlei != ''){
        let sql = "select * from classify";
        con.query(sql,function(err,result){
            let arr = JSON.parse(JSON.stringify(result));
            for(var i=0;i<arr.length;i++){
                if(arr[i].商品分类 == fenlei){
                    res.end('该分类以存在');
                    return;
                }
            };
            let sql = "insert into classify ( 商品分类) values ('"+fenlei+"')";
            con.query(sql,function(err,result){
                if(result != undefined){
                    res.end(JSON.stringify(result));
                }else{
                    res.end("添加失败");
                }
                // console.log(result.);
                
            });
        });
    }else{
        res.end("请输入商品信息");
    }
});
//商品分类修改
app.get('/modclass',function(req,res){
    let fenlei = req.query.fenlei;
    
    let id = req.query.id;
    console.log(id,fenlei)
    if(fenlei != ''){
        let sql = "update classify set 商品分类='"+fenlei+"' where id='"+ id +"'";
        con.query(sql,function(err,result){
            console.log(result);
            res.end('修改成功');
        }); 
    }else{
        res.end('请输入修改内容');
    }
});
//
//删除分类单个
app.get('/delclassify',function(req,res){
    
    let str = req.query.id;
    console.log(str);
    let sql = "delete from classify where id='"+str+"'";
    con.query(sql,function(err,result){
        res.end('删除成功');
    });
    // res.end("删除成功");
});

//商品的添加
app.get('/addgoods',function(req,res){

    let fenlei = req.query.fenlei;
    let mingcheng = req.query.name;
    let price = req.query.price;
    let state = req.query.state;
    console.log(fenlei,mingcheng,price,state)
    if(fenlei != '' && mingcheng != '' && price != '' && state != ''){
        let sql = "insert into goodslist ( 商品分类,商品名称,价格,发布状态) values ('"+fenlei+"', '"+mingcheng+"','"+price+"','"+state+"')"
        con.query(sql,function(err,result){
            if(result != undefined){
                res.end("添加成功");
            }else{
                res.end("添加失败");
            }
            // console.log(result.);
            
        });
    }else{
        res.end("请输入商品信息");
    }
});

//删除选定的商品
app.get('/delselgoods',function(req,res){
    console.log(req.query);
    let str = req.query.id;
    // let arr = [];
    let arr = str.split(',');
    let sql
    console.log(arr);
    arr.forEach(item => {
        console.log(item);
        sql = "delete from goodslist where id='"+item+"'";
        con.query(sql,function(err,result){
        
        // console.log(result.affectedRows)
        res.end('删除成功');
    });
    // res.end("删除成功");

    });
});

//删除商品单个
app.get('/delgoods',function(req,res){
    let rem = req.query.id;
    // console.log(rem);
    let sql = "delete from goodslist where id='"+rem+"'";
    con.query(sql,function(err,result){
        if(result != undefined){
            res.end("删除成功");
        }else{
            res.end("删除失败");
        }
        // console.log(result.affectedRows)
        // res.end('删除成功');
    })
});

//修改商品
app.get('/modgoods',function(req,res){
    let fenlei = req.query.fenlei;
    let mingcheng = req.query.name;
    let price = req.query.price;
    let state = req.query.state;
    let id = req.query.id;
    console.log(id,fenlei,mingcheng,price,state)
    if(fenlei != undefined && mingcheng != undefined && price != undefined && state != undefined){
        let sql = "update goodslist set 商品分类='"+fenlei+"',商品名称='"+mingcheng+"',价格='"+price+"',发布状态='"+state+"' where id='"+ id +"'";
        con.query(sql,function(err,result){
            console.log(result);
            res.end('修改成功');
        }); 
    }else{
        res.end('请输入修改内容');
    }
});

//修改密码
app.get('/change',function(req,res){
    let pwd = req.query.password;
    let id = req.query.id;
    console.log(pwd,id);
    if(pwd !=undefined && id !=undefined){
        let sql = "update userlist set password='"+ pwd +"' where id='"+ id +"'";
        con.query(sql,function(err,result){
            // console.log(result);
            res.end('修改成功');
        });
    }else{
        res.end('请输入密码');
    }
});

//修改用户信息
app.get('/changename',function(req,res){
    let nicknames = req.query.nickname;
    let male = req.query.male;
    let phone = req.query.phone;
    let email = req.query.email;
    let remarks = req.query.remark;
    let ids = req.query.id;
    console.log(ids,nicknames,male,phone,email,remarks);
    // let remark = req.query.remark;
    if(nicknames !=undefined && ids !=undefined && male !=undefined && phone !=undefined && email !=undefined&& remarks !=undefined){
        let sql = "update userlist set nickname = '"+ nicknames +"',手机 = '"+ phone +"',邮箱 = '"+ email +"',remark = '"+ remarks +"' where id = '"+ ids +"'";
        con.query(sql,function(err,result){
            // console.log(result);
            if(result != ''){
                res.end('修改成功');
            }else{
                res.end('修改失败');
            }
        });
    }else{
        res.end('请填写相应的信息');
    }
});

//查询用户表那所有数据
app.get('/getuser',function(req,res){
    // let id = req.query.id;
    // console.log(id);
    // var sql = "select * from userlist where id='"+ id +"'";
    var sql = "select * from userlist";
        con.query(sql,function(err,result){
            // console.log(666);
            // console.log(result);
            if(result.length == 0){
                res.end('没有此用户');
            }else{
                // console.log(result.length)
                // var r = {
                //     "state":"1",
                //     "total":result.length,
                //     "data" :result
                // }
                res.end(JSON.stringify(result));
            }
        })
});

//添加用户
app.get('/adduser',function(req,res){

    let username = req.query.username;
    let password = req.query.password;
    let phone = req.query.phone;
    let email = req.query.email;
    let state = req.query.state;
    let part = req.query.part;
    let nickname = req.query.nickname;
    console.log(username,password,phone,state,email,part,nickname)
    if(username != '' && password != '' && phone != '' && state != ''&& email != ''&& part != ''&& nickname != ''){
        let sql = "insert into userlist ( username,password,手机,审核状态,邮箱,角色,nickname,) values ('"+username+"', '"+password+"','"+phone+"','"+state+"','"+email+"','"+part+"','"+nickname+"')";
        con.query(sql,function(err,result){
            if(result != undefined){
                res.end("添加成功");
            }else{
                res.end("添加失败");
            }
            // console.log(result.);
            
        });
    }else{
        res.end("请输入用户信息");
    }
});

//用户管理修改
app.get('/changenamemanage',function(req,res){
    let username = req.query.username;
    let nickname = req.query.nickname;
    let phone = req.query.phone;
    let email = req.query.email;
    let part = req.query.part;
    let state = req.query.state;
    let id = req.query.id;
    console.log(id,username,nickname,phone,email,part,state);
    let remark = req.query.remark;
    if(nickname !='' && id !='' && part !='' && phone !='' && email !=''&& state !=''){
        let sql = "update userlist set username = '"+ username +"',nickname = '"+ nickname +"',手机 = '"+ phone +"',邮箱 = '"+ email +"',角色 = '"+ part +"' ,审核状态 = '"+ state +"' where id = '"+ id +"'";
        con.query(sql,function(err,result){
            // console.log(result);
            if(result != ''){
                res.end('修改成功');
            }else{
                res.end('修改失败');
            }
        });
    }else{
        res.end('请填写相应的信息');
    }
});

//用户管理删除单个
app.get('/delnamemanage',function(req,res){
    let rem = req.query.id;
    // console.log(rem);
    let sql = "delete from userlist where id='"+rem+"'";
    con.query(sql,function(err,result){
        if(result != ''){
            res.end("删除成功");
        }else{
            res.end("删除失败");
        }
    })
});



//精确查询商品根据商品名称和分类
app.get('/selectgoods',function(req,res){
    let fenlei = req.query.goodsfenlei;
    let mingcheng = req.query.goodsname;
    console.log(fenlei,mingcheng)
    var sql = "select * from goodslist where 商品分类='"+fenlei+"' or 商品名称='"+mingcheng+"'";
        con.query(sql,function(err,result){
            // console.log(result);
            if(result.length == 0){
                res.end('查询失败');
            }else{
                // console.log(result.length)
                // var r = {
                //     "state":"1",
                //     "total":result.length,
                //     "data" :result
                // }
                res.end(JSON.stringify(result));
            }
        })
});

//精确查询用户信息
app.get('/selectuser',function(req,res){
    let username = req.query.username;
    let phone = req.query.phone;
    let email = req.query.email;
    let part = req.query.part;
    console.log(username,phone,email,part)
    var sql = "select * from userlist where username='"+username+"' or 手机='"+phone+"' or 邮箱='"+email+"' or 角色='"+part+"'";
        con.query(sql,function(err,result){
            console.log(result);
            res.end(JSON.stringify(result));
            // }
        })
});


//分页
app.get("/getArtical",function(req,res){
    // res.end(over);
    var page = req.query.page;
    // console.log(req.query);
    var count = req.query.count;
    console.log(page,count);

    var start = (page - 1)*count;

    var sql1 = "select * from goodslist";
    con.query(sql1,function(err,result){
        // console.log(result);

        let a = Math.ceil(result.length/count);
        let b = result.length
        var sql = "select * from goodslist limit "+start+","+count+"";
        con.query(sql,function(err,result){
            // console.log(result);
            let r = {
                "yeshu":a,
                "tiaoshu":b,
                "data":result
            }
            res.end(JSON.stringify(r));
        })  
    }) 
});

//文件上传

var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });  // 保存路径


app.post("/chk", upload.single('img1'), function(req, res){
    // res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    // let img = req.body.image;
    console.log(req.body);	// 文本域
	console.log(req.file);	// 上传文件	
	var arr = req.file.originalname.split(".");
	var ext = arr[arr.length-1];	// 上传文件的扩展名
	var newFile = req.file.path+"."+ext;
    fs.renameSync(req.file.path, newFile); //改名
    console.log(req.file)

    let sql ="update userlist set photo='"+newFile+"' where id=12";

    con.query(sql,(err,result)=>{
        console.log(result);
    })

});
// app.post('/chk', upload.single('img1'), function (req, res) {
// 	// res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
// 	console.log(req.body);	// 文本域
// 	console.log(req.file);	// 上传文件	
// 	fs.renameSync(req.file.path, __dirname+"/uploads/"+req.file.originalname); //改名
// 	res.end('上传演示');
// });

// app.get('/chk', function (req, res) {
// 	res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
// 	console.log(req.query);
// 	res.end(JSON.stringify(req.query));
// }) 
app.listen(8081);