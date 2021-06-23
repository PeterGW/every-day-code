const fs = require()
// 发布
let envent = {
  _arr: [],

  data: {},

  on(fn) {
    this._arr.push(fn)
  },

  emit(key, value) {
    this.data[key] = value;
    this._arr.forEach(fn => fn(this.data))
  }
}

envent.on((data) => {
  console.log('接受到一个数据', data)
})

envent.on((data) => {
  if (Reflect.ownKeys(data).length == 2) {
    console.log('接受到全部数据', data)
  }
})

envent.emit('name', 'Mrgao')

envent.emit('age', 30)