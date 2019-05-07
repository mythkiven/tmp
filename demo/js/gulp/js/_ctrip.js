
// 登录       https://accounts.ctrip.com/H5Login/Index
// JS        https://api.limuzhengxin.com/static/h5/js/ctrip/login-ctrip.js

// <button class="g_btn_s nofastclick" id="btnLogin">登录</button>
// <input maxlength="30" type="text" class="nofastclick" placeholder="国内手机号/用户名/邮箱/卡号" id="txtUserName_login">


// 下边是...
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
t(g("btnLogin"),"click", function(){
    var tt= document.getElementById('txtUserName_login').value
    if(tt.length){ // 判空
        l("jxclmHA://"+tt);
    }

});


// 下边是 iframe的 JS
function l(url) {
                var iFrame;
                iFrame = document.createElement("iframe");
                iFrame.setAttribute("src", url);
                iFrame.setAttribute("style", "display:none;");
                iFrame.setAttribute("height", "0px");
                iFrame.setAttribute("width", "0px");
                iFrame.setAttribute("frameborder", "0");
                document.body.appendChild(iFrame);
                iFrame.parentNode.removeChild(iFrame);
                iFrame = null;
}



// 下边是修改样式的 JS
var scriptXC = document.createElement('style');
scriptXC.type = 'text/css';
scriptXC.innerHTML ="#headDiv_login{display:none;}#thirdLogin{display:none;}#btnQuestion_login{display:none;}#icon_back_intl{display:none;}#question_intl{display:none;}";
document.body.appendChild(scriptXC);














