(function(){
  var $count = $('.count');
  var $input = $('.input');
  var $output = $('.output');
  var $btn = $('.btn');
  var $lis = $("ul li");
  var $ul = $("ul");
  var time = 0;
  $count.innerHTML = '0/' + $input.value.length;
  $btn.onclick = function(){
    var index = 0;
    $ul.style.opacity = 1;
    if(time){
      return
    }
    var oldHtml = $input.value;
    if(oldHtml.length == 0){
      alert('左侧输入框不能为空！');
      return
    }
    time = setInterval(function(){
      index++;
      $('.active').classList.remove("active");
      $lis[index%$lis.length].classList.add("active");
      $input.value = oldHtml.substring(index);
      $output.innerHTML = oldHtml.substr(0, index);
      $count.innerHTML = (index) + '/' + oldHtml.length;
      if(index >= oldHtml.length){
        clearInterval(time);
        $ul.style.opacity = 0;
        time = 0;
      }
    },20)
  }
})()