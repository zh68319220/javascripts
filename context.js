/**
 * Created by yufengzhang210851 on 2016-12-30.
 * 上下文
 */
var myobject = {
  foo: 'bar',
  func: function () {
    var self = this;
    console.log('outer func : this.foo=' + this.foo);
    console.log('outer func : this.foo=' + self.foo);

    (function () {
      console.log('outer func : this.foo=' + this.foo);
      console.log('outer func : this.foo === window : ' + (this === window) );
      console.log('outer func : this.foo=' + self.foo);
    })();
  }
};

myobject.func();