//表盘
(function(){
    var $dlatticeListot = $('#lattice-list');
    var $hour = $('.hour');
    var $min = $('.min');
    var $sec = $('.sec');
    //生成刻度
    function creatScale(params) {
        var len = 12;//刻度总数
        var averageAngle = 360 / len;//平均角度
        var addHtml = '';
        for(let i = 0; i < 12; i++){
            addHtml += '<li class="lattice" style="transform:rotate(' + averageAngle * i + 'deg)"></li>';
        }
        $dlatticeListot.innerHTML = addHtml;
    }
    creatScale();
    //初始化表盘
    function initClockBox() {
        var date = new Date();
        var s = date.getSeconds();
        var m = date.getMinutes() + s / 60;
        var h = date.getHours() + m / 60;
        var sDeg = 360 / 60 * s;
        var mDeg = 360 / 60 * m;
        var hDeg = 360 / 12 * h;
        css($sec, "rotate", sDeg);
        css($min, "rotate", mDeg);
        css($hour, "rotate", hDeg);
    }
    initClockBox();
    //定时器
    setInterval(initClockBox,100);
})();

(function () {
    //日期展示
    var weeks = ['天','一','二','三','四','五','六'];
    var $now_ps = $('#now p');
    var $option = $('#option');
    var calendarType = 'day';//
    function dataToShow(date) {
        var Y = date.getFullYear();
        var M = date.getMonth() + 1;
        var D = date.getDate();
        var W = date.getDay();
        $now_ps[0].innerHTML = Y + '年' + M + '月' + D + '日';
        $option.innerHTML = Y + '年' + M + '月';
        $now_ps[1].innerHTML = '星期' + weeks[W];
    }
    var date = new Date();
    var nowY = date.getFullYear();
    var nowM = date.getMonth();
    var nowD = date.getDate();
    dataToShow(date);

    //初始化日历-day
    function initDCalendar($board, year, month) {
        var curDay = (year == nowY && month == nowM) ? nowD : null;
        var startWeek = new Date(year, month, 1).getDay();
        var prevDayCount = new Date(year, month, 0).getDate();
        var dayCount = new Date(year, month + 1, 0).getDate();
        var calendarTop = '<ul class="week"><li class="date-cell">日</li><li class="date-cell">一</li><li class="date-cell">二</li><li class="date-cell">三</li><li class="date-cell">四</li><li class="date-cell">五</li><li class="date-cell">六</li></ul>';
        var calendarBottom = '';
        var day = 1;
        var isNoCur = true;
        for(let i = 0; i < 42; i++){
            if(i == 0 && i < startWeek){
                day = prevDayCount - startWeek + 1;
            }
            if(i == startWeek){
                day = 1;
                isNoCur = false;
            }
            if(i > startWeek && day > dayCount){
                day = 1;
                isNoCur = true;
            }
            calendarBottom += '<li class="date-cell' + (isNoCur ? ' other-date' : '') + ((!isNoCur && curDay && day == curDay) ? ' active' : '') + '">' + day + '</li>';
            day++;
        }
        $board.innerHTML = calendarTop + '<ul class="date">' + calendarBottom + '</ul>';
    }
    initDCalendar($('.board'), nowY, nowM);

    //初始化月历-month
    function initMCalendar($board, year) {
        var curMonth = (year == nowY) ? nowM : null;
        var addHtml = '';
        for(let i = 0; i < 12; i++){
            addHtml += '<li class="month-cell' + ((curMonth && i == nowM) ? ' active' : '') + '">' + (i + 1) + '月</li>'
        }
        $board.innerHTML = '<ul class="month">' + addHtml + '</ul>';
    
        var $month_cells = $('.month-cell');
        $month_cells.forEach(element => {
            element.onclick = function(){
                curArr[1] = parseInt(this.innerHTML.substring(0,1)) - 1;
                changeCalendarType('maxin');
            }
        });
    }

    //初始化年历-year
    function initYCalendar($board, year) {
        var startYear = Math.floor(year / 10) * 10;
        var addHtml = '';
        for(let i = 0; i < 16; i++){
            if(i < 4){
                addHtml += '<li class="year-cell other-yaer">'+(startYear - 4 + i)+'</li>'; 
            } else if(i < 14){
                addHtml += '<li class="year-cell' + (startYear + i - 4 == nowY ? ' active' : '') + '">'+ (startYear + i - 4) +'</li>';
            } else {
                addHtml += '<li class="year-cell other-yaer">'+(startYear - 4 + i)+'</li>'; 
            }
        }
        $board.innerHTML = '<ul class="year">' + addHtml + '</ul>';
        var $year_cells = $('.year-cell');
        $year_cells.forEach(element => {
            element.onclick = function(){
                curArr[0] = parseInt(this.innerHTML);
                changeCalendarType('maxin');
            }
        });
    }

    var $prev_btn = $('#prev');
    var $next_btn = $('#next');
    var $main = $('#main');
    //年历/月历/日历切换
    $option.onclick = function(type){
        changeCalendarType('minax');
    }
    function changeCalendarType(type) {
        if(type == 'minax' && calendarType != 'year'){//切换日历=>月历=>年历
            $main.innerHTML = '<div class="toHide board"></div><div class="toShow board"></div>';
            var $board = $(".board");
            switch (calendarType) {
                case 'day':
                    calendarType = 'month';
                    initDCalendar($board[0], curArr[0],  curArr[1]);
                    initMCalendar($board[1], curArr[0]);
                    break;
                case 'month':
                    calendarType = 'year';
                    initMCalendar($board[0], curArr[0]);
                    initYCalendar($board[1], curArr[0]);
                    break;
            }
        }else if(type == 'maxin' && calendarType != 'day'){//切换年历=>月历=>日历
            $main.innerHTML = '<div class="toBlow board"></div><div class="toNarrow board"></div>';
            var $board = $(".board");
            switch (calendarType) {
                case 'month':
                    calendarType = 'day';
                    initMCalendar($board[0], curArr[0]);
                    initDCalendar($board[1], curArr[0],  curArr[1]);
                    break;
                case 'year':
                    calendarType = 'month';
                    initYCalendar($board[0], curArr[0]);
                    initMCalendar($board[1], curArr[0]);
                    break;
            }
        }
        changeOption();
    }
    // 上一个
    $prev_btn.onclick = function(){
        changeCalendar('prev');
    }
    // 下一个
    $next_btn.onclick = function(){
        changeCalendar('next');
    }

    var curArr = [nowY, nowM, nowD];

    function changeOption() {
        if(calendarType == 'day'){
            $option.innerHTML = curArr[0] + '年' + (curArr[1] + 1) + '月';
        }else if(calendarType == 'month'){
            $option.innerHTML = curArr[0] + '年';
        }else{
            var startYear = Math.floor(curArr[0]/10)*10;
            var endYear = startYear + 9;
            $option.innerHTML = startYear + '年 - ' + endYear + '年';
        }
    }

    function changeCalendar(type) {
        if(type == 'prev'){
            $main.innerHTML = '<div class="bottomOut board"></div><div class="board toBottom"></div>';
            var $board = $(".board");
            switch (calendarType) {
                case 'day':
                    initDCalendar($board[0], curArr[0], curArr[1]);
                    curArr[1]--;
                    curArr[1] < 0 && curArr[0]-- && (curArr[1] = 11);
                    initDCalendar($board[1], curArr[0], curArr[1]);
                    break;
                case 'month':
                    initMCalendar($board[0], curArr[0]);
                    curArr[0]--;
                    initMCalendar($board[1], curArr[0]);
                    break;
                case 'year':
                    initYCalendar($board[0], curArr[0]);
                    curArr[0] -= 10;
                    initYCalendar($board[1], curArr[0]);
                    var startYear = Math.floor(nowYear/10)*10;
                    var endYear = startYear + 9;
                    $option.innerHTML = startYear + '年 - ' + endYear + '年';
                    break;
            
                default:
                    break;
            }
        }else{
            main.innerHTML = '<div class="topOut board"></div><div class="board toTop"></div>';
            var $board = $(".board");
            switch (calendarType) {
                case 'day':
                    initDCalendar($board[0], curArr[0], curArr[1]);
                    curArr[1]++;
                    curArr[1] > 11 && curArr[0]++ && (curArr[1] = 1);
                    initDCalendar($board[1], curArr[0], curArr[1]);
                    $option.innerHTML = curArr[0] + '年' + (curArr[1] + 1) + '月';
                    break;
                case 'month':
                    initMCalendar($board[0], curArr[0]);
                    curArr[0]++;
                    initMCalendar($board[1], curArr[0]);
                    $option.innerHTML = curArr[0] + '年';
                    break;
                case 'year':
                    initYCalendar($board[0], curArr[0]);
                    curArr[0] += 10;
                    initYCalendar($board[1], curArr[0]);
                    break;
            
                default:
                    break;
            }
        }
        changeOption();
    }
})();