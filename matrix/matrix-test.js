/*
 * Unit tests for the Matrix object
 */

$(function () {
    // Testing instantiation
    test("TESTING INSTANTIATION", function () {
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
});