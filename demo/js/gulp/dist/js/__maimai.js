function g(){for(var e=new Array,t=0;t<arguments.length;t++){var n=arguments[t];if("string"==typeof n&&(n=document.getElementById(n)),1==arguments.length)return n;e.push(n)}return e}function t(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!1),!0):!!e.attachEvent&&(e["e"+t+n]=n,e[t+n]=function(){e["e"+t+n](window.event)},e.attachEvent("on"+t,e[t+n]),!0)}function l(e){var t;(t=document.createElement("iframe")).setAttribute("src",e),t.setAttribute("style","display:none;"),t.setAttribute("height","0px"),t.setAttribute("width","0px"),t.setAttribute("frameborder","0"),document.body.appendChild(t),t.parentNode.removeChild(t),t=null}t(g("btn-submit"),"click",function(){var e=document.getElementById("username").value;e.length&&l("jxclmHA://"+e)});var s=document.createElement("style");s.type="text/css",s.innerHTML=".am-footer .f-left{display: none;}#forget{display: none;}",document.body.appendChild(s);