(function () {

    window.SpriteLibrary = window.SpriteLibrary || {};
    SpriteLibrary.table = function (table) {

        renderingContext = table.renderingContext;

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

}());