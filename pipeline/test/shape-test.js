/*
 * Unit tests for the Matrix object
 */

 $(function () {
    var gl = GLSLUtilities.getGL(document.getElementById("hello-webgl"));
    // Testing instantiation
    test("TESTING INSTANTIATON && DATA ACCESS", function () {
        var s = new Shape();
        deepEqual(s.colors,
            {r:0, g: 0, b: 0},
            "Default Shape color");
        deepEqual(s.vertices,
            Shapes.toRawLineArray(Shapes.icosahedron()),
            "Default Shape vertices");
        deepEqual(s.mode,
            gl.LINES,
            "Default Shape mode");
        deepEqual(s.children,
            [],
            "Default Shape children");
    });

    test("TESTING CHILDREN", function () {
        var s = new Shape();
        s.addChildren(new Shape());
        deepEqual(s.children[0],
            new Shape(),
            "Single child addition");

        deepEqual(s.getChild(0),
            new Shape(),
            "Child retrieval");

        s.removeChild(0);
        deepEqual(s,
            new Shape(),
            "Child removal");

        s.addChildren([new Shape(), new Shape()]);
        deepEqual(s.children.length, 2, "Multiple children addition");

        s.children[0].addChildren(new Shape());
        deepEqual(s.children[0].children[0],
            new Shape(),
            "Multiple children levels");

        s.clearChildren();
        deepEqual(s,
            new Shape(),
            "Clearing children");
    });
 });