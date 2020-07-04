// SIMILAR TO LEETCODE LC 704 Binary Search
// *****************************************************************************
// VERSION 1- MY SOLUTION, (no need for slicing array twice (only once per call))
// TIME COMPLEXITY: 	O(log(N))		N = length of input array			log(N) = num recursive calls = num times to halve array to reach base case (array length 0)
// SPACE COMPLEXITY: 	O(N)
// - Only works on SORTED arrays!
// ([5, 10, 12, 15, 20, 30, 70], 12)  =>  true
//   0   1   2   3   4   5   6
function binarySearchV1(array, target) {
	if (array.length === 0) return false;																					// 1) Base case, exit false if array empty

	let midIdx = Math.floor(array.length / 2);																		// 2) grab middle index
	let midNum = array[midIdx];																										// 3) grab num at middle index
	let leftOrRight;

	if (midNum === target) {																											// 4) return true of midNum == target
		return true;

	} else if (midNum > target) {																									// 5) if midNum > target 
		leftOrRight = array.slice(0, midIdx);																				// 6) search LEFT half of array (excluding midNum)
		
	} else {																																			// 7) if midNum < target
		leftOrRight = array.slice(midIdx + 1);																			// 8) search RIGHT half of array (excluding midNum)
	}

	return binarySearchV1(leftOrRight, target);
}
// console.log(binarySearchV1([5, 10, 12, 15, 20, 30, 70], 12));								//=> true




// *****************************************************************************
// VERSION 2- AA SOLUTION, easier to read, but slices array twice
// - Only works on SORTED arrays!
// ([5, 10, 12, 15, 20, 30, 70], 12)  =>  true
//   0   1   2   3   4   5   6
function binarySearch(array, target) {
	if (array.length === 0) return false;																					// 1) Base case, exit false if array empty

	let midIdx = Math.floor(array.length / 2);																		// 2) grab middle index
	let midNum = array[midIdx];																										// 3) grab num at middle index
	let left = array.slice(0, midIdx);																						// 4) get left half of array (excluding midNum)
	let right = array.slice(midIdx + 1);																					// 5) get right half of array (exlcuding midNum)

	if (midNum === target) {																											// 6) return true of midNum == target
		return true;

	} else if (midNum > target) {																									// 7) if midNum > target 
		return binarySearch(left, target);																					// 8) search LEFT half of array (excluding midNum)
		
	} else {																																			// 9) if midNum < target
		return binarySearch(right, target);																					// 10) search RIGHT half of array (excluding midNum)
	}
}
// console.log(binarySearch([5, 10, 12, 15, 20, 30, 70], 12));									//=> true



// *****************************************************************************
// VERSION 1- AA SOLUTION, RECURSIVE- uses .slice/more memory
// TIME COMPLEXITY: 	O(log(N))		N = length of input array			log(N) = num recursive calls = num times to halve array to reach base case (array length 0)
// SPACE COMPLEXITY: 	O(N)				due to array.slice()
// ([5, 10, 12, 15, 20, 30, 70], 12)  =>  2
// ([5, 10, 12, 15, 20, 30, 70], 24)	=> -1
//   0   1   2   3   4   5   6
// if not found, returns -1
function binarySearchIndexV1(array, target) {
	if (array.length === 0) return -1;																						// 1) base case, not found if array empty

	let midIdx = Math.floor(array.length/2);																			// 2) grab midIdx
	let midNum = array[midIdx];																										// 3) grab midNum @ midIdx
	
	if (midNum > target) {																												// 4) if midNum > target, overshot so search left half
		let left = array.slice(0, midIdx);
		return binarySearchIndexV1(left, target);
		
	} else if (midNum < target) {																									// 5) if midNum < target, search right half
		let right = array.slice(midIdx + 1);
		
		// unique case if we reach end of array (otherwise we'll end up returning 4 instead of -1)
		let subResult = binarySearchIndexV1(right, target);													// capture recursive call in subResult
		return subResult === -1 ? -1 : subResult + midIdx + 1;											// return -1 if subresult not found, else adjust for midIdx

	} else {																																			// 6) if midNum == target, target found!
		return midIdx;
	}
}

// console.log(binarySearchIndexV1([5, 10, 12, 15, 20, 30, 70], 12));						//=> 2
// console.log(binarySearchIndexV1([5, 10, 12, 15, 20, 30, 70], 24));						//=> -1




// *****************************************************************************
// VERSION 2- LC SOLUTION, ITERATIVE- uses pointers (instead of array slicing) to track halving array
// TIME COMPLEXITY: 	O(log(N))		N = length of input array			
// SPACE COMPLEXITY: 	O(1)				
// ([5, 10, 12, 15, 20, 30, 70], 12)  =>  2
// ([5, 10, 12, 15, 20, 30, 70], 24)	=> -1																			// if not found, returns -1
//   0   1   2   3   4   5   6
function binarySearchIndex(nums, target) {
	let left = 0;                                                                 // 1) left pointer, set to first index in array
	let right = nums.length - 1;                                                  // 2) right pointer, set to last index in array

	while (left <= right) {                                                       // 3) loop while <= right. (bec the delta btwn them refers to the subarray/halving, as soon as that disappears/becomes negative, we're done)
		let midIdx = Math.floor((left + right) / 2);                                // 4) grab middle index using left/right pointers
		// let m = parseInt((l + r) / 2);																						//    works. converts num to string, then truncates non numbers after first num (ex. 2.9 => 2)
		let midNum = nums[midIdx];                                                  // 5) grab num @ middle index

		if (midNum === target) return midIdx;                                       // 6) if midNum == target, found! return midIdx

		if (midNum > target) {                                                      // 7) if midNum > target, update right pointer
			right = midIdx - 1;
		} else {                                                                    // 8) if midNum < target, update left pointer
			left = midIdx + 1;
		}
	}

	return -1;                                                                    // 9) target not found if we reach this point after loop
}

// console.log(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 12));							//=> 2
// console.log(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 24));							//=> -1



module.exports = {
	binarySearch,
	binarySearchIndex
};