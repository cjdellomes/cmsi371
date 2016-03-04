/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas");

    // First, a selection of "drawing functions" from which we
    // can choose.  Their common trait: they all accept a single
    // renderingContext argument.
    var square = function (renderingContext) {
        renderingContext.fillStyle = "blue";
        renderingContext.fillRect(-20, -20, 40, 40);
    };

    var circle = function (renderingContext) {
        renderingContext.strokeStyle = "red";
        renderingContext.beginPath();
        renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
        renderingContext.stroke();
    };

    window.SpriteLibrary =  window.SpriteLibrary || {};
    SpriteLibrary.ball = function (ball) {

        renderingContext = ball.renderingContext || document.getElementById("canvas").getContext("2d");

        renderingContext.save();

        color = ball.color || "blue";
        radius = ball.radius || 100;
        startingAngle = ball.startingAngle || 0;
        endingAngle = ball.endingAngle || Math.PI * 2;
        counterClockwise = ball.counterClockwise || false;

        renderingContext.fillStyle = color;
        renderingContext.beginPath();
        renderingContext.arc(0, 0, radius,
            startingAngle, endingAngle, counterClockwise);
        renderingContext.closePath();
        renderingContext.fill();

        renderingContext.restore();
    };

    window.SpriteLibrary = window.SpriteLibrary || {};
    SpriteLibrary.box = function (box) {

        renderingContext = box.renderingContext || document.getElementById("canvas").getContext("2d");

        renderingContext.save();

        color = box.color || "blue";
        boxDimensions = box.boxDimensions || { w: 200, h: 150 };
        lidHeight = box.lidHeight || 15;
        lidAngle = box.lidAngle || -30 * Math.PI / 180;

        renderingContext.fillStyle = color;
        renderingContext.fillRect(0, 0,
            boxDimensions.w, boxDimensions.h);
        renderingContext.translate(0, 0);
        renderingContext.rotate(lidAngle);
        renderingContext.translate(0, 0)
        renderingContext.fillRect(0, -(boxDimensions.h * .11), 
            boxDimensions.w, lidHeight);

        renderingContext.restore();
    };

    window.SpriteLibrary = window.SpriteLibrary || {};
    SpriteLibrary.pacman = function (pacman) {

        renderingContext = pacman.renderingContext || document.getElementById("canvas").getContext("2d");

        renderingContext.save();

        color = pacman.color || "yellow";
        radius = pacman.radius || 200;
        startingAngle = pacman.startingAngle || Math.PI * 1.75;
        endingAngle = pacman.endingAngle || Math.PI * 0.25;
        counterclockwise = pacman.counterclockwise || true;

        renderingContext.fillStyle = color;
        renderingContext.beginPath();
        renderingContext.moveTo(0, 0);
        renderingContext.arc(0, 0, radius, startingAngle, 
            endingAngle, counterclockwise);
        renderingContext.lineTo(0, 0);
        renderingContext.closePath();
        renderingContext.fill();

        renderingContext.restore();
    };

    window.SpriteLibrary = window.SpriteLibrary || {};
    SpriteLibrary.table = function (table) {

        renderingContext = table.renderingContext || document.getElementById("canvas").getContext("2d");

        renderingContext.save();

        color = table.color || "brown";
        tableDimensions = table.tableDimensions || { w: 300, h: 10 };
        legDimensions = table.legDimensions || { w: 10, h: 50};

        renderingContext.fillStyle = color;
        renderingContext.fillRect(0, 0, 
            tableDimensions.w, tableDimensions.h);
        renderingContext.fillRect(0, tableDimensions.h, 
            legDimensions.w, legDimensions.h);
        renderingContext.fillRect(tableDimensions.w - legDimensions.w, 
            tableDimensions.h, legDimensions.w, legDimensions.h);

        renderingContext.restore();
    };

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes which contain the keyframe sprite parameters.
    var sprites = [
        {
            draw: SpriteLibrary.ball,
            keyframes: [
                {
                    frame: 0,
                    tx: 20,
                    ty: 20,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        radius: 10
                    }
                },

                {
                    frame: 30,
                    tx: 100,
                    ty: 50,
                    ease: KeyframeTweener.quadEaseOut,
                    parameters: {
                        radius: 200
                    }
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 80,
                    tx: 80,
                    ty: 500,
                    rotate: 60, // Keyframe.rotate uses degrees.
                    parameters: {
                        radius: 10
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.box,
            keyframes: [
                {
                    frame: 50,
                    tx: 300,
                    ty: 600,
                    sx: 1,
                    sy: 1,
                    ease: KeyframeTweener.cubicEaseOut,
                    parameters: {
                        boxDimensions: { w: 200, h: 150 },
                        lidHeight: 20,
                        lidAngle: -90*Math.PI/180,
                        color: "orange"
                    }
                },

                {
                    frame: 100,
                    tx: 300,
                    ty: 200,
                    sx: 1,
                    sy: 1,
                    ease: KeyframeTweener.quadEaseIn,
                    parameters: {
                        lidHeight: 20,
                        lidAngle: -40*Math.PI/180,
                        color: "orange"
                    }
                },

                {
                    frame: 300,
                    tx: 300,
                    ty: 400,
                    sx: 0.5,
                    sy: 0.5,
                    parameters: {
                        lidHeight: 20,
                        lidAngle: -10*Math.PI/180,
                        color: "orange"
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.pacman,
            keyframes: [
                {
                    frame: 70,
                    tx: 100,
                    ty: 400,
                    sx: 1,
                    sy: 1,
                    ease: KeyframeTweener.cubicEaseOut,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 130,
                    tx: 800,
                    ty: 500,
                    sx: 1,
                    sy: 1,
                    ease: KeyframeTweener.quadEaseIn,
                    parameters: {
                        startingAngle: Math.PI * 1.75,
                        endingAngle: Math.PI * 0.25
                    }
                },

                {
                    frame: 190,
                    tx: 100,
                    ty: 400,
                    sx: 0.5,
                    sy: 0.5,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.table,
            keyframes: [
                {
                    frame: 120,
                    tx: 200,
                    ty: 300,
                    ease: KeyframeTweener.linear,
                    parameters: {
                        tableDimensions: { w: 300, h: 10 },
                        legDimensions: { w: 10, h: 50 },
                        color: "green"
                    }
                },

                {
                    frame: 145,
                    tx: 300,
                    ty: 300,
                    ease: KeyframeTweener.quadEaseIn,
                    parameters: {

                    }
                },

                {
                    frame: 185,
                    tx: 100,
                    ty: 300,
                    parameters: {

                    }
                }
            ]
        }
    ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites
    });
}());