// 截流  在规定时间内只执行一次   记录个上次执行时间，执行当前时间与上次时间间隔作比较，判断是否执行

function throttle(fn, time) {
  let lastTime = 0;
  return function () {
    let now = new Date().getTime();
    if (now - lastTime > time) {
      lastTime = now;
      fn.apply(this, [...arguments]);
    }
  };
}

// 防抖

function debounce() {}
