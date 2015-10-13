/**
 *usage:摇一摇获取一注彩票号，四个随机数
 **/
init();
var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;

function init() {
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        alert('not support mobile event');
    }
}

function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - last_update) > 100) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

        if (speed > SHAKE_THRESHOLD) {
            /* 随机一注的逻辑 */
            /* 假设一注彩票只需要选择4个号 (01~11) */
            /*clear active*/
            lottery.length = 0;
            $('#options>span').removeClass('active');
            var flag = {};
            for (var i = 0; i < 4; i++) {
                var randomNum = Math.floor(Math.random() * (11 - 1 + 1) + 1);
                //去重
                if (flag[randomNum] == null) {
                    //如果没有选中
                    lottery.push(randomNum);
                    $('#options>span:eq(' + (randomNum - 1) + ')').addClass('active');
                    //设置选中
                    flag[randomNum] = '1';
                } else {
                    //如果选中过
                    i--;
                }
                $('button[type="submit"]').removeAttr('disabled');
                //切换nav
                $('nav>ul>li').removeClass('active');
                $('nav>ul>li:eq(3)').addClass('active');
            }

            last_x = x;
            last_y = y;
            last_z = z;
        }
    }
}

/**
 *usage:彩票选号
 **/

var lottery = new Array(); //彩票选号
$(document).on('click', '#options>span', function() {
    $(this).toggleClass('active');
    //如果当前是active则加入栈，否则退出栈
    if ($(this).hasClass('active')) {
        lottery.push($(this).html());
    } else {
        lottery.pop();
    }

    var size = $('#options>span.active').size();
    //切换nav
    $('nav>ul>li').removeClass('active');
    if (size === 1) {
        $('nav>ul>li:eq(0)').addClass('active');
        //按钮置为disabled
        $('button[type="submit"]').attr('disabled', 'disabled');
    } else if (size === 2) {
        $('nav>ul>li:eq(1)').addClass('active');
        $('button[type="submit"]').removeAttr('disabled');
    } else if (size === 3) {
        $('nav>ul>li:eq(2)').addClass('active');
    } else if (size === 4) {
        $('nav>ul>li:eq(3)').addClass('active');
    } else {
        $('nav>ul>li:eq(0)').addClass('active');
    }
});

$(document).on('click', 'button[type="submit"]', function() {
    $.post('/submit', lottery, function() {
        alert('成功购买彩票' + lottery);
    }, 'json');
});

/**
 *usage:计算距离开奖的时间
 **/

//假定每天20:00是开奖时间
/* 计算距离开奖的时间 */
var computeTime = function() {
    var nowDate = new Date();
    var nowTime = nowDate.getHours() * 60 * 60 + nowDate.getMinutes() * 60 + nowDate.getSeconds(); //秒数
    var remainTime;
    if (nowDate.getHours() < 20) {
        remainTime = 20 * 60 * 60 - nowTime;
    } else {
        remainTime = 24 * 60 * 60 - nowTime + 20 * 60 * 60;
    }

    var hours = Math.floor((remainTime / 60) / 60);
    var minutes = Math.floor((remainTime - hours * 60 * 60) / 60);
    var seconds = remainTime - hours * 60 * 60 - minutes * 60;
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    var displayTime = hours + ':' + minutes + ':' + seconds;
    /*return displayTime;*/
    //更新时间
    $('#timeRemain > p > strong').html(displayTime);
};

setInterval(computeTime, 1000);

/**
 *usage:上滑下拉
 **/
function swipeUp() {
    //上滑->下拉
    $('p.pullDown').html('下拉历史开奖<i class="iconfont">&#xe609;</i>');
    //按钮上面的字修改
    $('footer > p').html('猜中任意三个开奖号码，单注奖<strong>26元</strong>，再加奖<strong>4元</strong>');
    $('#content').animate({
        top: $('nav').height() + 1
    });
    //清空
    $('#bonusPot').empty();
    $('nav>ul>li>a>i').css('visibility', 'visible');
}

function swipeDown() {

    $.ajax({
        type: 'GET',
        url: '/open',
        data: 'winning',
        cache: true,
        success: function(data) {
            var winning = data.winning;
            for (var i in winning) {
                var span = '<span>' + winning[i].openNum + '</span>';
                var p = '<p>' + span + winning[i].numbers + '</p>';
                $('#bonusPot').append(p);
            }
        }
    });

    //滚动到下面的部分
    var oWinTop;
    var oContentH = $('#content').height();
    $('#bonusPot').height(oContentH + 50);
    oWinTop = $(window).scrollTop();
    $(window).scrollTop(500);
    //选球部分下移
    $('#content').animate({
        top: '340px'
    });
    //下拉->上滑
    $('p.pullDown').html('上滑收起<i class="iconfont">&#xe61f;</i>');
    //按钮上面的字修改
    $('footer > p').html('至少选2个球，猜中任意2个，中13元');
    //显示刷新成功
    $('#tips').css('display', 'block');

    function tips() {
        $('#tips').fadeOut('fast');
    }

    setTimeout(tips, 1000);

    //去掉奖字
    $('nav>ul>li>a>i').css('visibility', 'hidden');

}



document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, false);
//touchstart事件
function touchSatrtFunc(evt) {
    try {

        var touch = evt.touches[0]; //获取第一个触点
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标
        //记录触点初始位置
        startX = x;
        startY = y;


    } catch (e) {
        alert('touchSatrtFunc：' + e.message);
    }
}

var x, y;
//touchmove事件，这个事件无法获取坐标
function touchMoveFunc(evt) {
    try {
        var touch = evt.touches[0]; //获取第一个触点
        x = Number(touch.pageX); //页面触点X坐标
        y = Number(touch.pageY); //页面触点Y坐标
    } catch (e) {
        alert('touchMoveFunc：' + e.message);
    }
}

//touchend事件
var orientation = 0; //标识当前方向
function touchEndFunc(evt) {
    try {
        //判断滑动方向 上下
        if ((y - startY > 100) && orientation === 0) {
            orientation = 1;
            swipeDown();
        } else if ((y - startY < -100) && orientation === 1) {
            orientation = 0;
            swipeUp();
        }
    } catch (e) {
        alert('touchEndFunc：' + e.message);
    }
}

//绑定事件
document.addEventListener('touchstart', touchSatrtFunc, false);
document.addEventListener('touchmove', touchMoveFunc, false);
document.addEventListener('touchend', touchEndFunc, false);

//判断是否支持触摸事件
function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        bindEvent(); //绑定事件
    } catch (e) {
        alert("不支持TouchEvent事件！" + e.message);
    }
}
