define(['controllers/controllers',
        'services/imageService',
        'services/utilitiesService',
        'services/localStorageService'],
    function (controllers) {
        controllers.controller('FavsCtrl',
            ['$window',
            '$scope',
            'ImageService',
            'UtilitiesService',
            'LocalStorageService',
    function (
        $window,
        $scope,
        ImageService,
        UtilitiesService,
        LocalStorageService) {

        $scope.imageItemsStorageKey = 'imageItemsKey';
        $scope.favImageItems = [];
        $scope.columnCount = 5;
        $scope.favText = '';
        $scope.shouldAlert = false;

        $scope.tableItems = [];
        while ($scope.tableItems.push([]) < $scope.columnCount);

        if (!LocalStorageService.isSupported()) {
            $scope.favText = 'Local storage is not supported by your browser, so viewing favourites isn\'t possible';
            $scope.shouldAlert = true;
        } else {

            var currentStoredFavs = LocalStorageService.fetch($scope.imageItemsStorageKey);
            var currentFavs = [];
            if (currentStoredFavs != undefined) {
                currentFavs = JSON.parse(currentStoredFavs);
            }

            if (currentFavs.length == 0) {
                $scope.favText = 'There are no favourites stored at the moment';
                $scope.shouldAlert = true;
            } else {
                var maxRows = Math.ceil(currentFavs.length / $scope.columnCount);
                $scope.favText = 'These are your currently stored favourites. You can click on the images to see them a bit larger';
                if (currentFavs.length < $scope.columnCount) {
                    $scope.tableItems[0] = [];
                    for (var i = 0; i < currentFavs.length; i++) {
                        $scope.tableItems[0].push(ImageService.createFavImageItem(currentFavs[i].name));
                    }
                } else {
                    var originalIndexCounter = 0;
                    for (var r = 0; r < maxRows; r++) {
                        for (var c = 0; c < $scope.columnCount; c++) {
                            if (originalIndexCounter < currentFavs.length) {
                                $scope.tableItems[r][c] = ImageService.createFavImageItem(currentFavs[originalIndexCounter].name);
                                originalIndexCounter++;
                            }
                        }
                    }
                }
            }

            if ($scope.shouldAlert) {
                UtilitiesService.delayedAlert($scope.favText);
            }
 
        }

    }]);
});
