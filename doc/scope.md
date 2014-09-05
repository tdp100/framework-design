scope详解
------

##### scope 原型继承
位于:angularjs-src\src\ng\rootScope.js
```javascript
function Scope() {
    this.$id = nextUid();
    this.$$phase = this.$parent = this.$$watchers =
        this.$$nextSibling = this.$$prevSibling =
            this.$$childHead = this.$$childTail = null;
    this['this'] = this.$root = this;
    this.$$destroyed = false;
    this.$$asyncQueue = [];
    this.$$postDigestQueue = [];
    this.$$listeners = {};
    this.$$listenerCount = {};
    this.$$isolateBindings = {};
}
Scope.prototype = {
    constructor: Scope,
    $new: function (isolate) {
        var ChildScope,
            child;

        if (isolate) {
            child = new Scope();
            child.$root = this.$root;
            // ensure that there is just one async queue per $rootScope and its children
            child.$$asyncQueue = this.$$asyncQueue;
            child.$$postDigestQueue = this.$$postDigestQueue;
        } else {
            // Only create a child scope class if somebody asks for one,
            // but cache it to allow the VM to optimize lookups.
            if (!this.$$childScopeClass) {
                this.$$childScopeClass = function () {
                    this.$$watchers = this.$$nextSibling =
                        this.$$childHead = this.$$childTail = null;
                    this.$$listeners = {};
                    this.$$listenerCount = {};
                    this.$id = nextUid();
                    this.$$childScopeClass = null;
                };
                this.$$childScopeClass.prototype = this;
            }
            child = new this.$$childScopeClass();
        }
        child['this'] = child;
        child.$parent = this;
        child.$$prevSibling = this.$$childTail;
        if (this.$$childHead) {
            this.$$childTail.$$nextSibling = child;
            this.$$childTail = child;
        } else {
            this.$$childHead = this.$$childTail = child;
        }
        return child;
    }
}
```

1. 当创建一个独立的scope时，该scope不会原型继承父scope实例， 但scope.$parent为父scope实例
2. 当创建一个子scope时,  该子scope的watchers， listeners等全部为空(见$$childScopeClass), 然后原型继承于父scope(见;this.$$childScopeClass.prototype = this;)

##### scope watch
1. `$watch` 用于观察表达式计算值的变化.
注意，如果表达式是一个引用对象的话，需要在设置第三个参数为true
即：
scope.$watch("exp", listener, true);
见代码：
```javascript
$watch: function (watchExp, listener, objectEquality) {
    var scope = this,
    get = compileToFn(watchExp, 'watch'),
    array = scope.$$watchers,
    watcher = {
        fn: listener,      //设置它的listener
        last: initWatchVal,
        get: get,
        exp: watchExp,
        eq: !!objectEquality
    };
    ...
    return function deregisterWatch() {
        arrayRemove(array, watcher);
        lastDirtyWatch = null;
    };
}
```

```javascript
$digest: function () {
   ...
   watch.last = watch.eq ? copy(value, null) : value;   //这里如果设置了eq:true, 那么将执行copy 深拷贝到一个新的引用对象上
   watch.fn(value, ((last === initWatchVal) ? value : last), current);
   ...
}
```

2. `$watchCollection` 用于观察引用对象值的变化.
如果是引用对象，也可以直接使用$watchCollection(obj, listener)