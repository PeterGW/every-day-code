// genertator可以将函数切割成若干个部分,返回一个iterator,遇到yield会暂停 执行下一次next的时候,返回的结果赋值个上一次的变量
// 原生调用方式
// function *read() {
//   const a = yield 1;
//   const b = yield 2;
//   const c = yield 3;
// }

// let id = read()
// console.log(id.next())
// console.log(id.next())
// console.log(id.next())
// console.log(id.next())

// 可以使用babel转义一下 看下源代码是啥样的
"use strict";
let regeneratorRuntime = {
  mark(genFn) {
    return genFn
  },
  wrap(iteratorFn) {
    const context = {
      next: 0,
      done: false,
      stop() {
        context.done = true
      },
      sent: null
    }
    let it = {}  
    it.next = function(value) {
      context.sent = value  // 变量保存一个值
      let v = iteratorFn(context)
      return {  // next方法返回一个{value, done}属性
        value: v,
        done: context.done
      }
    }
    return it
  }
}

let _marked = regeneratorRuntime.mark(read)

function read() {
  var a, b, c;
  return regeneratorRuntime.wrap(function(_context) {
    while (1) { // 这个while 是用来标识这个方法不止执行一次,方法会多次执行
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;
        case 2:
          a = _context.sent;
          console.log(a);
          _context.next = 6;
          return 2;
        case 6:
          b = _context.sent;
          console.log(b);
          _context.next = 10;
          return 3;
        case 10:
          c = _context.sent;
          console.log(c);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

let it = read()
{
  let {value,done} = it.next('无意义的');
  console.log(value,done)
}
{
  let {value,done} = it.next('a');
  console.log(value,done)
}
{
  let {value,done} = it.next('b');
  console.log(value,done)
}
{
  let {value,done} = it.next('c');
  console.log(value,done)
}
{
  let {value,done} = it.next('c');
  console.log(value,done)
}

