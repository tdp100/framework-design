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
absolute scope  scope:

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
https://github.com/jsprodotcom/source/blob/master/AngularJS_Note_Taker-source_code.zip


2. 工程打包方式
3. 如何解耦(与样式)
4. 如何可以做到html代码可定制
5. 校验方式
6. 文档 ng-doc  http://usejsdoc.org/
   https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation

LESS 语法，每一个控件都对应一个less文件
http://www.lesscss.net/features/#features-overview-feature--variables-

flat-ui
https://github.com/designmodo/Flat-UI
http://designmodo.github.io/Flat-UI/

icon design:http://www.youtube.com/watch?v=t6VD2EKfvqc

#chapter2 lazy-load
http://blog.getelementsbyidea.com/load-a-module-on-demand-with-angularjs/
http://ify.io/lazy-loading-in-angularjs/

如何消除require一次性加文件全部加载上来了

html2js 可以将directive定义的模板转化成JS代码

视图的加载事件:http://www.bennadel.com/blog/2555-preloading-data-before-executing-nginclude-in-angularjs.htm
