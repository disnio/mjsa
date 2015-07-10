(function(global, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD
        define('mediator-js', [], function() {
            global.Mediator = factory();
            return global.Mediator;
        });
    } else if (typeof exports !== 'undefined') {
        // Node/CommonJS
        exports.Mediator = factory();
    } else {
        // Browser global
        global.Mediator = factory();
    }
}(this, function() {
    'use strict';

    function guidGenerator() {
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
}));

创建型设计模式：
关注于对象创建的机制方法， 通过该方法, 对象以适应工作环境的方式被创建。

构造器模式（ Constructor）, 工厂模式（ Factory）, 抽象工厂模式（ Abstract）, 原型模式（ Prototype）,
单例模式（ Singleton） 以及 建造者模式（ Builder）。

结构模式：
关注于对象组成和通常识别的方式实现不同对象之间的关系。
该模式有助于在系统的某一部分发生改变的时候， 整个系统结构不需要改变。
该模式同样有助于对系统中某部分没有达到某一目的的部分进行重组。

装饰模式， 外观模式， 享元模式， 适配器模式和代理模式。

行为模式：
关注改善或精简在系统中不同对象间通信。

迭代模式， 中介者模式， 观察者模式和访问者模式。

// -----------------------------------------------------
Creational 根据创建对象的概念分成下面几类。

Class
Factory Method(工厂方法) 通过将数据和事件接口化来构建若干个子类。

Object
Abstract Factory(抽象工厂) 建立若干族类的一个实例， 这个实例不需要具体类的细节信息。（ 抽象类）
Builder(建造者) 将对象的构建方法和其表现形式分离开来， 总是构建相同类型的对象。
Prototype(原型) 一个完全初始化的实例， 用于拷贝或者克隆。
Singleton(单例) 一个类只有唯一的一个实例， 这个实例在整个程序中有一个全局的访问点。
Structural 根据构建对象块的方法分成下面几类。

Class
Adapter(适配器) 将不同类的接口进行匹配， 调整， 这样尽管内部接口不兼容但是不同的类还是可以协同工作的。
Bridge(桥接模式) 将对象的接口从其实现中分离出来， 这样对象的实现和接口可以独立的变化。
Composite(组合模式) 通过将简单可组合的对象组合起来， 构成一个完整的对象，
这个对象的能力将会超过这些组成部分的能力的总和， 即会有新的能力产生。

Decorator(装饰器) 动态给对象增加一些可替换的处理流程。
Facada(外观模式) 一个类隐藏了内部子系统的复杂度， 只暴露出一些简单的接口。

Flyweight(享元模式) 一个细粒度对象， 用于将包含在其它地方的信息 在不同对象之间高效地共享。
Proxy(代理模式) 一个充当占位符的对象用来代表一个真实的对象。

Behavioral 基于对象间作用方式来分类。

Class
Interpreter(解释器) 将语言元素包含在一个应用中的一种方式， 用于匹配目标语言的语法。
Template Method(模板方法) 在一个方法中为某个算法建立一层外壳， 将算法的具体步骤交付给子类去做。

Object
Chain of Responsibility(响应链) 一种将请求在一串对象中传递的方式， 寻找可以处理这个请求的对象。
Command(命令) 封装命令请求为一个对象， 从而使记录日志， 队列缓存请求， 未处理请求进行错误处理 这些功能称为可能。
Iterator(迭代器) 在不需要直到集合内部工作原理的情况下， 顺序访问一个集合里面的元素。
Mediator(中介者模式) 在类之间定义简化的通信方式， 用于避免类之间显式的持有彼此的引用。
Observer(观察者模式) 用于将变化通知给多个类的方式， 可以保证类之间的一致性。
State(状态) 当对象状态改变时， 改变对象的行为。
Strategy(策略) 将算法封装到类中， 将选择和实现分离开来。
Visitor(访问者) 为类增加新的操作而不改变类本身。

// 对象设置 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
Object.defineProperty(newObject, "someKey", {
    value: "formorecontroloftheproperty'sbehavior",
    writable: true,
    enumerable: true,
    // configurable 特性表示对象的属性是否可以被删除，以及除 writable 特性外的其他特性是否可以被修改。
    configurable: true
});

Object.defineProperties(newObject, {
    "someKey": {
        value: "Hello World",
        writable: true
    },

    "anotherKey": {
        value: "Foo bar",
        writable: false
    }
});

o.propertyIsEnumerable('a'); // true
// 创建一个继承与Person的赛车司机
var driver = Object.create(person);

var bValue;
Object.defineProperty(o, "b", {
    get: function() {
        return bValue;
    },
    set: function(newValue) {
        bValue = newValue;
    },
    enumerable: true,
    configurable: true
});

在JavaScript中， 实现模块有几个选项：

模块化模式
对象表示法
AMD模块
CommonJS 模块
ECMAScript Harmony 模块
// -------------------------------------------------------
模块模式1：
var testModule = (function() {
    // 私有变量及函数
    // function abc() {}
    var counter = 0;
    return {
        incrementCounter: function() {
            return counter++;
        },
        resetCounter: function() {
            console.log("counter value prior to reset: " + counter);
            counter = 0;
        }
    };
})();

// Increment our counter
testModule.incrementCounter();

// 模块变体1：导入混合 ( Import Mixin )
var myModule = (function(jQ, _) {
    function privateMethod1() {
        jQ(".container").html("test");
    }

    function privateMethod2() {
        console.log(_.min([10, 5, 100, 2, 1000]));
    }
    return {
        publicMethod: function() {
            privateMethod1();
        }
    };
    // Pull in jQuery and Underscore
}(jQuery, _));
myModule.publicMethod();

// 模块变体2：Exports（导出）这个变体允许我们声明全局对象而不用使用它们
// Global module
var myModule = (function() {
    // Module object
    var module = {},
        privateVariable = "Hello World";

    function privateMethod() {
        // ...
    }
    module.publicProperty = "Foobar";
    module.publicMethod = function() {
        console.log(privateVariable);
    };
    return module;
}());

// jQuery 实现的模块模式
function library(module) {
    $(function() {
        if (module.init) {
            module.init();
        }
    });
    return module;
}
var myLibrary = library(function() {
    return {
        init: function() {
            // module implementation
        }
    };
}());
// 模块模式相对于真正的封装概念更清晰。 其次，模块模式支持私有数据
// 缺点：模块模式的缺点是因为我们采用不同的方式访问公有和私有成员，
// 因此当我们想要改变这些成员的可见性的时候，我们不得不在所有使用这些成员的地方修改代码。
// 其它缺点包括不能为私有成员创建自动化的单元测试，以及在紧急修复bug时所带来的额外的复杂性。

// 改进：暴露模块模式或揭露模块模式
var myRevealingModule = function() {
    var privateVar = "Ben Cherry",
        publicVar = "Hey there!";

    function privateFunction() {
        console.log("Name:" + privateVar);
    }

    function publicSetName(strName) {
        privateVar = strName;
    }

    function publicGetName() {
            privateFunction();
        }
        // Reveal public pointers to
        // private functions and properties
    return {
        setName: publicSetName,
        greeting: publicVar,
        getName: publicGetName
    };
}();
myRevealingModule.setName("Paul Kinlan");
// 缺点：这个模式的一个缺点是如果私有函数需要使用公有函数，那么这个公有函数在需要打补丁的时候就不能被重载。
// 因为私有函数仍然使用的是私有的实现，并且这个模式不能用于公有成员，只用于函数。
// 公有成员使用私有成员也遵循上面不能打补丁的规则。因为上面的原因，
// 使用暴露式模块模式创建的模块相对于原始的模块模式更容易出问题，因此在使用的时候需要小心。

// --------------------------------------------------------------------
//  单例模式
var mySingleton = (function() {
    // Instance stores a reference to the Singleton
    var instance;

    function init() {
        // 单例
        // 私有方法和变量
        function privateMethod() {
            console.log("I am private");
        }
        var privateVariable = "Im also private";
        var privateRandomNumber = Math.random();
        return {
            // 共有方法和变量
            publicMethod: function() {
                console.log("The public can see me!");
            },
            publicProperty: "I am also public",
            getRandomNumber: function() {
                return privateRandomNumber;
            }
        };
    };
    return {
        // 如果存在获取此单例实例， 如果不存在创建一个单例实例
        getInstance: function() {
            // 这里是重点，没有判断这不成单例
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();
var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true
// 在实践中，当一个对象需要和另外的对象进行跨系统协作的时候，单例模式很有用。
// 单例模式将不可预知的动态初始化顺序问题隔离掉，将控制权返回给程序员。
// 但是通常当我们发现自己需要在javascript使用它的时候，这是一种信号，表明我们可能需要去重新评估自己的设计。
// 这通常表明系统中的模块要么紧耦合要么逻辑过于分散在代码库的多个部分。
// 单例模式更难测试，因为可能有多种多样的问题出现，例如隐藏的依赖关系，很难去创建多个实例，很难清理依赖关系，等等。
var SingletonTester = (function() {
    // options: an object containing configuration options for the singleton
    // e.g var options = { name: "test", pointX: 5};
    function Singleton(options) {
            // set options to the options supplied
            // or an empty object if none are provided
            options = options || {};
            // set some properties for our singleton
            this.name = "SingletonTester";
            this.pointX = options.pointX || 6;
            this.pointY = options.pointY || 10;
        }
        // our instance holder
    var instance;
    // an emulation of static variables and methods
    var _static = {
        name: "SingletonTester",
        // Method for getting an instance. It returns
        // a singleton instance of a singleton object
        getInstance: function(options) {
            if (instance === undefined) {
                instance = new
                Singleton(options);
            }
            return
            instance;
        }
    };
    return _static;
})();
var singletonTest = SingletonTester.getInstance({
    pointX: 5
});
// Log the output of pointX just to verify it is correct
// Outputs: 5
console.log(singletonTest.pointX);
// ------------------------------------------------------------------------
// 一个被称作被【观察者】的对象，维护一组被称为观察者的对象，这些对象依赖于被观察者，
// 被观察者自动将自身的状态的任何变化通知给它们。
// 当一个被观察者需要将一些变化通知给观察者的时候，它将采用广播的方式，这条广播可能包含特定于这条通知的一些数据。
// 当特定的观察者不再需要接受来自于它所注册的被观察者的通知的时候，被观察者可以将其从所维护的组中删除。
// 观察者模式要求想要接受相关通知的观察者必须到发起这个事件的被观察者上注册这个事件。
// 发布/订阅模式使用一个主题/事件频道，这个频道处于想要获取通知的订阅者和发起事件的发布者之间。这个事件系统允许代码定义应用相关的事件，
// 这个事件可以传递特殊的参数，参数中包含有订阅者所需要的值。这种想法是为了避免订阅者和发布者之间的依赖性。
// 这种和观察者模式之间的不同，使订阅者可以实现一个合适的事件处理函数，用于注册和接受由发布者广播的相关通知。
// 
// 不是一个对象直接调用另外一个对象的方法，而是通过订阅另外一个对象的一个特定的任务或者活动，
// 从而在这个任务或者活动出现的时候的得到通知。
var pubsub = {};
(function(q) {
    var topics = {},
        subUid = -1;
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    q.publish = function(topic, args) {
        if (!topics[topic]) {
            return false;
        }
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
        while (len--) {
            subscribers[len].func(topic, args);
        }

        return this;
    };
    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    q.subscribe = function(topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    q.unsubscribe = function(token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    };
}(pubsub));

var messageLogger1 = function(topics, data) {
    console.log("Logging1: " + topics + ": " + data);
};

var messageLogger2 = function(topics, data) {
    console.log("Logging2: " + topics + ": " + data);
};

var subscription1 = pubsub.subscribe("inbox/newMessage", messageLogger1);
var subscription2 = pubsub.subscribe("inbox/newMessage", messageLogger2);
// Publishers are in charge of publishing topics or notifications of
// interest to the application. e.g:
pubsub.publish("inbox/newMessage", "hello world!");
// or
pubsub.publish("inbox/newMessage", ["test", "a", "b", "c"]);
// or
pubsub.publish("inbox/newMessage", {
    sender: "hello@google.com",
    body: "Hey again!"
});

pubsub.publish("inbox/newMessage", "Hello! are you still there?");
// ----------------------------------------------------------------------
// 中介者
