// object inheri 对象继承
function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
}
/* An anonymous function, executed immediately. */

(function() {
  var foo = 10;
  var bar = 2;
  alert(foo * bar);
})();


/* An anonymous function with arguments. */

(function(foo, bar) {
  alert(foo * bar);
})(10, 2);


/* An anonymous function that returns a value. */

var baz = (function(foo, bar) {
  return foo * bar;
})(10, 2);

// baz will equal 20.


/* An anonymous function used as a closure. */

var baz;

(function() {
  var foo = 10;
  var bar = 2;
  baz = function() { 
    return foo * bar; 
  };
})();

baz(); // baz can access foo and bar, even though is it executed outside of the
       // anonymous function.

/* Anim class, with a slightly different syntax for declaring methods. */

var Anim = function() { 
  ...
};
Anim.prototype = {
  start: function() {
    ...
  },
  stop: function() {
    ...
  }
};

/* Add a method to the Function class that can be used to declare methods. */

Function.prototype.method = function(name, fn) {
  this.prototype[name] = fn;
};

/* Anim class, with methods created using a convenience method. */

var Anim = function() { 
  ...
};
Anim.method('start', function() {
  ...
});
Anim.method('stop', function() {
  ...
});


/* This version allows the calls to be chained. */

Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};

/* Anim class, with methods created using a convenience method and chaining. */

var Anim = function() { 
  ...
};
Anim.
  method('start', function() {
    ...
  }).
  method('stop', function() {
    ...
  });


// ------------------------------------------------
/* Grouping constants together. */
var Class = (function() {
  
  // Private static attributes.
  var constants = {
    UPPER_BOUND: 100,
    LOWER_BOUND: -100
  }
  
  // Privileged static method.
  this.getConstant(name) {
    return constants[name];
  }

  ...

  // Return the constructor.
  return function(constructorArgument) {
    ...
  }
})();


/* Usage. */

Class.getConstant('UPPER_BOUND');

var Book = (function() {
  
  // Private static attributes.
  var numOfBooks = 0;

  // Private static method.
  function checkIsbn(isbn) {
    ... 
  }    
  // Return the constructor.
  return function(newIsbn, newTitle, newAuthor) { // implements Publication
    // Private attributes.
    var isbn, title, author;

    // Privileged methods.
    this.getIsbn = function() {
      return isbn;
    };
    this.setIsbn = function(newIsbn) {
      if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.');
      isbn = newIsbn;
    };
    // Constructor code.
    numOfBooks++; // Keep track of how many Books have been instantiated
                  // with the private static attribute.
    if(numOfBooks > 50) throw new Error('Book: Only 50 instances of Book can be '
        + 'created.');

    this.setIsbn(newIsbn);
  }
})();

// Public static method.
Book.convertToTitleCase = function(inputString) {
  ...
};

// Public, non-privileged methods.
Book.prototype = {
  display: function() {
    ...
  }
};
// ------------------------------------------------
/* Clone function. */

function clone(object) {
    function F() {}
    F.prototype = object;
    return new F;
}
function augment(receivingClass, givingClass) {
  for(methodName in givingClass.prototype) { 
    if(!receivingClass.prototype[methodName]) {
      receivingClass.prototype[methodName] = givingClass.prototype[methodName];
    }
  }
}
function augment(receivingClass, givingClass) {
  if(arguments[2]) { // Only give certain methods.
    for(var i = 2, len = arguments.length; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  } 
  else { // Give all methods.
    for(methodName in givingClass.prototype) { 
      if(!receivingClass.prototype[methodName]) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }
    }
  }
}
/* Mixin class. */

var Mixin = function() {};
Mixin.prototype = {
  serialize: function() {
    var output = [];
    for(key in this) {
      output.push(key + ': ' + this[key]);
    }
    return output.join(', ');
  }
};

augment(Author, Mixin);

var author = new Author('Ross Harmes', ['JavaScript Design Patterns']);
var serializedString = author.serialize();
// ------------------------------------------------
/* Singleton as an Object Literal. */

MyNamespace.Singleton = {};

/* Singleton with Private Members, step 1. */

MyNamespace.Singleton = (function() {
  return {};
})();


/* Singleton with Private Members, step 3. */

MyNamespace.Singleton = (function() {
  // Private members.
  var privateAttribute1 = false;
  var privateAttribute2 = [1, 2, 3];
  
  function privateMethod1() {
    ...
  }
  function privateMethod2(args) {
    ...
  }

  return { // Public members.
    publicAttribute1: true,
    publicAttribute2: 10,
    
    publicMethod1: function() {
      ...
    },
    publicMethod2: function(args) {
      ...
    }
  };
})();

/* DataParser singleton, converts character delimited strings into arrays. */ 
/*   Now using true private methods. */

GiantCorp.DataParser = (function() {
  // Private attributes.
  var whitespaceRegex = /\s+/;
  
  // Private methods.
  function stripWhitespace(str) {
    return str.replace(whitespaceRegex, '');
  }
  function stringSplit(str, delimiter) {
    return str.split(delimiter);
  }
  
  // Everything returned in the object literal is public, but can access the
  // members in the closure created above.
  return { 
    // Public method.
    stringToArray: function(str, delimiter, stripWS) {
      if(stripWS) {
        str = stripWhitespace(str);
      }
      var outputArray = stringSplit(str, delimiter);
      return outputArray;
    }
  };
})(); // Invoke the function and assign the returned object literal to GiantCorp.DataParser.

/* General skeleton for a lazy loading singleton, step 3. */

MyNamespace.Singleton = (function() {
  
  var uniqueInstance; // Private attribute that holds the single instance.
  
  function constructor() { // All of the normal singleton code goes here.
    ...
  }
  
  return {
    getInstance: function() {
      if(!uniqueInstance) { // Instantiate only if the instance doesn't exist.
        uniqueInstance = constructor();
      }
      return uniqueInstance;
    }
  }
})();

/* Branching Singleton (skeleton). */

MyNamespace.Singleton = (function() {
  var objectA = {
    method1: function() {
      ...
    },
    method2: function() {
      ...
    }
  };
  var objectB = {
    method1: function() {
      ...
    },
    method2: function() {
      ...
    }
  };

  return (someCondition) ? objectA : objectB;
})();

// ------------------------------------------------------------------
// Include syntactic sugar to help the development of our interface.
Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};
(function() {
        function _$(els) {
                // ...
            }
            /*
              Events
                * addEvent
                * getEvent
            */
        _$.method('addEvent', function(type, fn) {
                // ...
            }).method('getEvent', function(e) {
                // ...
            }).
            /*
              DOM
                * addClass
                * removeClass
                * replaceClass
                * hasClass
                * getStyle
                * setStyle
            */
        method('addClass', function(className) {
                // ...
            }).method('removeClass', function(className) {
                // ...
            }).method('replaceClass', function(oldClass, newClass) {
                // ...
            }).method('hasClass', function(className) {
                // ...
            }).method('getStyle', function(prop) {
                // ...
            }).method('setStyle', function(prop, val) {
                // ...
            }).
            /*
              AJAX
                * load. Fetches an HTML fragment from a URL and inserts it into an element.
            */
        method('load', function(uri, method) {
            // ...
        });
        window.$ = function() {
            return new _$(arguments);
        };
})();

Function.prototype.method = function(name, fn) {
    // ...
};
(function() {
    function _$(els) {
        // ...
    }
    _$.method('addEvent', function(type, fn) {
            // ...
        })
        // ...

    window.installHelper = function(scope, interface) {
        scope[interface] = function() {
            return new _$(arguments);
        }
    };
})();


/* Usage. */

installHelper(window, '$');

$('example').show();


/* Another usage example. */

// Define a namespace without overwriting it if it already exists.
window.com = window.com || {};
com.example = com.example || {};
com.example.util = com.example.util || {};

installHelper(com.example.util, 'get');

(function() {
    var get = com.example.util.get;
    get('example').addEvent('click', function(e) {
        get(this).addClass('hello');
    });
})();

// Accessor with function callbacks.
window.API2 = window.API2 || {};
API2.prototype = function() {
    var name = 'Hello world';
    // Privileged mutator method.
    setName: function(newName) {
            name = newName;
            return this;
        },
        // Privileged accessor method.
        getName: function(callback) {
            callback.call(this, name);
            return this;
        }
}();

// Implementation code.
var o2 = new API2;
o2.getName(console.log).setName('Meow').getName(console.log);
// Displays 'Hello world' and then 'Meow'.
// ---------------------------------------------------------------
/* AjaxHandler interface. */

var AjaxHandler = new Interface('AjaxHandler', ['request', 'createXhrObject']);

/* SimpleHandler class. */

var SimpleHandler = function() {}; // implements AjaxHandler
SimpleHandler.prototype = {
    request: function(method, url, callback, postVars) {
        var xhr = this.createXhrObject();
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            (xhr.status === 200) ?
            callback.success(xhr.responseText, xhr.responseXML):
                callback.failure(xhr.status);
        };
        xhr.open(method, url, true);
        if (method !== 'POST') postVars = null;
        xhr.send(postVars);
    },
    createXhrObject: function() { // Factory method.
        var methods = [
            function() {
                return new XMLHttpRequest();
            },
            function() {
                return new ActiveXObject('Msxml2.XMLHTTP');
            },
            function() {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        ];

        for (var i = 0, len = methods.length; i < len; i++) {
            try {
                methods[i]();
            } catch (e) {
                continue;
            }
            // If we reach this point, method[i] worked.
            this.createXhrObject = methods[i]; // Memoize the method.
            return methods[i];
        }

        // If we reach this point, none of the methods worked.
        throw new Error('SimpleHandler: Could not create an XHR object.');
    }
};

/* Usage. */

var myHandler = new SimpleHandler();
var callback = {
    success: function(responseText) {
        alert('Success: ' + responseText);
    },
    failure: function(statusCode) {
        alert('Failure: ' + statusCode);
    }
};
myHandler.request('GET', 'script.php', callback);

// ---------------------------------------------------
var asyncRequest = (function() {
    function handleReadyState(o, callback) {
        var poll = window.setInterval(
            function() {
                if (o && o.readyState == 4) {
                    window.clearInterval(poll);
                    if (callback) {
                        callback(o);
                    }
                }
            },
            50
        );
    }
    var getXHR = function() {
        var http;
        try {
            http = new XMLHttpRequest;
            getXHR = function() {
                return new XMLHttpRequest;
            };
        } catch (e) {
            var msxml = [
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP'
            ];
            for (var I = 0, len = msxml.length; i < len; ++i) {
                try {
                    http = new ActiveXObject(msxml[i]);
                    getXHR = function() {
                        return new ActiveXObject(msxml[i]);
                    };
                    break;
                } catch (e) {}
            }
        }
        return http;
    };
    return function(method, uri, callback, postData) {
        var http = getXHR();
        http.open(method, uri, true);
        handleReadyState(http, callback);
        http.send(postData || null);
        return http;
    };
})();

// ----------------------------------------------------------
Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};


// From the Mozilla Developer Center website at http://developer.mozilla.org/en/docs/New_in_JavaScript_1.6#Array_extras.

if (!Array.prototype.forEach) {
    Array.method('forEach', function(fn, thisObj) {
        var scope = thisObj || window;
        for (var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    });
}

if (!Array.prototype.filter) {
    Array.method('filter', function(fn, thisObj) {
        var scope = thisObj || window;
        var a = [];
        for (var i = 0, len = this.length; i < len; ++i) {
            if (!fn.call(scope, this[i], i, this)) {
                continue;
            }
            a.push(this[i]);
        }
        return a;
    });
}

// -----------------------简单观察者-----------------------------

window.DED = window.DED || {};
DED.util = DED.util || {};
DED.util.Observer = function() {
    this.fns = [];
}
DED.util.Observer.prototype = {
    subscribe: function(fn) {
        this.fns.push(fn);
    },
    unsubscribe: function(fn) {
        this.fns = this.fns.filter(
            function(el) {
                if (el !== fn) {
                    return el;
                }
            }
        );
    },
    fire: function(o) {
        this.fns.forEach(
            function(el) {
                el(o);
            }
        );
    }
};

// ---------------------------------------------------
var e = e || window.event;
var src = e.target || e.srcElement;
try {
    e.preventDefault();
} catch (ex) {
    e.returnValue = false;
}

function addEvent(el, type, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    } else if (window.attachEvent) {
        el.attachEvent('on' + type, fn);
    } else {
        el['on' + type] = fn;
    }
}

function setStyle(elements, prop, val) {
    for (var i = 0, len = elements.length - 1; i < len; ++i) {
        document.getElementById(elements[i]).style[prop] = val;
    }
}

setCSS(['foo'], {
    position: 'absolute',
    top: '50px',
    left: '300px'
});

function setCSS(el, styles) {
    for (var prop in styles) {
        if (!styles.hasOwnProperty(prop)) continue;
        setStyle(el, prop, styles[prop]);
    }
}

DED.util.Event = {
    getEvent: function(e) {
        return e || window.event;
    },
    getTarget: function(e) {
        return e.target || e.srcElement;
    },
    stopPropagation: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    },
    preventDefault: function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    stopEvent: function(e) {
        this.stopPropagation(e);
        this.preventDefault(e);
    }
};
// --------------------------------------------------------------
// Prototype $ function.
function $() {
    var elements = new Array();
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if (typeof element == 'string')
            element = document.getElementById(element);
        if (arguments.length == 1)
            return element;
        elements.push(element);
    }
    return elements;
}

var text = 'Hello {name}, welcome to {place}';
var o = {
  name: 'world',
  place: 'Google'
};
var res = text.replace(/{([^{}]*)}/g, function (a, b) {
  var r = o[b];
  console.log(a, b)
  return typeof r === 'string' || typeof r === 'number' ? r : a;
}
);
console.log(res);
// --------------------------------------------------------
function upperCaseDecorator(func) {
  return function() {
    return func.apply(this, arguments).toUpperCase();
  }
}

function getDate() {
  return (new Date()).toString();
}
getDateCaps = upperCaseDecorator(getDate);

alert(getDate()); // Returns Wed Sep 26 2007 20:11:02 GMT-0700 (PDT)
alert(getDateCaps()); // Returns WED SEP 26 2007 20:11:02 GMT-0700 (PDT)

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function encode64(input){
    input = strUnicode2Ansi(input);
    
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
        
    do{
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2))
        {
            enc3 = enc4 = 64;
        }
        else if(isNaN(chr3))
        {
            enc4 = 64;
        }

        output = output + 
        keyStr.charAt(enc1) + 
        keyStr.charAt(enc2) + 
        keyStr.charAt(enc3) + 
        keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
        
    }while(i < input.length);

    return output;
}
function strUnicode2Ansi(asContents){
    var len1=asContents.length;
    var temp="";
    for(var i=0;i<len1;i++)
    {
        var varasc=asContents.charCodeAt(i);
        if(varasc<0)
                varasc+=65536;
        if(varasc>127)
                varasc=UnicodeToAnsi(varasc);
        if(varasc>255)
        {
            var varlow=varasc & 65280;
            varlow=varlow>>8;
            var varhigh=varasc & 255;
            temp+=String.fromCharCode(varlow)+String.fromCharCode(varhigh);
        }
        else
        {
            temp+=String.fromCharCode(varasc);
        }
    }
    return temp;
}
