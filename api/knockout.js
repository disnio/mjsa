Knockout是在下面三个核心功能是建立起来的：
    监控属性（Observables）和依赖跟踪（Dependency tracking）
    声明式绑定（Declarative bindings）
    模板（Templating）
让ViewModel从htm中剥离出去：

注意：在yii中如果save() 不成功则是model中rule规则的作用。
<head>
    <script type="text/javascript" data-main="init.js" src="require.js"></script>
</head>
<body>
    <p>First name:
        <input data-bind="value: firstName" /></p>
    <p>First name capitalized: <strong data-bind="text: firstNameCaps"></strong></p>
</body>

init.js
require(['knockout', 'appViewModel'], function (ko, appViewModel)
{
    ko.applyBindings(new appViewModel());
});

appViewModel.js
define(['knockout'], function (ko) {
    return function appViewModel() {
        this.firstName = ko.observable('Bert');
        this.firstNameCaps = ko.computed(function ()
        {
            return this.firstName().toUpperCase();
        }, this);
    };
});

requirejs的延迟对visible绑定有影响，通过jq操作css来避免。
--------------------------------------------
变量绑定：
this.itemToAdd = ko.observable("");
数组绑定：
this.items = ko.observableArray(items);
监控数组跟踪的是数组里的对象，而不是这些对象自身的状态。
一个observableArray 仅仅监控他拥有的对象，并在这些对象添加或者删除的时候发出通知。
observableArray的读取和写入的相关函数：
indexOf 第一个等于你参数数组项的索引
slice 返回给定的从开始索引到结束索引之间所有的对象集合

pop, push, shift, unshift, reverse, sort, splice
remove和removeAll
------------------------

ko.applyBindings(myViewModel, document.getElementById('someElementId'))。
现在只有作为someElementId 的元素和子元素才能激活KO功能。 好处是你可以在同一个页面声明多个view model，用来区分区域。
--------------------------------------------------------------------------
--------------------------------------------------------------------------
监控属性（observables），可以注册自己的订阅，调用subscribe 函数。例如：

myViewModel.personName.subscribe(function (newValue) {
    alert("The person's new name is " + newValue);
});

var subscription = myViewModel.personName.subscribe(function (newValue) { /* do stuff */ });
// ...then later... 解除订阅
subscription.dispose(); // I no longer want notifications

Manual subscriptions give you a chance to programmatically react to an observable changing. This is great for setting defaults and triggering AJAX requests. You are able to manually subscribe to observables, observableArrays, and computed observables.
//trigger an AJAX request to get details when the selection changes
viewModel.selectedItem.subscribe(function(newValue) {
    $.ajax({
        url: '/getDetails',
        data: ko.toJSON({
            id: newValue.id
        }),
        datatype: "json",
        contentType: "application/json charset=utf-8",
        success: function(data) {
            viewModel.details(data.details);
        }
    });
});


---------------------
var viewModel = {
    firstName: ko.observable('Bob'),
    lastName: ko.observable('Smith')
};
添加一个依赖监控属性：
ko.dependentObservable 现在的版本 是ko.computed
viewModel.fullName = ko.dependentObservable(function () {
    return this.firstName() + " " + this.lastName();
}, viewModel);
read：  — 必选，一个用来执行取得依赖监控属性当前值的函数。
write： — 可选，如果声明将使你的依赖监控属性可写。
owner： — 可选，如果声明，它就是KO调用read或write的callback时用到的this。

你必须写成如下这样：
var viewModel = {
    // Add other properties here as you wish
};
viewModel.myDependentObservable = ko.dependentObservable(function() {
    ...
}, viewModel); // This is OK

ko.computedContext ：
You can now access the dependency count and whether it is the first evaluation within a computed. This could be useful in scenarios where you know that the function will never be called again (no dependencies) or to run special logic (or avoid logic) when it is the first evaluation. By using ko.computedContext while evaluating a computed, you have access to the isInitial and getDependenciesCount functions:

this.saveFlag = ko.computed(function() {
    var cleanData = ko.toJS(this);

    //don't save the data on the initial evaluation
    if (!ko.computedContext.isInitial()) {
      //actually save the data
    }

    //recognize that we have no dependencies
    if (!ko.computedContext.getDependenciesCount()) {
       //we might want to do some cleanup, as this computed will never be re-evaluated again
    }
}, this);

array methods pass index ：
The array utility methods now pass the array index as the second argument to the callbacks (in addition to the array item as the first argument).
ko.utils.arrayFilter(this.pages(), function(page, index) {
    //include any summary pages, besides the very first page
    return index > 0 && page.type === "summary";
});
-----
var JSONdataFromServer = '[{"name":"Peach","category":"Fruits","price":1},{"name":"Plum","category":"Fruits","price":0.75},{"name":"Donut","category":"Bread","price":1.5},{"name":"Milk","category":"Dairy","price":4.50}]';

var dataFromServer = ko.utils.parseJson(JSONdataFromServer);

function Item(name, category, price) {
    this.name = ko.observable(name);
    this.category = ko.observable(category);
    this.price = ko.observable(price);
    this.priceWithTax = ko.dependentObservable(function() {
        return (this.price() * 1.05).toFixed(2);
    }, this);
}

//do some basic mapping (without mapping plugin)
var mappedData = ko.utils.arrayMap(dataFromServer, function(item) {
    return new Item(item.name, item.category, item.price);
});
---
遍历
viewModel.total = ko.computed(function() {
    var total = 0;
    ko.utils.arrayForEach(this.items(), function(item) {
        var value = parseFloat(item.priceWithTax());
        if (!isNaN(value)) {
            total += value;
        }
    });
    return total.toFixed(2);
}, viewModel);
ko.utils.stringStartsWith is not exported in the minified KO file
---
搜索
Searching for an item in the array
viewModel.firstMatch = ko.computed(function() {
    var search = this.search().toLowerCase();
    if (!search) {
        return null;
    } else {
        return ko.utils.arrayFirst(this.filteredItems(), function(item) {
            return ko.utils.stringStartsWith(item.name().toLowerCase(), search);
        });
    }
}, viewModel);
---
过滤
viewModel.justCategories = ko.computed(function() {
    var categories = ko.utils.arrayMap(this.items(), function(item) {
        return item.category();
    });
    return categories.sort();
}, viewModel);
---
唯一值
//get a unique list of used categories
viewModel.uniqueCategories = ko.dependentObservable(function() {
    return ko.utils.arrayGetDistinctValues(viewModel.justCategories()).sort();
}, viewModel);
---
比较两个数字
//find any unused categories
viewModel.missingCategories = ko.dependentObservable(function() {
    //find out the categories that are missing from uniqueNames
    var differences = ko.utils.compareArrays(viewModel.categories, viewModel.uniqueCategories());
    //return a flat list of differences
    var results = [];
    ko.utils.arrayForEach(differences, function(difference) {
        if (difference.status === "deleted") {
            results.push(difference.value);
        }
    });
    return results;
}, viewModel)

---

//filter the items using the filter text
viewModel.filteredItems = ko.computed(function() {
    var filter = this.filter().toLowerCase();
    if (!filter) {
        return this.items();
    } else {
        return ko.utils.arrayFilter(this.items(), function(item) {
            return ko.utils.stringStartsWith(item.name().toLowerCase(), filter);
        });
    }
}, viewModel);

------
// 转换值
<p>Enter bid price: <input data-bind="value: formattedPrice"/></p>

function MyViewModel() {
    this.price = ko.observable(25.99);
 
    this.formattedPrice = ko.computed({
        read: function () {
            return '$' + this.price().toFixed(2);
        },
        write: function (value) {
            // Strip out unwanted characters, parse as float, then write the raw data back to the underlying "price" observable
            value = parseFloat(value.replace(/[^\.\d]/g, ""));
            this.price(isNaN(value) ? 0 : value); // Write to underlying storage
        },
        owner: this
    });
}
// 验证输入
<p>Enter a numeric value: <input data-bind="value: attemptedValue"/></p>
<div data-bind="visible: !lastInputWasValid()">Thats not a number!</div>
function MyViewModel() {
    this.acceptedNumericValue = ko.observable(123);
    this.lastInputWasValid = ko.observable(true);
 
    this.attemptedValue = ko.computed({
        read: this.acceptedNumericValue,
        write: function (value) {
            if (isNaN(value))
                this.lastInputWasValid(false);
            else {
                this.lastInputWasValid(true);
                this.acceptedNumericValue(value); // Write to underlying storage
            }
        },
        owner: this
    });
}
----####
有可能让依赖监控属性支持可写么？你只需要声明自己的callback函数然后利用写入的值再处理一下相应的逻辑即可。
可以像使用普通的监控属性一样使用依赖监控属性 – 数据双向绑定到DOM元素上，并且通过自定义的逻辑拦截所有的读和写操作。
------------------------------------------
忽略特定部分的绑定：

定义一个顶级viewmodel来容纳其所有的“sub” view models，然后页面全局范围内调用ko.applyBindings。
var profileModel = {
    first: ko.observable("Bob"),
    last: ko.observable("Smith")
};
var shellModel = {
    header: ko.observable("Administration"),
    sections: ["profile", "settings", "notifications"],
    selectedSection: ko.observable()
};
//the overall view model
var viewModel = {
    shell: shellModel,
    profile: profileModel
};
ko.applyBindings(viewModel);
在视图中，你便可以通过使用with binding方法和$root来绑定嵌套的view model。
<div data-bind="with: shell">
    <h2 data-bind="text: header"></h2>
    <div data-bind="with: $root.profile">
        ...
    </div>
    
</div>
<td>
<input type="text" data-bind="value: $data.Category"/>
</td>
<td>
<input type="button" class="btn"  value="修改" data-bind="click: $root.product.update"/>
<td>
应用绑定：
  var SimpleListModel = function(items) {
    this.items = ko.observableArray(items);
    this.itemToAdd = ko.observable("");
    this.addItem = function() {
        if (this.itemToAdd() != "") {
            this.items.push(this.itemToAdd()); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
            this.itemToAdd(""); // Clears the text box, because it's bound to the "itemToAdd" observable
        }
    }.bind(this);  // Ensure that "this" is always this view model
simpleList : new SimpleListModel(["Alpha", "Beta", "Gamma"])
动态绑定，如果SimpleListModel列表长度发生变化则需要保证 this 总是绑定到 SimpleListModel ( view model )。
.bind(this); 

这种方法好处在于让你只需通过调用一次ko.applyBinding方法，你可以随时使用$root，$parent, parents来从特定的sub view model获取数据。然而，如果希望维护模块化的代码以及更好地控制怎样及何时绑定元素，使用这种创建顶级view model的方法便
显得不便捷也不实用了。
在Knockout 2.0中，有一个简单的替代方案能提供更好的便利。Bindings方法能在其init方法中返回一个
controlsDescendantBindings：
标志用于指示当前binding循环不要试着绑定其子元素。这个标志也在template及control-flow bindings中有用到，它们使用
适当的data context来处理绑定其子元素。
-------------------------
ko.bindingHandlers.stopBinding = {
    init: function() {
        return { controlsDescendantBindings: true };
    }
};
var profileModel = {
    first: ko.observable("Bob"),
    last: ko.observable("Smith")
};
var shellModel = {
    header: ko.observable("Administration"),
    sections: ["profile", "settings", "notifications"],
    selectedSection: ko.observable()
};
ko.applyBindings(shellModel);
ko.applyBindings(profileModel, document.getElementById("profile"));
现在，在我们的视图中，我们就可以使用简单的stopBinding自定义绑定我们的内部容器元素。
<div>
    <h2 data-bind="text: header"></h2>
    <div data-bind="stopBinding: true">
        <div id="profile">
            <input data-bind="value: first" />
            <input data-bind="value: last" />
        </div>
    </div>
    ...
</div>
我们可以通过给我们的binding添加
ko.virtualElements.allowedBindings：
方法来创建容器无关的自定义绑定。
ko.bindingHandlers.stopBinding = {
    init: function() {
        return { controlsDescendantBindings: true };
    }
};
ko.virtualElements.allowedBindings.stopBinding = true;
<div>
    <h2 data-bind="text: header"></h2>
    <!-- ko stopBinding: true -->
    <div id="profile">
        <input data-bind="value: first" />
        <input data-bind="value: last" />
    </div>
    <!-- /ko -->
</div>
通过这个简单的绑定，现在我们能给页面绑定多个view models而不用担心bindings之间的冲突和重叠了。
---
<div class="main" data-bind="flash: name">
    <h2>Name</h2>
    <span data-bind="text: name"></span>
</div>

<hr />
http://knockoutjs.com/documentation/custom-bindings-controlling-descendant-bindings.html
<input data-bind="value: name" />
-------
ko.bindingHandlers.flash= {
    update: function(element, valueAccessor) {
        ko.utils.unwrapObservable(valueAccessor());  //unwrap to get subscription
        $(element).hide().fadeIn(1500);
    }  
}
var viewModel = {
    name: ko.observable("Bob")
};

ko.applyBindings(viewModel);
-----
<input data-bind="value: name" />
<hr/>
<div data-bind="fadeInText: name"></div>
ko.bindingHandlers.fadeInText = {
    update: function(element, valueAccessor) {
        $(element).hide();
        ko.bindingHandlers.text.update(element, valueAccessor);
        $(element).fadeIn(); 
    } 
};

var viewModel = {
    name: ko.observable("Bob")
};

ko.applyBindings(viewModel);
--------
注意： templateOptions传递额外的参数
如果你在绑定模板的时候需要[传入额外的数据]的话，你可以使用templateOptions对象来传递这些值。这可以帮助你通过一些 不属于view model过滤条件或者字符来重用模板。另外一个好处是用在范围控制，你可以引用通过你的模板访问绑定的数据。
例子，

<ul data-bind='template: { name: "personTemplate", foreach: employees, templateOptions: { label: "Employee:", selectedPerson: selectedEmployee } }'> </ul>

<script id='personTemplate' type='text/html'>
    <div data-bind="css: { selected: $data === $item.selectedPerson()" }>
        ${ $item.label } <input data-bind="value: name" />
    </div>
</script>

在整个例子里，personTemplate有可能都使用employee和自定义对象。通过templateOptions我们可以传递一个字符label和当前已选择项作为selectedPerson来控制style。在[jquery.tmpl]模板里，这些值可以通过访问[$item]对象的属性得到。

<ul data-bind="template: { name: 'itemTmpl', foreach: items, templateOptions: { select: selectItem } }"></ul>

<script id="itemTmpl" type="text/html">
    <li>
        <span data-bind="text: name"></span>
        <a href="#" data-bind="clickWithParams: { action: $item.select, params: [ $data ] }">select</a>
    </li>
</script>

<h2>Selected Item</h2>
<div data-bind="text: selectedItem() ? selectedItem().name : 'none'"></div>
ko.bindingHandlers.clickWithParams = {
    init: function(element, valueAccessor, allBindingsAccessor, context) {
        var options = valueAccessor();
        var newValueAccessor = function() {
            return function() {
                options.action.apply(context, options.params);
            };
        };
        ko.bindingHandlers.click.init(element, newValueAccessor, allBindingsAccessor, context);
    }
};

function Item(id, name, selected) {
    this.id = ko.observable(id);
    this.name = ko.observable(name);
}

$(function() {
    var viewModel = {
        selectedItem: ko.observable(),
        items: ko.observableArray([new Item(1, "one"), new Item(2, "two"), new Item(3, "three")])
    };

    viewModel.selectItem = function(item) {
        this.selectedItem(item);
    }.bind(viewModel);

    ko.applyBindings(viewModel);

});

http://jsfiddle.net/rniemeyer/NkqmK/
---
<button data-bind="click: greet, jqButton: { icons: { primary: 'ui-icon-gear' } }">Test</button>
ko.bindingHandlers.jqButton = {
    init: function(element, valueAccessor) {
        var options = valueAccessor() || {};
        $(element).button(options);
        
        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).button("destroy");
        });
    } 
};

var viewModel = {
    greet: function() {
       alert("Hello");   
    }
};

ko.applyBindings(viewModel);
----
http://jsfiddle.net/rniemeyer/X82aC/
<input data-bind="datepicker: myDate, datepickerOptions: { minDate: new Date() }" />

<button data-bind="click: setToCurrentDate">Set To Current Date</button>

<div data-bind="text: myDate"></div>

ko.bindingHandlers.datepicker = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().datepickerOptions || {};
        $(element).datepicker(options);
          
        //handle the field changing
        ko.utils.registerEventHandler(element, "change", function () {
            var observable = valueAccessor();
            observable($(element).datepicker("getDate"));
        });
        
        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).datepicker("destroy");
        });
    
    },
    //update the control when the view model changes
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            current = $(element).datepicker("getDate");
        
        if (value - current !== 0) {
            $(element).datepicker("setDate", value);   
        }
    }
};

var viewModel = {
    myDate: ko.observable(new Date("11/01/2011")),
    setToCurrentDate: function() {
       this.myDate(new Date());   
    }
};

ko.applyBindings(viewModel);

排序和ui 拖动
http://jsfiddle.net/rniemeyer/UdXr4/

-----
dirtyFlag：
<ul data-bind="foreach: items">
    <li data-bind="css: { dirty: dirtyFlag.isDirty }">
        <span data-bind="text: id"></span>
        <input data-bind="value: name" />
        <button data-bind="click: dirtyFlag.reset">Reset</button>
    </li>
</ul>

<button data-bind="enable: isDirty, click: save">Save</button>
<hr />
<h3>Just Dirty Items</h3>
<div data-bind="text: ko.toJSON(dirtyItems)"></div>

//not used in this example.  one time flag, that drops its subscriptions after the first change.
ko.oneTimeDirtyFlag = function (root) {
   var _initialized;

   //one-time dirty flag that gives up its dependencies on first change
   var result = ko.computed(function () {
       if (!_initialized) {
           //just for subscriptions
           ko.toJS(root);

           //next time return true and avoid ko.toJS
           _initialized = true;

           //on initialization this flag is not dirty
           return false;
       }

       //on subsequent changes, flag is now dirty
       return true;
   });

   return result;
};

ko.dirtyFlag = function(root, isInitiallyDirty) {
    var result = function() {},
        _initialState = ko.observable(ko.toJSON(root)),
        _isInitiallyDirty = ko.observable(isInitiallyDirty);

    result.isDirty = ko.computed(function() {
        return _isInitiallyDirty() || _initialState() !== ko.toJSON(root);
    });

    result.reset = function() {
        _initialState(ko.toJSON(root));
        _isInitiallyDirty(false);
    };

    return result;
};

li { padding: 2px; margin: 2px; }
input { width: 75px; }
.dirty { border: solid yellow 2px; }

function Item(id, name) {
    this.id = ko.observable(id);
    this.name = ko.observable(name);
    this.dirtyFlag = new ko.dirtyFlag(this);
}

var ViewModel = function(items) {
    this.items = ko.observableArray([
        new Item(1, "one"),
        new Item(2, "two"),
        new Item(3, "three")
    ]);
    
    this.save = function() {
        alert("Sending changes to server: " + ko.toJSON(this.dirtyItems));  
    };
    
    this.dirtyItems = ko.computed(function() {
        return ko.utils.arrayFilter(this.items(), function(item) {
            return item.dirtyFlag.isDirty();
        });
    }, this);
    
    this.isDirty = ko.computed(function() {
        return this.dirtyItems().length > 0;
    }, this);
};

ko.applyBindings(new ViewModel());
绑定：
http://www.knockmeout.net/2011/08/simplifying-and-cleaning-up-views-in.html
--------------------------------------------------
--------------------------------------------------
text       ：text 绑定到DOM元素上，使得该元素显示的文本值为你绑定的参数。

<script type="text/javascript">
    var viewModel = {
        myMessage: ko.observable() // Initially blank
    };
    viewModel.myMessage("Hello, world!"); // Text appears
</script>
KO将参数值会设置在元素的innerText （IE）或textContent（Firefox和其它相似浏览器）属性上。

IE6有个奇怪的问题，如果 span里有空格的话，它将自动变成一个空的span。如果你想编写如下的代码的话，那Knockout将不起任何作用：
Welcome, <span data-bind="text: userName"></span> to our web site.
… IE6 将不会显示span中间的那个空格，你可以通过下面这样的代码避免这个问题：
Welcome, <span data-bind="text: userName">&nbsp;</span> to our web site.
IE6以后版本和其它浏览器都没有这个问题

-------------------------
visible    ：使得该元素的hidden或visible状态取决于绑定的值。
<div data-bind="visible: shouldShowMessage">
    You will see this message only when "shouldShowMessage" holds a true value.
</div>

<script type="text/javascript">
    var viewModel = {
        shouldShowMessage: ko.observable(true) // Message initially visible
    };
    viewModel.shouldShowMessage(false); // ... now it's hidden
    viewModel.shouldShowMessage(true); // ... now it's visible again
</script>
假值时（例如：布尔值false， 数字值0， 或者null， 或者undefined）

<input id="Radio1" name="rdoCunKuanType" data-bind="checked:CunKuanType" value="H" checked type="radio" />活期存款 
<input id="Radio2" name="rdoCunKuanType" data-bind="checked:CunKuanType" value="D" type="radio">定期存款
<br />定期几年：<input type="text" />年 <font data-bind="visible:ShowStar" color="red">*</font>
var viewModel = {
    CunKuanType: ko.observable("H")
};

viewModel.ShowStar = ko.dependentObservable(function ()
{
    if (viewModel.CunKuanType() == "H")
    {
        return false;
    }
    else
    {
        return true;
    }
}, viewModel);

ko.applyBindings(viewModel);
-------------------------
html： 使得该元素显示的HTML值为你绑定的参数。
<div data-bind="html: details"></div> 
KO设置该参数值到元素的innerHTML属性上，元素之前的内容将被覆盖。
<script type="text/javascript">
    var viewModel = {
        details: ko.observable() // Initially blank
    };
    viewModel.details("<em>For further details, view the report <a href='report.html'>here</a>.</em>");
    // HTML content appears
</script> 
----####
因为该绑定设置元素的innerHTML，你应该注意不要使用不安全的HTML代码，因为有可能引起脚本注入攻击
-------------------------
css：绑定是添加或删除一个或多个CSS class到DOM元素上。
<div data-bind="css: { profitWarning: currentProfit() < 0 }">
   Profit Information
</div> 

<script type="text/javascript">
    var viewModel = {
        currentProfit: ko.observable(150000)
        // Positive value, so initially we don't apply the "profitWarning" class
    };
    viewModel.currentProfit(-50);
    // Causes the "profitWarning" class to be applied
</script>
----####
<div data-bind="css: { my-class: someValue }">...</div>

… 因为my-class不是一个合法的命名。解决方案是：在my-class两边加引号作为一个字符串使用。这是一个合法的JavaScript 对象 文字（从JSON技术规格说明来说，你任何时候都应该这样使用，虽然不是必须的）。例如,

<div data-bind="css: { 'my-class': someValue }">...</div>
-------------------------
style：绑定是添加或删除一个或多个DOM元素上的style值。
<div data-bind="style: { color: currentProfit() < 0 ? 'red' : 'black' }">
   Profit Information
</div>

<script type="text/javascript">
    var viewModel = {
        currentProfit: ko.observable(150000) // Positive value, so initially black
    };
    viewModel.currentProfit(-50); // Causes the DIV's contents to go red
</script>
----#####
应用的style的名字不是合法的JavaScript变量命名

如果你需要应用font-weight或者text-decoration，你不能直接使用，而是要使用style对应的JavaScript名称。

错误： { font-weight: someValue };          正确： { fontWeight: someValue }

错误： { text-decoration: someValue };      正确： { textDecoration: someValue }
-------------------------
attr： 绑定提供了一种方式可以设置DOM元素的任何属性值。
<a data-bind="attr: { href: url, title: details }">
    Report
</a>

<script type="text/javascript">
    var viewModel = {
        url: ko.observable("year-end.html"),
        details: ko.observable("Report including final year-end statistics")
    };
</script>
----#####
要用js变量名 <div data-bind="attr: { ‘data-something’: someValue }">...</div>
--------------------------------------------------
--------------------------------------------------
event：
<div>
    <div data-bind="event: { mouseover: enableDetails, mouseout: disableDetails }">
        Mouse over me
    </div>
    <div data-bind="visible: detailsEnabled">
        Details
    </div>
</div>
 
<script type="text/javascript">
    var viewModel = {
        detailsEnabled: ko.observable(false),
        enableDetails: function() {
            this.detailsEnabled(true);
        },
        disableDetails: function() {
            this.detailsEnabled(false);
        }
    };
    ko.applyBindings(viewModel);
</script>
--------
$parent  self 使用
<ul data-bind="foreach: places">
    <li data-bind="text: $data, event: { mouseover: $parent.logMouseOver }"> </li>
</ul>
<p>You seem to be interested in: <span data-bind="text: lastInterest"> </span></p>
 
 <script type="text/javascript">
     function MyViewModel() {
         var self = this;
         self.lastInterest = ko.observable();
         self.places = ko.observableArray(['London', 'Paris', 'Tokyo']);
 
         // The current item will be passed as the first parameter, so we know which place was hovered over
         self.logMouseOver = function(place) {
             self.lastInterest(place);
         }
     }
     ko.applyBindings(new MyViewModel());
</script>
传参数：
<div data-bind="event: { mouseover: function(data, event) { myFunction('param1', 'param2', data, event) } }">
    Mouse over me
</div>
<button data-bind="event: { mouseover: myFunction.bind($data, 'param1', 'param2') }">
    Click me
</button>
阻止默认冒泡：
<div data-bind="event: { mouseover: myDivHandler }">
    <button data-bind="event: { mouseover: myButtonHandler }, mouseoverBubble: false">
        Click me
    </button>
</div>
----------------------
click：绑定在DOM元素上添加事件句柄以便元素被点击的时候执行定义的JavaScript 函数。
<div>
    You ve clicked <span data-bind="text: numberOfClicks"></span> times
    <button data-bind="click: incrementClickCounter">Click me</button>
</div>

<script type="text/javascript">
    var viewModel = {
        numberOfClicks: ko.observable(0),
        incrementClickCounter: function () {
            var previousCount =this.numberOfClicks();
            this.numberOfClicks(previousCount +1);
        }
    };
</script>
----####
传参数给你的click 句柄：
最简单的办法是传一个function包装的匿名函数
<button data-bind="click: function() { viewModel.myFunction('param1', 'param2') }">
    Click me
</button>
这样，KO就会调用这个匿名函数，里面会执行viewModel.myFunction()，并且传进了'param1' 和'param2'参数。
----####
访问事件源对象：
Knockout会将这个对象传递到你函数的第一个参数

<button data-bind="click: myFunction">
    Click me
</button>

 <script type="text/javascript">
     var viewModel = {
         myFunction: function (event) {
             if (event.shiftKey) {
                 //do something different when user has shift key down
             } else {
                 //do normal action
             }
         }
     };
</script>

如果你需要的话，可以使用匿名函数的第一个参数传进去，然后在里面调用：

<button data-bind="click: function(event) { viewModel.myFunction(event, 'param1', 'param2') }">
    Click me
</button>

这样，KO就会将事件源对象传递给你的函数并且使用了。

允许执行默认事件：

默认情况下，Knockout会阻止冒泡，防止默认的事件继续执行。例如，如果你点击一个a连接，在执行完自定义事件时它不会连接到href地址。这特别有用是因为你的自定义事件主要就是操作你的view model，而不是连接到另外一个页面。

当然，如果你想让默认的事件继续执行，你可以在你click的自定义函数里返回true。
----####
KO在调用你定义的函数时，会将view model传给this对象（也就是ko.applyBindings使用的view model）。主要是方便你在调用你在view model里定义的方法的时候可以很容易再调用view model里定义的其它属性。

可以直接引用任何函数对象。你可以使用bind使callback函数设置this为任何你选择的对象。
<button data-bind="click: someObject.someFunction.bind(someObject)">
    Click me
</button>
自定义函数事件：

    ko.subscribable.fn
    ko.observable.fn
    ko.observableArray.fn
    ko.computed.fn
-------------

<h3>All tasks (<span data-bind="text: tasks().length"> </span>)</h3>
<ul data-bind="foreach: tasks">
    <li>
        <label>
            <input type="checkbox" data-bind="checked: done" />
            <span data-bind="text: title"> </span>
        </label>
    </li>
</ul>
 
<h3>Done tasks (<span data-bind="text: doneTasks().length"> </span>)</h3>
<ul data-bind="foreach: doneTasks">
    <li data-bind="text: title"></li>
</ul>
-------------
-----------------
ko.observableArray.fn.filterByProperty = function(propName, matchValue) {
    return ko.computed(function() {
        var allItems = this(), matchingItems = [];
        for (var i = 0; i < allItems.length; i++) {
            var current = allItems[i];
            // unwrap !!
            if (ko.unwrap(current[propName]) === matchValue)
                matchingItems.push(current);
        }
        return matchingItems;
    }, this);
}

function Task(title, done) {
    this.title = ko.observable(title);
    this.done = ko.observable(done);
}
 
function AppViewModel() {
    this.tasks = ko.observableArray([
        new Task('Find new desktop background', true),
        new Task('Put shiny stickers on laptop', false),
        new Task('Request more reggae music in the office', true)
    ]);
 
    // Here's where we use the custom function
    this.doneTasks = this.tasks.filterByProperty("done", true);
}
 
ko.applyBindings(new AppViewModel());
做一次过滤：
this.doneTasks = ko.computed(function() {
    var all = this.tasks(), done = [];
    for (var i = 0; i < all.length; i++)
        if (all[i].done())
            done.push(all[i]);
    return done;
}, this);
------------------------
值被请求时候才进行计算：
viewModel.total = ko.computed({
    read: function() {
       var result = 0;
        ko.utils.arrayForEach(viewModel.items(), function(item) {
            result += item.amount();
        });
    },
    deferEvaluation: true  //don't evaluate until someone requests the value
}, viewModel);


--------------------------------
防止事件冒泡：
<div data-bind="click: myDivHandler">
    <button data-bind="click: myButtonHandler, clickBubble: false">
        Click me
    </button>
</div>
如果需要，你可以通过额外的绑定youreventBubble来禁止冒泡
默认情况下，myButtonHandler会先执行，然后会冒泡执行myDivHandler。但一旦你设置了clickBubble为false的时候，冒泡事件会被禁止。

-----------------------------
submit：绑定在form表单上添加指定的事件句柄以便该form被提交的时候执行定义的JavaScript 函数
当你使用submit绑定的时候， Knockout会阻止form表单默认的submit动作。
浏览器会执行你定义的绑定函数而不会提交这个form表单到服务器上。
使用submit绑定是为了处理view model的自定义函数的，而不是再使用普通的HTML form表单。
如果你要继续执行默认的HTML form表单操作，你可以在你的submit句柄里返回true
-----------------------------
enable：绑定使DOM元素只有在参数值为 true的时候才enabled。在form表单元素input，select，和textarea上非常有用。
disable：绑定使DOM元素只有在参数值为 true的时候才disabled。
<p>
    <input type='checkbox' data-bind="checked: hasCellphone"/>
    I have a cellphone
</p>

<p>
    Your cellphone number:
    <input type='text' data-bind="value: cellphoneNumber, enable: hasCellphone"/>
</p>
 
<script type="text/javascript">
    var viewModel = {
        hasCellphone: ko.observable(false),
        cellphoneNumber: ""
    };
</script>

这个例子里，“Your cellphone number”后的text box 初始情况下是禁用的，只有当用户点击标签 “I have a cellphone”的时候才可用。
----------------------------------------------------------
----------------------------------------------------------
value：绑定是关联DOM元素的值到view model的属性上。主要是用在表单控件<input>，<select>和<textarea>上。
<p>Login name: <input data-bind="value: userName"/></p>
<p>Password: <input type="password" data-bind="value: userPassword"/></p>
 
<script type="text/javascript">
    var viewModel = {
        userName: ko.observable(""),        // Initially blank
        userPassword: ko.observable("abc"), // Prepopulate
    };
</script>
默认情况下当用户离开焦点（例如onchange事件）的时候，KO才更新这个值，
但是你可以通过第2个参数valueUpdate来特别指定改变值的时机。
----####
valueUpdate：值更改触发时间

如果你使用valueUpdate参数，那就是意味着KO将使用自定义的事件而不是默认的离开焦点事件。下面是一些最常用的选项：

“change”（默认值） - 当失去焦点的时候更新view model的值，或者是<select> 元素被选择的时候。

“keyup” – 当用户敲完一个字符以后立即更新view model。

“keypress” – 当用户正在敲一个字符但没有释放键盘的时候就立即更新view model。不像 keyup，这个更新和keydown是一样的。

“afterkeydown” – 当用户开始输入字符的时候就更新view model。主要是捕获浏览器的keydown事件或异步handle事件。

如果你想让你的view model进行实时更新，使用“afterkeydown”是最好的选择。
<p>Your value: <input data-bind="value: someValue, valueUpdate: 'afterkeydown'"/></p>
<p>You have typed: <span data-bind="text: someValue"></span></p> <!-- updates in real-time --> 

<script type="text/javascript">
    var viewModel = {
        someValue: ko.observable("edit me")
    };
</script>
------
值传递，最常见的就是你model类型是string和number，于是你改了model的值，view-model不变。

引用传递，最常见的就是Array类型，你的Model类型Array数据，shift()了，你的view-model改变，你的view也改变了。
-----------

-----------------------------
checked：绑定是关联到checkable的form表单控件到view model上
例如checkbox（<input type='checkbox'>）或者radio button（<input type='radio'>） 。

<p>Send me spam: <input type="checkbox" data-bind="checked: wantsSpam"/></p> 

<script type="text/javascript">
    var viewModel = {
        wantsSpam: ko.observable(true) // Initially checked
    };

     // ... then later ...
    viewModel.wantsSpam(false); // The checkbox becomes unchecked
</script>

Checkbox关联到数组：
<p>Send me spam: <input type="checkbox" data-bind="checked: wantsSpam"/></p>
<div data-bind="visible: wantsSpam">
    Preferred flavors of spam:
    <div><input type="checkbox" value="cherry" data-bind="checked: spamFlavors"/> Cherry</div>
    <div><input type="checkbox" value="almond" data-bind="checked: spamFlavors"/> Almond</div>
    <div><input type="checkbox" value="msg" data-bind="checked: spamFlavors"/> Monosodium Glutamate</div>
</div>
如果元素的值存在于数组，KO就会将元素设置为checked，如果数组里不存在，就设置为unchecked。
<script type="text/javascript">

    var viewModel = {
        wantsSpam: ko.observable(true),
        spamFlavors: ko.observableArray(["cherry", "almond"]) // Initially checks the Cherry and Almond checkboxes
    };

    // ... then later ...
    viewModel.spamFlavors.push("msg"); // Now additionally checks the Monosodium Glutamate checkbox
</script>

添加radio button：
<p>Send me spam: <input type="checkbox" data-bind="checked: wantsSpam"/></p>

<div data-bind="visible: wantsSpam">
    Preferred flavor of spam:
    <div><input type="radio" name="flavorGroup" value="cherry" data-bind="checked: spamFlavor"/> Cherry</div>
    <div><input type="radio" name="flavorGroup" value="almond" data-bind="checked: spamFlavor"/> Almond</div>
    <div><input type="radio" name="flavorGroup" value="msg" data-bind="checked: spamFlavor"/> Monosodium Glutamate</div>
</div>

 
<script type="text/javascript">

    var viewModel = {
        wantsSpam: ko.observable(true),
        spamFlavor: ko.observable("almond") // Initially selects only the Almond radio button
    };

     // ... then later ...
    viewModel.spamFlavor("msg"); // Now only Monosodium Glutamate is checked
</script>
-----------------------------
options： 绑定控制什么样的options在drop-down列表里，例如 <select>；
或者 multi-select 列表里，例如 <select size='6'>显示。
此绑定不能用于<select>之外的元素。
关联的数据应是数组（或者是observable数组），<select>会遍历显示数组里的所有的项。

对于multi-select列表，设置或者获取选择的多项需要使用：selectedOptions绑定。
对于single-select列表，你也可以使用value绑定读取或者设置元素的selected项。

单选：
<p>Destination country: <select data-bind="options: availableCountries"></select></p>

<script type="text/javascript">
    var viewModel = {
        availableCountries: ko.observableArray(['France', 'Germany', 'Spain']) // These are the initial options
    };

    // ... then later ...
    viewModel.availableCountries.push('China'); // Adds another option
</script>
多选：
<p>Choose some countries youd like to visit: <select data-bind="options: availableCountries" size="5" multiple="true"></select></p>

<script type="text/javascript">
    var viewModel = {
        availableCountries: ko.observableArray(['France', 'Germany', 'Spain'])
    };
</script>
任意对象：
<p>
    Your country:
    <select data-bind="options: availableCountries, optionsText: 'countryName', value: selectedCountry, optionsCaption: 'Choose...'"></select>
</p>

<div data-bind="visible: selectedCountry"> <!-- Appears when you select something -->
    You have chosen a country with population
    <span data-bind="text: selectedCountry() ? selectedCountry().countryPopulation : 'unknown'"></span>.
</div>

<script type="text/javascript">
    // Constructor for an object with two properties
var country =function (name, population) {
        this.countryName = name;
        this.countryPopulation = population;
    };

     var viewModel = {
        availableCountries: ko.observableArray([
            new country("UK", 65000000),
            new country("USA", 320000000),
            new country("Sweden", 29000000)
        ]),
        selectedCountry: ko.observable() // Nothing selected by default
    };
</script>
---
<select data-bind="value: selectedCategory, options: categories, valueAllowUnset: true"></select>

valueAllowUnset true, Knockout does not force the value to match an existing option.
The selection will be set to an empty option in the case of a mismatch, but the value is not overwritten.
This is very useful in scenarios where options are lazily loaded and there is an existing value.

//remove an item
items.remove(someItem);

//remove all items with the name "Bob"
items.remove(function(item) {
    return item.name === "Bob"
});
//remove all items
items.removeAll();

//pass in an array of items to remove
items.removeAll(itemsToRemove)

//retrieve the index of an item
items.indexOf(someItem);

//replace an item
item.replace(someItem, replaceItem);

---
Drop-down list展示的任意JavaScript对象： 显示text是function的返回值

<select data-bind="options: availableCountries,
                   optionsText: function(item) {// 注意这里和上面的不同
                       return item.countryName + ' (pop: ' + item.countryPopulation + ')'
                   },
                   value: selectedCountry,
                   optionsCaption: 'Choose...'"></select>
----####
optionsCaption
optionsText
optionsValue
-----------------------------------------
selectedOptions：绑定用于控制multi-select列表已经被选择的元素，用在使用options绑定的<select>元素上。

当用户在multi-select列表选择或反选一个项的时候，会将view model的数组进行相应的添加或者删除。
<p>
    Choose some countries youd like to visit:
    <select data-bind="options: availableCountries, selectedOptions: chosenCountries" size="5" multiple="true"></select>
</p>

<script type="text/javascript">
    var viewModel = {
        availableCountries: ko.observableArray(['France', 'Germany', 'Spain']),
        chosenCountries: ko.observableArray(['Germany']) // Initially, only Germany is selected
    }; 

    // ... then later ...
    viewModel.chosenCountries.push('France'); // Now France is selected too
</script>
-----------
<select data-bind="options: CreditCards, optionsText: 'CardNumber', optionsValue: 'CardId', value: SelectedCard, optionsCaption: '請選擇'"></select>
<span data-bind="text: SelectedCard"></span> selected.
<span data-bind="text: SelectedCardText"></span> selected.
function viewModel() {
        var self = this;
        self.CreditCards = ko.observableArray([{
            "CardId": 1,
            "CardNumber": "1234-5678-1234-0001",
            "CardHolder": "Pete"
        }, {
            "CardId": 2,
            "CardNumber": "1234-5678-1234-0002",
            "CardHolder": "Claire"
        }, {
            "CardId": 3,
            "CardNumber": "1234-5678-1234-0003",
            "CardHolder": "Pudding"
        }]);

        self.SelectedCard = ko.observable();
        self.SelectedCardText = ko.computed(function() {
            var search = self.SelectedCard();

            if (!search) {
                return null;
            } else {
                var matchedItem = ko.utils.arrayFirst(self.CreditCards(), function(item) {
                    return item.CardId == search;
                });
                return matchedItem.CardNumber;
            }
        });
    };
-----------------------------------------
uniqueName：绑定确保所绑定的元素有一个非空的name属性。

在使用KO的时候，一些技术可能依赖于某些元素的name属性，尽快他们没有什么意义。例如，jQuery Validation验证当前只验证有name属性的元素。为配合Knockout UI使用，有些时候需要使用uniqueName绑定避免让jQuery Validation验证出错。

IE 6下，如果radio button没有name属性是不允许被checked了。大部分时候都没问题，因为大部分时候radio button元素都会有name属性的作为一组互相的group。不过，如果你没声明，KO内部会在这些元素上使用uniqueName那么以确保他们可以被checked。
----------------------------------------------------------------------------------
----------------------------------------------------------------------------------
创建自定义绑定：
可以你封装复杂的逻辑或行为，自定义很容易使用和重用的绑定。
注册绑定：ko.bindingHandlers
添加子属性到 ko.bindingHandlers 来注册你的绑定
ko.bindingHandlers.yourBindingName = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever the associated observable changes value.
        // Update the DOM element based on the supplied values here.
    }
};
<div data-bind="yourBindingName: someValue"> </div>
没必要把init和update这两个callbacks都定义，你可以只定义其中的任意一个。

当管理的observable改变的时候，KO会调用你的update callback函数，然后传递以下参数：
element — 使用这个绑定的DOM元素

valueAccessor —JavaScript函数，通过valueAccessor()可以得到应用到这个绑定的model上的当前属性值。
To easily accept both observable and plain values, call： ko.unwrap on the returned value.
已经绑定的当前的值

allBindings — JavaScript对象， 访问绑定到dom元素的模型所有值。
allBindings.get('name') 取得绑定的name值。
data-bind里面的其他属性。

viewModel — 弃用在 Knockout 3.x. 应该使用 bindingContext.$data 或者 bindingContext.$rawData 去访问 view model.

bindingContext — 对象保存上下文对象。包含特别的属性 $parent 和 $that 访问数据 that is bound against ancestors of this context.

ko.bindingHandlers.slideVisible = {
    update: function(element, valueAccessor, allBindings) {
        // First get the latest data that we're bound to
        var value = valueAccessor();
 
        // Next, whether or not the supplied model property is observable, get its current value
        var valueUnwrapped = ko.unwrap(value);
 
        // Grab some more data from another binding property
        var duration = allBindings.get('slideDuration') || 400; // 400ms is default duration unless otherwise specified
 
        // Now manipulate the DOM element
        if (valueUnwrapped == true)
            $(element).slideDown(duration); // Make the element visible
        else
            $(element).slideUp(duration);   // Make the element invisible
    }
};
<div data-bind="slideVisible: giftWrap, slideDuration:600">You have selected the option</div>
<label><input type="checkbox" data-bind="checked: giftWrap" /> Gift wrap</label>
 
<script type="text/javascript">
    var viewModel = {
        giftWrap: ko.observable(true)
    };
    ko.applyBindings(viewModel);
</script>
-------------------
ko.bindingHandlers.hasFocus = {
    init: function(element, valueAccessor) {
        $(element).focus(function() {
            var value = valueAccessor();
            value(true);
        });
        $(element).blur(function() {
            var value = valueAccessor();
            value(false);
        });
    },
    update: function(element, valueAccessor) {
        var value = valueAccessor();
        if (ko.unwrap(value))
            element.focus();
        else
            element.blur();
    }
};
<p>Name: <input data-bind="hasFocus: editingName" /></p>
 
<!-- Showing that we can both read and write the focus state -->
<div data-bind="visible: editingName">Youre editing the name</div>
<button data-bind="enable: !editingName(), click:function() { editingName(true) }">Edit name</button>
 
<script type="text/javascript">
    var viewModel = {
        editingName: ko.observable()
    };
    ko.applyBindings(viewModel);
</script>
---------

----------------------------------------
遍历：
foreach绑定
一，要求的数组格式是[{key:value1},{key:value2}] ，这可能与你数据库保存的数组格式不同。于是，你需要个转化函数。

二，如果你想绑定[value1,value2,value3]这种数组格式，要用$data。但是，这样只能显示数据，你在view里修改了数据，不会影响到view-model，因为这是值传递。

$data ：数据，  $index：下标
var viewModel = {
    categories: ko.observableArray([{
            name: 'Fruit',
            items: ['Apple', 'Orange', 'Banana']
        },
        {
            name: 'Vegetables',
            items: ['Celery', 'Corn', 'Spinach']
        }
    ])
};

ko.applyBindings(viewModel);
<ul data-bind="foreach: categories"> 注意$data一定要写
<li><a href="" data-bind="text: $data.name"></a><span data-bind="text: $index"></span></li>
</ul> 
-------------
$parents ：上一层元素
$parent概念，当前对象所在集合了，经常用于remove。$root概念，就是集合a包集合b包集合c，集合c的 $root就是集合a，集合c的$parent就是集合b。
<ul data-bind="foreach: categories">
    <li data-bind="text:$parents"></li>
</ul>
$parents表示遍历的上一层对象，遍历的当前对象是viewModel的categories，所以$parents就表示viewModel对象
$parents[n] 上n层
-------------
$root 根部

这个表示不管在其中嵌套几层，都是引用根部对象viewModel
-------------
as 一个很好的用法
<ul data-bind="foreach: { data: categories, as: 'category' }">
    <li>
        <ul data-bind="foreach: { data: items, as: 'item' }">
            <li>
                <span data-bind="text: category.name"></span>:
                <span data-bind="text: item"></span>
            </li>
        </ul>
    </li>
</ul>
<script>
    var viewModel = {
        categories: ko.observableArray([
            { name: 'Fruit', items: [ 'Apple', 'Orange', 'Banana' ] },
            { name: 'Vegetables', items: [ 'Celery', 'Corn', 'Spinach' ] }
        ])
    };
    ko.applyBindings(viewModel);
</script>
这个用于双重遍历非常好，as表示一个代替作用：
foreach: { data: categories, as: 'category' }表示需要遍历viewModel的categories这个对象，
并且用category代替下面使用中的$data,
foreach: { data: items, as: 'item' } 这个表示遍历viewModel的categories这个对象中的items对象，并且用item代替下面使用中的$data，
这样就不会弄混两个$data同时在一个双重遍历中的使用了
-----------
with 定位作用
foreach绑定的是数组，with绑定的则是对象。
例子：
<h1 data-bind="text: city"> </h1>
<p data-bind="with: coords">
    Latitude: <span data-bind="text: latitude"> </span>,
    Longitude: <span data-bind="text: longitude"> </span>
</p>
<script type="text/javascript">
    ko.applyBindings({
        city: "London",
        coords: {
            latitude:  51.5001524,
            longitude: -0.1262362
        }
    });
</script> 

with定位到coords对象上面，下面绑定的就是coords的内容
--------------------------------------------------------
--------------------------------------------------------
Knockout.Validation ：

为空验证： 
self.CategoryId = ko.observable().extend({required: true});

最大最小值验证：
self.price = ko.observable().extend({required: {params: true, message: "请输入价格"}, min: {params: 1, message: "请输入大于1的整数"}, max: 100});

长度验证：
self.name = ko.observable().extend({minLength: 2, maxLength: {params: 30, message: "名称最大长度为30个字符"}, required: {params: true, message: "请输入名称",}});

电话验证：
self.phone = ko.observable().extend({phoneUS: {params: true,message: "电话不合法",}});

邮箱验证：
self.Email = ko.observable().extend({required: {params: true,message: "请填写Email"}, email: {params: true,message: "Email格式不正确"}});

数字验证：
self.age = ko.observable().extend({number: {params: true, message: "必须是数字",}});

相等验证：
self.PayPassword = ko.observable().extend({required: {params: true, message: "请填写支付密码"}, equal:{params:"zzl", message:"支付密码错误"} 
事实上，Knockout.Validation.js还有包括 range, date, digit, notEqual等验证

-----------------
    <input id="txtFirstName" type="text" data-bind="value:firstName, validationElement: firstName" /><br />
    <input id="txtLastName"  type="text" data-bind="value:lastName, validationElement: lastName" /><br />
    <input id="txtScore" type="text" data-bind="value:score, validationElement: score" /><br />
    <button id="btn" data-bind="click:SubmitClick" >btn</button>
    <br /><br />
    <!--显示错误提示信息 start-->
    <font color="red">
    <b>
        <span data-bind="validationMessage: firstName"></span>
        <span data-bind="validationMessage: lastName"></span>
        <span data-bind="validationMessage: score"></span>
    </b>
    </font>              
    <!--显示错误提示信息 end-->
------------------
模板： template
viewModel.whoAmI = function() {
   alert(this.name);
}.bind(viewModel);
viewModel.fullName = ko.dependentObservable(function() {
    return this.firstName() + " " + this.lastName();
}, viewModel);

viewModel.gratuityAdded.subscribe(function(newValue) {
    if (newValue) {
       this.total(this.total() * 1.15);
    }
}, viewModel);

<ul data-bind="template: { name: 'itemsTmpl', foreach: items }"></ul>
<script id="itemsTmpl" type="text/html">
     <li>
         <a href="#" data-bind="click: viewModel.whoAmI">Who am I?</a>
     </li>
</script>


----------------
require(['jquery', 'knockout', 'knockvalidation'], function ($, ko, kovalidation){

    kovalidation.configure({
        decorateElement: false,
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: false,
        parseInputAttributes: true,
        messageTemplate: null,
        errorClass: 'error'
    });

    var viewModel = {
        firstName: ko.observable().extend({
            required: {
                message: '请输入firstName'
            }
        }),
        lastName: ko.observable().extend({
            required: {
                message: '请输入lastName'
            }
        }).extend({
            minLength: 2,
            maxLength: 10
        }),
        score: ko.observable().extend({
            validation: {
                validator: function(val, someOtherVal) {
                    if (val != null && val.length >= someOtherVal) {
                        return true;
                    } else {
                        return false;
                    }
                },
                message: '最少要输入6位数字',
                params: 6
            }
        }),
        SubmitClick: function() {
            if (viewModel.errors().length == 0) {
                //可以提交数据了.
                alert("ok");
                return true;
            } else {
                alert("fail");
                viewModel.errors.showAllMessages();
                return false;
            }
        }
    };

    viewModel.errors = kovalidation.group(viewModel);
    $(function(){
        ko.applyBindings(viewModel);        
    });

});

// 官网模板应用内建
<p data-bind='fadeVisible: displayAdvancedOptions'>
    Show:
    <label><input type='radio' name="type" value='all' data-bind='checked: typeToShow'/>All</label>
    <label><input type='radio' name="type" value='rock' data-bind='checked: typeToShow'/>Rocky planets</label>
    <label><input type='radio' name="type" value='gasgiant' data-bind='checked: typeToShow'/>Gas giants</label>
</p>
<!-- afterRender, afterAdd, or beforeRemove — callback functions to be invoked against the rendered DOM elements-->
// 这里的事件 Using “afterRender”, “afterAdd”, and “beforeRemove”
<div data-bind='template: { foreach: planetsToShow,
                            beforeRemove: hidePlanetElement,
                            afterAdd: showPlanetElement }'>
    <div data-bind='attr: { "class": "planet " + type }, text: name'></div>
</div>

<p data-bind='fadeVisible: displayAdvancedOptions'>
    <button data-bind='click: addPlanet.bind($data, "rock")'>Add rocky planet</button>
    <button data-bind='click: addPlanet.bind($data, "gasgiant")'>Add gas giant</button>
</p>
</div>

var PlanetsModel = function () {
        this.planets = ko.observableArray([
            { name: "Mercury", type: "rock"},
            { name: "Venus", type: "rock"},
            { name: "Earth", type: "rock"},
            { name: "Mars", type: "rock"},
            { name: "Jupiter", type: "gasgiant"},
            { name: "Saturn", type: "gasgiant"},
            { name: "Uranus", type: "gasgiant"},
            { name: "Neptune", type: "gasgiant"},
            { name: "Pluto", type: "rock"}
        ]);

        this.typeToShow = ko.observable("all");
        this.displayAdvancedOptions = ko.observable(false);

        this.addPlanet = function (type) {
            this.planets.push({
                name: "New planet",
                type: type
            });
        };

        this.planetsToShow = ko.computed(function () {
            // Represents a filtered list of planets
            // i.e., only those matching the "typeToShow" condition
            var desiredType = this.typeToShow();
            if (desiredType == "all") return this.planets();
            return ko.utils.arrayFilter(this.planets(), function (planet) {
                return planet.type == desiredType;
            });
        }, this);

        // Animation callbacks for the planets list
        this.showPlanetElement = function (elem) {
            if (elem.nodeType === 1) $(elem).hide().slideDown()
        }
        this.hidePlanetElement = function (elem) {
            if (elem.nodeType === 1) $(elem).slideUp(function () {
                $(elem).remove();
            })
        }
    };
--------------------------------------------------------------
--------------------------------------------------------------
ko.utils ：

arrayForEach(array, action) foreach， 无返回

arrayIndexOf(array, item) -1, i

arrayFirst(array, predicate, predicateOwner) 第一个为true的

arrayRemoveItem(array, itemToRemove) 移除

arrayGetDistinctValues(array)  去重

arrayMap(array, mapping) 返回 array

arrayFilter(array, predicate) 满足断言的则放入数组返回

arrayPushAll(array, valuesToPush) 数组直接压入，对象只放值，返回数组

addOrRemoveItem(array, value, include) 有include 

extend

objectForEach(obj, action)

objectMap(source, mapping) 返回对象

----

emptyDomNode(domNode)

cloneNodes(nodesArray, shouldCleanNodes)

setDomNodeChildren(domNode, childNodes)

replaceDomeNodes(nodeToReplaceOrNodeArray, newNodesArray)

domNodeIsContainedBy(node, containedByNode)

tagNameLower(element)
-------
stringTrim(string)

stringTokenize(string, delimiter)

stringStartsWith(string, stratsWith)
-----------------
event:
registerEventHandler(element, eventType, handler)

triggerEvent(element, eventType)

registerEventHandler: function (element, eventType, handler) {
            var mustUseAttachEvent = ieVersion && eventsThatMustBeRegisteredUsingAttachEvent[eventType];
            if (!mustUseAttachEvent && jQuery) {
                jQuery(element)['bind'](eventType, handler);
            } else if (!mustUseAttachEvent && typeof element.addEventListener == "function")
                element.addEventListener(eventType, handler, false);
            else if (typeof element.attachEvent != "undefined") {
                var attachEventHandler = function (event) { handler.call(element, event); },
                    attachEventName = "on" + eventType;
                element.attachEvent(attachEventName, attachEventHandler);

                // IE does not dispose attachEvent handlers automatically (unlike with addEventListener)
                // so to avoid leaks, we have to remove them manually. See bug #856
                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    element.detachEvent(attachEventName, attachEventHandler);
                });
            } else
                throw new Error("Browser doesn't support addEventListener or attachEvent");
        },

        triggerEvent: function (element, eventType) {
            if (!(element && element.nodeType))
                throw new Error("element must be a DOM node when calling triggerEvent");

            // For click events on checkboxes and radio buttons, jQuery toggles the element checked state *after* the
            // event handler runs instead of *before*. (This was fixed in 1.9 for checkboxes but not for radio buttons.)
            // IE doesn't change the checked state when you trigger the click event using "fireEvent".
            // In both cases, we'll use the click method instead.
            var useClickWorkaround = isClickOnCheckableElement(element, eventType);

            if (jQuery && !useClickWorkaround) {
                jQuery(element)['trigger'](eventType);
            } else if (typeof document.createEvent == "function") {
                if (typeof element.dispatchEvent == "function") {
                    var eventCategory = knownEventTypesByEventName[eventType] || "HTMLEvents";
                    var event = document.createEvent(eventCategory);
                    event.initEvent(eventType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, element);
                    element.dispatchEvent(event);
                }
                else
                    throw new Error("The supplied element doesn't support dispatchEvent");
            } else if (useClickWorkaround && element.click) {
                element.click();
            } else if (typeof element.fireEvent != "undefined") {
                element.fireEvent("on" + eventType);
            } else {
                throw new Error("Browser doesn't support triggering events");
            }
        },
--------------------------------
unwrapObservable(value)

peekObservable(value)

toggleDomNodeCssClass(node, classNames, shouldHaveClass)

setTextContent(element, textContent)

setElementName(element, name)

forceRefresh(node) 主要针对ie9+

-----------------
range(min, max)

makeArray(arrayLikeObject)

isIe6

idIe7

ieVersion

getFormFields(form, fieldName)
---
parseJson(jsonString)

stringifyJson(data, replacer, space)

上面这两个最好直接用jquery的

postJson(urlOrForm, data, options)
提取数据然后转为form提交然后删除form

---
<script>
    function MyViewModel() {
        var self = this;
        self.name = ko.observable("林志玲");
        self.height = ko.observable(174);
        self.weight = ko.observable(52);
    }
    var michelle = {
        name: "陳研希", height: 160, weight: 45
    };
    var guilunmei = {
        name: "桂綸鎂", height: 164, weight: 46
    }
    $(function () {
        var vm = new MyViewModel();
        //將現有JavaScript物件轉為ViewModel

        $("#b1").click(function () {
            //方法1: 自己寫程式設定各欄位
            vm.name(michelle.name);
            vm.height(michelle.height);
            vm.weight(michelle.weight);
        });

        $("#b2").click(function () {
            //方法2: 透過Knockout Mapping Plug-In(可透過NuGet取得)
            ko.mapping.fromJS(guilunmei, { }, vm);
        });
        ko.applyBindings(vm);
    });

</script>
<body>
<dl>
    <dt>姓名</dt>
    <dd>
        <input type="text" data-bind="value: name" /></dd>
    <dt>身高</dt>
    <dd>
        <input type="text" data-bind="value: height" /></dd>
    <dt>體重</dt>

    <dd>
        <input type="text" data-bind="value: weight" /></dd>
</dl>

<div style="margin: 10px;">
    <input type="button" id="b1" value="JS物件轉ViewModel 1" />
    <input type="button" id="b2" value="JS物件轉ViewModel 2" />
</div>

<div>JSON.stringify</div>
<pre data-bind="text: JSON.stringify($root)"></pre>

<div>ko.toJSON</div>
<pre data-bind="text: ko.toJSON($root)"></pre>

<div>ko.mapping.toJSON</div>
<pre data-bind="text: ko.mapping.toJSON($root)"></pre>

</body>
------------------------------------------
---------------------------------------------
Rate-limiting observable notifications
用在延时响应，和组合多个改变到一个改变中。
throttle 的代替 ko3.1开始

【notifyAtFixedRate】 — Default value if not otherwise specified. The notification happens after the specified period of time from the first change to the observable

【notifyWhenChangesStop】 — The notification happens after no changes have occured to the observable for the specified period of time. Each time the observable changes, that timer is reset, so notifications cannot happen if the observable continuously changes more frequently than the timeout period.


var name = ko.observable('Bert').extend({ rateLimit: 500 });
Doing something when the user stops typing
<p>Type stuff here: <input data-bind='value: instantaneousValue,
    valueUpdate: ["input", "afterkeydown"]' /></p>
<p>Current delayed value: <b data-bind='text: delayedValue'> </b></p>
 
<div data-bind="visible: loggedValues().length > 0">
    <h3>Stuff you have typed:</h3>
    <ul data-bind="foreach: loggedValues">
        <li data-bind="text: $data"></li>
    </ul>
</div>
function AppViewModel() {
    this.instantaneousValue = ko.observable();
    this.delayedValue = ko.computed(this.instantaneousValue)
        .extend({ rateLimit: { method: "notifyWhenChangesStop", timeout: 400 } });
 
    // Keep a log of the throttled values
    this.loggedValues = ko.observableArray([]);
    this.delayedValue.subscribe(function (val) {
        if (val !== '')
            this.loggedValues.push(val);
    }, this);
}
 
ko.applyBindings(new AppViewModel());
----------
Avoiding multiple Ajax requests

ko.computed(function() {
    // This evaluation logic is exactly the same as before
    var params = { page: this.pageIndex(), size: this.pageSize() };
    $.getJSON('/Some/Json/Service', params, this.currentPageData);
}, this).extend({ rateLimit: 0 });

如果不用rateLimit 会发生两次ajax提交。
使用rateLimit能够避免额外的计算，确保任何同步序列的依赖改变将触发一个依赖求值。

Comparison with the throttle extender
写依赖值不会延迟。
All change notifications are delayed, including when calling valueHasMutated manually. 不能使用 valueHasMutated 强制 a rate-limited observable to notify an un-changed value.
就是强制改变依赖值用 valueHasMutated()
--------------------
ko.dataFor(element) - returns the data that was available for binding against the element

ko.contextFor(element) - returns the entire binding context that was available to the DOM element.

$(".remove").live("click", function() {
    viewModel.items.remove(ko.dataFor(this));
});
-------------------------------
它会自动将data里所有的属性创建成observable类型的属性。你可以通过ko.mapping.fromJS 函数定期从服务器获取数据，然后更新你的view model
ko.mapping.fromJS(data, viewModel)
ko.mapping.toJS()
ko.mapping.fromJSON
ko.mapping.toJSON.

var data = {
    name: 'Scot',
    children: [
        { id : 1, name : 'Alicw' }
    ]
}

You can map this to a view model without any problems:
var viewModel = ko.mapping.fromJS(data);

Now, let’s say the data is updated to be without any typos:
var data = {
    name: 'Scott',
    children: [
        { id : 1, name : 'Alice' }
    ]
}
这样，每次map的时候，mapping插件都会检查数组项的id属性来判断这个数组项是需要合并的还是全新replace的。
为了避免ko全部删除子对象，来代替局部更新，可以使用key
var mapping = {
    'children': {
        key: function(data) {
            return ko.utils.unwrapObservable(data.id);
        }
    }
}
var viewModel = ko.mapping.fromJS(data, mapping);

--
用create自定义对象的构造器
如果你想自己控制mapping，你也可以使用create回调

var mapping = {
    'children': {
        create: function(options) {
            return new myChildModel(options.data);
        }
    }
}
var viewModel = ko.mapping.fromJS(data, mapping);
支持create回调的options参数是一个JavaScript对象，包含如下：

    data： JavaScript对象，包含child用到的数据
    parent：child对象所属的父对象或者数组

当然，在内部的create回调里，你也可以再次调用ko.mapping.fromJS。一个例子就是：如果你想让初始的JavaScript对象带有额外的依赖属性dependent observables
var myChildModel = function(data) {
    ko.mapping.fromJS(data, {}, this);
     
    this.nameLength = ko.computed(function() {
        return this.name().length;
    }, this);
}
---
使用update 回调来自定义一个对象如何更新。
update 回调使用的options参数是一个JavaScript对象，包含如下内容：

    data：JavaScript对象，包含child用到的数据
    parent：child对象所属的父对象或者数组
    observable：如果属性是observable的，这将会写入到实际的observable里

var data = {
    name: 'Graham',
}
在数据显示之前，在新数据后面附加额外的字符串：
var mapping = {
    'name': {
        update: function(options) {
            return options.data + 'foo!';
        }
    }
}
var viewModel = ko.mapping.fromJS(data, mapping);
alert(viewModel.name());
---
使用ignore忽略不需要map的属性

var mapping = {
    'ignore': ["propertyToIgnore", "alsoIgnoreThis"]
}

var viewModel = ko.mapping.fromJS(data, mapping);

你声明的忽略数组被编译到默认的ignore数组里。你可以像下面代码一样来维护它：

var oldOptions = ko.mapping.defaultOptions().ignore;
ko.mapping.defaultOptions().ignore = ["alwaysIgnoreThis"];


--
当map你的view model回到JS对象是时候，只map原始view model里拥有的属性（除了例外的_destroy属性），不过，你可以使用include参数来定制

var mapping = {
    'include': ["propertyToInclude", "alsoIncludeThis"]
}
var viewModel = ko.mapping.fromJS(data, mapping);
你声明的include数组被编译到默认的include数组里，默认只有_destroy。 你可以像这样来维护

var oldOptions = ko.mapping.defaultOptions().include;
ko.mapping.defaultOptions().include = ["alwaysIncludeThis"];


--
map的时候是把所有的值都转换成observable的，如果你只是想copy属性值而不是替换成observable的，你可以将属性名称添加到copy数组：
var mapping = {
    'copy': ["propertyToCopy"]
}
var viewModel = ko.mapping.fromJS(data, mapping);
你声明的copy数组被编译到默认的copy数组里，默认值是空。你可以像这样来维护：

var oldOptions = ko.mapping.defaultOptions().copy;
ko.mapping.defaultOptions().copy = ["alwaysCopyThis"];

Specifying the update target

在上面的例子，如果你想再一个class内map，你可以使用第三个参数作为操作的目标，例如：

ko.mapping.fromJS(data, {}, someObject); // overwrites properties on someObject

所以，如果你想map一个JavaScript对象到this上，你可以这样声明：

ko.mapping.fromJS(data, {}, this);


--
Observing only certain properties using “observe”
var mapping = {
    'observe': ["propertyToObserve"]
}
var viewModel = ko.mapping.fromJS(data, mapping);
-----------
Mapped observable array

    mappedRemove
    mappedRemoveAll
    mappedDestroy
    mappedDestroyAll
    mappedIndexOf
var obj = [
    { id : 1 },
    { id : 2 }
]
 
var result = ko.mapping.fromJS(obj, {
    key: function(item) {
        return ko.utils.unwrapObservable(item.id);
    }
});
 
result.mappedRemove({ id : 2 });
从多数据源map

你可以通过多次使用ko.mapping.fromJS 来将多个JS对象的数据源map到一起，例如：

var viewModel = ko.mapping.fromJS(alice, aliceMappingOptions);
ko.mapping.fromJS(bob, bobMappingOptions, viewModel);

你声明的mapping选项option在每次调用的时候都会合并。