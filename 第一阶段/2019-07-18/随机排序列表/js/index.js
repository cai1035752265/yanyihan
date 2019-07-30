(function(){
  var $btns = $('.nav a');
  var $lis = Array.from($('.wrap ul>li'));
  var $ul = $('ul')
  $btns[0].onclick = function(){
    var type = this.type;
    this.type = type == 'asc' ? 'desc' : 'asc';
    sort(type);
  }

  function sort(type) {
    $lis.sort(function(a, b){
      return type == 'asc' ? (a.id - b.id) : type == 'desc' ? (b.id - a.id) : (Math.random() - 0.5);
    })
    $lis.forEach(function(e){
      $ul.append(e);
    })
  }

  $btns[1].onclick = function(){
    sort('random');
  }
})()