$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var balls = [
        {
            center: { x: 256, y: 256 },
            radius: 200,
            startingAngle: 0,
            endingAngle: Math.PI*2,
            counterclockwise: false
        }
    ];

    var drawBall = function (ball) {
        renderingContext.beginPath();
        renderingContext.arc(ball.center.x, ball.center.y, ball.startingAngle, ball.endingAngle, ball.counterclockwise);
        renderingContext.closePath();
        renderingContext.fill();
    };

    drawBall(balls[0]);
});