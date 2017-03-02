/*
  总结 js 一些兼容性写法
*/ 

//-------------事件绑定与解绑的兼容做法------------//
var EventListener = {
  addEvent : function(ele, tp, fn, capture){
    var capture = capture || false;
    if(ele.addEventListener){
      ele.addEventListener(tp, fn, capture);
    }
    else if(ele.attachEvent){ // ie 678 中没有addEventListener
      ele.attachEvent("on" + tp, fn);
    }
    else{
      ele["on" + tp] = fn;
    }
  },
  removeEvent : function(ele, tp, fn, capture){
    var capture = capture || false;
    if(ele.removeEventListener){
      ele.removeEventListener(tp, fn, capture);
    }
    else if(ele.detachEvent){
      ele.detachEvent("on" + tp, fn);
    }
    else{
      ele["on" + tp] = null;
    }
  }
};
var body = document.body;
function onBodyClick(e){
  var e = e || window.event; // ie9 以下的attachEvent中event在window中
  var target = e.target || e.srcElement; // window.event中无target有srcElement
  alert(target);
}
// EventListener.addEvent(body, "click", onBodyClick);
// EventListener.removeEvent(body, "click", onBodyClick);

/*
currentStyle 和 getComputedStyle
element.style //只能获取内嵌样式 
element.currentStyle //IE浏览器获取非内嵌样式 
window.getComputedStyle(element,伪类) //非IE浏览器获取非内嵌样式 
*/
function getStyle(ele, attr){
  if( ele.style[attr] !== "" ) return ele.style[attr];
  if(ele.currentStyle){ // ie
    return ele.currentStyle[attr];
  }else{ // chrome firefox
    return window.getComputedStyle(ele, null)[attr];
  }
}
getStyle(body, "width");

//-------------事件绑定与解绑的兼容做法------------//
var top = document.documentElement.scrollTop || document.body.scrollTop;

//-------------使用 firstChild,lastChild 等，获取第一个/最后一个元素节点--------------//
var oUl=document.getElementById('ul');
if(oUl.firstElementChild){
  //高版本浏览器
  oUl.firstElementChild.style.background='red';
}else{
  //IE6-8
  oUl.firstChild.style.background='red';
}