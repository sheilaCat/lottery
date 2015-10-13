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
