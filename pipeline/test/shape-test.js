/*
 * Unit tests for the Matrix object
 */

 $(function () {
    var gl = GLSLUtilities.getGL(document.getElementById("hello-webgl"));
    // Testing instantiation
    test("TESTING INSTANTIATON && DATA ACCESS", function () {
        var s = new Shape();
        deepEqual(s,
            {
                color: {r:0, g: 0, b: 0},
                vertices: Shapes.toRawLineArray(Shapes.icosahedron()),
                mode: gl.LINES,
                children: []
            },
            "Default Shape constructor");
    });
 });