$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var pacmans = [
        {
            center: { x: 256, y: 256 },
            radius: 200,
            startingAngle: 0,
            endingAngle: Math.PI * 2,
            counterclockwise: true
        }
    ];

    var radialGradients = [
        {
            x0: 200,
            y0: 200,
            r0: 1,
            x1: 220,
            y1: 220,
            r1: 250,
            color0: "white",
            color1: "yellow"
        }
    ];

    var drawPacman = function (pacman, gradient) {
        renderingContext.save();

        radialGradient = renderingContext.createRadialGradient(gradient.x0, gradient.y0, gradient.r0, gradient.x1, gradient.y1, gradient.r1);
        radialGradient.addColorStop(0, gradient.color0);
        radialGradient.addColorStop(1, gradient.color1);

        renderingContext.fillStyle = radialGradient;
        renderingContext.beginPath();
        renderingContext.arc(pacman.center.x, pacman.center.y, pacman.radius, pacman.startingAngle, pacman.endingAngle, pacman.counterclockwise);
        renderingContext.closePath();
        renderingContext.fill();

        renderingContext.restore();
    };

    drawPacman(pacmans[0], radialGradients[0]);

});