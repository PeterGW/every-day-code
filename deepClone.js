function deepClone(obj) {
  var newObj = obj instanceof Array ? [] : {};
  for (let item in obj) {
    newObj[item] = typeof obj[item] === 'object' ? deepClone(obj[item]) : obj[item]
  }
  return newObj
}


// 对于包装类 String、Number、正则等 使用自身的valueOf()方法进行克隆
