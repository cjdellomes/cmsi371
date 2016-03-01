(function () {

    window.SpriteLibrary = window.SpriteLibrary || {};
    SpriteLibrary.pacman = function (pacman) {

        renderingContext = pacman.renderingContext;

        renderingContext.save();

        radialGradient = renderingContext.createRadialGradient(pacman.gradient.x0, pacman.gradient.y0, 
            pacman.gradient.r0, pacman.gradient.x1, pacman.gradient.y1, pacman.gradient.r1);
        radialGradient.addColorStop(0, pacman.gradient.color0);
        radialGradient.addColorStop(1, pacman.gradient.color1);

        renderingContext.fillStyle = radialGradient;
        renderingContext.beginPath();
        renderingContext.moveTo(pacman.center.x, pacman.center.y);
        renderingContext.arc(pacman.center.x, pacman.center.y, pacman.radius, pacman.startingAngle, 
            pacman.endingAngle, pacman.counterclockwise);
        renderingContext.lineTo(pacman.center.x, pacman.center.y);
        renderingContext.closePath();
        renderingContext.fill();

        renderingContext.restore();
    };

}());