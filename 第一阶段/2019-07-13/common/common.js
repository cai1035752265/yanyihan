function $(str, $parent) {
  var ele = $parent ? $parent.querySelectorAll(str) : document.querySelectorAll(str);
  return ele.length == 1 ? ele[0] : ele;
}
function getStyle(el,attr){
    return el.currentStyle?el.currentStyle[attr]:getComputedStyle(el)[attr];
}
function add0(num, digits){
  num += '';
  !digits && (digits = 2);
  digits = parseInt(digits);
  if(num.length < digits){
    for(var i = 0;i < (digits - num.length); i++){
      num = '0' + num;
    }
  }
  return num;
}