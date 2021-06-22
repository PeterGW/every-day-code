/** 
 * 珂珂喜欢吃香蕉。这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 H 小时后回来。
 * 珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 K 根。
 * 如果这堆香蕉少于 K 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。
 * 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
 * 返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）。
**/

// 最小速度K  最大的速度为当前pile最大值值

function minSpeed(piles, H) {

  let maxVal = 1 // 当前堆里面的最大数理解为最大速度

  for (let pile of piles) {
    maxVal = Math.max(pile, maxVal)
  }

  let lowSpeed = 0

  let highSpeed = maxVal

  while(lowSpeed < highSpeed) {
    let midSpeed = Math.floor((lowSpeed + highSpeed) / 2 )
    if (getTime(piles, midSpeed) > H) {
      lowSpeed = midSpeed + 1
    } else {
      highSpeed = midSpeed
    }
  }

  return lowSpeed
}


function getTime(piles, speed) {
  let time = 0

  for (let pile of piles) {
    time += Math.ceil(pile / speed)
  }

  return time
}

console.log(minSpeed([3,6,7,11], 8))

console.log(minSpeed([30,11,23,4,20], 5))

console.log(minSpeed([30,11,23,4,20], 6))