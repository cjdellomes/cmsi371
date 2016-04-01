var Matrix = (function () {

    this.elements = arguments.length ?
    [].slice.call(arguments) : 

    [1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1];

    // Returns length of matrix array.
    Matrix.prototype.dimensions = function () {
        return this.elements.length;
    };

    // Returns the matrix array of elements
    Matrix.prototype.elements = function () {
        return this.elements;
    };

    // Returns the element at the index
    Matrix.prototype.elementAtIndex = function (index) {
        if (index < 0 || index > 15) {
            throw "Index out of bounds"
        } else {
            return this.elements[index];
        }
    };

    // Returns the matrix array of elements at the index row
    Matrix.prototype.rowAtIndex = function (index) {
        if (index < 0 || index > 3) {
            throw "Index out of bounds"
        } else {
            return [this.elements[0 + index * 4],
                    this.elements[1 + index * 4],
                    this.elements[2 + index * 4],
                    this.elements[3 + index * 4]];
        }
    };

    // Returns the matix array of elements at the index column
    Matrix.prototype.columnAtIndex = function (index) {
        if (index < 0 || index > 3) {
            throw "Index out of bounds"
        } else {
            return [this.elements[index],
                    this.elements[index + 4],
                    this.elements[index + 8],
                    this.elements[index + 12]];
        }
    };

    // Returns the translation matrix
    Matrix.getTranslationMatrix = function (x, y, z) {
        return new Matrix(
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        );
    };

    // Returns the scale matrix
    Matrix.getScaleMatrix = function (x, y, z) {
        return new Matrix(
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        );
    };

    // Returns the rotation matrix
     /*
     * This code does not really belong here: it should live
     * in a separate library of matrix and transformation
     * functions.  It is here only to show you how matrices
     * can be used with GLSL.
     *
     * Based on the original glRotate reference:
     *     http://www.opengl.org/sdk/docs/man/xhtml/glRotate.xml
     */
    Matrix.getRotationMatrix = function (angle, x, y, z) {
        // In production code, this function should be associated
        // with a matrix object with associated functions.
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z));
        var s = Math.sin(angle * Math.PI / 180.0);
        var c = Math.cos(angle * Math.PI / 180.0);
        var oneMinusC = 1.0 - c;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        // Now we can calculate the other terms.
        // "2" for "squared."
        var x2 = x * x;
        var y2 = y * y;
        var z2 = z * z;
        var xy = x * y;
        var yz = y * z;
        var xz = x * z;
        var xs = x * s;
        var ys = y * s;
        var zs = z * s;

        // GL expects its matrices in column major order.
        return new MAtrix(
            (x2 * oneMinusC) + c,
            (xy * oneMinusC) + zs,
            (xz * oneMinusC) - ys,
            0.0,

            (xy * oneMinusC) - zs,
            (y2 * oneMinusC) + c,
            (yz * oneMinusC) + xs,
            0.0,

            (xz * oneMinusC) + ys,
            (yz * oneMinusC) - xs,
            (z2 * oneMinusC) + c,
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        );
    };
});