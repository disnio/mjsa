Settings
========

新的 Susy 语法
基于一些设置可以写成 Sass Map 或使用 :`shorthand syntax`.
这两个定义是可互换的:
  $susy: (
    columns: 12,
    gutters: 1/4,
    math: fluid,
    output: float,
    gutter-position: inside,
  );

  $shorthand: 12 1/4 fluid float inside;

两种格式可以当做一个参数写到函数和混合器里，生成 susy 语句。

Maps 甚至被当做 shorthand 的一部分:

  $susy: (
    columns: 12,
    gutters: .25,
    math: fluid,
  );

  @include layout($susy float inside);

另外要注意的是多数选项被控制在全局 globally
(by setting the site-wide default)
或局部 locally
(passed to individual functions and mixins).


-------------------------------------------------------------------------

Global Defaults
---------------
所有全局默认值:

  $susy: (
    flow: ltr,
    math: fluid,
    output: float,
    gutter-position: after,
    container: auto,
    container-position: center,
    columns: 4,
    gutters: .25,
    column-width: false,
    global-box-sizing: content-box,
    last-flow: to,
    debug: (
      image: hide,
      color: rgba(#66f, .25),
      output: background,
      toggle: top right,
    ),
    use-custom: (
      background-image: true,
      background-options: false,
      box-sizing: true,
      clearfix: false,
      rem: true,
    )
  );

You can set your own global defaults,
or create individual layout maps
to access as needed.

For global settings,
create a ``$susy`` variable
with any values that you need.
  $susy: (
    columns: 12,
    gutters: .25,
    gutter-position: inside,
  )


-------------------------------------------------------------------------

Layout
------

A "layout" in Susy is made up of any combination of settings.
Layouts are stored as maps,
but can also be written as :doc:`shorthand <shorthand>`.


-------------------------------------------------------------------------

.. _settings-layout-function:

Layout [function]
~~~~~~~~~~~~~~~~~
  // function input
  $map: layout(auto 12 .25 inside fluid isolate);

  //output
  $map: (
    container: auto,
    columns: 12,
    gutters: .25,
    gutter-position: inside,
    math: fluid,
    output: isolate,
  );

This is useful any time you need to combine settings
stored in different variables.
It's not possible to combine two shorthand variables:

.. code-block:: scss

  // THIS WON'T WORK
  $short: 12 .25 inside;
  @include layout($short fluid no-gutters);

but it is possible to add a map into the shorthand:

.. code-block:: scss

  // THIS WILL WORK
  $map: layout(12 .25 inside);
  @include layout($map fluid no-gutters);

or combine two maps:

.. code-block:: scss

  $map1: 13 static;
  $map2: (6em 1em) inside;
  @include layout($map1 $map2);


-------------------------------------------------------------------------

.. _settings-layout-mixin:

Layout [mixin]
~~~~~~~~~~~~~~

Set a new layout as the global default.

  // mixin: set a global layout
  @include layout(12 1/4 inside-static);

By default, these new settings are added to your
existing global settings.
Use the `$clean` argument
to establish new settings from scratch.


-------------------------------------------------------------------------

With Layout
~~~~~~~~~~~

临时设置默认值为一段代码：
  :format: ``with-layout($layout, $clean) { @content }``
  :$layout: :ref:`\<layout\> <shorthand-layout>`
  :$clean: <boolean>
  :@content: Sass content block


  @include with-layout(8 static) {
    // Temporary 8-column static grid...
  }

  // Global settings are restored...

By default, these new settings are added to your
existing global settings.
Use the `$clean` argument
to establish new settings from scratch.

-------------------------------------------------------------------------

Susy-Get
--------

  :format: ``susy-get($key, $layout)``
  :$key: Setting name
  :$layout: :ref:`\<layout\> <shorthand-layout>`
获取 layout 使用``susy-get`` function.

  $large: layout(80em 24 1/4 inside);
  $large-container: susy-get(container, $large);

To access a nested setting like ``debug/image``,
send the full path as a list for the ``$key`` argument.

  $debug-image: susy-get(debug image);
-------------------------------------------------------------------------

.. _settings-flow:

Flow
----

The reading direction of your document.
Layout elements will stack out in the direction of flow,
unless otherwise directed.

.. describe:: setting

  :key: ``flow``
  :scope: global, local
  :options: ``rtl`` | ``ltr``
  :default: ``ltr``

.. glossary::

  ``ltr``
    Layout elements will flow from left to right.

  ``rtl``
    Layout elements will flow from right to left.


-------------------------------------------------------------------------

.. _settings-math:

Math
----

Susy can produce either relative widths (fluid percentages)
or static widths (using given units).
既可以处理相对的宽度也可以是静态的宽度（使用给定的单位）

  :key: ``math``
  :scope: global, local
  :options: ``fluid`` | ``static``
  :default: ``fluid``

.. glossary::

  ``fluid`` 按百分比计算
    All internal grid spans will be calculated relative to the container,
    and output as ``%`` values.

  ``static`` 按给定数值单位计算
    All internal grid values will be calculated
    as multiples of the ``column-width`` setting.
    If you set column-width to ``4em``,
    your grid widths will be output as ``em`` values.


-------------------------------------------------------------------------

.. _settings-output:

Output
------

Susy can generate output using different layout techniques.
Currently we have a float module,
with an extension to handle isolation as well.
In the future there could be flexbox, grid, and other output styles.

  :key: ``output``
  :scope: global, local
  :options: ``float`` | ``isolate``
  :default: ``float``

  ``float``
    Floats are the most common form of layout used on the web.
    多数情况下使用的布局形式

  ``isolate``
    Isolation is a `trick`_ developed by `John Albin Wilkins`_
    to help fix `sub-pixel rounding`_ bugs in fluid, floated layouts.
    You can think of it like absolute positioning of floats.
    We find it to be very useful for spot-checking the worst rounding bugs,
    but we think it's overkill as a layout technique all to itself.

.. _trick: http://www.palantir.net/blog/responsive-design-s-dirty-little-secret
.. _sub-pixel rounding: http://tylertate.com/blog/2012/01/05/subpixel-rounding.html
.. _John Albin Wilkins: http://john.albin.net/

-------------------------------------------------------------------------
Container
---------

设置包含元素的最大宽度

  :key: container
  :scope: global, local [container only]
  :options: ``<length>`` | ``auto``
  :default: ``auto``

``<length>``
  Set any explicit length (e.g. ``60em`` or ``80%``),
  and it will be applied directly to the container.

.. glossary::

  ``auto``
    Susy will calculate the width of your container
    based on the other grid settings,
    or fall back to ``100%``.

 静态布局需要通过`column-width`替换。

-------------------------------------------------------------------------
Container Position
------------------
排列相对于容器的父元素，通常是视图。
Align the container relative to it's parent element
(often the viewport).

  :key: container-position
  :scope: global, local [container only]
  :options: ``left`` | ``center`` | ``right`` | ``<length> [*2]``
  :default: ``center``

.. glossary::

  ``left``
     Holds container elements flush left,
     with ``margin-left: 0;`` and ``margin-right: auto;``.

  ``center``
     Centers the container,
     by setting both left and right margins to ``auto``.

  ``right``
    Pushes the container flush right,
    with ``margin-right: 0;`` and ``margin-left: auto;``.

``<length> [*2]``
  If one length is given,
  it will be applied to both side margins,
  to offset the container from the edges of the viewport.
  If two values are given,
  they will be used as ``left`` and ``right`` margins respectively.


-------------------------------------------------------------------------
Columns
-------

Establish the column-count and arrangement for a grid.

.. describe:: setting

  :key: ``columns``
  :scope: global, local
  :options: ``<number>`` | ``<list>``
  :default: ``4``

``<number>``
  The number of columns in your layout.

``<list>``
  For asymmetrical grids,
  list the size of each column relative to the other columns,
  where ``1`` is a single column-unit.
  ``(1 2)`` would create a 2-column grid,
  with the second column being twice the width of the first.
  For a `Fibonacci`_-inspired grid, use
  ``(1 1 2 3 5 8 13)``.

.. _Fibonacci: http://en.wikipedia.org/wiki/Fibonacci_number


-------------------------------------------------------------------------

.. _settings-gutters:

Gutters
-------

Set the width of a gutter relative to columns on your grid.

.. describe:: setting

  :key: ``gutters``
  :scope: global, local
  :options: ``<ratio>``
  :default: ``1/4``

``<ratio>``
  Gutters are established as a ratio to the size of a column.
  The default ``1/4`` setting will create gutters
  one quarter the size of a column. 1列的1/4
  In asymmetrical grids,
  this is ``1/4`` the size of a single column-unit.

  If you want to set explicit column and gutter widths,
  write your ``gutters`` setting as ``<gutter-width>/<column-width>``.
  You can even leave the units attached.

    // 70px columns, 20px gutters
    $susy: (
      gutters: 20px/70px,
    );


-------------------------------------------------------------------------

Column Width
------------

Optionaly set the explicit width of a column.

  :key: ``column-width``
  :scope: global, local
  :options: ``<length>`` | ``false``/``null``
  :default: ``false``

``<length>``
  The width of one column, using any valid unit.
  This will be used in ``static`` layouts to calculate all grid widths,
  but can also be used by ``fluid`` layouts
  to calculate an outer maximum width for the container.

``false``/``null``
  There is no need for column-width in ``fluid`` layouts
  unless you specifically want the container-width
  calculated for you.


-------------------------------------------------------------------------

.. _settings-gutter-position:

Gutter Position
---------------

Set how and where gutters are added to the layout,
either as padding or margins on layout elements.

  :key: gutter-position
  :scope: global, local
  :options: ``before`` | ``after`` | ``split`` | ``inside`` | ``inside-static``
  :default: ``after``

  ``before``
    Gutters are added as ``margin`` before a layout element,
    relative to the flow direction
    (left-margin for ltr, right-margin for rtl).
    The first gutter on each row will need to be removed.

  ``after``
    Gutters are added as ``margin`` after a layout element,
    relative to the flow direction.
    The last gutter on each row will need to be removed.

  ``split``
    Gutters are added as ``margin`` on both sides of a layout element,
    and are not removed at the edges of the grid.

  ``inside`` 作为 padding
    Gutters are added as ``padding`` on both sides of a layout element,
    and are not removed at the edges of the grid.

  ``inside-static`` 流式布局
    Gutters are added as static ``padding`` on both sides of a layout element,
    even in a fluid layout context,
    and are not removed at the edges of the grid.


-------------------------------------------------------------------------

Global Box Sizing
-----------------

Tell Susy what box model is being applied globally.

  :key: ``global-box-sizing``
  :scope: global
  :options: ``border-box`` | ``content-box``
  :default: ``content-box``

.. glossary::

  ``content-box``
    Browsers use the ``content-box`` model unless you specify otherwise.

  ``border-box``
    If you are using the `Paul Irish universal border-box`_ technique
    (or something similar),
    you should change this setting to ``border-box``.
    You can also use our ``border-box-sizing`` mixin,
    and we'll take care of it all for you.

For more,
see the `MDN box-sizing documentation`_.

.. _Paul Irish universal border-box: http://www.paulirish.com/2012/box-sizing-border-box-ftw/
.. _MDN box-sizing documentation: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing


-------------------------------------------------------------------------

.. _settings-last-flow:

Last Flow
---------

The float-direction for the last element in a row
when using the :term:`float` output.

.. describe:: setting

  :key: ``last-flow``
  :scope: global
  :options: ``from`` | ``to``
  :default: ``to``

.. glossary::

  ``from``
    This is the default for all other elements in a layout.
    In an ``ltr`` (left-to-right) flow,
    the from-direction is ``left``,
    and this setting would float "last" elements to the left,
    along with the other elements.

  ``to``
    In many cases (especially with ``fluid`` grids),
    it can be helpful to float the last element in a row
    in the opposite direction.


-------------------------------------------------------------------------

.. _settings-debug:

Debug
-----

Susy has a few tools to help in debugging your layout as you work.
These settings help you control the debugging environment.

.. describe:: setting block

  :key: ``debug``
  :scope: global, local [container only]
  :options: <map of sub-settings>

.. code-block:: scss

  $susy: (
    debug: (
      image: show,
      color: blue,
      output: overlay,
      toggle: top right,
    ),
  );

.. warning::

  Grid images are not exact.
  Browsers have extra trouble
  with sub-pixel rounding on background images.
  These are meant for rough debugging,
  not for pixel-perfect measurements.
  Expect the ``to`` side of your grid image
  (``right`` if your flow is ``ltr``)
  to be off by several pixels.


-------------------------------------------------------------------------

.. _settings-debug-image:

Debug Image
~~~~~~~~~~~

Toggle the available grid images on and off.

.. describe:: setting

  :key: ``debug image``
  :scope: global, local [container only]
  :options: ``show`` | ``hide`` | ``show-columns`` | ``show-baseline``
  :default: ``hide``

.. glossary::

  ``show``
    Show grid images,
    usually on the background of container elements,
    for the purpose of debugging.
    If you are using `Compass vertical rhythms`_
    (or have set your own ``$base-line-height`` variable)
    Susy will show baseline grids as well.

  ``hide``
    Hide all grid debugging images.

  ``show-columns``
    Show only horizontal grid-columns,
    even if a baseline grid is available.

  ``show-baseline``
    Show only the baseline grid,
    if the ``$base-line-height`` variable is available.

.. _Compass vertical rhythms: http://compass-style.org/reference/compass/typography/vertical_rhythm/


-------------------------------------------------------------------------

.. _settings-debug-output:

Debug Output
~~~~~~~~~~~~

The debug image can be output either as a background on the container,
or as a generated overlay.

.. describe:: setting

  :key: ``debug output``
  :scope: global, local [container only]
  :options: ``background`` | ``overlay``
  :default: ``background``

.. glossary::

  ``background``
    Debugging images will be generated
    on on the background of the container element.

  ``overlay``
    Debugging images will be generated as an overlay
    using the container's ``::before`` element.
    By default, the overlay is hidden,
    but we also generate a :ref:`toggle <settings-debug-toggle>`
    in a corner of the viewport.
    Hover over the toggle to make the overlay appear.


-------------------------------------------------------------------------

.. _settings-debug-toggle:

Debug Toggle
~~~~~~~~~~~~

If you are using the grid overlay option,
Susy will generate a toggle to show/hide the overlay.
Hovering over the toggle will show the overlay.
You can place the toggle in any corner of the viewport
using a combination of ``top``, ``right``, ``bottom``, and ``left``.

.. describe:: setting

  :key: ``debug toggle``
  :scope: global
  :options: ``right`` | ``left`` and ``top`` | ``bottom``
  :default: ``top right``


-------------------------------------------------------------------------

.. _settings-debug-color:

Debug Color
~~~~~~~~~~~

Change the color of columns in the generated grid image.

.. describe:: setting

  :key: ``debug color``
  :scope: global
  :options: <color>
  :default: ``rgba(#66f, .25)``


-------------------------------------------------------------------------

.. _settings-custom:

Custom Support
--------------

There are several common helpers that you can tell Susy to use,
if you provide them yourself
or through a third-party library like Compass or Bourbon.


-------------------------------------------------------------------------

.. _settings-custom-clearfix:

Custom Clearfix
~~~~~~~~~~~~~~~

Tell Susy to use a global ``clearfix`` mixin.

.. describe:: setting

  :key: ``use-custom clearfix``
  :scope: global
  :options: <boolean>
  :default: ``false``

``false``
  Susy will use an internal micro-clearfix.

``true``
  Susy will look for an existing ``clearfix`` mixin,
  and fallback to the internal micro-clearfix if none is found.


-------------------------------------------------------------------------

.. _settings-custom-background-image:

Custom Background Image
~~~~~~~~~~~~~~~~~~~~~~~

Tell Susy to use a global ``background-image`` mixin.
This is only used for debugging.

.. describe:: setting

  :key: ``use-custom background-image``
  :scope: global
  :options: <boolean>
  :default: ``true``

``false``
  Susy will output background-images directly to CSS.

``true``
  Susy will look for an existing ``background-image`` mixin
  (like the ones provided by Compass and Bourbon),
  and fallback to plain CSS output if none is found.


-------------------------------------------------------------------------

.. _settings-custom-background-options:

Custom Background Options
~~~~~~~~~~~~~~~~~~~~~~~~~

Tell Susy to use global ``background-size``, ``-origin``, and ``-clip`` mixins.
This is only used for debugging.

.. describe:: setting

  :key: ``use-custom background-options``
  :scope: global
  :options: <boolean>
  :default: ``false``

``false``
  Susy will output background-options directly to CSS.

``true``
  Susy will look for existing ``background-size``,
  ``-origin``, and ``-clip`` mixins
  (like the ones provided by Compass and Bourbon),
  and fallback to plain CSS output if none is found.


-------------------------------------------------------------------------

.. _settings-custom-breakpoint:

Custom Breakpoint Options
~~~~~~~~~~~~~~~~~~~~~~~~~

Tell Susy to use a custom ``breakpoint`` mixin,
like the one provided by the `Breakpoint`_ plugin.

.. _Breakpoint: http://breakpoint-sass.com/

.. describe:: setting

  :key: ``use-custom breakpoint``
  :scope: global
  :options: <boolean>
  :default: ``true``

``false``
  Susy will use an internal fallback for media-queries.

``true``
  Susy will look for existing an ``breakpoint`` mixin
  like the one provided by the [Breakpoint](http://breakpoint-sass.com) plugin,
  and fallback to internal media-query support if none is found.


-------------------------------------------------------------------------

.. _settings-custom-box-sizing:

Custom Box Sizing
~~~~~~~~~~~~~~~~~

Tell Susy to use a global ``box-sizing`` mixin.

.. describe:: setting

  :key: ``use-custom box-sizing``
  :scope: global
  :options: <boolean>
  :default: ``true``

``false``
  Susy will output ``box-sizing`` official syntax,
  as well as ``-moz`` and ``-webkit`` prefixed versions.

``true``
  Susy will look for an existing ``box-sizing`` mixin
  (like the ones provided by Compass and Bourbon),
  and fallback to mozilla, webkit, and official syntax
  if none is found.


-------------------------------------------------------------------------

.. _settings-custom-rem:

Custom Rem
~~~~~~~~~~

Tell Susy to use the Compass ``rem`` support module.

.. describe:: setting

  :key: ``use-custom rem``
  :scope: global
  :options: <boolean>
  :default: ``true``

``false``
  Susy will output length values directly to CSS.

``true``
  Susy will look for an existing ``rem`` mixin,
  and check the ``$rhythm-unit`` and ``$rem-with-px-fallback`` settings
  provided by Compass,
  or fallback to plain CSS output if they aren't found.


------------------------------------------------------------------------------

.. _settings-location:

Location
--------

Reference a specific column on the grid
for :ref:`row edges <tools-span-edge>`,
:ref:`isolation <tools-isolate>`,
or :ref:`asymmetrical layouts <tools-span-location>`.
Locations keywords don't require the ``at`` flag.

.. describe:: setting

  :key: ``location``
  :scope: local
  :options: ``first``/``alpha`` | ``last``/``omega`` | ``<number>``
  :default: ``null``

.. glossary::

  ``first``
  ``alpha``
    Set location to ``1``.

  ``last``
  ``omega``
    Set the location to the final column,
    and any previous columns included by the relevant ``span``.

``<number>``
  Set the location to any column-index
  between ``1`` and the total number of available columns.


-------------------------------------------------------------------------

.. _settings-box-sizing:

Box Sizing
----------

Set a new box model on any given element.

.. describe:: setting

  :key: ``box-sizing``
  :scope: local
  :options: ``border-box`` | ``content-box``
  :default: ``null``

``border-box``
  Output ``box-sizing`` CSS to set the ``border-box`` model.

``content-box``
  Output ``box-sizing`` CSS to set the ``content-box`` model.


-------------------------------------------------------------------------

.. _settings-spread:

Spread
------

Adjust how many gutters are included in a column span.

.. describe:: setting

  :key: ``spread``
  :scope: local
  :options: ``narrow`` | ``wide`` | ``wider``
  :default: various...

.. glossary::

  ``narrow``
    In most cases,
    column-spans include the gutters *between* columns.
    A span of ``3 narrow`` covers the width of 3 columns,
    as well as 2 internal gutters.
    This is the default in most cases.

  ``wide``
    Sometimes you need to include one side gutter in a span width.
    A span of ``3 wide`` covers the width of 3 columns,
    and 3 gutters (2 internal, and 1 side).
    This is the default for several margin/padding mixins.

  ``wider``
    Sometimes you need to include both side gutters in a span width.
    A span of ``3 wider`` covers the width of 3 columns,
    and 4 gutters (2 internal, and 2 sides).


-------------------------------------------------------------------------

.. _settings-gutter-override:

Gutter Override
---------------

Set an explicit one-off gutter-width on an element,
or remove its gutters entirely.

.. describe:: setting

  :key: ``gutter-override``
  :scope: local
  :options: ``no-gutters``/``no-gutter`` | ``<length>``
  :default: ``null``

.. glossary::

  ``no-gutters``
  ``no-gutter``
    Remove all gutter output.

``<length>``
  Override the calculated gutter output with an explicit width.


-------------------------------------------------------------------------

.. _settings-role:

Role
----

Mark a grid element as a nesting context for child elements.

.. describe:: setting

  :key: ``role``
  :scope: local
  :options: ``nest``
  :default: ``null``

.. glossary::

  ``nest``
    Mark an internal grid element as a context for nested grids.

.. note::

  This can be used with any grid type,
  but it is required for nesting
  with ``split``, ``inside``, or ``inside-static`` gutters.
