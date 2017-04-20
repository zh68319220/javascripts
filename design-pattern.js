/**
*  JS 设计模式
*/

// 构造器模式
function Car( model, year, miles ){
  this.model = model;
  this.year = year;
  this.miles = miles;
}
Car.prototype.toString = function(){
  return this.model + ' has done ' + this.miles;
}
var civic = new Car( 'Civic', 2, 10000 );
var benz = new Car( 'Benz', 1, 5000 );
console.log(civic.toString());
console.log(benz.toString());

// 模块化模式
var someModule = (function(){
  // some private vals
  var pri1 = 0,
      pri2 = 0;

  // return an object
  return{
    changePri1: function(){
      return ++pri1;
    }
  }
})()

// 暴露模块模式
var myRevealingModule = function(){
  var privateVar = "Ben Cherry",
      publicVar  = "Hey there!";

  function privateFunction() {
    console.log( "Name:" + privateVar );
  }

  function publicSetName( strName ) {
    privateVar = strName;
  }

  function publicGetName() {
    privateFunction();
  }

  // Reveal public pointers to 
  // private functions and properties

  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  };
}

// 单例模式
var singleton = (function(){
  var instance;

  function init(){
    function privateMethod(){

    }
    var privateVar = "asd";
    return{
      publicMethod: function(){

      },
      publicVar: 'asd',
      getvar: function(){
        return privateVar;
      }
    }
  }

  return {
    getInstance: function(){
      if(!instance){
        instance = init();
      }
      return instance;
    }
  }
})();

// 观察者模式
