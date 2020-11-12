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


// TIME: 
// *****************************************************************************
// VERSION 1- MY SOLUTION, Naive brute force. 
// MUTATES INPUT
// TIME COMPLEXITY: 	O(N log(N)),  N = array length
// SPACE COMPLEXITY:	O(1),         if in place sort is used that mutates input
var findKthLargestV1 = function (nums, k) {
  
};

// [1, 2, 2, 3, 3, 4, 5, 5, 6]
//  0  1  2  3  4  5  6  7  8
// console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));             //=> 5
// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));    //=> 4
// console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6, 7, 7, 8, 2, 3, 1, 1, 1, 10, 11, 5, 6, 2, 4, 7, 8, 5, 6], 2));    //=> 10
// [1, 1, 1, 1, 10, 11, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8]
// [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 10, 11]



// TIME: 
// *****************************************************************************
// VERSION 2- Uses MaxHeap Data Structure
// 
// 
// Does NOT mutate input array
// TIME COMPLEXITY: 	O(N log(k)),  N = array length, k = kth element from end of sorted array
// SPACE COMPLEXITY:	O(k),         to store heap elements    
class MaxHeap {
  constructor() {
    this.array = [null];                                                        // array of values
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


  // TIME COMPLEXITY:  O(log(N)),      N = number of nodes in heap
  // SPACE COMPLEXITY: O(N),           2N -> O(N)  (2N bec recursive call stack?)
  insert(val) {
    this.array.push(val);																												// push value to end of array (add node to farthest bottom left of tree)

    this.siftUp(this.array.length - 1);																					// continuously swap value toward front of array to maintain maxHeap property
  }


  // helper- No return value (undefined)
  siftUp(idx) {
    if (idx === 1) return;																											// no need to siftUp if node is at root

    let parentIdx = this.getParent(idx);																				// grab parent node idx

    if (this.array[idx] > this.array[parentIdx]) {															// if node is bigger than parent, we're breaking heap proprty, so siftUp

      [this.array[idx], this.array[parentIdx]] = 																// swap node w/ parent
        [this.array[parentIdx], this.array[idx]];

      this.siftUp(parentIdx);																										// recursively siftUp node
    }
  }


  // returns deleted max value (root) in heap
  // TIME COMPLEXITY:  O(log(N)),      N = number of nodes in heap
  // SPACE COMPLEXITY: O(N),           2N -> O(N)  (2N bec recursive call stack?)
  deleteMax() {
    // recall that we have an empty position at the very front of the array, 
    // so an array length of 2 means there is only 1 item in the heap

    if (this.array.length === 1) return null;																		// edge case- if no nodes in tree, exit

    if (this.array.length === 2) return this.array.pop();												// edge case- if only 1 node in heap, just remove it (2 bec. null doesnt count)

    let max = this.array[1];																										// save reference to root value (max)

    let last = this.array.pop();																								// remove last val in array (farthest right node in tree), and update root value with it
    this.array[1] = last;

    this.siftDown(1);																														// continuoully swap the new root toward the back of the array to maintain maxHeap property

    return max;																																	// return max value
  }


  // helper- no return value
  siftDown(idx) {
    let ary = this.array;																												// optional- reference to this.array w/ shorter variable name

    let leftIdx = this.getLeftChild(idx);																				// optional- grab left and right child indexes/values (easier to work w/ variable names)
    let rightIdx = this.getRightChild(idx);
    let leftVal = ary[leftIdx] || -Infinity;																		// short circuit if node missing child/undefined, use -Infinity (any val is > -Inifinity)
    let rightVal = ary[rightIdx] || -Infinity;

    if (ary[idx] > leftVal && ary[idx] > rightVal) return;											// if node is bigger than both children, we have restored heap property, so exit

    if (leftVal < rightVal) {																										// node bigger than one of it's children, so swap this node with the larger of the two children
      var swapIdx = rightIdx;

    } else {
      var swapIdx = leftIdx;
    }
    [ary[idx], ary[swapIdx]] = [ary[swapIdx], ary[idx]];

    this.siftDown(swapIdx);																											// continue to sift node down recursively
  }
}


// TIME: 10M
var findKthLargestV2 = function (nums, k) {

};


console.log(findKthLargestV2([3, 2, 1, 5, 6, 4], 2));                             //=> 5
console.log(findKthLargestV2([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));                    //=> 4                
console.log(findKthLargestV2([3, 2, 3, 1, 2, 4, 5, 5, 6, 7, 7, 8, 2, 3, 1, 1, 1, 10, 11, 5, 6, 2, 4, 7, 8, 5, 6], 2));    //=> 10
// [1, 1, 1, 1, 10, 11, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8]
// [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 10, 11]
