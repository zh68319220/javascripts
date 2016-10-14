/**
 * js 函数节流
 */

// 以最后一次调用+delay为间隔执行fn
function throttle(fn, delay){
  return function(){
    var _args = arguments;
    clearTimeout(fn.tId);
    fn.tId = setTimeout(function(){
      fn.apply(this, _args);
    }, delay);
  };
}

// 调用期间以delay为间隔执行fn
function throttle2(fn, delay){
  return function(){
    var _args = arguments;
    if(fn.tId == null){
      clearTimeout(fn.tId);
      fn.tId = setTimeout(function(){
        fn.apply(this, _args);
        fn.tId = null;
      }, delay);
    }
  };
}

// test
// window.onresize = throttle(function(){
//   console.log(arguments);
// }, 500);
//
// window.onresize = throttle2(function(){
//   console.log(arguments);
// }, 1000);