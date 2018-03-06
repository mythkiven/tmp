const http = require('http');

http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end(JSON.stringify({userName:'zhangsan'}));
}).listen(3389);

console.log('runing: http://localhost:3389/ => userName:zhangsan');