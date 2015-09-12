define("arale/test/1.0.0/b-debug", [ "./a-debug", "arale/class/1.0.0/class-debug" ], function(require) {
    require("./a-debug");
    console.log("b");
});

define("arale/test/1.0.0/a-debug", [ "arale/class/1.0.0/class-debug" ], function() {
    require("arale/class/1.0.0/class-debug");
    console.log("a");
});
