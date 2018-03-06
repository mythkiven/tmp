
var fs = require("fs");

// 加载 ./routes/services/ 目录下所有的模块！
// 并调用init方法
module.exports = function(app){
	// console.log('222');
	var FS_PATH_SERVICES = "./routes/services/";
	var REQUIRE_PATH_SERVICES = "./services/";

	fs.readdir(FS_PATH_SERVICES,function(err,list){
		if(err){
			throw '没有在此目录下找到文件:./routes/services/'
		}
		for (var e; list.length&&(e=list.shift()); ) {
			if (e === ".DS_Store") { 
			}else{
				var services = require(REQUIRE_PATH_SERVICES+e);
				services.init && services.init(app);
			} 
		}
	});
};