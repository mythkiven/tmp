

// 登录 URL: http://smart.mail.163.com/
// http://192.168.101.13:8083/static/h5/js/email/login-163.js


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
t(g("btn-submit"),"click", function(){
    var tt= document.getElementById('username').value
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
var s = document.createElement('style');
s.type = 'text/css';
s.innerHTML =".am-footer .f-left{display: none;}#forget{display: none;}";
document.body.appendChild(s);

















