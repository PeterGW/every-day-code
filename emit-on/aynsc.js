const fs = require('fs')

function after(times, callback) {
  let data = {}
  return function(key, value) {
    data[key] = value
    if (Reflect.ownKeys(data).length === times) {
      callback(data)
    }
  }
}

let finish = after(2, (school) => {
  console.log(school)
})

fs.readFile('./emit-on/name.txt', 'utf8', function(err, data){
  finish('name', data)
})

fs.readFile('./emit-on/age.txt', 'utf8', function(err, data){
  finish('age', data)
})