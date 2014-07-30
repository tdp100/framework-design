var searchbox = angular.module("nz.searchbox", []);
/**
 * @ngdoc nzSearch
 */
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
            var keydown = function (evt) {
                evt.stopPropagation();
                if (evt.which !== 13) {
                    return;
                }
                var search = scope.search;
                if (angular.isFunction(search)) {
                    search();
                }
            };
            elem.bind("keydown", keydown); //避免使用闭包

            //focus 效果
            var focus = function(evt) {
                evt.stopPropagation();
                elem.addClass("focus");
            };
            var unfocus = function(evt) {
                evt.stopPropagation();
                elem.removeClass("focus");
            };
            elem.find(".search-by").bind("focus", focus);
            elem.find(".search-by").bind("focusout", unfocus);

            //元素销毁
            scope.$on("$destroy", function () {
                elem.unbind("keydown", keydown);
                elem.find(".search-by").unbind("focus", focus);
                elem.find(".search-by").unbind("focusout", unfocus);
            });
        }
    }
});
