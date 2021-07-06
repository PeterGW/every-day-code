// base primise 基本功能

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(x, promise, resovle, reject) {
  
  // 如果x是promise的话，状态一直不能改变，所以抛错循环引用
  if (x == promise) {
    throw new TypeError('循环引用') 
  }

  // 判断x是不是一个promise promise需要有then方法 （有可能是一个函数）
  if((typeof x === 'object' && x !== null) || (typeof x === 'function')) {
    // 判断x是否有then, 如果有then执行一个成功函数一个失败函数  直接用x.then的话可能还会去调一次属性 可能抛错
    let called = false // 标识，如果状态已经发生改变，则不让继续执行一次
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, (y)  => { // 成功有可能继续返回一个promise，继续判断逻辑
          // resolve(y) 这里执行成功，y有可能还是一个promise
          if(called) return
          called = true
          resolvePromise(y,promise,resovle,reject)
        }, (r) => {
          if(called) return
          called = true
          reject(r)
        })
      } else { // 不是函数 直接返回
        resovle(x)
      }
    } catch (e) {
      if(called) return
      called = true
      reject(e)
    }
  } else {
    // x 是一个普通值，普通值直接执行resolve
    resovle(x)
  }
}


class Promise {
  constructor(executor) {

    this.value = undefined // 存储成功的值，在then中保留
    this.reason = undefined // 存储失败的值
    this.status = PENDING

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resovle = (value) => {
      if (this.status == PENDING) {
        this.value = value
        this.status = FULFILLED
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.status == PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resovle, reject) // promise 接受一个函数， 且函数要立即执行，函数接受两个回调函数
    } catch (err) {
      reject(err)
    }
  }
  
  // 链式调用
  // 1、then方法中，成功的回调或者失败的回调返回的是一个promise，那么会采用返回的promise的状态，走外层下一次then中的成功或者失败，同时将promise处理结果向下传递
  // 2、then方法中 成功的回调或者失败的回调返回的是一个普通值（不是promise）讲会返回的结果传递到下一次then的成功中去
  // 3、如果在then方法的成功或者失败的回调 执行时出错会走到下一次then中的失败中去
  // 如果返回的是一个失败的promise或者报错，才会走下一个then的是失败，否则全部走成功
  then(onFulfilled, onRejected) {
    // 如果不传参数 给一个默认值
    onFulfilled = typeof onFulfilled === 'function' ?  onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => {throw e}
    let promise = new Promise((resovle, reject) => {
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)  // x为此次promise的返回值，需要传递到下一次的promise的then中的resolve或者reject里面
            // 这里promise不一定能拿的到 所以把它放入下一次执行栈 添加一个setTimeout 或者 setInterval等
            resolvePromise(x, promise, resovle, reject)   // x有可能是一个promise 一个普通值
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
  
      if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise, resovle, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
  
      if (this.status == PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(x, promise, resovle, reject)
            } catch(e) {
              reject(e)
            }
          }, 0)
        })
  
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try{
              let x = onRejected(this.reason)
              resolvePromise(x, promise, resovle, reject)
            } catch(e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise
  }

  catch(errFn) {
    return this.then(null, errFn)
  }

  static resolve(val) {
    return new Promise(resolve, reject => {
      resolve(val)
    })
  }

  static reject(err) {
    return new Promise(resolve, reject => {
      reject(err)
    })
  }
}

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let index = 0
    let result = []
    function process(p, k) {
      result[k] = p
      if (++index == promises.length) {
        resolve(result)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      let p = promises[i]
      if (p && typeof p.then === 'function') {
        p.then(data => {
          process(data, i)
        }, reject)
      } else {
        process(p, i)
      }
    }
  })
}

Promise.prototype.finally = function(cb) {
  return this.then((y) => {
    return Promise.resolve(cb()).then((d) => y)
  }, (r) => {
    return Promise.resolve(cb()).then( () => {throw r})
  })
}

// 静态方法
Promise.deferred = function(){
  let dfd = {};
  dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
  })
  return dfd
}

module.exports = Promise
