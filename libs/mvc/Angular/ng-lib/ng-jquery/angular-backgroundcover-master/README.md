# AngularJS directive for jquery.backgroundcover

## Requirements

- [AngularJS][1] obviously
- [jquery.backgroundcover][2] 

## Synopsis

Detects the browsers capability for `background-size: cover` and applies a shim
when neccessary.

## Usage

Include `backgroundCover` as module:

```js
var app = angular.module('myApp', ['backgroundCover']);
```
Works on styled elements:

```css
.background-cover {
	background: url('my/image.jpg') center center no-repeat;
	-moz-background-size: cover;
	-webkit-background-size: cover;
	background-size: cover;
}
```

```html
<div class="background-cover"></div>
<div background-cover=""></div>
```

Elements with inline style will work as well:

```html
<div class="background-cover" style="background-image: url('my/image.jpg');"></div>
```

Force usage of `backgroundcover()`:

```html
<div class="background-cover" image="my/image.jpg" force="true"></div>
```

Force element resize polling (instead of `window.onresize`):

```html
<div class="background-cover" poll="true"></div>
```

[1]: http://angularjs.org/
[2]: http://iwyg.github.io/jquery.backgroundcover/
