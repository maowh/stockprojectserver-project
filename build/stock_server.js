"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express"); //引入express来写服务器
var ws_1 = require("ws"); //引入websoctet服务器
var timers_1 = require("timers");
// import * as mysql from 'mssql';
var app = express();
//get方法处理get请求，第一个参数是请求的路径“/”为根路径
//第二个参数是服务器接收到请求后，服务器的处理方式
// app.get('/api/', (request, response) => response.send('这里是首页！'));
// app.get('/api/stocks', (request, response) => {
//     let result = stocks;
//     let params = request.query;
//     //如果有传过来的查询值
//     if (params.name) {
//         //indexOf可以用于判断值在数据中的位置,includes可以用于判断数据中是否存在该值
//         result = result.filter(item => item.name.indexOf(params.name) !== -1);
//     }
//     //把stocks数组转换为json格式的数据
//     response.json(stocks);
// });
// app.get('/api/stock/:id', (request, response) => {
//     //find对stocks数组进行循环，如果数组的id和请求的id相等返回相应的stock信息
//     response.json(stocks.find((stock) => stock.id == request.params.id));
// })
//通过监听8000端口来访问服务器
var server = app.listen(8000, 'localhost', function () {
    console.log('服务器已经启动，地址是http://localhost:8000');
});
//ws自动推送的服务器端设置
var subscriptions = new Set();
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (webstocket) {
    subscriptions.add(webstocket);
});
var messageCount = 0;
timers_1.setInterval(function () {
    subscriptions.forEach(function (ws) {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({ messageCount: messageCount++ }));
        }
        else {
            subscriptions.delete(ws);
        }
    });
}, 2000);
var Stock = /** @class */ (function () {
    function Stock(id, name, price, rating, desc, 
    //多选框，用数组来显示
    categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
exports.stocks = [
    new Stock(1, "第一只股票", 12, 3, "这是第一只股票", ["金融", "科技"]),
    new Stock(2, "第二只股票", 13, 2, "这是第二只股票", ["金融"]),
    new Stock(3, "第三只股票", 15, 5, "这是第三只股票", ["科技"]),
    new Stock(4, "第四只股票", 11, 4, "这是第四只股票", ["网络", "科技"]),
    new Stock(5, "第五只股票", 16, 2, "这是第五只股票", ["金融", "网络"]),
    new Stock(6, "第六只股票", 19, 3.5, "这是第六只股票", ["网络"]),
    new Stock(7, "第七只股票", 12, 3, "这是第七只股票", ["金融", "科技", "网络"]),
    new Stock(8, "第八只股票", 19, 2.5, "这是第八只股票", ["金融", "网络"]),
    new Stock(9, "第九只股票", 23, 1.5, "这是第九只股票", ["网络", "科技"]),
];
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dfl88!',
    port: '3306',
    database: 'stock',
});
connection.connect();
var sql = 'select * from stock';
app.get('/api/stocks', function (request, response) {
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[select error]-', err.message);
            return;
        }
        var resulta = result;
        var params = request.query;
        //如果有传过来的查询值
        if (params.name) {
            //indexOf可以用于判断值在数据中的位置,includes可以用于判断数据中是否存在该值
            resulta = resulta.filter(function (item) { return item.name.indexOf(params.name) !== -1; });
        }
        //把stocks数组转换为json格式的数据
        response.json(resulta);
    });
});
// connection.query(sql,function(err,result){
//     if(err){
//         console.log('[select error]-',err.message);
//         return;
//     }
//     console.log('----------------select--------------');
//     console.log(result);
//     console.log('-------------------------------------\n\n');
// });
// connection.end();
