
let Promise = require('./promise')
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

let promise2 = new Promise((resovle, reject) => {
  resovle('ok')
}).then((data) => {
  return 100
})

promise2.then((data) => {
  console.log(data)
}, err => {
  console.log('err', err)
})