
let Promise = require('./promise')
let fs = require('fs').promises
// let promise = new Promise((resovle, reject) => {
//   throw new Error('失败')
//   // setTimeout(function(){
//   //   resovle('ok')
//   // }, 1000)
// })

// promise.then(
//   value => {
//     console.log(value, 'success')
//   },
//   err => {
//   console.log(err, "fail")
// })

// promise.then(
//   value => {
//     console.log(value, 'success')
//   },
//   err => {
//   console.log(err, "fail")
// })

// ---
// let promise2 = new Promise((resovle, reject) => {
//   resovle('ok')
// }).then((data) => {
//   return 100
// })

// promise2.then((data) => {
//   console.log(data)
// }, err => {
//   console.log('err', err)
// })

// --
// Promise.all 表示全部成功才成功， 如果一个失败了 则失败
Promise.all([13, 5, 11]).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err)
})
console.log(Promise.resolve())
Promise.resolve('ok').finally(() => {
    console.log('成功失败都会调用')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('xxx')
        }, 1000)
    })
}).then((data) => {
    console.log('success', data)
}).catch(err => {
    console.log('fail', err)
})

//
Promise.resolve().then(() => {
    console.log(0)
    return Promise.resolve(4)
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
}).then(() => {
    console.log(6)
})