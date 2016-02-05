$(function () {
    var canvas = $("#canvas")[0];
    var renderingContext = canvas.getContext("2d");

    var tables = [
        {
            tableCoordinates: { x: 400, y: 550 },
            tableDimensions: { w: 300, h: 10 },
            legDimensions: { w: 10, h: 50 },
            color: "brown"
        }
    ];

    var drawTable = function (table) {
        renderingContext.save();

        renderingContext.fillStyle = table.color;
        renderingContext.fillRect(table.tableCoordinates.x, table.tableCoordinates.y, 
            table.tableDimensions.w, table.tableDimensions.h);
        renderingContext.fillRect(table.tableCoordinates.x, table.tableCoordinates.y + table.tableDimensions.h, 
            table.legDimensions.w, table.legDimensions.h);
        renderingContext.fillRect(table.tableCoordinates.x + table.tableDimensions.w - table.legDimensions.w, 
            table.tableCoordinates.y + table.tableDimensions.h, table.legDimensions.w, table.legDimensions.h);

        renderingContext.restore();
    };

    drawTable(tables[0]);
});