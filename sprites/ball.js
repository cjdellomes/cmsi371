(function () {

    window.SpriteLibrary =  window.SpriteLibrary || {};
    SpriteLibrary.ball = function (ball) {

        renderingContext = ball.renderingContext;

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

}());