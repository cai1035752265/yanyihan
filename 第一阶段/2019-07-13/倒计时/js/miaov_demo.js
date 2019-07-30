'use strict';
(function(){
  var timestamp;
  var Interval;
  function countDown(){
    var $long_text = $('.long_text');
    var $texts = $('.text');
    var date = $long_text.value + '/' + $texts[0].value + '/' + $texts[1].value;
    var new_timestamp = parseInt(new Date(date).getTime()/1000);
    var cur_timestamp = parseInt(new Date().getTime()/1000);
    if(cur_timestamp > new_timestamp){
      alert('请输入当前之后的日期！');
    }else{
      timestamp = new_timestamp;
      clearInterval(Interval);
      $('.date',$('#target')).innerHTML = $long_text.value + '年' + $texts[0].value + '月' + $texts[1].value + '日';  
      calculate();
      useInterval();
    }
  }
  function useInterval(){
    Interval = setInterval(calculate, 1000);
  }
  function calculate(){    
    var cur_timestamp = parseInt(new Date().getTime()/1000);
    var time = timestamp - cur_timestamp;
    var s = time % 60;
    var all_m = (time - s) / 60;
    var m = all_m % 60;
    var all_h = (all_m - m) / 60;
    var h = all_h % 24;
    var d = (all_h - h) / 24;
    var $ps = $('p',$('#date'));
    var arr = [d, add0(h), add0(m), add0(s)];
    for(var i = 0;i < $ps.length; i++){
      $ps[i].innerHTML = arr[i];
    }
  }
  
  var $active = $('.active');
  $active.onclick = function(){
    countDown();
  }
})()