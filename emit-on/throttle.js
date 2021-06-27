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