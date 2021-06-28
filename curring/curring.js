// function test(a,b) {}

// console.log(test.length)

// fn(1)(2)(3)(4)

function sum(a,b,c,d) {
  return a + b + c + d
}
// fn.length 是当前函数的参数个数 function.length
function curring(fn) {
  // 创建一个空数据 用来保存参数
  let args = []
  // 给一个内部函数
  const innerFn = (arr = []) => {
    // 参数保存到数组里面
    args.push(...arr)
    // 如果当前传入的参数比函数形参多，则返回原函数，否则返回新函数
    return args.length >= fn.length ? fn(...args) : (...args) => innerFn(args)
  }
  return innerFn()
}

let fn = curring(sum)

console.log(fn(1)(2,3)(4))


function curring2(fn) {
  let _arr = []
  return function() {
    let newArr = _arr.push(...arguments)
    fn.apply(this, newArr)
  }
}
let fn2 = curring(sum)

console.log(fn2(4)(2,3)(4))