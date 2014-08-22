/*
 * Tests for jQuery.fracs 0.10
 * http://larsjung.de/fracs
 *
 * provided under the terms of the MIT License
 */


module("Rect");


test("constructor", function () {

    var rect1 = Fracs.Rect(30, 50, 400, 300),
        rect2 = Fracs.Rect(30.1, 50.4, 400.3, 299.5);

    strictEqual(rect1.left, 30, "left");
    strictEqual(rect1.top, 50, "top");
    strictEqual(rect1.width, 400, "width");
    strictEqual(rect1.height, 300, "height");
    strictEqual(rect1.right, 30 + 400, "right");
    strictEqual(rect1.bottom, 50 + 300, "bottom");
    strictEqual(rect1.area(), 400 * 300, "area");

    strictEqual(rect2.left, 30, "left");
    strictEqual(rect2.top, 50, "top");
    strictEqual(rect2.width, 400, "width");
    strictEqual(rect2.height, 300, "height");
    strictEqual(rect2.right, 30 + 400, "right");
    strictEqual(rect2.bottom, 50 + 300, "bottom");
    strictEqual(rect2.area(), 400 * 300, "area");
});


test("equals", function () {

    var rect1 = Fracs.Rect(30, 50, 400, 300),
        rect2 = Fracs.Rect(30.1, 50.4, 400.3, 299.5),
        rect3 = Fracs.Rect(100, 200, 400, 300);

    ok(rect1.equals(rect2), "equal rects");
    ok(!rect1.equals(rect3), "unequal rects");
});


test("intersection", function () {

    var rect1 = Fracs.Rect(30, 50, 400, 300),
        rect2 = Fracs.Rect(100, 200, 400, 300),
        intersection = Fracs.Rect(100, 200, 330, 150);

    deepEqual(rect1.intersection(rect2), intersection, "intersection");
});


test("envelope", function () {

    var rect1 = Fracs.Rect(30, 50, 400, 300),
        rect2 = Fracs.Rect(100, 200, 400, 300),
        envelope = Fracs.Rect(30, 50, 470, 450);

    deepEqual(rect1.envelope(rect2), envelope, "envelope");
});


module("Fractions");


test("constructor", function () {

    var rect1 = Fracs.Rect(30, 50, 400, 300),
        rect2 = Fracs.Rect(100, 200, 400, 300),
        rect3 = Fracs.Rect(10, 20, 40, 30),
        fr = Fracs.Fractions();

    strictEqual(fr.rects, undefined, "rects");
    strictEqual(fr.visible, 0, "visible");
    strictEqual(fr.viewport, 0, "viewport");
    strictEqual(fr.possible, 0, "possible");

    fr = Fracs.Fractions(undefined, undefined, undefined, 1, 1, 1);
    strictEqual(fr.rects, undefined, "rects");
    strictEqual(fr.visible, 0, "visible");
    strictEqual(fr.viewport, 0, "viewport");
    strictEqual(fr.possible, 0, "possible");

    fr = Fracs.Fractions(undefined, undefined, undefined, 0, 0, 1);
    strictEqual(fr.rects, undefined, "rects");
    strictEqual(fr.visible, 0, "visible");
    strictEqual(fr.viewport, 0, "viewport");
    strictEqual(fr.possible, 0, "possible");

    fr = Fracs.Fractions(undefined, undefined, undefined, 1, 1);
    strictEqual(fr.rects, undefined, "rects");
    strictEqual(fr.visible, 0, "visible");
    strictEqual(fr.viewport, 0, "viewport");
    strictEqual(fr.possible, 0, "possible");

    fr = Fracs.Fractions(rect1, rect2, rect3, 1, 1);
    strictEqual(fr.rects, undefined, "rects");
    strictEqual(fr.visible, 0, "visible");
    strictEqual(fr.viewport, 0, "viewport");
    strictEqual(fr.possible, 0, "possible");

    fr = Fracs.Fractions(rect1, rect2, rect3, 0.1, 0.2, 0.3);
    strictEqual(fr.rects.document, rect1, "rects.document");
    strictEqual(fr.rects.element, rect2, "rects.element");
    strictEqual(fr.rects.viewport, rect3, "rects.viewport");
    strictEqual(fr.visible, 0.1, "visible");
    strictEqual(fr.viewport, 0.2, "viewport");
    strictEqual(fr.possible, 0.3, "possible");
});


test("equals", function () {

    var rect1 = Fracs.Rect(30, 50, 400, 300),
        rect2 = Fracs.Rect(100, 200, 400, 300),
        rect3 = Fracs.Rect(10, 20, 40, 30),
        rect4 = Fracs.Rect(130, 150, 1400, 1300),
        rect5 = Fracs.Rect(100, 20, 40, 30),
        rect6 = Fracs.Rect(123, 20, 40, 30),
        fr1 = Fracs.Fractions(rect1, rect2, rect3, 0.1, 0.2, 0.3),
        fr2 = Fracs.Fractions(rect1, rect2, rect3, 0.1, 0.2, 0.3),
        fr3 = Fracs.Fractions(rect3, rect2, rect1, 0.1, 0.2, 0.3),
        fr4 = Fracs.Fractions(rect1, rect2, rect3, 0.2, 0.2, 0.3);

    ok(fr1.equals(fr2), "equal");
    ok(!fr1.equals(fr3), "unequal");
    ok(!fr1.equals(fr4), "unequal");

    ok(fr1.fracsEqual(fr2), "fracs equal");
    ok(fr1.fracsEqual(fr3), "fracs equal");
    ok(!fr1.fracsEqual(fr4), "fracs unequal");

    ok(fr1.rectsEqual(fr2), "rects equal");
    ok(!fr1.rectsEqual(fr3), "rects unequal");
    ok(fr1.rectsEqual(fr4), "rects equal");

});



module("static methods");

test("round", function () {

    strictEqual($.fracs.round(1.234567), 1, "round 1.234567 with no precision");
    strictEqual($.fracs.round(1.234567, -1), 1, "round 1.234567 to precision -1");
    strictEqual($.fracs.round(1.234567, 0), 1, "round 1.234567 to precision 0");
    strictEqual($.fracs.round(1.234567, 1), 1.2, "round 1.234567 to precision 1");
    strictEqual($.fracs.round(1.234567, 2), 1.23, "round 1.234567 to precision 2");
    strictEqual($.fracs.round(1.234567, 3), 1.235, "round 1.234567 to precision 3");
    strictEqual($.fracs.round(1.234567, 4), 1.2346, "round 1.234567 to precision 4");
});


module("methods");


