// 冒泡
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1]
        arr[j+1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr;
}

function bubbleSort3(arr) {
  var low = 0;
  var hight = arr.length - 1;
  var temp, j;
  while(low < hight) {
    for (j = 0; j < hight; ++j) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1]
        arr[j + 1] = temp;
      }
      --hight;
    }

    for (j = hight; j > low; --j) {
      if (arr[j] < arr[j - 1]) {
        temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      }
      ++low;
    }
  }
  return arr
}

// 归并排序
function mergeSort(arr) {
  var len = arr.length;
  if (len < 2) {
    return arr
  }
  var middle = Math.floor(len / 2),
  left = arr.slice(0, middle),
  right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  var result = []; 
  console.time('归并排序耗时'); 
  while (left.length && right.length) { 
    if (left[0] <= right[0]) { 
      result.push(left.shift()); 
    } else { 
      result.push(right.shift()); 
    } 
  }
  while (left.length) {
    result.push(left.shift());
  } 
  while (right.length) {
    result.push(right.shift())
  }; 
  console.timeEnd('归并排序耗时'); return result;
}


async function async1() { 
  console.log('async1 start') 
  await async2() 
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function() {
  console.log('setTimeout')
}, 0) 
async1()
new Promise(function(resolve){ 
  console.log('promise1') 
  resolve()
}).then(function() {
  console.log('promise2')
})
console.log('script end')