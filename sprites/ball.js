$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var balls = [
        {
            center: { x: 256, y: 256 },
            radius: 200,
            startingAngle: 0,
            endingAngle: Math.PI * 2,
            counterclockwise: true
        },
        {
            center: { x: 500, y: 400},
            radius: 100,
            startingAngle: 0,
            endingAngle: Math.PI * 2,
            counterclockwise: false
        }
    ];

    var radialGradients = [
        {
            x0: 160,
            y0: 160,
            r0: 1,
            x1: 180,
            y1: 180,
            r1: 220,
            color0: "white",
            color1: "green"
        },
        {
            x0: 460,
            y0: 360,
            r0: 1,
            x1: 440,
            y1: 340,
            r1: 120,
            color0: "white",
            color1: "red"
        }
    ];

    var drawBall = function (ball, gradient) {
        radialGradient = renderingContext.createRadialGradient(gradient.x0, gradient.y0, gradient.r0, gradient.x1, gradient.y1, gradient.r1);
        radialGradient.addColorStop(0, gradient.color0);
        radialGradient.addColorStop(1, gradient.color1);

        renderingContext.fillStyle = radialGradient;
        renderingContext.beginPath();
        renderingContext.arc(ball.center.x, ball.center.y, ball.radius, ball.startingAngle, ball.endingAngle, ball.counterclockwise);
        renderingContext.closePath();
        renderingContext.fill();
    };

    drawBall(balls[0], radialGradients[0]);
    drawBall(balls[1], radialGradients[1]);
});