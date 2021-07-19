// 截流  在规定时间内只执行一次   记录个上次执行时间，执行当前时间与上次时间间隔作比较，判断是否执行
function throttle(fn, time) {
  let lastTime = 0,
    timer = null;
  return function () {
    let now = new Date().now();
    const args = arguments
    if (now - lastTime < time) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        lastTime = now
        fn.apply(this, args);
      }, time)
    } else {
      lastTime = now
      fn.apply(this, args);
    }
  };
}

// 防抖   在一定时间内   只执行最后一次 
function debounce(fn, delay) {
  let timer = null,
  return function () {
    const args = arguments
    // 这里默认给一个null 为了第一次进来默认执行一次
    let now = !timer
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      // 一直触发，保证最后一次timer设置为null，触发fn执行
      timer = null
    }, delay)
    if (now) {
      fn.apply(this, args)
    }
  }
}

function debounce2(fn, await) {
  let timer = null;
  return function() {
    if (timer) clearTimeout(timer)
    let _this = this;
    let args = arguments;
    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, wait)
  }
}
// --------
function Dog(name) {
  this.name = name
  this.say = function () {
      console.log('name = ' + this.name)
  }
}

function _new() {
  let obj = {};
  const args = arguments;
  const fn = Array.prototype.shift.call(args);
  obj._proto_ = fn.prototype;
  let res = fn.apply(obj, args)
  return res instanceof Object ? res : obj
}

const dog = _new(Dog, 'aa')
dog.say()


function myNew() {
  const constr = Array.prototype.shift.call(arguments)
  let obj = Object.create(constr.prototype)
  const res = constr.apply(obj, arguments)
  return res instanceof Object ? res : obj
}

const dog2 = myNew(Dog, 'aa')
dog2.say()

// -------
console.log(1)

async function async() {
  console.log(2)
  await console.log(3)
  console.log(4)
}

setTimeout(() => {
  console.log(5)
}, 0)

const promise = new Promise((resolve, reject) => {
  console.log(6)
  resolve(7)
})

promise.then(res => {
  console.log(res)
})

async()

console.log(8)
// 1 6 2 3 8
// 宏任务[5]  微任务[7, 4]