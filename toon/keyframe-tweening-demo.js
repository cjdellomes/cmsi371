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

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    var sprites = [
        {
            draw: SpriteLibrary.ball,
            parameters: {
                radius: 100,
                startingAngle: 0,
                endingAngle: Math.PI * 2,
                counterclockwise: true,
                color: "green"
            },
            keyframes: [
                {
                    frame: 0,
                    tx: 20,
                    ty: 20,
                    ease: KeyframeTweener.cubicShrink
                },

                {
                    frame: 30,
                    tx: 100,
                    ty: 50,
                    ease: KeyframeTweener.cubicGrow
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 80,
                    tx: 80,
                    ty: 500,
                    rotate: 60 // Keyframe.rotate uses degrees.
                }
            ]
        },

        {
            draw: SpriteLibrary.box,
            parameters: {

            },
            keyframes: [
                {
                    frame: 50,
                    tx: 300,
                    ty: 600,
                    sx: 0.5,
                    sy: 0.5,
                    ease: KeyframeTweener.cubicEaseIn
                },

                {
                    frame: 100,
                    tx: 300,
                    ty: 0,
                    sx: 3,
                    sy: 0.25,
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 150,
                    tx: 300,
                    ty: 600,
                    sx: 0.5,
                    sy: 0.5
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