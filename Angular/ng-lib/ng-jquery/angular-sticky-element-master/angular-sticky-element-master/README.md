angular-sticky-element
======================

A sticky element directive using jquery-waypoints


Install it using bower

```
bower install angular-sticky-element
```

Then you need to include `sticky-element` in your application modules.
```
angular.module('myApp', ['stycky-element'])
```

You can use the directive this way

```
<div sticky-show="showSticky"
    sticky-direction="down"
    sticky-element>
</div>
```

The directive will add the class `stuck` when the element will pass the scroll
and the direction is the one specified. Example of `.stuck` class:

```
.stuck {
    position: absolute;
    z-index: 90;
    top: 0;
    transition: 0.3s all;
}
```

You don't need to use position: fixed. Just make sure that the parent of the
element is `relative`.

Directive options are:

* `sticky-show`: for showing or hiding the element. You can't use ng-show
* `sticky-direction`: down || up || left || right
* `stickyOptions`:  all the options that you can pass to jquery-waypoints

More will come...

