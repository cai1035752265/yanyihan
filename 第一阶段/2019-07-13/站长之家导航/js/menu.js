'use strict';
(function(){
  var $as = $('#nav li>a');
  var $float_layer = $('.float_layer');
  for(var i = 0;i < $as.length; i++){
    fn1($as[i]);
    fn2($float_layer[i]);
  }
  var time = 0;
  var time2 = 0;
  function fn1(_this){
    _this.onmouseover = function(){
      var $block_layer = $('.float_layer.block');
      $block_layer.length != 0 && $block_layer.classList.remove('block');
      this.nextElementSibling.classList.add('block');
      time != 0 && clearTimeout(time);
      time2 != 0 && clearTimeout(time2);
    }
    _this.onmouseout = function(){
      var $this = this;
      time = setTimeout(function(){
        $this.nextElementSibling.classList.remove('block');
      },2000);
    }
  }
  function fn2(_this){
    _this.onmouseover = function(){
      this.classList.add('block');
      time != 0 && clearTimeout(time);
      time2 != 0 && clearTimeout(time2);
    }
    _this.onmouseout = function(){
      var $this = this;
      time2 = setTimeout(function(){
        $this.classList.remove('block');
      },2000);
    }
  }
})()