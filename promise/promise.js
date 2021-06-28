const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {

    this.value = undefined // 存储成功的值，在then中保留
    this.reason = undefined // 存储失败的值
    this.status = PENDING

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const reject = (value) => {
      if (this.status == PENDING) {
        this.value = value
        this.status = FULFILLED
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const resovle = (reason) => {
      if (this.status == PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    executor(reject, resovle) // promise 接受一个函数， 且函数要立即执行，函数接受两个回调函数
  }

  then(onFulfilled, onRejected) {
    if (this.status == FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status == REJECTED) {
      onRejected(this.reason)
    }

    if (this.status == PENDING) {
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })

      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

module.exports = Promise