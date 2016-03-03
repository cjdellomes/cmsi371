(function () {

    window.SpriteLibrary = window.SpriteLibrary || {};
    SpriteLibrary.box = function (box) {

        renderingContext = box.renderingContext;

        renderingContext.save();

        color = box.color || "blue";
        boxDimensions = box.boxDimensions || { w: 200, h: 150 };
        lidHeight = box.lidHeight || 15;
        lidAngle = box.lidAngle || -30 * Math.PI / 180;

        renderingContext.fillStyle = color;
        renderingContext.fillRect(0, 0,
            boxDimensions.w, boxDimensions.h);
        renderingContext.translate(0, 0);
        renderingContext.rotate(lidAngle);
        renderingContext.translate(0, 0)
        renderingContext.fillRect(0, -(boxDimensions.h * .11), 
            boxDimensions.w, lidHeight);

        renderingContext.restore();
    };

}());