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
