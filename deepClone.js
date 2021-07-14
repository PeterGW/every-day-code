function deepClone(obj) {
  var newObj = obj instanceof Array ? [] : {};
  for (let item in obj) {
    newObj[item] = typeof obj[item] === 'object' ? deepClone(obj[item]) : obj[item]
  }
  return newObj
}
