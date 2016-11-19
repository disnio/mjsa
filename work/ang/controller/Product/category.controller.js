/* 
 * @Author: Allen
 * @Date:   2016-03-21 10:52:53
 * @Last Modified by:   Allen
 * @Last Modified time: 2016-08-12 14:12:05
 */

angular.module('yoB').controller('CategoryController', ["$scope", "$q", "$state", "list", "cateSel", function($scope, $q, $state, list, cateSel) {

    var vm = this;

    $q.all([list]).then(function(res) {
        vm.cates = res[0].data.Data;
        // console.log(vm.cates)
        vm.sel = [];

        var genChild = function(cates, pid) {
            return _.filter(cates, function(v) {
                return v.ParentID == pid
            });
        };
        var hasChild = function(cates, item) {
            return _.some(cates, function(v) {
                return v.ParentID == item.ID;
            });
        };
        vm.hasChild = function(item) {
            return hasChild(vm.cates, item)
        };

        vm.openChild = function(e, item, n) {
            e.preventDefault();
            var ep = $(e.currentTarget).parent();
            ep.siblings().removeClass("active");
            ep.addClass("active");
            if(_.isEmpty(vm.sel)){
                vm.sel.push(item);                
            }else {
                vm.sel.splice(n-1, vm.sel.length, item);
            }

            $scope.$emit("add-box", {
                index: n,
                item: item
            });
            
        };
        vm.Arr = [];
        vm.Arr[0] = genChild(vm.cates, 0);
        $scope.$on("add-box", function(e, data) {
            for (var i = vm.Arr.length; i > data.index; i--) {
                vm.Arr[i] = [];
            }
            vm.Arr[data.index] = genChild(vm.cates, data.item.ID);
        });

        vm.selCate = function(){
            if(_.isEmpty(vm.sel)){
                return;
            }
            cateSel.set(vm.sel);
            
            $state.go('pub');
        };

        vm.disClick = function(){
            return _.isEmpty(vm.sel);
        };

    });
}]);