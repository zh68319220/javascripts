/**
 * js对象的克隆
 */

var oPerson={
  oName:"rookiebob",
  oAge:"18",
  oAddress:{
    province:"beijing"
  },
  ofavorite:[
    "swimming",
    {reading:"history book"}
  ],
  skill:function(){
    console.log("bob is coding");
  }
};

function _getClass(obj){
  return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
}

function clone(obj){
  if(_getClass(obj) !== 'Object'){
    return obj;
  }
  var result = {};
  for(var a in obj){
    var copy = obj[a];
    result[a] = _getClass(copy) === 'Object' ? clone(copy) : copy;
  }
  return result;
}

// test
var oCopy = clone(oPerson);
oCopy.oAddress.province = 1;
console.log(oPerson.oAddress.province); // beijing
