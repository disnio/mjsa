define(['services/services'],
  function (services) {
      services.factory('UtilitiesService', [
        function () {

            var initialised = false;

            return {
                
                addArrayHelperMethods: function () {
                    if (!initialised) {
                        initialised = true;
                        Array.prototype.propertyBasedIndexOf = function arrayObjectIndexOf(property, value) {
                            for (var i = 0, len = this.length; i < len; i++) {
                                if (this[i][property] === value) return i;
                            }
                            return -1;
                        };
                    }
                },
                
                getRandomInt: function (min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                },
                

                delayedAlert: function(message) {
                    setTimeout(function () {
                        $window.alert(message);
                    }, 1000);
                }
            };
        }]);
  });
