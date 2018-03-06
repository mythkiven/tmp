var http = require('http'); //默认
var url = require('url'); //默认
var api = require('./route/api'); //api 路由处理
var static = require('./route/static'); //静态文件的处理

// 匹配静态文件夹路径的正则表达式，用于判定请求是否为静态文件请求
var staticExp = /\/public\/(img|css|js)\/[a-z]*\.(jpg|png|gif|css|js)/;

http.createServer((request, response) => {

	//解析路径
	var pathname = url.parse(request.url).pathname;
  	console.log("请求的路径名:"+pathname);

  	//GET:	http://localhost:3000/public/js/index.js
  	//POST:

  	if (staticExp.test(pathname)) {// 静态文件请求交由static处理
    	static.get(__dirname + pathname, response);
  	} 

  	else if (request.method == 'POST') {// 处理普通post请求
    	api.post(request, response);
  	} 

  	else {// 处理普通get请求
    	api.get(request, response);
  	}
}).listen(3001);

console.log('[Server Info] Start server at http://localhost:3001/');


// 以上是通用的API模板。