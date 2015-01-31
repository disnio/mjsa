var app = angular.module('app', []);
app.controller('lighbox', ['$scope', function($scope){
	$scope.groups = {
					    1:{
					      thumb: 'http://www.altiusdirectory.com/Travel/images/McKinley%20Mountain%20Image.jpg',
					      image: 'http://www.altiusdirectory.com/Travel/images/McKinley%20Mountain%20Image.jpg',
					      title: 'This is a dummy title for pic 1',
					      description:'this is where the description goes'
					    },
					    2:{
					      thumb: 'https://lh4.ggpht.com/zQIXMNP87brRkMSRRiALQkgF-JRQeBW5vMgqwUt3xMwKw3yeZeZyH1GU6lzXNbDBuRM=w300',
					      image: 'https://lh4.ggpht.com/zQIXMNP87brRkMSRRiALQkgF-JRQeBW5vMgqwUt3xMwKw3yeZeZyH1GU6lzXNbDBuRM=w300',
					      title: 'This is a dummy title for pic 2',
					      description:'this is where the description for pic 2 goes '
					    },
					    3:{
					      thumb: 'http://ecx.images-amazon.com/images/I/81UUXP-xN4L._SL500_AA300_.png',
					      image: 'http://ecx.images-amazon.com/images/I/81UUXP-xN4L._SL500_AA300_.png',
					      title: 'This is a dummy title for pic 2',
					      description:'this is where the description for pic 2 goes '
					    }
			  };

}])

app.directive('lightbox', function() {
  return {
      restrict: 'E',
      scope:false,
      controller:function($scope){
	  },
      link:function(scope, element, attrs){
      	scope.showLight = false;
      	scope.showpopup = function(imagenew){
      		scope.showlight = 'show';
      		scope.pop = scope.groups[imagenew].image;
      	}
      	scope.removelightbox = function(){
      		scope.showlight = 'FALSE';
      	}
      	scope.nextpopup  = function(nextimage){
  			scope.showlight = 'show';
  			console.log(scope.groups);
  			scope.pop = nextimage;
  		}
	  },
      templateUrl:"lightbox.html"

  };
});