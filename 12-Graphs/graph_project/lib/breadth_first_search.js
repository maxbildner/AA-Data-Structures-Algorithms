// definition of GraphNode:
// class GraphNode {
// 	constructor(val) {
// 		this.val = val;
// 		this.neighbors = [];
// 	}
// }

// *****************************************************************************
// VERSION1- MY SOLUTION- similar to AA, .forEach instead of ...
// USES GRAPH NODE AND NEIGHBORS ARRAY (no adj list/matrix)
// Breadth First (ITERATIVE)
// - visit all nodes on current level before moving down (use queue shift/push)
// (Node A, 'c')   => Node C
function breadthFirstSearchV1(startingNode, targetVal) {
	let visited = new Set();																											// Hash/set to track visited nodes
	let queue = [startingNode];																										// queue for nodes to visit (shift/push), initialize with startingNode

	while (queue.length) {																												// keep looping while there are nodes in the queue																													
		
		let removedNode = queue.shift();																						// "visit" first node in queue
		
		if (removedNode.val === targetVal) return removedNode;											// check if removed node val matches target
		
		visited.add(removedNode);																										// add removedNode to visited hash/set

		removedNode.neighbors.forEach(neighbor => {																	// add neighbors to queue
			if (!visited.has(neighbor)) queue.push(neighbor);													// add neighbor to queue if it hasnt been visited
		});
	}

	return null;
}




// *****************************************************************************
// VERSION2- AA SOLUTION- spread operator, no .forEach
function breadthFirstSearch(startingNode, targetVal) {
	let queue = [startingNode];
	let visited = new Set();

	while (queue.length) {
		let node = queue.shift();
		if (visited.has(node)) continue;
		visited.add(node);
		if (node.val === targetVal) return node;

		queue.push(...node.neighbors);
	}

	return null;
}




module.exports = {
	breadthFirstSearch
};