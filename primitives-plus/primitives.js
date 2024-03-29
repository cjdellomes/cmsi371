/*
 * A module demonstrating assorted algorithms for selected 2D graphics
 * operations.
 */
var Primitives = {
    /*
     * This is the cornerstone: we promise not to use any other graphics
     * operation but this one.
     */
    setPixel: function (context, x, y, r, g, b) {
        context.save();
        context.fillStyle = "rgb(" + parseInt(r, 10) + "," +
                parseInt(g, 10) + "," + parseInt(b, 10) + ")";
        context.fillRect(x, y, 1, 1);
        context.restore();
    },

    /*
     * The easy fill case: rectangles.  We take advantage of JavaScript's
     * "optional" parameter mechanism to keep things at a single method.
     */
    fillRect: function (context, x, y, w, h, c1, c2, c3, c4) {
        var module = this;
        var i;
        var j;
        var bottom = y + h;
        var right = x + w;
        var leftc1 = c1 ? [c1[0], c1[1], c1[2]] : c1;
        var rightc1 = c2 ? [c2[0], c2[1], c2[2]] : c2;
        var leftVDelta;
        var rightVDelta;
        var hDelta;
        var currentc1;

        // We have four subcases: zero, one, two, or four c1s
        // supplied.  The three-c1 case will be treated as if
        // the third and fourth c1s are the same.  Instead of
        // embedding different logic into a single loop, we just
        // break them up.  This allows each case to be "optimal"
        // and simplifies reading the code.  There *is* some
        // duplicate code, but in this case the benefits outweigh
        // the cost.
        var fillRectNoc1 = function () {
            // The rendering context will just ignore the
            // undefined c1s in this case.
            for (i = y; i < bottom; i += 1) {
                for (j = x; j < right; j += 1) {
                    module.setPixel(context, j, i);
                }
            }
        };

        var fillRectOnec1 = function () {
            // Single c1 all the way through.
            for (i = y; i < bottom; i += 1) {
                for (j = x; j < right; j += 1) {
                    module.setPixel(context, j, i, c1[0], c1[1], c1[2]);
                }
            }
        };

        var fillRectTwoc1s = function () {
            // This modifies the c1 vertically only.
            for (i = y; i < bottom; i += 1) {
                for (j = x; j < right; j += 1) {
                    module.setPixel(context, j, i,
                            leftc1[0],
                            leftc1[1],
                            leftc1[2]);
                }

                // Move to the next level of the gradient.
                leftc1[0] += leftVDelta[0];
                leftc1[1] += leftVDelta[1];
                leftc1[2] += leftVDelta[2];
            }
        };

        var fillRectFourc1s = function () {
            for (i = y; i < bottom; i += 1) {
                // Move to the next "vertical" c1 level.
                currentc1 = [leftc1[0], leftc1[1], leftc1[2]];
                hDelta = [(rightc1[0] - leftc1[0]) / w,
                          (rightc1[1] - leftc1[1]) / w,
                          (rightc1[2] - leftc1[2]) / w];

                for (j = x; j < right; j += 1) {
                    module.setPixel(context, j, i,
                            currentc1[0],
                            currentc1[1],
                            currentc1[2]);

                    // Move to the next c1 horizontally.
                    currentc1[0] += hDelta[0];
                    currentc1[1] += hDelta[1];
                    currentc1[2] += hDelta[2];
                }

                // The c1 on each side "grades" at different rates.
                leftc1[0] += leftVDelta[0];
                leftc1[1] += leftVDelta[1];
                leftc1[2] += leftVDelta[2];
                rightc1[0] += rightVDelta[0];
                rightc1[1] += rightVDelta[1];
                rightc1[2] += rightVDelta[2];
            }
        };

        // Depending on which c1s are supplied, we call a different
        // version of the fill code.
        if (!c1) {
            fillRectNoc1();
        } else if (!c2) {
            fillRectOnec1();
        } else if (!c3) {
            // For this case, we set up the left vertical deltas.
            leftVDelta = [(c2[0] - c1[0]) / h,
                      (c2[1] - c1[1]) / h,
                      (c2[2] - c1[2]) / h];
            fillRectTwoc1s();
        } else {
            // The four-c1 case, with a quick assignment in case
            // there are only three c1s.
            c4 = c4 || c3;

            // In primitives, one tends to see repeated code more
            // often than function calls, because this is the rare
            // situation where function call overhead costs more
            // than repeated code.
            leftVDelta = [(c3[0] - c1[0]) / h,
                      (c3[1] - c1[1]) / h,
                      (c3[2] - c1[2]) / h];
            rightVDelta = [(c4[0] - c2[0]) / h,
                      (c4[1] - c2[1]) / h,
                      (c4[2] - c2[2]) / h];
            fillRectFourc1s();
        }
    },

    /*
     * Here come our line-drawing primitives.  Note, for simplicity, that
     * we code for a specific case of a diagonal line going up.  Other cases
     * either switch directions or have specific optimizations (e.g., strictly
     * horizontal and vertical lines).
     */

    // Our digital-differential analyzer (DDA) version.
    lineDDA: function (context, x1, y1, x2, y2, c1) {
        var steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        var dx = (x2 - x1) / steps;
        var dy = (y2 - y1) / steps;
        var x = x1;
        var y = y1;
        var i;

        c1 = c1 || [0, 0, 0];
        for (i = 0; i <= steps; i += 1) {
            this.setPixel(context, x, y, c1[0], c1[1], c1[2]);
            x += dx;
            y += dy;
        }
    },

    // Bresenham algorithm version 1.
    lineBres1: function (context, x1, y1, x2, y2, c1) {
        var x = x1;
        var y = y1;
        var dx = x2 - x1;
        var dy = y1 - y2;
        var err = 0;

        c1 = c1 || [0, 0, 0];
        while (true) {
            this.setPixel(context, x, y, c1[0], c1[1], c1[2]);
            if (x === x2) {
                return;
            }

            x += 1;
            err += dy / dx;
            if (err >= 0.5) {
                y -= 1;
                err -= 1;
            }
        }
    },

    // Bresenham algorithm version 2.
    lineBres2: function (context, x1, y1, x2, y2, c1) {
        var x = x1;
        var y = y1;
        var dx = x2 - x1;
        var dy = y1 - y2;
        var err = 0;

        c1 = c1 || [0, 0, 0];
        while (true) {
            this.setPixel(context, x, y, c1[0], c1[1], c1[2]);
            if (x === x2) {
                return;
            }

            x += 1;
            // Note how this is "multiplying 2 * dx to both sides" when
            // compared to Bresenham 1.
            err += (2 * dy);
            if (err >= dx) {
                y -= 1;
                err -= (2 * dx);
            }
        }
    },

    // Bresenham algorithm version 3.
    lineBres3: function (context, x1, y1, x2, y2, c1) {
        var x = x1;
        var y = y1;
        var dx = x2 - x1;
        var dy = y1 - y2;
        var err = 0;

        c1 = c1 || [0, 0, 0];
        while (true) {
            this.setPixel(context, x, y, c1[0], c1[1], c1[2]);
            if (x === x2) {
                return;
            }

            x += 1;
            // This one does the comparison first, then adjusts err
            // based on that comparison.
            if (err >= dx - 2 * dy) {
                y -= 1;
                err += (2 * dy - 2 * dx);
            } else {
                err += (2 * dy);
            }
        }
    },

    // The final, optimized Bresenham algorithm: here, we presave
    // most values, and adjust them to compare only to zero.
    lineBresenham: function (context, x1, y1, x2, y2, c1) {
        var x = x1;
        var y = y1;
        var dx = x2 - x1;
        var dy = y1 - y2;
        var k1 = dy << 1; // dy divided by 2.
        var err = k1 - dx;
        var k2 = (dy - dx) << 1; // dy - dx divided by 2.

        c1 = c1 || [0, 0, 0];
        while (true) {
            this.setPixel(context, x, y, c1[0], c1[1], c1[2]);
            if (x === x2) {
                return;
            }

            x += 1;
            if (err < 0) {
                err += k1;
            } else {
                y -= 1;
                err += k2;
            }
        }
    },

    /*
     * Time for the circles.  First, we observe that it is sufficient
     * to compute one-eighth of a circle: the other seven portions are
     * permutations of that eighth's coordinates.  So we define a helper
     * function that all of the circle implementations will use...
     */
    plotCirclePoints: function (context, xc, yc, x, y, c1, c2, c3, c4) {
        var leftVDelta;
        var rightVDelta;
        var hDelta;
        var currentColor;
        c1 = c1;
        c2 = c2 || c1;
        c3 = c3 || c2;
        c4 = c4 || c3;
        var leftColor = c1;
        var rightColor = c2;

        currentColor = [leftColor[0], leftColor[1], leftColor[2]];
        hDelta = [(rightColor[0] - leftColor[0]) / x,
                          (rightColor[1] - leftColor[1]) / x,
                          (rightColor[2] - leftColor[2]) / x]

        leftVDelta = [(c3[0] - c1[0]) / y,
                      (c3[1] - c1[1]) / y,
                      (c3[2] - c1[2]) / y];
        rightVDelta = [(c4[0] - c2[0]) / y,
                      (c4[1] - c2[1]) / y,
                      (c4[2] - c2[2]) / y];

        for (var i = 0; i < x; i++) {
            this.setPixel(context, xc + i, yc + y, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc + i, yc - y, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc + y, yc + i, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc - y, yc + i, currentColor[0], currentColor[1], currentColor[2]);
            currentColor[0] += hDelta[0];
            currentColor[1] += hDelta[1];
            currentColor[2] += hDelta[2];
        }

        currentColor = [leftColor[0], leftColor[1], leftColor[2]];
        hDelta = [(rightColor[0] - leftColor[0]) / x,
                          (rightColor[1] - leftColor[1]) / x,
                          (rightColor[2] - leftColor[2]) / x]

        leftVDelta = [(c3[0] - c1[0]) / y,
                      (c3[1] - c1[1]) / y,
                      (c3[2] - c1[2]) / y];
        rightVDelta = [(c4[0] - c2[0]) / y,
                      (c4[1] - c2[1]) / y,
                      (c4[2] - c2[2]) / y];

        for (var  i = 0; i < x; i++) {
            this.setPixel(context, xc + y, yc - i, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc - i, yc + y, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc - i, yc - y, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc - y, yc - i, currentColor[0], currentColor[1], currentColor[2]);
            currentColor[0] += hDelta[0];
            currentColor[1] += hDelta[1];
            currentColor[2] += hDelta[2];
        }

        currentColor = [leftColor[0], leftColor[1], leftColor[2]];
        hDelta = [(rightColor[0] - leftColor[0]) / y,
                          (rightColor[1] - leftColor[1]) / y,
                          (rightColor[2] - leftColor[2]) / y]

        leftVDelta = [(c3[0] - c1[0]) / x,
                      (c3[1] - c1[1]) / x,
                      (c3[2] - c1[2]) / x];
        rightVDelta = [(c4[0] - c2[0]) / x,
                      (c4[1] - c2[1]) / x,
                      (c4[2] - c2[2]) / x];

        for (var j = 0; j < y; j++) {
            this.setPixel(context, xc + x, yc + j, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc + j, yc + x, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc + j, yc - x, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc - x, yc + j, currentColor[0], currentColor[1], currentColor[2]);
            currentColor[0] += hDelta[0];
            currentColor[1] += hDelta[1];
            currentColor[2] += hDelta[2];
            leftColor[0] += leftVDelta[0];
            leftColor[1] += leftVDelta[1];
            leftColor[2] += leftVDelta[2];
            rightColor[0] += rightVDelta[0];
            rightColor[1] += rightVDelta[1];
            rightColor[2] += rightVDelta[2];
        }

        currentColor = [leftColor[0], leftColor[1], leftColor[2]];
        hDelta = [(rightColor[0] - leftColor[0]) / y,
                          (rightColor[1] - leftColor[1]) / y,
                          (rightColor[2] - leftColor[2]) / y]

        leftVDelta = [(c3[0] - c1[0]) / x,
                      (c3[1] - c1[1]) / x,
                      (c3[2] - c1[2]) / x];
        rightVDelta = [(c4[0] - c2[0]) / x,
                      (c4[1] - c2[1]) / x,
                      (c4[2] - c2[2]) / x];

        for (var j = 0; j < y; j++) {
            this.setPixel(context, xc + x, yc - j, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc - x, yc - j, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc - j, yc + x, currentColor[0], currentColor[1], currentColor[2]);
            this.setPixel(context, xc - j, yc - x, currentColor[0], currentColor[1], currentColor[2]);
            currentColor[0] += hDelta[0];
            currentColor[1] += hDelta[1];
            currentColor[2] += hDelta[2];
            leftColor[0] += leftVDelta[0];
            leftColor[1] += leftVDelta[1];
            leftColor[2] += leftVDelta[2];
            rightColor[0] += rightVDelta[0];
            rightColor[1] += rightVDelta[1];
            rightColor[2] += rightVDelta[2];
        }
    },

    // First, the most naive possible implementation: circle by trigonometry.
    circleTrig: function (context, xc, yc, r, c1, c2, c3, c4) {
        var theta = 1 / r;

        // At the very least, we compute our sine and cosine just once.
        var s = Math.sin(theta);
        var c = Math.cos(theta);

        // We compute the first octant, from zero to pi/4.
        var x = r;
        var y = 0;

        while (x >= y) {
            this.plotCirclePoints(context, xc, yc, x, y, c1, c2, c3, c4);
            x = x * c - y * s;
            y = x * s + y * c;
        }
    },

    // Now DDA.
    circleDDA: function (context, xc, yc, r, c1, c2, c3, c4) {
        var epsilon = 1 / r;
        var x = r;
        var y = 0;

        while (x >= y) {
            this.plotCirclePoints(context, xc, yc, x, y, c1, c2, c3, c4);
            x = x - (epsilon * y);
            y = y + (epsilon * x);
        }
    },

    // One of three Bresenham-like approaches.
    circleBres1: function (context, xc, yc, r, c1, c2, c3, c4) {
        var p = 3 - 2 * r;
        var x = 0;
        var y = r;

        while (x < y) {
            this.plotCirclePoints(context, xc, yc, x, y, c1, c2, c3, c4);
            if (p < 0) {
                p = p + 4 * x + 6;
            } else {
                p = p + 4 * (x - y) + 10;
                y -= 1;
            }
            x += 1;
        }
        if (x === y) {
            this.plotCirclePoints(context, xc, yc, x, y, c1, c2, c3, c4);
        }
    },

    // And another...
    circleBres2: function (context, xc, yc, r, c1, c2, c3, c4) {
        var x = 0;
        var y = r;
        var e = 1 - r;
        var u = 1;
        var v = e - r;

        while (x <= y) {
            this.plotCirclePoints(context, xc, yc, x, y, c1, c2, c3, c4);
            if (e < 0) {
                x += 1;
                u += 2;
                v += 2;
                e += u;
            } else {
                x += 1;
                y -= 1;
                u += 2;
                v += 4;
                e += v;
            }
        }
    },

    // Last but not least...
    circleBres3: function (context, xc, yc, r, c1, c2, c3, c4) {
        var x = r;
        var y = 0;
        var e = 0;

        while (y <= x) {
            this.plotCirclePoints(context, xc, yc, x, y, c1, c2, c3, c4);
            y += 1;
            e += (2 * y - 1);
            if (e > x) {
                x -= 1;
                e -= (2 * x + 1);
            }
        }
    },

    /*
     * Now, the big one: a general polygon-filling algorithm.
     * We expect the polygon to be an array of objects with x
     * and y properties.
     */

    // For starters, we need an Edge helper object.
    Edge: function (p1, p2) {
        this.maxY = Math.max(p1.y, p2.y);
        this.minY = Math.min(p1.y, p2.y);
        this.horizontal = (p1.y === p2.y);
        if (!this.horizontal) {
            this.inverseSlope = (p2.x - p1.x) / (p2.y - p1.y);
        }

        // The initial x coordinate is the x coordinate of the
        // point with the lower y value.
        this.currentX = (p1.y === this.minY) ? p1.x : p2.x;
    },

    // Now to the function itself.
    fillPolygon: function (context, polygon, c1) {
        var Edge = this.Edge; // An alias for convenience.

        /*
         * A useful helper function: this "snaps" a given y coordinate
         * to its nearest scan line.
         */
        var toScanLine = function (y) {
            return Math.ceil(y);
        };

        /*
         * We will need to sort edges by x coordinate.
         */
        var xComparator = function (edge1, edge2) {
            return edge1.currentX - edge2.currentX;
        };

        /*
         * We will need to do "array difference:" return an array whose
         * elements are in the first array but not in the second.
         */
        var arrayDifference = function (array1, array2) {
            return array1.filter(function (element) {
                return array2.indexOf(element) < 0;
            });
        };

        /*
         * An important helper function: this moves the edges whose
         * minimum y match the given scan line from the source
         * list to the destination. We assume that the source list
         * is sorted by minimum y.
         */
        var moveMatchingMinYs = function (src, dest, targetY) {
            for (var i = 0, max = src.length; i < max; i += 1) {
                if (toScanLine(src[i].minY) === targetY) {
                    dest.push(src[i]);
                } else if (toScanLine(src[i].minY) > targetY) {
                    // We can bail immediately because the global edge list is sorted.
                    break;
                }
            }

            // Eliminate the moved edges from the source array; this is
            // the function's result.
            return arrayDifference(src, dest);
        };

        var globalEdgeList = []; // List of all edges.
        var activeEdgeList = []; // List of all edges currently being scanned.
        var i;                   // Reusable index variable.
        var max;                 // Another reusable variable, for loop maximums.
        var anEdge;              // Temporary edge holder.
        var currentScanLine;     // The scan line that is being drawn.
        var drawPixel;           // Whether we are supposed to plot something.
        var fromX;               // The starting x coordinate of the current scan line.
        var toX;                 // The ending x coordinate of the current scan line.
        var x;                   // Another reusable index variable, for drawing.
        var edgesToRemove;       // For use when, well, removing edges from a list.

        // The usual c1 guard.
        c1 = c1 || [0, 0, 0];

        // Create the global edge list.
        for (i = 0, max = polygon.length; i < max; i += 1) {
            // If we are at the last vertex, we go back to the first one.
            anEdge = new Edge(polygon[i], polygon[(i + 1) % polygon.length]);

            // We skip horizontal edges; they get drawn "automatically."
            if (!anEdge.horizontal) {
                globalEdgeList.push(anEdge);
            }
        }

        // Sort the list from top to bottom.
        globalEdgeList.sort(function (edge1, edge2) {
            if (edge1.minY !== edge2.minY) {
                return (edge1.minY - edge2.minY);
            } else {
                // If the minimum y's are the same, then the edge with the
                // smaller x value goes first.
                return (edge1.currentX - edge2.currentX);
            }
        });

        // We start at the lowest y coordinate.
        currentScanLine = toScanLine(globalEdgeList[0].minY);

        // Initialize the active edge list.
        globalEdgeList = moveMatchingMinYs(globalEdgeList, activeEdgeList, currentScanLine);

        // Start scanning!
        drawPixel = false;
        while (activeEdgeList.length) {
            fromX = Number.MAX_VALUE;
            for (i = 0, max = activeEdgeList.length; i < max; i += 1) {
                // If we're drawing pixels, we draw until we reach the x
                // coordinate of this edge. Otherwise, we just remember where we
                // are then move on.
                if (drawPixel) {
                    toX = toScanLine(activeEdgeList[i].currentX);

                    // No cheating here --- draw each pixel, one by one.
                    for (x = fromX; x <= toX; x += 1) {
                        this.setPixel(context, x, currentScanLine,
                                c1[0], c1[1], c1[2]);
                    }
                } else {
                    fromX = toScanLine(activeEdgeList[i].currentX);
                }
                drawPixel = !drawPixel;
            }

            // If we get out of this loop and drawPixel is true, then we
            // encountered an odd number of edges, and need to draw a single
            // pixel.
            if (drawPixel) {
                this.setPixel(context, fromX, currentScanLine, c1);
                drawPixel = !drawPixel;
            }

            // Go to the next scan line.
            currentScanLine += 1;

            // Remove edges for which we have reached the maximum y.
            edgesToRemove = [];
            for (i = 0, max = activeEdgeList.length; i < max; i += 1) {
                if (toScanLine(activeEdgeList[i].maxY) === currentScanLine) {
                    edgesToRemove.push(activeEdgeList[i]);
                }
            }
            activeEdgeList = arrayDifference(activeEdgeList, edgesToRemove);

            // Add edges for which we have reached the minimum y.
            globalEdgeList = moveMatchingMinYs(globalEdgeList, activeEdgeList, currentScanLine);

            // Update the x coordinates of the active edges.
            for (i = 0, max = activeEdgeList.length; i < max; i += 1) {
                activeEdgeList[i].currentX += activeEdgeList[i].inverseSlope;
            }

            // Re-sort the edge list.
            activeEdgeList.sort(xComparator);
        }
    }

};
