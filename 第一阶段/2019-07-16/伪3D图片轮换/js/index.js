(function(){
  var $prev = $("#prev");
  var $next = $("#next");
  var $imgs = $(".wrap img");
  var classList = [];
  for(let i = 0; i < $imgs.length; i++){
    classList[i] = $imgs[i].className;
  }
  $imgs[0].addEventListener('transitionend', handle, false);
  function handle(){
    $prev.className = 'canclick';
    $next.className = 'canclick';
  }
  $prev.onclick = function(){
    if($prev.className == ''){
      return
    }
    $prev.className = '';
    classList.push(classList.shift());
    change();
  }
  $next.onclick = function(){
    if($next.className == ''){
      return
    }
    $next.className = '';
    classList.unshift(classList.pop());
    change();
  }
  function change() {
    for(var i = 0; i < $imgs.length; i++){
      $imgs[i].className = classList[i];
    }
  }
})()
