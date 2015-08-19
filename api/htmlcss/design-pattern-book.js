// $.error breaks jQuery chaining
var logError = typeof console === 'undefined' ? noop :
    function (message) {
        console.error(message);
    };
//----------------------------------------------
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
//
//创建型设计模式：
//关注于对象创建的机制方法， 通过该方法, 对象以适应工作环境的方式被创建。
//
//构造器模式（ Constructor）, 工厂模式（ Factory）, 抽象工厂模式（ Abstract）, 原型模式（ Prototype）,
//单例模式（ Singleton） 以及 建造者模式（ Builder）。
//
//结构模式：
//关注于对象组成和通常识别的方式实现不同对象之间的关系。
//该模式有助于在系统的某一部分发生改变的时候， 整个系统结构不需要改变。
//该模式同样有助于对系统中某部分没有达到某一目的的部分进行重组。
//
//装饰模式， 外观模式， 享元模式， 适配器模式和代理模式。
//
//行为模式：
//关注改善或精简在系统中不同对象间通信。
//
//迭代模式， 中介者模式， 观察者模式和访问者模式。
//
//// -----------------------------------------------------
//Creational 根据创建对象的概念分成下面几类。
//
//Class
//Factory Method(工厂方法) 通过将数据和事件接口化来构建若干个子类。
//
//Object
//Abstract Factory(抽象工厂) 建立若干族类的一个实例， 这个实例不需要具体类的细节信息。（ 抽象类）
//Builder(建造者) 将对象的构建方法和其表现形式分离开来， 总是构建相同类型的对象。
//Prototype(原型) 一个完全初始化的实例， 用于拷贝或者克隆。
//Singleton(单例) 一个类只有唯一的一个实例， 这个实例在整个程序中有一个全局的访问点。
//Structural 根据构建对象块的方法分成下面几类。
//
//Class
//Adapter(适配器) 将不同类的接口进行匹配， 调整， 这样尽管内部接口不兼容但是不同的类还是可以协同工作的。
//Bridge(桥接模式) 将对象的接口从其实现中分离出来， 这样对象的实现和接口可以独立的变化。
//Composite(组合模式) 通过将简单可组合的对象组合起来， 构成一个完整的对象，
//这个对象的能力将会超过这些组成部分的能力的总和， 即会有新的能力产生。
//
//Decorator(装饰器) 动态给对象增加一些可替换的处理流程。
//Facada(外观模式) 一个类隐藏了内部子系统的复杂度， 只暴露出一些简单的接口。
//
//Flyweight(享元模式) 一个细粒度对象， 用于将包含在其它地方的信息 在不同对象之间高效地共享。
//Proxy(代理模式) 一个充当占位符的对象用来代表一个真实的对象。
//
//Behavioral 基于对象间作用方式来分类。
//
//Class
//Interpreter(解释器) 将语言元素包含在一个应用中的一种方式， 用于匹配目标语言的语法。
//Template Method(模板方法) 在一个方法中为某个算法建立一层外壳， 将算法的具体步骤交付给子类去做。
//
//Object
//Chain of Responsibility(响应链) 一种将请求在一串对象中传递的方式， 寻找可以处理这个请求的对象。
//Command(命令) 封装命令请求为一个对象， 从而使记录日志， 队列缓存请求， 未处理请求进行错误处理 这些功能称为可能。
//Iterator(迭代器) 在不需要直到集合内部工作原理的情况下， 顺序访问一个集合里面的元素。
//Mediator(中介者模式) 在类之间定义简化的通信方式， 用于避免类之间显式的持有彼此的引用。
//Observer(观察者模式) 用于将变化通知给多个类的方式， 可以保证类之间的一致性。
//State(状态) 当对象状态改变时， 改变对象的行为。
//Strategy(策略) 将算法封装到类中， 将选择和实现分离开来。
//Visitor(访问者) 为类增加新的操作而不改变类本身。

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

//在JavaScript中， 实现模块有几个选项：
//
//模块化模式
//对象表示法
//AMD模块
//CommonJS 模块
//ECMAScript Harmony 模块

// -------------------------模块模式------------------------------

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

// --------------------------------单例模式------------------------------------
//  【单例模式】，单例一般是用在系统间各种模式的通信协调上
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
//  --------------------------------------------------
// 其它1：
function Universe() {
    if (typeof Universe.instance === 'object') {
        return Universe.instance;
    }
    this.start_time = 0;
    this.bang = "Big";
    Universe.instance = this;
}
var uni = new Universe();
var uni2 = new Universe();
console.log(uni === uni2);

// 其它2：
function Universe() {
    var instance = this;
    this.start_time = 0;
    this.bang = "Big";
    // 重写构造函数
    Universe = function() {
        return instance;
    };
}
var uni = new Universe();
var uni2 = new Universe();
uni.bang = "123";
console.log(uni === uni2); // true
console.log(uni2.bang); // 123复制代码

// 其它3：
function Universe() {
    var instance;
    Universe = function Universe() {
        return instance;
    };
    // 后期处理原型属性
    Universe.prototype = this;
    instance = new Universe();
    // 重设构造函数指针
    instance.constructor = Universe;
    instance.start_time = 0;
    instance.bang = "Big";
    return instance;
}
var uni = new Universe();
var uni2 = new Universe();
console.log(uni === uni2);
Universe.prototype.nothing = true;
var uni = new Universe();
Universe.prototype.everything = true;
var uni2 = new Universe();
console.log(uni.nothing);
console.log(uni2.nothing);
console.log(uni.everything);
console.log(uni2.everything);
console.log(uni.constructor === Universe); // true复制代码

// 其它4：
var Universe;
(function() {
    var instance;
    Universe = function Universe() {
        if (instance) {
            return instance;
        }
        instance = this;
        this.start_time = 0;
        this.bang = "Big";
    };
}());
var a = new Universe();
var b = new Universe();
alert(a === b);
a.bang = "123";
alert(b.bang); // 123


// ---------------------------------建造者模式---------------------------------------
//可以将一个复杂对象的构建与其表示相分离，使得同样的构建过程可以创建不同的表示。
//也就是说如果我们用了建造者模式，那么用户就需要指定需要建造的类型就可以得到它们，而具体建造的过程和细节就不需要知道了。

function getBeerById(id, callback) {
    asyncRequest('GET', 'beer.uri?id=' + id, function(resp) {
        callback(resp.responseText);
    });
}
var el = document.querySelector('#test');
el.addEventListener('click', getBeerByIdBridge, false);

function getBeerByIdBridge(e) {
    getBeerById(this.id, function(beer) {
        console.log('Requested Beer: ' + beer);
    });
}
// ----------------------------------工厂模式--------------------------------------

//创建对象（视为工厂里的产品）时无需指定创建对象的具体类。
//
//工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。
//该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。

//:1：
var productManager = {};
productManager.createProductA = function() {
    console.log('ProductA');
}
productManager.createProductB = function() {
    console.log('ProductB');
}
productManager.factory = function(typeType) {
    return new productManager[typeType];
}
productManager.factory("createProductA");

// 2：
var page = page || {};
page.dom = page.dom || {};
page.dom.Text = function() {
    this.insert = function(where) {
        var txt = document.createTextNode(this.url);
        where.appendChild(txt);
    };
};

page.dom.Link = function() {
    this.insert = function(where) {
        var link = document.createElement('a');
        link.href = this.url;
        link.appendChild(document.createTextNode(this.url));
        where.appendChild(link);
    };
};

page.dom.Image = function() {
    this.insert = function(where) {
        var im = document.createElement('img');
        im.src = this.url;
        where.appendChild(im);
    };
};

page.dom.factory = function(type) {
    return new page.dom[type];
}
var o = page.dom.factory('Link');
o.url = 'http://www.cnblogs.com';
o.insert(document.body);

// -----------------------------------装饰者-------------------------------------
//提供比继承更有弹性的替代方案。装饰者用于包装不？同接口的对象，不仅允许你向方法添加行为，
//而且还可以将方法设置成原始对象调用（例如装饰者的构造函数）。
//
//装饰者用于通过重载方法的形式添加新功能，该模式可以在被装饰者前面或者后面加上自己的行为以达到特定的目的。
//当脚本运行时，在子类中增加行为会影响原有类所有的实例，而装饰者却不然。取而代之的是它能给不同对象各自添加新行为。
var tree = {};
tree.decorate = function() {
    console.log('Make sure the tree won\'t fall');
};
tree.getDecorator = function(deco) {
    tree[deco].prototype = this;
    return new tree[deco];
};
tree.RedBalls = function() {
    this.decorate = function() {
        this.RedBalls.prototype.decorate();
        console.log('Put on some red balls');
    }
};
tree.BlueBalls = function() {
    this.decorate = function() {
        this.BlueBalls.prototype.decorate();
        console.log('Add blue balls');
    }
};
tree.Angel = function() {
    this.decorate = function() {
        this.Angel.prototype.decorate();
        console.log('An angel on the top');
    }
};
tree = tree.getDecorator('BlueBalls');
tree = tree.getDecorator('Angel');
tree = tree.getDecorator('RedBalls');
tree.decorate(); 
// --
function ConcreteClass() {
    this.performTask = function() {
        this.preTask();
        console.log('doing something');
        this.postTask();
    };
}

function AbstractDecorator(decorated) {
    this.performTask = function() {
        decorated.performTask();
    };
}

function ConcreteDecoratorClass(decorated) {
    this.base = AbstractDecorator;
    this.base(decorated);
    decorated.preTask = function() {
        console.log('pre-calling..');
    };
    decorated.postTask = function() {
        console.log('post-calling..');
    };
}

var concrete = new ConcreteClass();
var decorator1 = new ConcreteDecoratorClass(concrete);
var decorator2 = new ConcreteDecoratorClass(decorator1);
decorator1.performTask();
decorator2.performTask();
// ------------------------------------------------------------------------
//外观模式不仅简化类中的接口，而且对接口与调用者也进行了解耦。外观模式 Facade
//
//代理模式（Proxy），为其他对象提供一种代理以控制对这个对象的访问。
//    远程代理，也就是为了一个对象在不同的地址空间提供局部代表，这样可以隐藏一个对象存在于不同地址空间的事实，就像web service里的代理类一样。
//    虚拟代理，根据需要创建开销很大的对象，通过它来存放实例化需要很长时间的真实对象，比如浏览器的渲染的时候先显示问题，而图片可以慢慢显示（就是通过虚拟代理代替了真实的图片，此时虚拟代理保存了真实图片的路径和尺寸。
//    安全代理，用来控制真实对象访问时的权限，一般用于对象应该有不同的访问权限。
//    智能指引，只当调用真实的对象时，代理处理另外一些事情。例如C#里的垃圾回收，使用对象的时候会有引用次数，如果对象没有引用了，GC就可以回收它了。

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
// -------
function Observer() {
    this.fns = [];
}
Observer.prototype = {
    subscribe: function(fn) {
        this.fns.push(fn);
    },
    unsubscribe: function(fn) {
        this.fns = this.fns.filter(function(el) {
            if (el !== fn) {
                return el;
            }
        });
    },
    update: function(o, thisObj) {
        var scope = thisObj || window;
        this.fns.forEach(function(el) {
            el.call(scope, o);
        });
    }
};
var o = new Observer;
var f1 = function(data) {
    console.log('Robbin: ' + data + ', 赶紧干活了！');
};
var f2 = function(data) {
    console.log('Randall: ' + data + ', 找他加点工资去！');
};
o.subscribe(f1);
o.subscribe(f2);
o.update("Tom回来了！") 
o.unsubscribe(f1);
o.update("Tom回来了！");
// ------------ 
var observer = {
    addSubscriber: function(callback) {
        this.subscribers[this.subscribers.length] = callback;
    },
    removeSubscriber: function(callback) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete(this.subscribers[i]);
            }
        }
    },
    publish: function(what) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function') {
                this.subscribers[i](what);
            }
        }
    },
    // 多个订阅者
    make: function(o) {
        for (var i in this) {
            o[i] = this[i];
            o.subscribers = [];
        }
    }
};
var blogger = {
    recommend: function(id) {
        var msg = 'dudu 推荐了的帖子:' + id;
        this.publish(msg);
    }
};
var user = {
    vote: function(id) {
        var msg = '有人投票了!ID=' + id;
        this.publish(msg);
    }
};
observer.make(blogger);
observer.make(user);

var tom = {
    read: function(what) {
        console.log('Tom看到了如下信息：' + what)
    }
};
var mm = {
    show: function(what) {
        console.log('mm看到了如下信息：' + what)
    }
};
blogger.addSubscriber(tom.read);
blogger.addSubscriber(mm.show);
blogger.recommend(123);
blogger.removeSubscriber(mm.show);
blogger.recommend(456);
user.addSubscriber(mm.show);
user.vote(789);

/*
 * jQuery Tiny Pub/Sub
 * https://github.com/cowboy/jquery-tiny-pubsub
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

(function($) {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));

function handle(e, a, b, c) {
    console.log(e, a + b + c);
};

$.subscribe("/some/topic", handle);
$.publish("/some/topic", ["a", "b", "c"]);
$.unsubscribe("/some/topic", handle);

$.subscribe("/some/tox", function(e, a, b, c) {
    console.log(e, a + "--" + b + c);
});

$.publish("/some/tox", ["a", "b", "c"]);
$.unsubscribe("/some/tox");
// --------
//<button id="addNewObserver">Add new Observer checkbox</button>
//<input type="checkbox" id="mainCheckbox"/>
//
//<div id="observersContainer"></div>

function ObserverList(){
    this.observerList = [];
}

ObserverList.prototype.Add = function(obj){
    return this.observerList.push(obj);
};

ObserverList.prototype.Empty = function(){
    this.observerList = [];
};

ObserverList.prototype.Count = function(){
    return this.observerList.length;
};

ObserverList.prototype.Get = function( index ){
    if( index > -1 && index < this.observerList.length ){
        return this.observerList[index];
    }
};

ObserverList.prototype.Insert = function( obj, index ){
    var pointer = -1;

    if(index === 0){
        this.observerList.unshift(obj);
        pointer = index;
    }
    if(index  === this.observerList.length){
        this.observerList.push(obj);
        pointer = index;
    }
    return pointer;
};

ObserverList.prototype.IndexOf = function( obj, startIndex ){
    var i = startIndex, pointer = -1;
    while ( i< this.observerList.length){
        if(this.observerList[i] === obj){
            pointer = i;
        }
        i++;
    }
    return pointer;
};

ObserverList.prototype.RemoveIndexAt = function( index ){
    if(index === 0){
        this.observerList.shift();
    }
    if(index == this.observerList.length){
        this.observerList.pop();
    }
};

function extend( obj, extension ){
    for (var i in obj ){
        extension[i] = obj[i];
    }
}

function Subject(){
    this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function( observer ){
    this.observers.Add(observer);
};

Subject.prototype.RemoveObserver = function( observer ){
    this.observers.RemoveIndexAt(this.observers.IndexOf(observer, 0));
};

Subject.prototype.Notify = function( context ){
    var observerCount = this.observers.Count();
    for (var i=0; i<observerCount; i++){
        this.observers.Get(i).Update(context);
    }
};

function Observer() {
    this.Update = function(context){
        console.log(context);
    }
}

var controlCheckbox = document.getElementById('mainCheckbox'),
    addBtn = document.getElementById('addNewObserver'),
    container = document.getElementById('observersContainer');

extend(new Subject(), controlCheckbox);
controlCheckbox["onclick"] = new Function(" controlCheckbox.Notify(controlCheckbox.checked)");
addBtn["onclick"] = AddNewObserver;

function AddNewObserver(){
    var check = document.createElement("input");
    check.type = "checkbox";
    extend(new Observer(), check);

    check.Update = function(value){
        console.log("check: ", value);
        this.checked = value;
    };

    controlCheckbox.AddObserver(check);
    container.appendChild(check);

}


// -----------------------策略模式----------------------------
// 【策略模式】定义了算法家族，分别封装起来，让他们之间可以互相替换，此模式让算法的变化不会影响到使用算法的客户。
// 概念上来说，所有的这些算法都是做相同的事情，只是实现不同，他可以以相同的方式调用所有的方法，
// 减少了各种算法类与使用算法类之间的耦合。

var validator = {
    types: {},
    messages: [],
    config: {},
    validate: function(data) {
        var i, msg, type, checker, result_ok;
        this.messages = [];
        for (i in data) {
            if (data.hasOwnProperty(i)) {
                type = this.config[i];
                checker = this.types[type];
                if (!type) {
                    continue;
                }
                if (!checker) {
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    };
                }
                result_ok = checker.validate(data[i]);
                if (!result_ok) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },
    hasErrors: function() {
        return this.messages.length !== 0;
    }
};

validator.types.isNonEmpty = {
    validate: function(value) {
        return value !== "";
    },
    instructions: "传入的值不能为空"
};
validator.types.isNumber = {
    validate: function(value) {
        return !isNaN(value);
    },
    instructions: "传入的值只能是合法的数字，例如：1, 3.14 or 2010"
};

var data = {
    first_name: "Tom",
    last_name: "Xu",
    age: "unknown",
    username: "TomXu"
};
validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};

validator.validate(data);
if (validator.hasErrors()) {    
  console.log(validator.messages.join("\n"));
}
// ----------------------------------------------------------------------
// 中介者模式（Mediator），用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，
// 从而使其耦合松散，而且可以独立地改变它们之间的交互。
//观察者模式，没有封装约束的单个对象，相反，观察者Observer和具体类Subject是一起配合来维护约束的，
//沟通是通过多个观察者和多个具体类来交互的：每个具体类通常包含多个观察者，而有时候具体类里的一个观察者也是另一个观察者的具体类。
//
// ----------------------------------反Curry化-----------------------------------
// http://www.alloyteam.com/2013/08/javascript-zhong-you-qu-di-fan-ke-li-hua-ji-shu/
Function.prototype.uncurrying = function(){
    var __this = this;
    // __this 就是 Array.prototype.push
    return function(){
        return Function.prototype.call.apply( __this, arguments );
    }
}
//------------------Lightweight Start-------------------

$.fn.plugname = function(){}
(function($){
    $.extend($.fn, {
        plugname: function(){}
    })
})(jQuery);

;(function($, window, document, undefined){
    var plugName = "defaultPlugName",
        defaults = {
            propertyName: "value"
        };
    function Plugin(element, options){
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = plugName;

        this.init();
    }

    Plugin.prototype.init = function(){
    //    初始化逻辑，访问dom， 通过实例访问 options
    };

    //    真正的插件包装，防止多实例
    $.fn[plugName] = function(options){
        return this.each(function(){
            if(!$.data(this, "plugin_"+plugName)){
                $.data(this, "plugin_"+plugName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);

$("#elem").defaultPlugName({
    propertyName: "a custom value"
});
//---------------------
//---------------------嵌套命名空间插件模式
;(function ($) {
    if(!myNamespace){
        $myNamespace = {};
    }

    $myNamespace.myPluginName = function (el, myFuncParam, options) {
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("myNamespace.myPluginName", base);
        base.init = function () {
            base.myFuncParam = myFuncParam;
            base.options = $.extend({}, $.myNamespace.myPluginName.defaultOptions, options);
        //    init code in here

        }
        base.init();
    }

    $myNamespace.myPluginName.defaultOptions = {
        myDefaultValue : ""
    };

    $.fn.myNamespace_myPluginName = function (myFuncParam, options) {
        return this.each(function(){
            (new $.myNamespace.myPluginName(this, myFuncParam, options));
        });
    };
})(jQuery)

$("#elem").myNamespace_myPluginName({
    myDefaultValue: "foobar"
});
//---------jQuery UI 自定义事件插件模式
;(function ($, window, document, undefined) {
    $.widget("ao.eventStatus", {
        options: {},
        _create: function () {
            var self = this;
        //  self.element.addClass("my-widget");
            self.element.on("myEventStart", function(e) {
                console.log("event start");
            });

            self.element.on("myEventEnd", function(e){
                console.log("enent end");
            });
        },
        _destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
        }
    })
})(jQuery, window, document, undefined)

var el = $("#elem");
el.eventStatus().trigger("myEventStart");
//------------ DOM to Object Bridge 模式的原型继承
var myObject = {
    init: function (options, elem) {
        this.options = $.extend({}, this.options, options);
        this.elem = elem;
        this.$elem = $(elem);
        this._build();
        return this;
    },
    options: {
        name: "No name"
    },
    _build: function () {
    //    this.$elem.html("<p>ss</p>");
    },
    myMethod: function (msg) {

    }
};

$.plugin = function(name, object){
    $.fn[name] = function (options) {
        return this.each(function () {
            if(!$.data(this, name)){
                $.data(this, name, Object.create(object).init(options, this));
            }
        });
    };
};
$.plugin("myobj", myObject);
$("elem").myobj({name: "John"});
var coll = $("elem").data("myobj");
coll.myMethod("msg");

// https://msdn.microsoft.com/en-us/magazine/ff608209.aspx
// http://starter.pixelgraphics.us/ 插件代码生成器
(function($) {
    $.watermark = function(element, options) {
        this.options = {};

        element.data('watermark', this);

        this.init = function(element, options) {
            this.options = $.extend({}, $.watermark.defaultOptions, options);

            //Call private function
            updateElement(element, this.options);
        };

        //Public function
        this.greet = function(name) {
            console.log('Hello, ' + name + ', welcome to Script Junkies!');
        };

        this.init(element, options);
    };

    $.fn.watermark = function(options) {
        return this.each(function() {
            (new $.watermark($(this), options));
        });
    };

    //Private function
    function updateElement(element, options) {
        //Manipulate element here...
    };

    $.watermark.defaultOptions = {
        class: 'watermark',
        text: 'Enter Text Here'
    }

})(jQuery);

var playGroundSelector = "#qunit-playground";
module("Watermark jQuery Plugin", {
    setup: function() {
        $.watermark.defaultOptions = {
            class: 'watermark',
            text: 'Enter Text Here'
        }
    },
    teardown: function() {
        $(playGroundSelector).empty();
    }
});
test("Watermark Should Clear on Focus", function() {
    //Arrange
    var testBox =
        $("<input id='testBox' type='text' />")
            .appendTo(playGroundSelector);

    //Act
    testBox.watermark({
        text: 'Enter Text Here 4',
        class: 'watermark5'
    }).focus();

    //Assert
    expect(2);
    ok(!testBox.hasClass("watermark5"), "Should not have watermark Class");
    same(testBox.val(), "", "Watermark Value Should Be Cleared");
});
//------ http://ajpiano.com/widgetfactory/#slide5
( function( $ ) {
    function Redman( elem ) {
        this.init( elem );
    }
    Redman.prototype.init = function( elem ) {
        this.element = $( elem ).addClass( "wu-tang" ).css( "color", "red" );
    };
    Redman.prototype.destroy = function() {
        this.element.removeClass( "wu-tang" ).removeAttr( "style" ).removeData( "redman" );
    };

    $.fn.redman = function() {
        return this.each( function() {
            // Instantiate a new Redman, storing the instance in the element's data cache
            $.data( this, "redman", new Redman( this ) );
        });
    };
})( jQuery );

$( function() {
    var r = $( "#foo" ).redman().data( "redman" );
    setTimeout( function() { r.destroy(); }, 2000 );
});
//http://ajpiano.com/widgetfactory/#slide9
//http://learn.jquery.com/jquery-ui/widget-factory/how-to-use-the-widget-factory/
//http://github.bililite.com/understanding-widgets.html
(function($) {
    // The jQuery.aj namespace will automatically be created if it doesn't exist
    $.widget( "aj.filterable", {
        options: {
            delay: 250,
            "className": ""
        },
        _create: function() {
            // The _create method is called the first time the plugin is invoked on an element
            // This is where most of your setup will happen
            // Two things are already available:
            // this.element -- a jQuery object of the element the widget was invoked on.
            // this.options --  the merged options hash

            // Cache references to collections the widget needs to access regularly

            this.filterElems = this.element.children()
                .addClass( "ui-widget-content "+this.options.className );

            // toggles ui-state-hover for you, but we want to do something else...
            // this._hoverable( this.filterElems );
            this._on( this.filterElems, {
                mouseenter: "_hover",
                mouseleave: "_hover"
            });

            this.filterInput = $( "<input type='text'>" )
                .insertBefore(this.element)
                .wrap( "<div class='ui-widget-header " + this.options.className + "'>" );
            // bind events on elements
            this._on( this.filterInput, {
                "keyup": "filter"
            });

            // toggles ui-state-focus for you
            this._focusable( this.filterInput );
            this.timeout = false;

            this._trigger( "ready" );

        },
        filter: function(e) {
            // Debounce the keyup event with a timeout, using the specified delay
            clearTimeout( this.timeout );
            // like setTimeout, only better!
            this.timeout = this._delay( function() {
                var re = new RegExp( this.filterInput.val(), "i" ),
                    visible = this.filterElems.filter( function() {
                        var $t = $( this ), matches = re.test( $t.text() );
                        // Leverage the CSS Framework to handle visual state changes
                        $t.toggleClass( "ui-helper-hidden", !matches );
                        return matches;
                    });

                // Trigger a callback so the user can respond to filtering being complete
                // Supply  an object of useful parameters with the second argument to _trigger
                this._trigger( "filtered", e, {
                    visible: visible
                });
            }, this.options.delay );
        },
        _hover: function(e) {
            $( e.target ).toggleClass( "ui-state-active", e.type === "mouseenter" );
            this._trigger( "hover", e, {
                hovered: $( e.target )
            });
        },
        _setOption: function( key, value ) {
            var oldValue = this.options[ key ];
            // Check for a particular option being set
            if ( key === "className" ) {
                // Gather all the elements we applied the className to
                this.filterInput.parent()
                    .add( this.filterElems )
                    // switch the new className in for the old
                    .toggleClass( oldValue + " " + value );
            }
            // Call the base _setOption method
            this._superApply( arguments );

            // The widget factory doesn't fire an callback for options changes by default
            // In order to allow the user to respond, fire our own callback
            this._trigger( "setOption", null, {
                option: key,
                original: oldValue,
                current: value
            });

        },
        _destroy: function() {
            // Use the _destroy method to reverse everything your plugin has applied
            this.filterInput.parent().remove();
            this.filterElems.removeClass( "ui-widget-content ui-helper-hidden " + this.options.className );
            // After you do that, you still need to invoke the "base" destroy method
            this._super();
        }
    });
})(jQuery);
//
//<ul id="cheeses">
//    <li data-price="17.99">Gruyere</li>
//    <li data-price="16.99">Comte</li>
//    <li data-price="4.99">Provolone</li>
//    <li data-price="8.99">Cheddar</li>
//    <li data-price="18.99">Parmigiano Reggiano</li>
//    <li data-price=".99">Government</li>
//</ul>
//
//<div id="register">
//One pound of each would cost $<span id="total"></span>
//</div>
//
//<button id="activation">Toggle Filterable</button>

var total = $("#total"),
    cheeses = $("#cheeses"),
    register = $("#register"),
    price = $("<span>"),
    activation = $("#activation").button({icons:{primary:"ui-icon-search"}});
activation.click(function() {
    if ( cheeses.is(":aj-filterable") ) {
        return cheeses.filterable("destroy");
    }

    cheeses.filterable({
        className: "cheese",
        create: function() { register.addClass("ui-widget-header cheese").show(); },
        filtered: function(e, ui) {
            var t = 0;
            ui.visible.each(function() { t = t + parseFloat( $(this).data("price") ); });
            total.text( t.toFixed( 2 ) );
        },
        setOption: function(e, ui) {
            ui.option === "className" && register.toggleClass([ui.original, ui.current].join(" "));
        },
        hover: function(e, ui) {
            if (e.originalEvent.type === "mouseenter") {
                price.text(" - " + ui.hovered.data("price") + " per lb").appendTo(ui.hovered);
            } else {
                price.detach();
            }
        }
    }).on("filterabledestroy", function(e,ui) {
        register.removeClass("ui-widget-header "+ui.options.className).hide();
    }).filterable("filter");

    setTimeout(function() { cheeses.filterable("option", "className", "cheesePlease"); },3000);
});