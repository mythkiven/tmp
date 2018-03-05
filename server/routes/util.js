

var crypto = require('crypto');

module.exports = { 
	// 生成随机ID：
	guid: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
		    v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		}).toUpperCase();
	},

	// 用户密码加密
	md5: function(password){
		var md5 = crypto.createHash('md5');
		var salt = '(!%$88hs@gophs*)#sassb9';
		var newPwd = md5.update(password + salt).digest('hex');
		return newPwd;
	},

	// 返回鉴权ID
	getKey: function(){
		return 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE';
	}

};
