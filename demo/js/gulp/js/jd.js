
//登录 URL: https://passport.jd.com/new/login.aspx?ReturnUrl=https://trade.jr.jd.com/centre/browse.action
// https://api.limuzhengxin.com/static/h5/js/jd/login-jd.js", "https://api.limuzhengxin.com/static/h5/js/jd/login-jd-v1.js

// <a href="javascript:;" class="btn-img btn-entry" id="loginsubmit" tabindex="6" clstag="pageclick|keycount|201607144|3">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
//<input placeholder="邮箱/用户名/已验证手机" style="..; font-size: 14px; font-family: &quot;microsoft yahei&quot;;">

//  下边是...
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
t(g("loginsubmit"),"click", function(){
    var tt= document.getElementById('loginname').value
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
function setDisplay(obj) {
    obj.style.display = 'none';
}
var oFooter = document.getElementById('footer-2013');
setDisplay(oFooter);
var oKbCoagent = document.getElementById('kbCoagent');
setDisplay(oKbCoagent);
var oQlink = document.getElementsByClassName('q-link')[0];
setDisplay(oQlink);
var oDiv = document.getElementById('content');
oDiv.style.position = 'relative';
var oLoginWrap = oDiv.getElementsByClassName('login-wrap')[0];
oLoginWrap.style.position = 'relative';
var oLoginBanne = oDiv.getElementsByClassName('login-banner')[0];
setDisplay(oLoginBanne);
var oLoginForm = oDiv.getElementsByClassName('login-form')[0];
oLoginForm.style.position = 'absolute';
oLoginForm.style.top = '20px';
oLoginForm.style.left = '50%';
oLoginForm.style.marginLeft = '-173px';
var oLoginTabL = oLoginForm.getElementsByClassName('login-tab-l')[0];
setDisplay(oLoginTabL);
var oLoginBtn1 = oLoginTabL.getElementsByTagName('a')[0];
oLoginBtn1.className = '';
var oLoginTabR = oLoginForm.getElementsByClassName('login-tab-r')[0];
oLoginTabR.style.width = '100%';
var oLoginBtn = oLoginTabR.getElementsByTagName('a')[0];
oLoginBtn.className = 'checked';
var oLoginBox = oLoginForm.getElementsByClassName('login-box')[0];
oLoginBox.style.display = 'block';
oLoginBox.style.visibility = 'visible';
var oQrcodeLogin = oLoginForm.getElementsByClassName('qrcode-login')[0];
setDisplay(oQrcodeLogin);
oQrcodeLogin.style.visibility = 'hidden';
var oEntry = document.getElementById('entry');
oEntry.style.visibility = 'visible';
var oSafe = oLoginForm.getElementsByClassName('safe')[0];
setDisplay(oSafe);
var oFormlogin = document.getElementById('formlogin');
var aClearBtn = oFormlogin.getElementsByClassName('clear-btn');
for (var i = 0; i < aClearBtn.length; i++) {
    aClearBtn[i].style.opacity = '0';
    aClearBtn[i].style.filter = 'alpha(opacity:0)';
};
var oLoginname = document.getElementById('loginname');
var oLoginname1 = document.createElement('input');
oLoginname1.placeholder = '邮箱/用户名/已验证手机';
oLoginname1.style.position = 'absolute';
oLoginname1.style.width = '254px';
oLoginname1.style.height = '18px';
oLoginname1.style.left = '0px';
oLoginname1.style.top = '0px';
oLoginname1.style.border = 'none';
oLoginname1.style.padding = '10px 0 10px 50px';
oLoginname1.style.fontSize = '14px';
oLoginname1.style.fontFamily = 'microsoft yahei';
oLoginname1.style.border = 'none';
var oItemFore1 = oFormlogin.getElementsByClassName('item-fore1')[0];
oItemFore1.appendChild(oLoginname1);
oLoginname1.oninput = function() {
    oLoginname.value = this.value;
};

















