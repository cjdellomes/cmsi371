/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    var m = new Matrix();

    /*
     * Function for passing an object's and its children's vertices to WebGL.
     */
    var passVertices = function (object) {
        for (var i = 0, maxi = object.children.length; i < maxi; i++) {
            passVertices(object.children[i]);
        }
        object.buffer = GLSLUtilities.initVertexBuffer(gl, object.vertices);

        if (!Array.isArray(object.colors)) {
            //If we have a single color, we expand that into an array
            // of the same color over and over
            var colorObj = object.colors;
            object.colors = [];
            for (var i = 0, maxi = object.vertices.length / 3; i < maxi; i++) {
                object.colors = object.colors.concat(
                    colorObj.r,
                    colorObj.g,
                    colorObj.b
                );
            }
        }
        object.colorBuffer = GLSLUtilities.initVertexBuffer(gl, object.colors);
    };

    // Grab the WebGL rendering context.
    var gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    var transformObj = {
        xt: 3,
        yt: 1,
        zt: -10,
        xs: 5,
        ys: 5,
        zs: 4,
        angle: 45,
        xr: 1,
        yr: 0,
        zr: 0
    };

    var compoundShape = new Shape({ r: 0.0, g: 0.5, b: 0.0 }, Shapes.toRawLineArray(Shapes.icosahedron()), gl.LINES,
            [new Shape({ r: 0.0, g: 0.5, b: 0.0 }, Shapes.toRawLineArray(Shapes.sphere(1, 20, 20)), gl.LINES,
                [new Shape({ r: 0.0, g: 0.5, b: 0.0 }, Shapes.toRawTriangleArray(Shapes.cube(0.5)), gl.TRIANGLES)]),
            new Shape({ r: 0.0, g: 0.0, b: 0.5}, Shapes.toRawTriangleArray(Shapes.cylinder(0.7, 0.7, 30)), gl.TRIANGLES)]);

    var simpleShape = new Shape({ r: 0.0, g: 0.5, b: 0.0}, Shapes.toRawTriangleArray(Shapes.sphere(0.5, 20, 20)), gl.Lines, [], transformObj);
    console.log(simpleShape);

    //simpleShape.transform(transformObj);
    compoundShape.transform(transformObj);

    // Build the objects to display.
    var objectsToDraw = [

        //compoundShape.addChildren(new Shape({ r: 0.5, g: 0.0, b: 0.0 }, Shapes.toRawLineArray(Shapes.sphere(0.9, 20, 20)), gl.LINES)),
        simpleShape

    ];

    // Pass the vertices to WebGL.
    for (var i = 0, maxi = objectsToDraw.length; i < maxi; i++) {
        passVertices(objectsToDraw[i]);
    }

    // Initialize the shaders.
    var abort = false;
    var shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    var vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    var vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    //var normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    //gl.enableVertexAttribArray(normalVector);

    var rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    var modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    var projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    var cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");

    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(Matrix.getFrustumMatrix(-4, 4, -2, 2, 5, 200).conversion()));

    var drawObjects = function (objects, parentMatrix) {
        var i;
        var instanceMatrix = new Matrix();

        for (i = 0; i < objects.length; i += 1) {

            // Checks for object transformation
            if (objects[i].transformation) {
                var transform = objects[i].transformation;

                instanceMatrix = instanceMatrix.multiply(Matrix.getTranslationMatrix(transform.xt, transform.yt, transform.zt));
                instanceMatrix = instanceMatrix.multiply(Matrix.getScaleMatrix(transform.xs, transform.ys, transform.zs));
                transform.angle = currentRotation;
                instanceMatrix = instanceMatrix.multiply(Matrix.getRotationMatrix(transform.angle, transform.xr, transform.yr, transform.zr));

                // If parent shape had a transformation matrix, instance multiplied with it
                if (parentMatrix) {
                    instanceMatrix = instanceMatrix.multiply(parentMatrix);
                    gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(instanceMatrix.conversion()));
                } else {
                    gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(instanceMatrix.conversion()));
                }
            }

            // Set the varying colors.
            gl.bindBuffer(gl.ARRAY_BUFFER, objects[i].colorBuffer);
            gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

            // Set the varying vertex coordinates.
            gl.bindBuffer(gl.ARRAY_BUFFER, objects[i].buffer);
            gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.drawArrays(objects[i].mode, 0, objects[i].vertices.length / 3);

            for (var j = 0; j < objects[i].children.length; j += 1) {
                drawObjects(objects[i].children, instanceMatrix);
            }
        }
    }

    /*
     * Displays the scene.
     */
    var drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up the rotation matrix.
        //gl.uniformMatrix4fv(rotationMatrix, gl.False, new Float32Array(Matrix.getRotationMatrix(currentRotation, 1, 1, 1).conversion()));

        // Display the objects.
        drawObjects(objectsToDraw);

        // All done.
        gl.flush();
    };

    /*
     * Animates the scene.
     */
    var animationActive = false;
    var currentRotation = 0.0;
    var previousTimestamp = null;

    var advanceScene = function (timestamp) {
        // Check if the user has turned things off.
        if (!animationActive) {
            return;
        }

        // Initialize the timestamp.
        if (!previousTimestamp) {
            previousTimestamp = timestamp;
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // Check if it's time to advance.
        var progress = timestamp - previousTimestamp;
        if (progress < 30) {
            // Do nothing if it's too soon.
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // All clear.
        currentRotation += 0.033 * progress;
        drawScene();
        if (currentRotation >= 360.0) {
            currentRotation -= 360.0;
        }

        // Request the next frame.
        previousTimestamp = timestamp;
        window.requestAnimationFrame(advanceScene);
    };

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        animationActive = !animationActive;
        if (animationActive) {
            previousTimestamp = null;
            window.requestAnimationFrame(advanceScene);
        }
    });

}(document.getElementById("hello-webgl")));