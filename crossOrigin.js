/**
 * js跨域
 */

// jsonp (服务器端需要支持jsonp)
function _jsonp(url, callback) {
  var script = document.createElement("script");
  if(window._jsonpCallback) return;
  window._jsonpCallback = callback;
  script.src = url + "?callback=_jsonpCallback";
  document.getElementsByTagName('head')[0].appendChild(script);
}

// test
// _jsonp("https://api.github.com", function (result){
//   console.log(result);
// });


// CORS
function createCORSRequest(method, url){
  var xhr = new XMLHttpRequest();
  if("withCredentials" in xhr){
    // XMLHTTPRequest2 的属性
    xhr.open(method, url, true);
  }else if(typeof XDomainRequest != "undefined"){
    xhr = new XDomainRequest();
    xhr.open(method, url);
  }else{
    xhr = null
  }
  return xhr;
}

// test
// var corsXhr = createCORSRequest("GET", "url");
// if(corsXhr != null){
//   corsXhr.onload = function(a) {
//     console.log(a);
//   };
//   corsXhr.send();
// }
