$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var pacmans = [
        {
            center: { x: 256, y: 256 },
            radius: 200,
            startingAngle: Math.PI * 1.75,
            endingAngle: Math.PI * 0.25,
            counterclockwise: true
        },
        {
            center: { x: 600, y: 300 },
            radius: 100,
            startingAngle: Math.PI * 1.95,
            endingAngle: Math.PI * 0.05,
            counterclockwise: true
        }
    ];

    var radialGradients = [
        {
            x0: 100,
            y0: 100,
            r0: 1,
            x1: 150,
            y1: 150,
            r1: 170,
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
        renderingContext.moveTo(pacman.center.x, pacman.center.y);
        renderingContext.arc(pacman.center.x, pacman.center.y, pacman.radius, pacman.startingAngle, pacman.endingAngle, pacman.counterclockwise);
        renderingContext.lineTo(pacman.center.x, pacman.center.y);
        renderingContext.stroke();
        renderingContext.fill();

        renderingContext.restore();
    };

    drawPacman(pacmans[0], radialGradients[0]);
    drawPacman(pacmans[1], radialGradients[0]);

});