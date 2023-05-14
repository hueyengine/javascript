// var Plane = function () {
//     this.blood = 100;
//     this.attackLevel = 1;
//     this.defenseLevel = 1;
// };
// var plane = new Plane();
// plane.blood = 500;
// plane.attackLevel = 10;
// plane.defenseLevel = 7;
// var clonePlane = Object.create(plane);
// console.log(clonePlane); // 输出：Object {blood: 500, attackLevel: 10, defenseLevel: 7}

/**
 * @description 案例 1.4.5
 */

function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name
};

var objectFactory = function () {
    var obj = new Object();
    // Arguments(2) [ƒ, 'sven', callee: ƒ, Symbol(Symbol.iterator): ƒ]
    var Constructor = [].shift.call(arguments);
    /**
     * Constructor此时的值为：
     * f Person(name) {
     *   this.name = name;
     * }
     */
    obj.__proto__ = Constructor.prototype;
    // call() 方法接受的是一个参数列表，
    // 而 apply() 方法接受的是一个包含多个参数的数组。
    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;
};

var a = objectFactory(Person, 'sven');