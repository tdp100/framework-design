http://lesscss.org/

1.  variables 变量
@符号定义的常量，被当成变量
Note that variables are actually "constants" in that they can only be defined once.

eg: @nice-blue:  #5B83AD;

2) 在变量名，属性，url， @import中使用变量， ${var_name}
3) 变量作为变量名， @@var_name
4) 默认变量

2. extend 继承
1) extend(rule_name)
eg:
```css
nav ul {
  &:extend(.inline);
  background: blue;
}
.inline {
  color: red;
}
```
2) nth 表达式
```css
:nth-child(1n+3) {
  color: blue;
}
.child:extend(n+3) {}
```
3) extend all

4) 如果selector rule定义名采用变量声明，则extend将不会匹配变量的值


3.  混合 Mixins
1) css 规则嵌套
2) & 表示当前嵌套规则的父规则，很强大
3) 只定义一个mixins 规则，但不编译出来, 只要在规则后台加上()即可
4) 混合规则声明时，rule_name(); 与rule_name;是一样的
5) 带参数的mixins， 参数可以给出默认值
6) 多参数的mixins, 命名参数的mininx
7) @arguments 变量
8) @rest 变量
9) when 条件判断

4. import 导入

5. merge 合并
1) 逗号合并, 规则后面使用+
2) 空格合并，规则后面使用+_

6. function 函数
