var searchbox = angular.module("nz.searchbox", []);
searchbox.directive("nzSearch", function ($parse) {
    return {
        "restrict": "ECA",
        "scope": {
            "value": "=",
            "search": "&"
        },
        "replace": true,
        "templateUrl": "../template/searchbox.html",
        "link": function (scope, elem, attrs) {
            scope.clearCls = "";
            scope.placeholder = "请输入搜索内容";
            scope.clear = function () {
                scope.value = "";
                scope.close();
            };
            scope.close = function () {
                elem.find(".search-by").focus();
            };
            //input 使用ng-module，会反馈到父scope中去
            scope.$watch("value", function (newV) {
                if (!newV) {
                    scope.clearCls = "clear";
                }
                else {
                    scope.clearCls = "";
                }
            });

            //键盘事件
            var keydown = function (event) {
                event.stopPropagation();
                if (event.which !== 13) {
                    return;
                }
                var search = scope.search;
                if (angular.isFunction(search)) {
                    search();
                }
            };
            elem.bind("keydown", keydown); //避免使用闭包

            //元素销毁
            scope.$on("$destroy", function () {
                elem.unbind("keydown", keydown);
            });
        }
    }
});
