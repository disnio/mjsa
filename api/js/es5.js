// --------------------------------------
function copyObject(orig){
    var copy = Object.create(Object.getPrototypeOf(orig));
    copyOwnPropertiesFrom(copy, orig);
    return copy;
}

function Sub(prop1, prop2, prop3){
    Super.call(this, prop1, prop2);
    this.prop3 = prop3
}

Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.method1 = function(){};

// --------------------------------
function copyOwnPropertiesFrom(target, source){
    Object.getOwnPropertyNames(source).forEach(function(proKey){
        var des = Object.getOwnPropertyDescriptor(source, proKey);
        Object.defineProperty(target, proKey, des)
    })
    return target;
}

function subclass(SubC, SuperC){
    var subProto = Object.create(SuperC.prototype);
    copyOwnPropertiesFrom(subProto, SuperC.prototype);
    SubC.prototype = subProto;
    SubC._super = SuperC.prototype;
}

function Person(name){
    this.name = name;
}

Person.prototype.describe = function(){
    return 'Person called ' + this.name;
}

function Employee(name, title){
    Employee._super.constructor.call(this, name);
    // Person.call(this, name);
    this.title = title;
}
// Employee.prototype.constructor = Employee;
subclass(Employee, Person);
Employee.prototype.describe = function(){
    // return Person.prototype.describe.call(this) + this.title;
    return Employee._super.describe.call(this) + "( " +this.title + " )";
}


var jane = new Employee('Jane', 'Cto');
console.log(jane.describe());
console.log(jane instanceof Employee, jane instanceof Person);

// ---------------  JSON.parse(text, reviver)  -----------------
function dataReviver(key, value){
    if(typeof value === "string"){
        var x = Date.parse(value);
        if(!isNaN(x)){
            return new Date(x)
        }
    }
    return value;
}