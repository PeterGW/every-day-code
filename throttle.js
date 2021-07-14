function throttle(fn, time) {
  let lastTime = 0, timer = null;
  return function() {
    const _that = this;
    let now = new Date().getTime();
    if (now - lastTime < time) {
      clearTimeout(timer)
      timer = setTimeout(function(){
        lastTime = now;
        fn.apply(_that, [...arguments])
      }, time)
    } else {
      lastTime = now
      fn.apply(_that, [...arguments]);
    }
  }
}


