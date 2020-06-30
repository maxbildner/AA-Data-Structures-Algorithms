// TIME COMPLEXITY: 	O(log(N))		N = length of input array			log(N) = num recursive calls = num times to halve array to reach base case (array length 0)
// SPACE COMPLEXITY: 	O(N)
// MY SOLUTION V1- (no need for slicing array twice (only once per call))
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
// console.log(binarySearchV1([5, 10, 12, 15, 20, 30, 70], 12));											//=> true





// AA SOLUTION V2- easier to read, but slices array twice
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




// ([5, 10, 12, 15, 20, 30, 70], 12)  =>  2
// ([5, 10, 12, 15, 20, 30, 70], 24)	=> -1
//   0   1   2   3   4   5   6
// if not found, returns -1
function binarySearchIndex(array, target) {
	if (array.length === 0) return -1;																						// 1) base case, exit if array empty	

	let midIdx = Math.floor(array.length/2);
	let midNum = array[midIdx];
	let left = array.slice(0, midIdx);
	let right = array.slice(midIdx + 1);

	if (midNum > target) {																												// if midNum > target, search left half
		return binarySearchIndex(left, target);
		
	} else if (midNum < target) {																									// if midNum < target, search right half

		// unique case if we reach end of array (otherwise we'll end up returning 5 instead of -1)
		const subResult = binarySearchIndex(right, target);
		return subResult === -1 ? -1 : subResult + midIdx + 1;

	} else {																																			// if midNum == target
		return midIdx;
	}
}

// console.log(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 12));							//=> 2
console.log(binarySearchIndex([5, 10, 12, 15, 20, 30, 70], 24));								//=> -1




module.exports = {
	binarySearch,
	binarySearchIndex
};