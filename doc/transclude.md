transclude详解

该属性用于定义directive时使用，它的最大的作用在于能够支持自定义directive嵌套子标签。

###### transclude 属性取值
transclude 只有两个属性可以选择：true/element

+ 当为true时，表示不会保留嵌套的元素：
  如：
  ```html
  <transclude-elem>
      <span>{{item}}</span>
  <transclude-elem>
  ```

  ```js
  app.directive("transcludeElem", function() {
      return {
          "transclude":true,
          "template":"<div ng-transclude></div>",
          "link":function(){}
      };
  })
  ```

  那么解析之后则为：
  ```html
  <div ng-transclude>
    <span>{{item}}</span>
  </div>
  ```

+ 如果设置为"element"，则表示会保留嵌套的元素
  那么解析之后则为：
  ```html
  <div ng-transclude>
    <transclude-elem>
        <span>{{item}}</span>
    <transclude-elem>
  </div>
  ```

***注意：一个directive 的template/templateUrl中最多只有有一个ng-transclude***
###### transclude scope
directive与ng-transclude属于sibling关系，即直接继承于directive的controller scope(如果directive的scope是absolute时除外)
同时ng-transclude有自己的scope，它原型继承于directive的controller scope。

在link函数中如何给ng-transclude中的标签指定scope？
1. 当directive 的使用域是一个独立作用域时，那么ng-transclude会产生一个原始作用域(它原型继承于父scope)，充当ng-transclude的孩子节点的scope，而该原始作用域与directive
独立作用域拥有相同的父级.

2. 当directive不是独立作用域时，那么directive的作用域就是父作用域，而ng-transclude依然会产生一个原始作用域（它原型继承于父scope），充当ng-transclude的孩子节点的scope.

基于上面的原则，我们也可以通过修改transcludeFn中的函数执行上下文的作用域来进行修改:
```js
"link" : function linkFn(scope, element, attrs, controller, transcludeFn) {
  transcludeFn(function(clone, tscope) {
  });
}

"link" : function linkFn(scope, element, attrs, controller, transcludeFn) {
  transcludeFn(scope, function(clone, scope) {
  });
}

"link" : function linkFn(scope, element, attrs, controller, transcludeFn) {
  transcludeFn(scope.$parent, function(clone, scope) {
  });
}
```

http://www.ngnice.com/docs/guide/compiler
http://www.angularjs.cn/A0pU
http://angular-tips.com/blog/2014/03/transclusion-and-scopes/
http://www.html-js.com/article/1869
