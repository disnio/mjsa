Shorthand
=========

Susy 提供了一个快捷语法方便给函数和混合器传递任意的设置，使用时保持语法的简单可读对于多数情况。

  // Establish an 80em container 创建一个80em 的容器
  @include container(80em);

  // Span 3 of 12 columns 跨度 12分之3 列
  @include span(3 of 12);

  // Setup the 960 Grid System
  @include layout(12 (60px 20px) split static);

  // Span 3 isolated columns in a complex, asymmetrical grid, without gutters
  // 跨越3个独立的列在一个复杂非对称的网格中，无间距。
  @include span(isolate 3 at 2 of (1 2 3 4 3 2 1) no-gutters);


-------------------------------------------------------------------------

Overview
--------

大多数情况下语法顺序是不重要的，但也有一点规则对于开始。
The syntax generally breaks down into three parts.
语法生成分解为3部分：
``$span`` ``$grid`` ``$keywords``;

  span
    A ``span`` 可以是任何长度或无限的数字描述列的跨度.    
    特定的变化依赖于在哪里传入函数和混合器。一些混合器甚至允许多个spans
    使用 `top right bottom left>` syntax.

  grid
    ``grid`` 组成参考:`settings-columns` 的设置,
    可选设置参考:`settings-gutters`
    和:`settings-column-width`.

      // 12-column grid
      $grid: 12;

      // 12-column grid with 1/3 间隙每格
      $grid: 12 1/3;

      // 12-列网格，每格 60px 间隙 10px
      $grid: 12 (60px 10px);

      // 非对称网格带着 .25 间隙每格
      $grid: (1 2 3 2 1) .25;

  keywords
    The ``keywords`` are the easiest.
    Most :doc:`settings <settings>` have simple keyword values
    that can be included in any order —
    before, after, or between the :term:`span` and :term:`grid` options.

      // 所有的关键词 in Susy:

      $global-keywords: (
        container            : auto,
        math                 : static fluid,
        output               : isolate float,
        container-position   : left center right,
        flow                 : ltr rtl,
        gutter-position      : before after split inside inside-static,
        debug: (
          image              : show hide show-columns show-baseline,
          output             : background overlay,
        ),
      );

      $local-keywords: (
        box-sizing           : border-box content-box,
        edge                 : first alpha last omega, 边缘
        spread               : narrow wide wider, 排列
        gutter-override      : no-gutters no-gutter,
        clear                : break nobreak,
        role                 : nest,
      );

    The global keywords can be used anywhere,
    and apply to global default :doc:`settings <settings>`.
    The local keywords are specific to each individual use.


-------------------------------------------------------------------------

Layout
------

The simplest shorthand variation
is used for defining your layout in broad terms.

  :pattern: ``<grid> <keywords>``

没有必须的。所有设置是可选的都有全局默认值.
:term:`grid` and :term:`keyword <keywords>` settings work exactly as advertised.

.. code-block:: scss

  // grid: (columns: 4, gutters: 1/4, column-width: 4em);
  // keywords: (math: fluid, gutter-position: inside-static, flow: rtl);
  $small: 4 (4em 1em) fluid inside-static rtl;

You can easily convert layouts from shorthand to map syntax
using the :ref:`settings-layout` function.


-------------------------------------------------------------------------

Span
----

Most of Susy's functions & mixins
are used to calculate or set a width, or ``span``.

  :pattern: ``<span> at <location> of <layout>``

多数spans 既是无单位的数字（描述列）也可以是特定的宽度。
他们中的一些也需要位置，特别是对于非对称网格和独立网格。

标准的 spans 语法:
  // Pattern:
  $span: $span at $location of $layout;

  // span: 3;
  // location: 4;
  // layout: (columns: 12, gutters: .25, math: fluid)
  $span: 3 at 4 of 12 .25 fluid;

  // Only $span is required in most cases
  $span: 30%;

"at" 标记在紧接着位置之前, "of" 之后被认为是 layout.
