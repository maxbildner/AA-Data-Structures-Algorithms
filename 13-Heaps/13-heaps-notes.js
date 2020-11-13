// BINARY HEAP IMPLEMENTATION NOTES
// 1) MAX HEAP
//    - binary tree data structure (semi ordered, NOT Binary Search Tree BST)
//    - each node is greater or equal >= than its children
//    - Balanced && Complete
//
// 2) COMPLETE Tree
//    - every level node (except maybe last) are filled to the left
//    - why important? = can be represented as an array
// 
// 3) TIME COMPLEXITY #INSERT/#DELETE = O(log N)
//    SPACE COMPLEXITY                = O(N) bec array to store data
//
// 4) HEAPIFY = converting array to heap
//    TIME COMPLEXITY = N * log N => amortized O(N)
//
// 5) WHEN TO USE
//    - find min/max very quickly, while maintaining some order
//    - problems that require you to “partially sort” data. (ex. Calculate 
//      largest or smaller N numbers of a collection. 
//      Ex. Find largest 5 numbers in an array in linear time O(N) 
// 
// 6) Can use array to represent a Max Heap
//    - each index represents a node (root = index 1 so math is easy)
//    - left child of node i can be found at index = 2 * i
//    - right child of node i can be found at index = 2 * i + 1
//    - parent of node at index i can be found at Math.floor(i / 2)
//    example: [ null, 42, 32, 24, 30, 9, 20, 18, 2, 7 ]
//        idx:      0   1   2   3   4  5   6   7  8  9
// 
//        42
//       /  \           
//     32    24         for root i = 1:   24 = array[2 * i + 1]
//    / \    / \
//   30  9  20  18
//  / \
// 2   7


// *****************************************************************************
// 2) 
// Create a MaxHeap Data Structure w/ the following Attribute:
// 	array of values where indices represent nodes (indexing starting at 1 for easy math)
// Methods:
// 	#getParent(idx) 		=> idx						
// 	#getLeftChild(idx) 	=> idx
// 	#getRightChild(idx) => idx
// 	#insert(val) 				=> undefined			 O(log N) TIME,  O(N) SPACE
//  #siftUp(idx)			  => undefined   
//  #deleteMax()			  => val (int)			 O(log N) TIME,  O(N) SPACE
//  #siftDown(idx)			=> undefined			 
// 
class MaxHeap {
  constructor() {
    this.array = [ null ];                                                      // array of values
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


  // TIME COMPLEXITY:  O(log N),       N = number of nodes in heap
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
  // TIME COMPLEXITY:  O(log N),       N = number of nodes in heap
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


// Example:
let niceHeap = new MaxHeap();
niceHeap.insert(42);
niceHeap.insert(32);
niceHeap.insert(24);
niceHeap.insert(30);
niceHeap.insert(9);
niceHeap.insert(20);
niceHeap.insert(18);
niceHeap.insert(2);
niceHeap.insert(7);
//        42
//       /  \           
//     32     24         
//    / \     / \
//   30  31  20  18
//  / \  /
// 2  7  9
// console.log(niceHeap.array);        //=> [ null, 42, 32, 24, 30, 9, 20, 18, 2, 7 ]
// niceHeap.insert(31);
// console.log(niceHeap.array);        //=> [ null, 42, 32, 24, 30, 31, 20, 18, 2, 7, 9 ]
// console.log(niceHeap.deleteMax());  //=> 42
// console.log(niceHeap.array);        //=> [ null, 32, 31, 24, 30, 9, 20, 18, 2, 7 ]
//        32
//       /  \           
//     31     24         
//    / \     / \
//   30  9   20  18
//  / \   
// 2   7 



// *****************************************************************************
// 3) HEAP SORT V1 (decreasing order, O(N) space)
//    1- build the heap: insert all elements of the array into MaxHeap
//    2- construct sorted list: continue to deleteMax until heap is empty
//       every deletion will return the next element in decreasing order
//    - DOES NOT MUTATE INPUT ARRAY
// TIME COMPLEXITY:    O(N log(N)),      N = array size
//      N + N*log(N)  => N *log(N)
//      First N  comes from = step 1 (building heap)
//      N*log(N) comes from = step 2 
// SPACE COMPLEXITY: O(N), because heap is maintained separately from input array

// [ 0, 5, 1, 3, 2 ]      =>   [ 5, 3, 2, 1, 0 ]
function heapSort(array) {
  
  let heap = new MaxHeap();
  array.forEach(num => heap.insert(num));                                       // 1) build heap O(N) Amortized Time

  let sorted = [];
  while (heap.array.length > 1) {                                               // 2) continously delete max and push deleted to sorted arr until heap empty
    sorted.push(heap.deleteMax());                                              // deletion takes log(N)
  }
  
  return sorted;
}


// let arr = [ 0, 5, 1, 3, 2 ];
// console.log(heapSort(arr));     //=>  [ 5, 3, 2, 1, 0 ]





// *****************************************************************************
// 4) HEAP SORT V2- (Increasing order, O(1) space)
//    1- convert input array into maxHeap (in place), using heapify helper 
//       (similar to MaxHeap#siftDown method). This involves looping from 
//       left of array to front/right
//       2 diff btwn heapify and #siftDown:
//          - root idx at 0 not one (no null placeholder)
//          - input arg, n determines out of bounds of array, not array length
//            this is needed for part 2 below
//    2- loop from end of maxHeap to begin, 
//       continually swap root val w/ end of heap, and call heapify helper
//       dont forget to define n as end of heap when calling heapify helper
//    - see heap-sort-diagram.png for visualization of step 2
//    - DOES MUTATE INPUT ARRAY
//    
// TIME COMPLEXITY:   O(N log(N)),      N = array size
//      N + N*log(N)  => N*log(N)
//      First N  comes from = step 1 (building heap)
//      N*log(N) comes from = step 2 
// SPACE COMPLEXITY: O(1)   (unless you count recursive stack?)

// HELPER FUNCTION similar logic to MaxHeap#SiftDown
// n = number of nodes in heap, denotes where heap ends, and sorted region begins
// ([ 0, 5, 1, 3, 2 ])  =>  [ 5, 3, 1, 0, 2 ]
function heapify(array, n, i) {
  let leftIdx = 2 * i + 1;                                                      // 1) grab left/right indices/values of current val/node
  let rightIdx = 2 * i + 2;                                                     //    root index is now 0 instead of 1 (no null placeholder)
  let leftVal = array[leftIdx];
  let rightVal = array[rightIdx];

  if (leftIdx >= n) leftVal = -Infinity;                                        // 2) set left/right val to -infinity if we're out of array bounds (determined by n)
  if (rightIdx >= n) rightVal = -Infinity;

  if (array[i] > leftVal && array[i] > rightVal) return;                        // 3) exit if current val > both children

  let swapIdx;
  if (leftVal < rightVal) {                                                     // 4) determine index to swap current value with
    swapIdx = rightIdx;
  } else {
    swapIdx = leftIdx;
  }

  [array[i], array[swapIdx]] = [array[swapIdx], array[i]];                      // 5) swap current val w/ larger of two children

  heapify(array, n, swapIdx);                                                   // 6) recursively siftDown/heapify until maxHeap property met
}


//   0  1  2  3  4
// [ 0, 5, 1, 3, 2 ]      =>    [ 0, 1, 2, 3, 5 ]
function heapSortV2(array) {

  for (let i = array.length - 1; i >= 0; i--) {                                 // 1) loop through array, and convert it to maxHeap using heapify helper
    heapify(array, array.length, i);                                            //    array length not really used for this part
  }

  for (let endOfHeap = array.length - 1; endOfHeap >= 0; endOfHeap--) {         // 2) loop from end of maxHeap to begin/left, and "delete" max val until heap region is "empty"
    [array[endOfHeap], array[0]] = [array[0], array[endOfHeap]];                // 3) swap the root of the heap with the last element of the heap, this shrinks the heap by 1 and grows the sorted array by 1

    console.log(array);

    heapify(array, endOfHeap, 0);                                               // 4) sift down the new root, but not past the end of the heap
  }

  return array;
}


let arr = [ 0, 5, 1, 3, 2 ];
// console.log(heapSortV2(arr));     //=>  [ 0, 1, 2, 3, 5 ]
