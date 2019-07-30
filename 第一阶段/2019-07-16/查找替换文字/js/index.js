(function(){
  var $changeBtn = $('#open>a');
  var $menus = $('#open>ul');
  var $searchs = $('.search');
  var $replaces= $('.replace');
  var $reset= $('.reset');
  var $search = $('#search');
  var $replace= $('#replace');
  var $fun= $('#fun');
  var $searchBtn = $('#search>.button');
  var $replaceBtn = $('#replace>.button');
  var $replaceBtn = $('#replace>.button');
  var $content = $('#content');
  var oldHtml = $content.innerHTML;
  $changeBtn.onclick = function(){
    $menus.style.display = $menus.style.display == 'none' ? 'block' : 'none';
    this.innerHTML = this.innerHTML == '展开' ? '收起' : '展开';
  }
  for(let i = 0; i < 2; i++){
    $searchs[i].onclick = showSearch;
    $replaces[i].onclick = showReplace;
  }
  $reset.onclick = function(){
    $content.innerHTML = oldHtml;
  }
  function showSearch(){
    $fun.style.display = 'block';
    $search.style.display = 'block';
    $replace.style.display = 'none';
  }
  function showReplace(){
    $fun.style.display = 'block';
    $search.style.display = 'none';
    $replace.style.display = 'block';
  }
  $searchBtn.onclick = function(){
    var value = $('#search>.input').value;
    if(value == ''){
      alert('搜索内容不能为空');
    }else{
      $content.innerHTML = oldHtml.split(value).join('<span>' + value + '</span>');
    }
  }
  $replaceBtn.onclick = function(){
    var oldStr = $('#replace>.input')[0].value;
    var newStr = $('#replace>.input')[1].value;
    if(oldStr == ''){
      alert('需替换内容不能为空');
    }else{
      $content.innerHTML = $content.innerHTML.split(oldStr).join(newStr);
    }
  }
})()