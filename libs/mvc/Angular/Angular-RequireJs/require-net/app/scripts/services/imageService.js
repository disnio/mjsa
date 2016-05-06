function ImageItem(name, left, top, width, height, isFavourite) {

    var self = this;
    self.name = name;
    self.left = left;
    self.top = top;
    self.width = width;
    self.height = height;
    self.isFavourite = isFavourite;

    self.styleProps = function () {
        return {
            left: self.left + 'px',
            top: self.top + 'px',
            width: self.width + 'px',
            height: self.height + 'px',
            position: 'absolute'
        };
    };
    return self;
};


function FavImageItem(name) {

    var self = this;
    self.name = name;
    return self;
};

define(['services/services'],
  function (services) {
      services.factory('ImageService', [
        function () {
            return {
                createImageItem: function (name, left, top, width, height, isFavourite) {
                    return new ImageItem(name, left, top, width, height, isFavourite);
                },
                createFavImageItem: function (name) {
                    return new FavImageItem(name);
                }
            };
        }]);
  });
