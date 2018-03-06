
入口类：app.js
路由分发类: routes/routes.js 
所有的请求处理逻辑都在：routes/services/ 目录下


运行: node app.js


待改进：
	增加XSS过滤，防止恶意表单
	增加鉴权认证，保证数据接口安全
	增加日志，记录用户登录使用情况
	增加返回结果条数控制等。





//user API            
//获取用户信息          
app.post('/user/get', this.getUser);          
//创建用户        
app.post('/user/create', this.addUser);     
//登录     
app.post('/user/login/token', this.loginByToken);      
//更新密码     
app.post('/user/password/update', this.updatePassword);       
//删除用户       
app.post('/user/delete', this.deleteUser);       
//message API        
//获取公告       
app.post('/message/get', this.getMessage);       
