var main = angular.module("main",["ng","fm.searchbox"]);
main.controller("component", function($scope) {
    $scope.value = "123";
    $scope.search = function() {
        console.log("search value = ", $scope.value);
    };
    $scope.$watch("value", function(newV) {
        console.log("parent value = ", newV);
    });
    $scope.deleter = function() {
        angular.element(".search-box").remove();
    };
});