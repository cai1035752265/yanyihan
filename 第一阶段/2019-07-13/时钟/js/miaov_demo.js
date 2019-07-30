(function(){
  var $nums = $('.num');
  var $week = $('.num2');
  setInterval(clock, 1000);
  function clock(){
    var weeks = ['images/seven.png','images/one.png','images/two.png','images/three.png','images/four.png','images/five.png','images/six.png'];
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = add0(nowDate.getMonth() + 1);
    var day = add0(nowDate.getDate());
    var week = nowDate.getDay();
    var h = add0(nowDate.getHours());
    var m = add0(nowDate.getMinutes());
    var s = add0(nowDate.getSeconds());
    
    var fullTime = year + month + day + h + m + s;

    for(var i = 0; i < 14; i++){
      $nums[i].src = 'images/' + fullTime[i] +'.png';
    }
    $week.src = weeks[week];
  }
  clock();
  function add0(num){//一位补零
    return num < 10 ? '0' + num : '' + num;
  }
})();