$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var boxes = [
        {
            center: { x: 256, y: 256},
            dimensions: { w: 200, h: 150}
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
        radialGradient = renderingContext.createRadialGradient(gradient.x0, gradient.y0, gradient.r0, gradient.x1, gradient.y1, gradient.r1);
        radialGradient.addColorStop(0, gradient.color0);
        radialGradient.addColorStop(1, gradient.color1);

        renderingContext.fillStyle = radialGradient;
        renderingContext.rect(box.center.x, box.center.y, box.dimensions.w, box.dimensions.h);
        renderingContext.stroke();
        renderingContext.fill();
    };

    drawBox(boxes[0], radialGradients[0]);
});