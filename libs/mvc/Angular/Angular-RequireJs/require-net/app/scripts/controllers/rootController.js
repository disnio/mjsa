






define(['controllers/controllers',
        'services/liveUpdatesService',
        'services/utilitiesService',
        'services/imageService',
        'services/localStorageService'],
    function (controllers) {
        controllers.controller('RootCtrl',
            ['$window',
                '$scope',
                '$location',
                'LiveUpdatesService',
                'UtilitiesService',
                'ImageService',
                'LocalStorageService',
    function (
        $window,
        $scope,
        $location,
        LiveUpdatesService,
        UtilitiesService,
        ImageService,
        LocalStorageService) {

        $scope.imageitems = [];
        $scope.imageItemsStorageKey = 'imageItemsKey';
                
        //load existing items from local storage which looks cool, as they show up in their persisted
        //positions again...Cool
        if (LocalStorageService.isSupported()) {
            var currentFavs = LocalStorageService.fetch($scope.imageItemsStorageKey);
            if (currentFavs != undefined) {
                currentFavs = JSON.parse(currentFavs);
                for (var i = 0; i < currentFavs.length; i++) {
                    var favItem = currentFavs[i];

                    $scope.imageitems.push(ImageService.createImageItem(
                            favItem.name, favItem.left, favItem.top, favItem.width, favItem.height, true));
                }
            }
        }


        UtilitiesService.addArrayHelperMethods();

        LiveUpdatesService.eventsStream().subscribe(
            function (data) {
                if ($location.path() == '/') {
                    var idx = $scope.imageitems.propertyBasedIndexOf('name', data);
                    if (idx >= 0) {
                        $window.alert('An item with that name has already been added');
                    } else {
                        var randomLeft = UtilitiesService.getRandomInt(10, 600);
                        var randomTop = UtilitiesService.getRandomInt(10, 400);
                        var randomWidth = UtilitiesService.getRandomInt(100, 300);
                        var randomHeight = UtilitiesService.getRandomInt(100, 300);

                        $scope.imageitems.push(ImageService.createImageItem(
                            data, randomLeft, randomTop, randomWidth, randomHeight, false));
                        $scope.$apply();
                    }
                    
                }
            },
            function (error) {
                $window.alert(error);
            });



        $scope.addToFavourites = function (index) {
            if (!LocalStorageService.isSupported()) {
                $window.alert('Local storage is not supported by your browser, so saving favourites isn\'t possible');
            } else {
                var currentStoredFavsForAdd = LocalStorageService.fetch($scope.imageItemsStorageKey);
                if (currentStoredFavsForAdd == undefined) {
                    currentStoredFavsForAdd = [];
                } else {
                    currentStoredFavsForAdd = JSON.parse(currentStoredFavsForAdd);
                }

                var scopeImageItem = $scope.imageitems[index];
                var favsIdx = currentStoredFavsForAdd.propertyBasedIndexOf('name', scopeImageItem.name);
                if (favsIdx >= 0) {
                    $window.alert('An item with that name is already in your favourites.');
                    return;
                }

                $scope.imageitems[index].isFavourite = true;
                currentStoredFavsForAdd.push(scopeImageItem);
                LocalStorageService.save($scope.imageItemsStorageKey, currentStoredFavsForAdd);
                $window.alert('Saved to favourites');
                        
            }
        };



        $scope.removeFromFavourites = function (index) {
            if (!LocalStorageService.isSupported()) {
                $window.alert('Local storage is not supported by your browser, so removing from favourites isn\'t possible');
            } else {
                        
                var currentStoredFavsForRemoval = LocalStorageService.fetch($scope.imageItemsStorageKey);
                if (currentStoredFavsForRemoval == undefined) {
                    return;
                } else {
                    currentStoredFavsForRemoval = JSON.parse(currentStoredFavsForRemoval);
                }


                var scopeImageItem = $scope.imageitems[index];

                var favsIdx = currentStoredFavsForRemoval.propertyBasedIndexOf('name', scopeImageItem.name);
                $scope.imageitems.splice(index, 1);
                        
                if (favsIdx >= 0) {
                    currentStoredFavsForRemoval.splice(favsIdx, 1);
                    LocalStorageService.save($scope.imageItemsStorageKey, currentStoredFavsForRemoval);
                }
                $window.alert('Item removed from favourites');
            }
        };



        // NOTE: $scope.$apply is called by the draggable directive
        $scope.updatePosition = function (name, pos) {
            var idx = $scope.imageitems.propertyBasedIndexOf('name', name);
            var foundItem = $scope.imageitems[idx];
            foundItem.left = pos.left;
            foundItem.top = pos.top;
        };



        // NOTE: $scope.$apply is called by the resizable directive
        $scope.updateScale = function (name, pos, size) {
            var idx = $scope.imageitems.propertyBasedIndexOf('name', name);
            var foundItem = $scope.imageitems[idx];
            foundItem.left = pos.left;
            foundItem.top = pos.top;
            foundItem.width = size.width;
            foundItem.height = size.height;
        };
    }]);
});
