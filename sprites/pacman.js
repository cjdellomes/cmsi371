$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var pacmans = [
        {
            center: { x: 256, y: 256 },
            radius: 200,
            startingAngle: Math.PI * 1.75,
            endingAngle: Math.PI * 0.25,
            counterclockwise: true,
            gradient: {
                x0: 100,
                y0: 100,
                r0: 1,
                x1: 130,
                y1: 130,
                r1: 150,
                color0: "white",
                color1: "yellow"
            }
        },
    ];

    var drawPacman = function (pacman) {
        renderingContext.save();

        radialGradient = renderingContext.createRadialGradient(pacman.gradient.x0, pacman.gradient.y0, pacman.gradient.r0, pacman.gradient.x1, pacman.gradient.y1, pacman.gradient.r1);
        radialGradient.addColorStop(0, pacman.gradient.color0);
        radialGradient.addColorStop(1, pacman.gradient.color1);

        renderingContext.fillStyle = radialGradient;
        renderingContext.beginPath();
        renderingContext.moveTo(pacman.center.x, pacman.center.y);
        renderingContext.arc(pacman.center.x, pacman.center.y, pacman.radius, pacman.startingAngle, pacman.endingAngle, pacman.counterclockwise);
        renderingContext.lineTo(pacman.center.x, pacman.center.y);
        renderingContext.closePath();
        renderingContext.fill();

        renderingContext.restore();
    };

    drawPacman(pacmans[0]);
});