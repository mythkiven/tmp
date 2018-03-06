var fs = require('fs');
var path = require('path');

// 

var MIME = {};
MIME[".css"] = "text/css";
MIME[".js"] = "text/js";
MIME[".jpg"] = "image/jpeg";
MIME[".jpeg"] = "image/jpeg";
MIME[".png"] = "image/png";
MIME[".gif"] = "image/gif";

function get(pathname, response) {
  if (fs.existsSync(pathname)) { // 判断请求文件路径是否存在
    var extname = path.extname(pathname); // 获取后缀
    response.writeHead(200, {'Content-Type': MIME[extname]}); // 写入响应的请求头
    fs.readFile(pathname, (err, data) => { // 写入响应的静态文件
      if (err) {
        console.log(err);
        response.end();
      } else {
        if (isImage(extname)) {
          response.end(data, "binary");// 二进制文件需要加上binary
        } else {
          response.end(data.toString());
        }
      }
    });
  }
}

// 根据拓展名判断是否为图片
function isImage(extname) {
  if (extname === '.jpg' || extname === '.jpeg' ||
    extname === '.png' || extname === '.gif') {
    return true;
  }
  return false;
}

// 提供给其他模块使用的接口
module.exports = {
  get: get
};