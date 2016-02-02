$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var boxes = [
        {
            coordinates: { x: 256, y: 256},
            dimensions: { w: 200, h: 150},
            lidAngle: -10*Math.PI/180
        }
    ];

    var radialGradients = [
        {
            x0: 200,
            y0: 200,
            r0: 1,
            x1: 220,
            y1: 220,
            r1: 250,
            color0: "white",
            color1: "blue"
        },
    ];

    var drawBox = function (box, gradient) {
        renderingContext.save();

        radialGradient = renderingContext.createRadialGradient(gradient.x0, gradient.y0, gradient.r0, gradient.x1, gradient.y1, gradient.r1);
        radialGradient.addColorStop(0, gradient.color0);
        radialGradient.addColorStop(1, gradient.color1);

        renderingContext.fillStyle = radialGradient;
        renderingContext.fillRect(box.coordinates.x, box.coordinates.y, box.dimensions.w, box.dimensions.h);
        renderingContext.translate(box.coordinates.x, box.coordinates.y);
        renderingContext.rotate(box.lidAngle);
        renderingContext.translate(-box.coordinates.x, -box.coordinates.y)
        renderingContext.fillRect(box.coordinates.x, box.coordinates.y-(box.dimensions.h*.11), box.dimensions.w, box.dimensions.h*.1);
        renderingContext.stroke();

        renderingContext.restore();
    };

    drawBox(boxes[0], radialGradients[0]);
});