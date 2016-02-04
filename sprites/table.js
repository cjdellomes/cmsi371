$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var tables = [
        {
            tableCoordinates: { x: 100, y: 100 },
            tableDimensions: { w: 200, h: 30 },
            legDimensions: { w: 20, h: 200 }
        },
        {
            tableCoordinates: { x: 400, y: 300 },
            tableDimensions: { w: 300, h: 10 },
            legDimensions: { w: 10, h: 30}
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

        renderingContext.fillStyle = radialGradient;
        renderingContext.beginPath();
        renderingContext.fillRect(table.tableCoordinates.x, table.tableCoordinates.y, table.tableDimensions.w, table.tableDimensions.h);
        renderingContext.fillRect(table.tableCoordinates.x, table.tableCoordinates.y + table.tableDimensions.h, table.legDimensions.w, table.legDimensions.h);
        renderingContext.fillRect(table.tableCoordinates.x + table.tableDimensions.w - table.legDimensions.w, table.tableCoordinates.y + table.tableDimensions.h, table.legDimensions.w, table.legDimensions.h);
        renderingContext.stroke();

        renderingContext.restore();
    };

    drawTable(tables[0], radialGradients[0]);
    drawTable(tables[1], radialGradients[0]);
});