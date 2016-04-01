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
});