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
