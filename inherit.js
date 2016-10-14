/**
 * js继承
 */

function People(){
  this.kind = "human";
}
People.prototype.p = 1;

function Worker(name){
  People.apply(this, arguments);

  this.name = name;
}

Object.prototype.inherit = function(superClass){
  var F = new Function();
  F.prototype = superClass.prototype;
  this.prototype = new F();
};
Worker.inherit(People);

var worker = new Worker("yf");
worker.kind = "worker";
console.log("worker kind: " + worker.kind);

// 子类对父类原型上的变量无影响
Worker.prototype.p = 2;
console.log("Worker peo: " + Worker.prototype.p);
console.log("People peo: " + People.prototype.p);

delete Worker.prototype.p;
// 查找顺序 Worker.prototype.peo( 无 ) => new F().peo( 无 ) => F.prototype.peo( People.prototype.peo )
console.log("Worker peo: " + Worker.prototype.p);
