// JavaScript Document
window.onload = function() {

    var canvas = Raphael("pane", 0, 0, 500, 500);
    //表盘
    canvas.circle(200, 150, 107).attr("stroke-width", 2).attr("fill", "#ffffff");

    canvas.circle(200, 150, 100).attr("stroke-width", 2).attr("fill", "#ebebeb");
    canvas.circle(200, 150, 3).attr("fill", "#000");

    var angleplus = 360,
        rad = Math.PI / 180,
        cx = 200,
        cy = 150,
        r = 90,
        startangle = -90,
        angle = 30,//每隔30度一个刻度，对应小时
        x, y, endangle;

    for (i = 1; i < 13; i++) {
    	//计算每一点的位置
        endangle = startangle + angle;
        x = cx + r * Math.cos(endangle * rad);
        y = cy + r * Math.sin(endangle * rad);
        //写入表盘
        canvas.text(x, y, i + "");
        startangle = endangle;
    }
    //默认从0点开始，秒，分，时
    var hand = canvas.path("M200 70L200 150").attr("stroke-width", 1);
    var minute_hand = canvas.path("M200 100L200 150").attr("stroke-width", 2);
    var hour_hand = canvas.path("M200 110L200 150").attr("stroke-width", 3);

    var time = new Date();

    angle = time.getSeconds() * 6; // 1秒走过的度数6度

    minute_hand.rotate(6 * time.getMinutes(), 200, 150);

    var hr = time.getHours();
    if (hr > 12)
        hr = hr - 11;

    var hs = time.getSeconds()/60; //给时针适当的角度。

    hour_hand.rotate(30 * (hr-1+hs), 200, 150);

    var minute_angle = 6 + time.getMinutes() * 6,
        hour_angle = hr * 30;
    setInterval(function() {
        angle = angle + 6;
        if (angle >= 360) {
            angle = 0;
            //画分针
            minute_hand.rotate(minute_angle, 200, 150);
            minute_angle = minute_angle + 6;
            //画时针
            var hs = time.getSeconds()/60; 
            hour_hand.rotate(hour_angle-(hs)*30, 200, 150);
            hour_angle = hour_angle + 0.6;
        }
        if (minute_angle >= 360) {
            minute_angle = 0;
        }

        hand.rotate(angle, 200, 150);

    }, 1000);

};
