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

    /*
    * Pacman and the ball require repetetive keyframes
    * Decided to create the keyframes using loops
    * Makes for more compact code
    */

    var ballKeyframes = function() { 
        arr = [];

        // Ball bouncing keyframes
        for (var i = 0; i <= 7; i++) {
            var ty;
            var ease;
            if (i % 2 == 0) {
                ty = 40;
                ease = KeyframeTweener.cubicEaseIn;
            } else {
                ty = 450;
                ease = KeyframeTweener.cubicEaseOut;
            }
            arr.push({
                frame: i * 30,
                tx: i * 100,
                ty: ty,
                ease: ease,
                parameters: {
                    radius: 35
                }
            });
        }

        return arr;
    }

    var pacmanKeyframes = function () {
        arr = [];
        var startingAngle;
        var endingAngle;

        // Pacman chasing ball keyframes
        for (var i = 0; i <= 11; i++) {
            var frame = 110;
            if (i % 2 == 0) {
                startingAngle = Math.PI * 1.5;
                endingAngle = Math.PI * 0.5;
            } else {
                startingAngle = Math.PI * 1.99;
                endingAngle = Math.PI * 0.01;
            }
            arr.push({
                frame: frame + (10 * i),
                tx: i * 30,
                ty: 300,
                parameters: {
                    startingAngle: startingAngle,
                    endingAngle: endingAngle
                }
            });
        }

        // Pacman stalling outside box keyframes
        for (var i = 0; i <= 7; i++) {
            var frame = 220;
            var ease = KeyframeTweener.linear;
            if (i % 2 == 0) {
                startingAngle = Math.PI * 1.99;
                endingAngle = Math.PI * 0.01;
            } else {
                startingAngle = Math.PI * 1.5;
                endingAngle = Math.PI * 0.5;
            }
            if (i == 7) {
                ease = KeyframeTweener.cubicEaseOut;
            }
            arr.push({
                frame: frame + (10 * i),
                tx: 330,
                ty: 300,
                ease: ease,
                parameters: {
                    startingAngle: startingAngle,
                    endingAngle: endingAngle
                }
            });
        }

        // Pacman eating stuff keyframes
        for (var i = 0; i <= 2; i++) {
            var scale;
            var tx;
            var ty;
            var ease;
            var frame = 380;
            if (i < 2) {
                tx = 600;
                ty = 500;
                scale = 2;
            } else {
                tx = 330;
                ty = 300;
                scale = 0.5
            }
            if (i == 1) {
                frame += 50;
                ease = KeyframeTweener.cubicEaseIn;
            } else if (i == 2) {
                frame += 150;
                ease = KeyframeTweener.cubicEaseOut;
            }
            arr.push({
                frame: frame,
                tx: tx,
                ty: ty,
                sx: scale,
                sy: scale,
                ease: ease,
                parameters: {
                    startingAngle: Math.PI * 2,
                    endingAngle: Math.PI * 0.00001
                }
            })
        }

        // Pacman leaving keyframes
        var scale = 0.5;
        for (var i = 0; i <= 12; i++) {
            var frame = 580;
            if (i % 2 == 0) {
                startingAngle = Math.PI * 1.5;
                endingAngle = Math.PI * 0.5;
            } else {
                startingAngle = Math.PI * 1.99;
                endingAngle = Math.PI * 0.01;
            }
            if (i > 1 && i < 6) {
                scale -= 0.1;
            }
            arr.push({
                frame: 580 + (10 * i),
                tx: 330 - (30 * i),
                ty: 300,
                sx: scale,
                sy: scale,
                rotate: 180,
                parameters: {
                    startingAngle: startingAngle,
                    endingAngle: endingAngle
                }
            });
        }

        return arr;
    }

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.

    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes which contain the keyframe sprite parameters.
    var sprites = [
        {
            draw: SpriteLibrary.ball,
            keyframes: ballKeyframes(),
        },

        {
            draw: SpriteLibrary.box,
            keyframes: [
                {
                    frame: 0,
                    tx: 610,
                    ty: 350,
                    parameters: {
                        boxDimensions: { w: 200, h: 150 },
                        lidHeight: 20,
                        lidAngle: -90*Math.PI/180,
                        color: "orange"
                    }
                },

                {
                    frame: 230,
                    tx: 610,
                    ty: 350,
                    parameters: {
                        lidHeight: 20,
                        lidAngle: -90*Math.PI/180,
                        color: "orange"
                    }
                },

                {
                    frame: 250,
                    tx: 610,
                    ty: 350,
                    parameters: {
                        lidHeight: 20,
                        lidAngle: -1*Math.PI/180,
                        color: "orange"
                    }
                },

                {
                    frame: 380,
                    tx: 610,
                    ty: 350,
                    parameters: {
                        lidHeight: 20,
                        lidAngle: -1*Math.PI/180,
                        color: "orange"
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.table,
            keyframes: [
                {
                    frame: 0,
                    tx: 610,
                    ty: 500,
                    ease: KeyframeTweener.quadEaseIn,
                    parameters: {
                        tableDimensions: { w: 300, h: 10 },
                        legDimensions: { w: 10, h: 50 },
                    }
                },

                {
                    frame: 380,
                    tx: 610,
                    ty: 500,
                    ease: KeyframeTweener.quadEaseIn,
                    parameters: {
                        tableDimensions: { w: 300, h: 10 },
                        legDimensions: { w: 10, h: 50 },
                    }
                }
            ]
        },

        {
            draw: SpriteLibrary.pacman,
            keyframes: pacmanKeyframes()
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