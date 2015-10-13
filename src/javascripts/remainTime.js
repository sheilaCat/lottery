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
