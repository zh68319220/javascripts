/**
 * reg.js
 * 正则表达式
 */

/**
 * 验证方法
 * @param {RegExp} reg 正则表达式
 * @param {String} val 待验证值
 */
function validateFormat(reg, val){
  if(typeof val !== 'string' && typeof reg.test !== 'function') return false;
  return reg.test(val);
}

// 验证手机号
validateFormat(/^1[34578]\d{9}$/, '187000000001');

// 验证邮箱
validateFormat(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+[.][a-zA-Z0-9]+$/, '420866750@qq.com');

// 校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
validateFormat(/^[a-zA-Z]([a-zA-Z0-9_-]|[.]){4,19}$/, '1za');

//校验密码：只能输入6-20个字母、数字、下划线
validateFormat(/^[a-zA-Z0-9_-]{6,20}$/, '@za');

//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
validateFormat(/^[+]?[0-9-]+$/, '+9090-12321');

// compile
var patt=/^[+]?[0-9-]+$/;
patt.test('+9090-12321'); // true
patt=/^[a-zA-Z0-9_-]{6,20}$/;
patt.compile(patt);
patt.test('@za'); // false

// exec
var str = "Visit W3School, W3School is a place to study web technology.";
patt = new RegExp("W3School","g");
var result;

while ((result = patt.exec(str)) != null)  {
  document.write(result);
  document.write("<br />");
  document.write(patt.lastIndex);
  document.write("<br />");
}