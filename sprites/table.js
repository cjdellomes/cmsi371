$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var tables = [
        {
            center: { x: 256, y: 256 },
            legWidth:50,
            legHeight:200,
            tableWidth:200,
            tableHeight:30,
            legDistance:100
        }
    ];

    var radialGradients = [
        {
            x0: 100,
            y0: 100,
            r0: 1,
            x1: 150,
            y1: 150,
            r1: 170,
            color0: "white",
            color1: "brown"
        }
    ];

    var drawTable = function (table, gradient) {
        renderingContext.save();

        radialGradient = renderingContext.createRadialGradient(gradient.x0, gradient.y0, gradient.r0, gradient.x1, gradient.y1, gradient.r1);
        radialGradient.addColorStop(0, gradient.color0);
        radialGradient.addColorStop(1, gradient.color1);

        renderingContext.fillStyle(radialGradient);

        renderingContext.restore();
    };

    drawTable(tables[0], radialGradients[0]);
});