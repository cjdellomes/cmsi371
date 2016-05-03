var Shape = (function (color, vertices, mode, children, transformation) {
    var gl = GLSLUtilities.getGL(document.getElementById("hello-webgl"));
    this.colors = color || { r : 0, g : 0, b : 0 };
    this.vertices = vertices || Shapes.toRawLineArray(Shapes.icosahedron());
    this.mode = mode || gl.LINES;
    this.children = children || [];
    this.transformation = transformation || undefined;

    Shape.prototype.addChildren = function (kids) {
        if (Array.isArray(kids)) {
            for (var i = 0; i < kids.length; i++) {
                this.children.push(kids[i]);
            }
        } else {
            this.children.push(kids);
        }
        return this;
    };

    Shape.prototype.removeChild = function (index) {
        this.children.splice(index, 1);
        return this;
    };

    Shape.prototype.clearChildren = function () {
        this.children = [];
        return this;
    };

    Shape.prototype.getChild = function (index) {
        return this.children[index];
    };

    Shape.prototype.transform = function (transformation) {
        this.transformation = transformation;
        return this;
    }
});


/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {

    /*
     * Returns the vertices for a small cylinder
     */
    cylinder: function (radius, length, radSlices) {
        var radius = radius || 0.5;
        var length = length || 0.5;
        var radSlices = radSlices || 20;
        var vertices = [];
        var indices = [];
        var data = {};

        // Middle of top & bottom circles
        vertices.push([0, 0, length / 2]);
        vertices.push([0, 0, -length / 2]);

        for (var radNum = 0; radNum < radSlices + 1; radNum++) {
            var phi = (radNum * 2 * Math.PI) / radSlices;
            var x = radius * Math.cos(phi);
            var y = radius * Math.sin(phi);
            var z = length / 2;

            vertices.push([x, y, z]);
            vertices.push([x, y, -z]);
        }

        for (var radNum = 1; radNum < radSlices + 1; radNum++) {
            indices.push([0, radNum * 2, (radNum * 2) % (radSlices * 2) + 2]);
            indices.push([1, radNum * 2 + 1, (radNum * 2) % (radSlices * 2) + 3]);
        }

        for (var radNum = 2; radNum < radSlices * 2 + 2; radNum++) {
            if (radNum >= radSlices * 2) {
                if (radNum % 2 === 0) {
                    indices.push([radNum, radNum + 1, (radNum + 2) % radSlices]);
                } else {
                    indices.push([radNum, radNum + 2 % radSlices, (radNum + 1) % radSlices]);
                }
            } else {
                if (radNum % 2 === 0) {
                    indices.push([radNum, radNum + 1, radNum + 2]);
                } else {
                    indices.push([radNum, radNum + 2, radNum + 1]);
                }
            }
        }

        data.vertices = vertices;
        data.indices = indices;
        return data;
    },

    /*
     * Returns the vertices for a small cube
     */
    cube: function (side) {
        var side = side || 0.5;
        var vertices = [];
        var indices = [];
        var data = {};
        var x = side;

        // Create cube vertices
        vertices = [
            // Front face
            [-x, -x, x],
            [x, -x, x],
            [x, x, x],
            [-x, x, x],

            // Back face
            [-x, -x, -x],
            [-x, x, -x],
            [x, x, -x],
            [x, -x, -x],

            // Top face
            [-x, x, -x],
            [-x, x, x],
            [x, x, x],
            [x, x, -x],

            // Bottom face
            [-x, -x, -x],
            [x, -x, -x],
            [x, -x, x],
            [-x, -x, x],

            // Right face
            [x, -x, -x],
            [x, x, -x],
            [x, x, x],
            [x, -x, x],

            // Left Face
            [-x, -x, -x],
            [-x, -x, x],
            [-x, x, x],
            [-x, x, -x]
        ];

        // Create cube indices
        indices = [
            [0, 1, 2],
            [0, 2, 3],
            [4, 5, 6],
            [4, 6, 7],
            [8, 9, 10],
            [8, 10, 11],
            [12, 13, 14],
            [12, 14, 15],
            [16, 17, 18],
            [16, 18, 19],
            [20, 21, 22],
            [20, 22, 23]
        ];

        data.vertices = vertices;
        data.indices = indices;
        return data;
    },

    /*
     * Returns the vertices for a small sphere
     */
    sphere: function (radius, latBands, longBands) {
        var radius = radius || 0.5;
        var latBands = latBands || 20;
        var longBands = longBands || 20;
        var vertices = [];
        var indices = [];
        var data = {};

        // Create sphere vertices
        for (var latNum = 0; latNum <= latBands; latNum++) {
            var theta = (latNum * Math.PI) / latBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNum = 0; longNum <= longBands; longNum++) {
                var phi = (longNum * 2 * Math.PI) / longBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = radius * cosPhi * sinTheta;
                var y = radius * cosTheta;
                var z = radius * sinPhi * sinTheta;

                vertices.push([x, y, z]);
            }
        }

        // Create sphere indices
        for (var latNum = 0; latNum <= latBands; latNum++) {
            for (var longNum = 0; longNum <= longBands; longNum++) {
                var top = (latNum * (longBands + 1)) + longNum;
                var bottom = top + longBands + 1;

                indices.push([top, bottom, top + 1]);
                indices.push([bottom, bottom + 1, top + 1]);
            }
        }
        data.vertices = vertices;
        data.indices = indices;
        return data;
    },

    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606;
        var Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [];

        for (var i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
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

};