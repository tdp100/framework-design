var menus = angular.module("nz.menus", []);
/**
 * @ngdoc nzMenus
 */
searchbox.directive("nzMenus", function ($parse) {
    return {
        "restrict": "ECA",
        "scope": {
            "services": "="
        },
        "replace": true,
        "templateUrl": "../template/menus.html"
    }
});