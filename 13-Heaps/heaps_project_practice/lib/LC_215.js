// LC 215 Kth Largest Element in an Array
// MEDIUM
// https://leetcode.com/problems/kth-largest-element-in-an-array/
// INPUTS: Array, Number
// OUTPUT: Number
// 
// Find the kth largest element in an unsorted array. Note that it is the kth 
// largest element in the sorted order, not the kth distinct element.
// You may assume k is always valid, 1 ≤ k ≤ array's length.
// 
// EXAMPLE 1:
// Input: [3,2,1,5,6,4] and k = 2
// Output: 5
// Explanation: [1, 2, 3, 4, 5, 6]    5 = 2nd largest
//
// EXAMPLE 2:
// Input: [3,2,3,1,2,4,5,5,6] and k = 4
// Output: 4
// Explanation: 342 + 465 = 807



// *****************************************************************************
// VERSION 1- MY SOLUTION, Naive brute force. Sort nums, then get kth largest
// MUTATES INPUT
// TIME COMPLEXITY: 	O(N log(N)),  N = array length
// SPACE COMPLEXITY:	O(1),         if in place sort is used that mutates input
var findKthLargestV1 = function (nums, k) {
  let sorted = nums.sort((a, b) => a - b);                                      // 1) sort nums in place. TIME: O(N log(N))
  let kthIdx = sorted.length - k;
  return sorted[kthIdx];                                                        // 2) return kth element from end of array. O(1)
};

// [1, 2, 2, 3, 3, 4, 5, 5, 6]
//  0  1  2  3  4  5  6  7  8
// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));             //=> 5
// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));    //=> 4
// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6, 7, 7, 8, 2, 3, 1, 1, 1, 10, 11, 5, 6, 2, 4, 7, 8, 5, 6], 2));    //=> 10
// [1, 1, 1, 1, 10, 11, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8]
// [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 10, 11]




// *****************************************************************************
// VERSION 2- Uses MaxHeap Data Structure
// Loop through nums and insert each num into a Heap data structure
// Then delete the first k elements from heap. First element in heap is answer
// TIME COMPLEXITY: 	O(N log(k)),  N = array length, k = kth element from end of sorted array
// SPACE COMPLEXITY:	O(k),         to store heap elements    
class MaxHeap {
  constructor() {
    this.array = [null];
  }

  getParent(idx) {
    return Math.floor(idx / 2);
  }

  getLeftChild(idx) {
    return 2 * idx;
  }

  getRightChild(idx) {
    return 2 * idx + 1;
  }

  // TIME: O(log(k))
  insert(val) {
    this.array.push(val);

    let insertedNodeIdx = this.array.length - 1;																// idx of node we just inserted
    this.siftUp(insertedNodeIdx);
  }

  siftUp(idx) {
    if (idx === 1) return;                                                      // no need to sift up, node is at the root

    let parentIdx = this.getParent(idx);

    // if node is bigger than parent, we are breaking heap definition, so we need to sift up
    if (this.array[parentIdx] < this.array[idx]) {

      // swap node with it's parent
      [this.array[parentIdx], this.array[idx]] = [this.array[idx], this.array[parentIdx]];

      // continue to sift it up recursively
      this.siftUp(parentIdx);
    }
  }


  deleteMax() {
    if (this.array.length === 2) return this.array.pop();
    if (this.array.length === 1) return null;

    let rootMax = this.array[1];

    this.array[1] = this.array.pop();

    this.siftDown(1);

    return rootMax;
  }


  siftDown(idx) {
    let ary = this.array;
    let leftChildIdx = this.getLeftChild(idx);
    let rightChildIdx = this.getRightChild(idx);
    let leftVal = ary[leftChildIdx];
    let rightVal = ary[rightChildIdx];
    if (leftVal === undefined) leftVal = -Infinity;
    if (rightVal === undefined) rightVal = -Infinity;

    if (ary[idx] > leftVal && ary[idx] > rightVal) return;

    // swap node with greater of left/right
    if (leftVal > rightVal) {
      var swapIdx = leftChildIdx;
    } else {
      var swapIdx = rightChildIdx;
    }
    [ary[idx], ary[swapIdx]] = [ary[swapIdx], ary[idx]];

    this.siftDown(swapIdx);
  }
}


var findKthLargestV2 = function (nums, k) {
  let heap = new MaxHeap();
  
  // converting an array into a heap takes O(N) time ?
  for (let i = 0; i < nums.length; i++) {                                       // O(N) ?
    let num = nums[i];
    heap.insert(num);                                                           // log(N) ?
  }

  for (let i = 1; i < k; i++) {                                                 // log(k) ?
    heap.deleteMax();
  }

  return heap.array[1];
};


console.log(findKthLargestV2([3, 2, 1, 5, 6, 4], 2));                             //=> 5
console.log(findKthLargestV2([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));                    //=> 4                
console.log(findKthLargestV2([3, 2, 3, 1, 2, 4, 5, 5, 6, 7, 7, 8, 2, 3, 1, 1, 1, 10, 11, 5, 6, 2, 4, 7, 8, 5, 6], 2));    //=> 10
// [1, 1, 1, 1, 10, 11, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8]
// [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 10, 11]
