'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var util3DCard = function util3DCard($showCards) {

    var isMoving = false;

    var _loop = function _loop(i) {
        var obj = $showCards[i];
        obj.addEventListener('mouseenter', function (ev) {
            if (isMoving) return;
            ev.stopPropagation();
            var moveFn = function moveFn(ev) {
                ev.stopPropagation();
                var reP = {
                    x: ev.clientX - obj.getBoundingClientRect().left,
                    y: ev.clientY - obj.getBoundingClientRect().top
                };
                var rotateY = (obj.clientWidth / 2 - reP.x) / (obj.clientWidth / 2) * 20;
                var rotateX = (reP.y - obj.clientHeight / 2) / (obj.clientHeight / 2) * 20;
                var angle = Math.atan2(-(reP.x - obj.clientWidth / 2), -(obj.clientHeight / 2 - reP.y));
                angle = angle * 180 / Math.PI;
                if (rotateY > 20) rotateY = 20;
                if (rotateX > 20) rotateX = 20;
                obj.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.08, 1.08, 1.08)';
                // shadow.style.background = 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 80%)';
            };
            obj.addEventListener('mousemove', moveFn, true);
            var outFn = function outFn() {
                ev.stopPropagation();
                obj.style.transform = 'none';
                // shadow.style.background = '';
                obj.removeEventListener('mousemove', moveFn);
                obj.removeEventListener('mouseout', outFn);
            };
            obj.addEventListener('mouseout', outFn, true);
        }, true);
    };

    for (var i = 0; i < $showCards.length; i++) {
        _loop(i);
    }
};

exports["default"] = util3DCard;
module.exports = exports['default'];