// genertator可以将函数切割成若干个部分,返回一个iterator,遇到yield会暂停 执行下一次next的时候,返回的结果赋值个上一次的变量

function *read() {
  const a = yield 1;
  const b = yield 2;
  const c = yield 3;
}

let id = read()
console.log(id.next())
console.log(id.next())
console.log(id.next())
console.log(id.next())

