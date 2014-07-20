framework-design
================

框架设计思想

#chapter 1 directive思考
1. 如何写directive 组件

http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
过程：
compile阶段
link 阶段

故需要link函数, 它负责scope与template之间的绑定

scope

parent scope    scope: false
child scope     scope:true
absolute scope  scope:{}

scope:true/scope:{} 场景
子scope如何取父scope中的属性

= 使用父scope中的属性

@(attr) 表达式方式，使用父scope计算表达式，将赋值给directive的attr。如果scope中的property属性与directive中的attr 同名时，可以不用写attr

比如：
app.directive('helloWorld', function() {
  return {
    scope: {
      color: '@colorAttr'
    },
    ....
    // the rest of the configurations
  };
});
<body ng-controller="MainCtrl">
  <input type="text" ng-model="color" placeholder="Enter a color"/>
  <hello-world color-attr="{{color}}"/>
</body>
这里把{{color}}的值赋值给color-attr， 而color-attr的值又绑定给了scope中的color

&(function)

scope:true/scope:{} 场景
子scope如何将属性动态反馈到父scope中
$eval

tranclude
http://www.html-js.com/article/1869, 嵌入部分
在AngularJS中你只在一个指令的模板中只能申明一个ng-tranclude


2. 工程打包方式
3. 如何解耦(与样式)
4. 如何可以做到html代码可定制
5. 校验方式
6. 文档 ng-doc  http://usejsdoc.org/
   https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation


