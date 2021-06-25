// 截流  在规定时间内只执行一次   记录个上次执行时间，执行当前时间与上次时间间隔作比较，判断是否执行

function throttle(fn, time) {
  let lastTime = 0, timer = null;
  return function () {
    let now = new Date().getTime();
    if (now - lastTime < time) {
      clearTimeout(timer)
      timer = setTimeout(function() {
        lastTime = now
        fn.apply(this, [...arguments]);
      }, time)
    } else {
        lastTime = now
        fn.apply(this, [...arguments]);
    }
  };
}

// 防抖

function debounce(fn, delay) {
    let timer = null,

    return function () {

        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function() {
            fn.apply(this, arguments)
        }, delay)
    }
}
