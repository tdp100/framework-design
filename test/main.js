var main = angular.module("main", ["ng","nz.searchbox","ui.bootstrap"]);
main.config(["$controllerProvider", "$compileProvider", function($controllerProvider, $compileProvider){
    main.controllerProvider = $controllerProvider;
    main.compileProvider = $compileProvider;
}]);
main.controller("component", function($scope,  $modal) {
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

    $scope.openWindow = function() {
        var modalInstance = $modal.open({
            templateUrl: "./window/persons.html",
            controller: "person.ctrl",
            size: "md",
            backdrop: true,
            resolve: {
                deps: function ($q) {
                    var controllerProvider = angular.module("main").controllerProvider;
                    var deferred = $q.defer();
                    var dependencies = ["./window/person"];
                    require(dependencies, function (ctrl) {
                        controllerProvider.register("person.ctrl", ctrl);
                        deferred.resolve();
                    });
                    return deferred.promise;
                }
            }
        });
    };
});