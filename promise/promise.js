// base primise 基本功能

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(x, promise, resovle, reject) {
  
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
    let promise = new Promise((resovle, reject) => {
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise, resovle, reject)
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
}

module.exports = Promise
