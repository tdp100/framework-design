var main = angular.module("main", ["ng","nz.searchbox","nz.menus", "nz.select", "ui.bootstrap"]);
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

    $scope.services = [
        {
            "name": "首页", //一级菜单名称
            "node": {
                "state": "home",//菜单对应的state
                "scenes": ["allinone"],    //菜单对应的场景
                "rights": ["12"]     //菜单对应的权限
            }
        },{
            "name": "服务", //一级菜单名称
            "node": {
                "state": "home",//菜单对应的state
                "scenes": ["allinone"],    //菜单对应的场景
                "rights": ["12"]     //菜单对应的权限
            },
            "children": [
                {
                    "name": "所有服务", //一级菜单名称
                    "children": [{
                        "name": "服务", //一级菜单名称
                        "node": {
                            "state": "home",//菜单对应的state
                            "scenes": ["allinone"],    //菜单对应的场景
                            "rights": ["12"]     //菜单对应的权限
                        },
                    }]
                },
                {
                    "name": "home.er1", //一级菜单名称
                    "node": {
                        "state": "home.er1",//菜单对应的state
                        "scenes": ["allinone"],    //菜单对应的场景
                        "rights": ["123"]     //菜单对应的权限
                    }
                }
            ]
        }
    ];


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