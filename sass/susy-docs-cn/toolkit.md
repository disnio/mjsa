Toolkit
=======
Span [mixin]
------------
设置元素跨越布局的那部分。
将添 floats, widths, and margins.

Arbitrary Widths
~~~~~~~~~~~~~~~~
  // 设置绝对宽度
  .item { @include span(25%); }

  // float output (without gutters)
  .item {
    float: left;
    width: 25%;
  }

Grid Widths
~~~~~~~~~~~
设置跨越的网格宽度
  // grid span
  .item { @include span(3); }

  // output (7-column grid with 1/2 gutters after)
  .item {
    float: left;
    width: 40%;
    margin-right: 5%;
  }

Row Edges
~~~~~~~~~
行边界的处理
标记 ``first`` or ``last``
移除额外的间隙在两边

  // grid span
  @include span(last 3);

  // output (same 7-column grid)
  .item {
    float: right;
    width: 40%;
    margin-right: 0;
  }

也可以使用``alpha`` and ``omega``代替 ``first`` and ``last``.

Context
~~~~~~~
使用流体布局是需要上下文
嵌套栅格在其他元素内部

  // 10-column grid
  .outer {
    @include span(5);
    .inner { @include span(2 of 5); }
  }

``of`` 标识上下文，总是等于父元素的栅格
In some cases, you can imply changes in context
by nesting elements inside the span tag itself:

  // 10-column grid
  .outer {
    // out here, the context is 10
    @include span(5) {
      // in here, the context is 5
      .inner { @include span(2); }
    }
  }

Nesting
~~~~~~~

栅格有 ``inside``, ``inside-static``, or ``split`` gutters
嵌套情况下，元素将会影响值元素的栅格排列，那么需要标记 ``nest``:

  // inside, inside-static, or split gutters
  .outer {
    @include span(5 nest);
    .inner { @include span(2 of 5); }
  }

Location
~~~~~~~~

非对称栅格和独立输出也需要知道具体跨域的位置
在两种情况下使用 ``at`` 去设置位置

独立情况下可以使用具体宽度或列索引。
非对称位置必须是列索引

  .width { @include span(isolate 500px at 25%); }
  .index { @include span(isolate 3 at 2); }

narrow, wide, and wider
~~~~~~~~~~~~~~~~~~~~~~~
多少间隙包括在跨度内部

  // grid span
  .narrow { @include span(2); } 包含内部间隙，默认
  .wide { @include span(2 wide); } 等同列数的间隙
  .wider { @include span(2 wider); } 两边间隙都包含

  // width output (7 columns, .25 gutters)
  // (each column is 10%, and each gutter adds 2.5%)
  .narrow { width: 22.5%; }
  .wide { width: 25%; }
  .wider { width: 27.5%; }

If you are using inside gutters,
the spans are wide by default
but can be overridden manually.

Other Settings
~~~~~~~~~~~~~~

 ``full`` 跨域整个上下文可用
 ``break`` 清除以前的幅度开始新的一行
 ``nobreak`` 不清除
 ``no-gutters``从跨度中移除间隙
 ``border-box`` or ``content-box``改变:`box-sizing`

可以设置具体的间隙映射覆盖 ``(gutter-override: 1.5em)``)

  // grid span
  .item { @include span(isolate 4 at 2 of 8 (4em 1em) inside rtl break); }

  // output
  .item {
    clear: both;
    float: right;
    width: 50%;
    padding-left: .5em;
    padding-right: .5em;
    margin-left: 25%;
    margin-right: -100%;
  }


-------------------------------------------------------------------------

Span [function]
---------------
仅返回宽度值,

  .item {
    width: span(2);
    margin-left: span(3 wide);
    margin-right: span(1) + 25%;
  }


-------------------------------------------------------------------------

Gutters
-------

Use ``gutter`` or ``gutters``
返回间隙的宽度
given your settings and current context.

  // default context
  margin-left: gutter();

  // nested in a 10-column context
  margin-left: gutter(10);

Use the **mixin** version
to apply gutters to any element.
Gutters are output
as ``margin`` or ``padding``
depending on the ``gutter-position`` setting.

  // default gutters
  .item { @include gutters; }

显示设置 gutter widths:

  // explicit gutters
  .item { @include gutters(3em); }

  // inside gutters
  .item { @include gutters(3em inside); }

  // gutters after, in an explicit (10 1/3) layout context
  .item { @include gutters(10 1/3 after); }

-------------------------------------------------------------------------

Container
---------

  // global settings
  width: container();

  // 12-column grid
  $large-breakpoint: container(12);

  body {
    @include container(12 center static);
  }
-------------------------------------------------------------------------

Nested Context
--------------

  body { @include container(8); }
  .span { @include span(3 of 8); }

  @include nested(8) {
    .span { @include span(3); }
  }
  .outer {
    @include span(3 of (1 2 3 2 1) at 2);

    // context is now (2 3 2)...
    .inner { @include span(2 of (2 3 2) at 1); }
  }

  $grid: (1 2 3 2 1);

  .outer {
    $context: 3 of $grid at 2;
    @include span($context);

    @include nested($context) {
      .inner { @include span(2 at 1); }
    }
  }


-------------------------------------------------------------------------

Global Box Sizing
-----------------

``$inherit``, ``box-sizing``

  // input
  .item { @include span(25em border-box); }

  // sample output (depending on settings)
  .item {
    float: left;
    width: 25em;
    box-sizing: border-box;
  }

  // the basics with default behavior:
  * { box-sizing: border-box; }

  // the basics with $inherit set to true:
  html { box-sizing: border-box; }
  * { box-sizing: inherit; }

设置全局盒模型

  // the flexible version:
  @include global-box-sizing(border-box);

  // the shortcut:
  @include border-box-sizing;

.. _global: http://www.paulirish.com/2012/box-sizing-border-box-ftw/
.. _polyfill: https://github.com/Schepp/box-sizing-polyfill


-------------------------------------------------------------------------

Rows & Edges
------------

Break
~~~~~

  .new-line { @include break; }

  .no-new-line { @include nobreak; }

-------------------------------------------------------------------------

First
~~~~~

  .first { @include first; }

``alpha``

-------------------------------------------------------------------------

Last
~~~~

  .last { @include last; }

``omega``
-------------------------------------------------------------------------

Full
~~~~
span their entire context.

  .last { @include full; }

-------------------------------------------------------------------------

Margins
-------

for applying left/right margins.
-------------------------------------------------------------------------

Pre
~~~
Add margins before an element,

  .example1 { @include pre(25%); }
  .example2 { @include push(2 of 7); }

-------------------------------------------------------------------------

Post
~~~~

Add margins after an element,

  .example1 { @include post(25%); }
  .example2 { @include post(2 of 7); }


-------------------------------------------------------------------------

Pull
~~~~

Add negative margins before an element,

  .example1 { @include pull(25%); }
  .example2 { @include pull(2 of 7); }


-------------------------------------------------------------------------

Squish
~~~~~~
adding both 
  // equal pre and post
  .example1 { @include squish(25%); }

  // distinct pre and post
  .example2 { @include squish(1, 3); }

  // shared context
  .shared {
    @include squish(1 3 of 12 no-gutters);
  }

  // distinct context
  .distinct {
    @include squish(1 at 2, 3 at 6);
  }

-------------------------------------------------------------------------

Padding
-------
applying left/right padding.
注意盒模型的影响，加或减
-------------------------------------------------------------------------

Prefix
~~~~~~

Add padding before an element,

  .example1 { @include prefix(25%); }
  .example2 { @include prefix(2 of 7); }

-------------------------------------------------------------------------

Suffix
~~~~~~

Add padding after an element,

  .example1 { @include suffix(25%); }
  .example2 { @include suffix(2 of 7); }


-------------------------------------------------------------------------

Pad
~~~
adding both

  // equal pre and post
  .example1 { @include pad(25%); }

  // distinct pre and post
  .example2 { @include pad(1, 3); }

  // shared context
  .shared {
    @include pad(1 3 of 12 no-gutters);
  }

  // distinct context
  .distinct {
    @include pad(1 at 2, 3 at 6);
  }

-------------------------------------------------------------------------

Bleed
-----

Apply negative margins and equal positive padding,
so that element borders and backgrounds "bleed"
outside of their containers, without the content be affected.

  // input
  .example1 { @include bleed(1em); }
  .example2 { @include bleed(1em 2 20px 5% of 8 .25); }

  // output
  .example1 {
    margin: -1em;
    padding: 1em;
  }

  .example2 {
    margin-top: -1em;
    padding-top: 1em;
    margin-right: -22.5%;
    padding-right: 22.5%;
    margin-bottom: -20px;
    padding-bottom: 20px;
    margin-left: -5%;
    padding-left: 5%;
  }

When possible,
the ``bleed`` mixins will attempt
to keep gutters intact.
Use the ``no-gutters`` keyword
to override that behavior.

-------------------------------------------------------------------------

Bleed-x
~~~~~~~

A shortcut for applying only left and right
(horizontal) bleed.

  // input
  .example { @include bleed-x(1em 2em); }

  // output
  .example {
    margin-left: -1em;
    padding-left: 1em;
    margin-right: -2em;
    padding-right: 2em;
  }

-------------------------------------------------------------------------

Bleed-y
~~~~~~~

A shortcut for applying only top and bottom
(vertical) bleed.

  // input
  .example { @include bleed-y(1em 2em); }

  // output
  .example {
    margin-top: -1em;
    padding-top: 1em;
    margin-bottom: -2em;
    padding-bottom: 2em;
  }


-------------------------------------------------------------------------
Isolate
-------

Isolation is a layout technique based on floats,
but adjusted to `address sub-pixel rounding issues`_.

  // input
  .function {
    margin-left: isolate(2 of 7 .5 after);
  }

  // output
  .function {
    margin-left: 15%;
  }

And the mixin returns
all the properties required for isolation.

  // input
  .mixin { @include isolate(25%); }

  // output
  .mixin {
    float: left;
    margin-left: 25%;
    margin-right: -100%;
  }

-------------------------------------------------------------------------

Gallery
-------
Gallery is a shortcut for creating gallery-style layouts,
where a large number of elements are laid out on a consistent grid.
using ``nth-child`` or ``nth-of-type`` selectors
and the isolation technique to arrange them on the grid.

  // each img will span 3 of 12 columns,
  // with 4 images in each row:
  .gallery img {
    @include gallery(3 of 12);
  }

-------------------------------------------------------------------------

Show Grid
---------
调试
  body {
    @include container;
    @include show-grid(overlay);
  }

-------------------------------------------------------------------------

Breakpoint
----------

.. _Breakpoint: http://breakpoint-sass.com/

-------------------------------------------------------------------------

Susy Breakpoint
~~~~~~~~~~~~~~~

.. describe:: mixin

  :format: ``susy-breakpoint($query, $layout, $no-query)``

  @include susy-breakpoint(30em, 8) {
    // nested code uses an 8-column grid,
    // starting at a 30em min-width breakpoint...
    .example { @include span(3); }
  }

.. _`Breakpoint: Basic Media Queries`: https://github.com/Team-Sass/breakpoint/wiki/Basic-Media-Queries
.. _`Breakpoint: No Query Fallbacks`: https://github.com/Team-Sass/breakpoint/wiki/No-Query-Fallbacks


-------------------------------------------------------------------------

Susy Media
~~~~~~~~~~
  :format: ``susy-media($query, $no-query)``
  :$query: <min-width> [<max-width>] | <string> | <pair> | <map>
  :$no-query: <boolean> | <string>

  // min
  // ---
  @include susy-media(30em) { /*...*/ }

  @media (min-width: 30em) { /*...*/ }

  // min/max pair
  // ------------
  @include susy-media(30em 60em) { /*...*/ }

  @media (min-width: 30em) and (max-width: 60em) { /*...*/ }

  // property/value pair
  // -------------------
  @include susy-media(min-height 30em) { /*...*/ }

  @media (min-height: 30em) { /*...*/ }

  // map
  // ---
  @include susy-media((
    min-height: 30em,
    orientation: landscape,
  )) { /*...*/ }

  @media (min-height: 30em) and (orientation: landscape) { /*...*/ }


``$no-query``
  ``true`` will render the contents to css without any media-query.
  This can be useful for creating separate no-query fallback files.

  For inline fallbacks using a target class,
  pass in a string (e.g. `.no-mqs`) to use as your fallback selector.
  The contents will be output both inside a media-query
  and again inside the given selector.


  $susy-media: (
    min: 20em,
    max: 80em 60em,
    string: 'screen and (orientation: landscape)',
    pair: min-height 40em,
    map: (
      media: screen,
      max-width: 30em
    ),
  );

  @include susy-media(min);
