define(function() {
    function PersonCtrl($scope, $modalInstance) {
        $scope.data = [{
            name: "tdp",
            age: 25,
            addr: "sc.dz"
        },{
            name: "hw",
            age: 20,
            addr: "gz.sz"
        }];

        $scope.ok = function() {
            $modalInstance.close();
        };
    }
    PersonCtrl.$injector = ["$scope", "$modalInstance"];
    return PersonCtrl;
});