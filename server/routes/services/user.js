var fs = require('fs');
var util = require('./../util');
var USER_PATH = './database/user.json';

var User = {
	// 设计接口路由
	init: function(app){
		app.post('/user/get', this.getUser);    // 获取用户信息
	    app.post('/user/create', this.addUser); // 创建用户
	    app.post('/user/login', this.login);    // 登录
	    app.post('/user/login/token', this.loginByToken);       // token 
	    app.post('/user/password/update', this.updatePassword); // 更新密码
	    app.post('/user/delete', this.deleteUser);// 删除用户
	},

	/////////// 接下来实现上述的6个用户类的函数： ////////
	// 
	// 获取用户信息，req 需要传入鉴权KEY+部门，方可查询数据。
	getUser: function(req,res){
		var key = req.param('key');
		var partment = req.param('partment');
		if(key !== util.getKey()){ // 判断鉴权 KEY 是否一致
			return res.send({
				status:0,
				data:'使用了不合法的鉴权KEY'
			});
		}
		fs.readFile(USER_PATH,function(err,data){
			if(!err){
				try{
					var obj = JSON.parse(data);
					var newObj = [];
					for(var i in obj){
						if(obj[i].partment === partment){ // 匹配到用户
							delete obj[i]['password']; //返回不带密码的用户信息
							newObj.push(obj[i]);
						}
					}
					return res.send({
						status: 1,
						data: newObj
					});
				}catch(e){
					return res.send({
						status:0,
						err:e
					});
				}
			}
			return res.send({
				status:0,
				err:err
			});
		});
	},

	// 添加用户
	// 注册成功的同时，将用户信息返回
	addUser: function(req,res){
		var username = req.param('username');
		var password = util.md5(req.param('password'));
	    var tel = req.param('tel');
	    var email = req.param('email');
	    var partment =  req.param('partment');
	    var tag = req.param('tag');
	    var creater = req.param('creater') || '';
	    // 判断用户的参数是否齐全
	    if(!username || !password || !tel || !email || !partment || !tag){
	    	return res.send({
		        status: 0,
		        data: '缺少必要参数'
	    	});
	    }

	    // 不能使用相同的邮箱注册两个用户
	    var content = JSON.parse(fs.readFileSync(USER_PATH).toString()); 
	    for(var i in content){  
	    	if(content[i].email === email){ 
	    		console.log('邮箱:'+email+'已经被用户名为:'+content[i].username+'的用户注册过,不能二次注册');
	    		return res.send({
		        	status: 0,
		        	data:'邮箱:'+email+'已经被用户名为:'+content[i].username+'的用户注册过,不能二次注册'
	    		});
	    	}
	    }

	    // 将用户信息写入文件:
	    try{
	     	var content = JSON.parse(fs.readFileSync(USER_PATH));
	     	var obj = {
	        	"userid": util.guid(),
		        "username": username,
		        "password": password,
		        "partment": partment,
		        "tel": tel,
		        "email": email,
		        "tag": tag,
		        "creater": creater,
		        "time": new Date(),
		        "token": ''
	     	};
	     	content.push(obj);
	     	//更新文件
	     	fs.writeFileSync(USER_PATH, JSON.stringify(content));
	     	delete obj.password;
	    	return res.send({ //返回创建的结果
	        	status: 1,
	        	data: obj
	    	});
	    }catch(e){
	     	return res.send({
	        	status: 0,
	        	err: e
	    	});
	    } 
	},

	// 用户登录
	// 邮箱+密码登录+设备ID
	// 登录成功同时创建token,写入库，并返回给用户。
	// 登录成功时，将用户信息返回
	login: function(req,res){
		var email = req.param('email');
	    var password = util.md5(req.param('password'));
	    var deviceId = req.param('deviceId');
	    var token = util.guid() + deviceId; // 创建token
	    var content = JSON.parse(fs.readFileSync(USER_PATH).toString()); 

	    // 单例模式，一处登录，其他的设备都下线。其他的token都清除掉。
	    // 登录时，如果系统已经有了token。就将token置0.
	    for(var i in content){
	    	//验证通过,已有的token 置为空
	    	if(content[i].email === email && content[i].password === password){
	    		if(content[i].token){ 
	    			if(content[i].token.length>0){
	    				content[i].token ='';
	    			}
      			}
	    	}
        	
    	}


	    // console.log(password);
	    for(var i in content){ 
	     	//验证通过
	    	if(content[i].email === email && content[i].password === password){
	        	content[i]['token'] = token; // 写入token 
	        	// console.log('::'+content[i]);
	        	fs.writeFileSync(USER_PATH, JSON.stringify(content));
	        	//删除密码
	        	delete content[i].password;
	        	return res.send({
	            	status: 1,
	            	data: content[i]
	        	});
	      	}
	    }
	    return res.send({
	      status: 0,
	      data:'用户名或者密码错误'
	    });
	},

	// 通过token登录
	// 同时将用户信息返回
  	loginByToken: function(req, res){
    	var token = req.param('token');
    	var content = JSON.parse(fs.readFileSync(USER_PATH)); 
    	for(var i in content){
        	if(token === content[i].token){
        		delete content[i].password;
        		return res.send({
          			status:1,
          			data: content[i]
        		});
      		}
    	}
    	return res.send({
      		status: 0,
      		info: 'token失效'
    	});
  	},

  	// 用户修改密码
  	// 传token+新旧密码
  	updatePassword: function(req, res){
    	var token = req.param('token');
    	var oldPassword = util.md5(req.param('oldPassword'));
    	var password = util.md5(req.param('password'));
    	var content = JSON.parse(fs.readFileSync(USER_PATH));
    	for(var i in content){
      		if(token === content[i].token && oldPassword === content[i].password){
        		content[i].password = password;
        		//写入到文件中
        		fs.writeFileSync(USER_PATH, JSON.stringify(content));
        		console.log('更新成功');
        		return res.send({
          			status: 1,
          			data: '更新成功'
        		});
      		}
    	}
    	console.log('更新失败，没有找到该用户或者初始密码错误');
    	return res.send({
      		status: 0,
      		data: '更新失败，没有找到该用户或者初始密码错误'
    	});
  	},

  	//删除用户
  	deleteUser: function(req, res) {
    	var token = req.param('token');
    	var email = req.param('email');
    	var content = JSON.parse(fs.readFileSync(USER_PATH));
    	var delAll = req.param('delAll')?req.param('delAll'):'false'; // true 就全部删除
    	var del = [];
    	if (delAll === 'true') { console.log('delAll=true,匹配就全部删除');  
    		 for (var j in content) {
				if (content[j].email === email) {
          			del.push(content[j]);
            		content.splice(j, 1);
            		//写入到文件中
            		fs.writeFileSync(USER_PATH, JSON.stringify(content)); 
          		} 
    		}
  		} else{console.log('delAll!=true,邮箱和token双匹配就才删除');  
  			for (var i in content) {
    			if(token === content[i].token ){ 
		        	for (var j in content) {
		          		if (content[j].email === email) {
		          			del.push(content[j]);
		            		content.splice(j, 1);
		            		//写入到文件中
		            		fs.writeFileSync(USER_PATH, JSON.stringify(content)); 
		          		} 
		        	}
    			}
    		}
  			
  		}
    	
    	if (del === null ){ 
    		console.log('删除失败，没有找到该用户或者用户鉴权错误');
    		return res.send({
      			status: 0,
      			info: content,
      			data: '删除失败，没有找到该用户或者用户鉴权错误'
    		});
    	}else  if(del.length===0) { 
    		console.log('删除失败，没有找到该用户或者用户鉴权错误');
    		return res.send({
      			status: 0,
      			info: content,
      			data: '删除失败，没有找到该用户或者用户鉴权错误'
    		});
    	}else  if(del.length>0) {
    		console.log('成功删除'+del.length+'个数据,数据为:'+del.join(' ; '));
    		return res.send({
      			status: 1,
      			info: content,
      			data: '成功删除'+del.length+'个数据,数据为:'+del.join(' ; '),
    		});
    	}
    	console.log('删除失败');
    	return res.send({
      		status: 0,
      		info:'',
      		data: '删除失败，没有找到该用户或者用户鉴权错误'
    	});
  	}
};

module.exports = User;