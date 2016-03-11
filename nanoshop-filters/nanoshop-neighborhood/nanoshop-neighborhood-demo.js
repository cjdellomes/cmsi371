/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0];
    var renderingContext = canvas.getContext("2d");

    var sprites = [
        {
            draw: SpriteLibrary.pacman,
            tx: 200,
            ty: 200,
            parameters: {
                renderingContext: renderingContext,
                radius: 100,
                startingAngle: Math.PI * 1.75,
                endingAngle: Math.PI * 0.25,
                counterclockwise: true
            }
        },

        {
            draw: SpriteLibrary.box,
            tx: 300,
            ty: 200,
            parameters: {
                renderingContext: renderingContext,
                boxDimensions: { w: 200, h: 150 },
                lidHeight: 15,
                lidAngle: -30*Math.PI/180,
                color: "green"
            }
        },

        {
            draw: SpriteLibrary.table,
            tx: 300,
            ty: 400,
            parameters: {
                renderingContext: renderingContext,
                tableDimensions: { w: 300, h: 10 },
                legDimensions: { w: 10, h: 50 },
                color: "brown"
            }
        },

        {
            draw: SpriteLibrary.ball,
            tx: 430,
            ty: 170,
            parameters: {
                renderingContext: renderingContext,
                radius: 30,
                startingAngle: 0,
                endingAngle: Math.PI * 2,
                counterclockwise: true,
                color: "orange"
            }
        }
    ];

    for (var i = 0; i < sprites.length; i++) {
        renderingContext.save();
        renderingContext.translate(sprites[i].tx, sprites[i].ty);
        sprites[i].draw(sprites[i].parameters);
        renderingContext.restore();
    }

    // Set a little event handler to apply the filter.
    $("#apply-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                NanoshopNeighborhood.shadow
                //NanoshopNeighborhood.averager // Convenience comment for easy switching.
            ),
            0, 0
        );
    });
}());
