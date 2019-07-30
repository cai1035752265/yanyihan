function $(str, $parent) {
  return $parent ? $parent.querySelectorAll(str) : document.querySelectorAll(str);
}
function getStyle(el,attr){
    return el.currentStyle?el.currentStyle[attr]:getComputedStyle(el)[attr];
}