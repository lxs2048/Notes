---
slug: data-type
title: js数据类型
authors: [dolphin]
tags: [js数据类型,判断数据类型]
---

## JavaScript数据类型

最新的 ECMAScript 标准定义了 8 种[数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%92%8C%E7%B1%BB%E5%9E%8B)：

七种基本数据类型：

* 布尔值（Boolean），有 2 个值分别是：true 和 false.
* null ， 一个表明 null 值的特殊关键字。 JavaScript 是大小写敏感的，因此 null 与 Null、NULL或变体完全不同。
* undefined ，和 null 一样是一个特殊的关键字，undefined 表示变量未赋值时的属性。
* 数字（Number），整数或浮点数，例如： 42 或者 3.14159。
* 任意精度的整数 (BigInt) ，可以安全地存储和操作大整数，甚至可以超过数字的安全整数限制。
* 字符串（String），字符串是一串表示文本值的字符序列，例如："Howdy" 。
* 代表（Symbol）( 在 ECMAScript 6 中新添加的类型).。一种实例是唯一且不可改变的数据类型。

以及对象（Object）。

## 判断数据类型

* **typeof**：`typeof target`，返回一个表示操作值的类型字符串,
* instanceof：`target instanceof constructor`，判断操作值是否是指定构造函数的实例
* constructor：`target.constructor`，判断操作值是否是指定构造函数的实例
* Object.prototype.toString：`Object.prototype.toString.call(target)`，返回对象的类型字符串，可以准确判断所有数据类型

---

`typeof`示例如下：

```js
// 'number'
console.log(typeof 123)
// 'string'
console.log(typeof '123')
// 'boolean'
console.log(typeof true)
// 'symbol'
console.log(typeof Symbol(123))
// 'bigint'
console.log(typeof BigInt(123))
// 'undefined'
console.log(typeof undefined)
// 'object'
console.log(typeof null)
// 'object'
console.log(typeof [])
// 'object'
console.log(typeof {})
// 'function'
console.log(typeof function(){})
// 'object'
console.log(typeof new Date())
// 'object'
console.log(typeof /\d/g)
// 'object'
console.log(typeof new Error())
```

`typeof`可以准确判断除null之外的所有基本数据类型以及Function

对于 `null` 及其他引用数据类型都返回 `object`

---

`instanceof`示例如下：

```js
// false
console.log(123 instanceof Number)
// false
console.log('123' instanceof String)
// false
console.log(true instanceof Boolean)
// false
console.log(Symbol(123) instanceof Symbol)
// false
console.log(10n instanceof BigInt)
// TypeError: Right-hand side of 'instanceof' is not an object
// console.log(undefined instanceof undefined)
// TypeError: Right-hand side of 'instanceof' is not an object
// console.log(null instanceof null)
// true
console.log([] instanceof Array)
// true
console.log({} instanceof Object)
// true
console.log(function(){} instanceof Function)
// true
console.log(new Date() instanceof Date)
// true
console.log(/\d/g instanceof RegExp)
// true
console.log(new Error() instanceof Error)
```

* `instanceof`不能判断基本数据类型
  **基本数据类型并不是构造函数的实例，没有原型链。**原型链的终点是 Object.protype => null,所以引用数据类型的原型链上都会存在Object.protype。
* 原型链可以被修改，所以结果值不一定准确。

---

`constructor`示例如下：

```js
// [Function: Number]
console.log((123).constructor)
// [Function: String]
console.log('123'.constructor)
// [Function: Boolean]
console.log(true.constructor)
// [Function: Symbol]
console.log(Symbol(123).constructor)
// [Function: BigInt]
console.log(BigInt(123).constructor)
// TypeError: Cannot read properties of undefined (reading 'constructor')
// console.log(undefined.constructor)
// TypeError: Cannot read properties of null (reading 'constructor')
// console.log(null.constructor)
// Array]
console.log([].constructor)
// [Function: Object]
console.log({}.constructor)
// [Function: Function]
console.log(function(){}.constructor)
// [Function: Date]
console.log(new Date().constructor)
// [Function: RegExp]
console.log(/\d/g.constructor)
// [Function: Error]
console.log(new Error().constructor)
```

`constructor`用于判断操作值是否是指定构造函数的实例，可以判断除null和undefined外的所有数据类型【null 和 undefined作为 JavaScript 运行环境创建时就存在的基本数据类型，不存在 constructor 属性】

基本数据类型为什么会有 constructor 属性呢？

**基本数据类型获取 constructor 属性的时候，JavaScript 自动将基本数据类型的值转为包装对象实例，并在使用后立刻销毁实例。**

constructor属性可以被修改，所以结果值不一定准确。

---

`Object.prototype.toString`示例如下：

```js
// '[object Number]'
console.log(Object.prototype.toString.call(123))
// '[object String]'
console.log(Object.prototype.toString.call('123'))
// '[object Boolean]'
console.log(Object.prototype.toString.call(true))
// '[object Symbol]'
console.log(Object.prototype.toString.call(Symbol(123)))
// '[object BigInt]'
console.log(Object.prototype.toString.call(BigInt(123)))
// '[object Undefined]'
console.log(Object.prototype.toString.call(undefined))
// '[object Null]'
console.log(Object.prototype.toString.call(null))
// '[object Array]'
console.log(Object.prototype.toString.call([]))
// '[object Object]'
console.log(Object.prototype.toString.call({}))
// '[object Function]'
console.log(Object.prototype.toString.call(function(){}))
// '[object Date]'
console.log(Object.prototype.toString.call(new Date()))
// '[object RegExp]'
console.log(Object.prototype.toString.call(/\d/g))
// '[object Error]'
console.log(Object.prototype.toString.call(new Error()))
```

|           | typeof | instanceof | constructor | Object.prototype.toString |
| --------- | ------ | ---------- | ----------- | ------------------------- |
| Number    | ✅      | ❌          | ✅           | ✅                         |
| String    | ✅      | ❌          | ✅           | ✅                         |
| Boolean   | ✅      | ❌          | ✅           | ✅                         |
| Symbol    | ✅      | ❌          | ✅           | ✅                         |
| BigInt    | ✅      | ❌          | ✅           | ✅                         |
| undefined | ✅      | ❌          | ❌           | ✅                         |
| null      | ❌      | ❌          | ❌           | ✅                         |
| Array     | ❌      | ✅          | ✅           | ✅                         |
| Object    | ❌      | ✅          | ✅           | ✅                         |
| Function  | ❌      | ✅          | ✅           | ✅                         |
| Date      | ❌      | ✅          | ✅           | ✅                         |
| RegExp    | ❌      | ✅          | ✅           | ✅                         |
| Error     | ❌      | ✅          | ✅           | ✅                         |



