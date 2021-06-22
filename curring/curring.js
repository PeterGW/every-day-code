// function test(a,b) {}

// console.log(test.length)

// fn(1)(2)(3)(4)

function sum(a,b,c,d) {
  return a + b + c + d
}

function curring(fn) {
  let args = []
  const innerFn = (arr = []) => {
    args.push(...arr)
    return args.length >= fn.length ? fn(...args) : (...args) => innerFn(args)
  }
  return innerFn()
}

let fn = curring(sum)

console.log(fn(1)(2,3)(4))