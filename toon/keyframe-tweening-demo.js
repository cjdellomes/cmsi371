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
                    ty: 50,
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
                    ty: 50,
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
                    ty: 50,
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
                    ty: 60,
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
                        lidAngle: -90*Math.PI/180,
                        lidHeight: 20,
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
                    ease: KeyframeTweener.linear,
                    parameters: {
                        tableDimensions: { w: 300, h: 10 },
                        legDimensions: { w: 10, h: 50 },
                        color: "green"
                    }
                },

                {
                    frame: 300,
                    tx: 610,
                    ty: 500,
                    ease: KeyframeTweener.quadEaseIn,
                    parameters: {
                        tableDimensions: { w: 300, h: 10 },
                        legDimensions: { w: 10, h: 50 },
                        color: "green"
                    }
                },

                {
                    frame: 330,
                    tx: 610,
                    ty: 500,
                    parameters: {
                        tableDimensions: { w: 300, h: 10 },
                        legDimensions: { w: 10, h: 50 },
                        color: "green"
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