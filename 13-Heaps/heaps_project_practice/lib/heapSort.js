const { MaxHeap } = require('./max_heap');

// TIME: 
// *****************************************************************************
// 3) HEAP SORT V1- (Decreasing order, O(N) space)
//    1- 
//    2- 
//    - DOES NOT MUTATE INPUT ARRAY
// 
// TIME COMPLEXITY:    O(N log(N)),      N = array size
//      N + N * log(N)  => N *log(N)
//      First N  comes from = step 1 
//      N * log(N) comes from = step 2 
// SPACE COMPLEXITY: O(N), bec. heap is maintained separately from input array

// [ 0, 5, 1, 3, 2 ]      =>   [ 5, 3, 2, 1, 0 ]
function heapSortV1(array) {
  
}


// let arr = [ 0, 5, 1, 3, 2 ];
// console.log(heapSortV1(arr));     //=>  [ 5, 3, 2, 1, 0 ]






// TIME: 
// *****************************************************************************
// 4) HEAP SORT V2- (Increasing order, O(1) space)
//    1-  
//    2-
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
  
}


//   0  1  2  3  4
// [ 0, 5, 1, 3, 2 ]      =>    [ 0, 1, 2, 3, 5 ]
function heapSortV2(array) {

}


let arr = [ 0, 5, 1, 3, 2 ];
console.log(heapSortV2(arr));          //=>  [ 0, 1, 2, 3, 5 ]
// let arr2 = [-3, 0, 5, 1, 3, -2];
// console.log(heapSortV2(arr2));      //=>  [ -3, -2, 0, 1, 3, 5 ]