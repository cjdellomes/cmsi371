(function () {

    window.SpriteLibrary =  window.SpriteLibrary || {};
    SpriteLibrary.ball = function (ball) {

        renderingContext = ball.renderingContext || document.getElementById("canvas").getContext("2d");

        renderingContext.save();

        color = ball.color || "blue";
        radius = ball.radius || 100;
        startingAngle = ball.startingAngle || 0;
        endingAngle = ball.endingAngle || Math.PI * 2;
        counterClockwise = ball.counterClockwise || false;

        renderingContext.fillStyle = color;
        renderingContext.beginPath();
        renderingContext.arc(0, 0, radius,
            startingAngle, endingAngle, counterClockwise);
        renderingContext.closePath();
        renderingContext.fill();

        renderingContext.restore();
    };

}());