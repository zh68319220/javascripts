/**
 * js 使用xmlHttp实现ajax请求
 */

( function( global, factory ){
  "use strict";
  if( typeof module === "object" && typeof module.exports === "object" ){
    module.exports = factory( global );
  } else {
    factory( global );
  }
} )( typeof window !== undefined ? window : this, function(window){
  "use strict";
  var Ajax = function(options){
    if(!options){
      return
    }
    var url = options.url || "",
        type = options.type || "GET",
        data = options.data || null,
        asynchronous = options.asynchronous || true,
        success = options.success || function(){},
        fail = options.fail || function(){};

    var xhr = null;
    if(window.XMLHttpRequest){
      xhr = new window.XMLHttpRequest();
    }
    else if(window.ActiveXObject){
      xhr = new window.ActiveXObject();
    }
    else{
      throw new Error("Your browser does not support XMLHTTP");
    }

    var stateChange = function(){
      if(xhr.readyState == 4){
        if(xhr.status == 200){
          var json = {};
          eval("json = " + xhr.responseText);
          success(json);
        }else{
          fail(xhr.status);
        }
      }else{
        fail(-1);
      }
    };

    if(xhr != null && url != ""){
      xhr.onreadystatechange = stateChange;
      xhr.open(type, url, asynchronous);
      xhr.send(JSON.stringify(data));
    }
  };

  window._ajax = Ajax;

  return Ajax;
});

// test
// _ajax({
//   url: "https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc&per_page=1",
//   type: "POST",
//   data: {a:1},
//   success: function(data){
//     console.log(data);
//   },
//   fail: function(status){
//     console.log(status);
//   }
// });
// _ajax({
//   url: "https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc&per_page=1",
//   type: "GET",
//   success: function(data){
//     console.log(data);
//   },
//   fail: function(status){
//     console.log(status);
//   }
// });
// _ajax({
//   url: "https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc&per_page=1",
//   type: "GET",
//   success: function(data){
//     console.log(data);
//   }
// });
