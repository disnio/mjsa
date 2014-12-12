define( ['underscore'], function (_) {

var r = _.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); });   
console.log(r); //{1: [1.3], 2: [2.1, 2.4]}  
var r = _.groupBy(['one', 'two', 'three'], 'length');   
console.log(r); //{3: ["one", "two"], 5: ["three"]}  

} );