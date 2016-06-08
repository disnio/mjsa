document.write('<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=nq3Q72ikAV07Mwl6UTgcG8bC"></script>');


// function TPoint(lat, lng) {
//     this.lat = name;
//     this.lng = lng;
// }
function TMap(container) {
    var map = new BMap.Map(container);

    map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));
    map.enableScrollWheelZoom();    
    map.addControl(new BMap.NavigationControl());
    this.map = map;
    var points = [];
    this.clear = function () {
        points = [];
        map.clearOverlays();
    };
    this.addMarker = function (lng, lat, title, iconUrl, clickAction) {
        var point = new BMap.Point(lng, lat), maker, icon;
        if (iconUrl) {
            icon = new BMap.Icon(iconUrl, { width: 26, height: 34 });
            marker = new BMap.Marker(point, { icon: icon, title: title });
        }else {
            marker = new BMap.Marker(point, { title: title });
        }
        points.push(point);
        if (clickAction) {
            marker.addEventListener("click", clickAction);
        }
        map.addOverlay(marker)
    };


    this.autoSize = function () {
        map.setViewport(points);
    };

}