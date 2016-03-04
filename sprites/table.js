(function () {

    window.SpriteLibrary = window.SpriteLibrary || {};
    SpriteLibrary.table = function (table) {

        renderingContext = table.renderingContext || document.getElementById("canvas").getContext("2d");

        renderingContext.save();

        color = table.color || "brown";
        tableDimensions = table.tableDimensions || { w: 300, h: 10 };
        legDimensions = table.legDimensions || { w: 10, h: 50};

        renderingContext.fillStyle = color;
        renderingContext.fillRect(0, 0, 
            tableDimensions.w, tableDimensions.h);
        renderingContext.fillRect(0, tableDimensions.h, 
            legDimensions.w, legDimensions.h);
        renderingContext.fillRect(tableDimensions.w - legDimensions.w, 
            tableDimensions.h, legDimensions.w, legDimensions.h);

        renderingContext.restore();
    };

}());