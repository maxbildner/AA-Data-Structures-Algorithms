// ALGO EXPERT Monotonic Array
// MEDIUM
// https://www.algoexpert.io/questions/Monotonic%20Array
//
// Write a function that takes in an array of integers and returns a boolean
// representing whether the array is monotonic.
// 
// An array is said to be monotonic if its elements, from left to right, are
// entirely non - increasing or entirely non - decreasing.
// 
// Non - increasing elements aren't necessarily exclusively decreasing; they simply
// don't increase. Similarly, non-decreasing elements aren't necessarily
// exclusively increasing; they simply don't decrease.
// 
// Note that empty arrays and arrays of one element are monotonic.
// 
// INPUTS: array
// OUTPUT: boolean
// 
// EXAMPLE 1:
// [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]   => true
//
// EXAMPLE 2:
// [ 1 ] => true
// 
// EXAMPLE 3:
// [ ]   => true



// TIME: 40M  (11/20/20)
// *****************************************************************************
// VERSION 1- no helper- 1 Loop
// TIME COMPLEXITY:  O(N),   N = length of array
// SPACE COMPLEXITY: O(1) 


// [5, 3, 1]    => true
function isMonotonicV1(array) {
  // return true if length <= 2
  if (array.length <= 2) return true;

  let isIncreasing = null;
  let isDecreasing = null;

  // loop through array to second to last num
  for (let i = 0; i < array.length - 1; i++) {
    let curr = array[i];
    let next = array[i + 1];
    // i = 0:  curr = 5   next = 3

    // find whether array is increasing or decreasing
    if (curr === next) continue;

    if (curr < next && isIncreasing === null) {
      isIncreasing = true;
      isDecreasing = false;
    }

    if (curr > next && isDecreasing === null) {
      isIncreasing = false;
      isDecreasing = true;
    }

    // now determine if direction changes
    if (curr > next && isIncreasing) {
      return false;

    } else if (curr < next && isDecreasing) {
      return false;
    }
  }

  return true;
}


// console.log(isMonotonicV1([-1, -5, -10, -1100, -1100, -1101, -1102, -9001]));   //=> true
// console.log(isMonotonicV1([1]));                                                //=> true
// console.log(isMonotonicV1([]));                                                 //=> true
// console.log(isMonotonicV1([5, 3, 1]));                                          //=> true
// console.log(isMonotonicV1([5, 3, -1]));                                         //=> true
// console.log(isMonotonicV1([-1, 3, 3]));                                         //=> true
// console.log(isMonotonicV1([3, 3, 3]));                                          //=> true
// console.log(isMonotonicV1([2, 2, 3]));                                          //=> true
// console.log(isMonotonicV1([1, 3, 2]));                                          //=> false
// console.log(isMonotonicV1([-1, 3, -2]));                                        //=> false




// *****************************************************************************
// VERSION 2- helper func, 2 loops (time N + N = 2N = N)
// TIME COMPLEXITY:  O(N),   N = length of array
// SPACE COMPLEXITY: O(1) 


// [5, 3, 1]    => true
function isMonotonicV2(array) {
  // return true if length <= 2
  if (array.length <= 2) return true;

  function sameDirection(arr, increasing) {
    for (let i = 0; i < arr.length - 1; i++) {
      let curr = arr[i];
      let next = arr[i + 1];
      if (increasing && curr > next) return false;
      if (!increasing && curr < next) return false;
    }
    return true;
  }

  return sameDirection(array, true) ||
         sameDirection(array, false);
}


console.log(isMonotonicV2([-1, -5, -10, -1100, -1100, -1101, -1102, -9001]));     //=> true
console.log(isMonotonicV2([1]));                                                  //=> true
console.log(isMonotonicV2([]));                                                   //=> true
console.log(isMonotonicV2([5, 3, 1]));                                            //=> true
console.log(isMonotonicV2([5, 3, -1]));                                           //=> true
console.log(isMonotonicV2([-1, 3, 3]));                                           //=> true
console.log(isMonotonicV2([3, 3, 3]));                                            //=> true
console.log(isMonotonicV2([2, 2, 3]));                                            //=> true
console.log(isMonotonicV2([1, 3, 2]));                                            //=> false
console.log(isMonotonicV2([-1, 3, -2]));                                          //=> false
