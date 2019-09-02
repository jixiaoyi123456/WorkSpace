var CookieUtil = new Object();
/**
 * 作用：创建cookie的函数*/
CookieUtil.setCookie = new function (sName, sValue, oExpires, sPath, sDomain, bSecure) {
    var sCookie = sName + '=' + encodeURIComponent(sValue);
    if (oExpires){
        sCookie += "; expires = " + oExpires.toGMTString();
    }
    if (sPath){
        sCookie += '; path = ' + sPath;
    }
    if(sDomain){
        sCookie += "; domain =" + sDomain;
    }
    if (bSecure){
        sCookie += '; secure =' + bSecure;
    }
    document.cookie = sCookie;
}
/**
 * 作用：根据cookie名称获得cookie的值
 * @param sName
 *
 */
CookieUtil.getCookie = function (sName) {
    var sRE = '(?:; )?' + sName + '([^;]*)?';
    var oRE = new RegExp(sRE);
    if (oRE.test(document.cookie)){
        return decodeURIComponent(RegExp["$1"]);
    } else {
        return null;
    }
}
/**
 * 作用：删除cookie
 * @param sName
 * @param sPath
 * @param sDomain
 * 原理：将cookie失效的时间，设置成一个过去的值，就可以实现
 */
CookieUtil.deleteCookie = function (sName, sPath, sDomain) {
    CookieUtil.setCookie(sName, "", new Date(0), sPath, sDomain);
}

/***
 * 作用：让参数能够以合适的形式追加到URL的末尾
 * @param sURL
 * @param sParamName
 * @param sParamValue
 */
function addURLParam(sURL, sParamName, sParamValue) {
    sURL += (sURL.indexOf('?') == -1? "?": "&");
    sURL += encodeURIComponent(sParamName) + '=' + encodeURIComponent(sParamValue);
    return sURL;
}
function addPostParam(sParams, sParamName, sParamValue) {
    if (sParams.length > 0){
        sParams += "&";
    }
    return sParams + encodeURIComponent(sParamName) + '=' + encodeURIComponent(sParamValue);
}

/***
 * 作用：实现了XMLHTTPRequest的后台与服务器的交互行为
 */
var xmlhttp;
function loadXMLDoc(url) {
    xmlhttp = null;
    if (window.XMLHttpRequest){
        //浏览器版本为：IE5（或以上）、火狐、谷歌等
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //浏览器版本为：IE5 IE6
        xmlhttp = new  ActiveXObject('Microsoft.XMLhttp');
    }
    if (xmlhttp != null){
        xmlhttp.onreadystatechange = state_change;
        xmlhttp.open('GET', url, false);
        xmlhttp.send();
    }else {
        alert('your browser does not support XMLHTTP')
    }
}
function state_change() {
    if (xmlhttp.readyState == 4){
        if (xmlhttp.status == 200) {
            // 200 == 0k
            // code
        }
        else {
            alert('problem retrieving XML data;')
        }
    }
}


//创建解析器对象
//1. 微软的XML解析器来加载XML
//1.1 创建一个空的微软XML解析器
var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
//1.2 关闭异步加载功能，确保文档完全加载完成之前解析器不会继续执行脚本
xmlDoc.async = false;
//1.3 告知解析器加载名为XX.xml的XML文档
xmlDoc.load('XX.xml');

// 2. 其他浏览器中XML解析器
var xmlDoc = new document.implementation.createDocument("", "", null)
xmlDoc.async = false;
xmlDoc.load('XX.xml');
