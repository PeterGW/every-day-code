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
