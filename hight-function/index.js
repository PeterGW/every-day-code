// 高阶函数：1、函数传递一个函数作为参数   2、函数返回一个函数

function core(a,b,c) {
  console.log('core fn', a, b, c)
}

Function.prototype.before = function (beforeFn) {
  return (...args) => {
    console.log('before add fn')
    beforeFn()
    this(...args)
  }
}

let newFn = core.before(()=>{
  console.log('before fn')
})

newFn(1,2,3)