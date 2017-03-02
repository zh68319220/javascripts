// 解析url参数，保存为object
function getQueryString(url){
  url = Object.prototype.toString.call(url) === '[object String]' ? url : window.location.href;
  var search = url.substring(url.lastIndexOf('?') + 1),
  obj = {},
  reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function(rs, $1, $2){
    var key = decodeURIComponent($1);
    var value = decodeURIComponent($2);
    obj[key] = value;
    return rs;
  });
  return obj;
}
getQueryString(null);

// 构造url参数
function setQueryString(obj){
  obj = Object.prototype.toString.call(obj) === '[object Object]' ? obj : {};
  var res = "?";
  for(var i in obj){
    res += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]) + "&";
  }
  return res.substring(0, res.length - 1);
}
setQueryString({ie: "utf-8", f: "8", rsv_bp: "1", rsv_idx: "1", tn: "ba i du"});