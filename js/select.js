var select = angular.module("nz.select", []);
select.directive("nzMenu", function () {
    return {
        "restrict": "ECA",
        "replace": true,
        "require": "nzItem",
        "templateUrl": "../template/select-menu.html",
        "transclude": true,
        "link": function (scope, elem, attrs) {

        }
    }
});
select.directive("nzItem", function () {
    return {
        "restrict": "ECA",
        "replace": true,
        "require": "nzItem",
        "transclude": true,
        "templateUrl": "../template/select-item.html",
        "link": function (scope, elem, attrs) {

        }
    }
});
select.directive("nzSelect", function () {
    return {
        "restrict": "ECA",
        "replace": true,
        "require": "nzMenu",
        "templateUrl": "../template/select.html",
        "transclude": true,
        "link": function (scope, elem, attrs) {
            //focus 效果
            var focus = function (evt) {
                evt.stopPropagation();
                elem.addClass("focus");
            };
            var unfocus = function (evt) {
                evt.stopPropagation();
                elem.removeClass("focus");
            };
            elem.find(".select-by").bind("focus", focus);
            elem.find(".select-by").bind("focusout", unfocus);

            //元素销毁
            scope.$on("$destroy", function () {
                elem.find(".select-by").unbind("focus", focus);
                elem.find(".select-by").unbind("focusout", unfocus);
            });
        }
    }
});