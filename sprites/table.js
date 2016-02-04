$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var tables = [
        {
            tableCoordinates: { x: 100, y: 100 },
            tableDimensions: { w: 200, h: 30 },
            legDimensions: { w: 20, h: 200 },
            color: "brown"
        },
        {
            tableCoordinates: { x: 400, y: 300 },
            tableDimensions: { w: 300, h: 10 },
            legDimensions: { w: 10, h: 30},
            color: "black"
        }
    ];

    var drawTable = function (table) {
        renderingContext.save();

        renderingContext.fillStyle = table.color;
        renderingContext.beginPath();
        renderingContext.fillRect(table.tableCoordinates.x, table.tableCoordinates.y, table.tableDimensions.w, table.tableDimensions.h);
        renderingContext.fillRect(table.tableCoordinates.x, table.tableCoordinates.y + table.tableDimensions.h, table.legDimensions.w, table.legDimensions.h);
        renderingContext.fillRect(table.tableCoordinates.x + table.tableDimensions.w - table.legDimensions.w, table.tableCoordinates.y + table.tableDimensions.h, table.legDimensions.w, table.legDimensions.h);
        renderingContext.stroke();

        renderingContext.restore();
    };

    drawTable(tables[0]);
    drawTable(tables[1]);
});