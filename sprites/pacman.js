(function () {

    window.SpriteLibrary = window.SpriteLibrary || {};
    SpriteLibrary.pacman = function (pacman) {

        renderingContext = pacman.renderingContext || document.getElementById("canvas").getContext("2d");

        renderingContext.save();

        color = pacman.color || "yellow";
        radius = pacman.radius || 200;
        startingAngle = pacman.startingAngle || Math.PI * 1.75;
        endingAngle = pacman.endingAngle || Math.PI * 0.25;
        counterclockwise = pacman.counterclockwise || true;

        renderingContext.fillStyle = color;
        renderingContext.beginPath();
        renderingContext.moveTo(0, 0);
        renderingContext.arc(0, 0, radius, startingAngle, 
            endingAngle, counterclockwise);
        renderingContext.lineTo(0, 0);
        renderingContext.closePath();
        renderingContext.fill();

        renderingContext.restore();
    };

}());