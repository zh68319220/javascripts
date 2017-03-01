// 闭包

var name = 'the window';

var obj = {
  name: 'the object',
  getNamefunc: function(){
    return function(){
      return this.name;
    }
  }
}

var obj2 = {
  name: 'the object',
  getNamefunc: function(){
    var that = this;
    return function(){
      return that.name;
    }
  }
}

alert(obj.getNamefunc()()); // 在全局环境中调用，this指向window
alert(obj2.getNamefunc()()); // 在全局环境中调用，that指向obj2

function foo(a){
  var n = 0;
  var count = function(){
    n+=a
    console.log(n);
  }
  return count;
}
var f = foo(1);
f();
f();