requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        'jquery': "jquery-1.11.3.min",
        "imagesLoaded": "imagesLoaded.pkg.min",
        "qtip": "jquery.qtip.min"        
    },
    "shim": {
        "qtip": ["jquery"],
        "bootstrap": ["jquery"]
    }
});
