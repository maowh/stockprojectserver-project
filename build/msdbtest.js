var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'dfl88!',
    port:'3306',
    database:'stock',
});

connection.connect();

var sql='select * from stock';

connection.query(sql,function(err,result){
    if(err){
        console.log('[select error]-',err.message);
        return;
    }

    console.log('----------------select--------------');
    console.log(result);
    console.log('-------------------------------------\n\n');
});
connection.end();


