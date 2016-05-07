/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    var m = new Matrix();

    /*
     * Function for passing an object's and its children's vertices, colors, and normal vector to WebGL.
     */
    var passVertices = function (object) {
        if (object.children) {
            for (var i = 0, maxi = object.children.length; i < maxi; i++) {
                passVertices(object.children[i]);
            }
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

        object.normalBuffer = GLSLUtilities.initVertexBuffer(gl, object.normals);
        object.colorBuffer = GLSLUtilities.initVertexBuffer(gl, object.colors);
        object.specularBuffer = GLSLUtilities.initVertexBuffer(gl, object.colors);
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
        xt: -4,
        yt: 0,
        zt: -7,
        xs: 1,
        ys: 1,
        zs: 1,
        angle: 25,
        xr: 1,
        yr: 1,
        zr: 0
    };

    var transformObj2 = {
        xt: 1,
        yt: 3,
        zt: -4,
        xs: 3,
        ys: 2,
        zs: 1,
        angle: 45,
        xr: 1,
        yr: 1,
        zr: 0
    }

    var compoundShape = new Shape({ r: 0.0, g: 0.5, b: 0.0 }, gl.LINES, Shapes.icosahedron(),
            [new Shape({ r: 0.0, g: 0.5, b: 0.0 }, gl.LINES, Shapes.sphere(1, 20, 20),
                [new Shape({ r: 0.0, g: 0.5, b: 0.0 }, gl.TRIANGLES, Shapes.cube(0.5))]),
            new Shape({ r: 0.0, g: 0.0, b: 0.5}, gl.TRIANGLES, Shapes.cylinder(0.7, 0.7, 30))], transformObj, 3);

    var simpleShape = new Shape({ r: 0.0, g: 0.0, b: 0.7 }, gl.TRIANGLES, Shapes.sphere(0.5, 20, 20), [], transformObj);
    simpleShape.addChildren(new Shape({ r: 0.5, g: 0.0, b: 0.0 }, gl.LINES, Shapes.cube(0.5), [], transformObj));

    var s = new Shape({ r: 0.0, g: 0.5, b: 0.0 }, gl.TRIANGLES, Shapes.sphere(0.5, 20, 20), [], transformObj2);

    // Build the objects to display.
    var objectsToDraw = [

        compoundShape,
        simpleShape,
        s,

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
    var vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    var vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    var normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    var modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    var xRotationMatrix = gl.getUniformLocation(shaderProgram, "xRotationMatrix");
    var yRotationMatrix = gl.getUniformLocation(shaderProgram, "yRotationMatrix");
    var projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");

    var cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");

    var lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    var lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    var lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    var shininess = gl.getUniformLocation(shaderProgram, "shininess");

    //gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(Matrix.getFrustumMatrix(-3, 3, -3, 3, 5, 100).conversion()));

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

            // Set the varying normal vectors
            gl.bindBuffer(gl.ARRAY_BUFFER, objects[i].normalBuffer);
            gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

            // Set the varying colors.
            gl.bindBuffer(gl.ARRAY_BUFFER, objects[i].colorBuffer);
            gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, objects[i].specularBuffer);
            gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

            // Set the shininess.
            gl.uniform1f(shininess, objects[i].shininess);

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
    var rotationAroundX = 0.0;
    var rotationAroundY = 0.0;
    var drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set the overall rotation
        gl.uniformMatrix4fv(xRotationMatrix, gl.FALSE, new Float32Array(
                Matrix.getRotationMatrix(rotationAroundX, 1.0, 0.0, 0.0).conversion()
        ));
        gl.uniformMatrix4fv(yRotationMatrix, gl.FALSE, new Float32Array(
                Matrix.getRotationMatrix(rotationAroundY, 0.0, 1.0, 0.0).conversion()
        ));

        // Display the objects.
        drawObjects(objectsToDraw);

        // All done.
        gl.flush();
    };

    // Camera matrix
    gl.uniformMatrix4fv(cameraMatrix, gl.FALSE, new Float32Array(Matrix.getCameraMatrix(
        new Vector(0, 0, 1),
        new Vector(0, 0, -1),
        new Vector(0, 1, 0)).conversion()));

    // Perform rotation calculations
    var rotateScene = function (event) {
        rotationAroundX = xRotationStart - yDragStart + event.clientY;
        rotationAroundY = yRotationStart - xDragStart + event.clientX;
        drawScene();
    };

    function randomInt(min,max) {

        return Math.floor(Math.random()*(max-min+1)+min);

    }

    // Because our canvas element will not change size (in this program),
    // we can set up the projection matrix once, and leave it at that.
    // Note how this finally allows us to "see" a greater coordinate range.
    // We keep the vertical range fixed, but change the horizontal range
    // according to the aspect ratio of the canvas.  We can also expand
    // the z range now.
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(Matrix.getOrthographicMatrix(
        -10 * (canvas.width / canvas.height),
        10 * (canvas.width / canvas.height),
        -10,
        10,
        -50,
        1000
    ).conversion()));

    // Set up our one light source and its colors.
    gl.uniform4fv(lightPosition, [500.0, 1000.0, 100.0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightSpecular, [1.0, 1.0, 1.0]);

    /*
     * Animates the scene.
     */
    var animationActive = false;
    var currentRotation = 0.0;
    var previousTimestamp = null;

    // Instead of animation, we do interaction: let the mouse control rotation.
    var xDragStart;
    var yDragStart;
    var xRotationStart;
    var yRotationStart;
    $(canvas).mousedown(function (event) {
        xDragStart = event.clientX;
        yDragStart = event.clientY;
        xRotationStart = rotationAroundX;
        yRotationStart = rotationAroundY;
        $(canvas).mousemove(rotateScene);
    }).mouseup(function (event) {
        $(canvas).unbind("mousemove");
    });

    // Returns a random transform object
    var randomTransform = function () {
        return {
            xt: randomInt(-2, 2),
            yt: randomInt(-2, 2),
            zt: randomInt(-2, 2),
            xs: randomInt(1, 2),
            ys: randomInt(1, 2),
            zs: randomInt(1, 2),
            angle: randomInt(0, 45),
            xr: 1,
            yr: 0,
            zr: 1
        }
    }

    // Returns a random shape
    var randomShape = function (parent) {
        var color, mode, shape, children, transform;

        color = {
            r: Math.random(),
            g: Math.random(),
            b: Math.random(),
        }

        mode = gl.TRIANGLES;

        shape = [Shapes.cylinder, Shapes.cube, Shapes.sphere, Shapes.icosahedron];
        shape = shape[randomInt(0, 3)]();

        children = [];
        if (!parent) {
            children.push(randomShape(true));
        }

        transform = randomTransform();

        return new Shape(color, mode, shape, children, transform);

    }

    // Draw the initial scene.
    drawScene();

    var arrow = { left: 37, up: 38, right: 39, down: 40 };
    var delta = 0.05;
    var xAxis = new Vector(1,0,0);
    var yAxis = new Vector(0,1,0);

    window.addEventListener('keydown', function(event) {
    event.preventDefault();
    switch (event.keyCode) {
    case arrow.up:
        var addedShape = randomShape();
        console.log(addedShape);
        objectsToDraw.push(addedShape);
        passVertices(objectsToDraw[i]);
        drawScene();
        break;
    case arrow.down:
        objectsToDraw.pop();
        drawScene();
        break;
  }
});

}(document.getElementById("hello-webgl")));