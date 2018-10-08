// var mysql = require("mysql");
// //创建连接对象
// var conn = mysql.createConnection({
// 	"host":"localhost",
// 	"port":"3306",
// 	"user":"root",
// 	"password":"",
// 	"database":"gz1804"
// });
// //连接,mysql服务记得启动
// conn.connect();
// module.exports = conn;
var mysql = require("mysql");

//创建链接对象
var conn = mysql.createConnection({
    "host": "localhost",
    "port": "3306",
    "user": "root",
    "password":"",
    "database":"gz1804"
});

conn.connect();

module.exports = conn;
