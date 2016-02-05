$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var balls = [
        {
            center: { x: 600, y: 300 },
            radius: 100,
            startingAngle: 0,
            endingAngle: Math.PI * 2,
            counterclockwise: true,
            gradient: {
                x0: 430,
                y0: 200,
                r0: 1,
                x1: 480,
                y1: 210,
                r1: 200,
                color0: "white",
                color1: "green"
            }
        }
    ];

    var drawBall = function (ball) {
        renderingContext.save();

        radialGradient = renderingContext.createRadialGradient(ball.gradient.x0, 
            ball.gradient.y0, ball.gradient.r0, ball.gradient.x1, ball.gradient.y1, ball.gradient.r1);
        radialGradient.addColorStop(0, ball.gradient.color0);
        radialGradient.addColorStop(1, ball.gradient.color1);

        renderingContext.fillStyle = radialGradient;
        renderingContext.beginPath();
        renderingContext.arc(ball.center.x, ball.center.y, ball.radius, 
            ball.startingAngle, ball.endingAngle, ball.counterclockwise);
        renderingContext.closePath();
        renderingContext.fill();

        renderingContext.restore();
    };

    drawBall(balls[0]);
});