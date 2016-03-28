var Shape = (function (color, vertices, mode) {

    this.colors = color;
    this.vertices = vertices;
    this.mode = mode;

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
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

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
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