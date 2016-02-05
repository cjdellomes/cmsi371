$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var boxes = [
        {
            coordinates: { x: 900, y: 256 },
            boxDimensions: { w: 200, h: 150 },
            lidHeight: 15,
            lidAngle: -30*Math.PI/180,
            color: "blue"
        }
    ];

    var drawBox = function (box) {
        renderingContext.save();

        renderingContext.fillStyle = box.color;
        renderingContext.fillRect(box.coordinates.x, box.coordinates.y, box.boxDimensions.w, box.boxDimensions.h);
        renderingContext.translate(box.coordinates.x, box.coordinates.y);
        renderingContext.rotate(box.lidAngle);
        renderingContext.translate(-box.coordinates.x, -box.coordinates.y)
        renderingContext.fillRect(box.coordinates.x, box.coordinates.y-(box.boxDimensions.h * .11), box.boxDimensions.w, box.lidHeight);

        renderingContext.restore();
    };

    drawBox(boxes[0]);
});