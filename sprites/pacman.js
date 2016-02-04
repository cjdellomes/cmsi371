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
            color: "yellow"
        },
        {
            center: { x: 600, y: 300 },
            radius: 100,
            startingAngle: Math.PI * 1.95,
            endingAngle: Math.PI * 0.05,
            counterclockwise: true,
            color: "yellow"
        }
    ];

    var drawPacman = function (pacman) {
        renderingContext.save();

        renderingContext.fillStyle = pacman.color;
        renderingContext.beginPath();
        renderingContext.moveTo(pacman.center.x, pacman.center.y);
        renderingContext.arc(pacman.center.x, pacman.center.y, pacman.radius, pacman.startingAngle, pacman.endingAngle, pacman.counterclockwise);
        renderingContext.lineTo(pacman.center.x, pacman.center.y);
        renderingContext.stroke();
        renderingContext.fill();

        renderingContext.restore();
    };

    drawPacman(pacmans[0]);
    drawPacman(pacmans[1]);

});