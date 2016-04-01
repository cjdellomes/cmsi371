/*
 * Unit tests for the Matrix object
 */

$(function () {
    // Testing instantiation
    test("TESTING INSTANTIATION & DATA ACCESS", function () {
        var m1 = new Matrix();
        deepEqual(m1.elements,
            [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1],
            "Default matrix constructor");

        m = new Matrix(
            0, 1, 2, 3,
            4, 5, 6, 7,
            8, 9, 10, 11,
            3.14, 2.18, 13, 42);
        deepEqual(m.elements,
            [0, 1, 2, 3,
            4, 5, 6, 7,
            8, 9, 10, 11,
            3.14, 2.18, 13, 42],
            "Matrix constructor with arguments");

        deepEqual(m.rowAtIndex(0),
            [0, 1, 2, 3],
            "Matrix row by index");
        deepEqual(m.columnAtIndex(0),
            [0, 4, 8, 3.14],
            "Matrix column by index");
        deepEqual(m.elementAtIndex(7), 7,
            "Matrix element by index");
    });

    test("TESTING TRANSLATE, SCALE, AND ROTATE", function () {
        var m = Matrix.getTranslationMatrix(3, 1, 4);
        deepEqual(m.elements,
            [1, 0, 0, 3,
            0, 1, 0, 1,
            0, 0, 1, 4,
            0, 0, 0, 1],
            "Translation Matrix");

        m = Matrix.getScaleMatrix(13, 42, 9);
        deepEqual(m.elements,
            [13, 0, 0, 0,
            0, 42, 0, 0,
            0, 0, 9, 0,
            0, 0, 0, 1],
            "Scale Matrix");

        m = new Matrix(0, 1, 2, 3,
                       4, 5, 6, 7,
                       8, 9, 10, 11,
                       12, 13, 14, 15);

        m = Matrix.getRotationMatrix(45, 1, 0, 0);
        deepEqual(m.elements,
            [1, 0,  0, 0,
             0, Math.cos(45 * Math.PI / 180), Math.sin(45 * Math.PI / 180), 0,
             0, -Math.sin(45 * Math.PI / 180), Math.cos(45 * Math.PI / 180), 0,
             0, 0, 0, 1],
            "Pure rotation matrix by 87 degrees about the x-axis");
    });

    test("TESTING MATRIX MULTIPLICATION", function () {
        var m1 = new Matrix(0, 1, 2, 3,
                            4, 5, 6, 7,
                            8, 9, 10, 11,
                            12, 13, 14,15);
        var m2 = new Matrix(0, 1, 2, 3,
                            4, 5, 6, 7,
                            8, 9, 10, 11,
                            12, 13, 14, 15);
        var product = m1.multiply(m2);
        deepEqual(product.dimensions(), 16, "Dimensions preserved");
        deepEqual(product.elements,
            [56,  62,  68,  74,
             152, 174, 196, 218,
             248, 286, 324, 362,
             344, 398, 452, 506],
            "Matrix multiplication first test");
        m1 = new Matrix(5, 9, 8, 7,
                        1, 9, 3, 4,
                        6, 9, 2, 1,
                        5, 7, 7, 3);
        m2 = new Matrix(5, 8, 3, 9,
                        7, 12, 1, 0,
                        4, 7, 5, 4,
                        8, 8, 9, 1);
        product = m1.multiply(m2);
        deepEqual(product.elements,
            [176, 260, 127, 84,
             112, 169, 63, 25,
             109, 178, 46, 63,
             126, 197, 84, 76],
             "Matrix multiplication second test");
    });
});