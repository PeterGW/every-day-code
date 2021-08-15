Function.prototype.myBind = function() {
    var thatFunc = this, 
        thatArg = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1)
    if (typeof thatFunc !== 'function') {
        throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    var fBound  = function() {
        return thatFunc.apply(this instanceof fBound
                 ? this
                 : thatArg,
                 args.concat(Array.prototype.slice.call(arguments)));
        };
    var fNOP = function() {};
    if (thatFunc.prototype) {
      fNOP.prototype = thatFunc.prototype; 
    }
    fBound.prototype = new fNOP();
    return fBound;
}

Function.prototype.myBind2 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}

Function.prototype.myCall = function (context) {
  var context = context || window
  // 给 context 添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1)
  // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
  var result = context.fn(...args)
  // 删除 fn
  delete context.fn
  return result
}

Function.prototype.myApply = function (context) {
  var context = context || window
  context.fn = this

  var result
  // 需要判断是否存储第二个参数
  // 如果存在，就将第二个参数展开
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}
