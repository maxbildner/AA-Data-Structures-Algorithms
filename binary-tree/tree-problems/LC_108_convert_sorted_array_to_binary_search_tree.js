// LC 108 Convert Sorted Array to Binary Search Tree
// EASY
// https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
//
// Given an array where elements are sorted in ascending order, convert it to a 
// height balanced BST.
// For this problem, a height - balanced binary tree is defined as a binary tree 
// in which the depth of the two subtrees of every node never differ by more 
// than 1.
// 
// EXAMPLE 1:
// Given the sorted array: [-10, -3, 0, 5, 9],
// One possible answer is: [0, -3, 9, -10, null, 5], which represents the 
// following height balanced BST:
// 			 0
// 			/ \
// 		 -3  9
// 		/	  /
// 	-10	  5
//
// Definition of TreeNode:
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}



// *****************************************************************************
// VERSION 1- Recursive, Pre Order DFS (right middle num as root node), slices nums (more space complexity)
// TIME COMPLEXITY:  O(N),			N = number of nodes (length of array)
// SPACE COMPLEXITY: O(N)		    N + log(N)    N for output, log(N) for recursive stack

// (Array)                => TreeNode
// [ -10, -3, 0, 5, 9 ]   => TreeNode
var sortedArrayToBST = function (nums) {
  if (nums.length === 0) return null;                                           // base case, if nums array empty, root node is null
  let midIdx = Math.floor(nums.length / 2);                                     // 1) get middle idx of nums
  let midNum = nums[midIdx];                                                    // 2) get midNum
  let left = nums.slice(0, midIdx);                                             // 3) get left and right halves of array w/ midNum as midpoint 
  let right = nums.slice(midIdx + 1);
  let root = new TreeNode(midNum);                                              // 4) create root node w/ midNum as val
  root.left = sortedArrayToBST(left);                                           // 5) recursively update left and right subtrees of root
  root.right = sortedArrayToBST(right);
  return root;
};


// let rootResult = sortedArrayToBST([-10, -3, 0, 5, 9]);
// 			 0
// 			/ \
// 		 -3  9
// 		/	  /
// 	-10	  5
// console.log(rootResult);                                  //=> treeNode
// console.log(rootResult.val);                              //=> 0
// console.log(rootResult.left.val);                         //=> -3
// console.log(rootResult.right.val);                        //=> 9
// console.log(rootResult.left.left.val);                    //=> -10
// console.log(rootResult.right.left.val);                   //=> 5






// *****************************************************************************
// VERSION 2- Recursive, Pre Order DFS (right middle num as root node), NO SLICING (less space)
// TIME COMPLEXITY:  O(N),			N = number of nodes (length of array)
// SPACE COMPLEXITY: O(N)		    N + log(N)    N for output, log(N) for recursive stack

// (Array)                => TreeNode
// [ -10, -3, 0, 5, 9 ]   => TreeNode
//     0   1  2  3  4
var sortedArrayToBST = function (nums) {
  if (!nums) return null;                                                       // if input is null, exit

  // helper function, takes in two pointers
  // low = where you want to start "slicing" left array
  // high = where you want to end "slicing" right array
  let helper = (low, high) => {
    if (low > high) return null;                                                // base case, cant "slice" anymore

    const midIdx = Math.floor((low + high + 1) / 2);                            // grab midIdx & midNum using low/high pointers
    const midNum = nums[midIdx];

    const node = new TreeNode(midNum);                                          // create new node, and make midNum the val

    node.left = helper(low, midIdx - 1);                                        // recursively assign left and right subtree pointers of current node
    node.right = helper(midIdx + 1, high);

    return node;                                                                // return current node
  }

  return helper(0, nums.length - 1);                                            // start out with pointers on opposite ends of nums array
}


// // EXAMPLE 1:
// let rootResult = sortedArrayToBST([-10, -3, 0, 5, 9]);
// // Tree looks like:
// // 			 0
// // 			/ \
// // 		-10  5
// // 		  \	  \
// // 		  -3   9
// console.log(rootResult);                                  //=> treeNode
// console.log(rootResult.val);                              //=> 0
// console.log(rootResult.left.val);                         //=> -10
// console.log(rootResult.right.val);                        //=> 5
// console.log(rootResult.left.right.val);                   //=> -3
// console.log(rootResult.right.right.val);                  //=> 9

// EXAMPLE 2:
// let rootResult = sortedArrayToBST([-10, -3, 0, 5, 9]);
// 			 0
// 			/ \
// 		 -3  9
// 		/	  /
// 	-10	  5
// console.log(rootResult);                                  //=> treeNode
// console.log(rootResult.val);                              //=> 0
// console.log(rootResult.left.val);                         //=> -3
// console.log(rootResult.right.val);                        //=> 9
// console.log(rootResult.left.left.val);                    //=> -10
// console.log(rootResult.right.left.val);                   //=> 5




// PRACTICE:
// TIME: 
// *****************************************************************************
// TIME COMPLEXITY:  O(N),			N = number of nodes (length of array)
// SPACE COMPLEXITY: O(N)		    N + log(N)    N for output, log(N) for recursive stack

// (Array)                => TreeNode
// [ -10, -3, 0, 5, 9 ]   => TreeNode
var sortedArrayToBST = function (nums) {

};


let rootResult = sortedArrayToBST([-10, -3, 0, 5, 9]);
// 			 0
// 			/ \
// 		 -3  9
// 		/	  /
// 	-10	  5
// console.log(rootResult);                                  //=> treeNode
// console.log(rootResult.val);                              //=> 0
// console.log(rootResult.left.val);                         //=> -3
// console.log(rootResult.right.val);                        //=> 9
// console.log(rootResult.left.left.val);                    //=> -10
// console.log(rootResult.right.left.val);                   //=> 5