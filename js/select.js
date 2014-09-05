var select = angular.module("nz.select", []);
select.directive("nzItemTemplate", function () {
    return {
        "restrict": "ECA",
        "replace": true,
//        "templateUrl": "../template/select-item.html",
        "transclude": true,
        "link": function (scope, elem, attrs, controller, transcludeFn) {
            console.log("nzItemTemplate.scope = ",scope);
            console.log("nzItemTemplate.scope.fruit = ", scope.fruit);
            transcludeFn(scope, function (clone) {
                elem.html(clone);
            });
        }
    }
});
select.directive("nzMenu", function () {
    return {
        "restrict": "ECA",
        "replace": true,
//        "templateUrl": "../template/select-menu.html",
        "transclude": true,
        "scope": true,
        "link": function (scope, elem, attrs, controller, transcludeFn) {
            console.log("nzMenu.scope = ",scope);
            scope.menu = "tdp";
            transcludeFn(scope, function (clone) {
                elem.html(clone);
            });
        }
    }
});
select.directive("nzSelect", function () {
    return {
        "restrict": "ECA",
        "replace": true,
        "scope": {
            "data": "="
        },
        "templateUrl": "../template/select.html",
        "transclude": true,
        "link": function (scope, elem, attrs, controller, transcludeFn) {
            console.log("nzSelect.scope = ",scope);
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