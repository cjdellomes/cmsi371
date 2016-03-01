(function () {

    window.SpriteLibrary = window.SpriteLibrary || {};
    SpriteLibrary.box = function (box) {

        renderingContext = box.renderingContext;

        renderingContext.save();

        renderingContext.fillStyle = box.color;
        renderingContext.fillRect(box.coordinates.x, box.coordinates.y, 
            box.boxDimensions.w, box.boxDimensions.h);
        renderingContext.translate(box.coordinates.x, box.coordinates.y);
        renderingContext.rotate(box.lidAngle);
        renderingContext.translate(-box.coordinates.x, -box.coordinates.y)
        renderingContext.fillRect(box.coordinates.x, box.coordinates.y-(box.boxDimensions.h * .11), 
            box.boxDimensions.w, box.lidHeight);

        renderingContext.restore();
    };

}());