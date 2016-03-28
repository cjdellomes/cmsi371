var Shape = (function (color, vertices, mode) {
    
    // Define the constructor
    this.color = color;
    this.vertices = vertices;
    this.mode = mode;

    Shape.prototype.toRawTriangleArray = function (indexedVertices) {
        var result = [];

        for (var i = 0, maxi = indexedVertices.indices.length; i < maxi; i++) {
            for (var j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j++) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.vertices[i][j]
                    ]
                );
            }
        }

        return result;
    }

    Shape.prototype.toRawLineArray = function (indexedVertices) {
        var result = [];

        for (var i = 0, maxi = indexedVertices.indices.length; i < maxi; i++) {
            for (var j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j++) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    }
});