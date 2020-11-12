const { MaxHeap } = require('./max_heap');

// TIME: 
// *****************************************************************************
// 3) HEAP SORT V1- (decreasing order, O(N) space)
//    1- 
//    2- 
// 
// DOES NOT MUTATE INPUT ARRAY
// TIME COMPLEXITY:    O(N log(N)),      N = array size
//      N + N * log(N)  => N *log(N)
//      First N  comes from = step 1 
//      N * log(N) comes from = step 2 
// SPACE COMPLEXITY: O(N), bec. heap is maintained separately from input array

// [ 0, 5, 1, 3, 2 ]      =>   [ 5, 3, 2, 1, 0 ]
function heapSortV1(array) {
  
  let maxHeap = new MaxHeap();                                                  // build heap using array
  array.forEach(num => maxHeap.insert(num));

  let sorted = [];
  
  while (maxHeap.array.length > 1) {                                            // continually deleteMax num in heap until heap is empty, and push each num into external array
    sorted.push(maxHeap.deleteMax());
  }

  return sorted;
}


// let arr = [ 0, 5, 1, 3, 2 ];
// console.log(heapSortV1(arr));     //=>  [ 5, 3, 2, 1, 0 ]






// TIME: 
// *****************************************************************************
// 4) HEAP SORT V2- (increasing order, O(1) space)
//    1- 
//    Uses similar logic to MaxHeap#siftDown
//    DOES NOT MUTATE INPUT ARRAY
// TIME COMPLEXITY:   O(N log(N)),      N = array size
//      N + N*log(N)  => N*log(N)
//      First N  comes from = step 1 (building heap)
//      N*log(N) comes from = step 2 
// SPACE COMPLEXITY: O(1)   (unless you count recursive stack?)

// HELPER FUNCTION similar logic to MaxHeap#SiftDown
// n = number of nodes in heap
function heapify(array, n, i) {
  // 1:   [0, 5, 1, 3, 2], 5, 4
  // 2:   [0, 5, 1, 3, 2], 5, 3
  // 3:   [0, 5, 1, 3, 2], 5, 2
  // 4:   [0, 5, 1, 3, 2], 5, 1
  // 5:   [0, 5, 1, 3, 2], 5, 0

  // 6:   [5, 0, 1, 3, 2], 5, 1
  // console.log(array, n, i);

  let leftIdx = 2 * i + 1;                                                      // root index is now 0 instead of 1 (no null placeholder)
  let rightIdx = 2 * i + 2;
  let leftVal = array[leftIdx];
  let rightVal = array[rightIdx];
  // 1:   leftIdx = 2 * 4 + 1 = 9   rightIdx = 2 * 4 + 2 = 10   leftVal = undefined   rightVal = undefined
  // 2:   leftIdx = 2 * 3 + 1 = 7   rightIdx = 2 * 3 + 2 = 8    leftVal = undefined   rightVal = undefined
  // 3:   leftIdx = 2 * 2 + 1 = 5   rightIdx = 2 * 2 + 2 = 6    leftVal = undefined   rightVal = undefined
  // 4:   leftIdx = 2 * 1 + 1 = 3   rightIdx = 2 * 1 + 2 = 4    leftVal = 3           rightVal = 2
  // 5:   leftIdx = 2 * 0 + 1 = 1   rightIdx = 2 * 0 + 2 = 2    leftVal = 5           rightVal = 1
  
  if (leftIdx >= n) leftVal = -Infinity;
  if (rightIdx >= n) rightVal = -Infinity;
  // 1:   n = 5   leftVal = -Inf    rightVal = -Inf
  // 2:   n = 5   leftVal = -Inf    rightVal = -Inf
  // 3:   n = 5   leftVal = -Inf    rightVal = -Inf
  // 4:   n = 5   leftVal = 3       rightVal = 2
  // 5:   n = 5   leftVal = 5       rightVal = 1

  // console.log(array, n, i, leftIdx, rightIdx, leftVal, rightVal);

  if (array[i] > leftVal && array[i] > rightVal) return;
  // 1:   array[4] = 2    true
  // 2:   array[3] = 3    true
  // 3:   array[2] = 1    true
  // 4:   array[1] = 5 > 3   &&  5 > 2    true
  // 5:   array[0] = 0 > 5   &&  0 > 2    false

  let swapIdx;
  if (leftVal < rightVal) {
    swapIdx = rightIdx;
  } else {
    swapIdx = leftIdx;
  }

  [ array[i], array[swapIdx] ] = [ array[swapIdx], array[i] ];                  // swap values
  // 5: i = 0, swapIdx = leftIdx = 1, array = [ 0, 5, 1, 3, 2 ]   =>   [ 5, 0, 1, 3, 2 ]

  heapify(array, n, swapIdx);
  // 5: [5, 0, 1, 3, 2], 5, 1
}


//   0  1  2  3  4
// [ 0, 5, 1, 3, 2 ]      =>    [ 0, 1, 2, 3, 5 ]
function heapSortV2(array) {

  for (let i = array.length - 1; i >= 0; i--) {                                 // 1) heapify the tree from the bottom up (right to left)
    heapify(array, array.length, i);
    // i = 4:   [0, 5, 1, 3, 2], 5, 4   
    // i = 3:   [0, 5, 1, 3, 2], 5, 3
    // i = 2:   [0, 5, 1, 3, 2], 5, 2
    // i = 1:   [0, 5, 1, 3, 2], 5, 1
    // i = 0:   [0, 5, 1, 3, 2], 5, 0
  }
  // console.log(array);        //=> [ 5, 3, 1, 0, 2 ]
  // entire array is now a heap

  for (let endOfHeap = array.length - 1; endOfHeap >= 0; endOfHeap--) {         // 2) loop until the heap is empty, continue to "delete max"
    [array[endOfHeap], array[0]] = [array[0], array[endOfHeap]];                // 3) swap the root of the heap with the last element of the heap, this shrinks the heap by 1 and grows the sorted array by 1
    
    console.log(array);

    heapify(array, endOfHeap, 0);                                               // 4) sift down the new root, but not past the end of the heap
  }

  return array;
}


let arr = [ 0, 5, 1, 3, 2 ];
console.log(heapSortV2(arr));          //=>  [ 0, 1, 2, 3, 5 ]
// let arr2 = [-3, 0, 5, 1, 3, -2];
// console.log(heapSortV2(arr2));      //=>  [ -3, -2, 0, 1, 3, 5 ]