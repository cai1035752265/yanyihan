(function(){
  var $minus = $('.minus');
  var $plus = $('.plus');
  for(var i = 0; i < $minus.length; i ++){
    minusClick(i);
    plusClick(i);
  }
  function minusClick(i){
    $minus[i].onclick = function(){
      var $num = this.nextElementSibling;
      var num = $num.innerHTML;
      num != 0 && (($num.innerHTML = parseInt(num) - 1) && calculateOne(this, $num.innerHTML));
    }
  }
  function plusClick(i){
    $plus[i].onclick = function(){
      var $num = this.previousElementSibling;
      var num = $num.innerHTML;
      $num.innerHTML = parseInt(num) + 1;
      calculateOne(this, $num.innerHTML);
    }
  }
  function calculateOne(_this,amount){
    var $listRight = _this.parentElement.nextElementSibling;
    var $price = $('.price', $listRight);
    var $count = $('.count', $listRight);
    $count.innerHTML = parseFloat($price.innerHTML) * parseInt(amount);
    calculateAll();
    getMax();
  }
  function calculateAll(){
    var $total_count = $('.total_count');
    var $total_price = $('.total_price');
    var $ns = $('.n');
    var $counts = $('.count');
    var total_count = 0;
    var total_price = 0;
    for(var i = 0; i < $ns.length; i ++){
      total_count += parseInt($ns[i].innerHTML);
      total_price += parseFloat($counts[i].innerHTML);
    }
    $total_count.innerHTML = total_count;
    $total_price.innerHTML = total_price;
  }
  function getMax(){
    var $count = $('.count');
    var $max = $('.max');
    var arr = [];
    for(var i = 0; i < $count.length; i ++){
      $count[i].innerHTML != '0' && arr.push(parseFloat($('.price',$count[i].parentElement).innerHTML));
    }
    $max.innerHTML = Math.max.apply(null,arr);
  }
})()