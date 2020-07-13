// BINARY HEAP IMPLEMENTATION NOTES
// 1) Can use array to represent a heap
//    - each index represents a node (root = index 1 so math is easy)
//    - left child of node i can be found at index 2 * i
//    - right chold of node i can be found at index 2 * i + 1
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


// 2) 
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


  // TIME COMPLEXITY:  O(log(N)),      N = number of nodes in heap
  // SPACE COMPLEXITY: O(N),           2N -> O(N)  (2N bec recursive call stack?)
  insert(val) {
    this.array.push(val);                                                       // insert new node at bottom level (farthest to left)
    
    // takes in index position of the node we want to sift up
    this.siftUp(this.array.length - 1);                                         // sift that value up the heap to restore heap property
  }


  siftUp(idx) {
    if (idx === 1) return;                                                      // no need to sift up, node is at the root

    let parentIdx = this.getParent(idx);

    // if node is bigger than parent, we are breaking heap definition, so we need to sift up
    if (this.array[parentIdx] < this.array[idx]) {

      // swap node with it's parent
      [ this.array[parentIdx], this.array[idx] ] = [ this.array[idx], this.array[parentIdx] ];

      // continue to sift it up recursively
      this.siftUp(parentIdx);
    }
  }


  // returns deleted max value (root) in heap
  // TIME COMPLEXITY:  O(log(N)),      N = number of nodes in heap
  // SPACE COMPLEXITY: O(N),           2N -> O(N)  (2N bec recursive call stack?)
  deleteMax() {
    // recall that we have an empty position at the very front of the array, 
    // so an array length of 2 means there is only 1 item in the heap

    // if there's only 1 node in the heap, just remove it (2 bec. null doesnt count)
    if (this.array.length === 2) return this.array.pop();

    // if there're no nodes in the heap, do nothing
    if (this.array.length === 1) return null;

    // otherwise remove the last element and make it the root at the front of the array
    let max = this.array[1];                                                    // get max value in heap
    this.array[1] = this.array.pop();                                           // reasign root value in heap to last value in array (and remove last value in array)

    // sift the new root down to restore heap property
    this.siftDown(1);
    return max;
  } 


  siftDown(idx) {
    // 1: idx = 1

    let ary = this.array;
    // 1: ary [ null, 9, 32, 24, 30, 31, 20, 18, 2, 7 ]

    let leftIdx = this.getLeftChild(idx);
    let rightIdx = this.getRightChild(idx);
    // 1: leftIdx = 2      rightIdx = 3

    let leftVal = ary[leftIdx];
    let rightVal = ary[rightIdx];
    // 1: leftVal = 32     rightVal = 24

    // if the node is missing children, consider the missing children as the value -Infinity
    // this allows the node to keep heap property, since any value is greater than -Infinity
    // this will also give us children values to compare later, undefined should not be used for comparison
    if (leftVal === undefined) leftVal = -Infinity;
    if (rightVal === undefined) rightVal = -Infinity;

    // if the node (@ index idx) is bigger than both children, we have restored heap property, so exit
    if (ary[idx] > leftVal && ary[idx] > rightVal) return;  
    // 1:  9 > 32   && 1 > 24     false

    // otherwise the node is bigger than one of it's children,
    // so swap this node with the bigger between the two children
    if (leftVal < rightVal) {
      var swapIdx = rightIdx;
    } else {                                                                    // leftVal >= rightVal
      var swapIdx = leftIdx;
    }
    [ ary[idx], ary[swapIdx] ] = [ ary[swapIdx], ary[idx] ];
    // 1:  null, 32, 9, 24, 30, 31, 20, 18, 2, 7, 9 ]

    // continue to sift node down recursively
    this.siftDown(swapIdx);
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
console.log(niceHeap.array);        //=> [ null, 42, 32, 24, 30, 9, 20, 18, 2, 7 ]
niceHeap.insert(31);
console.log(niceHeap.array);        //=> [ null, 42, 32, 24, 30, 31, 20, 18, 2, 7, 9 ]
console.log(niceHeap.deleteMax());  //=> 42
console.log(niceHeap.array);        //=> [ null, 32, 31, 24, 30, 9, 20, 18, 2, 7 ]
//        32
//       /  \           
//     31     24         
//    / \     / \
//   30  9   20  18
//  / \   
// 2   7 