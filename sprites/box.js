$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var boxes = [
        {
            coordinates: { x: 900, y: 256 },
            dimensions: { w: 200, h: 150 },
            lidAngle: -30*Math.PI/180,
            color: "blue"
        }
    ];

    var drawBox = function (box) {
        renderingContext.save();

        renderingContext.fillStyle = box.color;
        renderingContext.fillRect(box.coordinates.x, box.coordinates.y, box.dimensions.w, box.dimensions.h);
        renderingContext.translate(box.coordinates.x, box.coordinates.y);
        renderingContext.rotate(box.lidAngle);
        renderingContext.translate(-box.coordinates.x, -box.coordinates.y)
        renderingContext.fillRect(box.coordinates.x, box.coordinates.y-(box.dimensions.h * .11), box.dimensions.w, box.dimensions.h * .1);
        //renderingContext.stroke();

        renderingContext.restore();
    };

    drawBox(boxes[0]);
});