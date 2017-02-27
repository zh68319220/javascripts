/*
localStorage sessionStorage Cookie
sessionStorage用于本地存储一个会话（session）中的数据，
这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。
而localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。
*/

sessionStorage.setItem('a', JSON.stringify({name: 'zyf'}));
eval( "var rs = " + sessionStorage.getItem('a') );
sessionStorage.a;
sessionStorage.removeItem("a");
sessionStorage.clear();

var value = "yf";
document.cookie = "name=" + value;
cookies = document.cookie.split(';');

function getCookie(key){
    for(var i = 0; i < cookies.length; i++){
        var ikey = cookies[i].split('=')[0],
        ivalue = cookies[i].split('=')[1];
        if(key == ikey){
            return ivalue;
        }
    }
    return null;
}

function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
}