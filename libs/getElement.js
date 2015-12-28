/*
HTMLDocument和HTMLElement下的常规选择器                                    
 
1. HTMLDocument的选择器： getElementById 、 getElementsByName 、 getElementsByTagName、 getElementsByClassName 
 
2. HTMLElement的选择器： getElementsByTagName 、 getElementsByClassName

//getElementById理应只返回id属性值匹配的元素，而IE8+、webkit和molliza也是这样做的。
但IE567却不遵循这一法则，它们会获取id属性值或name属性值匹配的元素，然后以第一个匹配的元素作为返回值。

Function.prototype.call、Function.prototype.apply和Fucntion.prototype.bind 后，锁定执行上下文（EC）的this引用变得十分的简单。
若你想通过锁定getElementById、getElementsByName的this引用，从而达到选择根节点的动态变换，那将掉进另一个坑中。

// 下面的代码将会抛异常
var nativeGetId = document.getElementById;
var a = document.getElementsByTagName('a')[0];
nativeGetId.call(a, 'innerImg');
根据现象推测，getElementId内部实现可能是针对特定的DOM对象而工作的，所以当强行改变this引用时，就会跑异常。


//IE5678下选择器的原型链上少了Function？                                                     
 
也许你看到这个标题的时候会认为这是不可能的事，因为 document.getElementById.call 是真实存在的呀。但 document.getElementById instanceof Function 居然返回false，现在头大了吧。让我们再通过下面对Function原型增强来验证一下吧！
 
Function.prototype.just4Test = function(){
   console.log('just4Test'); 
};
 
console.log(typeof document.getElementById.just4Test); // 返回undefined
//事实证明IE5678下选择器的原型链没有Function，那选择器就无法共享各种对Function原型的增强了，所以我们需要通过一层薄薄的封装来处理。
 
// 以getElementsByName为例
var nativeGetByName = document.getElementsByName;
document.getElementsByName = function(name){
   return nativeGetByName.call(this, name); 
};

总结一句，若要使用那就使用 document.all[{String} id或name] 就好了（其他返回的是正常的NodeList嘛），其它用法能不用就坚决不用吧。

//隐藏的武士刀三： document.scripts                                                                      
 
   获取文档中所有script对象的引用。但从IE5678到Webkit、Molliza都包含以自闭合格式声明的script对象 <script /> ，正确的声明格式是 <script></script> 。
 
但在IE5678中 document.scripts是个类函数，而在Webkit和Molliza中是个HTMLCollection对象。在IE5678下的具体玩法如下：
 
// 获取指定位置的元素对象
document.scripts[{Number} 索引];
document.scripts({Number} 索引);

//隐藏的武士刀四： document.styleSheets 　　　　　　　　　　　　　　　　　　    
 
  获取文档中所有style和link的CSSStyleSheet类型对象的引用，与document.getElementsByTagName('style')和document.getElementsByTagName('link')获取的是HTMLStyleElement类型对象是不同的，在IE5678中是一个类函数，Webkit和Molliza中是一个StyleSheetList类型对象（属于NodeList类型，想了解跟多NodeList和HTMLCollection可留意另一篇《JS魔法堂：那些困扰你的DOM集合类型》）。由于涉及的边幅过大，因此打算另开一篇《JS魔法堂：哈佬，css.js！》
*/
//三个参数都是必需的，查找一网页中5007个类名为“cell”的元素，IE8历时1828 ~ 1844毫秒，
//IE6为4610 ~ 6109毫秒，FF3.5为46 ~ 48毫秒，opera10为31 ~ 32毫秒，Chrome为23~ 26毫秒，
//safari4为19 ~ 20毫秒
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all :
        oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i < arrElements.length; i++){
        oElement = arrElements[i];
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements)
}

//后两参数是可靠的，查找一网页中5007个类名为“cell”的元素，IE8历时78毫秒，IE6历时125~171毫秒
//FF3.5为42 ~ 48毫秒，opera10为31 毫秒，Chrome为22~ 25毫秒，safari4为18 ~ 19毫秒
var getElementsByClass = function(searchClass,node,tag) {
        var classElements = new Array();
        if ( node == null )
                node = document;
        if ( tag == null )
                tag = '*';
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
        for (i = 0, j = 0; i < elsLen; i++) {
                if ( pattern.test(els[i].className) ) {
                        classElements[j] = els[i];
                        j++;
                }
        }
        return classElements;
}

// 这里对getElementById,getElementsByTagName,getElementsByName进行了封装从而继承Function，并polyfill了getElementsByClassName，并排除嵌套form的问题。
 

void function(global, doc){
   /** IE5678中用于判断是否为嵌套form
     * @method 
     * @param {HTMLFormElement} form
     * @return {Boolean}
     */
    var isNestForm = function(form){
        var forms = document.forms, i = 0, curr;
        for (;(curr = forms[i++], curr && curr !== form);){}
 
        return !curr;
    };
    var removeNestForm = function(node){
        if (node === null || typeof node === 'undefined') return null;
 
        var ret = node;
        if (node.tagName && node.tagName.toLocaleLowerCase() === 'form'){
            ret = isNestForm(node) ? null : node;
        } 
        else if (node.length){
            ret = [];
            for (var i = 0, len = node.length; i < len; ++i){
                var tmp = node[i];
                isNestForm(tmp) || ret.push(tmp);
            }
        }
 
        return ret;
    };
 
    // 选择器加工工厂对象
    var nsWrapers = {};
    nsWrapers.getElementById = function(node){
        var host = node;
        var nativeGetById = host.getElementById;
        /** 修复IE567下document.geElementById会获取name属性值相同的元素
         * 修复IE5678下document.geElementById没有继承Function方法的诡异行为
         * @method
         * @param {String} id
         * @return {HTMLElementNode|Null}
         */
        return function(id){
            var node = nativeGetById.call(host, id);
            if (node && node.id !== id){
                var nodes = doc.all[id];
                var i = 0;
                for (;(node = nodes && nodes[i++] || null, node && node.id !== id);){}
            }
 
            node = removeNestForm(node);
            wraperFactory(node);
            return node;
        };
    };
    nsWrapers.getElementsByName = function(node){
        var host = node;
        var nativeGetByName = host.getElementsByName;
        /** 修复IE5678下document.geElementsByName没有继承Function方法的诡异行为
         * @method
         */
        return function(tag){
            var nodes = nativeGetByName.call(host, tag);
 
            nodes = removeNestForm(nodes);
            wraperFactory(nodes);
            return nodes;
        };
    };
    nsWrapers.getElementsByTagName = function(node){
        var host = node;
        var nativeGetByTagName = host.getElementsByTagName;
        /** 修复IE5678下document.geElementsByTagName没有继承Function方法的诡异行为
         * @method
         */
        return function(tag){
            var nodes = nativeGetByTagName.call(host, tag);
 
            nodes = removeNestForm(nodes);
            wraperFactory(nodes);
            return nodes;
        };
    };
    /** 通过类名选择元素
     * @method
     * @param {Node} node DOM元素
     * @param {String} cls 类名
     */
    var _getElementsByClassName = function(node, cls){
        var seed = node.childNodes, nodes = [], i = 0, node;
        while(node = seed[i++]){
            if (node.nodeType === 1){
                node.className.search(new RegExp('\\b' + cls + '\\b', 'i')) >= 0 && nodes.push(node);
                nodes = nodes.concat(_getElementsByClassName(node, cls));
            }
        }
 
        return nodes;
    };
    nsWrapers.getElementsByClassName = function(node){
        var host = node;
 
        return function(cls){
            var nodes = _getElementsByClassName(host, cls);
 
            nodes = removeNestForm(nodes);
            wraperFactory(nodes);
            return nodes;
        };
    };
 
    var htmlElSelectors = ['getElementsByTagName', 'getElementsByClassName'];
    var htmlDocSelectors = htmlElSelectors.concat(['getElementById', 'getElementsByName']);
    var wraperFactory = function(node){
        if (!node) return void 0;
 
        if (node.tagName !== 'form' && node.length && node[0]){
            for (var i = node.length - 1; i >= 0; --i){
                wraperFactory(node[i]);
            }
        }
        else{
            var ns = !node.ownerDocument ? htmlDocSelectors : htmlElSelectors
            , i = 0, currNS, currWraper;
            while (currNS = ns[i++]){
                if (currWraper = nsWrapers[currNS]){
                    node[currNS] = currWraper(node);
                }
            }
        }
    };
 
    (! + [1,]) && wraperFactory(doc);
}(window, document);