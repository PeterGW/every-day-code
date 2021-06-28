
let Promise = require('./promise')
let promise = new Promise((resovle, reject) => {
  throw new Error('失败')
  // setTimeout(function(){
  //   resovle('ok')
  // }, 1000)
})

promise.then(
  value => {
    console.log(value, 'success')
  },
  err => {
  console.log(err, "fail")
})

promise.then(
  value => {
    console.log(value, 'success')
  },
  err => {
  console.log(err, "fail")
})
