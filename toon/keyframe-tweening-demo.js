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
                    tx: 0,
                    ty: 40,
                    ease: KeyframeTweener.quadEaseIn,
                    parameters: {
                        radius: 35
                    }
                },

                {
                    frame: 30,
                    tx: 100,
                    ty: 450,
                    ease: KeyframeTweener.quadEaseOut,
                    parameters: {
                        radius: 35
                    }
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 60,
                    tx: 200,
                    ty: 40,
                    ease: KeyframeTweener.quadEaseIn,
                    parameters: {
                        radius: 35
                    }
                },

                {
                    frame: 90,
                    tx: 300,
                    ty: 450,
                    ease: KeyframeTweener.quadEaseOut,
                    parameters: {
                        radius: 35
                    }
                },

                {
                    frame: 120,
                    tx: 400,
                    ty: 40,
                    ease: KeyframeTweener.quadEaseIn,
                    parameters: {
                        radius: 35
                    }
                },

                {
                    frame: 150,
                    tx: 500,
                    ty: 450,
                    ease: KeyframeTweener.quadEaseOut,
                    parameters: {
                        radius: 35
                    }
                },

                {
                    frame: 180,
                    tx: 600,
                    ty: 40,
                    ease: KeyframeTweener.quadEaseIn,
                    parameters: {
                        radius: 35
                    }
                },

                {
                    frame: 210,
                    tx: 700,
                    ty: 450,
                    parameters: {
                        radius: 35
                    }
                }
            ]
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
                    frame: 300,
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
                        lidAngle: -1 * Math.PI/180,
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
            keyframes: [
                {
                    frame: 110,
                    tx: 0,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 120,
                    tx: 30,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                },

                {
                    frame: 130,
                    tx: 60,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 140,
                    tx: 90,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                },

                {
                    frame: 150,
                    tx: 120,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 160,
                    tx: 150,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                },

                {
                    frame: 170,
                    tx: 180,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 180,
                    tx: 210,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                },

                {
                    frame: 190,
                    tx: 240,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 200,
                    tx: 270,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                },

                {
                    frame: 210,
                    tx: 300,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 220,
                    tx: 330,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI  * 0.01
                    }
                },

                {
                    frame: 230,
                    tx: 330,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 240,
                    tx: 330,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI  * 0.01
                    }
                },

                {
                    frame: 250,
                    tx: 330,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 260,
                    tx: 330,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI  * 0.01
                    }
                },

                {
                    frame: 270,
                    tx: 330,
                    ty: 300,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 380,
                    tx: 600,
                    ty: 500,
                    sx: 2,
                    sy: 2,
                    parameters: {
                        startingAngle: Math.PI * 2,
                        endingAngle: Math.PI * 0.00001
                    }
                },

                {
                    frame: 430,
                    tx: 600,
                    ty: 500,
                    sx: 2,
                    sy: 2,
                    parameters: {
                        startingAngle: Math.PI * 2,
                        endingAngle: Math.PI * 0.00001
                    }
                },

                {
                    frame: 540,
                    tx: 330,
                    ty: 300,
                    sx: 0.5,
                    sy: 0.5,
                    parameters: {
                        startingAngle: Math.PI * 2,
                        endingAngle: Math.PI * 0.00001
                    }
                },

                {
                    frame: 580,
                    tx: 330,
                    ty: 300,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 590,
                    tx: 300,
                    ty: 300,
                    sx: 0.5,
                    sy: 0.5,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                },

                {
                    frame: 600,
                    tx: 270,
                    ty: 300,
                    sx: 0.4,
                    sy: 0.4,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 610,
                    tx: 240,
                    ty: 300,
                    sx: 0.3,
                    sy: 0.3,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                },

                {
                    frame: 620,
                    tx: 210,
                    ty: 300,
                    sx: 0.2,
                    sy: 0.2,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 630,
                    tx: 180,
                    ty: 300,
                    sx: 0.1,
                    sy: 0.1,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                },

                {
                    frame: 640,
                    tx: 150,
                    ty: 300,
                    sx: 0.1,
                    sy: 0.1,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 650,
                    tx: 120,
                    ty: 300,
                    sx: 0.1,
                    sy: 0.1,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                },

                {
                    frame: 660,
                    tx: 90,
                    ty: 300,
                    sx: 0.1,
                    sy: 0.1,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 670,
                    tx: 60,
                    ty: 300,
                    sx: 0.1,
                    sy: 0.1,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
                    }
                },

                {
                    frame: 680,
                    tx: 30,
                    ty: 300,
                    sx: 0.1,
                    sy: 0.1,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.5,
                        endingAngle: Math.PI * 0.5
                    }
                },

                {
                    frame: 690,
                    tx: 0,
                    ty: 300,
                    sx: 0.1,
                    sy: 0.1,
                    rotate: 180,
                    parameters: {
                        startingAngle: Math.PI * 1.99,
                        endingAngle: Math.PI * 0.01
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